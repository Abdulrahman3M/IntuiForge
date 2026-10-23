import { evaluateScientificFormula, sampleScientificFunction } from "./math.js";
import { flattenAnatomy, projectGeoPoint, projectMesh } from "./geometry.js";
import { simulateProjectile, interpolateTimeline } from "./simulation.js";
import { validateScientificBlock } from "./validation.js";

const SVG = "http://www.w3.org/2000/svg";
const COPY = {
  en: { run: "Run", pause: "Pause", reset: "Reset", running: "Simulation is running.", paused: "Simulation paused.", meter: "m", bonds: "bonds", seekTo: "Seek to", modelLoading: "Loading model…", modelLoaded: "Model loaded from the trusted host.", modelFailure: "Model could not be loaded; the text description remains available.", mapLoading: "Loading map data from the trusted host…", mapLoaded: "Host map data loaded; local content remains available offline.", mapFailure: "Map data could not be loaded; local/offline content is still available.", speed: "Launch speed", angle: "Launch angle", gravity: "Gravity", range: "Range", height: "Maximum height", loadModel: "Load model", loadMap: "Load map data", offline: "Showing local/offline data.", unavailable: "Interactive science view unavailable; the description remains available.", layers: "Map layers", markers: "Locations", selected: "Selected", orbit: "Rotate model", pan: "Pan model left", zoomIn: "Zoom in", zoomOut: "Zoom out", formula: "Function f(x)", selectPoint: "Select a data point", formulaError: "This formula is unsupported or has no finite graph values.", playbackSpeed: "Playback speed", seek: "Timeline position", reduced: "Reduced motion preference detected; playback starts only by request." },
  ar: { run: "تشغيل", pause: "إيقاف مؤقت", reset: "إعادة ضبط", running: "المحاكاة قيد التشغيل.", paused: "أُوقفت المحاكاة مؤقتًا.", meter: "م", bonds: "روابط", seekTo: "انتقال إلى", modelLoading: "يجري تحميل النموذج…", modelLoaded: "تم تحميل النموذج من المضيف الموثوق.", modelFailure: "تعذر تحميل النموذج؛ يظل الوصف النصي متاحًا.", mapLoading: "يجري تحميل بيانات الخريطة من المضيف الموثوق…", mapLoaded: "تم تحميل بيانات المضيف، ويظل المحتوى المحلي متاحًا دون اتصال.", mapFailure: "تعذر تحميل البيانات؛ تظل الخريطة المحلية متاحة.", speed: "سرعة الإطلاق", angle: "زاوية الإطلاق", gravity: "الجاذبية", range: "المدى", height: "أقصى ارتفاع", loadModel: "تحميل النموذج", loadMap: "تحميل بيانات الخريطة", offline: "تُعرض البيانات المحلية دون اتصال.", unavailable: "العرض العلمي التفاعلي غير متاح؛ يظل الوصف النصي متاحًا.", layers: "طبقات الخريطة", markers: "المواقع", selected: "المحدد", orbit: "تدوير النموذج", pan: "تحريك النموذج لليسار", zoomIn: "تكبير", zoomOut: "تصغير", formula: "الدالة f(x)", selectPoint: "اختر نقطة بيانات", formulaError: "هذه الصيغة غير مدعومة أو لا تنتج قيمًا بيانية منتهية.", playbackSpeed: "سرعة التشغيل", seek: "موضع الخط الزمني", reduced: "تفضيل الحركة المخفّضة مفعّل؛ لا يبدأ التشغيل إلا بطلب صريح." },
};

