import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ARTICLE_BLOCK_TYPES, validateArticle } from "../packages/article/src/index.js";
import { interpolateTimeline, registerScientificPlugins, SCIENTIFIC_COMPONENT_IDS, simulateProjectile } from "@intuiforge/engine/scientific";
import { renderArticleStatic } from "@intuiforge/engine/article-renderer";

const article = (blocks) => ({
  kind: "intui.article",
  schemaVersion: "1.0.0",
  id: "science-demo",
  locale: "en",
  dir: "ltr",
  title: "Scientific extension demo",
  summary: "A portable example of safe interactive science components.",
  metadata: { status: "draft", contentType: "article", sources: [], canonicalReferences: [], supportedLocales: ["en"], provenance: [] },
  assets: [],
  initialState: {},
  derived: {},
  sections: [{ id: "science", heading: "Science", blocks }],
});

const validBlocks = () => [
  { id: "simulation", type: "simulator2d", props: { label: "Projectile motion", description: "A bounded two-dimensional projectile simulation.", kind: "projectile", speed: 24, angleDeg: 42, gravity: 9.81, durationSeconds: 8 } },
  { id: "model", type: "model3d", props: { label: "Mesh model", description: "A safe inline triangle mesh.", model: { format: "intuiforge.mesh.v1", vertices: [[-1, -1, 0], [1, -1, 0], [0, 1, 0], [0, 0, 1]], faces: [[0, 1, 2], [0, 3, 1], [1, 3, 2], [2, 3, 0]] } } },
  { id: "map", type: "map", props: { label: "Local map", description: "A local geographic layer with two markers.", bounds: { west: 34, south: 20, east: 58, north: 34 }, layers: [{ id: "coast", label: "Coastline", visible: true, features: [{ type: "LineString", coordinates: [[35, 22], [44, 28], [56, 24]] }] }], markers: [{ id: "dubai", label: "Dubai", coordinates: [55.27, 25.2], description: "A sample location." }] } },
  { id: "graph", type: "mathGraph", props: { label: "Sine graph", description: "A bounded graph of sine.", formula: "sin(x)", xMin: -3.14, xMax: 3.14, xUnit: "rad", yUnit: "m" } },
  { id: "experiment", type: "physicsExperiment", props: { label: "Projectile experiment", description: "Adjust launch conditions and compare range.", kind: "projectile", speed: 24, angleDeg: 42, gravity: 9.81 } },
  { id: "molecule", type: "chemistry", props: { label: "Water molecule", description: "One oxygen atom bonded to two hydrogen atoms.", formula: "H₂O", atoms: [{ id: "oxygen", element: "O", label: "Oxygen", x: 0, y: 0 }, { id: "hydrogen-a", element: "H", x: -1, y: 1 }, { id: "hydrogen-b", element: "H", x: 1, y: 1 }], bonds: [{ source: "oxygen", target: "hydrogen-a" }, { source: "oxygen", target: "hydrogen-b" }] } },
  { id: "anatomy", type: "anatomy", props: { label: "Body regions", description: "Select a region to read its description.", viewBox: { width: 100, height: 140 }, parts: [{ id: "body", label: "Body", description: "A schematic body outline.", shape: { type: "ellipse", cx: 50, cy: 75, rx: 24, ry: 48 } }, { id: "head", label: "Head", description: "The head region.", parentId: "body", shape: { type: "circle", cx: 50, cy: 24, r: 13 } }] } },
  { id: "animation", type: "animationTimeline", props: { label: "Motion timeline", description: "A bounded animation timeline.", durationMs: 2000, frames: [{ id: "start", label: "Start", timeMs: 0, value: 0 }, { id: "finish", label: "Finish", timeMs: 2000, value: 100 }] } },
];

test("SCI-01..08 accept bounded declarative science blocks in article v1", () => {
  const result = validateArticle(article(validBlocks()));
  assert.equal(result.ok, true, JSON.stringify(result.ok ? [] : result.errors));
});

test("SCI-02 rejects a mesh face that references an undeclared vertex", () => {
  const block = validBlocks()[1];
  block.props.model.faces[0] = [0, 1, 99];
  const result = validateArticle(article([block]));
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((issue) => issue.code === "INVALID_MESH_FACE"));
});

test("SCI-03 rejects article-provided map endpoints instead of making implicit network requests", () => {
  const block = validBlocks()[2];
  block.props.tileUrl = "https://tiles.example.test/{z}/{x}/{y}.png";
  const result = validateArticle(article([block]));
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((issue) => issue.code === "UNSAFE_MAP_SOURCE"));
});

