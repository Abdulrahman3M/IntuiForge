/* RichViz gallery — QA/reference surface built on the real library (no mock renderers).
 * Each example mounts lazily when scrolled near, so the page itself demonstrates on-demand engine loading. */
import { mountVisualization, validateVisualizationSource, formatErrors, mountInvalid } from "../RichVisualization.js";
import { EXAMPLES_CATALOG, EXAMPLES, LOCALIZED, MEDIA_EXAMPLE } from "../RichVisualizationExamples.js";

const params = new URLSearchParams(location.search);
const state = { language: params.get("lang") || "en", theme: params.get("theme") || document.documentElement.dataset.theme || "light", engine: params.get("engine") || "", source: params.get("source") === "1" };
const main = document.getElementById("examples");
const mounted = [];

const clone = (value) => JSON.parse(JSON.stringify(value));
function section(label, name, key) {
  const wrap = document.createElement("section");
  wrap.className = "gallery-item";
  wrap.id = `example-${key}`;
  wrap.dataset.example = key;
  const title = document.createElement("h2");
  title.textContent = name;
  const tag = document.createElement("small");
  tag.textContent = `${label} · type "${key}"`;
  title.append(tag);
  const host = document.createElement("div");
  host.className = "gallery-host";
  const pre = document.createElement("pre");
  pre.className = "gallery-source";
  wrap.append(title, host, pre);
  return { wrap, host, pre };
}

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    observer.unobserve(entry.target);
    entry.target.__mount?.();
  }
}, { rootMargin: "400px 0px" });

function addExample(parent, entry, index) {
  const { wrap, host, pre } = section(`E${String(index + 1).padStart(2, "0")}`, entry.spec.title, entry.id);
  parent.append(wrap);
  const mount = () => {
    const raw = clone(entry.spec);
    const localized = entry.id === "media" ? MEDIA_EXAMPLE : (entry.group === "core" ? LOCALIZED[state.language]?.[entry.id] : null);
    if (localized) Object.assign(raw, clone(localized));
    const unsupportedByNative = raw.type === "data-chart" && ["radar", "scatter"].includes(raw.data.chart);
    if (state.engine && !(state.engine === "native" && unsupportedByNative) && (raw.type === "data-chart" || raw.type === "bar-chart" || raw.type === "kpi-dashboard")) raw.options = { ...(raw.options || {}), engine: state.engine };
    pre.textContent = JSON.stringify(raw, null, 2);
    const result = validateVisualizationSource(JSON.stringify(raw));
    if (!result.ok) { void mountInvalid(host, result.errors, { authoring: true }); return; }
    const handle = mountVisualization(host, result.spec, { resolveMedia: (src) => new URL(src, location.href).href });
    mounted.push(handle);
  };
  wrap.__mount = mount;
  observer.observe(wrap);
}

function addCatalogExample(parent, entry, index) {
  const { wrap, host, pre } = section(`E${String(index + 1).padStart(2, "0")}`, entry.spec.title, entry.id);
  parent.append(wrap);
  const mount = () => {
    const raw = clone(entry.spec);
    const unsupportedByNative = raw.type === "data-chart" && ["radar", "scatter"].includes(raw.data.chart);
    if (state.engine && !(state.engine === "native" && unsupportedByNative) && (raw.type === "data-chart" || raw.type === "bar-chart" || raw.type === "kpi-dashboard")) {
      raw.options = { ...(raw.options || {}), engine: state.engine };
    }
    pre.textContent = JSON.stringify(raw, null, 2);
    const result = validateVisualizationSource(JSON.stringify(raw));
    if (!result.ok) { void mountInvalid(host, result.errors, { authoring: true }); return; }
    mounted.push(mountVisualization(host, result.spec, {}));
  };
  wrap.__mount = mount;
  observer.observe(wrap);
}
function build() {
  mounted.splice(0).forEach((handle) => handle.dispose());
  main.replaceChildren();
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.lang = state.language;
  document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";
  document.body.toggleAttribute("data-show-source", state.source);
  const heading = (text) => { const h = document.createElement("p"); h.className = "gallery-group"; h.textContent = text; main.append(h); };
  heading("Examples");
  const search = document.createElement("input");
  search.type = "search"; search.className = "gallery-search"; search.placeholder = "Search examples by title, type, or category";
  search.setAttribute("aria-label", "Search examples by title, type, or category");
  const catalogue = document.createElement("div"); catalogue.className = "gallery-catalogue";
  main.append(search, catalogue);
  const renderCatalogue = () => {
    mounted.splice(0).forEach((handle) => handle.dispose());
    catalogue.querySelectorAll("[data-example]").forEach((node) => observer.unobserve(node));
    catalogue.replaceChildren();
    const query = search.value.trim().toLocaleLowerCase();
    const matches = EXAMPLES_CATALOG.filter(({ id, spec, group }) => !query || `${id} ${spec.title} ${spec.type} ${group}`.toLocaleLowerCase().includes(query));
    matches.forEach((entry, index) => addExample(catalogue, entry, index));
  };
  search.addEventListener("input", renderCatalogue);
  renderCatalogue();
  heading("Same chart, every engine");
  const engines = document.createElement("div");
  engines.className = "gallery-engines";
  main.append(engines);
  for (const engine of ["chartjs", "recharts", "echarts", "plotly", "native"]) {
    const { wrap, host, pre } = section("Engine", `Engine: ${engine}`, `engine-${engine}`);
    engines.append(wrap);
    wrap.__mount = () => {
      const raw = clone(LOCALIZED[state.language]?.["bar-chart"] || EXAMPLES["bar-chart"]);
      raw.options = { engine };
      raw.title = `${raw.title} (${engine})`;
      pre.textContent = JSON.stringify(raw, null, 2);
      const result = validateVisualizationSource(JSON.stringify(raw));
      if (result.ok) mounted.push(mountVisualization(host, result.spec, {}));
    };
    observer.observe(wrap);
  }
  heading("Validation playground");
  const playground = document.createElement("section");
  playground.className = "gallery-item gallery-playground";
  const area = document.createElement("textarea");
  area.setAttribute("aria-label", "Visualization source JSON");
  area.value = JSON.stringify(EXAMPLES["step-guide"], null, 2);
  const run = document.createElement("button");
  run.type = "button"; run.textContent = "Validate and render";
  const out = document.createElement("div");
  const report = document.createElement("pre"); report.className = "gallery-source"; report.style.display = "block";
  let live = null;
  run.addEventListener("click", () => {
    live?.dispose(); live = null; out.replaceChildren();
    const result = validateVisualizationSource(area.value);
    report.textContent = result.ok ? "Valid." : formatErrors(result.errors);
    if (result.ok) live = mountVisualization(out, result.spec, {});
    else void mountInvalid(out, result.errors, { authoring: true });
  });
  playground.append(area, run, report, out);
  main.append(playground);
}

