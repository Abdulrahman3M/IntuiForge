/* Composite families: Annotated Explanation (F11), Infographic (F12), SVG scene (E8) and the controlled
 * custom component composer (E7). Custom visuals are DECLARATIVE: an approved block vocabulary rendered
 * by trusted code. No article-supplied HTML, CSS, event handler or script is ever accepted. */
import {
  LIMITS, TONES, readText, readTone, readIcon, readMedia, readStatus, readProgress, readList, readObject,
  readEnum, readBool, readNumber, readId, readStringList, uniqueIds, isPlainObject, onlyKeys,
} from "./Primitives.js";

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
const PATH_DATA = /^[MmLlHhVvCcSsQqTtAaZz0-9eE.,\s+-]+$/;
const POINTS = /^[0-9eE.,\s+-]+$/;

function readPaint(c, object, key, path) {
  const value = object[key];
  if (value === undefined || value === null) return undefined;
  if (typeof value === "string" && (TONES.includes(value) || HEX.test(value) || value === "none" || value === "currentColor")) return value;
  c.err(`${path}.${key}`, "Use a tone name, a #hex colour, none or currentColor.");
  return undefined;
}

const coord = (c, object, key, path) => readNumber(c, object, key, path, { min: -10000, max: 10000, required: true });

const SCENE_COMMON = ["fill", "stroke", "strokeWidth", "opacity", "dash", "label"];

function readSceneElement(c, entry, path, state, depth) {
  state.count += 1;
  if (state.count > LIMITS.elements) { if (state.count === LIMITS.elements + 1) c.err(path, `At most ${LIMITS.elements} scene elements are allowed.`); return undefined; }
  if (!isPlainObject(entry)) { c.err(path, "Expected a scene element object."); return undefined; }
  const type = entry.type;
  const common = (object) => ({
    fill: readPaint(c, object, "fill", path), stroke: readPaint(c, object, "stroke", path),
    strokeWidth: readNumber(c, object, "strokeWidth", path, { min: 0, max: 40 }),
    opacity: readNumber(c, object, "opacity", path, { min: 0, max: 1 }),
    dash: readBool(c, object, "dash", path, false), label: readText(c, object, "label", path, { max: LIMITS.subtitle }),
  });
  const strip = (object) => Object.fromEntries(Object.entries(object).filter(([, v]) => v !== undefined && v !== false));
  switch (type) {
    case "rect": onlyKeys(c, entry, ["type", "x", "y", "width", "height", "rx", ...SCENE_COMMON], path);
      return strip({ type, x: coord(c, entry, "x", path), y: coord(c, entry, "y", path), width: readNumber(c, entry, "width", path, { min: 0, max: 10000, required: true }), height: readNumber(c, entry, "height", path, { min: 0, max: 10000, required: true }), rx: readNumber(c, entry, "rx", path, { min: 0, max: 500 }), ...common(entry) });
    case "circle": onlyKeys(c, entry, ["type", "cx", "cy", "r", ...SCENE_COMMON], path);
      return strip({ type, cx: coord(c, entry, "cx", path), cy: coord(c, entry, "cy", path), r: readNumber(c, entry, "r", path, { min: 0, max: 5000, required: true }), ...common(entry) });
    case "ellipse": onlyKeys(c, entry, ["type", "cx", "cy", "rx", "ry", ...SCENE_COMMON], path);
      return strip({ type, cx: coord(c, entry, "cx", path), cy: coord(c, entry, "cy", path), rx: readNumber(c, entry, "rx", path, { min: 0, max: 5000, required: true }), ry: readNumber(c, entry, "ry", path, { min: 0, max: 5000, required: true }), ...common(entry) });
    case "line": onlyKeys(c, entry, ["type", "x1", "y1", "x2", "y2", "arrow", ...SCENE_COMMON], path);
      return strip({ type, x1: coord(c, entry, "x1", path), y1: coord(c, entry, "y1", path), x2: coord(c, entry, "x2", path), y2: coord(c, entry, "y2", path), arrow: readBool(c, entry, "arrow", path, false), ...common(entry) });
    case "path": {
      onlyKeys(c, entry, ["type", "d", "arrow", ...SCENE_COMMON], path);
      const d = readText(c, entry, "d", path, { max: LIMITS.pathData, required: true });
      if (d && !PATH_DATA.test(d)) { c.err(`${path}.d`, "Path data may only contain path commands and numbers."); return undefined; }
      return strip({ type, d, arrow: readBool(c, entry, "arrow", path, false), ...common(entry) });
    }
    case "polygon": case "polyline": {
      onlyKeys(c, entry, ["type", "points", ...SCENE_COMMON], path);
      const points = readText(c, entry, "points", path, { max: LIMITS.pathData, required: true });
      if (points && !POINTS.test(points)) { c.err(`${path}.points`, "Points may only contain numbers, commas and spaces."); return undefined; }
      return strip({ type, points, ...common(entry) });
    }
    case "text": onlyKeys(c, entry, ["type", "x", "y", "text", "size", "anchor", "weight", "fill", "label"], path);
      return strip({ type, x: coord(c, entry, "x", path), y: coord(c, entry, "y", path), text: readText(c, entry, "text", path, { max: LIMITS.subtitle, required: true }), size: readNumber(c, entry, "size", path, { min: 8, max: 120 }), anchor: readEnum(c, entry, "anchor", path, ["start", "middle", "end"], "middle"), weight: readEnum(c, entry, "weight", path, ["normal", "bold"], "normal"), fill: readPaint(c, entry, "fill", path), label: readText(c, entry, "label", path, { max: LIMITS.subtitle }) });
    case "icon": onlyKeys(c, entry, ["type", "name", "x", "y", "size", "stroke", "label"], path);
      return strip({ type, name: readIcon(c, { name: entry.name }, "name", path), x: coord(c, entry, "x", path), y: coord(c, entry, "y", path), size: readNumber(c, entry, "size", path, { min: 8, max: 400 }), stroke: readPaint(c, entry, "stroke", path), label: readText(c, entry, "label", path, { max: LIMITS.subtitle }) });
    case "group": {
      onlyKeys(c, entry, ["type", "x", "y", "children", "label"], path);
      if (depth >= LIMITS.depth) { c.err(path, `Groups can nest at most ${LIMITS.depth} levels.`); return undefined; }
      const children = readList(c, entry, "children", path, { min: 1, max: LIMITS.elements, item: (child, here) => readSceneElement(c, child, here, state, depth + 1) });
      return strip({ type, x: readNumber(c, entry, "x", path, { min: -10000, max: 10000 }), y: readNumber(c, entry, "y", path, { min: -10000, max: 10000 }), children, label: readText(c, entry, "label", path, { max: LIMITS.subtitle }) });
    }
    default: c.err(`${path}.type`, "Unsupported scene element. Use rect, circle, ellipse, line, path, polygon, polyline, text, icon or group.");
      return undefined;
  }
}

