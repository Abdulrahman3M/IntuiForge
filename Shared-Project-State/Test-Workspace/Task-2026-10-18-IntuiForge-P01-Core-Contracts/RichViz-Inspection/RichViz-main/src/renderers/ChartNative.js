/* Native SVG chart baseline: bar, horizontal-bar, stacked-bar, line, area, pie, doughnut.
 * Dependency-free, themed through CSS tokens, and the guaranteed fallback when a chart engine cannot load. */
import { el, svgEl } from "../RichVisualizationDom.js";
import { pointTone, seriesTone, formatValue, niceScale, dataExtent } from "../RichVisualizationCharts.js";

const W = 640;
const clip = (text, max) => (text.length > max ? `${text.slice(0, max - 1)}…` : text);

function text(x, y, value, { anchor = "middle", className, size } = {}) {
  const node = svgEl("text", { x, y, "text-anchor": anchor, class: className });
  if (size) node.setAttribute("font-size", size);
  node.textContent = value;
  return node;
}

function legend(data, ctx) {
  const items = data.chart === "pie" || data.chart === "doughnut"
    ? data.labels.map((label, i) => ({ label, tone: pointTone(data, 0, i) }))
    : data.series.length > 1 ? data.series.map((s, i) => ({ label: s.name, tone: seriesTone(data, i) })) : [];
  if (!items.length) return null;
  return el("ul", { class: "rev-legend" }, items.map((item) => el("li", { dataset: { tone: item.tone } }, [el("i", { attrs: { "aria-hidden": "true" } }), el("span", { text: item.label })])));
}

function cartesian(data, ctx, horizontal) {
  const H = horizontal ? 70 + data.labels.length * 54 : 340;
  const left = horizontal ? Math.min(170, 54 + Math.max(...data.labels.map((l) => l.length)) * 7) : 58;
  const m = { top: 30, right: 22, bottom: horizontal ? 40 : 56, left };
  const innerW = W - m.left - m.right;
  const innerH = H - m.top - m.bottom;
  const { min, max } = dataExtent(data);
  const scale = niceScale(min, max);
  const stacked = data.chart === "stacked-bar";
  const svg = svgEl("svg", { class: "rev-chart__svg", viewBox: `0 0 ${W} ${H}`, role: "presentation", focusable: "false" });
  const valueToPos = (v) => (horizontal ? m.left + ((v - scale.min) / (scale.max - scale.min)) * innerW : m.top + innerH - ((v - scale.min) / (scale.max - scale.min)) * innerH);
  scale.ticks.forEach((tick) => {
    const p = valueToPos(tick);
    svg.append(horizontal ? svgEl("line", { class: "rev-grid", x1: p, y1: m.top, x2: p, y2: H - m.bottom }) : svgEl("line", { class: "rev-grid", x1: m.left, y1: p, x2: W - m.right, y2: p }));
    svg.append(horizontal ? text(p, H - m.bottom + 18, formatValue(tick, "", ctx.lang), { className: "rev-tick" }) : text(m.left - 8, p + 4, formatValue(tick, "", ctx.lang), { anchor: "end", className: "rev-tick" }));
  });
  const slots = data.labels.length;
  const slot = (horizontal ? innerH : innerW) / slots;
  const count = stacked ? 1 : data.series.length;
  const bar = Math.min(54, (slot * 0.7) / count);
  data.labels.forEach((label, li) => {
    const center = (horizontal ? m.top : m.left) + slot * (li + 0.5);
    let acc = 0;
    data.series.forEach((series, si) => {
      const value = series.values[li];
      if (typeof value !== "number") return;
      const from = stacked ? acc : 0;
      const to = stacked ? acc + value : value;
      acc = to;
      const offset = stacked ? -bar / 2 : (si - (count - 1) / 2) * bar - bar / 2;
      const a = valueToPos(Math.min(from, to)); const b = valueToPos(Math.max(from, to));
      const rect = horizontal
        ? svgEl("rect", { class: "rev-mark", x: Math.min(a, b), y: center + offset, width: Math.abs(b - a), height: bar - 3, rx: 5 })
        : svgEl("rect", { class: "rev-mark", x: center + offset, y: Math.min(a, b), width: bar - 3, height: Math.abs(b - a), rx: 5 });
      rect.dataset.tone = pointTone(data, si, li);
      svg.append(rect);
      if (data.valueLabels && !stacked) {
        svg.append(horizontal ? text(Math.max(a, b) + 6, center + offset + bar / 2 + 3, formatValue(value, data.unit, ctx.lang), { anchor: "start", className: "rev-value" }) : text(center + offset + (bar - 3) / 2, Math.min(a, b) - 7, formatValue(value, data.unit, ctx.lang), { className: "rev-value" }));
      }
    });
    const labelNode = horizontal ? text(m.left - 8, center + 4, clip(label, 22), { anchor: "end", className: "rev-tick" }) : text(center, H - m.bottom + 20, clip(label, 16), { className: "rev-tick" });
    const full = svgEl("title"); full.textContent = label; labelNode.append(full);
    svg.append(labelNode);
  });
  svg.append(horizontal ? svgEl("line", { class: "rev-baseline", x1: valueToPos(0), y1: m.top, x2: valueToPos(0), y2: H - m.bottom }) : svgEl("line", { class: "rev-baseline", x1: m.left, y1: valueToPos(0), x2: W - m.right, y2: valueToPos(0) }));
  if (data.axis.y && !horizontal) svg.append(text(14, m.top - 14, data.axis.y, { anchor: "start", className: "rev-axis-label" }));
  if (data.axis.x) svg.append(text(W - m.right, H - 6, data.axis.x, { anchor: "end", className: "rev-axis-label" }));
  return svg;
}

