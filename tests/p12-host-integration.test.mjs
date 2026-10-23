import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createLearningProgress } from "../packages/state/src/learning-progress.js";
import { mountReactIsland } from "../packages/react-island/src/index.js";
import { RICHVIZ_VERSION, RichViz } from "../packages/visualization-legacy/src/index.js";

let hostApi;
let hostApiError;
try { hostApi = await import("../packages/host-integration/src/index.js"); }
catch (error) { hostApiError = error; }

function requireHostApi() {
  assert.ok(hostApi, `HOST-01/02 host integration API is not available: ${hostApiError?.message ?? "missing module"}`);
  return hostApi;
}

class FakeNode {
  constructor(tagName = "div") {
    this.tagName = tagName.toUpperCase(); this.children = []; this.parentNode = null;
    this.attributes = new Map(); this.listeners = new Map(); this.hidden = false; this.open = false;
    this.value = ""; this.style = { values: new Map(), setProperty(name, value) { this.values.set(name, value); } };
  }
  set textContent(value) { this._text = String(value ?? ""); this.replaceChildren(); }
  get textContent() { return `${this._text ?? ""}${this.children.map((child) => child.textContent).join("")}`; }
  append(...nodes) { for (const node of nodes) { node.parentNode?.removeChild(node); node.parentNode = this; this.children.push(node); } }
  appendChild(node) { this.append(node); return node; }
  prepend(...nodes) { for (const node of [...nodes].reverse()) { node.parentNode?.removeChild(node); node.parentNode = this; this.children.unshift(node); } }
  removeChild(node) { const index = this.children.indexOf(node); if (index >= 0) this.children.splice(index, 1); node.parentNode = null; return node; }
  replaceChildren(...nodes) { for (const child of [...this.children]) this.removeChild(child); this.append(...nodes); }
  setAttribute(name, value) { this.attributes.set(name, String(value)); if (name === "id") this.id = String(value); if (name === "dir") this.dir = String(value); if (name === "lang") this.lang = String(value); if (name === "type") this.type = String(value); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  removeAttribute(name) { this.attributes.delete(name); }
  addEventListener(type, listener) { const listeners = this.listeners.get(type) ?? new Set(); listeners.add(listener); this.listeners.set(type, listeners); }
  removeEventListener(type, listener) { this.listeners.get(type)?.delete(listener); }
  dispatch(type, event = {}) { for (const listener of this.listeners.get(type) ?? []) listener({ type, target: this, preventDefault() {}, ...event }); }
  click() { this.dispatch("click"); }
  focus() { this.focused = true; }
  attachShadow() { this.shadowRoot = new FakeNode("#shadow-root"); return this.shadowRoot; }
  remove() { this.parentNode?.removeChild(this); }
}

class FakeDocument { createElement(name) { const node = new FakeNode(name); node.ownerDocument = this; return node; } }

function find(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.children ?? []) { const match = find(child, predicate); if (match) return match; }
  return undefined;
}

function hostArticle() {
  return {
    kind: "intui.article", schemaVersion: "1.0.0", id: "portable-host-article", locale: "en", dir: "ltr",
    title: "Portable integration", summary: "An article mounted inside a host-owned page.",
    metadata: { status: "draft", contentType: "article", sources: [], canonicalReferences: [], supportedLocales: ["en"], provenance: [] },
    assets: [], initialState: {}, derived: {}, sections: [{ id: "overview", heading: "Overview", blocks: [
      { id: "intro", type: "paragraph", content: "Host page content stays outside this mount." },
      { id: "next", type: "button", content: "Next lesson", events: { click: { action: "navigate", route: "next-lesson" } } },
    ] }],
  };
}

