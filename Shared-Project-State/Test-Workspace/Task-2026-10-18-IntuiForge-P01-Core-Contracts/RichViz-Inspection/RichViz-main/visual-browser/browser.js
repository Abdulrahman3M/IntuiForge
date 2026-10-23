import { EXAMPLES_CATALOG, LOCALIZED } from "../src/RichVisualizationExamples.js";
import { DIAGRAM_REGISTRY } from "../src/RichVisualizationRegistry.js";
import { validateVisualizationSource } from "../src/RichVisualizationSchema.js";
import { RichViz } from "../src/RichVisualization.js";
import { iconMarkup } from "../src/RichVisualizationIcons.js";
import { buildVisualCatalog, filterVisualCatalog, sortVisualCatalog } from "./catalog.js";

const $ = (selector) => document.querySelector(selector);
const PAGE_SIZE = 24;
const records = buildVisualCatalog({ examplesCatalog: EXAMPLES_CATALOG, diagramRegistry: DIAGRAM_REGISTRY, assetsCatalog: { assets: [] }, discoveredAssets: [], iconNames: [] });
const summary = $("#summary");
const categories = [...new Set(records.map((item) => item.category))].sort((a, b) => a.localeCompare(b));

const summaryItems = [
  [EXAMPLES_CATALOG.length, "examples", "layers"],
  [DIAGRAM_REGISTRY.length, "visualization types", "chart-bar"],
  [records.filter((item) => item.interactive).length, "interactive examples", "workflow"],
  [records.filter((item) => ["bar-chart", "data-chart", "kpi-dashboard"].includes(item.type)).length, "statistical examples", "chart-line"],
];
summary.replaceChildren(...summaryItems.map(([value, label, iconName]) => {
  const box = document.createElement("div"); box.className = "stat";
  const icon = document.createElement("span"); icon.className = "stat-icon"; icon.setAttribute("aria-hidden", "true"); icon.innerHTML = iconMarkup(iconName);
  const text = document.createElement("p"); const number = document.createElement("strong"); number.textContent = value; const caption = document.createElement("span"); caption.textContent = ` ${label}`; text.append(number, caption); box.append(icon, text); return box;
}));
summary.setAttribute("aria-busy", "false");

function fitThumbnail(target) {
  const stage = target.querySelector(":scope > .rev__stage");
  if (!stage || !stage.scrollWidth || !stage.scrollHeight) return;
  const width = Number(stage.dataset.naturalWidth || stage.scrollWidth);
  const height = Number(stage.dataset.naturalHeight || stage.scrollHeight);
  stage.dataset.naturalWidth = String(width);
  stage.dataset.naturalHeight = String(height);
  const scale = Math.min((target.clientWidth - 8) / width, (target.clientHeight - 8) / height, 1);
  const safeScale = Math.max(scale, 0.05);
  stage.style.transform = `scale(${safeScale})`;
  stage.style.transformOrigin = "top left";
}

function assetUrl(path) { return `../${String(path).split("/").map(encodeURIComponent).join("/")}`; }
function appendAssetPreview(item, host, large) {
  const wrapper = document.createElement("div"); wrapper.className = "render-host"; wrapper.setAttribute("aria-label", `${item.title} visualization preview`);
  const localized = large && LOCALIZED.ar[item.spec.type] ? LOCALIZED.ar[item.spec.type] : item.spec;
  const spec = large ? localized : { ...item.spec, options: { ...item.spec.options, showTitle: false } };
  host.append(wrapper);
  const validated = validateVisualizationSource(JSON.stringify(spec));
  if (!validated.ok) { wrapper.textContent = `Preview unavailable · ${validated.errors.map((error) => error.message).join("; ")}`; return; }
  const mounted = RichViz.render(wrapper, validated.spec, { lang: large && spec !== item.spec ? "ar" : "en", dir: large && spec !== item.spec ? "rtl" : "ltr" });
  if (!large) {
    mounted.ready.then(() => { requestAnimationFrame(() => { fitThumbnail(wrapper); thumbnailResizeObserver.observe(wrapper); }); }).catch(() => { /* mountVisualization reports a safe in-preview error state */ });
  } else mounted.ready.catch(() => { /* mountVisualization reports a safe in-preview error state */ });
}

