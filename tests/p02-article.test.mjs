import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import test from "node:test";

const here = dirname(fileURLToPath(import.meta.url));
const fixture = (...parts) => resolve(here, "fixtures", "p02", ...parts);
const readJson = (...parts) => JSON.parse(readFileSync(fixture(...parts), "utf8"));

async function loadArticleApi() {
  try {
    return await import("../packages/article/src/index.js");
  } catch (error) {
    assert.fail(`P02 article API is not implemented yet: ${error.message}`);
  }
}

test("ART-01 exports and validates a versioned portable article envelope", async () => {
  const { ARTICLE_KIND, ARTICLE_SCHEMA_VERSION, ARTICLE_V1_SCHEMA, validateArticle } = await loadArticleApi();
  const result = validateArticle(readJson("valid", "minimal-article.json"));

  assert.equal(ARTICLE_KIND, "intui.article");
  assert.equal(ARTICLE_SCHEMA_VERSION, "1.0.0");
  assert.equal(ARTICLE_V1_SCHEMA.$schema, "https://json-schema.org/draft/2020-12/schema");
  const publicSchema = JSON.parse(readFileSync(resolve(here, "..", "packages", "article", "schema", "article-v1.schema.json"), "utf8"));
  assert.deepEqual(publicSchema, ARTICLE_V1_SCHEMA);
  assert.equal(result.ok, true);
  assert.equal(result.value.kind, ARTICLE_KIND);
  assert.equal(result.value.schemaVersion, ARTICLE_SCHEMA_VERSION);
  assert.equal(result.value.metadata.supportedLocales[0], "en");
});

test("ART-02 parses an intui-article manifest with Markdown and a validated edu-viz fence", async () => {
  const { validateArticle } = await loadArticleApi();
  const source = readFileSync(fixture("valid", "mixed-markdown.md"), "utf8");
  const result = validateArticle(source);

  assert.equal(result.ok, true, JSON.stringify(result.errors));
  assert.equal(result.value.sections[0].id, "overview");
  assert.equal(result.value.sections[0].blocks[0].content, "Markdown prose remains ordinary text in the normalized content tree.");
  const legacy = result.value.sections[0].blocks.find((block) => block.type === "legacyViz");
  assert.equal(legacy.props.spec.version, 1);
  assert.equal(legacy.props.spec.type, "step-guide");
  assert.ok(result.sourceMap["/sections/0/blocks/1"].line > 0);
  const withLeadingBlank = validateArticle(source.replace("# Overview", "\n# Overview"));
  assert.deepEqual(withLeadingBlank.value.sections[0].blocks.map((block) => block.id), result.value.sections[0].blocks.map((block) => block.id));
});

test("the article API is available through the package export", async () => {
  const api = await import("@intuiforge/engine/article");
  assert.equal(typeof api.validateArticle, "function");
  const schema = await import("@intuiforge/engine/article/schema", { with: { type: "json" } });
  assert.equal(schema.default.$id, "https://intuiforge.dev/schemas/article-v1.schema.json");
});

test("ART-03 rejects duplicate canonical IDs across nested deep-linkable blocks", async () => {
  const { validateArticle } = await loadArticleApi();
  const result = validateArticle(readJson("invalid", "duplicate-block-id.json"));

  assert.equal(result.ok, false);
  assert.ok(result.errors.some((issue) => issue.code === "DUPLICATE_ID" && issue.path.includes("children")));
});

test("ART-04 normalizes JSON text and JavaScript objects identically without mutating caller data", async () => {
  const { validateArticle } = await loadArticleApi();
  const original = readJson("valid", "minimal-article.json");
  const before = structuredClone(original);
  const fromObject = validateArticle(original);
  const fromJson = validateArticle(JSON.stringify(original));

  assert.equal(fromObject.ok, true);
  assert.equal(fromJson.ok, true);
  assert.deepEqual(fromObject.value, fromJson.value);
  assert.notStrictEqual(fromObject.value, original);
  assert.deepEqual(original, before);

  const unknown = validateArticle(readJson("invalid", "unknown-envelope-field.json"));
  assert.equal(unknown.ok, false);
  assert.ok(unknown.errors.some((issue) => issue.code === "UNKNOWN_FIELD" && issue.path === "/unexpected"));
});

