# P09 Scientific Simulation, Maps & 3D Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Keep one agent and one sequential phase; subagents are not authorized.

**Goal:** Implement all P09 features SCI-01–SCI-08 as validated, accessible, deterministic scientific extensions that run locally and degrade honestly when optional capabilities are absent.

**Architecture:** Keep article v1 as the declarative source of truth. Add a focused `packages/scientific-plugins` extension package with bounded validators, deterministic computation, accessible DOM renderers and core component registrations; dispatch through the existing component registry from the article renderer. Hosts explicitly register the science plugins; a missing registration produces an accessible fallback. No article-provided code or URLs execute, and optional online data/model access can occur only through a trusted host callback after an explicit learner action.

**Tech Stack:** Existing JavaScript ESM, DOM/SVG, the existing IntuiForge registry/state/article contracts, Node's built-in test runner; no new runtime dependencies or external downloads.

**Spec:** `IntuiForge-Implementation-Kit/Handoffs/IMPLEMENTATION-HANDOFF_IntuiForge_P09_Scientific-Simulation-Maps-3D.md` (owner-supplied and approved for this P09 execution).

## Global Constraints

- P08 must remain COMPLETE; implement P09 only and stop before P10.
- Keep IntuiForge host-neutral; InfoBank and any specific CMS/site are not dependencies.
- Preserve RichViz APIs, 14 types, six adapters, assets/notices, routes, RTL/LTR, host CSS isolation and offline behavior.
- Do not execute article JavaScript, use `eval`/`Function`, accept arbitrary HTML/SVG, or fetch article-provided endpoints/assets.
- Keep meaningful article labels at least 16 CSS px; ensure keyboard, reduced-motion, RTL/LTR and responsive support.
- Keep runtime local/offline by default. Optional online data/model loading requires a host-supplied capability and explicit user action.
- Expose additive article v1 block types `mathGraph`, `physicsExperiment`, and `animationTimeline`; keep P07's existing educational `timeline` behavior and schema version unchanged.
- Use only declarative local model data in format `intuiforge.mesh.v1` (`vertices` + triangle `faces`). Optional model/map loading receives a stable local ID and `AbortSignal` through trusted host callbacks; article data never contains a URL.
- Browser work must use the verified dedicated AI Edge only; report each browser identity gate separately.
- No Git metadata exists in this workspace; preserve the captured P09-start hashes, do not fabricate commits or history IDs.

## Review Focus

1. Formula input attempting JavaScript, property access, unbounded nesting or non-finite math must be rejected; test parser limits and divide-by-zero handling.
2. A mesh with NaN coordinates, out-of-range face indices or excessive vertices must never reach SVG; test rejection and a readable missing/unsupported-model fallback.
3. Map configuration must not introduce implicit network access or article-supplied URLs; test that the host loader is idle until the learner activates it and that loader failure preserves local layers.
4. Anatomy parent cycles, duplicate IDs and unknown parents must be rejected; test bounded hierarchy and usable text selection.
5. Animation/model/map listeners and frames must stop on dispose; test teardown and reduced-motion behavior without relying on wall-clock timing.

## Files and Responsibilities

- Modify `packages/article/src/schema.js`, `packages/article/src/index.js`, `packages/article/src/index.d.ts`, and `packages/article/schema/article-v1.schema.json` for additive article v1 types and semantic validation.
- Create `packages/scientific-plugins/src/validation.js`, `math.js`, `simulation.js`, `geometry.js`, `renderers.js`, `styles.js`, `index.js`, and `index.d.ts` for safe science contracts, pure algorithms, extension registrations and UI.
- Modify `packages/article-renderer/src/index.js` for plugin dispatch, static fallbacks, capability declaration and centralized style composition.
- Exact plugin IDs: `org.intuiforge.science.simulator2d`, `org.intuiforge.science.model3d`, `org.intuiforge.science.map`, `org.intuiforge.science.mathgraph`, `org.intuiforge.science.physics-experiment`, `org.intuiforge.science.chemistry`, `org.intuiforge.science.anatomy`, and `org.intuiforge.science.animation-timeline`.
- Modify `package.json` only to expose `./scientific` and add `test:p09`.
- Create `tests/p09-scientific.test.mjs`, `tests/browser/p09.html`, `tests/browser/p09.js`, `tests/browser/p09.css`, and `IntuiForge-Implementation-Kit/Examples/Scientific-Extension-Demo.json`.
- Create `docs/P09-Scientific-Simulation-Maps-And-3D.md`; update only P09 rows in `Feature-Traceability.csv`, `.json`, `Feature-Coverage-Matrix.md`, phase state, and a new P09 feature ledger; create `Reports/P09-Completion.md` from the project report template.

