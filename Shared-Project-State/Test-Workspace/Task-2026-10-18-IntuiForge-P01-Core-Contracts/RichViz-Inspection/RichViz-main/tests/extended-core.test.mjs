import assert from "node:assert/strict";
import { readFile, readdir, mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { EXAMPLES, LOCALIZED, MEDIA_EXAMPLE } from "../src/RichVisualizationExamples.js";
import { TYPE_IDS, TYPE_DEFINITIONS, validateVisualization, validateVisualizationSource, describeVisualization, parseVisualizationSource, ENGINE_CHARTS } from "../src/RichVisualizationSchema.js";
import { RENDERER_LOADERS, ADAPTER_LOADERS, ADAPTER_LIBRARIES, hasRenderer } from "../src/RichVisualizationRegistry.js";
import { ICON_NAMES, hasIcon, iconMarkup } from "../src/RichVisualizationIcons.js";
import { layerOrder, rankNodes, mapPositions, NODE_SIZE } from "../src/RichVisualizationLayout.js";
import { chartTable, formatValue, niceScale, pointTone, resolveChartEngine } from "../src/RichVisualizationCharts.js";
import { renderRichVisualizationFence, RICH_FENCE } from "../src/RichVisualizationFence.js";
import { translator } from "../src/RichVisualizationText.js";
import { mixColor, withAlpha } from "../src/adapters/Common.js";
import { mirrorModel, graphModel, wrapNodeText, NODE_MAP_ARROW } from "../src/renderers/NodeMap.js";
import { MERMAID_MODULE_URL, mermaidOptions } from "../src/adapters/MermaidAdapter.js";
import { buildChartJsConfig } from "../src/adapters/ChartJsAdapter.js";
import { buildEChartsOption } from "../src/adapters/EChartsAdapter.js";
import { buildPlotlyFigure } from "../src/adapters/PlotlyAdapter.js";
import { extractVisualizationBlocks, validatePaths } from "../src/RichVisualizationValidate.mjs";

const here = new URL("../src/", import.meta.url);
const clone = (value) => JSON.parse(JSON.stringify(value));

test("every registered type has an example, a renderer and a text description", () => {
  assert.equal(TYPE_IDS.length, 14);
  for (const id of TYPE_IDS) {
    assert.ok(EXAMPLES[id], `example for ${id}`);
    assert.ok(hasRenderer(id), `renderer for ${id}`);
    const result = validateVisualization(EXAMPLES[id]);
    assert.equal(result.ok, true, `${id}: ${JSON.stringify(result.errors)}`);
    const text = describeVisualization(result.spec);
    assert.ok(text.title && text.description);
  }
  for (const id of Object.keys(RENDERER_LOADERS)) assert.ok(TYPE_DEFINITIONS[id], `renderer ${id} has a schema`);
});

test("required families F1-F13 are all covered by registered types", () => {
  const families = new Set(TYPE_IDS.map((id) => TYPE_DEFINITIONS[id].family));
  for (const family of ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"]) assert.ok(families.has(family), family);
  assert.equal(validateVisualization(MEDIA_EXAMPLE).ok, true, "F13 media-enriched example");
  assert.ok(MEDIA_EXAMPLE.data.stages.every((stage) => stage.media), "media example uses media on its stages");
  assert.ok(TYPE_IDS.includes("svg") && TYPE_IDS.includes("custom"));
});

test("localized examples validate and keep their direction-neutral structure", () => {
  for (const [language, set] of Object.entries(LOCALIZED)) {
    for (const [type, spec] of Object.entries(set)) {
      const result = validateVisualization(spec);
      assert.equal(result.ok, true, `${language}:${type} ${JSON.stringify(result.errors)}`);
      assert.equal(spec.type, EXAMPLES[type].type);
    }
  }
});

test("source parsing reports invalid JSON and oversized input without throwing", () => {
  assert.equal(parseVisualizationSource("{nope").ok, false);
  assert.equal(validateVisualizationSource("[]").ok, false);
  assert.equal(validateVisualizationSource("x".repeat(130000)).ok, false);
  assert.equal(validateVisualizationSource(JSON.stringify(EXAMPLES["step-guide"])).ok, true);
});

test("validation rejects unknown types, unknown fields and missing accessible text", () => {
  const base = clone(EXAMPLES["step-guide"]);
  assert.equal(validateVisualization({ ...base, type: "not-a-type" }).ok, false);
  assert.equal(validateVisualization({ ...base, extra: 1 }).ok, false);
  assert.equal(validateVisualization({ ...base, title: "" }).ok, false);
  assert.equal(validateVisualization({ ...base, description: undefined }).ok, false);
  assert.equal(validateVisualization({ ...base, version: 2 }).ok, false);
  const withBadField = clone(base); withBadField.data.steps[0].onclick = "alert(1)";
  const result = validateVisualization(withBadField);
  assert.equal(result.ok, false);
  assert.match(result.errors[0].message, /Unsupported field/);
});

test("security: no HTML, scripts, URLs, unsafe media or raw colours reach a normalised spec", () => {
  const spec = clone(EXAMPLES["process-cards"]);
  spec.data.stages[0].title = "<img src=x onerror=alert(1)>";
  const ok = validateVisualization(spec);
  assert.equal(ok.ok, true, "markup is plain text, escaped by textContent at render time");
  assert.equal(ok.spec.data.stages[0].title, "<img src=x onerror=alert(1)>");
  for (const src of ["https://evil.example/a.png", "javascript:alert(1).png", "//evil/a.png", "data:image/png;base64,AAAA", "../a/../../b.png", "..\\x.png", "file.exe", "a/b/../c.png"]) {
    const bad = clone(EXAMPLES["media"] || MEDIA_EXAMPLE);
    bad.data.stages[0].media.src = src;
    assert.equal(validateVisualization(bad).ok, false, `media src ${src}`);
  }
  for (const src of ["../attachments/a.png", "media/a.svg", "/artid-resource/x/a.png", "./a.webp"]) {
    const good = clone(MEDIA_EXAMPLE); good.data.stages[0].media.src = src;
    assert.equal(validateVisualization(good).ok, true, `media src ${src}`);
  }
  const noAlt = clone(MEDIA_EXAMPLE); delete noAlt.data.stages[0].media.alt;
  assert.equal(validateVisualization(noAlt).ok, false, "meaningful media needs alt text");
  const decorative = clone(MEDIA_EXAMPLE); delete decorative.data.stages[0].media.alt; decorative.data.stages[0].media.decorative = true;
  assert.equal(validateVisualization(decorative).ok, true);
  const scene = clone(EXAMPLES.svg);
  scene.data.elements.push({ type: "path", d: "M0 0 L10 10 <script>" });
  assert.equal(validateVisualization(scene).ok, false, "path data is restricted to path commands");
  const color = clone(EXAMPLES.svg); color.data.elements[0].fill = "url(javascript:alert(1))";
  assert.equal(validateVisualization(color).ok, false, "paint is a tone, hex, none or currentColor");
  const script = clone(EXAMPLES.svg); script.data.elements.push({ type: "script", text: "x" });
  assert.equal(validateVisualization(script).ok, false, "only approved scene elements");
  const spoof = clone(EXAMPLES["step-guide"]); spoof.title = "safe‮evil";
  assert.equal(validateVisualization(spoof).ok, false, "bidi override characters are rejected");
  const icon = clone(EXAMPLES["step-guide"]); icon.data.steps[0].icon = "<svg onload=1>";
  assert.equal(validateVisualization(icon).ok, false, "icons are registry names only");
});

test("custom composer only accepts the approved block vocabulary and bounded nesting", () => {
  const spec = clone(EXAMPLES.custom);
  spec.data.blocks.push({ block: "html", html: "<b>x</b>" });
  assert.equal(validateVisualization(spec).ok, false);
  let nested = { block: "text", text: "deep" };
  for (let i = 0; i < 6; i += 1) nested = { block: "group", blocks: [nested] };
  assert.equal(validateVisualization({ ...clone(EXAMPLES.custom), data: { blocks: [nested] } }).ok, false, "nesting limit");
  const tooMany = { ...clone(EXAMPLES.custom), data: { blocks: Array.from({ length: 125 }, () => ({ block: "divider" })) } };
  assert.equal(validateVisualization(tooMany).ok, false, "block count limit");
});

test("graph rules: references exist, ids are unique, self links rejected, react-flow v1 graphs stay valid", () => {
  const flow = clone(EXAMPLES["process-flow"]);
  flow.data.edges.push({ from: "start", to: "ghost" });
  assert.equal(validateVisualization(flow).ok, false);
  const dup = clone(EXAMPLES["process-flow"]); dup.data.nodes.push({ ...dup.data.nodes[0] });
  assert.equal(validateVisualization(dup).ok, false);
  const self = clone(EXAMPLES["process-flow"]); self.data.edges.push({ from: "start", to: "start" });
  assert.equal(validateVisualization(self).ok, false);
  const legacy = { version: 1, type: "react-flow", title: "Legacy", description: "A plain version 1 graph still validates.",
    data: { graph: { version: 1, nodes: [{ id: "a", type: "default", position: { x: 0, y: 0 }, data: { label: "A" } }, { id: "b", type: "default", position: { x: 240, y: 0 }, data: { label: "B" } }], edges: [{ id: "a-b", source: "a", target: "b", type: "smoothstep" }] } } };
  assert.equal(validateVisualization(legacy).ok, true);
  const custom = clone(legacy); custom.data.graph.nodes[0].type = "myCustomNode";
  assert.equal(validateVisualization(custom).ok, false, "custom node components are not article data");
});

test("chart validation: kinds, value counts, engine capability and pie shape", () => {
  const bar = clone(EXAMPLES["bar-chart"]);
  bar.data.series[0].values = [1, 2];
  assert.equal(validateVisualization(bar).ok, false, "one value per label");
  const pie = clone(EXAMPLES["data-chart"]); pie.data.chart = "pie";
  assert.equal(validateVisualization(pie).ok, false, "pie uses one series");
  const barKind = clone(EXAMPLES["bar-chart"]); barKind.data.chart = "line";
  assert.equal(validateVisualization(barKind).ok, false, "bar-chart accepts bar kinds only");
  const native = clone(EXAMPLES["data-chart"]); native.data.chart = "radar"; native.options.engine = "native";
  assert.equal(validateVisualization(native).ok, false, "native baseline cannot draw radar");
  for (const engine of ["auto", "chartjs", "recharts", "echarts", "plotly"]) {
    const spec = clone(EXAMPLES["bar-chart"]); spec.options.engine = engine;
    assert.equal(validateVisualization(spec).ok, true, engine);
  }
  const scatter = { version: 1, type: "data-chart", title: "Scatter", description: "Points", data: { chart: "scatter", series: [{ name: "s", values: [[1, 2], [3, 4]] }] } };
  assert.equal(validateVisualization(scatter).ok, true);
  assert.equal(validateVisualization({ ...scatter, data: { chart: "scatter", series: [{ name: "s", values: [[1]] }] } }).ok, false);
  assert.deepEqual(Object.keys(ENGINE_CHARTS).sort(), ["chartjs", "echarts", "native", "plotly", "recharts"]);
});

test("chart helpers are engine-neutral: tones, tables, formatting, scales and engine choice", () => {
  const spec = validateVisualization(EXAMPLES["bar-chart"]).spec;
  assert.equal(pointTone(spec.data, 0, 2), "accent", "highlighted bar");
  assert.notEqual(pointTone(spec.data, 0, 0), "accent");
  const table = chartTable(spec.data, "en");
  assert.deepEqual(table.head, ["", "Monthly cost"]);
  assert.deepEqual(table.rows[2], ["Model C", "$60"]);
  assert.equal(formatValue(null), "–");
  assert.equal(formatValue(45, "%"), "45%");
  const scale = niceScale(0, 240);
  assert.ok(scale.max >= 240 && scale.ticks[0] === 0);
  assert.equal(resolveChartEngine({ engine: "auto" }), "chartjs");
  assert.equal(resolveChartEngine({ engine: "echarts" }), "echarts");
  assert.equal(resolveChartEngine(undefined), "chartjs");
});

test("layout ranks DAGs, tolerates cycles and keeps author coordinates", () => {
  const ids = ["a", "b", "c", "d"];
  const { rank } = rankNodes(ids, [{ from: "a", to: "b" }, { from: "b", to: "c" }, { from: "c", to: "a" }, { from: "a", to: "d" }]);
  assert.ok(rank.get("b") > rank.get("a") && rank.get("c") > rank.get("b"), "cycle back-edge ignored");
  const { layers } = layerOrder(["a", "b", "d"], [{ from: "a", to: "b" }, { from: "a", to: "d" }]);
  assert.deepEqual(layers[0], ["a"]);
  assert.equal(layers[1].length, 2);
  const map = validateVisualization(EXAMPLES["node-map"]).spec.data;
  for (const layout of ["layered", "radial", "grid"]) {
    const positions = mapPositions({ ...map, layout });
    assert.equal(positions.size, map.nodes.length);
    for (const point of positions.values()) assert.ok(Number.isFinite(point.x) && Number.isFinite(point.y) && point.x >= 0 && point.y >= 0);
  }
  const pinned = clone(map); pinned.nodes[0].x = 500; pinned.nodes[0].y = 300;
  const positions = mapPositions(pinned);
  assert.ok(positions.get(pinned.nodes[0].id).x >= 0);
  assert.ok(NODE_SIZE.width > 0);
});


test("Arabic node-map subtitles wrap within the card and reserve room before group tags", () => {
  assert.deepEqual(wrapNodeText("مصطلحات ومهارات البداية", 18, 2), ["مصطلحات ومهارات", "البداية"]);
  assert.equal(NODE_SIZE.height, 120);
});

test("node-map arrow marker tip aligns with the SVG path endpoint", () => {
  assert.equal(NODE_MAP_ARROW.tipX, NODE_MAP_ARROW.size);
  assert.equal(NODE_MAP_ARROW.tipY, NODE_MAP_ARROW.size / 2);
});

test("graph toolbar exposes distinct fit and fullscreen icons", async () => {
  const { CONTROL_ICONS } = await import("../src/RichVisualizationControls.js");
  assert.equal(CONTROL_ICONS.fitView, "target");
  assert.equal(CONTROL_ICONS.fullscreen, "expand");
  assert.notEqual(CONTROL_ICONS.fitView, CONTROL_ICONS.fullscreen);
});

test("icon registry is trusted markup only", () => {
  assert.ok(ICON_NAMES.length >= 80);
  assert.equal(hasIcon("git-branch"), true);
  assert.equal(hasIcon("<script>"), false);
  assert.equal(iconMarkup("nope"), "");
  assert.match(iconMarkup("shield"), /^<svg class="rev-icon"[^>]*aria-hidden="true"/);
  for (const name of ICON_NAMES) assert.doesNotMatch(iconMarkup(name), /<script|on\w+=|javascript:/i, name);
});

test("fence markup is inert: source kept as text, title/description escaped", () => {
  const spec = clone(EXAMPLES["step-guide"]);
  spec.title = '<b onclick="x">T</b>';
  const html = renderRichVisualizationFence(JSON.stringify(spec));
  assert.match(html, /data-article-diagram="edu-viz"/);
  assert.match(html, /<template class="article-diagram__source">/);
  assert.doesNotMatch(html, /<b onclick/);
  assert.match(html, /&lt;b onclick/);
  assert.equal(renderRichVisualizationFence("x".repeat(130000)), null);
  assert.match(renderRichVisualizationFence("{broken"), /Article visualization/);
});

test("engine adapters point at local packs; vendor code remains outside the runtime source", async () => {
  const vendorRoot = new URL("../External-Libraries/", import.meta.url);
  for (const [adapter, id] of Object.entries(ADAPTER_LIBRARIES)) {
    assert.ok(ADAPTER_LOADERS[adapter], adapter);
    const files = await readdir(new URL(`${id}/active/`, vendorRoot));
    assert.ok(files.length, `local files for ${id}`);
    assert.ok(files.some((name) => /LICENSE|NOTICE|THIRD-PARTY/i.test(name)) || ["react-flow", "recharts"].includes(id), `${id} carries license metadata or notices`);
  }
  const walk = async (dir, found = []) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = new URL(entry.isDirectory() ? `${entry.name}/` : entry.name, dir);
      if (entry.isDirectory()) await walk(path, found); else found.push(path);
    }
    return found;
  };
  for (const file of await walk(here)) {
    const name = file.pathname.split("/").pop();
    if (!/\.(js|mjs)$/.test(name) || name.startsWith("test-")) continue;
    const size = (await readFile(file)).length;
    assert.ok(size < 60000, `${name} (${size} bytes) must stay a small, focused module rather than a vendored library`);
    const text = await readFile(file, "utf8");
    assert.doesNotMatch(text, /\/\*! (?:Chart\.js|Plotly|echarts)|Apache ECharts v|react\.production|plotly\.js v/i, `${name} must not embed a third-party distribution`);
  }
});