test("ART-05 accepts current v1 losslessly and rejects unsupported versions explicitly", async () => {
  const { migrateArticle } = await loadArticleApi();
  const current = readJson("valid", "minimal-article.json");
  const currentResult = migrateArticle(current);
  assert.equal(currentResult.ok, true);
  assert.deepEqual(currentResult.value, current);

  const older = readJson("invalid", "unsupported-schema-version.json");
  const before = structuredClone(older);
  const oldResult = migrateArticle(older);
  assert.equal(oldResult.ok, false);
  assert.ok(oldResult.errors.some((issue) => issue.code === "UNSUPPORTED_SCHEMA_VERSION" && issue.path === "/schemaVersion"));
  assert.ok(oldResult.errors[0].fixHint);
  assert.deepEqual(older, before);
});

test("ART-06 requires a useful static narrative summary for no-JavaScript fallback", async () => {
  const { validateArticle } = await loadArticleApi();
  const article = readJson("valid", "minimal-article.json");
  article.summary = "   ";
  const result = validateArticle(article);

  assert.equal(result.ok, false);
  assert.ok(result.errors.some((issue) => issue.path === "/summary"));
});

test("ART-07 rejects traversal and unsafe protocols in resource manifests", async () => {
  const { validateArticle } = await loadArticleApi();
  const traversal = validateArticle(readJson("invalid", "unsafe-asset-path.json"));
  assert.equal(traversal.ok, false);
  assert.ok(traversal.errors.some((issue) => issue.code === "UNSAFE_ASSET_URL"));

  const article = readJson("valid", "minimal-article.json");
  article.assets.push({
    id: "unsafe-link",
    url: "javascript:alert(1)",
    type: "image/svg+xml",
    alt: "Unsafe image",
    license: "owner-supplied",
    provenance: "owner-supplied"
  });
  const protocol = validateArticle(article);
  assert.equal(protocol.ok, false);
  assert.ok(protocol.errors.some((issue) => issue.code === "UNSAFE_ASSET_URL"));

  const external = readJson("valid", "minimal-article.json");
  external.assets.push({
    id: "remote-chart",
    url: "https://cdn.example.test/chart.svg",
    type: "image/svg+xml",
    alt: "A chart",
    license: "CC-BY-4.0",
    provenance: "owner-supplied",
    integrity: "sha256-AAAA"
  });
  assert.equal(validateArticle(external).ok, false);
  assert.equal(validateArticle(external, { allowedAssetOrigins: ["https://cdn.example.test"] }).ok, true);

  const unsafeHref = readJson("valid", "minimal-article.json");
  unsafeHref.sections[0].blocks[0].props = { href: "javascript:alert(1)" };
  assert.ok(validateArticle(unsafeHref).errors.some((issue) => issue.code === "UNSAFE_LINK_URL"));

  const unsafeMarkdownLink = readJson("valid", "minimal-article.json");
  unsafeMarkdownLink.sections[0].blocks[0].content = "[unsafe](javascript:alert(1))";
  assert.ok(validateArticle(unsafeMarkdownLink).errors.some((issue) => issue.code === "UNSAFE_LINK_URL"));

  const hiddenMedia = readJson("valid", "minimal-article.json");
  hiddenMedia.sections[0].blocks[0].props = { src: "/unmanifested.svg" };
  assert.ok(validateArticle(hiddenMedia).errors.some((issue) => issue.code === "UNMANIFESTED_RESOURCE_URL"));
});

test("ART-08 provides structured diagnostics and source locations for malformed Markdown JSON", async () => {
  const { validateArticle } = await loadArticleApi();
  const source = readFileSync(fixture("invalid", "malformed-intui-article.md"), "utf8");
  const result = validateArticle(source);
  const issue = result.errors[0];

  assert.equal(result.ok, false);
  assert.equal(issue.severity, "error");
  assert.equal(typeof issue.path, "string");
  assert.equal(typeof issue.code, "string");
  assert.equal(typeof issue.fixHint, "string");
  assert.ok(issue.location.line > 0);
  assert.ok(issue.location.column > 0);
});

