import { createIntuiEngine } from "/packages/core/src/index.js";
import { validateArticle } from "/packages/article/src/index.js";
import { registerArticleRenderer } from "/packages/article-renderer/src/index.js";

const article = {
  kind: "intui.article", schemaVersion: "1.0.0", id: "p06-browser-widgets", locale: "ar", dir: "rtl",
  title: "عناصر واجهة عامة",
  summary: "اختبار حي للجداول والنماذج والحسابات والمقارنة والتفاعل والحالة المشتركة.",
  metadata: { status: "draft", contentType: "article", sources: [], canonicalReferences: [], supportedLocales: ["ar"], provenance: [] },
  assets: [],
  initialState: {
    count: { type: "number", value: 1, min: 0, max: 10 }, quantity: { type: "number", value: 2, min: 0, max: 20 },
    price: { type: "number", value: 4, min: 0, max: 100 }, groupFilter: { type: "enum", value: "all", values: ["all", "active", "paused"] },
    selectedCard: { type: "enum", value: "card-a", values: ["card-a", "card-b"] }, activeTab: { type: "enum", value: "tab-a", values: ["tab-a", "tab-b"] },
    detailsOpen: { type: "boolean", value: false }, comparisonPosition: { type: "number", value: 50, min: 0, max: 100 },
  },
  derived: {
    filteredKpi: { op: "if", condition: { op: "eq", a: { ref: "groupFilter" }, b: "active" }, then: 2, else: 4 },
    total: { op: "multiply", a: { ref: "quantity" }, b: { ref: "price" } },
  },
  sections: [{ id: "widgets", heading: "العناصر", blocks: [
    { id: "table", type: "smartTable", props: {
      caption: "النتائج", columns: [{ key: "name", label: "الاسم" }, { key: "score", label: "الدرجة", type: "number" }, { key: "group", label: "الفئة" }],
      rows: [
        { name: "Amber", score: 12, group: "active" }, { name: "Basil", score: 8, group: "paused" },
        { name: "Cedar", score: 21, group: "active" }, { name: "Dahlia", score: 17, group: "active" },
      ], pageSize: 2, filters: [{ columnId: "group", label: "الفئة", options: [{ value: "active", label: "نشط" }, { value: "paused", label: "متوقف" }] }],
    } },
    { id: "count-input", type: "input", content: "العدد", props: { inputType: "number", min: 0, max: 10, required: true }, bindings: { value: "count" } },
    { id: "calculator", type: "calculator", props: {
      label: "حاسبة التكلفة", resultLabel: "الإجمالي", unit: "USD", inputs: [{ variable: "quantity", label: "الكمية", min: 0, max: 20 }, { variable: "price", label: "السعر", min: 0, max: 100 }],
      expression: { op: "multiply", a: { ref: "quantity" }, b: { ref: "price" } }, resultMin: 0, resultMax: 2000,
    } },
    { id: "comparison", type: "comparison", props: { mode: "overlay", label: "مقارنة العدد", left: { label: "العدد" }, right: { label: "الإجمالي", unit: "USD" }, positionLabel: "موضع المقارنة" }, bindings: { left: "count", right: "total", position: "comparisonPosition" } },
    { id: "category-filter", type: "filter", content: "الفئة", props: { label: "تصفية الفئة", options: [{ value: "all", label: "الكل" }, { value: "active", label: "نشط" }, { value: "paused", label: "متوقف" }] }, bindings: { value: "groupFilter" } },
    { id: "filtered-kpi", type: "metric", props: { label: "العناصر المطابقة" }, bindings: { value: "filteredKpi" } },
    { id: "filter-plot", type: "legacyViz", props: { description: "رسم تجريبي", spec: { version: 1, type: "step-guide", title: "Filter", description: "Bound filter plot.", data: { steps: [{ title: "Active", text: "Active group" }] } } }, bindings: { group: "groupFilter", count: "filteredKpi" } },
    { id: "open-dialog", type: "button", content: "فتح التفاصيل", events: { click: { action: "openDialog", targetId: "details-dialog" } } },
    { id: "close-dialog", type: "button", content: "إغلاق التفاصيل", events: { click: { action: "closeDialog", targetId: "details-dialog" } } },
    { id: "details-dialog", type: "dialog", props: { label: "التفاصيل" }, children: [{ id: "dialog-copy", type: "paragraph", content: "محتوى الحوار." }] },
    { id: "more-menu", type: "menu", props: { label: "إجراءات إضافية" }, children: [{ id: "menu-copy", type: "paragraph", content: "محتوى القائمة." }] },
    { id: "help-tooltip", type: "tooltip", props: { label: "مساعدة", text: "توضيح إضافي." } },
    { id: "card-a", type: "card", props: { label: "البطاقة الأولى", selectLabel: "اختر الأولى" }, bindings: { selected: "selectedCard" } },
    { id: "card-b", type: "card", props: { label: "البطاقة الثانية", selectLabel: "اختر الثانية" }, bindings: { selected: "selectedCard" } },
    { id: "tabs", type: "tabs", props: { label: "لوحات" }, bindings: { selected: "activeTab" }, children: [
      { id: "tab-a", type: "group", props: { label: "اللوحة أ" }, children: [{ id: "copy-a", type: "paragraph", content: "المحتوى الأول." }] },
      { id: "tab-b", type: "group", props: { label: "اللوحة ب" }, children: [{ id: "copy-b", type: "paragraph", content: "المحتوى الثاني." }] },
    ] },
    { id: "toggle-details", type: "button", content: "تبديل التفاصيل", events: { click: { action: "toggle", variable: "detailsOpen" } } },
    { id: "accordion", type: "accordion", content: "تفاصيل إضافية", bindings: { open: "detailsOpen" }, children: [{ id: "accordion-copy", type: "paragraph", content: "نص التفاصيل." }] },
  ] }],
};

