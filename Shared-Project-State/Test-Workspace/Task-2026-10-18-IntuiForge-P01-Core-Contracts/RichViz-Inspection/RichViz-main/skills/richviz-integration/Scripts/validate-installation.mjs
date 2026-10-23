import { stat, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const base = resolve(process.argv[2] || ".");
const required = ["VERSION", "src/RichVisualization.js", "src/RichVisualizationSchema.js", "src/RichVisualizationRegistry.js", "src/rich-visualization.css", "src/registry.json", "Examples", "External-Libraries"];
const failures = [];
for (const relative of required) {
  try { await stat(resolve(base, relative)); } catch { failures.push(`missing ${relative}`); }
}
try {
  const registry = JSON.parse(await readFile(resolve(base, "src/registry.json"), "utf8"));
  const ids = new Set();
  for (const item of registry) { if (ids.has(item.id)) failures.push(`duplicate type ${item.id}`); ids.add(item.id); }
  console.log(`Found ${registry.length} diagram registry entries.`);
} catch { failures.push("invalid or missing src/registry.json"); }
if (failures.length) { console.error(failures.join("\n")); process.exitCode = 1; }
else console.log("RichViz installation structure is present.");
