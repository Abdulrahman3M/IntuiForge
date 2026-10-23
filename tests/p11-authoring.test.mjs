import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  ARTICLE_TEMPLATES,
  createArticleFromTemplate,
  createArticlePrompt,
  createAuthoringSession,
  exportArticlePackage,
  importArticlePackage,
} from "@intuiforge/engine/authoring";
import { validateArticle } from "@intuiforge/engine/article";

const root = resolve(import.meta.dirname, "..");
const articleFixture = JSON.parse(readFileSync(resolve(root, "tests/fixtures/p02/valid/minimal-article.json"), "utf8"));

test("AI-01 generates an offline prompt for inert intui.article v1 data", () => {
  const prompt = createArticlePrompt({ request: "اكتب شرحًا عن دورة الماء", locale: "ar" });

  assert.match(prompt, /intui\.article/);
  assert.match(prompt, /schemaVersion.*1\.0\.0/s);
  assert.match(prompt, /JSON/);
  assert.match(prompt, /JavaScript|HTML/);
  assert.match(prompt, /دورة الماء/);
  assert.equal(/<script\b/i.test(prompt), false);
  assert.equal(validateArticle(articleFixture).ok, true);
});

test("AI-02 round-trips the full validated article package without changing stable IDs or semantics", () => {
  const article = structuredClone(articleFixture);
  article.sections[0].blocks[0] = {
    id: "score-slider",
    type: "slider",
    content: "Selected score",
    props: { min: 0, max: 100, step: 1 },
    bindings: { value: "score" },
    events: { input: { action: "setState", variable: "score", valueFrom: "event.value" } },
  };
  article.initialState = { score: { type: "number", value: 12, min: 0, max: 100, step: 1 } };

  const exported = exportArticlePackage(article);
  assert.equal(exported.ok, true, JSON.stringify(exported.errors));
  assert.equal(exported.value.format, "json");
  assert.equal(exported.value.mimeType, "application/json;charset=utf-8");
  assert.deepEqual(JSON.parse(exported.value.content), article);

  const imported = importArticlePackage(exported.value.content);
  assert.equal(imported.ok, true, JSON.stringify(imported.errors));
  assert.deepEqual(imported.value, article);
  assert.equal(imported.value.sections[0].blocks[0].id, "score-slider");
});

test("AI-02 accepts the documented Markdown manifest and rejects an unregistered schema version precisely", () => {
  const markdown = `Intro\n\n\`\`\`intui-article\n${JSON.stringify(articleFixture, null, 2)}\n\`\`\`\n`;
  assert.equal(importArticlePackage(markdown).ok, true);

  const unsupported = structuredClone(articleFixture);
  unsupported.schemaVersion = "99.0.0";
  const rejected = importArticlePackage(JSON.stringify(unsupported));
  assert.equal(rejected.ok, false);
  assert.ok(rejected.errors.some((issue) => issue.code === "UNSUPPORTED_SCHEMA_VERSION" && issue.path === "/schemaVersion"));
});

test("AI-06 exposes reusable valid article, quiz, map and science templates", () => {
  const kinds = new Set(ARTICLE_TEMPLATES.map((template) => template.kind));
  for (const kind of ["article", "quiz", "map", "science"]) assert.ok(kinds.has(kind), `missing ${kind} template`);

  for (const template of ARTICLE_TEMPLATES) {
    const result = createArticleFromTemplate(template.id, { articleId: `sample-${template.id}` });
    assert.equal(result.ok, true, template.id);
    assert.equal(result.value.id, `sample-${template.id}`);
    assert.equal(validateArticle(result.value).ok, true, template.id);
    assert.equal(Object.isFrozen(template), true);
  }
});

test("AI-08 draft updates are isolated, bounded, undoable and redoable", () => {
  const published = structuredClone(articleFixture);
  published.metadata.status = "published";
  const session = createAuthoringSession(published, { maxHistory: 2 });
  const updateTitle = (title) => ({ ...session.getDraft(), title });

  session.update(updateTitle("Draft one"));
  session.update(updateTitle("Draft two"));
  session.update(updateTitle("Draft three"));
  assert.equal(session.getDraft().title, "Draft three");
  assert.equal(session.getDraft().metadata.status, "draft");
  assert.equal(session.getPublished().title, "A portable article");
  assert.equal(session.undo(), true);
  assert.equal(session.getDraft().title, "Draft two");
  assert.equal(session.redo(), true);
  assert.equal(session.getDraft().title, "Draft three");
  assert.equal(published.title, "A portable article");
  assert.equal(published.metadata.status, "published");

  const leaked = session.getDraft();
  leaked.title = "mutated external snapshot";
  assert.equal(session.getDraft().title, "Draft three");
});

test("AI-07 invalid drafts expose exact diagnostics and cannot publish until corrected", () => {
  const original = structuredClone(articleFixture);
  original.metadata.status = "published";
  const session = createAuthoringSession(original);
  const invalid = session.getDraft();
  invalid.sections[0].blocks[0].id = "";
  session.update(invalid);

  const rejected = session.publish();
  assert.equal(rejected.ok, false);
  assert.ok(rejected.errors.some((issue) => issue.path === "/sections/0/blocks/0/id" && issue.fixHint));
  assert.equal(session.getPublished().title, "A portable article");
  assert.equal(session.getDraft().metadata.status, "draft");

  const corrected = session.getDraft();
  corrected.sections[0].blocks[0].id = "overview-paragraph-fixed";
  session.update(corrected);
  const accepted = session.publish();
  assert.equal(accepted.ok, true);
  assert.equal(accepted.value.metadata.status, "published");
  assert.equal(session.getPublished().sections[0].blocks[0].id, "overview-paragraph-fixed");
  assert.equal(original.sections[0].blocks[0].id, "overview-paragraph");
});

test("AI-08 refuses accessors when cloning draft input without invoking them", () => {
  const session = createAuthoringSession(articleFixture);
  let getterCalled = false;
  const hostile = structuredClone(articleFixture);
  Object.defineProperty(hostile, "title", { enumerable: true, get() { getterCalled = true; return "unsafe"; } });

  assert.throws(() => session.update(hostile), { code: "UNSAFE_DRAFT_VALUE" });
  assert.equal(getterCalled, false);
  assert.equal(session.getDraft().title, articleFixture.title);
});