export function readScene(c, value, path) {
  const scene = readObject(c, value, path, ["viewBox", "elements"]);
  if (!scene) return null;
  let viewBox = [0, 0, 800, 450];
  if (scene.viewBox !== undefined) {
    const v = scene.viewBox;
    if (!Array.isArray(v) || v.length !== 4 || v.some((n) => typeof n !== "number" || !Number.isFinite(n)) || v[2] < 50 || v[3] < 50 || v[2] > 4000 || v[3] > 4000) c.err(`${path}.viewBox`, "viewBox is [minX, minY, width, height] with width and height between 50 and 4000.");
    else viewBox = v;
  }
  const state = { count: 0 };
  const elements = readList(c, scene, "elements", path, { min: 1, max: LIMITS.elements, item: (entry, here) => readSceneElement(c, entry, here, state, 0) });
  return { viewBox, elements };
}

function countScene(elements) { return elements.reduce((n, e) => n + 1 + (e.children ? countScene(e.children) : 0), 0); }

export const svgScene = {
  id: "svg", family: "SVG", label: "SVG illustration", engine: "native",
  validate(data, c) {
    const scene = readScene(c, data, "data");
    return scene;
  },
  describe: (data) => [`${countScene(data.elements)} drawn elements`, ...data.elements.flatMap(function labels(e) { return e.type === "text" ? [e.text] : e.label ? [e.label] : e.children ? e.children.flatMap(labels) : []; })],
};