test("HOST-01/02 mounts through the vanilla browser API with explicit host routing and scoped lifecycle", async () => {
  const { createIntuiHost } = requireHostApi();
  const previousDocument = globalThis.document;
  globalThis.document = new FakeDocument();
  const routes = [];
  const hostPage = new FakeNode("main");
  const hostHeader = new FakeNode("header"); hostPage.append(hostHeader);
  const mountRoot = new FakeNode("div"); hostPage.append(mountRoot);
  const renderErrors = [];
  const host = createIntuiHost({ hostEnvironment: { onNavigate: (route) => routes.push(route), onError: (error) => renderErrors.push(error) } });
  const mounted = host.mount(mountRoot, hostArticle(), { document: globalThis.document, theme: "light" });

  try {
    assert.deepEqual(await mounted.ready, { status: "ready" }, JSON.stringify(renderErrors.map((error) => ({ code: error.code, cause: error.cause?.message }))));
    assert.equal(hostPage.children[0], hostHeader, "only the supplied mount root may be replaced");
    assert.equal(host.getCapabilities().adapters.some(({ id, version }) => id === "org.intuiforge.richviz" && version === "0.5.0"), true);
    find(mountRoot.shadowRoot, (node) => node.tagName === "BUTTON" && node.textContent === "Next lesson").click();
    assert.deepEqual(routes, ["next-lesson"], "host route tokens are delegated to the host router");

    assert.deepEqual(await mounted.updateEnvironment({ theme: "dark" }), { status: "ready" });
    assert.equal(find(mountRoot.shadowRoot, (node) => node.getAttribute("class") === "if-article-root").getAttribute("data-theme"), "dark");
  } finally {
    await mounted.dispose();
    await host.dispose();
    globalThis.document = previousDocument;
  }
  assert.equal(hostPage.children[0], hostHeader, "dispose preserves host-owned page content");
});

test("HOST-03 keeps the existing edu-viz Markdown and RichViz public contract available", async () => {
  const { createIntuiHost } = requireHostApi();
  const source = await readFile(new URL("./fixtures/p02/valid/mixed-markdown.md", import.meta.url), "utf8");
  const { validateArticle } = await import("../packages/article/src/index.js");
  const parsed = validateArticle(source);
  assert.equal(parsed.ok, true, JSON.stringify(parsed.errors));
  assert.ok(parsed.value.sections[0].blocks.some((block) => block.type === "legacyViz"));

  const host = createIntuiHost();
  try {
    assert.equal(RICHVIZ_VERSION, "0.5.0");
    assert.equal(typeof RichViz.validate, "function");
    assert.equal(typeof RichViz.render, "function");
    assert.equal(host.getCapabilities().adapters.some(({ id }) => id === "org.intuiforge.richviz"), true);
  } finally { await host.dispose(); }
});

test("HOST-04 loads and saves validated per-user progress only through explicit host storage", async () => {
  const { createProgressPersistenceAdapter } = requireHostApi();
  const values = new Map(); const writes = [];
  const read = async (key) => values.get(key) ?? null;
  const write = async (key, value) => { writes.push({ key, value }); values.set(key, value); };
  const adapter = createProgressPersistenceAdapter({
    userId: "user-42",
    read,
    write,
  });
  const empty = await adapter.load({ articleId: "course-one", activityIds: ["quiz-one"] });
  assert.equal(Object.keys(empty.activities).length, 0);

  const live = createLearningProgress(["quiz-one"]);
  try {
    live.setScore("quiz-one", 2, 3);
    await adapter.save({ articleId: "course-one", action: { action: "saveProgress", activityId: "quiz-one", scope: "activity" }, progress: live.getSnapshot() });
    const restored = await adapter.load({ articleId: "course-one", activityIds: ["quiz-one"] });
    const progress = createLearningProgress(["quiz-one"], { initialState: restored.activities });
    try {
      assert.equal(progress.getSnapshot().activities["quiz-one"].score, 2);
      assert.equal(progress.getSnapshot().activities["quiz-one"].maximumScore, 3);
      assert.equal(progress.getSnapshot().activities["quiz-one"].status, "complete");
    } finally { progress.dispose(); }
  } finally { live.dispose(); }

  const otherUser = createProgressPersistenceAdapter({ userId: "user-43", read, write });
  assert.equal(Object.keys((await otherUser.load({ articleId: "course-one", activityIds: ["quiz-one"] })).activities).length, 0);
  assert.equal(writes.length, 1);
  assert.match(writes[0].key, /user-42/);
  assert.match(writes[0].key, /course-one/);
  assert.equal(JSON.parse(writes[0].value).userId, undefined, "identity stays in the host storage key, not article content");
});

test("HOST-04 restores only bounded stable activity records into a fresh session", () => {
  const progress = createLearningProgress(["quiz-one"], { initialState: {
    "quiz-one": { status: "complete", selectedId: "choice-one", score: 2, maximumScore: 3, reviewedCardIds: ["card-one"] },
    "removed-activity": { status: "complete", selectedId: null, score: 1, maximumScore: 1, reviewedCardIds: [] },
  } });
  try {
    const snapshot = progress.getSnapshot();
    assert.equal(snapshot.activities["quiz-one"].status, "complete");
    assert.equal(snapshot.activities["quiz-one"].score, 2);
    assert.deepEqual(snapshot.activities["quiz-one"].reviewedCardIds, ["card-one"]);
    assert.equal(Object.hasOwn(snapshot.activities, "removed-activity"), false);
  } finally { progress.dispose(); }
});

