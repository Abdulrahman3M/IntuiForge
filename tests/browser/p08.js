import { createIntuiEngine } from "/packages/core/src/index.js";
import { validateArticle } from "/packages/article/src/index.js";
import { registerArticleRenderer } from "/packages/article-renderer/src/index.js";
import { RichViz } from "/packages/visualization-legacy/src/index.js";
import { EXAMPLES, EXAMPLES_CATALOG } from "/packages/visualization-legacy/vendor/RichViz-main/src/RichVisualizationExamples.js";

const status = document.getElementById("audit-status");
const log = document.getElementById("audit-log");
const surface = document.getElementById("audit-surface");
const results = [];
const wait = (milliseconds = 180) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function engineSpec(adapter) {
  if (adapter === "mermaid") return EXAMPLES.mermaid;
  if (adapter === "react-flow") return EXAMPLES["react-flow"];
  return { ...EXAMPLES["data-chart"], options: { ...EXAMPLES["data-chart"].options, engine: adapter } };
}

function nativeSpec(kind) {
  const base = EXAMPLES["data-chart"];
  const series = ["pie", "doughnut"].includes(kind) ? base.data.series.slice(0, 1) : base.data.series;
  return { ...base, options: { ...base.options, engine: "native" }, data: { ...base.data, chart: kind, series } };
}

async function auditRender(label, spec) {
  surface.replaceChildren();
  const mount = document.createElement("div"); mount.className = "audit-render"; mount.setAttribute("aria-label", `${label} live preview`); surface.appendChild(mount);
  try {
    const handle = RichViz.render(mount, JSON.stringify(spec), { document, lang: "ar", dir: "rtl" });
    await handle.ready;
    await wait(120);
    const result = { label, state: mount.dataset.revState ?? "missing", hasOutput: mount.childElementCount > 0, output: mount.querySelector("svg,canvas,.rev__stage")?.tagName ?? "none" };
    results.push(result);
    await handle.dispose();
    return result;
  } catch (error) {
    const result = { label, state: "error", message: String(error?.message ?? error) };
    results.push(result);
    return result;
  }
}

async function runEngineAudit() {
  const coveredTypes = new Set();
  for (const entry of EXAMPLES_CATALOG) {
    if (!RichViz.types.includes(entry.spec.type) || coveredTypes.has(entry.spec.type)) continue;
    coveredTypes.add(entry.spec.type);
    await auditRender(`type:${entry.spec.type}`, entry.spec);
  }
  for (const adapter of ["mermaid", "react-flow", "chartjs", "recharts", "echarts", "plotly"]) await auditRender(`adapter:${adapter}`, engineSpec(adapter));
  for (const chart of ["bar", "horizontal-bar", "stacked-bar", "line", "area", "pie", "doughnut"]) await auditRender(`native:${chart}`, nativeSpec(chart));
  return { coveredTypes: [...coveredTypes], results: [...results] };
}

