/* Rich Viz graph reader: one persistent toolbar, static SVG baseline and opt-in shared React Flow. */
import { el, svgEl, icon, svgIconGroup, uid } from "../RichVisualizationDom.js";
import { iconMarkup } from "../RichVisualizationIcons.js";
import { NODE_SIZE, mapPositions } from "../RichVisualizationLayout.js";
import { createToolbar, controlButton, setControlLabel, bindFullscreen, zoomViewBox, attachTextAlternative } from "../RichVisualizationControls.js";
import { connectorGroup, highlightConnections, mountInteractiveConnections, GRAPH_ARROW } from "./GraphConnections.js";
export const NODE_MAP_ARROW = GRAPH_ARROW;

export function graphModel(spec) {
  if (spec.type === "node-map") {
    const positions = mapPositions(spec.data);
    const groups = new Map(spec.data.groups.map((group) => [group.id, group]));
    return {
      nodes: spec.data.nodes.map((node) => ({ ...node, title: node.label, position: positions.get(node.id), groupLabel: node.group ? groups.get(node.group)?.label : undefined })),
      edges: spec.data.edges.map((edge, index) => ({ id: `e${index}`, from: edge.from, to: edge.to, label: edge.label })),
      groups: spec.data.groups, direction: spec.data.direction,
    };
  }
  const { nodes, edges } = spec.data.graph;
  return {
    nodes: nodes.map((node) => ({ id: node.id, title: node.data.label, subtitle: node.data.subtitle, icon: node.data.icon, tone: node.data.tone, status: node.data.status, details: node.data.details, media: node.data.media, position: { x: node.position.x, y: node.position.y } })),
    edges: edges.map((edge) => ({ id: edge.id, from: edge.source, to: edge.target, label: edge.label, animated: edge.animated })),
    groups: [], direction: "LR",
  };
}

/** React Flow graph for the shared viewer: rich node data carries icon markup from the trusted registry. */
export function toViewerGraph(model) {
  return {
    version: 1,
    nodes: model.nodes.map((node) => ({ id: node.id, type: "default", position: node.position, data: { label: node.title, rich: { subtitle: node.subtitle, tone: node.tone, status: node.status ? { text: node.status.text, tone: node.status.tone } : undefined, iconMarkup: node.icon ? iconMarkup(node.icon) : undefined, details: node.details, group: node.groupLabel } } })),
    edges: model.edges.map((edge) => ({ id: edge.id, source: edge.from, target: edge.to, type: "smoothstep", markerEnd: { type: "arrowclosed" }, ...(edge.label ? { label: edge.label } : {}), ...(edge.animated ? { animated: true } : {}) })),
  };
}

export function wrapNodeText(text, max, lines) {
  const rows = [""];
  for (const word of text.split(/\s+/)) {
    const last = rows[rows.length - 1];
    if (last && `${last} ${word}`.length > max) rows.push(word); else rows[rows.length - 1] = last ? `${last} ${word}` : word;
  }
  const out = rows.slice(0, lines);
  if (rows.length > lines) out[lines - 1] = `${out[lines - 1].slice(0, Math.max(1, max - 1))}…`;
  return out;
}

