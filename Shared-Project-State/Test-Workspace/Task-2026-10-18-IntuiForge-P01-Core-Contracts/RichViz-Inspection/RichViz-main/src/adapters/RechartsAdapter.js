/* Recharts adapter — React-composed charts, drawn with one shared React runtime.
 * Library: External-Libraries/recharts/ (id "recharts"), an independent build whose React
 * imports are redirected to the shared runtime exported by the React Flow editor bundle. Loaded only on demand. */
import { prefersReducedMotion } from "../RichVisualizationDom.js";
import { formatValue } from "../RichVisualizationCharts.js";
import { SHARED_RUNTIME_URL, libraryUrl, loadModuleOnce, seriesColor, pointColors, isRound } from "./Common.js";

async function loadRuntime() {
  const shared = (await loadModuleOnce(SHARED_RUNTIME_URL)).sharedReactRuntime;
  if (!shared) throw new Error("The shared React runtime is unavailable.");
  globalThis.__RICHVIZ_SHARED_REACT__ ||= shared;
  const Recharts = await loadModuleOnce(libraryUrl("recharts", "recharts.js"));
  return { React: shared.React, createRoot: shared.ReactDOMClient.createRoot, Recharts };
}

export function buildRechartsTree(R, Recharts, data, theme, ctx) {
  const h = R.createElement;
  const round = isRound(data);
  const horizontal = data.chart === "horizontal-bar";
  const animate = !prefersReducedMotion();
  const fmt = (v) => formatValue(v, data.unit, ctx.lang);
  const tick = { fill: theme.muted, fontSize: 12, fontFamily: theme.font };
  const tooltip = h(Recharts.Tooltip, { formatter: (v) => fmt(v), contentStyle: { background: theme.card, border: `1px solid ${theme.line}`, borderRadius: 10, color: theme.ink, fontFamily: theme.font }, labelStyle: { color: theme.ink } });
  const legend = data.series.length > 1 || round ? h(Recharts.Legend, { wrapperStyle: { fontFamily: theme.font, color: theme.ink } }) : null;
  const valueLabel = (position) => (data.valueLabels ? h(Recharts.LabelList, { position, formatter: (v) => fmt(v), fill: theme.ink, fontSize: 12, fontWeight: 700 }) : null);
  const grid = h(Recharts.CartesianGrid, { stroke: theme.line, strokeDasharray: "3 3", vertical: horizontal });
  const axisLabel = (value, angle) => (value ? { value, position: "insideBottom", fill: theme.muted, fontSize: 12, ...(angle ? { angle, position: "insideLeft" } : {}) } : undefined);
  const domain = [data.min ?? 0, data.max ?? "auto"];
  const rows = data.chart === "scatter" ? [] : data.labels.map((name, i) => Object.fromEntries([["name", name], ...data.series.map((s, si) => [`s${si}`, s.values[i]])]));
  const margin = { top: 22, right: horizontal ? 56 : 16, bottom: 8, left: 8 };
  const children = [];

  if (round) {
    const colors = pointColors(data, theme, 0);
    children.push(h(Recharts.Pie, { key: "pie", data: data.labels.map((name, i) => ({ name, value: data.series[0].values[i] })), dataKey: "value", nameKey: "name", innerRadius: data.chart === "doughnut" ? "55%" : 0, outerRadius: "78%", stroke: theme.card, strokeWidth: 2, isAnimationActive: animate }, data.labels.map((_, i) => h(Recharts.Cell, { key: i, fill: colors[i] }))), tooltip, legend);
    return h(Recharts.PieChart, { margin }, ...children);
  }
  if (data.chart === "radar") {
    const radars = data.series.map((s, si) => h(Recharts.Radar, { key: si, name: s.name, dataKey: `s${si}`, stroke: seriesColor(data, theme, si), fill: seriesColor(data, theme, si), fillOpacity: 0.25, isAnimationActive: animate }));
    return h(Recharts.RadarChart, { data: rows, outerRadius: "72%" }, h(Recharts.PolarGrid, { stroke: theme.line }), h(Recharts.PolarAngleAxis, { dataKey: "name", tick: { fill: theme.ink, fontSize: 12, fontFamily: theme.font } }), h(Recharts.PolarRadiusAxis, { tick, domain }), ...radars, tooltip, legend);
  }
  if (data.chart === "scatter") {
    const series = data.series.map((s, si) => h(Recharts.Scatter, { key: si, name: s.name, data: s.values.map(([x, y]) => ({ x, y })), fill: seriesColor(data, theme, si), isAnimationActive: animate }));
    return h(Recharts.ScatterChart, { margin }, grid, h(Recharts.XAxis, { type: "number", dataKey: "x", tick, label: axisLabel(data.axis.x) }), h(Recharts.YAxis, { type: "number", dataKey: "y", tick, label: axisLabel(data.axis.y, -90) }), tooltip, legend, ...series);
  }
  const category = h(Recharts.XAxis, { key: "x", dataKey: "name", tick, interval: 0, label: axisLabel(data.axis.x) });
  const value = h(Recharts.YAxis, { key: "y", tick, domain, tickFormatter: (v) => formatValue(v, "", ctx.lang), label: axisLabel(data.axis.y, -90) });
  const axes = horizontal
    ? [h(Recharts.XAxis, { key: "x", type: "number", tick, domain, tickFormatter: (v) => formatValue(v, "", ctx.lang) }), h(Recharts.YAxis, { key: "y", type: "category", dataKey: "name", tick, width: 96 })]
    : [category, value];
  if (data.chart === "line" || data.chart === "area") {
    const area = data.chart === "area";
    const Mark = area ? Recharts.Area : Recharts.Line;
    const marks = data.series.map((s, si) => h(Mark, { key: si, type: "monotone", name: s.name, dataKey: `s${si}`, stroke: seriesColor(data, theme, si), fill: seriesColor(data, theme, si), fillOpacity: 0.18, strokeWidth: 3, dot: { r: 4 }, isAnimationActive: animate, connectNulls: false }, data.labels.length <= 12 && data.series.length === 1 ? valueLabel("top") : null));
    return h(area ? Recharts.AreaChart : Recharts.LineChart, { data: rows, margin }, grid, ...axes, tooltip, legend, ...marks);
  }
  const stacked = data.chart === "stacked-bar";
  const bars = data.series.map((s, si) => h(Recharts.Bar, { key: si, name: s.name, dataKey: `s${si}`, stackId: stacked ? "total" : undefined, fill: seriesColor(data, theme, si), radius: horizontal ? [0, 6, 6, 0] : [6, 6, 0, 0], maxBarSize: 56, isAnimationActive: animate },
    ...(data.series.length === 1 ? pointColors(data, theme, si).map((fill, i) => h(Recharts.Cell, { key: i, fill })) : []), stacked ? null : valueLabel(horizontal ? "right" : "top")));
  return h(Recharts.BarChart, { data: rows, layout: horizontal ? "vertical" : "horizontal", margin }, grid, ...axes, tooltip, legend, ...bars);
}

export default {
  id: "recharts",
  load: loadRuntime,
  async render(host, data, ctx) {
    const { React: R, createRoot, Recharts } = await this.load();
    const theme = ctx.theme(host);
    host.setAttribute("role", "group");
    host.setAttribute("aria-label", ctx.summary);
    const root = createRoot(host);
    root.render(R.createElement(Recharts.ResponsiveContainer, { width: "100%", height: "100%" }, buildRechartsTree(R, Recharts, data, theme, ctx)));
    return { dispose() { root.unmount(); host.removeAttribute("role"); host.removeAttribute("aria-label"); host.replaceChildren(); } };
  },
};
