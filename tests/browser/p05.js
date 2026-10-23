import { createIntuiEngine } from "/packages/core/src/index.js";
import { validateArticle } from "/packages/article/src/index.js";
import { registerArticleRenderer } from "/packages/article-renderer/src/index.js";
import { registerRichVizAdapter } from "/packages/visualization-legacy/src/index.js";

const article = {
  kind: "intui.article", schemaVersion: "1.0.0", id: "p05-browser-article", locale: "ar", dir: "rtl",
  title: "تغيّر الحرارة في نموذج مبسّط",
  summary: "هذا مثال عربي يختبر تركيب النص والتحكم والرسوم داخل مقال واحد مستقل وقابل للقراءة.",
  metadata: { status: "draft", contentType: "science", sources: [], canonicalReferences: [], supportedLocales: ["ar"], provenance: [] },
  assets: [],
  initialState: {
    temperature: { type: "number", value: 20, min: 0, max: 100, step: 1 },
    activeTab: { type: "enum", value: "first-panel", values: ["first-panel", "second-panel"] },
  },
  derived: {},
  sections: [
    { id: "overview", heading: "نظرة عامة", blocks: [
    { id: "explanation", type: "paragraph", content: "حرّك المنزلق لملاحظة تحديث القراءة والتمثيل معًا، ثم انتقل إلى [قراءة النتائج](#analysis)." },
    { id: "temperature-control", type: "slider", content: "درجة الحرارة", props: { min: 0, max: 100, step: 1 }, bindings: { value: "temperature" }, events: { change: { action: "setState", variable: "temperature", valueFrom: "event.value" } } },
    { id: "temperature-metric", type: "metric", props: { label: "القراءة الحالية", unit: "°C" }, bindings: { value: "temperature" } },
    { id: "article-tabs", type: "tabs", bindings: { selected: "activeTab" }, children: [
      { id: "first-panel", type: "group", props: { label: "المبدأ" }, children: [{ id: "first-copy", type: "paragraph", content: "تغيّر الحالة يعتمد على درجة الحرارة والضغط." }] },
      { id: "second-panel", type: "group", props: { label: "ملاحظة" }, children: [{ id: "second-copy", type: "paragraph", content: "القيم المعروضة توضيحية ضمن هذا المثال." }] },
    ] },
    { id: "details", type: "accordion", content: "تفاصيل النموذج", children: [{ id: "details-copy", type: "paragraph", content: "هذا النموذج لا يحسب تغير الضغط." }] },
    { id: "legacy-guide", type: "legacyViz", props: { description: "خطوات قراءة الرسم", spec: { version: 1, type: "step-guide", title: "قراءة الرسم", description: "خطوات تفسير المقياس", data: { steps: [{ title: "راقب", text: "لاحظ تغير القيمة" }] } } } },
  ] },
    { id: "analysis", heading: "قراءة النتائج", blocks: [{ id: "analysis-copy", type: "paragraph", content: "يتغير المؤشر والرسم المتوافق مع قيمة الحالة المشتركة." }] },
  ],
};

const host = document.querySelector("#host");
const hostStyleBefore = host.getAttribute("style");
const engine = createIntuiEngine({ validateArticle });
registerRichVizAdapter(engine);
registerArticleRenderer(engine, { theme: "system" });
const renderErrors = [];
const handle = engine.mount(host, article, {
  theme: "system",
  themeTokens: { accent: "#176B5B" },
  onError(error, phase) {
    renderErrors.push({
      phase,
      name: error?.name ?? null,
      code: error?.code ?? null,
      message: error?.message ?? null,
      causeName: error?.cause?.name ?? null,
      causeMessage: error?.cause?.message ?? null,
    });
  },
});
const result = await handle.ready;

function collectEvidence() {
  const root = host.shadowRoot || host.firstElementChild;
  const textNodes = [...(root?.querySelectorAll(".if-article-root *") ?? [])]
    .filter((node) => node.children.length === 0 && node.textContent.trim());
  return {
    mountStatus: result.status,
    direction: root?.querySelector(".if-article-root")?.dir,
    language: root?.querySelector(".if-article-root")?.lang,
    viewportWidth: window.innerWidth,
    pageWidth: document.documentElement.scrollWidth,
    noPageOverflow: document.documentElement.scrollWidth <= window.innerWidth,
    articleTextAtLeast16px: textNodes.every((node) => Number.parseFloat(getComputedStyle(node).fontSize) >= 16),
    hostStyleUnchanged: host.getAttribute("style") === hostStyleBefore,
    sectionTargets: [...(root?.querySelectorAll(".if-article-section") ?? [])].map((node) => node.id),
    tabCount: root?.querySelectorAll('[role="tab"]').length ?? 0,
    visualizationLabel: root?.querySelector("[data-visualization-host]")?.getAttribute("aria-label") ?? null,
    visualizationCaption: root?.querySelector(".if-article-figure figcaption")?.textContent ?? null,
    focusedTabVisible: Boolean(root?.activeElement?.matches?.('[role="tab"]:focus-visible')),
  };
}

function record(name, actual, expected) { return { name, actual, expected, pass: actual === expected }; }
async function runBehaviorChecks() {
  const root = host.shadowRoot || host.firstElementChild;
  const checks = [];
  const slider = root.querySelector("#temperature-control input");
  const metric = root.querySelector("#temperature-metric");
  slider.value = "42";
  slider.dispatchEvent(new Event("change", { bubbles: true }));
  checks.push(record("slider updates metric binding", metric.textContent.includes("42"), true));
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  tabs[0].click();
  tabs[0].focus(); tabs[0].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
  checks.push(record("RTL arrow key selects next tab", tabs[1].getAttribute("aria-selected"), "true"));
  checks.push(record("article mount leaves host inline style unchanged", host.getAttribute("style"), hostStyleBefore));
  checks.push(record("RichViz step guide mounts through the compatibility adapter", Boolean(root.querySelector('[data-visualization-host][data-rev-type="step-guide"][data-rev-state="ready"]')), true));
  const visualizationLabel = root.querySelector("[data-visualization-host]")?.getAttribute("aria-label") ?? "";
  const visualizationCaption = root.querySelector(".if-article-figure figcaption")?.textContent ?? "";
  checks.push(record("legacy visualization retains an accessible label and caption", `${visualizationLabel}\u001f${visualizationCaption}`, "قراءة الرسم\u001fخطوات قراءة الرسم"));
  history.replaceState(null, "", `${location.pathname}${location.search}`);
  root.querySelector('#explanation a[href="#analysis"]')?.click();
  checks.push(record("inline Markdown link navigates to the stable article section", location.hash, "#analysis"));
  history.replaceState(null, "", `${location.pathname}${location.search}`);
  const sectionLink = root.querySelector('.if-article-toc a[href="#analysis"]');
  sectionLink?.click();
  checks.push(record("TOC link navigates to the stable article section", location.hash, "#analysis"));
  return checks;
}

document.querySelector("#result").textContent = result.status === "ready" ? "P05 article mounted; run __INTUIFORGE_P05__.runBehaviorChecks() and collect evidence." : `P05 mount failed: ${result.code}`;
document.documentElement.dataset.p05Status = result.status.toUpperCase();
window.__INTUIFORGE_P05__ = { status: result.status, errors: renderErrors, collectEvidence, runBehaviorChecks, dispose: async () => { await handle.dispose(); await engine.dispose(); } };