test("rejects hostile object graphs, accessors, unsupported actions, and cyclic derived references", async () => {
  const { validateArticle } = await loadArticleApi();
  const base = readJson("valid", "minimal-article.json");

  const cyclic = structuredClone(base);
  cyclic.derived.first = { ref: "second" };
  cyclic.derived.second = { ref: "first" };
  const cycleResult = validateArticle(cyclic);
  assert.equal(cycleResult.ok, false);
  assert.ok(cycleResult.errors.some((issue) => issue.code === "DERIVED_CYCLE"));

  const actionArticle = structuredClone(base);
  actionArticle.sections[0].blocks[0].events = { click: { action: "runScript", source: "alert(1)" } };
  const actionResult = validateArticle(actionArticle);
  assert.equal(actionResult.ok, false);
  assert.ok(actionResult.errors.some((issue) => issue.code === "UNSUPPORTED_ACTION"));

  const unsafeProps = structuredClone(base);
  unsafeProps.sections[0].blocks[0].props = { onClick: "alert(1)" };
  assert.ok(validateArticle(unsafeProps).errors.some((issue) => issue.code === "UNSAFE_PROPERTY"));

  const lowercaseHandler = structuredClone(base);
  lowercaseHandler.sections[0].blocks[0].props = { onclick: "alert(1)" };
  const lowercaseHandlerResult = validateArticle(lowercaseHandler);
  assert.equal(lowercaseHandlerResult.ok, false);
  assert.ok(lowercaseHandlerResult.errors.some((issue) => issue.code === "UNSAFE_PROPERTY"));

  const scriptMarkup = structuredClone(base);
  scriptMarkup.sections[0].blocks[0].content = "<script>alert(1)</script>";
  const scriptResult = validateArticle(scriptMarkup);
  assert.equal(scriptResult.ok, false);
  assert.ok(scriptResult.errors.some((issue) => issue.code === "UNSAFE_MARKUP"));

  const divideByZero = structuredClone(base);
  divideByZero.derived.ratio = { op: "divide", a: 5, b: { op: "subtract", a: 2, b: 2 } };
  assert.ok(validateArticle(divideByZero).errors.some((issue) => issue.code === "DIVIDE_BY_ZERO"));

  const hostile = structuredClone(base);
  let getterCalls = 0;
  Object.defineProperty(hostile, "title", { enumerable: true, get() { getterCalls += 1; return "executed"; } });
  const getterResult = validateArticle(hostile);
  assert.equal(getterResult.ok, false);
  assert.equal(getterCalls, 0);

  const customPrototype = Object.assign(Object.create({ inherited: true }), base);
  assert.ok(validateArticle(customPrototype).errors.some((issue) => issue.code === "UNSAFE_OBJECT"));

  const cyclicObject = structuredClone(base);
  cyclicObject.self = cyclicObject;
  assert.equal(validateArticle(cyclicObject).ok, false);
});

test("bounds oversized Markdown source before parsing", async () => {
  const { validateArticle } = await loadArticleApi();
  const result = validateArticle("x".repeat(1_000_001));

  assert.equal(result.ok, false);
  assert.ok(result.errors.some((issue) => issue.code === "SOURCE_TOO_LARGE"));
});

test("all illustrative proposal examples satisfy the frozen v1 contract", async () => {
  const { validateArticle } = await loadArticleApi();
  const examples = resolve(here, "..", "IntuiForge-Implementation-Kit", "Examples");
  const files = readdirSync(examples).filter((name) => name.endsWith(".json"));
  assert.ok(files.length >= 5);

  for (const file of files) {
    const result = validateArticle(readFileSync(resolve(examples, file), "utf8"));
    assert.equal(result.ok, true, `${file}: ${JSON.stringify(result.errors)}`);
  }
});
