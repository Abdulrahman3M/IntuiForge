/* RichViz — engine-neutral chart helpers (pure, DOM-free).
 *
 * Every chart adapter (Chart.js, Recharts, ECharts, Plotly) and the native SVG baseline consume the
 * same normalised chart model, so tone assignment, highlighting, number formatting and the accessible
 * data table are identical whichever engine draws the picture.
 */
export const SERIES_TONES = Object.freeze(["info", "violet", "teal", "orange", "pink", "success", "warning", "accent"]);

export function seriesTone(data, seriesIndex) {
  return data.series[seriesIndex]?.tone || SERIES_TONES[seriesIndex % SERIES_TONES.length];
}

/** Tone for one data point: a single highlighted bar stands out; the rest stay in the series tone. */
export function pointTone(data, seriesIndex, pointIndex) {
  const own = seriesTone(data, seriesIndex);
  if (data.highlight !== undefined && data.series.length === 1 && data.chart !== "scatter") return pointIndex === data.highlight ? "accent" : own === "accent" ? "info" : own;
  if (data.chart === "pie" || data.chart === "doughnut") return SERIES_TONES[pointIndex % SERIES_TONES.length];
  return own;
}

export function formatValue(value, unit = "", locale = "en") {
  if (value === null || value === undefined) return "–";
  let text;
  try { text = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value); } catch { text = String(value); }
  if (!unit) return text;
  if (/^[$€£¥]$/.test(unit)) return `${unit}${text}`;
  return unit === "%" ? `${text}%` : `${text} ${unit}`;
}

/** Rows for the visually-hidden / expandable data table that every chart provides. */
export function chartTable(data, locale = "en") {
  if (data.chart === "scatter") {
    return { head: ["", "x", "y"], rows: data.series.flatMap((s) => s.values.map(([x, y]) => [s.name, formatValue(x, "", locale), formatValue(y, data.unit, locale)])) };
  }
  return {
    head: ["", ...data.series.map((s) => s.name)],
    rows: data.labels.map((label, index) => [label, ...data.series.map((s) => formatValue(s.values[index], data.unit, locale))]),
  };
}

/** Round axis range to tidy ticks (used by the native SVG baseline). */
export function niceScale(min, max, ticks = 5) {
  const lo = Math.min(0, min);
  const hi = Math.max(max, lo + 1e-9);
  const span = hi - lo || 1;
  const rough = span / ticks;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= rough) || magnitude * 10;
  const niceMin = Math.floor(lo / step) * step;
  const niceMax = Math.ceil(hi / step) * step;
  const values = [];
  for (let v = niceMin; v <= niceMax + step / 2; v += step) values.push(Number(v.toFixed(10)));
  return { min: niceMin, max: niceMax, step, ticks: values };
}

export function dataExtent(data) {
  const values = data.chart === "stacked-bar"
    ? data.labels.map((_, i) => data.series.reduce((sum, s) => sum + (s.values[i] || 0), 0))
    : data.series.flatMap((s) => s.values.filter((v) => typeof v === "number"));
  const min = data.min ?? Math.min(0, ...values);
  const max = data.max ?? Math.max(1, ...values);
  return { min, max };
}

/** Engine selection: honour an explicit engine; otherwise the lightweight, most general default (Chart.js). */
export function resolveChartEngine(options) {
  const requested = options?.engine || "auto";
  return requested === "auto" ? "chartjs" : requested;
}