test("Recharts and React Flow share one local React runtime", async () => {
  const common = await readFile(new URL("../src/adapters/Common.js", import.meta.url), "utf8");
  const flow = await readFile(new URL("../src/adapters/ReactFlowAdapter.js", import.meta.url), "utf8");
  const recharts = await readFile(new URL("../src/adapters/RechartsAdapter.js", import.meta.url), "utf8");
  assert.match(common, /SHARED_RUNTIME_URL.*libraryUrl\("react-flow"/s);
  assert.match(flow, /SHARED_RUNTIME_URL/);
  assert.match(recharts, /SHARED_RUNTIME_URL/);
  assert.doesNotMatch(recharts, /react-dom\/client|from "react"/, "the Recharts adapter never imports its own React");
});

test("Mermaid keeps strict security options while gaining design-token colours", () => {
  assert.match(MERMAID_MODULE_URL, /External-Libraries\/mermaid\//);
  const theme = { ink: "#252923", muted: "#6f756d", line: "#d9d3c6", card: "#fffdf7", card2: "#f8f4e9", font: "system-ui",
    tones: Object.fromEntries(["neutral", "accent", "info", "success", "warning", "danger", "violet", "teal", "pink", "orange"].map((tone) => [tone, "#2563c9"])) };
  const options = mermaidOptions(theme);
  assert.equal(options.securityLevel, "strict");
  assert.equal(options.htmlLabels, false);
  assert.equal(options.flowchart.htmlLabels, false);
  assert.equal(options.theme, "base");
  assert.equal(options.themeVariables.fontSize, "16px");
  assert.notEqual(options.themeVariables.primaryColor, "#ececff", "not the raw Mermaid default look");
  assert.equal(mixColor("#ffffff", "#000000", 0.5), "#808080");
  assert.equal(mixColor("var(--x)", "#000000", 0.5), "var(--x)");
  assert.equal(withAlpha("#102030", 0.5), "rgba(16, 32, 48, 0.5)");
});

test("interface strings exist for Arabic, English and Russian with an English fallback", () => {
  for (const language of ["en", "ar", "ru"]) {
    const t = translator(language);
    for (const key of ["textVersion", "failed", "invalid", "makeInteractive", "backToStatic", "interactiveFailed", "nodeHint", "chartTable", "engineFallback"]) assert.ok(t(key) && t(key) !== key, `${language}.${key}`);
  }
  assert.equal(translator("de")("textVersion"), translator("en")("textVersion"));
  assert.notEqual(translator("ar")("textVersion"), translator("en")("textVersion"));
});

test("stylesheet scopes everything, supports the four themes, RTL and reduced motion", async () => {
  const css = await readFile(new URL("../src/rich-visualization.css", import.meta.url), "utf8");
  assert.match(css, /:root\[data-theme="dark"\] \.rev/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /:dir\(rtl\)|\[dir="rtl"\]/);
  assert.match(css, /@container rev/);
  assert.match(css, /--rev-t-info/);
  assert.match(css, /font-size: 16px;/, "the visualization base meets the 16px text floor");
  assert.match(css, /font-size: max\(16px, var\(--reading-size, 16px\)\) !important/, "instructional labels cannot drop below 16px");
  const selectors = css.replace(/\/\*[\s\S]*?\*\//g, "").split("}").map((rule) => rule.split("{")[0].trim()).map((s) => s.replace(/:is\([^()]*(?:\([^()]*\))?[^()]*\)/g, ":is-direction")).filter((s) => s && !s.startsWith("@") && !/^\d/.test(s) && !/^(?:from|to)$/.test(s));
  const unscoped = selectors.filter((selector) => selector.split(",").some((part) => { const p = part.trim(); return p && !/\.rev|\.article-diagram--mermaid|^:root\[data-theme="dark"\]/.test(p); }));
  assert.deepEqual(unscoped, [], "every rule is scoped to .rev (or the legacy Mermaid token host)");
});

test("command-line validator finds edu-viz blocks and reports invalid ones with their line", async () => {
  const markdown = `# T

\`\`\`edu-viz
${JSON.stringify(EXAMPLES["step-guide"])}
\`\`\`

text

\`\`\`mermaid
flowchart TD
  A-->B
\`\`\`

\`\`\`edu-viz
{"version":1,"type":"nope"}
\`\`\`
`;
  const blocks = extractVisualizationBlocks(markdown);
  assert.equal(blocks.length, 2, "mermaid fences are not edu-viz blocks");
  assert.equal(blocks[0].line, 4);
  const dir = await mkdtemp(join(tmpdir(), "rev-validate-"));
  try {
    await writeFile(join(dir, "a.md"), markdown, "utf8");
    await writeFile(join(dir, "ok.json"), JSON.stringify(EXAMPLES.pipeline), "utf8");
    const lines = [];
    const result = await validatePaths([dir], (line) => lines.push(line));
    assert.deepEqual(result, { checked: 3, failed: 1 });
    assert.ok(lines.some((line) => line.startsWith("FAIL") && line.includes("a.md:")));
    assert.ok(lines.some((line) => line.startsWith("OK") && line.includes("pipeline")));
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test("Rich runtime modules import only inside their library folder", async () => {
  const check = async (dir, depth) => {
    for (const entry of await readdir(new URL(dir, here), { withFileTypes: true })) {
      if (entry.isDirectory()) { if (entry.name !== "gallery") await check(`${dir}${entry.name}/`, depth + 1); continue; }
      if (!/\.js$/.test(entry.name)) continue;
      const text = await readFile(new URL(`${dir}${entry.name}`, here), "utf8");
      for (const match of text.matchAll(/(?:from|import\()\s*"(\.[^"]+)"/g)) {
        const parts = match[1].split("/");
        const up = parts.filter((part) => part === "..").length;
        assert.ok(up <= depth, `${dir}${entry.name} imports ${match[1]} outside the library folder`);
      }
    }
  };
  await check("", 0);
});

const THEME = { ink: "#252923", muted: "#6f756d", line: "#d9d3c6", card: "#fffdf7", card2: "#f8f4e9", font: "system-ui", dark: false,
  tones: Object.fromEntries(["neutral", "accent", "info", "success", "warning", "danger", "violet", "teal", "pink", "orange"].map((tone, i) => [tone, ["#66707c", "#1f6b57", "#2563c9", "#1b7f55", "#9a6200", "#b83a33", "#6f3fc4", "#0b7f82", "#b4366f", "#bb5a10"][i]])) };
const CTX = { lang: "en", dir: "ltr", summary: "x" };

test("engine adapters build complete option objects for every chart kind without undefined holes", () => {
  const hasUndefined = (value, path = "") => {
    if (value === undefined) return path;
    if (Array.isArray(value)) { for (const [i, v] of value.entries()) { const hit = hasUndefined(v, `${path}[${i}]`); if (hit) return hit; } return null; }
    if (value && typeof value === "object" && !(value instanceof Function)) { for (const [k, v] of Object.entries(value)) { if (v === undefined && Object.hasOwn(value, k)) return `${path}.${k}`; const hit = hasUndefined(v, `${path}.${k}`); if (hit) return hit; } }
    return null;
  };
  const kinds = { bar: "bar-chart", "horizontal-bar": "bar-chart", "stacked-bar": "bar-chart", line: "data-chart", area: "data-chart", pie: "data-chart", doughnut: "data-chart", radar: "data-chart", scatter: "data-chart" };
  for (const [kind, type] of Object.entries(kinds)) {
    const base = clone(EXAMPLES[type]);
    base.data.chart = kind;
    if (kind === "pie" || kind === "doughnut") base.data.series = [base.data.series[0]];
    if (kind === "scatter") { base.data.series = [{ name: "s", values: [[1, 2], [3, 4]] }]; delete base.data.labels; }
    const spec = validateVisualization(base);
    assert.equal(spec.ok, true, `${kind}: ${JSON.stringify(spec.errors)}`);
    const config = buildChartJsConfig(spec.spec.data, THEME, CTX);
    // Chart.js treats an explicit undefined as "set", which once replaced the category-axis label callback with a numeric one.
    assert.equal(hasUndefined(config.options.scales), null, `Chart.js ${kind} scales`);
    assert.ok(buildEChartsOption(spec.spec.data, THEME, CTX).series.length >= 1, `ECharts ${kind}`);
    const figure = buildPlotlyFigure(spec.spec.data, THEME, CTX);
    assert.ok(figure.traces.length >= 1, `Plotly ${kind}`);
  }
  const bar = buildChartJsConfig(validateVisualization(EXAMPLES["bar-chart"]).spec.data, THEME, CTX);
  assert.equal(Object.hasOwn(bar.options.scales.x.ticks, "callback"), false, "category axis keeps Chart.js's own label callback");
  const horizontal = clone(EXAMPLES["bar-chart"]); horizontal.data.chart = "horizontal-bar";
  const h = buildChartJsConfig(validateVisualization(horizontal).spec.data, THEME, CTX);
  assert.equal(Object.hasOwn(h.options.scales.y.ticks, "callback"), false);
  assert.equal(typeof h.options.scales.x.ticks.callback, "function");
});

test("stylesheet isolates visualizations from article prose rules", async () => {
  const css = await readFile(new URL("../src/rich-visualization.css", import.meta.url), "utf8");
  assert.match(css, /\.rev\.rev :is\(p, ul, ol, li, figure/, "doubled-class reset beats generic .article-body element rules");
  assert.match(css, /place-items: normal/, "the article canvas's centering grid must not shrink the frame");
  assert.match(css, /max-width: 100% !important/, "Mermaid's inline max-width must not overflow the column");
});

test("node maps mirror horizontally for right-to-left reading and keep vertical positions", () => {
  const spec = validateVisualization(EXAMPLES["node-map"]).spec;
  const model = graphModel(spec);
  const mirrored = mirrorModel(model);
  const first = model.nodes[0]; const flipped = mirrored.nodes[0];
  assert.equal(flipped.position.y, first.position.y);
  const right = Math.max(...model.nodes.map((n) => n.position.x)) + NODE_SIZE.width;
  assert.equal(flipped.position.x, right - NODE_SIZE.width - first.position.x);
  const left = Math.min(...model.nodes.map((n) => n.position.x));
  assert.equal(Math.max(...mirrored.nodes.map((n) => n.position.x)), right - NODE_SIZE.width - left);
});

test("JSON validator mode returns one result per block with media references for the Validation Center", async () => {
  const { validateBlockList, collectMedia } = await import("../src/RichVisualizationValidate.mjs");
  const withMedia = clone(MEDIA_EXAMPLE);
  const results = validateBlockList([{ id: "a", source: JSON.stringify(withMedia) }, { id: "b", source: "{" }, { id: "c", source: JSON.stringify({ version: 1, type: "nope" }) }]);
  assert.deepEqual(results.map((r) => [r.id, r.ok]), [["a", true], ["b", false], ["c", false]]);
  assert.deepEqual(results[0].media.sort(), ["media/sample-checks.svg", "media/sample-pr-list.svg"]);
  assert.ok(results[1].errors[0].message.includes("not valid JSON"));
  assert.deepEqual(collectMedia({ a: [{ src: "x.png", alt: "A" }, { src: "not-media" }] }), ["x.png"]);
});