function element(document, name, className, content) {
  const node = document.createElement(name);
  if (className) node.setAttribute("class", className);
  if (content !== undefined) node.textContent = String(content);
  return node;
}
function svgElement(document, name, attrs = {}) {
  const node = document.createElementNS(SVG, name);
  for (const [key, value] of Object.entries(attrs)) if (Number.isFinite(value) || typeof value === "string") node.setAttribute(key, String(value));
  return node;
}
function control(document, type, label, value, min, max, step, onChange) {
  const wrapper = element(document, "label", "if-science-control");
  wrapper.appendChild(element(document, "span", "", label));
  const input = element(document, "input"); input.setAttribute("type", type); input.setAttribute("aria-label", label);
  if (value !== undefined) input.value = String(value);
  if (min !== undefined) input.setAttribute("min", String(min));
  if (max !== undefined) input.setAttribute("max", String(max));
  if (step !== undefined) input.setAttribute("step", String(step));
  input.addEventListener(type === "range" ? "input" : "change", () => onChange(input.value, input));
  wrapper.appendChild(input);
  return { wrapper, input };
}
function button(document, label, action, pressed) {
  const node = element(document, "button", "if-article-button", label);
  node.setAttribute("type", "button");
  if (pressed !== undefined) node.setAttribute("aria-pressed", String(pressed));
  node.addEventListener("click", action);
  return node;
}
function setStatus(node, message) { node.textContent = message; }
function appendTitle(document, root, props, type) {
  if (props.label) root.appendChild(element(document, "h3", "if-science-title", props.label));
  if (props.description) { const description = element(document, "p", "if-science-description", props.description); root.appendChild(description); }
}
function setupRoot(container, props, type, context) {
  const document = context.document ?? container.ownerDocument ?? globalThis.document;
  if (!document?.createElement) throw new TypeError("Scientific components require a browser-compatible document.");
  container.replaceChildren();
  container.setAttribute("class", `${container.getAttribute?.("class") ?? ""} if-science-widget if-science-${type}`.trim());
  container.setAttribute("role", "group");
  if (props.description) container.setAttribute("aria-label", props.label ? `${props.label}. ${props.description}` : props.description);
  appendTitle(document, container, props, type);
  return document;
}
function drawPolyline(document, points, { width = 100, height = 100, className = "if-science-line" } = {}) {
  const valid = points.filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
  if (valid.length < 2) return null;
  const d = valid.map((point, index) => `${index ? "L" : "M"}${point.x},${point.y}`).join(" ");
  return svgElement(document, "path", { d, viewBox: `0 0 ${width} ${height}`, class: className, fill: "none" });
}

