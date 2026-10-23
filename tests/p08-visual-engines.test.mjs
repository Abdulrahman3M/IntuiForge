import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { validateArticle } from "../packages/article/src/index.js";
import { RichViz } from "../packages/visualization-legacy/src/index.js";
import { EXAMPLES, EXAMPLES_CATALOG } from "../packages/visualization-legacy/vendor/RichViz-main/src/RichVisualizationExamples.js";
import { ADAPTER_LIBRARIES, ADAPTER_LOADERS, DIAGRAM_REGISTRY, RENDERER_LOADERS } from "../packages/visualization-legacy/vendor/RichViz-main/src/RichVisualizationRegistry.js";
import { ICON_NAMES } from "../packages/visualization-legacy/vendor/RichViz-main/src/RichVisualizationIcons.js";
import { buildVisualCatalog } from "../packages/visualization-legacy/src/visual-browser.js";
import { layoutKnowledgeMap } from "../packages/article-renderer/src/knowledge-map.js";
import { applyVisualizationBindings, getVisualizationBindingTarget } from "../packages/article-renderer/src/visualization-bindings.js";
import { bindArticleBlocks, createReactiveStore } from "../packages/state/src/index.js";
import { renderArticleStatic } from "@intuiforge/engine/article-renderer";

const here = dirname(fileURLToPath(import.meta.url));
const assetRoot = resolve(here, "../packages/visualization-legacy/asset-library");
const catalogPath = resolve(assetRoot, "Assets/catalog.json");
const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));

function mapArticle() {
  const article = JSON.parse(readFileSync(resolve(here, "fixtures/p02/valid/minimal-article.json"), "utf8"));
  article.initialState = { selectedNode: { type: "enum", value: "root", values: ["root", "lesson"] } };
  article.sections[0].blocks = [{
    id: "course-map", type: "knowledgeMap", bindings: { selected: "selectedNode" }, props: {
      title: "Course map", description: "A path through the course", layout: "layered", pan: true, zoom: true, pinchZoom: true, minimap: true,
      nodes: [
        { id: "root", label: "Start here", summary: "Begin with the overview." },
        { id: "lesson", label: "Next lesson", summary: "Continue to the second article.", articleRef: "course-two" },
      ], edges: [{ id: "root-to-lesson", source: "root", target: "lesson", label: "continues to" }],
    },
  }];
  return article;
}

test("VIZ-01: all 14 preserved RichViz types remain registered with valid canonical examples", () => {
  assert.equal(RichViz.types.length, 14);
  assert.equal(new Set(RichViz.types).size, 14);
  assert.deepEqual([...RichViz.types].sort(), [...Object.keys(RENDERER_LOADERS)].sort());
  assert.deepEqual([...RichViz.types].sort(), [...DIAGRAM_REGISTRY.map((entry) => entry.id)].sort());
  for (const type of RichViz.types) {
    const entry = EXAMPLES_CATALOG.find((candidate) => candidate.spec.type === type);
    assert.ok(entry, `missing canonical example for ${type}`);
    assert.equal(RichViz.validate(JSON.stringify(entry.spec)).ok, true, `${type} example should validate`);
  }
});

test("VIZ-02: the six local adapter contracts accept their canonical engine examples", () => {
  assert.deepEqual(Object.keys(ADAPTER_LOADERS).sort(), ["chartjs", "echarts", "mermaid", "plotly", "react-flow", "recharts"]);
  assert.deepEqual(Object.keys(ADAPTER_LIBRARIES).sort(), Object.keys(ADAPTER_LOADERS).sort());
  for (const adapter of Object.keys(ADAPTER_LOADERS)) {
    const base = ["mermaid", "react-flow"].includes(adapter) ? EXAMPLES[adapter] : EXAMPLES["data-chart"];
    const spec = ["mermaid", "react-flow"].includes(adapter) ? base : { ...base, options: { ...base.options, engine: adapter } };
    assert.equal(RichViz.validate(JSON.stringify(spec)).ok, true, `${adapter} adapter example should validate`);
  }
});

