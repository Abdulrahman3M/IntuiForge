/* Data families: Dashboard / KPI (F7), Bar / Comparison Chart (F8), Data-Driven Visualization (F9). */
import {
  LIMITS, readText, readTone, readIcon, readStatus, readProgress, readList, readObject, readEnum, readBool,
  readNumber, readId, uniqueIds, isPlainObject,
} from "./Primitives.js";

export const CHART_KINDS = Object.freeze(["bar", "horizontal-bar", "stacked-bar", "line", "area", "pie", "doughnut", "radar", "scatter"]);
export const BAR_KINDS = Object.freeze(["bar", "horizontal-bar", "stacked-bar"]);
export const CHART_ENGINES = Object.freeze(["auto", "native", "chartjs", "recharts", "echarts", "plotly"]);

/** Shared by bar-chart, data-chart and the dashboard's embedded chart. */
export function readChart(c, value, path, kinds) {
  const input = readObject(c, value, path, ["chart", "labels", "series", "unit", "axis", "valueLabels", "highlight", "min", "max"]);
  if (!input) return null;
  const chart = readEnum(c, input, "chart", path, kinds, kinds[0]);
  const scatter = chart === "scatter";
  const labels = readList(c, input, "labels", path, { max: LIMITS.points, item: (entry, here) => {
    if (typeof entry !== "string" || !entry.trim() || entry.length > LIMITS.short) { c.err(here, `Labels are short text up to ${LIMITS.short} characters.`); return undefined; }
    return entry.trim();
  } });
  if (!scatter && labels.length < 1) c.err(`${path}.labels`, "Add at least one label.");
  const series = readList(c, input, "series", path, { min: 1, max: LIMITS.series, item: (entry, here) => {
    const item = readObject(c, entry, here, ["name", "values", "tone"]);
    if (!item) return undefined;
    const name = readText(c, item, "name", here, { max: LIMITS.short, required: true });
    const values = readList(c, item, "values", here, { min: 1, max: LIMITS.points, item: (v, vp) => {
      if (scatter) {
        if (!Array.isArray(v) || v.length !== 2 || v.some((n) => typeof n !== "number" || !Number.isFinite(n) || Math.abs(n) > 1e12)) { c.err(vp, "Scatter points are [x, y] number pairs."); return undefined; }
        return [v[0], v[1]];
      }
      if (v === null) return null;
      if (typeof v !== "number" || !Number.isFinite(v) || Math.abs(v) > 1e12) { c.err(vp, "Values are finite numbers (or null for a gap)."); return undefined; }
      return v;
    } });
    if (!scatter && labels.length && values.length !== labels.length) c.err(`${here}.values`, `Expected ${labels.length} values (one per label), found ${values.length}.`);
    return { name, values, tone: readTone(c, item, "tone", here) };
  } });
  if ((chart === "pie" || chart === "doughnut") && series.length !== 1) c.err(`${path}.series`, "A pie or doughnut chart uses exactly one series.");
  const axis = isPlainObject(input.axis) ? readObject(c, input.axis, `${path}.axis`, ["x", "y"]) : (input.axis === undefined ? {} : (c.err(`${path}.axis`, "Expected an object with x and/or y."), {}));
  const highlight = readNumber(c, input, "highlight", path, { min: 0, max: LIMITS.points, integer: true });
  if (highlight !== undefined && !scatter && highlight >= labels.length) c.err(`${path}.highlight`, "Highlight must point to an existing label index.");
  return {
    chart, labels, series,
    unit: readText(c, input, "unit", path, { max: 16 }),
    axis: { x: axis ? readText(c, axis, "x", `${path}.axis`, { max: LIMITS.short }) : undefined, y: axis ? readText(c, axis, "y", `${path}.axis`, { max: LIMITS.short }) : undefined },
    valueLabels: readBool(c, input, "valueLabels", path, true),
    highlight,
    min: readNumber(c, input, "min", path), max: readNumber(c, input, "max", path),
  };
}

export function describeChart(data) {
  if (data.chart === "scatter") return data.series.map((s) => `${s.name}: ${s.values.map(([x, y]) => `(${x}, ${y})`).join(" ")}`);
  const unit = data.unit ? ` ${data.unit}` : "";
  return data.labels.map((label, i) => `${label}: ${data.series.map((s) => `${data.series.length > 1 ? `${s.name} ` : ""}${s.values[i] ?? "–"}${unit}`).join(", ")}`);
}

export const barChart = {
  id: "bar-chart", family: "F8", label: "Bar / comparison chart", engine: "chart",
  validate: (data, c) => readChart(c, data, "data", BAR_KINDS),
  describe: describeChart,
};

export const dataChart = {
  id: "data-chart", family: "F9", label: "Data-driven visualization", engine: "chart",
  validate: (data, c) => readChart(c, data, "data", CHART_KINDS),
  describe: describeChart,
};