function renderProjectile(container, props, context, type) {
  const document = setupRoot(container, props, type, context);
  const copy = COPY[(context.locale ?? "en").split("-")[0]] ?? COPY.en;
  const controls = element(document, "div", "if-science-controls");
  const state = { speed: props.speed, angleDeg: props.angleDeg, gravity: props.gravity, running: false, time: 0, frame: 0, raf: null };
  const output = element(document, "output", "if-science-output");
  const svg = svgElement(document, "svg", { viewBox: "0 0 640 320", role: "img", "aria-label": props.description ?? props.label ?? "Projectile trajectory" });
  const baseline = svgElement(document, "path", { d: "M32 288 H608", class: "if-science-axis" });
  const trajectory = svgElement(document, "path", { class: "if-science-trajectory", fill: "none" });
  const projectile = svgElement(document, "circle", { class: "if-science-projectile", r: 8, cx: 32, cy: 288 });
  svg.append(baseline, trajectory, projectile);
  const status = element(document, "p", "if-science-status", ""); status.setAttribute("role", "status"); status.setAttribute("aria-live", "polite");
  const results = element(document, "dl", "if-science-results");
  const rangeTerm = element(document, "dt", "", copy.range); const rangeValue = element(document, "dd", "", "—");
  const heightTerm = element(document, "dt", "", copy.height); const heightValue = element(document, "dd", "", "—");
  results.append(rangeTerm, rangeValue, heightTerm, heightValue);
  const redraw = () => {
    const samples = simulateProjectile({ ...state, durationSeconds: props.durationSeconds ?? 20, samples: 100 });
    const maxX = Math.max(1, ...samples.map((point) => point.x)); const maxY = Math.max(1, ...samples.map((point) => point.y));
    const points = samples.map((point) => ({ x: 32 + point.x / maxX * 576, y: 288 - point.y / maxY * 230 }));
    trajectory.setAttribute("d", points.map((point, index) => `${index ? "L" : "M"}${point.x},${point.y}`).join(" "));
    const index = Math.min(samples.length - 1, Math.floor(state.time * (samples.length - 1)));
    projectile.setAttribute("cx", String(points[index].x)); projectile.setAttribute("cy", String(points[index].y));
    rangeValue.textContent = `${samples.at(-1).x.toFixed(2)} ${copy.meter}`;
    heightValue.textContent = `${maxY.toFixed(2)} ${copy.meter}`;
  };
  for (const [key, label, min, max, step] of [["speed", copy.speed, 0.1, 100, "any"], ["angleDeg", copy.angle, 0, 90, 1], ["gravity", copy.gravity, 0.1, 30, "any"]]) {
    const entry = control(document, "range", label, state[key], min, max, step, (value) => { state[key] = Number(value); redraw(); });
    const value = element(document, "output", "if-science-value", state[key]); entry.wrapper.appendChild(value);
    entry.input.addEventListener("input", () => { value.textContent = entry.input.value; }); controls.appendChild(entry.wrapper);
  }
  const play = button(document, copy.run, () => { state.running = !state.running; play.textContent = state.running ? copy.pause : copy.run; play.setAttribute("aria-pressed", String(state.running)); setStatus(status, state.running ? copy.running : copy.paused); });
  const reset = button(document, copy.reset, () => { state.running = false; state.time = 0; play.textContent = copy.run; play.setAttribute("aria-pressed", "false"); redraw(); setStatus(status, ""); });
  controls.append(play, reset);
  const view = element(document, "div", "if-science-chart"); view.appendChild(svg);
  container.append(controls, view, results, status);
  redraw();
  let lastTimestamp = null;
  const tick = (timestamp) => {
    if (!state.running) { state.raf = null; lastTimestamp = null; return; }
    if (lastTimestamp !== null) state.time = (state.time + Math.max(0, timestamp - lastTimestamp) / 2400) % 1;
    lastTimestamp = timestamp; redraw(); state.raf = context.document?.defaultView?.requestAnimationFrame?.(tick) ?? globalThis.requestAnimationFrame?.(tick);
  };
  play.addEventListener("click", () => { if (state.running && state.raf === null) state.raf = context.document?.defaultView?.requestAnimationFrame?.(tick) ?? globalThis.requestAnimationFrame?.(tick); });
  return () => { state.running = false; if (state.raf !== null) (context.document?.defaultView?.cancelAnimationFrame ?? globalThis.cancelAnimationFrame)?.(state.raf); };
}

