import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const features = JSON.parse(await readFile(resolve(root, "IntuiForge-Implementation-Kit/Feature-Traceability.json"), "utf8"));
const testEvidence = {
  P00: "Reports/P00-Completion.md; Execution-State/zip-audit.json (source inventory and integrity evidence)",
  P01: "tests/p01-core.test.mjs; Reports/P01-Completion.md",
  P02: "tests/p02-article.test.mjs; Reports/P02-Completion.md",
  P03: "tests/p03-design-system.test.mjs; Reports/P03-Completion.md",
  P04: "tests/p04-reactive-state.test.mjs; Reports/P04-Completion.md",
  P05: "tests/p05-article-renderer.test.mjs; Reports/P05-Completion.md",
  P06: "tests/p06-general-widgets.test.mjs; tests/p06-renderer.test.mjs; Reports/P06-Completion.md",
  P07: "tests/p07-education.test.mjs; tests/p07-renderer.test.mjs; Reports/P07-Completion.md",
  P08: "tests/p08-visual-engines.test.mjs; Reports/P08-Completion.md",
  P09: "tests/p09-scientific.test.mjs; Reports/P09-Completion.md",
  P10: "tests/p10-rich-media.test.mjs; Reports/P10-Completion.md",
  P11: "tests/p11-authoring.test.mjs; Reports/P11-Completion.md",
  P12: "tests/p12-host-integration.test.mjs; Reports/P12-Completion.md",
  P13: "tests/p13-hardening.test.mjs; Reports/P13-Completion.md",
  P14: "tests/p14-showcase.test.mjs; Reports/P14-Completion.md (dedicated Edge interaction and visual QA evidence)",
  P15: "tests/p15-release.test.mjs; release/release-manifest.json; Reports/P15-Completion.md",
};
const quote = (value) => `"${String(value).replaceAll('"', '""')}"`;
const lines = ["id,phase,status,requirement,evidence"];
for (const feature of features) {
  const evidence = testEvidence[feature.phase];
  if (!evidence) throw new Error(`No evidence mapping for ${feature.id} (${feature.phase}).`);
  lines.push([feature.id, feature.phase, feature.status, feature.requirement, evidence].map(quote).join(","));
}
await writeFile(resolve(root, "Reports/P15-Feature-Audit.csv"), `${lines.join("\n")}\n`);
process.stdout.write(`Wrote ${features.length} feature audit rows.\n`);
