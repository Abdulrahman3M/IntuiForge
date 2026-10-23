const NODE_WIDTH = 232;
const NODE_HEIGHT = 92;
const EDGE_GAP = 56;
const MAP_PADDING = 48;
const ZOOM_MIN = 0.25;
const ZOOM_MAX = 2.5;

const COPY = Object.freeze({
  en: { zoomIn: "Zoom in", zoomOut: "Zoom out", fit: "Fit to view", fullscreen: "Fullscreen", fullscreenFallback: "Fullscreen permission was denied; expanded map mode is active.", interactive: "Interactive view", static: "Static view", text: "Text alternative", open: "Open article", selected: "Selected node", none: "Select a node to read its summary.", minimap: "Map overview" },
  ar: { zoomIn: "تكبير", zoomOut: "تصغير", fit: "احتواء الخريطة", fullscreen: "ملء الشاشة", fullscreenFallback: "رُفض إذن ملء الشاشة؛ فُعّل وضع الخريطة الموسّع.", interactive: "عرض تفاعلي", static: "عرض ثابت", text: "الوصف النصي", open: "افتح المقال", selected: "العقدة المحددة", none: "اختر عقدة لقراءة ملخصها.", minimap: "نظرة عامة على الخريطة" },
  ru: { zoomIn: "Увеличить", zoomOut: "Уменьшить", fit: "Вписать карту", fullscreen: "На весь экран", fullscreenFallback: "Полноэкранный режим запрещён; включён расширенный режим карты.", interactive: "Интерактивный вид", static: "Статичный вид", text: "Текстовая версия", open: "Открыть статью", selected: "Выбранный узел", none: "Выберите узел, чтобы прочитать его краткое описание.", minimap: "Обзор карты" },
});

const languageOf = (language) => COPY[String(language ?? "en").toLowerCase().split("-")[0]] ? String(language ?? "en").toLowerCase().split("-")[0] : "en";
const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));

function automaticPositions(nodes, edges, layout, dir) {
  const ids = new Set(nodes.map((node) => node.id));
  const indexes = new Map(nodes.map((node, index) => [node.id, index]));
  const columns = Math.max(1, Math.ceil(Math.sqrt(nodes.length)));
  const layers = new Map(nodes.map((node) => [node.id, 0]));
  if (layout === "layered" || layout === "auto") {
    const incoming = new Map(nodes.map((node) => [node.id, 0]));
    const outgoing = new Map(nodes.map((node) => [node.id, []]));
    for (const edge of edges) {
      if (!ids.has(edge.source) || !ids.has(edge.target)) continue;
      incoming.set(edge.target, incoming.get(edge.target) + 1);
      outgoing.get(edge.source).push(edge.target);
    }
    const queue = nodes.filter((node) => incoming.get(node.id) === 0).map((node) => node.id);
    const visited = new Set();
    while (queue.length) {
      const id = queue.shift();
      if (visited.has(id)) continue;
      visited.add(id);
      for (const target of outgoing.get(id)) {
        layers.set(target, Math.max(layers.get(target), layers.get(id) + 1));
        incoming.set(target, incoming.get(target) - 1);
        if (incoming.get(target) === 0) queue.push(target);
      }
    }
    // Cycles remain visible and deterministic by placing unresolved nodes in later layers.
    for (const node of nodes) if (!visited.has(node.id)) layers.set(node.id, Math.max(layers.get(node.id), Math.floor(indexes.get(node.id) / columns)));
  }
  const levelCounts = new Map();
  return nodes.map((node, index) => {
    if (Number.isFinite(node.x) && Number.isFinite(node.y)) return { id: node.id, x: node.x, y: node.y };
    if (layout === "radial") {
      const angle = -Math.PI / 2 + (2 * Math.PI * index) / Math.max(1, nodes.length);
      const radius = Math.max(190, nodes.length * 13);
      return { id: node.id, x: MAP_PADDING + radius + Math.cos(angle) * radius, y: MAP_PADDING + radius + Math.sin(angle) * radius };
    }
    let column; let row;
    if (layout === "layered" || layout === "auto") {
      const level = layers.get(node.id) ?? 0;
      column = level;
      row = levelCounts.get(level) ?? 0;
      levelCounts.set(level, row + 1);
    } else {
      column = index % columns;
      row = Math.floor(index / columns);
    }
    if (dir === "rtl") column = layout === "layered" || layout === "auto" ? Math.max(...layers.values()) - column : columns - column - 1;
    return { id: node.id, x: MAP_PADDING + column * (NODE_WIDTH + EDGE_GAP), y: MAP_PADDING + row * (NODE_HEIGHT + EDGE_GAP) };
  });
}

