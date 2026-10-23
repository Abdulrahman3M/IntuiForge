import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkVersionConsistency } from "../scripts/validate-version.mjs";

test("current source versions match the canonical VERSION file", () => {
  const result = checkVersionConsistency();
  assert.ok(result.scannedFiles > 0, "source files should be checked");
  assert.ok(result.versionedReferences > 0, "asset cache versions should be checked");
  assert.deepEqual(result.issues, []);
});

test("version guard detects outdated assets, package and README badges", () => {
  const root = mkdtempSync(join(tmpdir(), "richviz-version-"));
  try {
    mkdirSync(join(root, "visual-browser"));
    writeFileSync(join(root, "VERSION"), "0.5.0\n");
    writeFileSync(join(root, "package.json"), JSON.stringify({ version: "0.4.0" }));
    writeFileSync(join(root, "README.md"), "![Version](https://img.shields.io/badge/version-0.4.0-blue)");
    writeFileSync(join(root, "visual-browser", "index.html"), '<link href="browser.css?v=0.4.0">');
    const result = checkVersionConsistency(root);
    assert.equal(result.issues.length, 3);
    assert.ok(result.issues.some(issue => issue.includes("package.json")));
    assert.ok(result.issues.some(issue => issue.includes("README.md")));
    assert.ok(result.issues.some(issue => issue.includes("visual-browser/index.html")));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