export const annotated = {
  id: "annotated", family: "F11", label: "Annotated visual explanation", engine: "native",
  validate(data, c) {
    const input = readObject(c, data, "data", ["media", "scene", "annotations", "aspect"]);
    if (!input) return null;
    const media = readMedia(c, input.media, "data.media");
    const scene = input.scene === undefined ? undefined : readScene(c, input.scene, "data.scene");
    if (!media && !scene) c.err("data", "Provide a media image or a scene to annotate.");
    if (media && scene) c.err("data", "Use either media or scene, not both.");
    const annotations = readList(c, input, "annotations", "data", { min: 1, max: LIMITS.annotations, item: (entry, path) => {
      const note = readObject(c, entry, path, ["id", "x", "y", "title", "text", "icon", "tone"]);
      if (!note) return undefined;
      return {
        id: readId(c, note, "id", path),
        x: readNumber(c, note, "x", path, { min: 0, max: 100, required: true }),
        y: readNumber(c, note, "y", path, { min: 0, max: 100, required: true }),
        title: readText(c, note, "title", path, { max: LIMITS.short, required: true }),
        text: readText(c, note, "text", path, { max: LIMITS.body }),
        icon: readIcon(c, note, "icon", path), tone: readTone(c, note, "tone", path),
      };
    } });
    annotations.forEach((note, index) => { note.id ||= `note-${index + 1}`; });
    uniqueIds(c, annotations, "data.annotations");
    return { ...(media ? { media } : {}), ...(scene ? { scene } : {}), annotations, aspect: readNumber(c, input, "aspect", "data", { min: 0.4, max: 3 }) ?? 16 / 9 };
  },
  describe: (data) => data.annotations.map((n, i) => `${i + 1}. ${n.title}${n.text ? `: ${n.text}` : ""}`),
};

export const infographic = {
  id: "infographic", family: "F12", label: "Infographic-style explanation", engine: "native",
  validate(data, c) {
    const input = readObject(c, data, "data", ["intro", "sections", "columns"]);
    if (!input) return null;
    let intro;
    if (input.intro !== undefined) {
      const item = readObject(c, input.intro, "data.intro", ["title", "text", "icon", "tone"]);
      if (item) intro = { title: readText(c, item, "title", "data.intro", { required: true }), text: readText(c, item, "text", "data.intro", { max: LIMITS.body }), icon: readIcon(c, item, "icon", "data.intro"), tone: readTone(c, item, "tone", "data.intro") };
    }
    const sections = readList(c, input, "sections", "data", { min: 1, max: LIMITS.sections, item: (entry, path) => {
      const s = readObject(c, entry, path, ["title", "subtitle", "text", "icon", "tone", "metric", "items", "steps", "progress", "media", "status"]);
      if (!s) return undefined;
      let metric;
      if (s.metric !== undefined) {
        const m = readObject(c, s.metric, `${path}.metric`, ["value", "unit", "label"]);
        if (m) {
          const value = typeof m.value === "number" && Number.isFinite(m.value) ? m.value : (typeof m.value === "string" && m.value.trim() && m.value.length <= 24 ? m.value.trim() : (c.err(`${path}.metric.value`, "A value is a number or short text up to 24 characters."), undefined));
          metric = value === undefined ? undefined : { value, unit: readText(c, m, "unit", `${path}.metric`, { max: 16 }), label: readText(c, m, "label", `${path}.metric`, { max: LIMITS.short }) };
        }
      }
      return {
        title: readText(c, s, "title", path, { required: true }),
        subtitle: readText(c, s, "subtitle", path, { max: LIMITS.subtitle }),
        text: readText(c, s, "text", path, { max: LIMITS.body }),
        icon: readIcon(c, s, "icon", path), tone: readTone(c, s, "tone", path), metric,
        items: readList(c, s, "items", path, { max: LIMITS.items, item: (entry2, here) => {
          const it = readObject(c, entry2, here, ["label", "value", "text", "icon"]);
          return it ? { label: readText(c, it, "label", here, { required: true, max: LIMITS.label }), value: readText(c, it, "value", here, { max: LIMITS.short }), text: readText(c, it, "text", here, { max: LIMITS.subtitle }), icon: readIcon(c, it, "icon", here) } : undefined;
        } }),
        steps: readStringList(c, s, "steps", path, { max: 12, itemMax: LIMITS.subtitle }),
        progress: readProgress(c, s.progress, `${path}.progress`),
        media: readMedia(c, s.media, `${path}.media`), status: readStatus(c, s.status, `${path}.status`),
      };
    } });
    return { intro, sections, columns: readNumber(c, input, "columns", "data", { min: 1, max: 4, integer: true }) };
  },
  describe: (data) => [...(data.intro ? [`${data.intro.title}${data.intro.text ? `: ${data.intro.text}` : ""}`] : []), ...data.sections.map((s) => `${s.title}${s.subtitle ? ` — ${s.subtitle}` : ""}${s.metric ? `: ${s.metric.value}${s.metric.unit ? ` ${s.metric.unit}` : ""}` : ""}${s.text ? `. ${s.text}` : ""}`)],
};

