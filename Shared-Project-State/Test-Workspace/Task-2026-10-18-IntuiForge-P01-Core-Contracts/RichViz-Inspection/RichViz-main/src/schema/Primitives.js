/* RichViz — validation primitives.
 *
 * Every field that reaches a renderer is rebuilt from these readers. Nothing
 * from article data is passed through: unknown keys are rejected, text is plain
 * (rendered with textContent), icons are names looked up in the trusted
 * registry, colours are semantic tone names, and media is a restricted
 * relative/project path. This is the sanitisation boundary for the library.
 */
import { hasIcon } from "../RichVisualizationIcons.js";

export const LIMITS = Object.freeze({
  source: 120000, title: 160, description: 1200, label: 200, subtitle: 300, body: 1200, short: 80,
  stages: 40, nodes: 300, edges: 600, sections: 24, items: 40, metrics: 24, series: 12, points: 500,
  blocks: 120, depth: 3, annotations: 40, elements: 400, pathData: 4000, mermaid: 50000,
});

export const TONES = Object.freeze(["neutral", "accent", "info", "success", "warning", "danger", "violet", "teal", "pink", "orange"]);
export const STATES = Object.freeze({ ok: "success", warn: "warning", error: "danger", info: "info", pending: "neutral" });
const ID = /^[A-Za-z0-9_-]{1,64}$/;
// Control characters and bidirectional *override* characters (visual spoofing) are never valid text.
const BAD_TEXT = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f‪-‮⁦-⁩]/;
const SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const IMAGE_EXT = /\.(?:png|jpe?g|webp|gif|avif|svg)$/i;

export const isPlainObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;

export function createContext() {
  const errors = [];
  const warnings = [];
  return {
    errors, warnings,
    err(path, message) { if (errors.length < 60) errors.push({ path, message }); },
    warn(path, message) { if (warnings.length < 60) warnings.push({ path, message }); },
  };
}

/** Reject keys outside the allow-list so typos and smuggled fields surface instead of being ignored. */
export function onlyKeys(c, object, allowed, path) {
  for (const key of Object.keys(object)) {
    if (!allowed.includes(key)) c.err(`${path}.${key}`, `Unsupported field "${key}".`);
  }
}

export function readText(c, object, key, path, { max = LIMITS.label, required = false } = {}) {
  const value = object[key];
  const here = `${path}.${key}`;
  if (value === undefined || value === null || value === "") {
    if (required) c.err(here, "This text is required.");
    return undefined;
  }
  if (typeof value !== "string") { c.err(here, "Expected text."); return undefined; }
  const text = value.trim();
  if (!text) { if (required) c.err(here, "This text is required."); return undefined; }
  if (text.length > max) { c.err(here, `Text is longer than ${max} characters.`); return undefined; }
  if (BAD_TEXT.test(text)) { c.err(here, "Text contains unsupported control characters."); return undefined; }
  return text;
}

export function readEnum(c, object, key, path, allowed, fallback) {
  const value = object[key];
  if (value === undefined || value === null) return fallback;
  if (!allowed.includes(value)) { c.err(`${path}.${key}`, `Expected one of: ${allowed.join(", ")}.`); return fallback; }
  return value;
}

export function readBool(c, object, key, path, fallback = false) {
  const value = object[key];
  if (value === undefined || value === null) return fallback;
  if (typeof value !== "boolean") { c.err(`${path}.${key}`, "Expected true or false."); return fallback; }
  return value;
}

export function readNumber(c, object, key, path, { min = -1e12, max = 1e12, integer = false, required = false } = {}) {
  const value = object[key];
  const here = `${path}.${key}`;
  if (value === undefined || value === null) { if (required) c.err(here, "A number is required."); return undefined; }
  if (typeof value !== "number" || !Number.isFinite(value) || (integer && !Number.isInteger(value))) { c.err(here, integer ? "Expected a whole number." : "Expected a finite number."); return undefined; }
  if (value < min || value > max) { c.err(here, `Number must be between ${min} and ${max}.`); return undefined; }
  return value;
}

export function readId(c, object, key, path, { required = false } = {}) {
  const value = object[key];
  if (value === undefined || value === null) { if (required) c.err(`${path}.${key}`, "An id is required."); return undefined; }
  if (typeof value !== "string" || !ID.test(value)) { c.err(`${path}.${key}`, "Ids use 1-64 letters, digits, hyphens or underscores."); return undefined; }
  return value;
}

export const readTone = (c, object, key, path) => readEnum(c, object, key, path, TONES, undefined);

export function readIcon(c, object, key, path) {
  const value = object[key];
  if (value === undefined || value === null || value === "") return undefined;
  if (!hasIcon(value)) { c.err(`${path}.${key}`, `Unknown icon "${String(value).slice(0, 40)}". Use a name from the icon registry.`); return undefined; }
  return value;
}