function renderModel(container, props, context) {
  const document = setupRoot(container, props, "model3d", context);
  const copy = COPY[(context.locale ?? "en").split("-")[0]] ?? COPY.en;
  const controls = element(document, "div", "if-science-controls");
  const view = element(document, "div", "if-science-chart");
  const status = element(document, "p", "if-science-status", ""); status.setAttribute("role", "status"); status.setAttribute("aria-live", "polite");
  const camera = { yaw: 0.65, pitch: -0.35, scale: 1, panX: 0, panY: 0 };
  let model = props.model;
  const draw = () => {
    view.replaceChildren();
    if (!model) { const fallback = element(document, "p", "if-science-fallback", props.description ?? COPY.en.unavailable); fallback.setAttribute("role", "img"); view.appendChild(fallback); return; }
    try {
      const faces = projectMesh(model, { ...camera, width: 640, height: 400 });
      const svg = svgElement(document, "svg", { viewBox: "0 0 640 400", role: "img", "aria-label": props.description ?? props.label ?? "3D model" });
      for (const points of faces) svg.appendChild(svgElement(document, "polygon", { points: points.map((point) => `${point.x + camera.panX},${point.y + camera.panY}`).join(" "), class: "if-science-mesh-face" }));
      view.appendChild(svg);
    } catch { const fallback = element(document, "p", "if-science-fallback", props.description ?? COPY.en.unavailable); fallback.setAttribute("role", "img"); view.appendChild(fallback); }
  };
  const act = (label, change) => { const node = button(document, label, () => { change(); draw(); }); controls.appendChild(node); return node; };
  act(COPY[(context.locale ?? "en").split("-")[0]]?.orbit ?? COPY.en.orbit, () => { camera.yaw += 0.28; });
  act(COPY[(context.locale ?? "en").split("-")[0]]?.pan ?? COPY.en.pan, () => { camera.panX -= 12; });
  act(COPY[(context.locale ?? "en").split("-")[0]]?.zoomIn ?? COPY.en.zoomIn, () => { camera.scale = Math.min(4, camera.scale * 1.2); });
  act(COPY[(context.locale ?? "en").split("-")[0]]?.zoomOut ?? COPY.en.zoomOut, () => { camera.scale = Math.max(0.25, camera.scale / 1.2); });
  act(COPY[(context.locale ?? "en").split("-")[0]]?.reset ?? COPY.en.reset, () => { Object.assign(camera, { yaw: 0.65, pitch: -0.35, scale: 1, panX: 0, panY: 0 }); });
  if (!model && props.modelId && typeof context.environment?.loadScientificModel === "function") {
    controls.appendChild(button(document, COPY[(context.locale ?? "en").split("-")[0]]?.loadModel ?? COPY.en.loadModel, async () => {
      try {
        setStatus(status, copy.modelLoading);
        const loaded = await context.environment.loadScientificModel(props.modelId, { signal: context.signal, format: "intuiforge.mesh.v1" });
        if (context.signal?.aborted) return;
        if (validateScientificBlock({ type: "model3d", props: { ...props, model: loaded } }).length) throw new TypeError("The host returned an unsupported model.");
        model = loaded; draw(); setStatus(status, copy.modelLoaded);
      } catch { setStatus(status, copy.modelFailure); }
    }));
  }
  view.addEventListener("pointerdown", (event) => { view.setPointerCapture?.(event.pointerId); camera.drag = { x: event.clientX, y: event.clientY }; });
  view.addEventListener("pointermove", (event) => { if (!camera.drag) return; camera.panX += (event.clientX - camera.drag.x); camera.panY += (event.clientY - camera.drag.y); camera.drag = { x: event.clientX, y: event.clientY }; draw(); });
  for (const name of ["pointerup", "pointercancel", "lostpointercapture"]) view.addEventListener(name, () => { camera.drag = null; });
  container.append(controls, view, status); draw();
  return () => { camera.drag = null; };
}