/** Deterministic, dependency-free layout used by the interactive article map. */
export function layoutKnowledgeMap(nodes, edges = [], { layout = "auto", dir = "ltr" } = {}) {
  if (!Array.isArray(nodes) || nodes.length < 1 || nodes.length > 1000) throw new TypeError("Knowledge maps require 1–1000 nodes.");
  if (!Array.isArray(edges) || edges.length > 5000) throw new TypeError("Knowledge maps support at most 5000 edges.");
  const seen = new Set();
  for (const node of nodes) {
    if (!node || typeof node.id !== "string" || !node.id || seen.has(node.id)) throw new TypeError("Knowledge-map node IDs must be present and unique.");
    seen.add(node.id);
  }
  const positions = automaticPositions(nodes, edges, layout, dir);
  const byId = new Map(positions.map((position) => [position.id, position]));
  const width = Math.max(640, ...positions.map((position) => position.x + NODE_WIDTH + MAP_PADDING));
  const height = Math.max(360, ...positions.map((position) => position.y + NODE_HEIGHT + MAP_PADDING));
  return Object.freeze({ positions: Object.freeze(positions.map((position) => Object.freeze(position))), byId, width, height, nodeWidth: NODE_WIDTH, nodeHeight: NODE_HEIGHT });
}

function svgElement(document, name, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));
  return element;
}

function makeButton(document, label, action, className = "if-map-control") {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", className);
  button.setAttribute("aria-label", label);
  button.setAttribute("title", label);
  button.setAttribute("data-map-action", action);
  button.textContent = label;
  return button;
}