/* ---- Controlled custom component composer (E7) ---- */
const LAYOUTS = ["stack", "grid", "row"];

function readBlocks(c, object, key, path, state, depth) {
  return readList(c, object, key, path, { min: 1, max: LIMITS.blocks, item: (entry, here) => readBlock(c, entry, here, state, depth) });
}

function readBlock(c, entry, path, state, depth) {
  state.count += 1;
  if (state.count > LIMITS.blocks) { if (state.count === LIMITS.blocks + 1) c.err(path, `At most ${LIMITS.blocks} blocks are allowed.`); return undefined; }
  if (!isPlainObject(entry)) { c.err(path, "Expected a block object."); return undefined; }
  const metricValue = (object, here) => (typeof object.value === "number" && Number.isFinite(object.value)) ? object.value : (typeof object.value === "string" && object.value.trim() && object.value.length <= 24 ? object.value.trim() : (c.err(`${here}.value`, "A value is a number or short text up to 24 characters."), undefined));
  switch (entry.block) {
    case "heading": onlyKeys(c, entry, ["block", "text", "level", "icon", "tone"], path);
      return { block: "heading", text: readText(c, entry, "text", path, { required: true }), level: readNumber(c, entry, "level", path, { min: 2, max: 4, integer: true }) ?? 3, icon: readIcon(c, entry, "icon", path), tone: readTone(c, entry, "tone", path) };
    case "text": onlyKeys(c, entry, ["block", "text", "tone", "muted"], path);
      return { block: "text", text: readText(c, entry, "text", path, { max: LIMITS.body, required: true }), tone: readTone(c, entry, "tone", path), muted: readBool(c, entry, "muted", path, false) };
    case "card": onlyKeys(c, entry, ["block", "title", "subtitle", "text", "icon", "tone", "status", "progress", "media", "active"], path);
      return { block: "card", title: readText(c, entry, "title", path, { required: true }), subtitle: readText(c, entry, "subtitle", path, { max: LIMITS.subtitle }), text: readText(c, entry, "text", path, { max: LIMITS.body }), icon: readIcon(c, entry, "icon", path), tone: readTone(c, entry, "tone", path), status: readStatus(c, entry.status, `${path}.status`), progress: readProgress(c, entry.progress, `${path}.progress`), media: readMedia(c, entry.media, `${path}.media`), active: readBool(c, entry, "active", path, false) };
    case "chips": onlyKeys(c, entry, ["block", "items"], path);
      return { block: "chips", items: readList(c, entry, "items", path, { min: 1, max: 16, item: (e, here) => readStatus(c, e, here) }) };
    case "progress": onlyKeys(c, entry, ["block", "label", "value", "tone", "caption"], path);
      return { block: "progress", label: readText(c, entry, "label", path, { max: LIMITS.short, required: true }), value: readNumber(c, entry, "value", path, { min: 0, max: 100, required: true }) ?? 0, tone: readTone(c, entry, "tone", path), caption: readText(c, entry, "caption", path, { max: LIMITS.short }) };
    case "metric": onlyKeys(c, entry, ["block", "label", "value", "unit", "delta", "tone", "icon"], path);
      return { block: "metric", label: readText(c, entry, "label", path, { max: LIMITS.short, required: true }), value: metricValue(entry, path), unit: readText(c, entry, "unit", path, { max: 16 }), delta: entry.delta === undefined ? undefined : (() => { const d = readObject(c, entry.delta, `${path}.delta`, ["text", "direction", "tone"]); return d ? { text: readText(c, d, "text", `${path}.delta`, { max: LIMITS.short, required: true }), direction: readEnum(c, d, "direction", `${path}.delta`, ["up", "down", "flat"], "flat"), tone: readTone(c, d, "tone", `${path}.delta`) } : undefined; })(), tone: readTone(c, entry, "tone", path), icon: readIcon(c, entry, "icon", path) };
    case "image": onlyKeys(c, entry, ["block", "media"], path);
      return { block: "image", media: readMedia(c, entry.media, `${path}.media`) };
    case "list": onlyKeys(c, entry, ["block", "items", "ordered", "tone"], path);
      return { block: "list", items: readStringList(c, entry, "items", path, { max: LIMITS.items, itemMax: LIMITS.subtitle }), ordered: readBool(c, entry, "ordered", path, false), tone: readTone(c, entry, "tone", path) };
    case "callout": onlyKeys(c, entry, ["block", "title", "text", "icon", "tone"], path);
      return { block: "callout", title: readText(c, entry, "title", path, { max: LIMITS.short }), text: readText(c, entry, "text", path, { max: LIMITS.body, required: true }), icon: readIcon(c, entry, "icon", path), tone: readTone(c, entry, "tone", path) ?? "info" };
    case "divider": onlyKeys(c, entry, ["block"], path); return { block: "divider" };
    case "group": {
      onlyKeys(c, entry, ["block", "title", "layout", "columns", "blocks", "tone"], path);
      if (depth >= LIMITS.depth) { c.err(path, `Groups can nest at most ${LIMITS.depth} levels.`); return undefined; }
      return { block: "group", title: readText(c, entry, "title", path, { max: LIMITS.label }), layout: readEnum(c, entry, "layout", path, LAYOUTS, "stack"), columns: readNumber(c, entry, "columns", path, { min: 1, max: 4, integer: true }), tone: readTone(c, entry, "tone", path), blocks: readBlocks(c, entry, "blocks", path, state, depth + 1) };
    }
    case "tabs": case "accordion": {
      onlyKeys(c, entry, ["block", "items"], path);
      if (depth >= LIMITS.depth) { c.err(path, `Interactive sections can nest at most ${LIMITS.depth} levels.`); return undefined; }
      const items = readList(c, entry, "items", path, { min: 1, max: 12, item: (e, here) => {
        const it = readObject(c, e, here, ["label", "icon", "tone", "blocks"]);
        return it ? { label: readText(c, it, "label", here, { max: LIMITS.short, required: true }), icon: readIcon(c, it, "icon", here), tone: readTone(c, it, "tone", here), blocks: readBlocks(c, it, "blocks", here, state, depth + 1) } : undefined;
      } });
      return { block: entry.block, items };
    }
    default: c.err(`${path}.block`, "Unsupported block. Use heading, text, card, chips, progress, metric, image, list, callout, divider, group, tabs or accordion.");
      return undefined;
  }
}