function renderMap(container, props, context) {
  const document = setupRoot(container, props, "map", context);
  const copy = COPY[(context.locale ?? "en").split("-")[0]] ?? COPY.en;
  const layerControls = element(document, "fieldset", "if-science-layers"); layerControls.appendChild(element(document, "legend", "", copy.layers));
  const stage = element(document, "div", "if-science-chart");
  const status = element(document, "p", "if-science-status", copy.offline); status.setAttribute("role", "status"); status.setAttribute("aria-live", "polite");
  const details = element(document, "p", "if-science-map-selection", ""); details.setAttribute("aria-live", "polite");
  let layers = props.layers ?? []; let markers = props.markers ?? []; let selected = null;
  const draw = () => {
    stage.replaceChildren();
    const svg = svgElement(document, "svg", { viewBox: "0 0 600 320", role: "img", "aria-label": props.description ?? "Offline map" });
    for (const layer of layers.filter((entry) => entry.visible !== false)) for (const feature of layer.features) {
      const coords = feature.type === "Point" ? [feature.coordinates] : feature.type === "LineString" ? feature.coordinates : feature.coordinates.flat(1);
      const points = coords.map((coordinate) => projectGeoPoint(coordinate, props.bounds));
      if (feature.type === "Point") svg.appendChild(svgElement(document, "circle", { cx: points[0].x * 6, cy: points[0].y * 3.2, r: 3, class: "if-science-map-feature" }));
      else svg.appendChild(svgElement(document, "polyline", { points: points.map((point) => `${point.x * 6},${point.y * 3.2}`).join(" "), class: "if-science-map-feature" }));
    }
    for (const marker of markers) {
      const point = projectGeoPoint(marker.coordinates, props.bounds);
      const dot = svgElement(document, "circle", { cx: point.x * 6, cy: point.y * 3.2, r: selected === marker.id ? 7 : 5, class: "if-science-map-marker", tabindex: 0, role: "button", "aria-label": marker.label, "aria-pressed": selected === marker.id });
      const choose = () => { selected = marker.id; details.textContent = `${marker.label}: ${marker.description ?? ""}`; draw(); };
      dot.addEventListener("click", choose); dot.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); choose(); } });
      svg.appendChild(dot);
    }
    stage.appendChild(svg);
    layerControls.replaceChildren(element(document, "legend", "", copy.layers));
    for (const layer of layers) {
      const input = document.createElement("input"); input.type = "checkbox"; input.checked = layer.visible !== false; input.setAttribute("aria-label", layer.label);
      input.addEventListener("change", () => { layer.visible = input.checked; draw(); });
      const label = element(document, "label", "if-science-control"); label.append(input, element(document, "span", "", layer.label)); layerControls.appendChild(label);
    }
  };
  const locations = element(document, "ul", "if-science-text-alternative"); locations.setAttribute("aria-label", copy.markers);
  for (const marker of markers) {
    const item = element(document, "li"); item.appendChild(button(document, marker.label, () => { selected = marker.id; details.textContent = `${marker.label}: ${marker.description ?? ""}`; draw(); })); locations.appendChild(item);
  }
  const controls = element(document, "div", "if-science-controls");
  if (props.mapId && typeof context.environment?.loadMapData === "function") controls.appendChild(button(document, copy.loadMap, async () => {
    try {
      setStatus(status, copy.mapLoading);
      const loaded = await context.environment.loadMapData(props.mapId, { signal: context.signal });
      if (context.signal?.aborted) return;
      const candidate = { type: "map", content: props.description, props: { ...props, ...loaded } };
      const issues = validateScientificBlock(candidate);
      if (issues.length) throw new TypeError("The host returned invalid map data.");
      layers = loaded.layers; markers = loaded.markers; draw();
      setStatus(status, copy.mapLoaded);
    } catch { setStatus(status, copy.mapFailure); }
  }));
  container.append(layerControls, controls, stage, locations, details, status); draw();
  return () => {};
}

