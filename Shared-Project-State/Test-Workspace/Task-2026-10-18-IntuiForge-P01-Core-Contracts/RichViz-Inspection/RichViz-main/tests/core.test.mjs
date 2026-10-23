import test from "node:test";
import assert from "node:assert/strict";
import { DIAGRAM_REGISTRY, RENDERER_LOADERS, ADAPTER_LIBRARIES } from "../src/RichVisualizationRegistry.js";
import { EXAMPLES_CATALOG, EXAMPLES, MEDIA_EXAMPLE } from "../src/RichVisualizationExamples.js";
import { TYPE_IDS, TYPE_DEFINITIONS, validateVisualization, validateVisualizationSource } from "../src/RichVisualizationSchema.js";
import { readFile } from "node:fs/promises";

test("each registered diagram has one schema, one renderer, docs and an example", async () => {
  assert.equal(DIAGRAM_REGISTRY.length, TYPE_IDS.length);
  for (const row of DIAGRAM_REGISTRY) {
    assert.ok(TYPE_DEFINITIONS[row.id]);
    assert.ok(RENDERER_LOADERS[row.id]);
    assert.equal(row.static, true);
    assert.ok(row.documentation.endsWith(`${row.id}.md`));
    await readFile(new URL(`../${row.documentation}`, import.meta.url));
    await readFile(new URL(`../${row.example}`, import.meta.url));
  }
});

test("all 24 curated examples validate and the nine additions retain distinct models", () => {
  assert.equal(EXAMPLES_CATALOG.length, 24);
  assert.equal(EXAMPLES_CATALOG.filter((entry) => entry.group === "patterns").length, 9);
  for (const entry of EXAMPLES_CATALOG) assert.equal(validateVisualization(entry.spec).ok, true, entry.id);
  const types = EXAMPLES_CATALOG.filter((entry) => entry.group === "patterns").map((entry) => entry.spec.data.chart || entry.spec.type);
  assert.deepEqual(types.slice(0, 4), ["stacked-bar", "doughnut", "radar", "scatter"]);
  assert.deepEqual(types.slice(4), ["mermaid", "mermaid", "mermaid", "mermaid", "custom"]);
  assert.equal(validateVisualization(MEDIA_EXAMPLE).ok, true);
});

test("unified public API parses strings through the same schema authority", () => {
  assert.equal(validateVisualizationSource(JSON.stringify(EXAMPLES["step-guide"])).ok, true);
  assert.equal(validateVisualizationSource("{}").ok, false);
});

test("engine adapters resolve to separately packaged local distributions", async () => {
  const common = await readFile(new URL("../src/adapters/Common.js", import.meta.url), "utf8");
  assert.match(common, /new URL\("\.\.\/\.\.\/External-Libraries\//);
  for (const id of Object.values(ADAPTER_LIBRARIES)) await readFile(new URL(`../External-Libraries/${id}/active/`, import.meta.url)).catch(async () => {
    const { readdir } = await import("node:fs/promises");
    const items = await readdir(new URL(`../External-Libraries/${id}/active/`, import.meta.url));
    assert.ok(items.length, `${id} has local distribution files`);
  });
});


test("node-map reader provides clear arrowheads and fullscreen in both modes with an accessible text disclosure", async () => {
  const [renderer, styles, strings] = await Promise.all([
    readFile(new URL("../src/renderers/NodeMap.js", import.meta.url), "utf8"),
    readFile(new URL("../src/rich-visualization.css", import.meta.url), "utf8"),
    readFile(new URL("../src/RichVisualizationText.js", import.meta.url), "utf8"),
  ]);
  assert.match(renderer, /markerEnd: \{ type: "arrowclosed" \}/);
  assert.match(renderer, /requestFullscreen/);
  assert.match(renderer, /exitFullscreen/);
  assert.match(renderer, /fullscreenUnavailable/);
  assert.match(styles, /\.rev-map:fullscreen/);
  assert.match(styles, /\.rev-map__bar \.rev-btn \{ min-inline-size: 44px; min-block-size: 44px/);
  assert.match(styles, /\.rev-flow-frame:fullscreen/);
  assert.match(styles, /\.rev-flow-host \.react-flow__arrowhead polyline\.arrowclosed/);
  assert.match(styles, /\.rev__alt > summary:focus-visible/);
  assert.match(strings, /exitFullscreen:/);
});
