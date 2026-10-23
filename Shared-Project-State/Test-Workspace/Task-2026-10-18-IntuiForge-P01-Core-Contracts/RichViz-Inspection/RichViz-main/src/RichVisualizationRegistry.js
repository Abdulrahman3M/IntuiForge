import { TYPE_DEFINITIONS } from "./RichVisualizationSchema.js";

/* RichViz — renderer and engine registry.
 *
 * type id  ──►  renderer (lazy chunk)  ──►  [adapter ──► independent external library]
 *
 * Adding a visualization type = one schema definition (schema/Types*.js), one entry in RENDERER_LOADERS and
 * one example; any host renderer, authoring interface, and the gallery pick it up with no further branching.
 * Nothing here references a lesson, article id or language.
 */
export const RENDERER_LOADERS = Object.freeze({
  mermaid: async () => (await import("./renderers/MermaidView.js")).renderMermaid,
  "react-flow": async () => (await import("./renderers/NodeMap.js")).renderGraph,
  "node-map": async () => (await import("./renderers/NodeMap.js")).renderGraph,
  "process-cards": async () => (await import("./renderers/Cards.js")).renderProcessCards,
  "step-guide": async () => (await import("./renderers/Cards.js")).renderStepGuide,
  pipeline: async () => (await import("./renderers/Cards.js")).renderPipeline,
  "process-flow": async () => (await import("./renderers/Flow.js")).renderProcessFlow,
  "kpi-dashboard": async () => (await import("./renderers/Dashboard.js")).renderDashboard,
  "bar-chart": async () => (await import("./renderers/Chart.js")).renderChartVisualization,
  "data-chart": async () => (await import("./renderers/Chart.js")).renderChartVisualization,
  annotated: async () => (await import("./renderers/Scene.js")).renderAnnotated,
  svg: async () => (await import("./renderers/Scene.js")).renderSvgScene,
  infographic: async () => (await import("./renderers/Composite.js")).renderInfographic,
  custom: async () => (await import("./renderers/Composite.js")).renderCustom,
});

/** Engine adapters. Each default export is { id, load(), render()/mount() } over one independent External Library. */
export const ADAPTER_LOADERS = Object.freeze({
  mermaid: () => import("./adapters/MermaidAdapter.js"),
  "react-flow": () => import("./adapters/ReactFlowAdapter.js"),
  chartjs: () => import("./adapters/ChartJsAdapter.js"),
  recharts: () => import("./adapters/RechartsAdapter.js"),
  echarts: () => import("./adapters/EChartsAdapter.js"),
  plotly: () => import("./adapters/PlotlyAdapter.js"),
});

/** The External Libraries id behind each adapter (documentation, validation and tests). */
export const ADAPTER_LIBRARIES = Object.freeze({ mermaid: "mermaid", "react-flow": "react-flow", chartjs: "chartjs", recharts: "recharts", echarts: "echarts", plotly: "plotly" });

/** Types whose output depends on literal theme colours and must be redrawn when the theme changes. */
export const THEME_SENSITIVE = Object.freeze(new Set(["mermaid", "bar-chart", "data-chart", "kpi-dashboard"]));

const DOC_PATHS = Object.freeze(Object.fromEntries(Object.keys(TYPE_DEFINITIONS).map((id) => [id, `docs/diagrams/${id}.md`])));
const EXAMPLE_PATHS = Object.freeze(Object.fromEntries(Object.keys(TYPE_DEFINITIONS).map((id) => [id, `Examples/core/${id}.json`])));
export const DIAGRAM_REGISTRY = Object.freeze(Object.values(TYPE_DEFINITIONS).map((definition) => Object.freeze({
  id: definition.id,
  name: definition.label,
  category: definition.family,
  renderer: definition.id === "mermaid" ? "mermaid" : definition.id === "react-flow" || definition.id === "node-map" ? "react-flow/svg" : definition.id.includes("chart") ? "chart-adapters/svg" : definition.id === "svg" || definition.id === "annotated" ? "svg" : definition.id === "custom" || definition.id === "infographic" ? "composite" : "richviz-native",
  interactive: ["react-flow", "node-map", "custom"].includes(definition.id),
  static: true,
  version: 1,
  capabilities: Object.freeze(["responsive", "accessible-text", "rtl", "theme-aware", ...( ["react-flow", "node-map", "custom"].includes(definition.id) ? ["interaction"] : [])]),
  documentation: DOC_PATHS[definition.id],
  example: EXAMPLE_PATHS[definition.id],
})));

export const hasRenderer = (type) => Object.hasOwn(RENDERER_LOADERS, type);

export async function loadRenderer(type) {
  if (!hasRenderer(type)) throw new Error(`No renderer is registered for "${type}".`);
  return RENDERER_LOADERS[type]();
}

export async function loadAdapter(name) {
  if (!Object.hasOwn(ADAPTER_LOADERS, name)) throw new Error(`No adapter is registered for "${name}".`);
  const adapter = (await ADAPTER_LOADERS[name]()).default;
  await adapter.load();
  return adapter;
}

