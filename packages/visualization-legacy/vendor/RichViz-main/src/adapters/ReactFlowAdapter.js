/* React Flow / XYFlow adapter — large or genuinely interactive node diagrams (zoom, pan, select).
 * Library: External-Libraries/react-flow/ (id "react-flow"): the shared React +
 * React Flow bundle. Its read-only viewer is mounted on demand and unmounted by the returned cleanup. */
import { SHARED_RUNTIME_URL, SHARED_RUNTIME_CSS_URL, loadModuleOnce } from "./Common.js";

let flowModule = null;

function ensureStylesheet() {
  if (document.getElementById("richviz-flow-viewer-css")) return;
  const link = document.createElement("link");
  link.id = "richviz-flow-viewer-css"; link.rel = "stylesheet"; link.href = SHARED_RUNTIME_CSS_URL;
  document.head.append(link);
}

export default {
  id: "react-flow",
  async load() {
    ensureStylesheet();
    flowModule = await loadModuleOnce(SHARED_RUNTIME_URL);
    if (typeof flowModule.mountDiagramViewer !== "function") throw new Error("The interactive viewer is unavailable.");
    return flowModule;
  },
  /** Mount the read-only viewer in `host`; returns the cleanup function that unmounts it. */
  mount(host, graph, options = {}) {
    if (!flowModule) throw new Error("Load the React Flow adapter before mounting.");
    return flowModule.mountDiagramViewer(host, { graph, ...options });
  },
};
