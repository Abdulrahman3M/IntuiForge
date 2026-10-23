import { EngineError } from "./errors.js";
import { renderErrorFallback } from "./fallback.js";
import { createRegistrationRegistry } from "./registry.js";

export const ENGINE_API_VERSION = 1;

function failure(code, message, cause) {
  return new EngineError(code, message, { cause });
}

function normalizeValidation(result) {
  if (result && typeof result === "object" && result.ok === true && Object.hasOwn(result, "value")) {
    return Object.freeze({ ok: true, value: result.value });
  }
  if (result && typeof result === "object" && result.ok === false && Array.isArray(result.errors)) {
    return Object.freeze({ ok: false, errors: [...result.errors] });
  }
  return Object.freeze({
    ok: false,
    errors: [{ code: "INVALID_VALIDATION_RESULT", message: "The article validator returned an unsupported result." }],
  });
}

function safeReport(callback, error, phase) {
  if (typeof callback !== "function") return;
  try { callback(error, phase); } catch { /* An observer must not break host rendering. */ }
}

async function disposeResult(result) {
  if (typeof result === "function") {
    await result();
  } else if (result && typeof result.dispose === "function") {
    await result.dispose();
  }
}

export function createIntuiEngine({ validateArticle: validator } = {}) {
  const components = createRegistrationRegistry("component");
  const renderers = createRegistrationRegistry("renderer");
  const adapters = createRegistrationRegistry("adapter");
  const mounts = new Set();
  let disposed = false;

  function ensureLive() {
    if (disposed) throw failure("ENGINE_DISPOSED", "The IntuiForge engine has been disposed.");
  }

  function validateArticle(input) {
    if (disposed) return Object.freeze({ ok: false, errors: [{ code: "ENGINE_DISPOSED", message: "The engine has been disposed." }] });
    if (typeof validator !== "function") {
      return Object.freeze({ ok: false, errors: [{ code: "VALIDATOR_UNAVAILABLE", message: "No trusted article validator is configured." }] });
    }

    try {
      const result = validator(input);
      if (result && typeof result.then === "function") return result.then(normalizeValidation, (error) => ({
        ok: false,
        errors: [{ code: "VALIDATOR_FAILED", message: "Article validation failed.", cause: error }],
      }));
      return normalizeValidation(result);
    } catch (error) {
      return Object.freeze({ ok: false, errors: [{ code: "VALIDATOR_FAILED", message: "Article validation failed.", cause: error }] });
    }
  }

  function registerComponent(registration) {
    ensureLive();
    return components.register(registration);
  }

  function registerRenderer(registration) {
    ensureLive();
    if (registration?.default === true && renderers.list().some((renderer) => renderer.default)) {
      throw failure("DEFAULT_RENDERER_EXISTS", "Only one default renderer may be registered.");
    }
    return renderers.register(registration);
  }

  function registerAdapter(registration) {
    ensureLive();
    return adapters.register(registration);
  }

  function getCapabilities() {
    return Object.freeze({
      apiVersion: ENGINE_API_VERSION,
      components: components.describe(),
      renderers: renderers.describe(),
      adapters: adapters.describe(),
    });
  }

  function mount(container, input, environment = {}) {
    ensureLive();
    if (!container || typeof container.replaceChildren !== "function") {
      throw failure("INVALID_CONTAINER", "mount() requires an Element-like container with replaceChildren().");
    }

    let state = "loading";
    let generation = 0;
    let latestInput = input;
    let activeController = null;
    let activeResult = null;
    let handleDisposed = false;
    const doc = environment.document || globalThis.document;

    async function clearActive() {
      activeController?.abort();
      activeController = null;
      const result = activeResult;
      activeResult = null;
      try { await disposeResult(result); } catch { /* Teardown errors cannot block remount/dispose. */ }
    }

    function selectRenderer() {
      const requested = environment.rendererId;
      if (requested) {
        const renderer = renderers.get(requested);
        if (!renderer) throw failure("RENDERER_UNAVAILABLE", `No renderer is registered for "${requested}".`);
        return renderer;
      }
      const renderer = renderers.list().find((item) => item.default);
      if (!renderer) throw failure("RENDERER_UNAVAILABLE", "No default renderer is registered.");
      return renderer;
    }

    async function showFailure(error, token) {
      if (handleDisposed || token !== generation) return { status: "superseded" };
      const normalized = error instanceof EngineError
        ? error
        : failure("RENDERER_FAILED", "The registered renderer could not render this content.", error);
      try {
        renderErrorFallback(container, normalized, { document: doc, lang: environment.lang, dir: environment.dir, cspNonce: environment.cspNonce });
        state = "error";
      } catch (fallbackError) {
        state = "error-fallback-unavailable";
        safeReport(environment.onError, failure("FALLBACK_FAILED", "The error fallback could not be mounted.", fallbackError), "fallback");
      }
      safeReport(environment.onError, normalized, "render");
      return { status: "error", code: normalized.code };
    }

    async function renderInput(nextInput) {
      if (handleDisposed || disposed) return { status: "disposed" };
      const token = ++generation;
      state = "loading";
      await clearActive();
      if (handleDisposed || token !== generation) return { status: "superseded" };

      const controller = new AbortController();
      activeController = controller;
      const validation = await validateArticle(nextInput);
      if (handleDisposed || token !== generation || controller.signal.aborted) return { status: "superseded" };
      if (!validation.ok) {
        const validationError = failure("ARTICLE_VALIDATION_FAILED", "Article validation failed.");
        validationError.issues = validation.errors;
        return showFailure(validationError, token);
      }

      let renderer;
      try {
        renderer = selectRenderer();
      } catch (error) {
        return showFailure(error, token);
      }

      const lang = environment.lang || "ar";
      const dir = environment.dir || (String(lang).toLowerCase().startsWith("ar") ? "rtl" : "ltr");
      const context = Object.freeze({
        apiVersion: ENGINE_API_VERSION,
        lang,
        dir,
        signal: controller.signal,
        environment: Object.freeze({ ...environment, document: undefined }),
        getComponent: (id) => components.get(id),
        getAdapter: (id) => adapters.get(id),
      });

      try {
        container.replaceChildren();
        const result = await renderer.render(container, validation.value, context);
        if (handleDisposed || token !== generation || controller.signal.aborted) {
          try { await disposeResult(result); } catch { /* A stale renderer cannot re-enter the host. */ }
          return { status: "superseded" };
        }
        activeResult = result;
        state = "ready";
        return { status: "ready" };
      } catch (error) {
        if (handleDisposed || token !== generation || controller.signal.aborted) return { status: "superseded" };
        return showFailure(error, token);
      }
    }

    const handle = {
      ready: null,
      update(nextInput) {
        if (handleDisposed || disposed) return Promise.resolve({ status: "disposed" });
        latestInput = nextInput;
        return renderInput(nextInput);
      },
      refresh() {
        if (handleDisposed || disposed) return Promise.resolve({ status: "disposed" });
        return renderInput(latestInput);
      },
      async dispose() {
        if (handleDisposed) return;
        handleDisposed = true;
        generation += 1;
        state = "disposed";
        await clearActive();
        try { container.replaceChildren(); } catch { /* The host may have detached the mount root. */ }
        mounts.delete(handle);
      },
      get state() { return state; },
    };
    mounts.add(handle);
    handle.ready = renderInput(input);
    return handle;
  }

  async function dispose() {
    if (disposed) return;
    disposed = true;
    await Promise.all([...mounts].map((handle) => handle.dispose()));
    components.clear();
    renderers.clear();
    adapters.clear();
  }

  return Object.freeze({
    validateArticle,
    mount,
    registerComponent,
    registerRenderer,
    registerAdapter,
    getCapabilities,
    dispose,
  });
}