/** Build an accessible, responsive map without changing the preserved RichViz v0.5.0 API. */
export function createKnowledgeMap(document, { props, articleId, blockId, dir = "ltr", language = "en", selected = "", onSelect, onNavigate } = {}) {
  const nodes = props?.nodes ?? [];
  const edges = props?.edges ?? [];
  const layout = layoutKnowledgeMap(nodes, edges, { layout: props?.layout ?? "auto", dir });
  const labels = COPY[languageOf(language)];
  const root = document.createElement("section");
  root.setAttribute("class", "if-knowledge-map");
  root.setAttribute("aria-label", props?.description ?? props?.title ?? "Knowledge map");
  root.setAttribute("data-map-block", blockId ?? "");
  const toolbar = document.createElement("div"); toolbar.setAttribute("class", "if-map-toolbar"); toolbar.setAttribute("role", "toolbar"); toolbar.setAttribute("aria-label", props?.controlsLabel ?? "Map controls");
  const viewport = document.createElement("div"); viewport.setAttribute("class", "if-map-viewport"); viewport.setAttribute("role", "region"); viewport.setAttribute("aria-label", props?.description ?? props?.title ?? "Knowledge map"); viewport.setAttribute("tabindex", "0");
  const stage = document.createElement("div"); stage.setAttribute("class", "if-map-stage"); stage.style.width = `${layout.width}px`; stage.style.height = `${layout.height}px`;
  const edgeLayer = svgElement(document, "svg", { class: "if-map-edges", width: layout.width, height: layout.height, viewBox: `0 0 ${layout.width} ${layout.height}`, "aria-hidden": "true" });
  const markerId = `if-map-arrow-${String(blockId ?? "map").replace(/[^A-Za-z0-9_-]/g, "-")}`;
  const defs = svgElement(document, "defs");
  const marker = svgElement(document, "marker", { id: markerId, markerWidth: 8, markerHeight: 8, refX: 7, refY: 4, orient: "auto", markerUnits: "strokeWidth" });
  marker.appendChild(svgElement(document, "path", { d: "M0,0 L8,4 L0,8 z", class: "if-map-arrow" })); defs.appendChild(marker); edgeLayer.appendChild(defs);
  for (const edge of edges) {
    const start = layout.byId.get(edge.source); const end = layout.byId.get(edge.target);
    if (!start || !end) continue;
    const x1 = start.x + layout.nodeWidth; const y1 = start.y + layout.nodeHeight / 2;
    const x2 = end.x; const y2 = end.y + layout.nodeHeight / 2;
    const bend = x1 + (x2 - x1) / 2;
    edgeLayer.appendChild(svgElement(document, "path", { d: `M ${x1} ${y1} H ${bend} V ${y2} H ${x2}`, class: "if-map-edge", "marker-end": `url(#${markerId})` }));
    if (edge.label) { const text = svgElement(document, "text", { x: bend, y: (y1 + y2) / 2 - 5, class: "if-map-edge-label", "text-anchor": "middle" }); text.textContent = edge.label; edgeLayer.appendChild(text); }
  }
  stage.appendChild(edgeLayer);
  const listeners = [];
  const listen = (target, type, handler, options) => { target.addEventListener(type, handler, options); listeners.push([target, type, handler, options]); };
  let currentSelection = selected;
  let zoom = 1; let tx = MAP_PADDING; let ty = MAP_PADDING;
  let interactive = props?.interactive !== false;
  let textMode = false;
  const nodeButtons = new Map();
  const summary = document.createElement("aside"); summary.setAttribute("class", "if-map-summary"); summary.setAttribute("aria-live", "polite");
  const mapStatus = document.createElement("p"); mapStatus.setAttribute("class", "if-map-status"); mapStatus.setAttribute("role", "status");
  const linear = document.createElement("div"); linear.setAttribute("class", "if-map-text-alternative"); linear.hidden = true;
  const linearHeading = document.createElement("h3"); linearHeading.textContent = props?.title ?? labels.text; linear.appendChild(linearHeading);
  const list = document.createElement("ol"); linear.appendChild(list);
  const controls = {
    zoomOut: makeButton(document, labels.zoomOut, "zoom-out"),
    zoomIn: makeButton(document, labels.zoomIn, "zoom-in"),
    fit: makeButton(document, props?.fitLabel ?? labels.fit, "fit"),
    fullscreen: makeButton(document, labels.fullscreen, "fullscreen"),
    interactive: makeButton(document, labels.static, "toggle-interactive"),
    text: makeButton(document, labels.text, "toggle-text"),
  };
  toolbar.append(controls.zoomOut, controls.zoomIn, controls.fit, controls.fullscreen, controls.interactive, controls.text);
  viewport.appendChild(stage);
  const visualRow = document.createElement("div"); visualRow.setAttribute("class", "if-map-visual-row"); visualRow.append(viewport, summary);
  root.append(toolbar, visualRow, linear, mapStatus);

  const selectedNode = () => nodes.find((node) => node.id === currentSelection);
  const updateSummary = () => {
    const node = selectedNode();
    summary.replaceChildren();
    const heading = document.createElement("h3"); heading.textContent = node?.label ?? labels.selected; summary.appendChild(heading);
    const copy = document.createElement("p"); copy.textContent = node?.summary ?? labels.none; summary.appendChild(copy);
    if (node?.articleRef && typeof onNavigate === "function") {
      const open = makeButton(document, node.openLabel ?? labels.open, "open-article", "if-map-open-article");
      listen(open, "click", () => onNavigate(node.articleRef, Object.freeze({ articleId, blockId, nodeId: node.id })));
      summary.appendChild(open);
    }
  };
  const setSelection = (id, notify = true) => {
    currentSelection = nodeButtons.has(id) ? id : "";
    for (const [nodeId, button] of nodeButtons) button.setAttribute("aria-pressed", String(nodeId === currentSelection));
    for (const button of list.querySelectorAll?.("[data-node-id]") ?? []) button.setAttribute("aria-pressed", String(button.getAttribute("data-node-id") === currentSelection));
    updateSummary();
    if (notify) onSelect?.(currentSelection);
  };
  const selectNode = (node) => { setSelection(node.id); mapStatus.textContent = `${labels.selected}: ${node.label}`; };
  for (const node of nodes) {
    const position = layout.byId.get(node.id);
    const button = makeButton(document, `${node.label}${node.summary ? `: ${node.summary}` : ""}`, "select-node", "if-map-node");
    button.setAttribute("data-node-id", node.id); button.setAttribute("aria-pressed", String(node.id === currentSelection));
    button.style.left = `${position.x}px`; button.style.top = `${position.y}px`; button.style.width = `${layout.nodeWidth}px`; button.style.minHeight = `${layout.nodeHeight}px`;
    const title = document.createElement("strong"); title.textContent = node.label; button.appendChild(title);
    if (node.summary) { const detail = document.createElement("span"); detail.textContent = node.summary; button.appendChild(detail); }
    listen(button, "click", () => selectNode(node)); stage.appendChild(button); nodeButtons.set(node.id, button);

    const item = document.createElement("li");
    const textButton = makeButton(document, node.label, "select-node-text", "if-map-text-node"); textButton.setAttribute("data-node-id", node.id); textButton.setAttribute("aria-pressed", String(node.id === currentSelection));
    listen(textButton, "click", () => selectNode(node)); item.appendChild(textButton);
    if (node.summary) { const detail = document.createElement("p"); detail.textContent = node.summary; item.appendChild(detail); }
    if (node.articleRef && typeof onNavigate === "function") {
      const open = makeButton(document, node.openLabel ?? labels.open, "open-article", "if-map-open-article");
      listen(open, "click", () => onNavigate(node.articleRef, Object.freeze({ articleId, blockId, nodeId: node.id })));
      item.appendChild(open);
    }
    list.appendChild(item);
  }

  const applyTransform = () => { stage.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom})`; };
  let initialFitComplete = false; let userAdjustedView = false; let lastViewportWidth = 0; let lastViewportHeight = 0; let fitObserver = null;
  const fit = (keepReadableFocus = false) => {
    const width = viewport.clientWidth; const height = viewport.clientHeight;
    if (!width || !height) return false;
    const fittedZoom = clamp(Math.min((width - 36) / layout.width, (height - 36) / layout.height), ZOOM_MIN, 1.25);
    const focus = layout.byId.get(currentSelection) ?? layout.positions[0];
    if (keepReadableFocus && fittedZoom < 1) {
      zoom = 1;
      tx = width / 2 - (focus.x + layout.nodeWidth / 2);
      ty = height / 2 - (focus.y + layout.nodeHeight / 2);
    } else {
      zoom = fittedZoom;
      tx = (width - layout.width * zoom) / 2; ty = (height - layout.height * zoom) / 2;
    }
    applyTransform();
    lastViewportWidth = width; lastViewportHeight = height; userAdjustedView = false;
    return true;
  };
  const fitAfterMount = () => {
    const width = viewport.clientWidth; const height = viewport.clientHeight;
    if (!width || !height) return;
    const resized = width !== lastViewportWidth || height !== lastViewportHeight;
    if (!initialFitComplete || resized && !userAdjustedView) initialFitComplete = fit(true) || initialFitComplete;
  };
  const ResizeObserverCtor = document.defaultView?.ResizeObserver ?? globalThis.ResizeObserver;
  if (typeof ResizeObserverCtor === "function") { fitObserver = new ResizeObserverCtor(fitAfterMount); fitObserver.observe(viewport); }
  const scheduleFrame = document.defaultView?.requestAnimationFrame?.bind(document.defaultView) ?? (typeof globalThis.setTimeout === "function" ? (callback) => globalThis.setTimeout(callback, 0) : null);
  if (scheduleFrame) scheduleFrame(fitAfterMount); else fitAfterMount();
  const zoomBy = (factor) => { const old = zoom; zoom = clamp(zoom * factor, ZOOM_MIN, ZOOM_MAX); const centerX = (viewport.clientWidth || 720) / 2; const centerY = (viewport.clientHeight || 420) / 2; tx = centerX - (centerX - tx) * (zoom / old); ty = centerY - (centerY - ty) * (zoom / old); userAdjustedView = true; applyTransform(); };
  listen(controls.zoomIn, "click", () => zoomBy(1.2));
  listen(controls.zoomOut, "click", () => zoomBy(1 / 1.2));
  listen(controls.fit, "click", () => fit());
  let fallbackFullscreen = false;
  const setFallbackFullscreen = (active) => {
    fallbackFullscreen = active;
    if (active) root.setAttribute("data-fullscreen-fallback", "true"); else root.removeAttribute("data-fullscreen-fallback");
    controls.fullscreen.setAttribute("aria-pressed", String(active || document.fullscreenElement === root));
    mapStatus.textContent = active ? labels.fullscreenFallback : "";
    fit(true);
  };
  listen(document, "fullscreenchange", () => {
    const active = document.fullscreenElement === root;
    controls.fullscreen.setAttribute("aria-pressed", String(active || fallbackFullscreen));
    if (active) { fallbackFullscreen = false; root.removeAttribute("data-fullscreen-fallback"); mapStatus.textContent = ""; fit(true); }
    else if (!fallbackFullscreen) mapStatus.textContent = "";
  });
  listen(controls.fullscreen, "click", async () => {
    if (document.fullscreenElement === root) { await document.exitFullscreen?.(); return; }
    if (fallbackFullscreen) { setFallbackFullscreen(false); return; }
    try {
      if (root.requestFullscreen) await root.requestFullscreen();
      else setFallbackFullscreen(true);
    } catch { setFallbackFullscreen(true); }
  });
  listen(controls.interactive, "click", () => {
    interactive = !interactive;
    controls.interactive.textContent = interactive ? labels.static : labels.interactive;
    controls.interactive.setAttribute("aria-label", interactive ? labels.static : labels.interactive);
    controls.interactive.title = interactive ? labels.static : labels.interactive;
    controls.interactive.setAttribute("aria-pressed", String(interactive));
    viewport.setAttribute("data-interactive", String(interactive));
  });
  listen(controls.text, "click", () => {
    textMode = !textMode; linear.hidden = !textMode; viewport.hidden = textMode; summary.hidden = textMode;
    controls.text.setAttribute("aria-pressed", String(textMode));
  });

  const pointers = new Map(); let dragStart = null; let pinchStart = null;
  listen(viewport, "wheel", (event) => { if (!interactive || props?.zoom === false) return; event.preventDefault(); zoomBy(event.deltaY < 0 ? 1.12 : 1 / 1.12); }, { passive: false });
  listen(viewport, "pointerdown", (event) => {
    if (!interactive || props?.pan === false) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    try { viewport.setPointerCapture?.(event.pointerId); } catch { /* synthetic or pre-cancelled pointers can lack capture state */ }
    if (pointers.size === 1) dragStart = { x: event.clientX, y: event.clientY, tx, ty };
    if (pointers.size === 2 && props?.pinchZoom !== false) {
      const [a, b] = [...pointers.values()]; pinchStart = { distance: Math.hypot(b.x - a.x, b.y - a.y), zoom };
    }
  });
  listen(viewport, "pointermove", (event) => {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size >= 2 && pinchStart && props?.pinchZoom !== false) {
      const [a, b] = [...pointers.values()]; const distance = Math.hypot(b.x - a.x, b.y - a.y);
      zoom = clamp(pinchStart.zoom * distance / Math.max(1, pinchStart.distance), ZOOM_MIN, ZOOM_MAX); userAdjustedView = true; applyTransform();
    } else if (dragStart) { tx = dragStart.tx + event.clientX - dragStart.x; ty = dragStart.ty + event.clientY - dragStart.y; userAdjustedView = true; applyTransform(); }
  });
  const endPointer = (event) => { pointers.delete(event.pointerId); dragStart = null; pinchStart = null; };
  listen(viewport, "pointerup", endPointer); listen(viewport, "pointercancel", endPointer);

  if (props?.minimap) {
    const minimap = makeButton(document, labels.minimap, "minimap", "if-map-minimap");
    minimap.setAttribute("aria-label", labels.minimap); minimap.setAttribute("title", labels.minimap);
    for (const position of layout.positions) {
      const dot = document.createElement("span"); dot.setAttribute("class", "if-map-minimap-dot");
      dot.style.left = `${(position.x / layout.width) * 100}%`; dot.style.top = `${(position.y / layout.height) * 100}%`; dot.setAttribute("aria-hidden", "true"); minimap.appendChild(dot);
    }
    listen(minimap, "click", (event) => {
      const rect = minimap.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / Math.max(1, rect.width), 0, 1) * layout.width;
      const y = clamp((event.clientY - rect.top) / Math.max(1, rect.height), 0, 1) * layout.height;
      tx = (viewport.clientWidth || 720) / 2 - x * zoom; ty = (viewport.clientHeight || 420) / 2 - y * zoom; userAdjustedView = true; applyTransform();
    });
    visualRow.appendChild(minimap);
  }

  if (currentSelection) setSelection(currentSelection, false); else updateSummary();
  viewport.setAttribute("data-interactive", String(interactive));
  return Object.freeze({
    element: root,
    setSelected(id) { setSelection(id, false); },
    getSelected() { return currentSelection; },
    dispose() { fitObserver?.disconnect(); fitObserver = null; for (const [target, type, handler, options] of listeners) target.removeEventListener(type, handler, options); listeners.length = 0; root.replaceChildren(); },
  });
}