test("VIZ-03: all seven dependency-free native SVG chart kinds remain valid", () => {
  for (const kind of ["bar", "horizontal-bar", "stacked-bar", "line", "area", "pie", "doughnut"]) {
    const base = EXAMPLES["data-chart"];
    const series = ["pie", "doughnut"].includes(kind) ? base.data.series.slice(0, 1) : base.data.series;
    const spec = { ...base, options: { ...base.options, engine: "native" }, data: { ...base.data, chart: kind, series } };
    assert.equal(RichViz.validate(JSON.stringify(spec)).ok, true, `${kind} native chart should validate`);
  }
});

test("VIZ-04/05: knowledge maps validate stable nodes, route tokens, edges, layout bounds and state selection", () => {
  const article = mapArticle();
  assert.equal(validateArticle(article).ok, true);
  const html = renderArticleStatic(article);
  assert.match(html, /Start here/);
  assert.match(html, /Continue to the second article/);
  assert.match(html, /course-two/);

  const duplicate = mapArticle(); duplicate.sections[0].blocks[0].props.nodes.push({ id: "root", label: "Duplicate" });
  assert.ok(validateArticle(duplicate).errors.some((issue) => issue.code === "DUPLICATE_KNOWLEDGE_MAP_NODE_ID"));
  const dangling = mapArticle(); dangling.sections[0].blocks[0].props.edges[0].target = "missing";
  assert.ok(validateArticle(dangling).errors.some((issue) => issue.code === "UNKNOWN_KNOWLEDGE_MAP_EDGE_NODE"));
  const unsafeRoute = mapArticle(); unsafeRoute.sections[0].blocks[0].props.nodes[1].articleRef = "https://example.com";
  assert.ok(validateArticle(unsafeRoute).errors.some((issue) => issue.code === "INVALID_KNOWLEDGE_MAP_ARTICLE_REF"));
  const invalidSelection = mapArticle(); invalidSelection.initialState.selectedNode.values = ["root"];
  assert.ok(validateArticle(invalidSelection).errors.some((issue) => issue.code === "INVALID_KNOWLEDGE_MAP_SELECTION_STATE"));
});

test("VIZ-04/05: automatic graph layout is deterministic, non-mutating, and keeps cycles visible", () => {
  const nodes = [{ id: "a" }, { id: "b" }, { id: "c" }];
  const edges = [{ source: "a", target: "b" }, { source: "b", target: "a" }, { source: "b", target: "c" }];
  const first = layoutKnowledgeMap(nodes, edges, { layout: "auto", dir: "ltr" });
  const second = layoutKnowledgeMap(nodes, edges, { layout: "auto", dir: "ltr" });
  assert.deepEqual(first.positions, second.positions);
  assert.equal(nodes[0].x, undefined);
  assert.ok(first.width >= 640 && first.height >= 360);
  assert.equal(new Set(first.positions.map(({ id }) => id)).size, 3);
  assert.notDeepEqual(layoutKnowledgeMap(nodes, edges, { layout: "grid", dir: "rtl" }).positions, first.positions);
});

test("VIZ-06: RichViz data bindings are scalar-only, path-bounded, cloned and immutable", () => {
  const spec = { version: 1, type: "data-chart", data: { series: [{ name: "Visitors", values: [12, 18] }] } };
  const updated = applyVisualizationBindings(spec, { "data.series.0.values.0": 33, ignored: 9, "data.__proto__.polluted": 1 });
  assert.equal(getVisualizationBindingTarget(updated, "data.series.0.values.0"), 33);
  assert.equal(spec.data.series[0].values[0], 12);
  assert.equal(({}).polluted, undefined);
  assert.equal(getVisualizationBindingTarget(updated, "data.__proto__.polluted"), undefined);
});