function lines(data, ctx, filled) {
  const H = 340; const m = { top: 30, right: 24, bottom: 56, left: 58 };
  const innerW = W - m.left - m.right; const innerH = H - m.top - m.bottom;
  const { min, max } = dataExtent(data); const scale = niceScale(min, max);
  const svg = svgEl("svg", { class: "rev-chart__svg", viewBox: `0 0 ${W} ${H}`, role: "presentation", focusable: "false" });
  const y = (v) => m.top + innerH - ((v - scale.min) / (scale.max - scale.min)) * innerH;
  const x = (i) => m.left + (data.labels.length === 1 ? innerW / 2 : (innerW / (data.labels.length - 1)) * i);
  scale.ticks.forEach((tick) => { svg.append(svgEl("line", { class: "rev-grid", x1: m.left, y1: y(tick), x2: W - m.right, y2: y(tick) }), text(m.left - 8, y(tick) + 4, formatValue(tick, "", ctx.lang), { anchor: "end", className: "rev-tick" })); });
  data.labels.forEach((label, i) => { const t = text(x(i), H - m.bottom + 20, clip(label, 12), { className: "rev-tick" }); svg.append(t); });
  data.series.forEach((series, si) => {
    const tone = seriesTone(data, si);
    const points = series.values.map((v, i) => (typeof v === "number" ? [x(i), y(v), v] : null));
    const segments = []; let run = [];
    points.forEach((p) => { if (p) run.push(p); else if (run.length) { segments.push(run); run = []; } });
    if (run.length) segments.push(run);
    segments.forEach((seg) => {
      const d = seg.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
      if (filled) { const area = svgEl("path", { class: "rev-area", d: `${d} L${seg.at(-1)[0]} ${y(Math.max(scale.min, 0))} L${seg[0][0]} ${y(Math.max(scale.min, 0))} Z` }); area.dataset.tone = tone; svg.append(area); }
      const line = svgEl("path", { class: "rev-line", d }); line.dataset.tone = tone; svg.append(line);
    });
    points.forEach((p) => { if (!p) return; const dot = svgEl("circle", { class: "rev-mark", cx: p[0], cy: p[1], r: 4.5 }); dot.dataset.tone = tone; svg.append(dot); if (data.valueLabels && data.labels.length <= 12 && data.series.length === 1) svg.append(text(p[0], p[1] - 10, formatValue(p[2], data.unit, ctx.lang), { className: "rev-value" })); });
  });
  if (data.axis.y) svg.append(text(14, m.top - 14, data.axis.y, { anchor: "start", className: "rev-axis-label" }));
  if (data.axis.x) svg.append(text(W - m.right, H - 6, data.axis.x, { anchor: "end", className: "rev-axis-label" }));
  return svg;
}

