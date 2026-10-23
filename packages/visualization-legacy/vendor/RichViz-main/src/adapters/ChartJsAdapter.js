/* Chart.js adapter — default engine for bar / comparison and general educational charts.
 * Library: External-Libraries/chartjs/active/, loaded only when a chart needs it. */
import { el, prefersReducedMotion } from "../RichVisualizationDom.js";
import { formatValue } from "../RichVisualizationCharts.js";
import { libraryUrl, loadGlobalScript, seriesColor, pointColors, withAlpha, isRound } from "./Common.js";

const TYPES = { bar: "bar", "horizontal-bar": "bar", "stacked-bar": "bar", line: "line", area: "line", pie: "pie", doughnut: "doughnut", radar: "radar", scatter: "scatter" };

function valueLabelPlugin(data, theme, ctx) {
  return {
    id: "revValueLabels",
    afterDatasetsDraw(chart) {
      if (!data.valueLabels || isRound(data) || data.chart === "radar" || data.chart === "scatter" || data.chart === "stacked-bar") return;
      if ((data.chart === "line" || data.chart === "area") && (data.labels.length > 12 || data.series.length > 1)) return;
      const { ctx: g } = chart;
      g.save();
      g.font = `700 12px ${theme.font}`; g.fillStyle = theme.ink; g.textBaseline = "middle";
      chart.data.datasets.forEach((set, si) => {
        chart.getDatasetMeta(si).data.forEach((element, i) => {
          const value = set.data[i];
          if (typeof value !== "number") return;
          const label = formatValue(value, data.unit, ctx.lang);
          const { x, y } = element.tooltipPosition();
          if (data.chart === "horizontal-bar") { g.textAlign = "left"; g.fillText(label, element.x + 8, y); }
          else { g.textAlign = "center"; g.fillText(label, x, Math.min(element.y, y) - 12); }
        });
      });
      g.restore();
    },
  };
}

export function buildChartJsConfig(data, theme, ctx) {
  const round = isRound(data);
  const stacked = data.chart === "stacked-bar";
  const horizontal = data.chart === "horizontal-bar";
  const type = TYPES[data.chart];
  const datasets = data.series.map((series, si) => {
    const base = seriesColor(data, theme, si);
    if (data.chart === "scatter") return { label: series.name, data: series.values.map(([x, y]) => ({ x, y })), backgroundColor: withAlpha(base, 0.85), borderColor: base, pointRadius: 6 };
    if (round) return { label: series.name, data: series.values, backgroundColor: pointColors(data, theme, si), borderColor: theme.card, borderWidth: 2, hoverOffset: 8 };
    if (type === "line") return { label: series.name, data: series.values, borderColor: base, backgroundColor: withAlpha(base, 0.18), fill: data.chart === "area" ? "origin" : false, tension: 0.35, pointRadius: 4, pointHoverRadius: 6, pointBackgroundColor: base, borderWidth: 3, spanGaps: false };
    if (type === "radar") return { label: series.name, data: series.values, borderColor: base, backgroundColor: withAlpha(base, 0.2), pointBackgroundColor: base, borderWidth: 2 };
    return { label: series.name, data: series.values, backgroundColor: data.series.length === 1 ? pointColors(data, theme, si) : withAlpha(base, 0.9), borderRadius: 6, borderSkipped: false, maxBarThickness: 64 };
  });
  const text = { color: theme.muted, font: { family: theme.font, size: 12 } };
  const grid = { color: withAlpha(theme.ink, 0.12) };
  const tickFormat = (v) => formatValue(typeof v === "number" ? v : Number(v), "", ctx.lang);
  const axisTitle = (label) => (label ? { display: true, text: label, color: theme.muted, font: { family: theme.font, size: 12, weight: "600" } } : { display: false });
  const limits = { ...(data.min !== undefined ? { min: data.min } : {}), ...(data.max !== undefined ? { max: data.max } : {}) };
  const valueAxis = (title) => ({ stacked, beginAtZero: true, grid, ticks: { ...text, callback: tickFormat }, title: axisTitle(title), ...limits });
  const categoryAxis = (title) => ({ stacked, grid: { display: false }, ticks: text, title: axisTitle(title) });
  const scales = round ? {} : data.chart === "radar"
    ? { r: { grid, angleLines: grid, pointLabels: { color: theme.ink, font: { family: theme.font, size: 12 } }, ticks: { color: theme.muted, backdropColor: "transparent" }, ...limits } }
    : data.chart === "scatter" ? { x: { type: "linear", grid, ticks: { ...text, callback: tickFormat }, title: axisTitle(data.axis.x) }, y: valueAxis(data.axis.y) }
    : horizontal ? { x: valueAxis(data.axis.y), y: categoryAxis(data.axis.x) }
    : { x: categoryAxis(data.axis.x), y: valueAxis(data.axis.y) };
  const rtl = ctx.dir === "rtl";
  return {
    type,
    data: { labels: data.chart === "scatter" ? undefined : data.labels, datasets },
    options: {
      indexAxis: horizontal ? "y" : "x", responsive: true, maintainAspectRatio: false,
      animation: prefersReducedMotion() ? false : { duration: 600 },
      layout: { padding: { top: 22, right: horizontal ? 54 : 8 } },
      plugins: {
        legend: { display: data.series.length > 1 || round, position: "bottom", rtl, textDirection: rtl ? "rtl" : "ltr", labels: { color: theme.ink, usePointStyle: true, pointStyleWidth: 10, boxHeight: 8, font: { family: theme.font, size: 12 } } },
        tooltip: { rtl, textDirection: rtl ? "rtl" : "ltr", titleFont: { family: theme.font }, bodyFont: { family: theme.font }, callbacks: { label: (item) => `${item.dataset.label ? `${item.dataset.label}: ` : ""}${formatValue(data.chart === "scatter" ? item.parsed.y : (round ? item.parsed : (horizontal ? item.parsed.x : item.parsed.y)), data.unit, ctx.lang)}` } },
      },
      scales,
    },
    plugins: [valueLabelPlugin(data, theme, ctx)],
  };
}

export default {
  id: "chartjs",
  async load() { return loadGlobalScript(libraryUrl("chartjs", "chart.umd.min.js"), "Chart"); },
  async render(host, data, ctx) {
    const Chart = await this.load();
    const theme = ctx.theme(host);
    const canvas = el("canvas", { attrs: { role: "img", "aria-label": ctx.summary } });
    host.replaceChildren(canvas);
    const chart = new Chart(canvas, buildChartJsConfig(data, theme, ctx));
    return { dispose() { chart.destroy(); host.replaceChildren(); } };
  },
};
