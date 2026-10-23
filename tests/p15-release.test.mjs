import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { validateArticle } from "../packages/article/src/index.js";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const manifest = JSON.parse(read("package.json"));

test("REL-01: release metadata and package allowlist describe a private offline artifact", () => {
  assert.equal(manifest.name, "@intuiforge/engine");
  assert.equal(manifest.version, "1.0.0");
  assert.equal(manifest.private, true);
  assert.equal(manifest.license, "Apache-2.0");
  for (const path of ["packages/", "Examples/", "docs/release/", "LICENSES/", "LICENSE", "NOTICE", "THIRD-PARTY-NOTICES.md", "README.md"]) {
    assert.ok(manifest.files.some((entry) => entry === path || entry.startsWith(path)), `package allowlist misses ${path}`);
  }
  assert.equal(typeof manifest.scripts["release:build"], "string");
  assert.ok(manifest.exports["./article/schema"]);
});

test("REL-02: migration and rollback preserve prior host content and keep package contracts additive", () => {
  const migration = read("docs/release/MIGRATION.md");
  assert.match(migration, /First install/);
  assert.match(migration, /Differential update/);
  assert.match(migration, /Rollback/);
  assert.match(migration, /host routes, article content, and stored progress untouched/i);
  assert.match(migration, /Do not run a command that deletes/i);
  assert.match(read("tests/p12-host-integration.test.mjs"), /HOST-07 can roll back without changing legacy source or host paths/);
});

test("REL-03: third-party licenses and the asset catalog's license boundaries ship with the package", () => {
  const required = [
    "packages/visualization-legacy/vendor/RichViz-main/LICENSE",
    "packages/visualization-legacy/vendor/RichViz-main/NOTICE",
    "packages/visualization-legacy/vendor/RichViz-main/THIRD_PARTY_NOTICES.md",
    "packages/visualization-legacy/vendor/RichViz-main/External-Libraries/chartjs/active/LICENSE.md",
    "packages/visualization-legacy/vendor/RichViz-main/External-Libraries/echarts/active/LICENSE",
    "packages/visualization-legacy/vendor/RichViz-main/External-Libraries/mermaid/active/LICENSE",
    "packages/visualization-legacy/vendor/RichViz-main/External-Libraries/plotly/active/LICENSE",
    "packages/visualization-legacy/vendor/RichViz-main/External-Libraries/plotly/active/THIRD-PARTY-NOTICES.txt",
    "packages/visualization-legacy/vendor/RichViz-main/External-Libraries/react-flow/active/THIRD-PARTY-NOTICES.txt",
    "packages/visualization-legacy/vendor/RichViz-main/External-Libraries/recharts/active/THIRD-PARTY-NOTICES.txt",
    "packages/visualization-legacy/asset-library/Assets/Application-Icons/Captiva/LICENSE",
    "packages/visualization-legacy/asset-library/Assets/catalog.json",
    "LICENSES/README.md",
    "LICENSE",
    "NOTICE",
    "THIRD-PARTY-NOTICES.md",
  ];
  for (const path of required) assert.ok(existsSync(new URL(`../${path}`, import.meta.url)), `missing ${path}`);
  assert.match(read("LICENSE"), /Apache License\s+Version 2\.0/);
  assert.match(read("NOTICE"), /Copyright 2026 Abdulrahman ElBatrah/);
  assert.match(read("LICENSES/README.md"), /Apache-2\.0/);
  assert.match(read("LICENSES/README.md"), /Bundled components keep their own upstream licenses/i);
  assert.match(read("LICENSES/README.md"), /GPL-3\.0-or-later/);
});

test("REL-04: final traceability audit covers every registered feature exactly once", () => {
  const trace = JSON.parse(read("IntuiForge-Implementation-Kit/Feature-Traceability.json"));
  const rows = read("Reports/P15-Feature-Audit.csv").trim().split(/\r?\n/);
  const ids = rows.slice(1).map((row) => row.split(",")[0].replaceAll('"', ""));
  assert.equal(ids.length, trace.length);
  assert.deepEqual([...ids].sort(), trace.map(({ id }) => id).sort());
  assert.ok(trace.every(({ status }) => status === "PASS" || status === "UNVERIFIED" || status === "FAIL"));
  assert.ok(!trace.some(({ status }) => status !== "PASS"), "all prior and P15 feature IDs must have evidence before release acceptance");
  const sourceRows = read("IntuiForge-Implementation-Kit/Feature-Traceability.csv").trim().split(/\r?\n/).slice(1);
  assert.equal(sourceRows.length, trace.length);
  assert.ok(sourceRows.every((row) => row.split(",").at(-1).replaceAll('"', "") === "PASS"));
});

test("REL-05: quick start, architecture, API, gallery, migration, and validated samples are included", () => {
  const samplePaths = [
    "Examples/Data-Explainer.json", "Examples/Education-Language-Lesson.json", "Examples/Knowledge-Map.json",
    "Examples/Scientific-Extension-Demo.json", "Examples/Scientific-Star-Life-Cycle.json", "Examples/Temperature-Reactive-Article.json",
  ];
  for (const path of [
    "docs/release/QUICKSTART.md", "docs/release/ARCHITECTURE.md", "docs/release/API.md",
    "docs/release/GALLERY.md", "docs/release/MIGRATION.md", "Examples/README.md",
    ...samplePaths,
  ]) assert.ok(existsSync(new URL(`../${path}`, import.meta.url)), `release docs or samples miss ${path}`);
  for (const path of samplePaths) {
    const result = validateArticle(JSON.parse(read(path)));
    assert.equal(result.ok, true, `${path} is invalid: ${JSON.stringify(result.errors)}`);
  }
  const packagedFiles = JSON.parse(read("release/release-manifest.json")).packedFiles;
  for (const path of samplePaths) assert.ok(packagedFiles.some((entry) => entry.endsWith(path)), `package archive omits ${path}`);
});

test("REL-06: package semver is explicit while unavailable project history IDs stay unclaimed", () => {
  assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
  assert.equal(existsSync(new URL("../.git", import.meta.url)), false);
  const governanceBaseline = read("Reports/P14-Completion.md");
  assert.match(governanceBaseline, /no Git repository, build allocator or official release record/);
});

test("REL-07: Windows launcher serves the existing visual browser through the loopback-only server", () => {
  const launcher = read("Start Visual Gallery.bat");
  const server = read("tests/browser-server.mjs");
  assert.match(launcher, /node tests\\browser-server\.mjs/i);
  assert.match(launcher, /127\.0\.0\.1:4173/);
  assert.match(server, /server\.listen\(port, "127\.0\.0\.1"/);
  assert.match(server, /resolve\(projectRoot, "tests", "browser"\).*resolve\(projectRoot, "tests", "fixtures"\).*resolve\(projectRoot, "packages"\)/s);
  assert.match(read("packages/visualization-legacy/visual-browser.html"), /data-visual-browser/);
});
