/* RichViz — public runtime API.
 *
 *   validateVisualizationSource(text)           → { ok, spec, errors }   (schema authority, DOM-free)
 *   mountVisualization(container, spec, env)    → { dispose, refresh }   (any container: article, preview, gallery)
 *   hydrateArticleFigure(figure, env)           → { dispose }            (reader: ```edu-viz placeholder figure)
 *
 * Everything heavy is on demand: this module itself loads the stylesheet, then ONE renderer chunk, then (only when
 * the spec needs it) ONE engine adapter that pulls an independent engine bundle from External-Libraries/. */
import { validateVisualizationSource, describeVisualization, formatErrors, TYPE_IDS, TYPE_DEFINITIONS, FENCE } from "./RichVisualizationSchema.js";
import { loadRenderer, loadAdapter, THEME_SENSITIVE } from "./RichVisualizationRegistry.js";
import { translator, languageOf } from "./RichVisualizationText.js";
import { el, readTheme } from "./RichVisualizationDom.js";
import { createToolbar, bindFullscreen, attachTextAlternative } from "./RichVisualizationControls.js";
import { chartTable } from "./RichVisualizationCharts.js";

export const RichViz = Object.freeze({
  validate: validateVisualizationSource,
  render(container, spec, options = {}) {
    const result = typeof spec === "string" ? validateVisualizationSource(spec) : { ok: true, spec };
    if (!result.ok) throw Object.assign(new Error(formatErrors(result.errors)), { errors: result.errors });
    return mountVisualization(typeof container === "string" ? document.querySelector(container) : container, result.spec, options);
  },
  types: TYPE_IDS,
});

export { validateVisualizationSource, describeVisualization, formatErrors, TYPE_IDS, TYPE_DEFINITIONS, FENCE };

const STYLE_URL = new URL("./rich-visualization.css", import.meta.url).href;
let stylesPromise = null;

/** Load the shared design-system stylesheet once; resolves when it has applied (or after a short timeout). */
export function ensureStyles() {
  if (!stylesPromise) {
    stylesPromise = new Promise((resolve) => {
      const existing = document.querySelector("link[data-rich-visualization-styles]");
      const link = existing || el("link", { attrs: { rel: "stylesheet", href: STYLE_URL, "data-rich-visualization-styles": "" } });
      const done = () => resolve();
      if (existing?.sheet) { done(); return; }
      link.addEventListener("load", done, { once: true });
      link.addEventListener("error", done, { once: true });
      setTimeout(done, 4000);
      if (!existing) document.head.append(link);
    });
  }
  return stylesPromise;
}

