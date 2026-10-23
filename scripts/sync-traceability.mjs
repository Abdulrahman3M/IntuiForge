import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const phaseStatePath = resolve(root, "IntuiForge-Implementation-Kit/Execution-State/phase-state.json");
const jsonPath = resolve(root, "IntuiForge-Implementation-Kit/Feature-Traceability.json");
const csvPath = resolve(root, "IntuiForge-Implementation-Kit/Feature-Traceability.csv");
const phaseState = JSON.parse(await readFile(phaseStatePath, "utf8"));
const features = JSON.parse(await readFile(jsonPath, "utf8"));
const completedPhases = new Set(phaseState.phases.filter(({ status }) => status === "COMPLETE").map(({ id }) => id));
for (const feature of features) {
  if (completedPhases.has(feature.phase)) feature.status = "PASS";
}

function parseCsvLine(line) {
  const fields = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (quoted && char === '"' && line[index + 1] === '"') { value += '"'; index += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { fields.push(value); value = ""; }
    else value += char;
  }
  fields.push(value);
  return fields;
}

const originalLines = (await readFile(csvPath, "utf8")).trimEnd().split(/\r?\n/);
const rows = new Map(originalLines.slice(1).map((line) => {
  const fields = parseCsvLine(line);
  return [fields[0], fields];
}));
const header = parseCsvLine(originalLines[0]);
const csvQuote = (value) => `"${String(value).replaceAll('"', '""')}"`;
const out = [header.map(csvQuote).join(",")];
for (const feature of features) {
  const row = rows.get(feature.id);
  if (!row) throw new Error(`Feature ${feature.id} is missing from Feature-Traceability.csv.`);
  row[header.length - 1] = feature.status;
  out.push(row.map(csvQuote).join(","));
}
if (rows.size !== features.length) throw new Error("CSV and JSON feature registries have different row counts.");
await writeFile(jsonPath, `${JSON.stringify(features, null, 2)}\n`);
await writeFile(csvPath, `${out.join("\n")}\n`);
process.stdout.write(`Synchronized ${features.length} feature IDs from completed phase evidence.\n`);