function renderMathGraph(container, props, context) {
  const document = setupRoot(container, props, "mathGraph", context);
  const copy = COPY[(context.locale ?? "en").split("-")[0]] ?? COPY.en;
  const field = control(document, "text", copy.formula, props.formula, undefined, undefined, undefined, (value) => { props = { ...props, formula: value }; draw(); });
  field.input.setAttribute("maxlength", "256"); field.input.setAttribute("autocomplete", "off");
  const stage = element(document, "div", "if-science-chart");
  const status = element(document, "p", "if-science-status", ""); status.setAttribute("role", "status"); status.setAttribute("aria-live", "polite");
  const details = element(document, "p", "if-science-map-selection", "");
  const draw = () => {
    stage.replaceChildren();
    try {
      const samples = sampleScientificFunction(props.formula, props.xMin, props.xMax, props.samples ?? 128);
      const finitePoints = samples.filter((point) => point.y !== null);
      if (!finitePoints.length) throw new RangeError("No finite points in the current domain.");
      const yMin = Math.min(0, ...finitePoints.map((point) => point.y)); const yMax = Math.max(0, ...finitePoints.map((point) => point.y)); const ySpan = Math.max(1e-9, yMax - yMin);
      const svg = svgElement(document, "svg", { viewBox: "0 0 600 300", role: "img", "aria-label": `${props.label ?? "Graph"}. ${props.description ?? ""} ${props.formula}; x ${props.xUnit}, y ${props.yUnit}` });
      svg.appendChild(svgElement(document, "path", { d: "M40 260 H580 M40 20 V260", class: "if-science-axis" }));
      let segment = [];
      const flush = () => { if (segment.length > 1) { const d = segment.map((point, index) => `${index ? "L" : "M"}${point.x},${point.y}`).join(" "); svg.appendChild(svgElement(document, "path", { d, class: "if-science-graph-line" })); } segment = []; };
      const focusStride = Math.max(1, Math.ceil(samples.length / 12));
      for (const [index, point] of samples.entries()) {
        if (point.y === null) { flush(); continue; }
        const mapped = { x: 40 + (point.x - props.xMin) / (props.xMax - props.xMin) * 540, y: 260 - (point.y - yMin) / ySpan * 220 };
        segment.push(mapped);
        const dot = svgElement(document, "circle", { cx: mapped.x, cy: mapped.y, r: 3, class: "if-science-graph-point" });
        if (index % focusStride === 0 || index === samples.length - 1) {
          dot.setAttribute("tabindex", "0"); dot.setAttribute("role", "button");
          dot.setAttribute("aria-label", `${copy.selectPoint}: x=${point.x.toPrecision(4)} ${props.xUnit}, y=${point.y.toPrecision(4)} ${props.yUnit}`);
          const select = () => { details.textContent = `x = ${point.x.toPrecision(4)} ${props.xUnit}; y = ${point.y.toPrecision(4)} ${props.yUnit}`; };
          dot.addEventListener("focus", select); dot.addEventListener("click", select);
          dot.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(); } });
        } else dot.setAttribute("aria-hidden", "true");
        svg.appendChild(dot);
      }
      flush();
      const xCaption = svgElement(document, "text", { x: "540", y: "288", class: "if-science-axis-label" }); xCaption.textContent = props.xUnit;
      const yCaption = svgElement(document, "text", { x: "12", y: "26", class: "if-science-axis-label" }); yCaption.textContent = props.yUnit;
      svg.append(xCaption, yCaption); stage.appendChild(svg); setStatus(status, `${samples.length} ${context.locale?.startsWith("ar") ? "نقطة" : "samples"}.`);
    } catch { setStatus(status, copy.formulaError); }
  };
  field.wrapper.addEventListener("input", () => { props = { ...props, formula: field.input.value }; draw(); });
  container.append(field.wrapper, stage, details, status); draw(); return () => {};
}

function renderMolecule(container, props, context) {
  const document = setupRoot(container, props, "chemistry", context);
  const atoms = props.atoms ?? [];
  const minX = Math.min(...atoms.map((atom) => atom.x)); const maxX = Math.max(...atoms.map((atom) => atom.x));
  const minY = Math.min(...atoms.map((atom) => atom.y)); const maxY = Math.max(...atoms.map((atom) => atom.y));
  const width = Math.max(1, maxX - minX); const height = Math.max(1, maxY - minY);
  const coordinates = new Map(atoms.map((atom) => [atom.id, { x: 60 + (atom.x - minX) / width * 480, y: 60 + (atom.y - minY) / height * 250 }]));
  const svg = svgElement(document, "svg", { viewBox: "0 0 600 360", role: "img", "aria-label": `${props.formula}. ${props.description}` });
  const atomById = new Map(atoms.map((atom) => [atom.id, atom]));
  for (const bond of props.bonds ?? []) {
    const from = coordinates.get(bond.source); const to = coordinates.get(bond.target);
    const count = bond.order ?? 1;
    for (let index = 0; index < count; index += 1) {
      const offset = (index - (count - 1) / 2) * 5;
      svg.appendChild(svgElement(document, "line", { x1: from.x + offset, y1: from.y, x2: to.x + offset, y2: to.y, class: "if-science-bond" }));
    }
  }
  const detail = element(document, "p", "if-science-map-selection", ""); detail.setAttribute("aria-live", "polite");
  const list = element(document, "ul", "if-science-text-alternative"); list.setAttribute("aria-label", props.description);
  for (const atom of atoms) {
    const point = coordinates.get(atom.id);
    const circle = svgElement(document, "circle", { cx: point.x, cy: point.y, r: 21, class: `if-science-atom if-science-element-${atom.element}`, tabindex: 0, role: "button", "aria-label": `${atom.label ?? atom.element}: ${atom.element}` });
    const label = svgElement(document, "text", { x: point.x, y: point.y + 6, class: "if-science-atom-label", "text-anchor": "middle" }); label.textContent = atom.element;
    const choose = () => { detail.textContent = `${atom.label ?? atom.element} (${atom.element})`; };
    circle.addEventListener("click", choose); circle.addEventListener("focus", choose); circle.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); choose(); } });
    svg.append(circle, label);
    const item = element(document, "li"); item.appendChild(button(document, `${atom.label ?? atom.element} (${atom.element})`, choose)); list.appendChild(item);
  }
  const bondCount = (props.bonds ?? []).length;
  const bonds = element(document, "p", "if-science-status", `${bondCount} ${COPY[(context.locale ?? "en").split("-")[0]]?.bonds ?? COPY.en.bonds}`);
  container.append(svg, element(document, "p", "if-science-formula", props.formula), list, detail, bonds);
  return () => {};
}