function describeBlocks(blocks) {
  return blocks.flatMap((b) => {
    switch (b.block) {
      case "heading": case "text": return [b.text];
      case "card": return [`${b.title}${b.subtitle ? ` — ${b.subtitle}` : ""}${b.text ? `: ${b.text}` : ""}`];
      case "chips": return [b.items.map((i) => i.text).join(", ")];
      case "progress": return [`${b.label}: ${b.value}%`];
      case "metric": return [`${b.label}: ${b.value}${b.unit ? ` ${b.unit}` : ""}`];
      case "image": return b.media?.alt ? [b.media.alt] : [];
      case "list": return b.items;
      case "callout": return [`${b.title ? `${b.title}: ` : ""}${b.text}`];
      case "group": return [...(b.title ? [b.title] : []), ...describeBlocks(b.blocks)];
      case "tabs": case "accordion": return b.items.flatMap((i) => [i.label, ...describeBlocks(i.blocks)]);
      default: return [];
    }
  });
}

export const custom = {
  id: "custom", family: "E7", label: "Custom visual composition", engine: "native",
  validate(data, c) {
    const input = readObject(c, data, "data", ["layout", "columns", "blocks"]);
    if (!input) return null;
    const state = { count: 0 };
    return { layout: readEnum(c, input, "layout", "data", LAYOUTS, "stack"), columns: readNumber(c, input, "columns", "data", { min: 1, max: 4, integer: true }), blocks: readBlocks(c, input, "blocks", "data", state, 0) };
  },
  describe: (data) => describeBlocks(data.blocks),
};
