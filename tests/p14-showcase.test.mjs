import test from "node:test";
import assert from "node:assert/strict";
import { createPremiumShowcaseModel } from "@intuiforge/engine/design-system";

test("SHOW-01 through SHOW-05 expose complete, honest showcase scenes without inheriting legacy HTML", () => {
  const model = createPremiumShowcaseModel();

  assert.equal(model.version, "1.0");
  assert.deepEqual(model.scenes.map((scene) => scene.id), ["science", "language", "knowledge", "data", "extension"]);
  assert.ok(model.scenes.find((scene) => scene.id === "science").controls.includes("quiz"));
  assert.ok(model.scenes.find((scene) => scene.id === "science").controls.includes("stepper"));
  assert.ok(model.scenes.find((scene) => scene.id === "science").controls.includes("citation-dialog"));
  assert.ok(model.scenes.find((scene) => scene.id === "language").controls.includes("flashcards"));
  assert.ok(model.scenes.find((scene) => scene.id === "language").controls.includes("matching"));
  assert.ok(model.scenes.find((scene) => scene.id === "knowledge").controls.includes("zoom"));
  assert.ok(model.scenes.find((scene) => scene.id === "knowledge").controls.includes("node-details"));
  assert.ok(model.scenes.find((scene) => scene.id === "data").controls.includes("filter"));
  assert.equal(model.claims.proprietaryParity, false);
  assert.equal(model.claims.legacyHtmlStyleReference, false);
  assert.equal(model.states.includes("error"), true);
  assert.equal(Object.isFrozen(model), true);
});