function pie(data, ctx, donut) {
  const size = 320; const r = 128; const cx = size / 2; const cy = size / 2;
  const values = data.series[0].values.map((v) => Math.max(0, v || 0));
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const svg = svgEl("svg", { class: "rev-chart__svg", viewBox: `0 0 ${size} ${size}`, role: "presentation", focusable: "false", style: "max-width:360px;margin-inline:auto" });
  let angle = -Math.PI / 2;
  values.forEach((v, i) => {
    const sweep = (v / total) * Math.PI * 2;
    if (sweep <= 0) return;
    const end = angle + sweep;
    const pt = (a, rad) => `${(cx + Math.cos(a) * rad).toFixed(2)} ${(cy + Math.sin(a) * rad).toFixed(2)}`;
    const large = sweep > Math.PI ? 1 : 0;
    const inner = donut ? r * 0.58 : 0;
    const d = sweep >= Math.PI * 2 - 1e-6
      ? `M${pt(angle, r)} A${r} ${r} 0 1 1 ${pt(angle + Math.PI, r)} A${r} ${r} 0 1 1 ${pt(angle, r)}${donut ? ` M${pt(angle, inner)} A${inner} ${inner} 0 1 0 ${pt(angle + Math.PI, inner)} A${inner} ${inner} 0 1 0 ${pt(angle, inner)}` : ""} Z`
      : `M${pt(angle, r)} A${r} ${r} 0 ${large} 1 ${pt(end, r)} ${donut ? `L${pt(end, inner)} A${inner} ${inner} 0 ${large} 0 ${pt(angle, inner)}` : `L${cx} ${cy}`} Z`;
    const slice = svgEl("path", { class: "rev-mark", d, stroke: "var(--rev-card)", "stroke-width": 2, "fill-rule": "evenodd" });
    slice.dataset.tone = pointTone(data, 0, i);
    const hint = svgEl("title"); hint.textContent = `${data.labels[i]}: ${formatValue(v, data.unit, ctx.lang)}`; slice.append(hint);
    svg.append(slice);
    if (data.valueLabels && v / total > 0.06) {
      const mid = angle + sweep / 2; const lr = donut ? r * 0.79 : r * 0.62;
      const label = text(cx + Math.cos(mid) * lr, cy + Math.sin(mid) * lr + 4, `${Math.round((v / total) * 100)}%`, { className: "rev-value" });
      label.style.fill = "#fff"; label.style.paintOrder = "stroke"; label.style.stroke = "rgba(0,0,0,.45)"; label.style.strokeWidth = "3px";
      svg.append(label);
    }
    angle = end;
  });
  return svg;
}

export function drawNativeChart(host, data, ctx) {
  const svg = data.chart === "horizontal-bar" ? cartesian(data, ctx, true)
    : data.chart === "bar" || data.chart === "stacked-bar" ? cartesian(data, ctx, false)
    : data.chart === "line" ? lines(data, ctx, false) : data.chart === "area" ? lines(data, ctx, true)
    : pie(data, ctx, data.chart === "doughnut");
  host.replaceChildren(svg);
  const key = legend(data, ctx);
  if (key) host.append(key);
  return { dispose() { host.replaceChildren(); } };
}