/** Media references are article-relative (e.g. ../attachments/a.png) or root-relative project paths; never absolute URLs or schemes. */
export function readMedia(c, value, path) {
  if (value === undefined || value === null) return undefined;
  if (!isPlainObject(value)) { c.err(path, "Expected a media object with src and alt."); return undefined; }
  onlyKeys(c, value, ["src", "alt", "decorative", "fit", "caption"], path);
  const src = readText(c, value, "src", path, { max: 500, required: true });
  const decorative = readBool(c, value, "decorative", path, false);
  const alt = readText(c, value, "alt", path, { max: LIMITS.subtitle, required: !decorative });
  const caption = readText(c, value, "caption", path, { max: LIMITS.subtitle });
  const fit = readEnum(c, value, "fit", path, ["cover", "contain"], "cover");
  if (src) {
    const pathOnly = src.split(/[?#]/)[0];
    const afterRelative = pathOnly.replace(/^(?:\.\.\/)+/, "").replace(/^\.\//, "");
    if (SCHEME.test(src) || src.startsWith("//") || src.includes("\\") || afterRelative.split("/").includes("..") || !IMAGE_EXT.test(pathOnly)) {
      c.err(`${path}.src`, "Media must be a relative or project-root image path (png, jpg, webp, gif, avif or svg), not an external URL.");
      return undefined;
    }
  }
  if (!src || (!decorative && !alt)) return undefined;
  return { src, ...(alt ? { alt } : {}), ...(decorative ? { decorative } : {}), fit, ...(caption ? { caption } : {}) };
}

/** { text, tone } or { state, text } status chip. */
export function readStatus(c, value, path) {
  if (value === undefined || value === null) return undefined;
  if (!isPlainObject(value)) { c.err(path, "Expected a status object with text."); return undefined; }
  onlyKeys(c, value, ["text", "tone", "state", "icon"], path);
  const text = readText(c, value, "text", path, { max: LIMITS.short, required: true });
  const state = readEnum(c, value, "state", path, Object.keys(STATES), undefined);
  const tone = readTone(c, value, "tone", path) || (state ? STATES[state] : "neutral");
  const icon = readIcon(c, value, "icon", path);
  return text ? { text, tone, ...(state ? { state } : {}), ...(icon ? { icon } : {}) } : undefined;
}

export function readProgress(c, value, path) {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number") {
    if (!Number.isFinite(value) || value < 0 || value > 100) { c.err(path, "Progress must be between 0 and 100."); return undefined; }
    return { value };
  }
  if (!isPlainObject(value)) { c.err(path, "Expected a number 0-100 or an object with value."); return undefined; }
  onlyKeys(c, value, ["value", "label", "tone"], path);
  const amount = readNumber(c, value, "value", path, { min: 0, max: 100, required: true });
  const label = readText(c, value, "label", path, { max: LIMITS.short });
  const tone = readTone(c, value, "tone", path);
  return amount === undefined ? undefined : { value: amount, ...(label ? { label } : {}), ...(tone ? { tone } : {}) };
}

export function readList(c, object, key, path, { min = 0, max, required = false, item }) {
  const value = object[key];
  const here = `${path}.${key}`;
  if (value === undefined || value === null) { if (required || min > 0) c.err(here, `Add at least ${Math.max(min, 1)} item(s).`); return []; }
  if (!Array.isArray(value)) { c.err(here, "Expected a list."); return []; }
  if (value.length < min) c.err(here, `Add at least ${min} item(s).`);
  if (value.length > max) { c.err(here, `At most ${max} items are allowed.`); return []; }
  const out = [];
  value.forEach((entry, index) => {
    const result = item(entry, `${here}[${index}]`, index);
    if (result !== undefined) out.push(result);
  });
  return out;
}

export function readObject(c, value, path, allowed) {
  if (!isPlainObject(value)) { c.err(path, "Expected an object."); return null; }
  onlyKeys(c, value, allowed, path);
  return value;
}

/** Strings only; used for short bullet lists such as pipeline inputs/outputs. */
export function readStringList(c, object, key, path, { max = 12, itemMax = LIMITS.label } = {}) {
  return readList(c, object, key, path, { max, item: (entry, here) => {
    if (typeof entry !== "string" || !entry.trim() || entry.length > itemMax || BAD_TEXT.test(entry)) { c.err(here, `Expected short text up to ${itemMax} characters.`); return undefined; }
    return entry.trim();
  } });
}

export function uniqueIds(c, items, path) {
  const seen = new Set();
  items.forEach((entry, index) => {
    if (!entry.id) return;
    if (seen.has(entry.id)) c.err(`${path}[${index}].id`, `Duplicate id "${entry.id}".`);
    seen.add(entry.id);
  });
}
