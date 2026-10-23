/* Chart orchestration for bar-chart (F8), data-chart (F9) and the dashboard's embedded chart.
 *
 * One chart model, several engines: the spec's `options.engine` picks Chart.js (default), Recharts, ECharts or
 * Plotly through the adapter registry, or the dependency-free native SVG baseline. If an engine cannot load,
 * the chart degrades to the native baseline (or, for kinds it cannot draw, to the data table) instead of going blank. */
import { el } from "../RichVisualizationDom.js";
import { resolveChartEngine } from "../RichVisualizationCharts.js";
import { ENGINE_CHARTS } from "../RichVisualizationSchema.js";
import { drawNativeChart } from "./ChartNative.js";

function defaultHeight(data) {
  if (data.chart === "horizontal-bar") return Math.max(240, data.labels.length * 52 + 90);
  if (data.chart === "pie" || data.chart === "doughnut") return 340;
  return 320;
}

/** Draw `spec.data` (a validated chart) into `host`. Resolves with a disposable handle; never rejects. */
export async function renderChartInto(host, spec, ctx) {
  const data = spec.data;
  const height = spec.options?.height || defaultHeight(data);
  const shell = el("div", { class: "rev-chart", style: { "--rev-chart-height": `${height}px` } });
  const canvas = el("div", { class: "rev-chart__canvas", attrs: { "aria-busy": "true" } });
  shell.append(canvas);
  host.append(shell);
  const engine = resolveChartEngine(spec.options);
  const native = () => {
    // Native SVG sizes itself from its viewBox; it does not need the fixed engine height.
    canvas.style.blockSize = "auto";
    canvas.setAttribute("role", "img"); canvas.setAttribute("aria-label", ctx.summary);
    return drawNativeChart(canvas, data, ctx);
  };
  let handle = null;
  let note = null;
  if (engine === "native") handle = native();
  else {
    try {
      const adapter = await ctx.loadAdapter(engine);
      handle = await adapter.render(canvas, data, ctx);
    } catch (error) {
      ctx.report?.(error, engine);
      canvas.replaceChildren();
      if (ENGINE_CHARTS.native.includes(data.chart)) { handle = native(); note = ctx.t("engineFallback"); }
      else { note = ctx.t("unsupportedChart"); canvas.style.blockSize = "auto"; }
    }
  }
  canvas.setAttribute("aria-busy", "false");
  if (note) shell.append(el("p", { class: "rev-chart-fallback", text: note, attrs: { role: "status" } }));
  return { dispose() { handle?.dispose?.(); shell.remove(); } };
}

export async function renderChartVisualization(stage, spec, ctx) {
  return renderChartInto(stage, spec, ctx);
}