test("SCI-04 rejects executable or property-access formula syntax", () => {
  const block = validBlocks()[3];
  block.props.formula = "x.constructor.constructor('return 1')()";
  const result = validateArticle(article([block]));
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((issue) => issue.code === "UNSAFE_SCIENTIFIC_FORMULA"));
});

test("SCI-07 rejects cyclic anatomy parent relationships", () => {
  const block = validBlocks()[6];
  block.props.parts[0].parentId = "head";
  const result = validateArticle(article([block]));
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((issue) => issue.code === "ANATOMY_CYCLE"));
});

test("SCI-08 rejects unordered or unbounded animation frames", () => {
  const block = validBlocks()[7];
  block.props.frames[1].timeMs = -1;
  const result = validateArticle(article([block]));
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((issue) => issue.code === "INVALID_ANIMATION_FRAME"));
});

test("SCI-04 parses and evaluates only the documented math grammar", async () => {
  const science = await import("../packages/scientific-plugins/src/math.js").catch(() => ({}));
  assert.equal(typeof science.parseScientificFormula, "function", "safe scientific formula parser is missing");
  assert.equal(typeof science.evaluateScientificFormula, "function", "safe scientific evaluator is missing");
  const ast = science.parseScientificFormula("sin(x) + 2");
  assert.ok(Math.abs(science.evaluateScientificFormula(ast, Math.PI / 2) - 3) < 1e-12);
  assert.throws(() => science.parseScientificFormula("x.constructor"), /formula/i);
  assert.throws(() => science.parseScientificFormula("alert(1)"), /formula/i);
  assert.throws(() => science.evaluateScientificFormula(science.parseScientificFormula("1 / (x - 1)"), 1), /finite/i);
});

test("SCI-04 samples a function deterministically within fixed limits", async () => {
  const science = await import("../packages/scientific-plugins/src/math.js").catch(() => ({}));
  assert.equal(typeof science.sampleScientificFunction, "function", "bounded graph sampler is missing");
  assert.deepEqual(science.sampleScientificFunction("x^2", -2, 2, 5), [
    { x: -2, y: 4 }, { x: -1, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 4 },
  ]);
  assert.throws(() => science.sampleScientificFunction("x", -2, 2, 100_000), /sample/i);
});

test("SCI-01 and SCI-05 produce bounded deterministic projectile trajectories", async () => {
  const science = await import("../packages/scientific-plugins/src/simulation.js").catch(() => ({}));
  assert.equal(typeof science.simulateProjectile, "function", "projectile simulation is missing");
  const first = science.simulateProjectile({ speed: 20, angleDeg: 45, gravity: 10, durationSeconds: 5, samples: 11 });
  assert.deepEqual(first, science.simulateProjectile({ speed: 20, angleDeg: 45, gravity: 10, durationSeconds: 5, samples: 11 }));
  assert.equal(first.length, 11);
  assert.deepEqual(first[0], { time: 0, x: 0, y: 0 });
  assert.ok(first.every((point) => Number.isFinite(point.x) && Number.isFinite(point.y) && point.y >= 0));
  assert.throws(() => science.simulateProjectile({ speed: 20, angleDeg: 45, gravity: 10, durationSeconds: 5, samples: 100_000 }), /sample/i);
});

test("SCI-08 interpolates timeline frames deterministically and clamps outside the range", () => {
  const frames = [{ timeMs: 0, value: 10 }, { timeMs: 1000, value: 30 }, { timeMs: 2000, value: 50 }];
  assert.equal(interpolateTimeline(frames, -1), 10);
  assert.equal(interpolateTimeline(frames, 500), 20);
  assert.equal(interpolateTimeline(frames, 2500), 50);
  assert.equal(interpolateTimeline([{ timeMs: 0, value: "ready" }, { timeMs: 1, value: "done" }], 0.5), "ready");
});

test("SCI-02 and SCI-03 provide finite mesh projection and local geographic projection", async () => {
  const geometry = await import("../packages/scientific-plugins/src/geometry.js").catch(() => ({}));
  assert.equal(typeof geometry.projectMesh, "function", "safe mesh projector is missing");
  assert.equal(typeof geometry.projectGeoPoint, "function", "offline map projector is missing");
  const projected = geometry.projectMesh({ format: "intuiforge.mesh.v1", vertices: [[-1, -1, 0], [1, -1, 0], [0, 1, 0]], faces: [[0, 1, 2]] }, { yaw: Math.PI / 2, pitch: 0, scale: 1 });
  assert.equal(projected.length, 1);
  assert.equal(projected[0].length, 3);
  assert.ok(projected.flat().every((point) => Number.isFinite(point.x) && Number.isFinite(point.y)));
  assert.deepEqual(geometry.projectGeoPoint([46, 27], { west: 34, south: 20, east: 58, north: 34 }), { x: 50, y: 50 });
  assert.throws(() => geometry.projectGeoPoint([181, 0], { west: 34, south: 20, east: 58, north: 34 }), /coordinate/i);
});