/* ---- Theme redraw: one scoped observer, alive only while a theme-sensitive visualization is mounted ---- */
const live = new Set();
let themeObserver = null;
let themeFrame = 0;
function watchTheme() {
  if (themeObserver || typeof MutationObserver === "undefined") return;
  themeObserver = new MutationObserver(() => {
    cancelAnimationFrame(themeFrame);
    themeFrame = requestAnimationFrame(() => live.forEach((entry) => { if (THEME_SENSITIVE.has(entry.spec.type)) void entry.refresh(); }));
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
}
function unwatchTheme() {
  if (live.size || !themeObserver) return;
  themeObserver.disconnect(); themeObserver = null; cancelAnimationFrame(themeFrame);
}

function altPanel(spec, ctx) {
  const { description, lines } = describeVisualization(spec);
  const details = el("details", { class: "rev__alt" }, [el("summary", { text: ctx.t("textVersion") }), el("p", { text: description })]);
  if (lines.length) details.append(el(spec.type === "step-guide" || spec.type === "process-cards" || spec.type === "pipeline" ? "ol" : "ul", {}, lines.map((line) => el("li", { text: line }))));
  const chart = spec.type === "bar-chart" || spec.type === "data-chart" ? spec.data : spec.type === "kpi-dashboard" ? spec.data.chart : null;
  if (chart) {
    const table = chartTable(chart, ctx.lang);
    details.append(el("table", {}, [el("caption", { class: "sr-only", text: ctx.t("chartTable") }), el("thead", {}, [el("tr", {}, table.head.map((cell) => el("th", { text: cell, attrs: { scope: "col" } })))]), el("tbody", {}, table.rows.map((row) => el("tr", {}, row.map((cell, i) => (i === 0 ? el("th", { text: cell, attrs: { scope: "row" } }) : el("td", { text: cell }))))))]));
  }
  if (spec.type === "mermaid") details.append(el("pre", { text: spec.data.source }));
  return details;
}

/** Mount a validated spec into `container`. `env`: { lang, dir, resolveMedia, authoring, onError }. */
export function mountVisualization(container, spec, env = {}) {
  const entry = { container, spec, handle: null, token: 0, disposed: false };
  const teardown = () => { try { entry.handle?.dispose?.(); } catch { /* a renderer must not break teardown */ } entry.controlsCleanup?.(); entry.controlsCleanup = null; entry.handle = null; };
  entry.refresh = async () => {
    const token = ++entry.token;
    await ensureStyles();
    if (entry.disposed || token !== entry.token) return;
    teardown();
    container.replaceChildren();
    const plain = Boolean(env.plain); // legacy ```mermaid fences render un-carded, exactly as before, but through the central adapter
    if (!plain) { container.classList.add("rev"); container.dataset.revType = spec.type; container.dataset.revState = "loading"; }
    container.removeAttribute("aria-busy");
    if (spec.dir) container.dir = spec.dir;
    const lang = languageOf(env.lang || container.closest("[lang]")?.getAttribute("lang") || document.documentElement.lang);
    const dir = spec.dir || env.dir || getComputedStyle(container).direction || "ltr";
    const ctx = {
      t: translator(lang), lang, dir, spec, resolveMedia: env.resolveMedia, authoring: Boolean(env.authoring), summary: spec.description,
      theme: (node) => readTheme(node || container), loadAdapter,
      renderChart: async (host, chartSpec, inner) => (await import("./renderers/Chart.js")).renderChartInto(host, chartSpec, inner),
      report: (error, where) => { env.onError?.(error, where); console.warn(`[RichViz] ${where || spec.type}:`, error?.message || error); },
    };
    const stage = plain ? container : el("div", { class: "rev__stage", attrs: { "aria-busy": "true" } });
    if (!plain) {
      const head = spec.options.showTitle !== false ? el("div", { class: "rev__head" }, [el("p", { class: "rev__title", text: spec.title })]) : null;
      container.append(...[head, stage].filter(Boolean));
      container.setAttribute("role", "group");
      container.setAttribute("aria-label", spec.title);
    }
    try {
      const render = await loadRenderer(spec.type);
      const handle = await render(stage, spec, ctx);
      if (entry.disposed || token !== entry.token) { handle?.dispose?.(); return; }
      entry.handle = handle || null;
      if (!plain) container.dataset.revState = "ready";
    } catch (error) {
      if (entry.disposed || token !== entry.token) return;
      ctx.report(error);
      env.onFailure?.(error);
      if (plain) return;
      stage.replaceChildren(el("p", { class: "rev__note", text: ctx.t("failed"), attrs: { role: "status" } }));
      if (env.authoring) stage.append(el("p", { class: "rev__note", text: String(error?.message || error) }));
      container.dataset.revState = "error";
    }
    if (plain) return;
    stage.setAttribute("aria-busy", "false");
    const alternative = altPanel(spec, ctx);
    if (entry.handle?.attachTextAlternative) entry.handle.attachTextAlternative(alternative);
    else {
      const toolbar = createToolbar(ctx, ["fullscreen"]);
      container.append(toolbar.owner);
      const stopText = attachTextAlternative(toolbar, alternative, ctx, container);
      const stopFullscreen = bindFullscreen(toolbar.buttons.get("fullscreen"), container, ctx, () => entry.handle?.redraw?.(), () => { ctx.report(new Error(ctx.t("fullscreenUnavailable")), "fullscreen"); });
      entry.controlsCleanup = () => { stopText(); stopFullscreen(); toolbar.dispose(); };
    }
  };
  live.add(entry);
  if (THEME_SENSITIVE.has(spec.type)) watchTheme();
  const ready = entry.refresh();
  return {
    ready,
    refresh: entry.refresh,
    dispose() { entry.disposed = true; entry.token += 1; teardown(); live.delete(entry); unwatchTheme(); container.replaceChildren(); },
  };
}

/** Render Mermaid source through the central adapter and design tokens (legacy ```mermaid fences and the manager preview). */
export function mountMermaid(container, source, env = {}) {
  const spec = { version: 1, type: "mermaid", title: "Mermaid Diagram", description: "Mermaid Diagram", options: { showTitle: false }, data: { source } };
  return mountVisualization(container, spec, { ...env, plain: true });
}

/** Show validation problems: concise for readers, itemised for authors. */
export async function mountInvalid(container, errors, env = {}) {
  await ensureStyles();
  const lang = languageOf(env.lang || container.closest("[lang]")?.getAttribute("lang") || document.documentElement.lang);
  const t = translator(lang);
  container.classList.add("rev");
  container.dataset.revState = "invalid";
  container.removeAttribute("aria-busy");
  container.replaceChildren(el("div", { class: "rev__error", attrs: { role: "status" } }, [
    el("strong", { text: env.authoring ? t("invalidAuthor") : t("invalid") }),
    env.authoring ? el("ul", {}, errors.slice(0, 12).map((error) => el("li", { text: error.path ? `${error.path}: ${error.message}` : error.message }))) : null,
  ]));
}

/** Reader entry point: validate the figure's inert source, then mount (or show a controlled error state). */
export async function hydrateArticleFigure(figure, env = {}) {
  const host = figure.querySelector("[data-diagram-canvas]");
  const source = figure.querySelector("template.article-diagram__source")?.content.textContent || "";
  if (!host) return { dispose() {} };
  const result = validateVisualizationSource(source);
  host.replaceChildren();
  if (!result.ok) { await mountInvalid(host, result.errors, env); return { dispose() { host.replaceChildren(); } }; }
  const handle = mountVisualization(host, result.spec, env);
  await handle.ready;
  return handle;
}