function anatomyShape(document, part, selected) {
  const shape = part.shape;
  const common = { class: `if-science-anatomy-part${selected ? " is-selected" : ""}`, tabindex: 0, role: "button", "data-part-id": part.id, "aria-label": `${part.label}: ${part.description}`, "aria-pressed": String(selected) };
  if (shape.type === "circle") return svgElement(document, "circle", { ...common, cx: shape.cx, cy: shape.cy, r: shape.r });
  if (shape.type === "ellipse") return svgElement(document, "ellipse", { ...common, cx: shape.cx, cy: shape.cy, rx: shape.rx, ry: shape.ry });
  if (shape.type === "rect") return svgElement(document, "rect", { ...common, x: shape.x, y: shape.y, width: shape.width, height: shape.height, rx: Math.min(shape.width, shape.height) * 0.08 });
  return svgElement(document, "polygon", { ...common, points: shape.points.map((point) => point.join(",")).join(" ") });
}

function renderAnatomy(container, props, context) {
  const document = setupRoot(container, props, "anatomy", context);
  const tree = flattenAnatomy(props.parts ?? []);
  const view = element(document, "div", "if-science-chart");
  const details = element(document, "p", "if-science-map-selection", props.description); details.setAttribute("aria-live", "polite");
  const list = element(document, "ul", "if-science-text-alternative");
  const svg = svgElement(document, "svg", { viewBox: `0 0 ${props.viewBox.width} ${props.viewBox.height}`, role: "img", "aria-label": props.description });
  let selected = props.parts[0]?.id;
  const draw = () => {
    svg.replaceChildren();
    for (const part of props.parts) {
      const shape = anatomyShape(document, part, part.id === selected);
      const choose = () => { selected = part.id; details.textContent = `${part.label}: ${part.description}`; draw(); };
      shape.addEventListener("click", choose); shape.addEventListener("focus", choose); shape.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); choose(); } });
      svg.appendChild(shape);
    }
  };
  for (const part of tree) {
    const item = element(document, "li"); item.setAttribute("style", `margin-inline-start:${part.depth * 1.25}rem`);
    item.appendChild(button(document, part.label, () => { selected = part.id; details.textContent = `${part.label}: ${part.description}`; draw(); }));
    item.appendChild(element(document, "p", "if-science-description", part.description)); list.appendChild(item);
  }
  view.appendChild(svg); container.append(view, details, list); draw(); return () => {};
}

