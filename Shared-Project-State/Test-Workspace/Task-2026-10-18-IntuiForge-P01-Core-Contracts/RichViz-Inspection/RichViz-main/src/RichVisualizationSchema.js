/* RichViz — authoring schema (pure, DOM-free).
 *
 * One JSON document per visualization, stored in the article as a ```edu-viz fence:
 *   { "version": 1, "type": "<registered type>", "title": "…", "description": "…",
 *     "dir": "ltr|rtl" (optional), "options": { engine?, height?, showTitle? }, "data": { … } }
 *
 * This module is the single validation authority used by the public reader, authoring interfaces
 * preview/save path, the gallery and the tests. It returns a freshly built, normalised spec: nothing
 * from the input object is passed through to renderers.
 */
import { LIMITS, createContext, isPlainObject, onlyKeys, readText, readEnum, readBool, readNumber } from "./schema/Primitives.js";
import { processCards, stepGuide, pipeline } from "./schema/TypesCards.js";
import { mermaid, reactFlow, processFlow, nodeMap } from "./schema/TypesFlow.js";
import { barChart, dataChart, kpiDashboard, CHART_ENGINES } from "./schema/TypesData.js";
import { svgScene, annotated, infographic, custom } from "./schema/TypesComposite.js";

export const SPEC_VERSION = 1;
export const FENCE = "edu-viz";

const DEFINITIONS = [mermaid, reactFlow, processCards, processFlow, stepGuide, pipeline, kpiDashboard, barChart, dataChart, nodeMap, annotated, infographic, svgScene, custom];
export const TYPE_DEFINITIONS = Object.freeze(Object.fromEntries(DEFINITIONS.map((definition) => [definition.id, definition])));
export const TYPE_IDS = Object.freeze(DEFINITIONS.map((definition) => definition.id));
export const isChartType = (type) => type === "bar-chart" || type === "data-chart";

/** Which chart kinds each engine can draw. The native SVG baseline is the dependency-free fallback. */
export const ENGINE_CHARTS = Object.freeze({
  native: ["bar", "horizontal-bar", "stacked-bar", "line", "area", "pie", "doughnut"],
  chartjs: ["bar", "horizontal-bar", "stacked-bar", "line", "area", "pie", "doughnut", "radar", "scatter"],
  recharts: ["bar", "horizontal-bar", "stacked-bar", "line", "area", "pie", "doughnut", "radar", "scatter"],
  echarts: ["bar", "horizontal-bar", "stacked-bar", "line", "area", "pie", "doughnut", "radar", "scatter"],
  plotly: ["bar", "horizontal-bar", "stacked-bar", "line", "area", "pie", "doughnut", "radar", "scatter"],
});

/** Parse fence/editor source text into a value; never throws. */
export function parseVisualizationSource(source) {
  const text = String(source ?? "");
  if (text.length > LIMITS.source) return { ok: false, errors: [{ path: "", message: `Source is longer than ${LIMITS.source} characters.` }] };
  try {
    const value = JSON.parse(text);
    return { ok: true, value };
  } catch (error) {
    return { ok: false, errors: [{ path: "", message: `The visualization source is not valid JSON (${String(error.message).slice(0, 120)}).` }] };
  }
}

export function validateVisualization(input) {
  const c = createContext();
  const finish = (spec) => ({ ok: c.errors.length === 0 && Boolean(spec), spec: c.errors.length === 0 ? spec : null, errors: c.errors, warnings: c.warnings });
  if (!isPlainObject(input)) { c.err("", "A visualization is a JSON object."); return finish(null); }
  onlyKeys(c, input, ["version", "type", "title", "description", "dir", "options", "data"], "");
  if (input.version !== SPEC_VERSION) c.err("version", `Expected version ${SPEC_VERSION}.`);
  const definition = typeof input.type === "string" && Object.hasOwn(TYPE_DEFINITIONS, input.type) ? TYPE_DEFINITIONS[input.type] : null;
  if (!definition) { c.err("type", `Unknown visualization type. Use one of: ${TYPE_IDS.join(", ")}.`); return finish(null); }
  const title = readText(c, input, "title", "", { max: LIMITS.title, required: true });
  const description = readText(c, input, "description", "", { max: LIMITS.description, required: true });
  const dir = readEnum(c, input, "dir", "", ["ltr", "rtl"], undefined);
  let options = {};
  if (input.options !== undefined) {
    if (!isPlainObject(input.options)) c.err("options", "Expected an object.");
    else {
      const allowed = isChartType(definition.id) || definition.id === "kpi-dashboard" ? ["engine", "height", "showTitle"] : ["height", "showTitle"];
      onlyKeys(c, input.options, allowed, "options");
      options = {
        ...(allowed.includes("engine") ? { engine: readEnum(c, input.options, "engine", "options", CHART_ENGINES, "auto") } : {}),
        height: readNumber(c, input.options, "height", "options", { min: 160, max: 1000, integer: true }),
        showTitle: readBool(c, input.options, "showTitle", "options", true),
      };
    }
  }
  if (!isPlainObject(input.data)) { c.err("data", "Add a data object for this visualization."); return finish(null); }
  const data = definition.validate(input.data, c);
  if (isChartType(definition.id) && data && options.engine && options.engine !== "auto") {
    if (!ENGINE_CHARTS[options.engine].includes(data.chart)) c.err("options.engine", `The ${options.engine} engine cannot draw a "${data.chart}" chart.`);
  }
  if (definition.id === "kpi-dashboard" && data?.chart && options.engine && options.engine !== "auto" && !ENGINE_CHARTS[options.engine].includes(data.chart.chart)) c.err("options.engine", `The ${options.engine} engine cannot draw a "${data.chart.chart}" chart.`);
  if (!data) return finish(null);
  return finish({ version: SPEC_VERSION, type: definition.id, title, description, ...(dir ? { dir } : {}), options: { showTitle: true, ...Object.fromEntries(Object.entries(options).filter(([, v]) => v !== undefined)) }, data });
}

/** Parse + validate in one step (used by fence hydration and the editor). */
export function validateVisualizationSource(source) {
  const parsed = parseVisualizationSource(source);
  if (!parsed.ok) return { ok: false, spec: null, errors: parsed.errors, warnings: [] };
  return validateVisualization(parsed.value);
}

/** Plain-text alternative of a normalised spec: title, description and one line per data item. */
export function describeVisualization(spec) {
  const definition = TYPE_DEFINITIONS[spec.type];
  return { title: spec.title, description: spec.description, lines: definition ? definition.describe(spec.data) : [] };
}

export function formatErrors(errors) {
  return errors.map((error) => (error.path ? `${error.path}: ${error.message}` : error.message)).join("\n");
}