## Task 1: Lock the scientific article contracts and validation

**Interfaces:** `validateArticle()` remains the single validation entry point. Add additive `mathGraph` and `animationTimeline` block IDs without changing article schema version 1.0.0. Export pure scientific validators for bounded maps, simulator parameters, formula text, mesh data, molecule records, and anatomy trees.

- [x] Add failing validator tests for all P09 types, valid minimal fixtures, duplicate/dangling IDs, numeric/resource bounds, unsafe formulas, remote URLs, and cyclic anatomy.
- [x] Run `npm run test:p09` and verify those tests fail for the intended missing P09 contract.
- [x] Implement semantic validation with stable diagnostic codes and paths; allow only documented fields and bounded declarative values.
- [x] Add new block types to source and distributable JSON Schema; preserve lossless article v1 behavior.
- [x] Run the focused P09 tests and `npm run test:p02`; both must pass.

## Task 2: Implement safe deterministic scientific algorithms

**Interfaces:** Export `parseScientificFormula(source)`, `sampleScientificFunction(ast, bounds, sampleCount)`, `simulateProjectile(parameters, normalizedTime)`, `projectMesh(mesh, view)`, `projectGeoPoint(longitude, latitude, bounds)`, `validateMolecule(data)`, and `flattenAnatomy(parts)` from focused source modules.

- [x] Add failing tests for finite deterministic projectile samples and hard step/sample caps.
- [x] Add failing tests for the allowlisted formula grammar (numbers, `x`, constants, arithmetic, parentheses and documented math functions) and reject calls/property access outside that grammar.
- [x] Add failing tests for bounded 3D mesh projection, geographic projection, stable molecule bonds and acyclic anatomy flattening.
- [x] Run the relevant tests to observe intended RED failures, implement only those functions, then verify GREEN.

## Task 3: Register extension contracts and implement simulation/physics

**Interfaces:** `registerScientificPlugins(engine): () => boolean` registers the eight exact component IDs above through `engine.registerComponent()` and disposes partial registrations safely if registration fails. Each renderer consumes validated `{article, block}` input plus trusted host capabilities; it returns a disposer or nothing. It never consumes executable article code.

- [x] Test registration IDs, capability descriptors, duplicate-registration behavior and unregister cleanup against the real IntuiForge engine.
- [x] Add failing tests for `simulator2d` run/pause/reset and bounded generic parameters; add failing tests for `physicsExperiment` projectile speed/angle/gravity controls and deterministic range/time outputs.
- [x] Implement only these two renderers and their disposer behavior; run the focused P09 tests to GREEN before continuing.

## Task 4: Implement safe mathematical graphs

**Interface:** `mathGraph.props` contains `formula`, `xMin`, `xMax`, `xUnit`, `yUnit`, optional `samples`, `label`, and `description`. Formula text is parsed by the allowlisted grammar in Task 2; it is never evaluated as JavaScript.

- [x] Test parse errors, bounds, unit labels, recomputation on input and accessible textual values.
- [x] Implement the live graph renderer and keyboard-accessible formula input; verify a malicious formula is rejected before rendering.

## Task 5: Implement 3D mesh viewer and geographic map extension

**Interfaces:** `model3d.props.model` uses `format: "intuiforge.mesh.v1"`, bounded finite `vertices`, and triangle `faces`; absent model data may use host `loadScientificModel({modelId, signal})`. `map.props` contains bounded geographic `layers`, `markers`, and finite `bounds`; optional host `loadMapData({mapId, signal})` is called only from an explicit Load action. Neither article block accepts URL/endpoint fields.

- [x] Test mesh format/face indices, orbit/pan/zoom, fallback and trusted loader success/failure/disposal.
- [x] Test geographic projection, layer toggles, selectable markers, host-loader consent and offline failure preserving local data.
- [x] Implement both SVG renderers and stop asynchronous work on dispose.

## Task 6: Implement chemistry and anatomy viewers

**Interfaces:** `chemistry.props` contains `formula`, `description`, bounded `{id, element, x, y, label?}` atoms, and `{source, target, order?}` bonds. `anatomy.props` contains a bounded acyclic `parts` tree; each part has stable `id`, `label`, `description`, optional `parentId`, and only allowlisted 2D shape geometry.

- [x] Test valid molecule bonds/labels, invalid references, element allowlist and accessible descriptions.
- [x] Test acyclic anatomy hierarchy, duplicate/dangling IDs, shape-coordinate bounds and selected-part text alternative.
- [x] Implement SVG/canonical shape rendering plus keyboard-operable hierarchy selection and highlighting.

## Task 7: Implement animation timeline controller

