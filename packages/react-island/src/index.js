import { EngineError } from "../../core/src/errors.js";

export function mountReactIsland(container, element, createRoot, { document: documentRef = globalThis.document } = {}) {
  if (!container || typeof container.append !== "function") {
    throw new EngineError("INVALID_CONTAINER", "A DOM element container is required for a React island.");
  }
  if (typeof createRoot !== "function") {
    throw new EngineError("REACT_ROOT_UNAVAILABLE", "Pass the optional ReactDOM createRoot function to mount a React island.");
  }
  if (!documentRef || typeof documentRef.createElement !== "function") {
    throw new EngineError("DOM_UNAVAILABLE", "A document implementation is required to create a React island.");
  }

  const island = documentRef.createElement("div");
  island.setAttribute("data-intui-react-island", "");
  container.append(island);

  let root;
  let disposed = false;
  let currentElement = element;
  try {
    root = createRoot(island);
    if (!root || typeof root.render !== "function" || typeof root.unmount !== "function") {
      throw new EngineError("INVALID_REACT_ROOT", "createRoot must return an object with render() and unmount().");
    }
    root.render(currentElement);
  } catch (error) {
    try { root?.unmount?.(); } catch { /* Preserve the mount error. */ }
    island.remove?.();
    if (error instanceof EngineError) throw error;
    throw new EngineError("REACT_ISLAND_MOUNT_FAILED", "The optional React island could not be mounted.", { cause: error });
  }

  return Object.freeze({
    island,
    get currentElement() { return currentElement; },
    update(nextElement) {
      if (disposed) throw new EngineError("REACT_ISLAND_DISPOSED", "The React island has been disposed.");
      currentElement = nextElement;
      root.render(currentElement);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      try { root.unmount(); } finally { island.remove?.(); }
    },
  });
}
