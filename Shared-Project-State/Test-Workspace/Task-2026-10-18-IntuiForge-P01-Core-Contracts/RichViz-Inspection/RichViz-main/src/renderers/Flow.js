/* Process Flow Cards (F4): linear and branching flows laid out as flex layers; connectors are an SVG
 * overlay computed from the real DOM geometry, so the flow reflows (RTL, narrow screens, font loading)
 * without any hand-tuned coordinates. */
import { el, svgEl, iconChip, statusChip, uid } from "../RichVisualizationDom.js";
import { layerOrder } from "../RichVisualizationLayout.js";

function nodeButton(node) {
  const face = el("span", { class: "rev-node__face" }, [
    node.icon && node.shape !== "diamond" ? iconChip(node.icon, node.tone) : null,
    el("span", { class: "rev-node__text" }, [
      el("span", { class: "rev-node__title", text: node.title }),
      node.subtitle ? el("span", { class: "rev-node__sub", text: node.subtitle }) : null,
      statusChip(node.status),
    ]),
  ]);
  return el("button", { class: "rev-node", dataset: { id: node.id, tone: node.tone, shape: node.shape }, attrs: { type: "button", "aria-pressed": "false" } }, [face]);
}

/** Cubic path between two rects (relative to the board); attachment sides follow the geometry. */
export function edgeGeometry(s, t) {
  const point = (x, y) => ({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
  let a; let b; let c1; let c2;
  if (t.top >= s.bottom - 2) {
    a = point(s.left + s.width / 2, s.bottom); b = point(t.left + t.width / 2, t.top);
    const d = Math.max(24, (b.y - a.y) / 2); c1 = point(a.x, a.y + d); c2 = point(b.x, b.y - d);
  } else if (t.left >= s.right - 2) {
    a = point(s.right, s.top + s.height / 2); b = point(t.left, t.top + t.height / 2);
    const d = Math.max(24, (b.x - a.x) / 2); c1 = point(a.x + d, a.y); c2 = point(b.x - d, b.y);
  } else if (t.right <= s.left + 2) {
    a = point(s.left, s.top + s.height / 2); b = point(t.right, t.top + t.height / 2);
    const d = Math.max(24, (a.x - b.x) / 2); c1 = point(a.x - d, a.y); c2 = point(b.x + d, b.y);
  } else {
    // Back edge (target above or beside in the same layer): loop out of the right side and re-enter from the right.
    const out = Math.max(s.right, t.right) + 46;
    a = point(s.right, s.top + s.height / 2); b = point(t.right, t.top + t.height / 2);
    c1 = point(out, a.y); c2 = point(out, b.y);
  }
  return { a, b, c1, c2, d: `M${a.x} ${a.y} C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${b.x} ${b.y}` };
}

export function renderProcessFlow(stage, spec, ctx) {
  const { nodes, edges, direction } = spec.data;
  const ids = nodes.map((node) => node.id);
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const { layers } = layerOrder(ids, edges);
  const board = el("div", { class: "rev-board", dataset: { direction } });
  const buttons = new Map();
  const markerPrefix = uid("rev-arrow");
  const links = svgEl("svg", { class: "rev-links", "aria-hidden": "true", focusable: "false" });
  const defs = svgEl("defs");
  const markers = new Set();
  const marker = (tone) => {
    const key = tone || "base";
    const id = `${markerPrefix}-${key}`;
    if (!markers.has(key)) {
      markers.add(key);
      const head = svgEl("path", { d: "M0 0 L10 5 L0 10 z", class: "rev-link-head" });
      if (tone) head.style.fill = `var(--rev-t-${tone})`;
      defs.append(svgEl("marker", { id, markerWidth: 9, markerHeight: 9, refX: 8, refY: 5, orient: "auto", markerUnits: "userSpaceOnUse" }, [head]));
    }
    return id;
  };
  links.append(defs);
  layers.forEach((layer) => {
    const column = el("div", { class: "rev-layer" });
    layer.forEach((id) => { const button = nodeButton(byId.get(id)); buttons.set(id, button); column.append(button); });
    board.append(column);
  });
  board.prepend(links);
  const status = el("p", { class: "rev-board__status", attrs: { role: "status", "aria-live": "polite" }, text: ctx.t("nodeHint") });
  stage.append(board, status);

  const pathFor = new Map();
  const labelEls = [];
  const draw = () => {
    const origin = board.getBoundingClientRect();
    if (!origin.width) return;
    links.setAttribute("viewBox", `0 0 ${Math.round(origin.width)} ${Math.round(origin.height)}`);
    links.querySelectorAll("path.rev-link-path").forEach((node) => node.remove());
    labelEls.splice(0).forEach((node) => node.remove());
    pathFor.clear();
    const rel = (button) => { const r = button.getBoundingClientRect(); return { left: r.left - origin.left, right: r.right - origin.left, top: r.top - origin.top, bottom: r.bottom - origin.top, width: r.width, height: r.height }; };
    edges.forEach((edge, index) => {
      const s = buttons.get(edge.from); const t = buttons.get(edge.to);
      if (!s || !t) return;
      const geo = edgeGeometry(rel(s), rel(t));
      const path = svgEl("path", { class: "rev-link-path", d: geo.d, "marker-end": `url(#${marker(edge.tone)})` });
      if (edge.tone) path.dataset.tone = edge.tone;
      if (edge.dashed) path.dataset.dashed = "";
      links.append(path);
      pathFor.set(index, path);
      if (edge.label) {
        const mid = path.getPointAtLength(path.getTotalLength() / 2);
        const label = el("span", { class: "rev-edge-label", text: edge.label, dataset: { tone: edge.tone }, style: { left: `${mid.x}px`, top: `${mid.y}px` } });
        board.append(label); labelEls.push(label);
      }
    });
    applySelection();
  };

  let selected = null;
  const related = () => {
    const ids = new Set([selected]);
    edges.forEach((edge, index) => { if (edge.from === selected || edge.to === selected) { ids.add(edge.from); ids.add(edge.to); } });
    return ids;
  };
  function applySelection() {
    const near = selected ? related() : null;
    buttons.forEach((button, id) => { button.setAttribute("aria-pressed", String(id === selected)); if (near && !near.has(id)) button.dataset.dim = ""; else delete button.dataset.dim; });
    edges.forEach((edge, index) => {
      const path = pathFor.get(index); if (!path) return;
      const hot = selected && (edge.from === selected || edge.to === selected);
      if (selected) { if (hot) { path.dataset.hot = ""; delete path.dataset.dim; } else { path.dataset.dim = ""; delete path.dataset.hot; } }
      else { delete path.dataset.hot; delete path.dataset.dim; }
    });
    if (!selected) { status.textContent = ctx.t("nodeHint"); return; }
    const names = (list) => (list.length ? list.map((id) => byId.get(id).title).join(", ") : ctx.t("none"));
    status.textContent = `${byId.get(selected).title}. ${ctx.t("leadsTo")}: ${names(edges.filter((e) => e.from === selected).map((e) => e.to))}. ${ctx.t("comesFrom")}: ${names(edges.filter((e) => e.to === selected).map((e) => e.from))}.`;
  }
  const onClick = (event) => {
    const button = event.target.closest(".rev-node");
    if (!button) { if (selected && !event.target.closest(".rev-board__status")) { selected = null; applySelection(); } return; }
    selected = selected === button.dataset.id ? null : button.dataset.id;
    applySelection();
  };
  board.addEventListener("click", onClick);

  let frame = 0;
  const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); };
  const observer = new ResizeObserver(schedule);
  observer.observe(board);
  document.fonts?.ready.then(schedule);
  schedule();
  return { dispose() { cancelAnimationFrame(frame); observer.disconnect(); board.removeEventListener("click", onClick); }, redraw: draw };
}