test("VIZ-06: article validation allows only existing typed RichViz data paths to bind", () => {
  const article = JSON.parse(readFileSync(resolve(here, "fixtures/p02/valid/minimal-article.json"), "utf8"));
  article.initialState = { score: { type: "number", value: 12, min: 0, max: 100 } };
  article.sections[0].blocks = [{ id: "bound-chart", type: "legacyViz", props: { spec: EXAMPLES["data-chart"] }, bindings: { "data.series.0.values.0": "score" } }];
  assert.equal(validateArticle(article).ok, true);
  article.sections[0].blocks[0].bindings["data.missing.value"] = "score";
  assert.ok(validateArticle(article).errors.some((issue) => issue.code === "INVALID_VIZ_BINDING_PATH"));
  article.sections[0].blocks[0].bindings = { "data.series.0.values.0": "text" };
  article.initialState.text = { type: "string", value: "twelve" };
  assert.ok(validateArticle(article).errors.some((issue) => issue.code === "VIZ_BINDING_TYPE_MISMATCH"));
});

test("VIZ-06: reactive bindings permit safe data paths only on legacy visualization blocks", () => {
  const article = mapArticle();
  article.initialState.score = { type: "number", value: 12, min: 0, max: 100 };
  article.sections[0].blocks.push({ id: "bound-chart", type: "legacyViz", bindings: { "data.series.0.values.0": "score" } });
  const store = createReactiveStore(article);
  const updates = [];
  const bindings = bindArticleBlocks(article, store, (update) => updates.push(update));
  updates.length = 0;
  store.set("score", 18);
  assert.deepEqual(updates.map(({ blockId, property, value }) => ({ blockId, property, value })), [{ blockId: "bound-chart", property: "data.series.0.values.0", value: 18 }]);
  bindings.dispose(); store.dispose();

  article.sections[0].blocks[1].type = "knowledgeMap";
  assert.throws(() => bindArticleBlocks(article, createReactiveStore(article), () => {}), /Binding .* is invalid/);
});

test("VIZ-08/09: asset catalog IDs, license separation, provenance, paths and checksums remain synchronized", () => {
  assert.equal(catalog.assets.length, 254);
  assert.equal(catalog.assets.filter((asset) => asset.license === "GPL-3.0+").length, 231);
  assert.equal(catalog.assets.filter((asset) => asset.license === "Apache-2.0").length, 23);
  for (const asset of catalog.assets) {
    const file = resolve(dirname(catalogPath), asset.path);
    assert.ok(file.startsWith(assetRoot), `asset path escaped the catalog package: ${asset.path}`);
    assert.ok(existsSync(file), `missing catalog asset ${asset.path}`);
    if (asset.sha256) assert.equal(createHash("sha256").update(readFileSync(file)).digest("hex"), asset.sha256, `checksum mismatch: ${asset.id}`);
    assert.ok(asset.author && asset.source && asset.license && asset.attribution, `provenance incomplete: ${asset.id}`);
  }
  assert.ok(existsSync(resolve(assetRoot, "Assets/Application-Icons/Captiva/LICENSE")));
  assert.ok(existsSync(resolve(assetRoot, "Assets/Application-Icons/Captiva/README.md")));
  const items = buildVisualCatalog(catalog, { assetCatalogUrl: new URL("../packages/visualization-legacy/asset-library/Assets/catalog.json", import.meta.url).href });
  assert.equal(new Set(items.map((item) => item.id)).size, items.length);
  assert.equal(items.filter((item) => item.group === "diagrams").length, 14);
  assert.equal(items.filter((item) => item.group === "engines").length, 6);
  assert.equal(items.filter((item) => item.group === "interface-icons").length, ICON_NAMES.length);
  assert.equal(items.filter((item) => item.group === "application-icons").length, 231);
  assert.equal(items.filter((item) => item.group === "illustrations").length, 12);
  assert.equal(items.filter((item) => item.group === "stickers").length, 11);
});
