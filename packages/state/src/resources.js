import { stateError } from "./errors.js";

function emptyDefault(value) {
  return value === null || value === undefined || Array.isArray(value) && value.length === 0;
}

/** Manage a trusted host loader; this module never calls global fetch or derives endpoints from article data. */
export function createAsyncResource({ loader, requiresConsent = true, isEmpty = emptyDefault, onSubscriberError } = {}) {
  if (typeof loader !== "function") throw stateError("INVALID_RESOURCE_LOADER", "Async resources require a trusted host-supplied loader function.");
  if (typeof requiresConsent !== "boolean") throw stateError("INVALID_RESOURCE_CONSENT_POLICY", "requiresConsent must be a boolean.");
  if (typeof isEmpty !== "function") throw stateError("INVALID_RESOURCE_EMPTY_CHECK", "isEmpty must be a function.");
  let current = Object.freeze({ status: "idle", data: null, error: null, attempt: 0 });
  let controller = null;
  let generation = 0;
  let disposed = false;
  const subscribers = new Set();

  function ensureLive() {
    if (disposed) throw stateError("RESOURCE_DISPOSED", "The async resource has been disposed.");
  }

  function publish(next) {
    current = Object.freeze(next);
    const failures = [];
    for (const listener of subscribers) {
      try { listener(current); } catch (error) { failures.push(error); }
    }
    if (failures.length && typeof onSubscriberError === "function") {
      try { onSubscriberError(new AggregateError(failures, "One or more resource subscribers failed.")); }
      catch { /* Observer errors cannot change the resource state transition. */ }
    }
  }

  async function load(options = {}) {
    ensureLive();
    if (requiresConsent && options.consent !== true) throw stateError("EXTERNAL_CONSENT_REQUIRED", "External resource loading requires explicit host/user consent.");
    controller?.abort();
    controller = new AbortController();
    const activeController = controller;
    const token = ++generation;
    const attempt = current.attempt + 1;
    publish({ status: "loading", data: null, error: null, attempt });
    if (disposed || token !== generation || activeController.signal.aborted) return current;
    try {
      const data = await loader(Object.freeze({ signal: activeController.signal, attempt }));
      if (disposed || token !== generation || activeController.signal.aborted) return current;
      let empty;
      try { empty = Boolean(isEmpty(data)); }
      catch { throw stateError("RESOURCE_EMPTY_CHECK_FAILED", "Resource empty-state evaluation failed safely."); }
      publish({ status: empty ? "empty" : "ready", data, error: null, attempt });
      controller = null;
      return current;
    } catch {
      if (disposed || token !== generation || activeController.signal.aborted) return current;
      publish({ status: "error", data: null, error: Object.freeze({ code: "RESOURCE_LOAD_FAILED" }), attempt });
      controller = null;
      return current;
    }
  }

  async function retry(options = {}) {
    ensureLive();
    if (current.status !== "error") throw stateError("RESOURCE_NOT_RETRYABLE", "Only a resource in error state can be retried.");
    return load(options);
  }

  function subscribe(listener) {
    ensureLive();
    if (typeof listener !== "function") throw stateError("INVALID_RESOURCE_SUBSCRIBER", "Resource subscribers must be functions.");
    subscribers.add(listener);
    try { listener(current); }
    catch (error) { subscribers.delete(listener); throw error; }
    let active = true;
    return () => {
      if (!active) return false;
      active = false;
      return subscribers.delete(listener);
    };
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    generation += 1;
    controller?.abort();
    controller = null;
    subscribers.clear();
  }

  return Object.freeze({ getSnapshot: () => current, load, retry, subscribe, dispose });
}
