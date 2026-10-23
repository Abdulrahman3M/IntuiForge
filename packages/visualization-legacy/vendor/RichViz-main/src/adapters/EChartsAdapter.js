/* Apache ECharts adapter — advanced, richly interactive charts when a spec asks for engine "echarts".
 * Library: External-Libraries/echarts/active/, loaded only for visualizations that use it. */
import { prefersReducedMotion } from "../RichVisualizationDom.js";
import { formatValue } from "../RichVisualizationCharts.js";
import { libraryUrl, loadGlobalScript, seriesColor, pointColors, withAlpha, isRound, observeResize } from "./Common.js";

export function buildEChartsOption(data, theme, ctx) {
  const round = isRound(data);
  const horizontal = data.chart === "horizontal-bar";
  const stacked = data.chart === "stacked-bar";
  const fmt = (v) => formatValue(v, data.unit, ctx.lang);
  const textStyle = { fontFamily: theme.font, color: theme.muted };
  const palette = data.series.map((_, i) => seriesColor(data, theme, i));
  const label = { show: data.valueLabels && !stacked, color: theme.ink, fontWeight: 700, formatter: (p) => fmt(Array.isArray(p.value) ? p.value[1] : p.value) };
  const axisName = (name) => (name ? { name, nameTextStyle: { color: theme.muted, fontFamily: theme.font } } : {});
  const valueAxis = { type: "value", ...(data.min !== undefined ? { min: data.min } : {}), ...(data.max !== undefined ? { max: data.max } : {}), axisLabel: { ...textStyle, formatter: (v) => formatValue(v, "", ctx.lang) }, splitLine: { lineStyle: { color: withAlpha(theme.ink, 0.12) } } };
  const option = {
    aria: { enabled: true, label: { description: ctx.summary } }, animation: !prefersReducedMotion(), textStyle, color: palette,
    tooltip: { trigger: round || data.chart === "scatter" ? "item" : "axis", textStyle: { fontFamily: theme.font }, valueFormatter: (v) => fmt(v) },
    legend: { show: data.series.length > 1 || round, bottom: 0, textStyle: { color: theme.ink, fontFamily: theme.font }, ...(ctx.dir === "rtl" ? { orient: "horizontal" } : {}) },
    grid: { containLabel: true, left: 12, right: 24, top: 36, bottom: data.series.length > 1 ? 40 : 16 },
  };
  if (round) {
    option.series = [{ type: "pie", radius: data.chart === "doughnut" ? ["52%", "76%"] : "76%", itemStyle: { borderColor: theme.card, borderWidth: 2 }, label: { color: theme.ink, fontFamily: theme.font, formatter: "{b}: {d}%" }, data: data.labels.map((name, i) => ({ name, value: data.series[0].values[i], itemStyle: { color: pointColors(data, theme, 0)[i] } })) }];
    return option;
  }
  if (data.chart === "radar") {
    const max = data.max ?? Math.max(1, ...data.series.flatMap((s) => s.values.filter((v) => typeof v === "number")));
    option.radar = { indicator: data.labels.map((name) => ({ name, max })), axisName: { color: theme.ink, fontFamily: theme.font }, splitLine: { lineStyle: { color: withAlpha(theme.ink, 0.15) } } };
    option.series = [{ type: "radar", data: data.series.map((s, i) => ({ name: s.name, value: s.values, itemStyle: { color: palette[i] }, areaStyle: { color: withAlpha(palette[i], 0.2) } })) }];
    delete option.grid;
    return option;
  }
  if (data.chart === "scatter") {
    option.xAxis = { ...valueAxis, ...axisName(data.axis.x), min: undefined, max: undefined };
    option.yAxis = { ...valueAxis, ...axisName(data.axis.y) };
    option.series = data.series.map((s, i) => ({ type: "scatter", name: s.name, symbolSize: 12, data: s.values, itemStyle: { color: palette[i] } }));
    return option;
  }
  const category = { type: "category", data: data.labels, axisLabel: { ...textStyle, interval: 0 }, axisLine: { lineStyle: { color: withAlpha(theme.ink, 0.3) } }, axisTick: { show: false } };
  option.xAxis = horizontal ? { ...valueAxis, ...axisName(data.axis.x) } : { ...category, ...axisName(data.axis.x) };
  option.yAxis = horizontal ? { ...category, inverse: true, ...axisName(data.axis.y) } : { ...valueAxis, ...axisName(data.axis.y) };
  const isLine = data.chart === "line" || data.chart === "area";
  option.series = data.series.map((s, i) => (isLine
    ? { type: "line", name: s.name, data: s.values, smooth: 0.3, symbolSize: 8, lineStyle: { width: 3 }, areaStyle: data.chart === "area" ? { opacity: 0.18 } : undefined, label: { ...label, show: label.show && data.labels.length <= 12 && data.series.length === 1, position: "top" } }
    : { type: "bar", name: s.name, stack: stacked ? "total" : undefined, data: s.values.map((v, vi) => ({ value: v, itemStyle: { color: data.series.length === 1 ? pointColors(data, theme, i)[vi] : palette[i], borderRadius: horizontal ? [0, 6, 6, 0] : [6, 6, 0, 0] } })), barMaxWidth: 56, label: { ...label, position: horizontal ? "right" : "top" } }));
  return option;
}

export default {
  id: "echarts",
  async load() { return loadGlobalScript(libraryUrl("echarts", "echarts.min.js"), "echarts"); },
  async render(host, data, ctx) {
    const echarts = await this.load();
    const chart = echarts.init(host, null, { renderer: "svg" });
    chart.setOption(buildEChartsOption(data, ctx.theme(host), ctx));
    const stop = observeResize(host, () => chart.resize());
    return { dispose() { stop(); chart.dispose(); host.replaceChildren(); } };
  },
};
