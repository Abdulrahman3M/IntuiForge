import { renderScientificComponent } from "./renderers.js";
export { validateScientificBlock } from "./validation.js";
export { parseScientificFormula, evaluateScientificFormula, sampleScientificFunction } from "./math.js";
export { simulateProjectile, interpolateTimeline } from "./simulation.js";
export { projectMesh, projectGeoPoint, flattenAnatomy } from "./geometry.js";

export const SCIENTIFIC_COMPONENT_IDS = Object.freeze([
  "org.intuiforge.science.simulator2d",
  "org.intuiforge.science.model3d",
  "org.intuiforge.science.map",
  "org.intuiforge.science.mathgraph",
  "org.intuiforge.science.physics-experiment",
  "org.intuiforge.science.chemistry",
  "org.intuiforge.science.anatomy",
  "org.intuiforge.science.animation-timeline",
]);

const TYPES = Object.freeze(["simulator2d", "model3d", "map", "mathGraph", "physicsExperiment", "chemistry", "anatomy", "animationTimeline"]);

/** Register P09 components explicitly; hosts control registration and disposal. */
export function registerScientificPlugins(engine) {
  if (!engine || typeof engine.registerComponent !== "function") throw new TypeError("registerScientificPlugins requires an IntuiForge engine instance.");
  const disposers = [];
  try {
    TYPES.forEach((type, index) => {
      disposers.push(engine.registerComponent(Object.freeze({
        id: SCIENTIFIC_COMPONENT_IDS[index],
        version: "1.0.0",
        capabilities: Object.freeze([`science:${type}`, "declarative", "accessible", "offline-safe"]),
        render: (container, block, context) => renderScientificComponent(type, container, block, context),
      })));
    });
  } catch (error) {
    for (const dispose of disposers.reverse()) { try { dispose(); } catch { /* Preserve the registration error while rolling back. */ } }
    throw error;
  }
  let active = true;
  return () => {
    if (!active) return false;
    active = false;
    let removed = true;
    for (const dispose of disposers.reverse()) { try { removed = dispose() && removed; } catch { removed = false; } }
    return removed;
  };
}