for (const [id, key] of [["theme", "theme"], ["language", "language"], ["engine", "engine"]]) {
  const select = document.getElementById(id);
  select.value = state[key];
  select.addEventListener("change", () => { state[key] = select.value; build(); });
}
const sourceBox = document.getElementById("source");
sourceBox.checked = state.source;
sourceBox.addEventListener("change", () => { state.source = sourceBox.checked; document.body.toggleAttribute("data-show-source", state.source); });
build();
if (location.hash.startsWith("#example-")) {
  requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: "start" }));
}

/** QA helper: scroll one example under the sticky bar and wait for it to mount (used by browser verification). */
window.galleryShow = async (name, offset = 110) => {
  document.documentElement.style.scrollBehavior = "auto";
  const target = document.querySelector(`[data-example="${name}"]`);
  window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - offset);
  const until = Date.now() + 8000;
  while (Date.now() < until && !target.querySelector(".rev[data-rev-state]:not([data-rev-state='loading'])")) await new Promise((resolve) => setTimeout(resolve, 100));
  await new Promise((resolve) => setTimeout(resolve, 400));
  return target.querySelector(".rev")?.dataset.revState || "unmounted";
};

/** QA helper: mount every example and report render failures and horizontal overflow (page level and inside each frame). */
window.galleryAudit = async () => {
  const names = [...document.querySelectorAll("[data-example]")].map((node) => node.dataset.example);
  const report = { states: {}, overflow: [], page: 0 };
  for (const name of names) {
    report.states[name] = await window.galleryShow(name, 60);
    const frame = document.querySelector(`[data-example="${name}"] .rev`);
    if (!frame) continue;
    const box = frame.getBoundingClientRect();
    for (const node of frame.querySelectorAll("*")) {
      if (node.closest(".rev-map, .rev__alt pre, .rev-chart canvas")) continue;
      let scrolls = false;
      for (let up = node.parentElement; up && up !== frame; up = up.parentElement) if (/auto|scroll/.test(getComputedStyle(up).overflowX)) { scrolls = true; break; }
      if (scrolls) continue; // controlled local scrolling is allowed; page-level overflow is measured separately
      const rect = node.getBoundingClientRect();
      if (rect.width > 0 && (rect.right > box.right + 1 || rect.left < box.left - 1)) { report.overflow.push(`${name}: ${node.tagName}.${node.className?.baseVal ?? node.className}`); break; }
    }
  }
  window.scrollTo(0, 0);
  report.page = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  return report;
};

/** QA helper: approximate WCAG contrast of every text node inside mounted visualizations (solid ancestor backgrounds). */
window.galleryContrast = () => {
  const parse = (value) => { const m = /rgba?\(([^)]+)\)/.exec(value); if (!m) return null; const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r, g, b, a }; };
  const lum = ({ r, g, b }) => { const f = (v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const blend = (top, bottom) => ({ r: top.r * top.a + bottom.r * (1 - top.a), g: top.g * top.a + bottom.g * (1 - top.a), b: top.b * top.a + bottom.b * (1 - top.a), a: 1 });
  const background = (node) => {
    const layers = [];
    for (let el = node; el; el = el.parentElement) { const c = parse(getComputedStyle(el).backgroundColor); if (c && c.a > 0) { layers.push(c); if (c.a === 1) break; } }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (const layer of layers.reverse()) base = blend(layer, base);
    return base;
  };
  const failures = [];
  let checked = 0;
  for (const root of document.querySelectorAll(".rev")) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const text = walker.currentNode.textContent.trim();
      const el = walker.currentNode.parentElement;
      if (!text || !el || el.closest("svg, canvas, details:not([open]) > :not(summary)")) continue;
      const style = getComputedStyle(el);
      if (style.visibility === "hidden" || el.getClientRects().length === 0) continue;
      const fg = parse(style.color); if (!fg) continue;
      const bg = background(el);
      const ratio = (Math.max(lum(blend(fg, bg)), lum(bg)) + 0.05) / (Math.min(lum(blend(fg, bg)), lum(bg)) + 0.05);
      const large = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && Number(style.fontWeight) >= 700);
      checked += 1;
      if (ratio < (large ? 3 : 4.5)) failures.push({ text: text.slice(0, 30), ratio: Math.round(ratio * 100) / 100, cls: String(el.className).slice(0, 40), type: root.dataset.revType });
    }
  }
  return { checked, failures: failures.slice(0, 25), failureCount: failures.length };
};
