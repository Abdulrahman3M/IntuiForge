/* Plotly adapter — analytical charts when a spec asks for engine "plotly".
 * Library: External-Libraries/plotly/active/. The distribution is large, so it is
 * loaded only for visualizations that explicitly select it; no other family depends on it. */
import { prefersReducedMotion } from "../RichVisualizationDom.js";
import { formatValue } from "../RichVisualizationCharts.js";
import { libraryUrl, loadGlobalScript, seriesColor, pointColors, withAlpha, isRound, observeResize } from "./Common.js";

export function buildPlotlyFigure(data, theme, ctx) {
  const round = isRound(data);
  const horizontal = data.chart === "horizontal-bar";
  const font = { family: theme.font, color: theme.ink, size: 13 };
  const grid = withAlpha(theme.ink, 0.12);
  const unitSuffix = data.unit && !/^[$€£¥]$/.test(data.unit) ? ` ${data.unit}` : "";
  const unitPrefix = /^[$€£¥]$/.test(data.unit || "") ? data.unit : "";
  const text = (v) => (typeof v === "number" ? formatValue(v, data.unit, ctx.lang) : "");
  const traces = data.series.map((series, si) => {
    const color = seriesColor(data, theme, si);
    if (round) return { type: "pie", name: series.name, labels: data.labels, values: series.values, hole: data.chart === "doughnut" ? 0.55 : 0, marker: { colors: pointColors(data, theme, si), line: { color: theme.card, width: 2 } }, textinfo: "percent", textfont: { color: "#fff", family: theme.font }, sort: false };
    if (data.chart === "radar") return { type: "scatterpolar", name: series.name, r: [...series.values, series.values[0]], theta: [...data.labels, data.labels[0]], fill: "toself", fillcolor: withAlpha(color, 0.2), line: { color, width: 2 }, marker: { color } };
    if (data.chart === "scatter") return { type: "scatter", mode: "markers", name: series.name, x: series.values.map((p) => p[0]), y: series.values.map((p) => p[1]), marker: { color, size: 11 } };
    if (data.chart === "line" || data.chart === "area") return { type: "scatter", mode: data.valueLabels && data.labels.length <= 12 && data.series.length === 1 ? "lines+markers+text" : "lines+markers", name: series.name, x: data.labels, y: series.values, text: series.values.map(text), textposition: "top center", line: { color, width: 3, shape: "spline", smoothing: 0.6 }, marker: { color, size: 8 }, fill: data.chart === "area" ? "tozeroy" : undefined, fillcolor: withAlpha(color, 0.18), connectgaps: false };
    const values = series.values;
    return { type: "bar", name: series.name, orientation: horizontal ? "h" : "v", [horizontal ? "y" : "x"]: data.labels, [horizontal ? "x" : "y"]: values, text: data.valueLabels && data.chart !== "stacked-bar" ? values.map(text) : undefined, textposition: "outside", cliponaxis: false, marker: { color: data.series.length === 1 ? pointColors(data, theme, si) : color } };
  });
  const axis = (title) => ({ title: title ? { text: title, font: { color: theme.muted } } : undefined, gridcolor: grid, zerolinecolor: withAlpha(theme.ink, 0.35), linecolor: withAlpha(theme.ink, 0.3), tickfont: { color: theme.muted, family: theme.font }, automargin: true });
  const layout = {
    font, paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)", margin: { t: 28, r: 24, b: 48, l: 24 },
    showlegend: data.series.length > 1 || round, legend: { orientation: "h", y: -0.18, font: { color: theme.ink } },
    barmode: data.chart === "stacked-bar" ? "stack" : "group", hoverlabel: { font: { family: theme.font } },
    xaxis: { ...axis(horizontal ? data.axis.y : data.axis.x), showgrid: horizontal || data.chart === "scatter", tickprefix: horizontal ? unitPrefix : undefined, ticksuffix: horizontal ? unitSuffix : undefined, ...(data.chart === "scatter" ? { type: "linear" } : {}) },
    yaxis: { ...axis(horizontal ? data.axis.x : data.axis.y), tickprefix: horizontal ? undefined : unitPrefix, ticksuffix: horizontal ? undefined : unitSuffix, autorange: horizontal ? "reversed" : true, ...(data.min !== undefined || data.max !== undefined ? { range: [data.min ?? 0, data.max ?? null] } : {}) },
    ...(data.chart === "radar" ? { polar: { bgcolor: "rgba(0,0,0,0)", radialaxis: { gridcolor: grid, tickfont: { color: theme.muted } }, angularaxis: { gridcolor: grid, tickfont: { color: theme.ink } } } } : {}),
  };
  if (round || data.chart === "radar") { delete layout.xaxis; delete layout.yaxis; }
  return { traces, layout, config: { responsive: true, displaylogo: false, displayModeBar: false, staticPlot: false, scrollZoom: false } };
}

export default {
  id: "plotly",
  async load() { return loadGlobalScript(libraryUrl("plotly", "plotly.min.js"), "Plotly"); },
  async render(host, data, ctx) {
    const Plotly = await this.load();
    const { traces, layout, config } = buildPlotlyFigure(data, ctx.theme(host), ctx);
    if (prefersReducedMotion()) layout.transition = { duration: 0 };
    await Plotly.newPlot(host, traces, layout, config);
    host.setAttribute("role", "img");
    host.setAttribute("aria-label", ctx.summary);
    const stop = observeResize(host, () => Plotly.Plots.resize(host));
    return { dispose() { stop(); Plotly.purge(host); host.removeAttribute("role"); host.removeAttribute("aria-label"); host.replaceChildren(); } };
  },
};