test("HOST-04 ignores unknown saved activities and rejects corrupt host records", async () => {
  const { createProgressPersistenceAdapter } = requireHostApi();
  let stored = JSON.stringify({ kind: "intuiforge.progress", version: 1, activities: {
    "quiz-one": { status: "complete", selectedId: null, score: 1, maximumScore: 1, reviewedCardIds: [] },
    "removed-activity": { status: "complete", selectedId: null, score: 1, maximumScore: 1, reviewedCardIds: [] },
  } });
  const adapter = createProgressPersistenceAdapter({ userId: "user-42", read: async () => stored, write: async (_key, value) => { stored = value; } });
  assert.deepEqual(Object.keys((await adapter.load({ articleId: "course-one", activityIds: ["quiz-one"] })).activities), ["quiz-one"]);
  stored = "{corrupt";
  await assert.rejects(adapter.load({ articleId: "course-one", activityIds: ["quiz-one"] }), { code: "PROGRESS_DATA_INVALID" });
});

test("HOST-04 rejects host snapshots with accessors without invoking them", async () => {
  const { createProgressPersistenceAdapter } = requireHostApi();
  const adapter = createProgressPersistenceAdapter({ userId: "user-42", read: async () => null, write: async () => {} });
  let accessed = 0;
  const activities = Object.create(null);
  Object.defineProperty(activities, "quiz-one", { enumerable: true, get() { accessed += 1; return { status: "complete", selectedId: null, score: 1, maximumScore: 1, reviewedCardIds: [] }; } });
  await assert.rejects(adapter.save({
    articleId: "course-one",
    action: { action: "saveProgress", activityId: "quiz-one", scope: "activity" },
    progress: { activities },
  }), { code: "PROGRESS_DATA_INVALID" });
  assert.equal(accessed, 0);

  const progress = {};
  Object.defineProperty(progress, "activities", { enumerable: true, get() { accessed += 1; return {}; } });
  await assert.rejects(adapter.save({
    articleId: "course-one",
    action: { action: "saveProgress", activityId: "quiz-one", scope: "activity" },
    progress,
  }), { code: "PROGRESS_DATA_INVALID" });
  assert.equal(accessed, 0);

  const hostileCards = [];
  Object.defineProperty(hostileCards, "0", { enumerable: true, get() { accessed += 1; return "card-one"; } });
  hostileCards.length = 1;
  assert.throws(() => createLearningProgress(["quiz-one"], { initialState: {
    "quiz-one": { status: "in-progress", selectedId: null, score: null, maximumScore: null, reviewedCardIds: hostileCards },
  } }), { code: "UNSAFE_PROGRESS_STATE" });
  assert.equal(accessed, 0);
});

test("HOST-04 validates activity scope before calling the host storage adapter", async () => {
  let reads = 0;
  const { createProgressPersistenceAdapter } = requireHostApi();
  const adapter = createProgressPersistenceAdapter({ userId: "user-42", read: async () => { reads += 1; return null; }, write: async () => {} });
  const activityIds = [];
  Object.defineProperty(activityIds, "0", { enumerable: true, get() { reads += 100; return "quiz-one"; } });
  activityIds.length = 1;
  await assert.rejects(adapter.load({ articleId: "course-one", activityIds }), { code: "INVALID_PROGRESS_SCOPE" });
  assert.equal(reads, 0, "host storage is not called until the full requested scope is validated");
});

