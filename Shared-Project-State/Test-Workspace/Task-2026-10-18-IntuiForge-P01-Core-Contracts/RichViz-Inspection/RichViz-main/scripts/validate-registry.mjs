import { DIAGRAM_REGISTRY, RENDERER_LOADERS } from "../src/RichVisualizationRegistry.js";
import { EXAMPLES_CATALOG } from "../src/RichVisualizationExamples.js";
import { TYPE_DEFINITIONS, validateVisualization } from "../src/RichVisualizationSchema.js";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const errors = [];
const ids = new Set();
for (const item of DIAGRAM_REGISTRY) {
  if (ids.has(item.id)) errors.push(`duplicate type id ${item.id}`);
  ids.add(item.id);
  if (!TYPE_DEFINITIONS[item.id] || !RENDERER_LOADERS[item.id]) errors.push(`${item.id}: schema/renderer missing`);
  for (const target of [item.documentation, item.example]) {
    try { await readFile(resolve(target), "utf8"); } catch { errors.push(`${item.id}: missing ${target}`); }
  }
}
for (const entry of EXAMPLES_CATALOG) {
  const checked = validateVisualization(entry.spec);
  if (!checked.ok) errors.push(`${entry.id}: ${JSON.stringify(checked.errors)}`);
}
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(`Registry valid: ${DIAGRAM_REGISTRY.length} types; ${EXAMPLES_CATALOG.length} curated examples.`);