function staticSvg(model, ctx) {
  const rects = model.nodes.map((node) => ({ id: node.id, left: node.position.x, top: node.position.y, right: node.position.x + NODE_SIZE.width, bottom: node.position.y + NODE_SIZE.height, width: NODE_SIZE.width, height: NODE_SIZE.height }));
  const connections = connectorGroup(rects, model.edges);
  const { bounds } = connections;
  const svg = svgEl("svg", { class: "rev-map__svg", viewBox: `${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`, role: "group", "aria-label": ctx.summary, focusable: "false" });
  svg.append(connections.group);
  const rtl = ctx.dir === "rtl";
  const nodeEls = new Map();
  model.nodes.forEach((node) => {
    const g = svgEl("g", { class: "rev-map__node", transform: `translate(${node.position.x} ${node.position.y})`, role: "button", tabindex: 0, "aria-pressed": "false", "aria-label": `${node.title}${node.subtitle ? `, ${node.subtitle}` : ""}` });
    if (node.tone) g.dataset.tone = node.tone;
    g.append(svgEl("rect", { class: "face", width: NODE_SIZE.width, height: NODE_SIZE.height, rx: 16 }));
    const chipX = rtl ? NODE_SIZE.width - 14 - 38 : 14;
    g.append(svgEl("rect", { class: "chip", x: chipX, y: 14, width: 38, height: 38, rx: 11 }));
    const glyph = node.icon ? svgIconGroup(node.icon, chipX + 7, 21, 24) : null;
    if (glyph) { glyph.classList.add("glyph"); g.append(glyph); }
    const textX = rtl ? chipX - 12 : chipX + 38 + 12;
    const anchor = rtl ? "end" : "start";
    wrapNodeText(node.title, 19, 2).forEach((line, i) => { const t = svgEl("text", { x: textX, y: 28 + i * 18, "text-anchor": anchor }); t.textContent = line; g.append(t); });
    const titleLines = wrapNodeText(node.title, 19, 2).length;
    if (node.subtitle) wrapNodeText(node.subtitle, 18, 2).forEach((line, i) => { const t = svgEl("text", { class: "sub", x: textX, y: 28 + titleLines * 18 + 2 + i * 18, "text-anchor": anchor }); t.textContent = line; g.append(t); });
    const tag = node.status?.text || node.groupLabel;
    if (tag) { const t = svgEl("text", { class: "tag", x: rtl ? NODE_SIZE.width - 14 : 14, y: NODE_SIZE.height - 12, "text-anchor": anchor }); t.textContent = wrapNodeText(tag, 28, 1)[0]; g.append(t); }
    nodeEls.set(node.id, g);
    svg.append(g);
  });
  return { svg, nodeEls, paths: connections.paths, bounds };
}