test("SCI-07 flattens an anatomy tree into a readable deterministic alternative", async () => {
  const geometry = await import("../packages/scientific-plugins/src/geometry.js").catch(() => ({}));
  assert.equal(typeof geometry.flattenAnatomy, "function", "anatomy text alternative is missing");
  assert.deepEqual(geometry.flattenAnatomy([
    { id: "body", label: "Body", description: "Whole body" },
    { id: "head", label: "Head", description: "Upper region", parentId: "body" },
  ]), [
    { id: "body", label: "Body", description: "Whole body", depth: 0 },
    { id: "head", label: "Head", description: "Upper region", depth: 1 },
  ]);
});

test("P09 component registrations are explicit, complete, and reversibly disposable", async () => {
  const plugin = await import("../packages/scientific-plugins/src/index.js").catch(() => ({}));
  assert.equal(typeof plugin.registerScientificPlugins, "function", "scientific plugin registration is missing");
  const registrations = new Map();
  const engine = { registerComponent(component) { assert.ok(component.render); if (registrations.has(component.id)) throw new Error("duplicate"); registrations.set(component.id, component); return () => registrations.delete(component.id); } };
  const dispose = plugin.registerScientificPlugins(engine);
  assert.equal(registrations.size, 8);
  assert.deepEqual([...registrations.keys()].sort(), [...plugin.SCIENTIFIC_COMPONENT_IDS].sort());
  assert.equal(dispose(), true);
  assert.equal(registrations.size, 0);
  assert.equal(dispose(), false);
});

test("P09 public package, article types, and published offline example stay in sync", () => {
  assert.deepEqual([...ARTICLE_BLOCK_TYPES].filter((type) => validBlocks().some((block) => block.type === type)).sort(), ["anatomy", "animationTimeline", "chemistry", "map", "mathGraph", "model3d", "physicsExperiment", "simulator2d"].sort());
  assert.equal(SCIENTIFIC_COMPONENT_IDS.length, 8);
  assert.equal(typeof simulateProjectile, "function");
  const example = JSON.parse(readFileSync(resolve("IntuiForge-Implementation-Kit/Examples/Scientific-Extension-Demo.json"), "utf8"));
  const schema = JSON.parse(readFileSync(resolve("packages/article/schema/article-v1.schema.json"), "utf8"));
  for (const type of ["simulator2d", "model3d", "map", "mathGraph", "physicsExperiment", "chemistry", "anatomy", "animationTimeline"]) assert.ok(schema["$defs"].block.properties.type.enum.includes(type));
  const validation = validateArticle(example);
  assert.equal(validation.ok, true, JSON.stringify(validation.ok ? [] : validation.errors));
  const html = renderArticleStatic(example);
  for (const phrase of ["حركة المقذوف", "نموذج رباعي الوجوه", "دبي", "جزيء الماء", "الرأس"]) assert.ok(html.includes(phrase), `static fallback should preserve ${phrase}`);
});

test("P09 validation errors retain precise article paths", () => {
  const block = validBlocks()[1]; block.props.model.faces[0] = [0, 1, 99];
  const result = validateArticle(article([block]));
  const issue = result.errors.find((entry) => entry.code === "INVALID_MESH_FACE");
  assert.equal(issue?.path, "/sections/0/blocks/0/props/model/faces/0");
});

test("P09 registration failure rolls back components already added", () => {
  const registered = new Set();
  let attempts = 0;
  const engine = { registerComponent(component) {
    attempts += 1;
    if (attempts === 4) throw new Error("synthetic registry fault");
    registered.add(component.id);
    return () => registered.delete(component.id);
  } };
  assert.throws(() => registerScientificPlugins(engine), /synthetic registry fault/);
  assert.equal(registered.size, 0);
});

test("SCI-03/06 reject unsupported map data and unresolved molecular bonds", () => {
  const map = validBlocks()[2]; map.props.bounds.east = 181;
  const badMap = validateArticle(article([map]));
  assert.ok(badMap.errors.some((issue) => issue.code === "INVALID_MAP_BOUNDS"));
  const molecule = validBlocks()[5]; molecule.props.bonds[0].target = "missing-atom";
  const badMolecule = validateArticle(article([molecule]));
  assert.ok(badMolecule.errors.some((issue) => issue.code === "INVALID_MOLECULE_BOND"));
});
