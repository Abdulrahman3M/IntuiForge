import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createRegistrationRegistry } from "../packages/core/src/registry.js";
import { validateArticle } from "../packages/article/src/index.js";
import { RichViz } from "../packages/visualization-legacy/src/index.js";
import { fetchVerifiedAsset } from "../packages/article-renderer/src/rich-media.js";

const here = dirname(fileURLToPath(import.meta.url));
const minimal = JSON.parse(readFileSync(resolve(here, "fixtures/p02/valid/minimal-article.json"), "utf8"));

test("NFR-01 registration descriptors reject accessors without invoking them and contain hostile proxies", () => {
  const registry = createRegistrationRegistry("renderer");
  let getterRuns = 0;
  const descriptor = { version: "1.0.0", capabilities: [], render() {} };
  Object.defineProperty(descriptor, "id", { enumerable: true, get() { getterRuns += 1; return "hostile.renderer"; } });
  assert.throws(() => registry.register(descriptor), /must be an enumerable data property/);
  assert.equal(getterRuns, 0);
  const revoked = Proxy.revocable({}, {});
  revoked.revoke();
  assert.throws(() => registry.register(revoked.proxy), /could not be inspected safely/);
});

test("NFR-01 article object validation rejects revoked proxies, aggregate text floods and Markdown line floods", () => {
  const revoked = Proxy.revocable({}, {}); revoked.revoke();
  assert.equal(validateArticle(revoked.proxy).errors[0].code, "UNSAFE_OBJECT");

  const oversizedText = structuredClone(minimal);
  oversizedText.title = "t".repeat(100_000);
  oversizedText.summary = "s".repeat(100_000);
  oversizedText.sections[0].heading = "h".repeat(100_000);
  oversizedText.sections[0].blocks[0].content = "c".repeat(100_000);
  oversizedText.metadata.provenance = Array.from({ length: 8 }, (_, index) => ({ kind: "author-supplied", source: String(index).repeat(100_000) }));
  const aggregate = validateArticle(oversizedText);
  assert.equal(aggregate.ok, false);
  assert.ok(aggregate.errors.some((issue) => issue.code === "TOTAL_STRING_LIMIT_EXCEEDED"));

  const lineFlood = `\`\`\`intui-article\n${JSON.stringify(minimal)}\n\`\`\`\n${"\n".repeat(20_000)}`;
  assert.ok(validateArticle(lineFlood).errors.some((issue) => issue.code === "MARKDOWN_LINE_LIMIT_EXCEEDED"));
});

test("NFR-02 RichViz object inputs are serialized inertly and pass through its preserved validator", () => {
  let getterRuns = 0;
  const spec = { version: 1, type: "step-guide", title: "Safe", description: "Example", data: { steps: [] } };
  Object.defineProperty(spec.data, "steps", { enumerable: true, get() { getterRuns += 1; return []; } });
  assert.throws(() => RichViz.render({}, spec), /must not contain accessors/);
  assert.equal(getterRuns, 0);
  assert.throws(() => RichViz.render({}, { version: 99, type: "made-up" }), /Unsupported|version|type/i);
});

test("NFR-03 verified media reads enforce a response cap before retaining the full body", async () => {
  let cancelCount = 0;
  const document = {
    baseURI: "https://example.test/",
    defaultView: {
      crypto: globalThis.crypto,
      URL,
      Blob,
      fetch: async () => ({
        ok: true,
        headers: { get: () => null },
        body: { getReader: () => ({ async read() { return { done: false, value: new Uint8Array(10 * 1024 * 1024 + 1) }; }, async cancel() { cancelCount += 1; }, releaseLock() {} }) },
      }),
    },
  };
  await assert.rejects(fetchVerifiedAsset(document, "/asset.bin", { integrity: "sha256-AAAA", type: "application/octet-stream" }), /size limit/);
  assert.equal(cancelCount, 1);
  const declaredDocument = {
    baseURI: "https://example.test/",
    defaultView: {
      crypto: globalThis.crypto,
      URL,
      Blob,
      fetch: async () => ({ ok: true, headers: { get: () => String(10 * 1024 * 1024 + 1) }, body: { async cancel() { cancelCount += 1; } } }),
    },
  };
  await assert.rejects(fetchVerifiedAsset(declaredDocument, "/large.bin", { integrity: "sha256-AAAA", type: "application/octet-stream" }), /size limit/);
  assert.equal(cancelCount, 2);
});

test("NFR-06 preserves same-origin SVG manifests without requiring a breaking schema change", () => {
  const article = structuredClone(minimal);
  article.assets = [{ id: "diagram", url: "/diagram.svg", type: "image/svg+xml", alt: "Diagram", license: "CC0", provenance: "first party" }];
  const result = validateArticle(article);
  assert.equal(result.ok, true, JSON.stringify(result.errors));
});
