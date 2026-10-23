import { RichViz as OriginalRichViz } from "../vendor/RichViz-main/src/RichVisualization.js";

export const RICHVIZ_VERSION = "0.5.0";
const ACCESSIBILITY_STYLESHEET_URL = new URL("./richviz-accessibility.css", import.meta.url).href;
const accessibilityStyles = new WeakMap();

function ensureAccessibilityStyles(container) {
  const globalDocument = globalThis.document;
  const targetElement = typeof container === "string" ? globalDocument?.querySelector?.(container) : container;
  const documentRef = targetElement?.nodeType === 9 ? targetElement : targetElement?.ownerDocument ?? globalDocument;
  const root = targetElement?.getRootNode?.();
  const styleRoot = targetElement?.nodeType === 9 ? targetElement.head : root?.nodeType === 9 ? root.head : root?.host ? root : documentRef?.head;
  if (!styleRoot || typeof styleRoot.appendChild !== "function" || typeof documentRef?.createElement !== "function") return Promise.resolve();
  const existingPromise = accessibilityStyles.get(styleRoot);
  if (existingPromise) return existingPromise;
  const existing = styleRoot.querySelector?.('link[data-intui-richviz-accessibility=""]');
  if (existing?.sheet) {
    const ready = Promise.resolve();
    accessibilityStyles.set(styleRoot, ready);
    return ready;
  }
  const link = existing ?? documentRef.createElement("link");
  link.rel = "stylesheet";
  link.href = ACCESSIBILITY_STYLESHEET_URL;
  link.setAttribute("data-intui-richviz-accessibility", "");
  const ready = new Promise((resolve, reject) => {
    link.addEventListener("load", resolve, { once: true });
    link.addEventListener("error", () => reject(new Error("RichViz accessibility stylesheet could not be loaded.")), { once: true });
    if (!existing) styleRoot.appendChild(link);
  });
  accessibilityStyles.set(styleRoot, ready);
  return ready;
}

function serializeInertSpec(input) {
  const active = new WeakSet();
  let nodes = 0;
  let stringLength = 0;
  function clone(value, depth = 0) {
    nodes += 1;
    if (nodes > 10_000 || depth > 32) throw new TypeError("RichViz object input exceeds the safe JSON complexity limit.");
    if (value === null || typeof value === "boolean") return value;
    if (typeof value === "string") {
      stringLength += value.length;
      if (value.length > 100_000 || stringLength > 1_000_000) throw new TypeError("RichViz object input exceeds the safe text limit.");
      return value;
    }
    if (typeof value === "number") {
      if (!Number.isFinite(value)) throw new TypeError("RichViz object input must contain finite numbers.");
      return value;
    }
    if (!value || typeof value !== "object") throw new TypeError("RichViz object input must contain only JSON values.");
    if (active.has(value)) throw new TypeError("RichViz object input must not be cyclic.");
    let isArray;
    let prototype;
    let descriptors;
    let symbols;
    try {
      isArray = Array.isArray(value);
      prototype = Object.getPrototypeOf(value);
      descriptors = Object.getOwnPropertyDescriptors(value);
      symbols = Object.getOwnPropertySymbols(value);
    } catch {
      throw new TypeError("RichViz object input could not be inspected safely.");
    }
    if (symbols.length || (isArray ? prototype !== Array.prototype : prototype !== Object.prototype && prototype !== null)) throw new TypeError("RichViz object input must use plain JSON objects and arrays.");
    active.add(value);
    let result;
    if (isArray) {
      const length = descriptors.length?.value;
      if (!Number.isSafeInteger(length) || length < 0 || length > 10_000) throw new TypeError("RichViz arrays may contain at most 10000 entries.");
      result = [];
      for (let index = 0; index < length; index += 1) {
        const descriptor = descriptors[String(index)];
        if (!descriptor || descriptor.get || descriptor.set || !descriptor.enumerable) throw new TypeError("RichViz arrays must be dense and must not contain accessors.");
        result.push(clone(descriptor.value, depth + 1));
      }
      for (const key of Object.keys(descriptors)) if (key !== "length" && !(/^(?:0|[1-9]\d*)$/.test(key) && Number(key) < length)) throw new TypeError("RichViz arrays may not have named properties.");
    } else {
      result = Object.create(null);
      for (const key of Object.keys(descriptors)) {
        const descriptor = descriptors[key];
        if (descriptor.get || descriptor.set || !descriptor.enumerable) throw new TypeError("RichViz objects must not contain accessors or hidden properties.");
        Object.defineProperty(result, key, { value: clone(descriptor.value, depth + 1), enumerable: true, writable: true, configurable: true });
      }
    }
    active.delete(value);
    return result;
  }
  return JSON.stringify(clone(input));
}

// Preserve the exact v0.5.0 public surface and return-handle semantics; IntuiForge does not fork it.
export const RichViz = Object.freeze({
  validate(input) { return OriginalRichViz.validate(input); },
  render(container, spec, options = {}) {
    const source = typeof spec === "string" ? spec : serializeInertSpec(spec);
    const stylesReady = ensureAccessibilityStyles(container);
    const handle = OriginalRichViz.render(container, source, options);
    return {
      ready: Promise.all([handle.ready, stylesReady]).then(() => undefined),
      async refresh() { await stylesReady; return handle.refresh(); },
      dispose() { return handle.dispose(); },
    };
  },
  types: OriginalRichViz.types,
});

export function registerRichVizAdapter(engine) {
  if (!engine || typeof engine.registerAdapter !== "function") {
    throw new TypeError("registerRichVizAdapter requires an IntuiForge engine instance.");
  }
  return engine.registerAdapter({
    id: "org.intuiforge.richviz",
    version: RICHVIZ_VERSION,
    capabilities: ["visualization", "edu-viz", "legacy-compatibility"],
    render(container, spec, options = {}) {
      // The public wrapper inertly serializes plain JSON objects before invoking the
      // preserved string validator, applying schema defaults without evaluating getters.
      return RichViz.render(container, spec, options);
    },
  });
}