function readMetricValue(c, object, path) {
  const value = object.value;
  if (typeof value === "number" && Number.isFinite(value) && Math.abs(value) <= 1e15) return value;
  if (typeof value === "string" && value.trim() && value.length <= 24) return value.trim();
  c.err(`${path}.value`, "A value is a number or short text up to 24 characters.");
  return undefined;
}

export const kpiDashboard = {
  id: "kpi-dashboard", family: "F7", label: "Dashboard / KPI visualization", engine: "native",
  validate(data, c) {
    const input = readObject(c, data, "data", ["current", "metrics", "progress", "statuses", "chart"]);
    if (!input) return null;
    let current;
    if (input.current !== undefined) {
      const item = readObject(c, input.current, "data.current", ["title", "subtitle", "description", "icon", "tone", "progress", "chips"]);
      if (item) {
        current = {
          title: readText(c, item, "title", "data.current", { required: true }),
          subtitle: readText(c, item, "subtitle", "data.current", { max: LIMITS.subtitle }),
          description: readText(c, item, "description", "data.current", { max: LIMITS.body }),
          icon: readIcon(c, item, "icon", "data.current"),
          tone: readTone(c, item, "tone", "data.current"),
          progress: readProgress(c, item.progress, "data.current.progress"),
          chips: readList(c, item, "chips", "data.current", { max: 8, item: (entry, path) => readStatus(c, entry, path) }),
        };
      }
    }
    const metrics = readList(c, input, "metrics", "data", { max: LIMITS.metrics, item: (entry, path) => {
      const item = readObject(c, entry, path, ["id", "label", "value", "unit", "delta", "progress", "tone", "icon", "note"]);
      if (!item) return undefined;
      let delta;
      if (item.delta !== undefined) {
        const d = readObject(c, item.delta, `${path}.delta`, ["text", "direction", "tone"]);
        if (d) delta = { text: readText(c, d, "text", `${path}.delta`, { max: LIMITS.short, required: true }), direction: readEnum(c, d, "direction", `${path}.delta`, ["up", "down", "flat"], "flat"), tone: readTone(c, d, "tone", `${path}.delta`) };
      }
      return {
        id: readId(c, item, "id", path),
        label: readText(c, item, "label", path, { max: LIMITS.short, required: true }),
        value: readMetricValue(c, item, path),
        unit: readText(c, item, "unit", path, { max: 16 }),
        delta, progress: readProgress(c, item.progress, `${path}.progress`),
        tone: readTone(c, item, "tone", path), icon: readIcon(c, item, "icon", path),
        note: readText(c, item, "note", path, { max: LIMITS.subtitle }),
      };
    } });
    uniqueIds(c, metrics, "data.metrics");
    const progress = readList(c, input, "progress", "data", { max: 12, item: (entry, path) => {
      const item = readObject(c, entry, path, ["label", "value", "tone", "caption"]);
      if (!item) return undefined;
      const value = readNumber(c, item, "value", path, { min: 0, max: 100, required: true });
      return value === undefined ? undefined : { label: readText(c, item, "label", path, { max: LIMITS.short, required: true }), value, tone: readTone(c, item, "tone", path), caption: readText(c, item, "caption", path, { max: LIMITS.short }) };
    } });
    const statuses = readList(c, input, "statuses", "data", { max: 16, item: (entry, path) => {
      const item = readObject(c, entry, path, ["label", "state", "text"]);
      if (!item) return undefined;
      const state = readEnum(c, item, "state", path, ["ok", "warn", "error", "info", "pending"], undefined);
      if (!state) { c.err(`${path}.state`, "A status needs a state: ok, warn, error, info or pending."); return undefined; }
      return { label: readText(c, item, "label", path, { max: LIMITS.short, required: true }), state, text: readText(c, item, "text", path, { max: LIMITS.short }) };
    } });
    const chart = input.chart === undefined ? undefined : readChart(c, input.chart, "data.chart", CHART_KINDS);
    if (!current && !metrics.length && !progress.length && !statuses.length && !chart) c.err("data", "Add at least one of: current, metrics, progress, statuses or chart.");
    return { current, metrics, progress, statuses, ...(chart ? { chart } : {}) };
  },
  describe(data) {
    const lines = [];
    if (data.current) lines.push(`${data.current.title}${data.current.progress ? ` — ${data.current.progress.value}%` : ""}`);
    data.metrics.forEach((m) => lines.push(`${m.label}: ${m.value}${m.unit ? ` ${m.unit}` : ""}${m.delta ? ` (${m.delta.text})` : ""}`));
    data.progress.forEach((p) => lines.push(`${p.label}: ${p.value}%`));
    data.statuses.forEach((s) => lines.push(`${s.label}: ${s.text || s.state}`));
    if (data.chart) lines.push(...describeChart(data.chart));
    return lines;
  },
};