const host = document.querySelector("#host");
const exports = [];
const engine = createIntuiEngine({ validateArticle });
engine.registerAdapter({
  id: "org.intuiforge.richviz", version: "0.5.0", capabilities: ["visualization"],
  render(container, _spec, options) {
    container.setAttribute("data-filter", options.bindings.group ?? "");
    container.setAttribute("data-count", options.bindings.count ?? "");
    container.textContent = "Filtered plot fixture";
    return { dispose() {} };
  },
});
registerArticleRenderer(engine, { theme: "system", onExport: (payload) => exports.push(payload) });
const errors = [];
const handle = engine.mount(host, article, { theme: "system", onError: (error, phase) => errors.push({ message: error?.message, phase }) });
const result = await handle.ready;

function record(name, actual, expected) { return { name, actual, expected, pass: actual === expected }; }
function collectEvidence() {
  const root = host.shadowRoot || host.firstElementChild;
  const styles = root?.querySelector(".if-article-root");
  const styleSheet = root?.querySelector("style")?.sheet;
  const textNodes = [...(root?.querySelectorAll(".if-article-root *") ?? [])].filter((node) => node.children.length === 0 && node.textContent.trim());
  const table = root?.querySelector("#table");
  return {
    mountStatus: result.status, direction: styles?.dir, viewportWidth: innerWidth, pageWidth: document.documentElement.scrollWidth,
    noPageOverflow: document.documentElement.scrollWidth <= innerWidth,
    articleTextAtLeast16px: textNodes.every((node) => Number.parseFloat(getComputedStyle(node).fontSize) >= 16),
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    tableRowsOnPage: table?.querySelectorAll("tbody tr").length ?? 0,
    dialogNative: root?.querySelector("dialog")?.tagName === "DIALOG",
    tooltipHasKeyboardTrigger: Boolean(root?.querySelector("#help-tooltip button[aria-describedby]")),
    theme: styles?.dataset.theme, darkColorScheme: matchMedia("(prefers-color-scheme: dark)").matches,
    reducedMotionRule: styleSheet ? [...styleSheet.cssRules].some((rule) => rule.conditionText?.includes("prefers-reduced-motion")) : false,
    errors,
  };
}

