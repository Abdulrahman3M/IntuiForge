import { parseArticleSource } from "../../article/src/index.js";
import { createIntuiEngine } from "../../core/src/index.js";
import { registerArticleRenderer } from "../../article-renderer/src/index.js";
import { registerRichVizAdapter } from "../../visualization-legacy/src/index.js";
import { createProgressPersistenceAdapter } from "./progress.js";

const OMITTED_KEYS = new Set(["__proto__", "prototype", "constructor"]);

function copyRecord(value, label) {
  if (value === undefined || value === null) return Object.create(null);
  if (typeof value !== "object" || Array.isArray(value)) throw new TypeError(`${label} must be a plain object.`);
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) throw new TypeError(`${label} must be a plain object.`);
  const copy = Object.create(null);
  for (const key of Reflect.ownKeys(value)) {
    if (typeof key !== "string" || OMITTED_KEYS.has(key)) throw new TypeError(`${label} contains an unsupported property.`);
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor || !descriptor.enumerable || !Object.hasOwn(descriptor, "value")) throw new TypeError(`${label}.${key} must be an enumerable data property.`);
    Object.defineProperty(copy, key, { value: descriptor.value, enumerable: true, configurable: true, writable: true });
  }
  return copy;
}

function mergeRecord(target, value, label) {
  for (const [key, next] of Object.entries(copyRecord(value, label))) {
    Object.defineProperty(target, key, { value: next, enumerable: true, configurable: true, writable: true });
  }
}

/** Create a host-neutral runtime with the portable article renderer and the preserved RichViz adapter registered. */
export function createIntuiHost({ validateArticle = parseArticleSource, hostEnvironment = {}, rendererOptions = {} } = {}) {
  if (typeof validateArticle !== "function") throw new TypeError("createIntuiHost requires a trusted article validator function.");
  const engine = createIntuiEngine({ validateArticle });
  const registrations = [];
  const mounts = new Set();
  let disposed = false;
  try {
    registrations.push(registerRichVizAdapter(engine));
    registrations.push(registerArticleRenderer(engine, rendererOptions));
  } catch (error) {
    for (const unregister of registrations.reverse()) { try { unregister(); } catch { /* Preserve registration failure. */ } }
    void engine.dispose();
    throw error;
  }

  const defaults = copyRecord(hostEnvironment, "hostEnvironment");
  function ensureLive() {
    if (disposed) throw new Error("This IntuiForge host runtime has been disposed.");
  }

  function mount(container, input, environment = {}) {
    ensureLive();
    const mountEnvironment = Object.create(null);
    mergeRecord(mountEnvironment, defaults, "hostEnvironment");
    mergeRecord(mountEnvironment, environment, "environment");
    const handle = engine.mount(container, input, mountEnvironment);
    let released = false;
    let mounted;
    mounted = Object.freeze({
      get ready() { return handle.ready; },
      get state() { return handle.state; },
      update(nextInput) { return handle.update(nextInput); },
      refresh() { return handle.refresh(); },
      updateEnvironment(patch) {
        if (released || disposed) return Promise.resolve({ status: "disposed" });
        mergeRecord(mountEnvironment, patch, "environment patch");
        return handle.refresh();
      },
      async dispose() {
        if (released) return;
        released = true;
        await handle.dispose();
        mounts.delete(mounted);
      },
    });
    mounts.add(mounted);
    return mounted;
  }

  async function dispose() {
    if (disposed) return;
    disposed = true;
    await Promise.all([...mounts].map((handle) => handle.dispose()));
    for (const unregister of registrations.reverse()) { try { unregister(); } catch { /* Disposal remains idempotent. */ } }
    await engine.dispose();
  }

  return Object.freeze({
    validateArticle: engine.validateArticle,
    mount,
    registerComponent: engine.registerComponent,
    registerRenderer: engine.registerRenderer,
    registerAdapter: engine.registerAdapter,
    getCapabilities: engine.getCapabilities,
    dispose,
  });
}

/** Mount one article into a host-owned DOM element without taking ownership of its page or framework. */
export function mountIntuiArticle(container, input, { environment = {}, ...options } = {}) {
  const host = createIntuiHost(options);
  let mounted;
  try { mounted = host.mount(container, input, environment); }
  catch (error) { void host.dispose(); throw error; }
  let disposed = false;
  return Object.freeze({
    get ready() { return mounted.ready; },
    get state() { return mounted.state; },
    update(nextInput) { return mounted.update(nextInput); },
    refresh() { return mounted.refresh(); },
    updateEnvironment(patch) { return mounted.updateEnvironment(patch); },
    async dispose() {
      if (disposed) return;
      disposed = true;
      try { await mounted.dispose(); } finally { await host.dispose(); }
    },
  });
}

export { createProgressPersistenceAdapter };
