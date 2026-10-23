/* SVG illustration (E8) and Annotated Visual Explanation (F11).
 * The scene is a validated, declarative element list drawn with trusted code; there is no raw SVG input. */
import { el, svgEl, svgIconGroup, uid } from "../RichVisualizationDom.js";

const paint = (value) => (/^#|^none$|^currentColor$/.test(value) ? value : `var(--rev-t-${value})`);

function setStyle(node, element) {
  if (element.fill !== undefined) node.style.fill = paint(element.fill);
  if (element.stroke !== undefined) node.style.stroke = paint(element.stroke);
  if (element.strokeWidth !== undefined) node.style.strokeWidth = String(element.strokeWidth);
  if (element.opacity !== undefined) node.style.opacity = String(element.opacity);
  if (element.dash) node.style.strokeDasharray = "8 6";
}

export function buildScene(scene, ctx, label) {
  const [minX, minY, width, height] = scene.viewBox;
  const svg = svgEl("svg", { class: "rev-scene", viewBox: `${minX} ${minY} ${width} ${height}`, role: "img", "aria-label": label || ctx.summary, focusable: "false" });
  const defs = svgEl("defs");
  svg.append(defs);
  const markers = new Map();
  const markerFor = (color) => {
    const key = color || "currentColor";
    if (!markers.has(key)) {
      const id = uid("rev-sc");
      markers.set(key, id);
      const head = svgEl("path", { d: "M0 0 L10 5 L0 10 z" });
      head.style.fill = paint(key);
      defs.append(svgEl("marker", { id, markerWidth: 11, markerHeight: 11, refX: 9, refY: 5, orient: "auto", markerUnits: "userSpaceOnUse" }, [head]));
    }
    return markers.get(key);
  };
  const build = (element) => {
    let node;
    switch (element.type) {
      case "rect": node = svgEl("rect", { x: element.x, y: element.y, width: element.width, height: element.height, rx: element.rx }); break;
      case "circle": node = svgEl("circle", { cx: element.cx, cy: element.cy, r: element.r }); break;
      case "ellipse": node = svgEl("ellipse", { cx: element.cx, cy: element.cy, rx: element.rx, ry: element.ry }); break;
      case "line": node = svgEl("line", { x1: element.x1, y1: element.y1, x2: element.x2, y2: element.y2 }); break;
      case "path": node = svgEl("path", { d: element.d }); break;
      case "polygon": node = svgEl("polygon", { points: element.points }); break;
      case "polyline": node = svgEl("polyline", { points: element.points }); break;
      case "text":
        node = svgEl("text", { x: element.x, y: element.y, "text-anchor": element.anchor || "middle", "font-size": element.size || 16, "font-weight": element.weight === "bold" ? 700 : 400 });
        node.textContent = element.text;
        if (element.fill !== undefined) node.style.fill = paint(element.fill);
        return node;
      case "icon": return svgIconGroup(element.name, element.x, element.y, element.size || 32, element.stroke ? paint(element.stroke) : "currentColor");
      case "group": {
        node = svgEl("g", { transform: element.x || element.y ? `translate(${element.x || 0} ${element.y || 0})` : undefined });
        element.children.forEach((child) => { const built = build(child); if (built) node.append(built); });
        return node;
      }
      default: return null;
    }
    setStyle(node, element);
    if ((element.type === "path" || element.type === "polyline") && element.fill === undefined) node.style.fill = "none";
    if ((element.type === "line" || element.type === "path") && element.arrow) node.setAttribute("marker-end", `url(#${markerFor(element.stroke)})`);
    if ((element.type === "line" || element.type === "polyline" || element.type === "path") && element.stroke === undefined) node.style.stroke = "var(--rev-muted)";
    if (element.label) { const title = svgEl("title"); title.textContent = element.label; node.append(title); }
    return node;
  };
  scene.elements.forEach((element) => { const built = build(element); if (built) svg.append(built); });
  return svg;
}

export function renderSvgScene(stage, spec, ctx) {
  stage.append(buildScene(spec.data, ctx, spec.description));
  return {};
}

export function renderAnnotated(stage, spec, ctx) {
  const { media, scene, annotations, aspect } = spec.data;
  const canvas = el("div", { class: "rev-annot__canvas", style: { "aspect-ratio": String(aspect) } });
  if (scene) { const svg = buildScene(scene, ctx, spec.description); svg.style.blockSize = "100%"; canvas.append(svg); }
  else {
    const image = el("img", { attrs: { alt: media.decorative ? "" : media.alt, loading: "lazy", decoding: "async" } });
    image.src = ctx.resolveMedia ? ctx.resolveMedia(media.src) : media.src;
    image.addEventListener("error", () => { image.hidden = true; canvas.append(el("span", { class: "rev-media__missing", text: media.alt || ctx.t("mediaMissing") })); }, { once: true });
    canvas.append(image);
  }
  const markers = new Map();
  const notes = el("ol", { class: "rev-notes" });
  const live = el("p", { class: "rev__note", attrs: { role: "status", "aria-live": "polite" } });
  let active = null;
  const apply = () => {
    markers.forEach((marker, id) => marker.setAttribute("aria-pressed", String(id === active)));
    notes.querySelectorAll(".rev-note").forEach((note) => { note.dataset.active = String(note.dataset.id === active); });
    const current = annotations.find((n) => n.id === active);
    live.textContent = current ? `${ctx.t("marker")} ${annotations.indexOf(current) + 1}: ${current.title}${current.text ? `. ${current.text}` : ""}` : "";
  };
  annotations.forEach((note, index) => {
    const marker = el("button", { class: "rev-marker", text: String(index + 1), dataset: { tone: note.tone, id: note.id }, attrs: { type: "button", "aria-pressed": "false", "aria-label": `${ctx.t("marker")} ${index + 1}: ${note.title}` }, style: { left: `${note.x}%`, top: `${note.y}%` } });
    markers.set(note.id, marker);
    canvas.append(marker);
    notes.append(el("li", { class: "rev-note", dataset: { tone: note.tone, id: note.id, active: "false" } }, [
      el("span", { class: "rev-note__no", text: String(index + 1), attrs: { "aria-hidden": "true" } }),
      el("div", { class: "rev-t", text: note.title }),
      note.text ? el("p", { text: note.text }) : null,
    ]));
  });
  const choose = (id) => { active = active === id ? null : id; apply(); };
  const onClick = (event) => {
    const hit = event.target.closest(".rev-marker, .rev-note");
    if (hit) choose(hit.dataset.id);
  };
  const root = el("div", { class: "rev-annot" }, [canvas, notes]);
  root.addEventListener("click", onClick);
  stage.append(root, live);
  return { dispose() { root.removeEventListener("click", onClick); } };
}