const article = {
  kind: "intui.article", schemaVersion: "1.0.0", id: "p08-visual-article", locale: "ar", dir: "rtl",
  title: "خريطة تعلّم تفاعلية", summary: "خريطة تربط المفاهيم بملخصاتها ومسارات الانتقال بين المقالات.",
  metadata: { status: "draft", contentType: "article", sources: [], canonicalReferences: [], supportedLocales: ["ar"], provenance: [] },
  assets: [], derived: {},
  initialState: {
    score: { type: "number", value: 12, min: 0, max: 100, step: 1 },
    selectedNode: { type: "enum", value: "overview", values: ["overview", "lesson", "resources"] },
  },
  sections: [{ id: "map-section", heading: "مسار المفاهيم", blocks: [
    { id: "score-slider", type: "slider", content: "قيمة المخطط", props: { min: 0, max: 100, step: 1 }, bindings: { value: "score" }, events: { input: { action: "setState", variable: "score", valueFrom: "event.value" }, change: { action: "setState", variable: "score", valueFrom: "event.value" } } },
    { id: "bound-chart", type: "legacyViz", props: { description: "مخطط يتغير مع حالة المقال", spec: { version: 1, type: "data-chart", title: "قيمة متغيرة", description: "قيمة مرتبطة بحالة المقال", options: { engine: "native" }, data: { chart: "bar", labels: ["الآن"], series: [{ name: "القيمة", values: [12] }] } } }, bindings: { "data.series.0.values.0": "score" } },
    { id: "course-map", type: "knowledgeMap", bindings: { selected: "selectedNode" }, props: {
      title: "خريطة التعلّم", description: "مسار من المفهوم الأساسي إلى الدرس التالي والمراجع.", layout: "layered", pan: true, zoom: true, pinchZoom: true, minimap: true,
      nodes: [
        { id: "overview", label: "المفهوم الأساسي", summary: "ابدأ من الفكرة المحورية وعلاقاتها." },
        { id: "lesson", label: "الدرس التالي", summary: "انتقل إلى الشرح المتقدم والتطبيق.", articleRef: "next-lesson" },
        { id: "resources", label: "المراجع", summary: "مصادر ومواد للتوسع بعد إكمال الدرس." },
      ], edges: [{ id: "overview-lesson", source: "overview", target: "lesson", label: "يتوسع إلى" }, { id: "lesson-resources", source: "lesson", target: "resources", label: "مصادر" }],
    } },
  ] }],
};

const boundVisualSpecs = [];
const routes = [];
const engine = createIntuiEngine({ validateArticle });
engine.registerAdapter({
  id: "org.intuiforge.richviz", version: "0.5.0", capabilities: ["visualization"],
  render(container, spec, options = {}) {
    boundVisualSpecs.push(JSON.parse(JSON.stringify(spec)));
    return RichViz.render(container, JSON.stringify(spec), options);
  },
});
registerArticleRenderer(engine, { theme: "light" });
const articleMount = document.getElementById("article-host");
const articleErrors = [];
const articleHandle = engine.mount(articleMount, article, { document, onNavigate(route, context) { routes.push({ route, context }); }, onError(error, where) { articleErrors.push({ message: error?.message ?? String(error), where, code: error?.code, cause: error?.cause?.message, stack: error?.stack, issues: error?.issues }); } });
window.P08Debug = { article, articleHandle, boundVisualSpecs, routes, articleErrors, validation: validateArticle(article) };