async function runBehaviorChecks() {
  const root = host.shadowRoot || host.firstElementChild;
  const checks = [];
  const table = root.querySelector("#table"); const tableBody = table.querySelector("tbody");
  const search = table.querySelector('input[type="search"]');
  search.value = "Cedar"; search.dispatchEvent(new Event("input", { bubbles: true }));
  checks.push(record("table search narrows rows", tableBody.querySelectorAll("tr").length, 1));
  search.value = ""; search.dispatchEvent(new Event("input", { bubbles: true }));
  const tableFilter = table.querySelector("select"); tableFilter.value = "active"; tableFilter.dispatchEvent(new Event("change", { bubbles: true }));
  checks.push(record("table filter excludes other groups", tableBody.textContent.includes("Basil"), false));
  const countInput = root.querySelector("#count-input input");
  const comparison = root.querySelector(".if-article-comparison");
  countInput.value = "11"; countInput.dispatchEvent(new Event("input", { bubbles: true }));
  checks.push(record("invalid input reports accessible error", countInput.getAttribute("aria-invalid"), "true"));
  countInput.value = "3"; countInput.dispatchEvent(new Event("input", { bubbles: true }));
  checks.push(record("valid input updates bound comparison", comparison.textContent.includes("3"), true));
  const quantity = root.querySelector("#calculator input"); quantity.value = "5"; quantity.dispatchEvent(new Event("input", { bubbles: true }));
  checks.push(record("calculator updates deterministic result and unit", root.querySelector("#calculator output").textContent, "20 USD"));
  const filter = root.querySelector("#category-filter select"); filter.value = "active"; filter.dispatchEvent(new Event("change", { bubbles: true }));
  await new Promise((resolve) => setTimeout(resolve, 0));
  checks.push(record("declarative filter updates KPI", root.querySelector("#filtered-kpi").textContent.includes("2"), true));
  checks.push(record("declarative filter updates plot binding", `${root.querySelector("[data-visualization-host]").getAttribute("data-filter")}:${root.querySelector("[data-visualization-host]").getAttribute("data-count")}`, "active:2"));
  const compareRange = comparison.querySelector('input[type="range"]');
  compareRange.value = "25"; compareRange.dispatchEvent(new Event("input", { bubbles: true }));
  checks.push(record("overlay position updates from its control", comparison.style.getPropertyValue("--if-comparison-position"), "25%"));
  root.querySelector("#more-menu summary").click();
  checks.push(record("menu disclosure toggles natively", root.querySelector("#more-menu details").open, true));
  root.querySelector("#help-tooltip button").focus();
  checks.push(record("tooltip trigger is keyboard-focusable", root.activeElement === root.querySelector("#help-tooltip button"), true));
  root.querySelector("#card-b button").click();
  checks.push(record("card selection exposes pressed state", root.querySelector("#card-b button").getAttribute("aria-pressed"), "true"));
  const tabs = [...root.querySelectorAll('[role="tab"]')]; tabs[0].click(); tabs[0].focus();
  tabs[0].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
  checks.push(record("RTL tab arrow key selects next panel", tabs[1].getAttribute("aria-selected"), "true"));
  root.querySelector("#toggle-details button").click();
  checks.push(record("accordion follows shared state", root.querySelector("#accordion details").open, true));
  const exportButton = root.querySelector("#table button[aria-label='تصدير CSV']");
  exportButton.click();
  checks.push(record("CSV export is labeled and deterministic", `${exportButton.textContent}:${exports[0]?.content.startsWith("الاسم,الدرجة,الفئة\r\n")}`, "تصدير CSV:true"));
  root.querySelector("#open-dialog button").click();
  checks.push(record("button opens native modal dialog", root.querySelector("dialog").open, true));
  checks.push(record("widget event handlers report no errors", errors.length, 0));
  return checks;
}

document.querySelector("#result").textContent = result.status === "ready" ? "P06 widgets mounted; call __INTUIFORGE_P06__.runBehaviorChecks() and collect evidence." : `P06 mount failed: ${result.code}`;
document.documentElement.dataset.p06Status = result.status.toUpperCase();
window.__INTUIFORGE_P06__ = { status: result.status, errors, collectEvidence, runBehaviorChecks, exports, dispose: async () => { await handle.dispose(); await engine.dispose(); } };