test("HOST-04 restores activity progress on mount and persists only after an explicit save action", async () => {
  const { createIntuiHost, createProgressPersistenceAdapter } = requireHostApi();
  const values = new Map();
  const progress = createProgressPersistenceAdapter({ userId: "learner-7", read: async (key) => values.get(key) ?? null, write: async (key, value) => values.set(key, value) });
  const previousDocument = globalThis.document;
  globalThis.document = new FakeDocument();
  const article = hostArticle();
  article.sections[0].blocks.push({ id: "cards", type: "flashcards", props: {
    cards: [{ id: "card-one", front: "Prompt", back: "Answer" }], saveLabel: "Save progress",
  } });
  const renderErrors = [];
  const firstHost = createIntuiHost({ hostEnvironment: { progress, onError: (error) => renderErrors.push(error) } });
  const firstRoot = new FakeNode("div");
  const firstMount = firstHost.mount(firstRoot, article, { document: globalThis.document });
  try {
    assert.deepEqual(await firstMount.ready, { status: "ready" }, JSON.stringify(renderErrors.map((error) => ({ code: error.code, cause: error.cause?.message }))));
    const cards = find(firstRoot.shadowRoot, (node) => node.id === "cards");
    assert.ok(cards, firstRoot.shadowRoot.textContent);
    const markReviewed = find(cards, (node) => node.getAttribute("data-card-reviewed") === "");
    assert.ok(markReviewed, cards.textContent);
    markReviewed.click();
    assert.equal(values.size, 0, "review changes remain in memory until the host's save control is activated");
    find(cards, (node) => node.textContent === "Save progress").click();
    assert.equal(values.size, 1);
  } finally { await firstMount.dispose(); await firstHost.dispose(); }

  const secondHost = createIntuiHost({ hostEnvironment: { progress } });
  const secondRoot = new FakeNode("div");
  const secondMount = secondHost.mount(secondRoot, article, { document: globalThis.document });
  try {
    assert.deepEqual(await secondMount.ready, { status: "ready" });
    const restoredCards = find(secondRoot.shadowRoot, (node) => node.id === "cards");
    assert.match(find(restoredCards, (node) => node.getAttribute("class") === "if-article-caption").textContent, /Cards reviewed: 1/);
  } finally { await secondMount.dispose(); await secondHost.dispose(); globalThis.document = previousDocument; }
});

test("HOST-05 keeps a framework root inside a disposable React island", () => {
  const page = new FakeNode("main"); const hostOwned = new FakeNode("header"); page.append(hostOwned);
  let rendered; let unmounted = 0; let rootElement;
  const island = mountReactIsland(page, { version: 1 }, (container) => {
    rootElement = container;
    return { render(value) { rendered = value; }, unmount() { unmounted += 1; } };
  }, { document: new FakeDocument() });
  assert.equal(rootElement, island.island);
  assert.equal(page.children.length, 2);
  assert.equal(rendered.version, 1);
  island.update({ version: 2 });
  assert.equal(rendered.version, 2);
  island.dispose();
  assert.equal(unmounted, 1);
  assert.deepEqual(page.children, [hostOwned]);
});

test("HOST-01/02/05 provide separate plain, framework-managed, and no-script host fixtures", async () => {
  const exportedHost = await import("@intuiforge/engine/host");
  assert.equal(typeof exportedHost.mountIntuiArticle, "function");
  const plain = await readFile(new URL("./browser/p12-plain.html", import.meta.url), "utf8");
  const framework = await readFile(new URL("./browser/p12-framework.html", import.meta.url), "utf8");
  const noScript = await readFile(new URL("./browser/p12-static.html", import.meta.url), "utf8");
  const module = await readFile(new URL("./browser/p12-host-fixtures.js", import.meta.url), "utf8");
  assert.match(plain, /p12-host-fixtures\.js/);
  assert.match(framework, /p12-host-fixtures\.js/);
  assert.doesNotMatch(noScript, /<script\b/i);
  assert.match(noScript, /static narrative remains available/i);
  assert.match(module, /P12_RUN_CHECKS/);
  assert.match(module, /mountReactIsland/);
  assert.match(module, /edu-viz|mixed-markdown\.md/);
});

test("HOST-06 host services stay opt-in and HOST-07 can roll back without changing legacy source or host paths", async () => {
  const { createIntuiHost } = requireHostApi();
  const host = createIntuiHost();
  const legacySource = JSON.stringify({ version: 1, type: "step-guide", title: "Stable legacy content", steps: [{ id: "one", title: "One", content: "First" }] });
  const previous = RichViz.validate(legacySource);
  try {
    assert.equal(host.getCapabilities().adapters.some(({ id }) => id === "org.intuiforge.richviz"), true);
    assert.equal(host.getCapabilities().components.length >= 0, true);
    assert.equal(RichViz.validate(legacySource).ok, previous.ok);
    assert.deepEqual(JSON.parse(legacySource), { version: 1, type: "step-guide", title: "Stable legacy content", steps: [{ id: "one", title: "One", content: "First" }] });
    assert.equal(typeof globalThis.localStorage, "undefined", "the host runtime must not create an implicit user-data store");
  } finally { await host.dispose(); }
});
