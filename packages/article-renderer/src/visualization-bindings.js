const PATH_PART = /^(?:[A-Za-z][A-Za-z0-9_-]*|0|[1-9][0-9]*)$/;
const BLOCKED_PARTS = new Set(["__proto__", "prototype", "constructor"]);

export function visualizationBindingPath(bindingName) {
  if (typeof bindingName !== "string" || !bindingName.startsWith("data.")) return null;
  const parts = bindingName.slice(5).split(".");
  if (!parts.length || parts.some((part) => !PATH_PART.test(part) || BLOCKED_PARTS.has(part))) return null;
  return parts;
}

export function getVisualizationBindingTarget(spec, bindingName) {
  const parts = visualizationBindingPath(bindingName);
  if (!parts || !spec || typeof spec !== "object" || !spec.data || typeof spec.data !== "object") return undefined;
  let current = spec.data;
  for (const part of parts) {
    if (!current || typeof current !== "object" || !Object.hasOwn(current, part)) return undefined;
    current = current[part];
  }
  return current;
}

/** Apply primitive article-state values to existing RichViz data paths on a fresh clone. */
export function applyVisualizationBindings(spec, bindings = {}) {
  const copy = JSON.parse(JSON.stringify(spec));
  for (const [bindingName, value] of Object.entries(bindings)) {
    const parts = visualizationBindingPath(bindingName);
    if (!parts || value !== null && !["string", "number", "boolean"].includes(typeof value) || typeof value === "number" && !Number.isFinite(value)) continue;
    let parent = copy?.data;
    for (const part of parts.slice(0, -1)) {
      if (!parent || typeof parent !== "object" || !Object.hasOwn(parent, part)) { parent = undefined; break; }
      parent = parent[part];
    }
    const key = parts.at(-1);
    if (parent && typeof parent === "object" && Object.hasOwn(parent, key)) {
      const previous = parent[key];
      if (previous === null || typeof previous === typeof value) parent[key] = value;
    }
  }
  return copy;
}