**Interface:** `animationTimeline.props` contains `durationMs` and bounded ordered `frames: [{id, timeMs, label, value}]`; values are finite scalars or bounded point coordinates. Playback supports play/pause, seek, speed `[0.25, 0.5, 1, 2]`, reset and reduced-motion behavior.

- [x] Test deterministic frame selection, clamped seek, speed, play/pause/reset, reduced motion and cancellation on dispose.
- [x] Implement the controller and static textual summary; use one animation loop per mounted controller and no loop under reduced motion.

## Task 8: Integrate plugins into the existing article renderer

**Interfaces:** Article blocks resolve their stable component ID via the render context's existing `getComponent()`. Missing optional registration produces a localized, accessible text fallback. The host explicitly calls `registerScientificPlugins(engine)` before mounting articles; `registerArticleRenderer()` remains unchanged and does not silently create a second registry.

- [x] Add failing renderer tests proving each P09 block dispatches to its registered component, missing components render a fallback, and dispose invokes extension cleanup.
- [x] Add static/no-JavaScript narrative fallbacks for P09 blocks; do not emit article source as markup.
- [x] Compose science CSS inside the existing article root/shadow boundary; avoid document-global selectors.
- [x] Verify the current educational `timeline` block remains unchanged; animation controls use the additive `animationTimeline` type.
- [x] Run `npm run test:p05`, `npm run test:p07`, and `npm run test:p08` for direct consumer regressions.

## Task 9: Prove real examples and browser behavior

- [x] Add one portable P09 example article containing all eight feature types and static narrative descriptions.
- [x] Mount the example through `createIntuiEngine()`, `validateArticle`, the article renderer and registered scientific extensions in a real browser fixture.
- [x] Add browser assertions for run/pause/reset and parameter response; 3D orbit/pan/zoom and missing-model fallback; map layers/markers and host-loader consent/failure behavior; safe formula update and units; chemistry selection/description; anatomy hierarchy/highlight/text alternative; timeline seek/speed/reduced motion; keyboard focus; resize/RTL/LTR; no overflow and computed text minimum.
- [x] Before browser use, rerun Browser Environment Manager preflight, verify exact Edge process + loopback PID ownership, then verify `edge://version` profile through `mcp__edge_ai`. Never use personal Edge.
- [ ] Capture and visually inspect actual 360/768/1440 screenshots. Report `CONFIGURED`, `BROWSER_RUNNING`, `CDP_VERIFIED`, `ACTIVE_PROFILE_VERIFIED`, `NAVIGATION_VERIFIED`, and `SCREENSHOT_VERIFIED` separately.
- [x] Emulate offline behavior: local map/simulation must remain usable; an explicit optional host load may fail with a clear status while preserving local data. Clear emulation after the test.

## Task 10: Synchronize docs and phase evidence

- [x] Update the package usage/API and P09 documentation with only implemented schemas, limits, capabilities, fallbacks, and no-network-by-default behavior.
- [x] Review project history rules and available examples after tests. The workspace has no Git metadata or registered history allocator; do not invent NID/CID/RID/version/build or commits.
- [x] Run `npm run test:p09`, `npm run test:p02`, `npm run test:p05`, `npm run test:p07`, `npm run test:p08`, then `npm test` as the final cross-phase regression required by the TDD workflow.
- [x] Validate the P09 sample/schema, P09 ledger and traceability JSON; check the original RichViz ZIP SHA-256 is unchanged.
- [x] Write `Reports/P09-Completion.md`, update phase state only from observed evidence, and stop. P10 must remain `NOT_STARTED`.

## Acceptance Checklist

- [x] SCI-01–SCI-08 each have a real implementation, focused test and observable browser evidence or an honestly recorded `UNVERIFIED` state.
- [x] Invalid/untrusted formulas, meshes, map inputs and anatomy trees fail validation before DOM use; article data makes no implicit network request.
- [x] Every visible P09 control performs its named action and has accessible keyboard/touch behavior, labels, status and teardown.
- [x] Static/no-JavaScript fallback remains useful; online capability failures leave local scientific content intact.
- [x] P02/P05/P07/P08 and full project regression tests pass; no scoped TODO/stub/disabled test remains.
- [x] P08 remains COMPLETE, P09 status reflects real evidence, and P10 remains NOT_STARTED.
- [x] RichViz source ZIP and unrelated content remain unchanged.

## Definition of Done

P09 is complete only when all eight SCI IDs are PASS with linked automated and browser evidence, the focused and mandatory regression suites pass, docs/state/traceability/report agree, the original archive hash is unchanged, and no required browser check is unverified. Otherwise report `PARTIALLY COMPLETE` or `BLOCKED` with exact evidence and stop before P10.