function renderStatic(stage, spec, ctx, model) {
  const frame = el("div", { class: "rev-graph-frame" });
  const canvas = el("div", { class: "rev-map" });
  const { svg, nodeEls, paths, bounds } = staticSvg(model, ctx);
  canvas.append(svg);
  const status = el("p", { class: "rev-map__status", attrs: { role: "status", "aria-live": "polite" }, text: ctx.t("nodeHint") });
  frame.append(canvas); stage.append(frame);
  const byId = new Map(model.nodes.map((n) => [n.id, n]));
  let selected = null, zoom = 1;
  const apply = () => {
    const near = new Set(selected ? [selected] : []);
    model.edges.forEach((edge) => { if (selected && (edge.from === selected || edge.to === selected)) { near.add(edge.from); near.add(edge.to); } });
    highlightConnections(paths, selected);
    nodeEls.forEach((g, id) => { g.setAttribute("aria-pressed", String(id === selected)); g.toggleAttribute("data-dim", Boolean(selected && !near.has(id))); });
    if (!selected) { status.textContent = ctx.t("nodeHint"); return; }
    const names = (ids) => ids.length ? ids.map((id) => byId.get(id).title).join(", ") : ctx.t("none");
    const node = byId.get(selected);
    status.textContent = `${node.title}. ${node.details ? `${node.details} ` : ""}${ctx.t("leadsTo")}: ${names(model.edges.filter((e) => e.from === selected).map((e) => e.to))}. ${ctx.t("comesFrom")}: ${names(model.edges.filter((e) => e.to === selected).map((e) => e.from))}.`;
  };
  const choose = (g) => { const id = [...nodeEls].find(([, element]) => element === g)?.[0]; selected = selected === id ? null : id; apply(); };
  const onClick = (event) => { const g = event.target.closest(".rev-map__node"); if (g) choose(g); else { selected = null; apply(); } };
  const onKey = (event) => { if (event.key !== "Enter" && event.key !== " ") return; const g = event.target.closest?.(".rev-map__node"); if (g) { event.preventDefault(); choose(g); } };
  canvas.addEventListener("click", onClick); canvas.addEventListener("keydown", onKey);
  const setZoom = (value) => { zoom = Math.max(.25, Math.min(4, value)); const box = zoomViewBox(bounds, zoom); svg.setAttribute("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`); };
  const controls = { zoomIn: () => setZoom(zoom * 1.2), zoomOut: () => setZoom(zoom / 1.2), fitView: () => setZoom(1) };
  return { frame, canvas, status, controls, dispose() { canvas.removeEventListener("click", onClick); canvas.removeEventListener("keydown", onKey); } };
}

/** Right-to-left reading order: flip the layout horizontally so "start" sits on the right (pure; used for RTL articles). */
export function mirrorModel(model) {
  const right = Math.max(...model.nodes.map((node) => node.position.x)) + NODE_SIZE.width;
  return { ...model, nodes: model.nodes.map((node) => ({ ...node, position: { x: right - NODE_SIZE.width - node.position.x, y: node.position.y } })) };
}

export function renderGraph(stage, spec, ctx) {
  const arranged = graphModel(spec);
  const model = ctx.dir === "rtl" ? mirrorModel(arranged) : arranged;
  const base = renderStatic(stage, spec, ctx, model);
  const toolbar = createToolbar(ctx);
  const toggle = controlButton("toggleView", "play", ctx.t("makeInteractive"), ctx.t("makeInteractive"));
  toggle.setAttribute("aria-expanded", "false");
  toolbar.bar.append(toggle); base.frame.append(toolbar.owner, base.status);
  let live = null, disposed = false, generation = 0;
  const fit = () => (live?.controls || base.controls)?.fitView?.();
  for (const action of ["zoomIn", "zoomOut", "fitView"]) toolbar.buttons.get(action).onclick = () => (live?.controls || base.controls)?.[action]?.();
  const stopFullscreen = bindFullscreen(toolbar.buttons.get("fullscreen"), base.frame, ctx, fit, () => { base.status.textContent = ctx.t("fullscreenUnavailable"); });
  const setMode = () => {
    const key = live ? "backToStatic" : "makeInteractive";
    toggle.replaceChildren(icon(live ? "eye" : "play"), el("span", { text: ctx.t(key) }));
    setControlLabel(toggle, ctx.t(key)); toggle.setAttribute("aria-expanded", String(Boolean(live)));
    base.status.textContent = live ? "" : ctx.t("nodeHint");
  };
  const close = () => {
    const oldLive = live; live = null;
    oldLive?.connections?.dispose(); oldLive?.cleanup?.(); oldLive?.holder.remove();
    base.canvas.hidden = false; setMode();
  };
  const onToggle = async () => {
    if (live) { close(); toggle.focus(); return; }
    const token = ++generation;
    toggle.disabled = true; base.status.textContent = ctx.t("loadingInteractive");
    try {
      const adapter = await ctx.loadAdapter("react-flow");
      if (disposed || token !== generation) return;
      const holder = el("div", { class: "rev-flow-host", dataset: { interactive: "" }, attrs: { role: "group", "aria-label": spec.title }, style: { direction: "ltr" } });
      base.frame.insertBefore(holder, toolbar.owner); base.canvas.hidden = true;
      const session = { holder, controls: null, cleanup: null, connections: mountInteractiveConnections(holder, model) };
      live = session;
      session.cleanup = adapter.mount(holder, toViewerGraph(model), { labels: { hint: ctx.t("nodeHint"), reset: ctx.t("clearSelection"), leadsTo: ctx.t("leadsTo"), comesFrom: ctx.t("comesFrom"), none: ctx.t("none") }, onControlsReady: (controls) => { if (live !== session || disposed) return; session.controls = controls; if (controls) requestAnimationFrame(() => { if (live === session) controls.fitView?.(); }); } });
      setMode();
    } catch (error) { close(); base.status.textContent = ctx.t("interactiveFailed"); ctx.report?.(error, "interactive graph"); }
    finally { toggle.disabled = false; }
  };
  toggle.addEventListener("click", onToggle);
  let textCleanup = () => {};
  return {
    attachTextAlternative(details) { textCleanup = attachTextAlternative(toolbar, details, ctx, base.frame); },
    dispose() { disposed = true; generation++; close(); textCleanup(); toggle.removeEventListener("click", onToggle); stopFullscreen(); toolbar.dispose(); base.dispose(); }
  };
}