const ready = (async () => {
  status.textContent = "جاري عرض الأنواع والمحركات الستة والمخططات الأصلية…";
  const articleResult = await articleHandle.ready;
  const compatibility = await runEngineAudit();
  const mapRoot = articleMount.shadowRoot?.querySelector("[data-map-block='course-map']");
  const mapNodes = mapRoot?.querySelectorAll(".if-map-node").length ?? 0;
  const mapViewport = mapRoot?.querySelector(".if-map-viewport");
  const viewportBounds = mapViewport?.getBoundingClientRect();
  const selectedMapNode = mapRoot?.querySelector(".if-map-node[aria-pressed='true']");
  const selectedBounds = selectedMapNode?.getBoundingClientRect();
  const selectedNodeInsideViewport = Boolean(viewportBounds?.width && viewportBounds?.height && selectedBounds) && selectedBounds.left >= viewportBounds.left - 1 && selectedBounds.right <= viewportBounds.right + 1 && selectedBounds.top >= viewportBounds.top - 1 && selectedBounds.bottom <= viewportBounds.bottom + 1;
  const report = {
    articleStatus: articleResult.status,
    typeCount: compatibility.coveredTypes.length,
    adapterCount: compatibility.results.filter((entry) => entry.label.startsWith("adapter:")).length,
    nativeSvgChartCount: compatibility.results.filter((entry) => entry.label.startsWith("native:")).length,
    mapNodeCount: mapNodes,
    mapEdgeCount: mapRoot?.querySelectorAll(".if-map-edge").length ?? 0,
    selectedNodeInsideViewport,
    asset: "See Visual Browser asset catalog audit",
    compatibility: compatibility.results,
    articleErrors,
  };
  window.P08Harness = {
    report, results, articleHandle, articleMount, mapRoot, boundVisualSpecs, routes,
    getState: () => ({ selectedNodes: [...(mapRoot?.querySelectorAll(".if-map-node[aria-pressed='true']") ?? [])].map((node) => node.getAttribute("data-node-id")), boundValue: boundVisualSpecs.at(-1)?.data?.series?.[0]?.values?.[0] }),
    async selectNode(id) { mapRoot?.querySelector(`[data-map-action='select-node'][data-node-id='${id}']`)?.click(); await wait(); return [...(mapRoot?.querySelectorAll(".if-map-node[aria-pressed='true']") ?? [])].map((node) => node.getAttribute("data-node-id")); },
    async followArticle() { mapRoot?.querySelector(".if-map-open-article")?.click(); await wait(); return routes.at(-1); },
    async zoom() { const stage = mapRoot?.querySelector(".if-map-stage"); const before = stage?.style.transform; mapRoot?.querySelector("[data-map-action='zoom-in']")?.click(); await wait(30); return { before, after: stage?.style.transform }; },
    async toggleText() { const viewport = mapRoot?.querySelector(".if-map-viewport"); mapRoot?.querySelector("[data-map-action='toggle-text']")?.click(); const shown = mapRoot?.querySelector(".if-map-text-alternative")?.hidden === false && viewport?.hidden === true; mapRoot?.querySelector("[data-map-action='toggle-text']")?.click(); return shown; },
    async toggleInteractive() { const viewport = mapRoot?.querySelector(".if-map-viewport"); mapRoot?.querySelector("[data-map-action='toggle-interactive']")?.click(); return viewport?.getAttribute("data-interactive"); },
    async pan() { const viewport = mapRoot?.querySelector(".if-map-viewport"); const stage = mapRoot?.querySelector(".if-map-stage"); const before = stage?.style.transform; viewport?.dispatchEvent(new PointerEvent("pointerdown", { pointerId: 31, clientX: 100, clientY: 100, bubbles: true })); viewport?.dispatchEvent(new PointerEvent("pointermove", { pointerId: 31, clientX: 145, clientY: 130, bubbles: true })); viewport?.dispatchEvent(new PointerEvent("pointerup", { pointerId: 31, clientX: 145, clientY: 130, bubbles: true })); return { before, after: stage?.style.transform }; },
    async pinch() { const viewport = mapRoot?.querySelector(".if-map-viewport"); const stage = mapRoot?.querySelector(".if-map-stage"); const before = stage?.style.transform; viewport?.dispatchEvent(new PointerEvent("pointerdown", { pointerId: 41, clientX: 100, clientY: 100, bubbles: true })); viewport?.dispatchEvent(new PointerEvent("pointerdown", { pointerId: 42, clientX: 200, clientY: 100, bubbles: true })); viewport?.dispatchEvent(new PointerEvent("pointermove", { pointerId: 42, clientX: 255, clientY: 100, bubbles: true })); viewport?.dispatchEvent(new PointerEvent("pointerup", { pointerId: 41, clientX: 100, clientY: 100, bubbles: true })); viewport?.dispatchEvent(new PointerEvent("pointerup", { pointerId: 42, clientX: 255, clientY: 100, bubbles: true })); return { before, after: stage?.style.transform }; },
    async updateBoundData(value) { const input = articleMount.shadowRoot?.querySelector("#score-slider input"); if (input) { input.value = String(value); input.dispatchEvent(new Event("input", { bubbles: true })); input.dispatchEvent(new Event("change", { bubbles: true })); } await wait(400); return boundVisualSpecs.at(-1)?.data?.series?.[0]?.values?.[0]; },
    async dispose() { await articleHandle.dispose(); },
  };
  log.textContent = JSON.stringify(report, null, 2);
  status.textContent = compatibility.results.every((entry) => entry.state === "ready") && mapNodes === 3 && selectedNodeInsideViewport ? "اجتاز فحص P08 المرئي جميع الأنواع والمحركات والخرائط." : "ظهرت عناصر تحتاج مراجعة في فحص P08؛ راجع سجل الفحص.";
  document.documentElement.dataset.p08Audit = "ready";
  return report;
})();
window.P08Ready = ready;
