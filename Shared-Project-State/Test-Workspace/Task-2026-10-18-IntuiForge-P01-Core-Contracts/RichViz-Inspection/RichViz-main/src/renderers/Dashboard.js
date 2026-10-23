/* Dashboard / KPI visualization (F7): current-state card, KPI tiles, progress bars, status chips and an optional chart. */
import { el, icon, iconChip, statusChip, progressBar } from "../RichVisualizationDom.js";
import { STATES } from "../schema/Primitives.js";

export function deltaElement(delta) {
  const tone = delta.tone || (delta.direction === "up" ? "success" : delta.direction === "down" ? "danger" : "neutral");
  const glyph = delta.direction === "up" ? icon("trending-up") : delta.direction === "down" ? icon("trending-down") : icon("minus");
  return el("span", { class: "rev-delta", dataset: { tone } }, [glyph, el("span", { text: delta.text })]);
}

export function metricElement(metric, tag = "li") {
  return el(tag, { class: "rev-metric", dataset: { tone: metric.tone || "accent" } }, [
    el("div", { class: "rev-metric__label" }, [metric.icon ? icon(metric.icon) : null, el("span", { text: metric.label })]),
    el("div", { class: "rev-metric__value" }, [el("span", { text: typeof metric.value === "number" ? metric.value.toLocaleString() : metric.value }), metric.unit ? el("span", { class: "rev-metric__unit", text: metric.unit }) : null]),
    metric.delta ? deltaElement(metric.delta) : null,
    metric.progress ? progressBar(metric.progress, { tone: metric.tone, ariaLabel: metric.label }) : null,
    metric.note ? el("p", { class: "rev-metric__note", text: metric.note }) : null,
  ]);
}

export function renderDashboard(stage, spec, ctx) {
  const { current, metrics, progress, statuses, chart } = spec.data;
  const root = el("div", { class: "rev-dash" });
  let chartHandle = null;
  if (current) {
    root.append(el("div", { class: "rev-dash__current", dataset: { tone: current.tone || "accent" } }, [
      el("div", { class: "rev-dash__current-head" }, [current.icon ? iconChip(current.icon, current.tone || "accent") : null, el("div", {}, [el("div", { class: "rev-t", text: current.title }), current.subtitle ? el("p", { text: current.subtitle }) : null])]),
      current.description ? el("p", { text: current.description }) : null,
      progressBar(current.progress, { tone: current.tone || "accent" }),
      current.chips.length ? el("ul", { class: "rev-chips" }, current.chips.map((chip) => el("li", {}, [statusChip(chip)]))) : null,
    ]));
  }
  if (metrics.length) root.append(el("ul", { class: "rev-metrics" }, metrics.map((metric) => metricElement(metric))));
  const panels = [];
  if (progress.length) panels.push(el("section", { class: "rev-panel" }, [el("div", { class: "rev-t", text: ctx.t("progress") }), ...progress.map((p) => progressBar({ value: p.value }, { label: p.label, tone: p.tone || "info", caption: p.caption }))]));
  if (statuses.length) panels.push(el("section", { class: "rev-panel" }, [el("div", { class: "rev-t", text: ctx.t("status") }), el("ul", { class: "rev-statuslist" }, statuses.map((s) => el("li", {}, [el("span", { text: s.label }), statusChip({ text: s.text || s.state, state: s.state, tone: STATES[s.state] })])))]));
  if (panels.length) root.append(el("div", { class: "rev-dash__row" }, panels));
  stage.append(root);
  if (chart) {
    const host = el("div", { class: "rev-panel" });
    root.append(host);
    chartHandle = ctx.renderChart(host, { ...spec, type: "data-chart", data: chart }, ctx);
  }
  return { dispose() { chartHandle?.then?.((handle) => handle?.dispose?.()); } };
}