const detailDialog = $("#detail");
const detailContent = $("#detail-content");
const dialogTitle = $("#detail-title");
const closeButton = $(".close");
let lastTrigger = null;
let closeTimer = 0;
function closeDetail() {
  if (!detailDialog.open || detailDialog.hasAttribute("data-closing")) return;
  detailDialog.setAttribute("data-closing", "");
  closeTimer = window.setTimeout(() => detailDialog.close(), matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 190);
}
function copyAction(actions, label, value) {
  const button = document.createElement("button"); button.type = "button"; button.textContent = label;
  button.addEventListener("click", async () => { try { await navigator.clipboard.writeText(value); button.textContent = "Copied"; } catch { button.textContent = "Clipboard unavailable"; } window.setTimeout(() => { button.textContent = label; }, 1600); });
  actions.append(button);
}
function openDetail(item) {
  lastTrigger = document.activeElement;
  clearTimeout(closeTimer);
  detailDialog.removeAttribute("data-closing");
  dialogTitle.textContent = item.title;
  const intro = document.createElement("p"); intro.className = "detail-intro"; intro.textContent = item.description;
  const ref = document.createElement("code"); ref.className = "ref detail-ref"; ref.textContent = item.id;
  const preview = document.createElement("div"); preview.className = "detail-preview"; preview.setAttribute("aria-label", `${item.title} preview`);
  const meta = document.createElement("div"); meta.className = "detail-meta";
  const fields = [
    ["Name", item.title], ["Type", item.type], ["Category", item.category], ["Reference ID", item.id],
    ["Relative path", item.path], ["Format", item.format], ["Usage", item.kind === "icon" ? `Reference icon name “${item.iconName}” in a Rich Viz specification.` : `Reference ${item.id} and use the source specification or asset at this path.`],
    ["Behavior", item.interactive ? "Interactive visualization" : "Static visual"], ["Dimensions", item.asset?.dimensions], ["Author", item.asset?.author],
    ["Source", item.asset?.source], ["License", item.asset?.license], ["Redistribution", item.asset?.redistribution],
    ["Commercial use", item.asset?.commercialUse], ["Attribution", item.asset?.attribution], ["Tags", item.tags.join(", ")], ["Documentation", item.docs],
  ].filter(([, value]) => value);
  for (const [label, value] of fields) { const cell = document.createElement("div"); const small = document.createElement("small"); small.textContent = label; const content = document.createElement("span"); content.textContent = value; cell.append(small, content); meta.append(cell); }
  const actions = document.createElement("div"); actions.className = "detail-actions";
  copyAction(actions, "Copy reference", item.id); copyAction(actions, "Copy path", item.path); copyAction(actions, "Copy agent prompt", `Use Rich Viz visual ${item.id} (${item.title}) from ${item.path}.`);
  const source = document.createElement("a"); source.href = assetUrl(item.path); source.textContent = item.kind === "example" ? "Open source file" : "Open source asset"; source.target = "_blank"; source.rel = "noreferrer"; actions.append(source);
  const docs = document.createElement("a"); docs.href = assetUrl(item.docs); docs.textContent = "Open documentation"; docs.target = "_blank"; docs.rel = "noreferrer"; actions.append(docs);
  detailContent.replaceChildren(intro, ref, preview, meta, actions);
  appendAssetPreview(item, preview, true);
  detailDialog.showModal(); document.body.classList.add("dialog-open"); closeButton.focus();
}
closeButton.addEventListener("click", closeDetail);
detailDialog.addEventListener("cancel", (event) => { event.preventDefault(); closeDetail(); });
detailDialog.addEventListener("click", (event) => { if (event.target === detailDialog) closeDetail(); });
detailDialog.addEventListener("close", () => { clearTimeout(closeTimer); detailDialog.removeAttribute("data-closing"); document.body.classList.remove("dialog-open"); lastTrigger?.focus(); lastTrigger = null; });
detailDialog.addEventListener("transitionend", (event) => { if (event.target === detailDialog && event.propertyName === "opacity" && detailDialog.hasAttribute("data-closing")) detailDialog.close(); });

