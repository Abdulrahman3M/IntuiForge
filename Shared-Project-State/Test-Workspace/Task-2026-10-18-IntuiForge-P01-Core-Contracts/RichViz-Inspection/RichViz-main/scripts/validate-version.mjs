import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_ROOT = fileURLToPath(new URL("../", import.meta.url));
const CODE_EXTENSIONS = new Set([".html", ".js", ".mjs", ".cjs", ".css", ".py"]);
const ACTIVE_DIRS = ["visual-browser", "src", "Assets"];
const ASSET_VERSION = /\?v=([^\s"'\x60<>&}]+)/g;
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

function* sourceFiles(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* sourceFiles(path);
    else if (entry.isFile() && CODE_EXTENSIONS.has(extname(entry.name))) yield path;
  }
}

export function checkVersionConsistency(root = DEFAULT_ROOT) {
  const version = readFileSync(join(root, "VERSION"), "utf8").trim();
  const issues = [];
  if (!SEMVER.test(version)) issues.push("VERSION is not a valid semantic version: " + version);

  const packageVersion = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version;
  if (packageVersion !== version) issues.push("package.json: " + packageVersion + " does not match VERSION (" + version + ")");

  const readme = readFileSync(join(root, "README.md"), "utf8");
  const badge = readme.match(/img\.shields\.io\/badge\/version-([0-9A-Za-z.+-]+)-/);
  if (badge && badge[1] !== version) issues.push("README.md: version badge " + badge[1] + " does not match VERSION (" + version + ")");

  let scannedFiles = 0;
  let versionedReferences = 0;
  for (const folder of ACTIVE_DIRS) {
    for (const path of sourceFiles(join(root, folder))) {
      scannedFiles += 1;
      const source = readFileSync(path, "utf8");
      for (const match of source.matchAll(ASSET_VERSION)) {
        versionedReferences += 1;
        if (match[1] !== version) {
          const line = source.slice(0, match.index).split("\n").length;
          issues.push(relative(root, path).replaceAll("\\", "/") + ":" + line + ": asset cache version " + match[1] + " does not match VERSION (" + version + ")");
        }
      }
    }
  }
  return { version, issues, scannedFiles, versionedReferences };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = checkVersionConsistency();
  if (result.issues.length) {
    console.error("Rich Viz version consistency failed:\n" + result.issues.map(issue => "- " + issue).join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Rich Viz " + result.version + ": " + result.versionedReferences + " asset references checked across " + result.scannedFiles + " source files.");
  }
}
