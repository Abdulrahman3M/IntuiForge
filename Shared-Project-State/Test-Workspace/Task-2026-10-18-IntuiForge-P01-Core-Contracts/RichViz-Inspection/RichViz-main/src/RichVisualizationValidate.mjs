#!/usr/bin/env node
/* RichViz — command-line validator.
 *
 *   node RichVisualizationValidate.mjs <file-or-folder> [...]
 *   node RichVisualizationValidate.mjs --json            (reads [{"id","source"}] from stdin, prints one JSON result per block;
 *                                                        used by validation tools so the schema stays the only authority)
 *
 * Checks every ```edu-viz block in Markdown files (and every standalone *.json spec) with the SAME schema the reader
 * and authoring interfaces use. Exit code 0 = all valid, 1 = at least one invalid block, 2 = usage / read error.
 * Use it after editing an article that contains visualizations, or in a focused test run. */
import { readFile, readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { validateVisualizationSource, formatErrors } from "./RichVisualizationSchema.js";

export function extractVisualizationBlocks(markdown) {
  const lines = String(markdown).replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  for (let i = 0; i < lines.length; i += 1) {
    if (!/^```edu-viz\s*$/.test(lines[i].trim())) continue;
    const body = [];
    const startLine = i + 2;
    i += 1;
    while (i < lines.length && !/^```\s*$/.test(lines[i].trim())) { body.push(lines[i]); i += 1; }
    blocks.push({ line: startLine, source: body.join("\n") });
  }
  return blocks;
}

async function* walk(target) {
  const info = await stat(target);
  if (info.isFile()) { yield target; return; }
  for (const entry of await readdir(target, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    yield* walk(join(target, entry.name));
  }
}

/** Every media reference (src) declared anywhere inside a normalised spec. */
export function collectMedia(value, found = []) {
  if (Array.isArray(value)) value.forEach((item) => collectMedia(item, found));
  else if (value && typeof value === "object") {
    if (typeof value.src === "string" && ("alt" in value || "decorative" in value)) found.push(value.src);
    Object.values(value).forEach((item) => collectMedia(item, found));
  }
  return found;
}

export function validateBlockList(blocks) {
  return blocks.map(({ id, source }) => {
    const result = validateVisualizationSource(source);
    return result.ok
      ? { id, ok: true, type: result.spec.type, title: result.spec.title, errors: [], media: [...new Set(collectMedia(result.spec.data))] }
      : { id, ok: false, type: null, title: "", errors: result.errors, media: [] };
  });
}

export async function validatePaths(paths, log = console.log) {
  let checked = 0; let failed = 0;
  for (const root of paths) {
    for await (const file of walk(root)) {
      const kind = extname(file).toLowerCase();
      if (kind !== ".md" && kind !== ".json") continue;
      const text = await readFile(file, "utf8");
      const blocks = kind === ".md" ? extractVisualizationBlocks(text) : (text.includes('"type"') ? [{ line: 1, source: text }] : []);
      for (const block of blocks) {
        checked += 1;
        const result = validateVisualizationSource(block.source);
        if (result.ok) log(`OK    ${file}:${block.line}  ${result.spec.type}  "${result.spec.title}"`);
        else { failed += 1; log(`FAIL  ${file}:${block.line}\n${formatErrors(result.errors).split("\n").map((row) => `        ${row}`).join("\n")}`); }
      }
    }
  }
  return { checked, failed };
}

if (process.argv[1]?.endsWith("RichVisualizationValidate.mjs") && process.argv[2] === "--json") {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  try { process.stdout.write(`${JSON.stringify(validateBlockList(JSON.parse(Buffer.concat(chunks).toString("utf8"))))}
`); process.exit(0); }
  catch (error) { console.error(error.message); process.exit(2); }
} else if (process.argv[1]?.endsWith("RichVisualizationValidate.mjs")) {
  const paths = process.argv.slice(2);
  if (!paths.length) { console.error("Usage: node RichVisualizationValidate.mjs <file-or-folder> [...]"); process.exit(2); }
  try {
    const { checked, failed } = await validatePaths(paths);
    console.log(`${checked} visualization block(s) checked, ${failed} invalid.`);
    process.exit(failed ? 1 : 0);
  } catch (error) { console.error(error.message); process.exit(2); }
}