function renderTimeline(container, props, context) {
  const document = setupRoot(container, props, "animationTimeline", context);
  const copy = COPY[(context.locale ?? "en").split("-")[0]] ?? COPY.en;
  const controls = element(document, "div", "if-science-controls");
  const stage = element(document, "div", "if-science-timeline-stage");
  const marker = element(document, "span", "if-science-timeline-marker", "●"); marker.setAttribute("aria-hidden", "true"); stage.appendChild(marker);
  const current = element(document, "output", "if-science-output", "");
  const status = element(document, "p", "if-science-status", ""); status.setAttribute("role", "status"); status.setAttribute("aria-live", "polite");
  const reducedMotion = Boolean(document.defaultView?.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches);
  const duration = props.durationMs; const state = { time: 0, speed: 1, running: false, raf: null, previous: null };
  const seek = control(document, "range", copy.seek, 0, 0, duration, 1, (value) => { state.time = Number(value); draw(); }); seek.input.setAttribute("aria-valuetext", "0 ms");
  const speed = element(document, "label", "if-science-control"); speed.appendChild(element(document, "span", "", copy.playbackSpeed));
  const select = element(document, "select"); select.setAttribute("aria-label", copy.playbackSpeed);
  for (const value of [0.5, 1, 2]) { const option = element(document, "option", "", `${value}×`); option.value = String(value); select.appendChild(option); }
  select.value = "1"; select.addEventListener("change", () => { state.speed = Number(select.value); }); speed.appendChild(select);
  const play = button(document, copy.run, () => { state.running = !state.running; play.textContent = state.running ? copy.pause : copy.run; play.setAttribute("aria-pressed", String(state.running)); if (state.running && state.raf === null) schedule(); });
  const reset = button(document, copy.reset, () => { state.running = false; state.time = 0; play.textContent = copy.run; play.setAttribute("aria-pressed", "false"); draw(); });
  const draw = () => {
    const value = interpolateTimeline(props.frames, state.time);
    seek.input.value = String(state.time); seek.input.setAttribute("aria-valuetext", `${state.time} ms`);
    current.textContent = `${state.time.toFixed(0)} ms · ${String(value)}`;
    const progress = state.time / duration;
    marker.style.left = `${progress * 100}%`; marker.setAttribute("data-value", String(value));
    marker.style.transform = `translateX(${Math.max(-100, Math.min(100, Number(value) || 0))}%)`;
  };
  const schedule = () => {
    const raf = document.defaultView?.requestAnimationFrame ?? globalThis.requestAnimationFrame;
    state.raf = raf?.call(document.defaultView ?? globalThis, tick) ?? null;
  };
  const tick = (timestamp) => {
    if (!state.running) { state.raf = null; state.previous = null; return; }
    if (state.previous !== null) state.time = Math.min(duration, state.time + (timestamp - state.previous) * state.speed);
    state.previous = timestamp; draw();
    if (state.time >= duration) { state.running = false; play.textContent = copy.run; play.setAttribute("aria-pressed", "false"); state.raf = null; return; }
    schedule();
  };
  controls.append(seek.wrapper, speed, play, reset);
  if (reducedMotion) status.textContent = copy.reduced;
  const keyframes = element(document, "ol", "if-science-keyframes");
  for (const frame of props.frames) { const item = element(document, "li", "", `${frame.label} — ${frame.timeMs} ms`); item.appendChild(button(document, "↦", () => { state.time = frame.timeMs; state.running = false; play.textContent = copy.run; draw(); })); item.lastChild.setAttribute("aria-label", `${copy.seekTo} ${frame.label}`); keyframes.appendChild(item); }
  container.append(controls, stage, current, keyframes, status); draw();
  return () => { state.running = false; if (state.raf !== null) (document.defaultView?.cancelAnimationFrame ?? globalThis.cancelAnimationFrame)?.call(document.defaultView ?? globalThis, state.raf); };
}

const RENDERERS = Object.freeze({
  simulator2d: (container, props, context) => renderProjectile(container, props, context, "simulator2d"),
  physicsExperiment: (container, props, context) => renderProjectile(container, props, context, "physicsExperiment"),
  model3d: renderModel,
  map: renderMap,
  mathGraph: renderMathGraph,
  chemistry: renderMolecule,
  anatomy: renderAnatomy,
  animationTimeline: renderTimeline,
});

export function renderScientificComponent(type, container, block, context = {}) {
  const render = RENDERERS[type];
  if (!render) throw new TypeError(`No scientific renderer is registered for ${String(type)}.`);
  return render(container, block.props ?? {}, { ...context, locale: context.locale ?? block.locale ?? "en" });
}