function cardFor(item, shouldObserve = true) {
  const card = document.createElement("button"); card.type = "button"; card.className = "visual-card"; card.dataset.id = item.id; card.setAttribute("aria-label", `${item.title}, ${item.id}, open details`);
  const visual = document.createElement("div"); visual.className = "preview"; visual.dataset.preview = item.id;
  const body = document.createElement("div"); body.className = "card-body";
  const id = document.createElement("span"); id.className = "ref"; id.textContent = item.id;
  const heading = document.createElement("h2"); heading.textContent = item.title;
  const description = document.createElement("p"); description.textContent = item.description;
  const badges = document.createElement("div"); badges.className = "badges";
  for (const label of [item.kind === "example" ? item.type : item.kind.toUpperCase(), item.category, item.interactive ? "Interactive" : "Static"]) { const badge = document.createElement("span"); badge.className = "badge"; badge.textContent = label; badges.append(badge); }
  body.append(id, heading, description, badges); card.append(visual, body);
  card.addEventListener("click", () => openDetail(item));
  if (shouldObserve) observer.observe(card); else appendAssetPreview(item, visual, false);
  return card;
}

const thumbnailResizeObserver = new ResizeObserver((entries) => {
  for (const { target } of entries) {
    fitThumbnail(target);
  }
});
const observer = new IntersectionObserver((entries) => { for (const entry of entries) if (entry.isIntersecting) { const item = itemById.get(entry.target.dataset.id); const host = entry.target.querySelector(".preview"); if (item && host && !host.childElementCount) appendAssetPreview(item, host, false); observer.unobserve(entry.target); } }, { rootMargin: "280px 0px" });
const itemById = new Map(records.map((item) => [item.id, item]));
let shown = PAGE_SIZE;
let selectedCategory = "all";
const search = $("#search"), type = $("#type"), category = $("#category"), sort = $("#sort"), behavior = $("#behavior"), resultHost = $("#results"), more = $("#show-more");
for (const value of categories) { const option = document.createElement("option"); option.value = value; option.textContent = value; category.append(option); }
for (const value of [...new Set(records.map((item) => item.type))].sort((a, b) => a.localeCompare(b))) { const option = document.createElement("option"); option.value = value; option.textContent = value; type.append(option); }
search.value = new URLSearchParams(location.search).get("q") || "";
const featuredReferences = ["RV-EX-CORE-process-flow", "RV-EX-CORE-bar-chart", "RV-EX-PATTERNS-course-preparation-gantt", "RV-EX-CORE-node-map"];

function render() {
  observer.disconnect();
  selectedCategory = category.value;
  const result = sortVisualCatalog(filterVisualCatalog(records, { query: search.value, behavior: behavior.value, category: selectedCategory }).filter((item) => type.value === "all" || item.type === type.value), sort.value, featuredReferences);
  const page = result.slice(0, shown); resultHost.replaceChildren();
  for (const item of page) resultHost.append(cardFor(item));
  if (!page.length) { const empty = document.createElement("p"); empty.className = "empty-state"; empty.textContent = "No visuals match those filters. Try another name, tag, category, or reference ID."; resultHost.append(empty); }
  $("#result-count").textContent = `Showing ${page.length} of ${result.length} matching items · ${records.length} total references`;
  more.hidden = page.length >= result.length; resultHost.setAttribute("aria-busy", "false");
}
search.addEventListener("input", () => { shown = PAGE_SIZE; render(); });
for (const control of [type, category, behavior, sort]) control.addEventListener("change", () => { shown = PAGE_SIZE; render(); });
$("#filters").addEventListener("submit", (event) => event.preventDefault());
$("#clear").addEventListener("click", () => { search.value = ""; type.value = "all"; category.value = "all"; behavior.value = "all"; sort.value = "featured"; selectedCategory = "all"; shown = PAGE_SIZE; render(); search.focus(); });
more.addEventListener("click", () => { shown += PAGE_SIZE; render(); });
render();
