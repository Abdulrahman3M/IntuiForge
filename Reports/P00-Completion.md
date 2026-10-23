# P00 — Source Audit & Non-Destructive Migration

- **Date:** 2026-10-18 (Asia/Dubai)
- **Final Status:** `COMPLETE`
- **Source ZIP:** `Input/RichViz v0.5.0.zip`
- **SHA-256:** `6639552377c83b0fa48739c2140b808ff71cecf5ed9bc68c427d4e3b3482eef3`
- **Scope:** P00 audit completed. The supplied ZIP remains byte-for-byte unchanged; owner-requested test/validator corrections are in a separate derived verification ZIP.

## Governance and baseline

Precedence reviewed: owner request (including the 2026-10-18 clarification that IntuiForge is independent of any particular host); `IntuiForge-Implementation-Kit/Agent-Execution-Protocol.md`; the P00 handoff; kit charter/contracts; and `RichViz-main/AGENTS.md` inside the ZIP (SHA-256 `cecffca3538831da1a959506ca6843203c1772acd18bb8a58bb2974536a0061f`). The workspace root is not a Git repository and contains the kit, input ZIP and phase artifacts; no branch/dirty-state baseline exists. No specific host checkout is required for P00 or project acceptance.

`Validate-Kit.py` passed: 16 phases, 114 tracked features, 0 structural errors. The refreshed `Audit-Zip.py` scan of the owner-supplied archive passed: 588 ZIP entries, 18,934,354 uncompressed bytes, 0 errors and 0 warnings. Its SHA-256 is recorded above. The scan does not certify source-code safety.

## Feature evidence

| ID | Status | Evidence and observed result |
|---|---|---|
| BASE-01 | PASS | `IntuiForge-Implementation-Kit/Execution-State/zip-audit.json` records SHA-256, complete entry metadata, and no unsafe entries. Top-level source inventory: Assets 262, External-Libraries 121, src 44, Examples 24, docs 20, tests 5, visual-browser 18. |
| BASE-02 | PASS | The supplied source identifies `richviz` v0.5.0, 14 registered types, six vendor adapters and 24 curated examples. The pristine ZIP's Node suite exposed two test/guard mismatches; the Python suite passed 5/5 when local loopback was permitted. A separate derived verification ZIP corrects the brittle fullscreen assertion, adds a behavior test for fullscreen enter/exit and accessible state, and teaches the version guard to compare SemVer cache versions while allowing opaque cache keys such as `reader5`. The derived ZIP passes all 52 Node tests, registry and version validation; the original ZIP remains unchanged. |
| BASE-03 | PASS | The source exposes a host-neutral browser API: `RichViz.render(container, spec, options)` accepts a selector or DOM element (`src/RichVisualization.js`, lines 16–24; `docs/API.md`); the documented lifecycle mounts into a host element without a CMS/framework contract. The product requirement is host-agnostic. P12 will prove mounting in plain HTML and framework-managed fixtures. |
| BASE-04 | PASS | The supplied ZIP remained unchanged and was not imported over project files. Corrections are isolated in `Reports/RichViz-v0.5.0-P00-test-reconciled.zip`; the temporary validation extraction is removed after verification. |
| BASE-05 | PASS | Original material is Apache-2.0 (`LICENSE`, `NOTICE`); `THIRD_PARTY_NOTICES.md` inventories Chart.js/Mermaid/React Flow/Recharts/Plotly as MIT-family notices, ECharts Apache-2.0 plus D3 BSD-3-Clause, and Captiva icons GPL-3.0+. Vendor notice paths are preserved inside `External-Libraries/*/active/`; no CDN is required. GPL Captiva assets must remain isolated with their license/provenance and receive redistribution review before an import. |
| BASE-06 | PASS | Root workspace: no applicable `AGENTS.md`, `CLAUDE.md`, or Codex policy file found. ZIP contains `RichViz-main/AGENTS.md`; its preservation, registry, vendor-license, accessibility, local/offline, and Visual Browser synchronization rules were recorded. Workspace has no Git metadata. |

## Observed architecture and compatibility map

| Concern | Actual authoritative location | Preservation / migration action |
|---|---|---|
| Public lifecycle | `src/RichVisualization.js` | Preserve `RichViz.render`, `validateVisualizationSource`, `mountVisualization`, `hydrateArticleFigure`, `mountMermaid`, and handle `ready`/`refresh`/`dispose`. Note: `RichViz.render` validates string specs only; object specs bypass `validateVisualizationSource` at line 19. Treat this as a P02 security/compatibility decision, not a P00 edit. |
| Schema | `src/RichVisualizationSchema.js`, `src/schema/*` | Preserve closed v1 visualization schema and `edu-viz` parsing; normalize string and object paths through one authority in a future approved phase. |
| Type/renderer routing | `src/RichVisualizationRegistry.js`, `src/registry.json`, `src/renderers/*` | Retain 14 types: `mermaid`, `react-flow`, `process-cards`, `process-flow`, `step-guide`, `pipeline`, `kpi-dashboard`, `bar-chart`, `data-chart`, `node-map`, `annotated`, `infographic`, `svg`, `custom`. |
| External engines | `src/adapters/*`, `External-Libraries/*/active/` | Preserve local adapters and notices for Mermaid, React Flow/XYFlow, Chart.js, Recharts, ECharts, Plotly; keep native SVG fallback. |
| Content/examples and visual catalogue | `Examples/*`, `src/RichVisualizationExamples.js`, `visual-browser/*`, `Assets/catalog.json` | Keep stable IDs, examples, asset provenance and the registry-driven Visual Browser; do not treat its static HTML styling as IntuiForge design direction. |

Critical-file SHA-256 evidence is in the terminal audit record: `src/RichVisualization.js` `eecc697cc29d88570b35a169d3eb9a6e243f503a99bc1b061a96608a84296873`; `src/RichVisualizationSchema.js` `341548632559dda166c1715f23c439629d26a12b4984547a63298d69136b6218`; `src/RichVisualizationRegistry.js` `be2c25a35308dd4a164ef0129885d77ed66ae669a2ef4a99222162f08adb4505`; `src/registry.json` `7b6f55678767ed7164cc45d138ead633fa1de866f80da30e7520991e43967388`.

## Validation matrix

| Check | Command / interaction | Status | Evidence |
|---|---|---|---|
| Kit package integrity | `python .\\IntuiForge-Implementation-Kit\\Scripts\\Validate-Kit.py` | PASS | 16 phases, 114 features, 0 structural errors. |
| ZIP integrity / traversal scan | `python .\\IntuiForge-Implementation-Kit\\Scripts\\Audit-Zip.py --zip '.\\Input\\RichViz v0.5.0.zip' --json '.\\IntuiForge-Implementation-Kit\\Execution-State\\zip-audit.json'` | PASS | SHA and entry scan above. |
| Registry | `node scripts/validate-registry.mjs` in a temporary extraction | PASS | `Registry valid: 14 types; 24 curated examples.` |
| Node regression suite — supplied ZIP | `npm test` in a temporary extraction | FAIL (baseline) | 48/50 pass. One stale source-text assertion looked for fullscreen methods inside `NodeMap.js` although the renderer correctly delegates to the shared helper; one version guard treated the opaque `reader5` cache key as a release version. |
| Node regression suite — reconciled derivative | `npm test` in a fresh extraction of `Reports/RichViz-v0.5.0-P00-test-reconciled.zip` | PASS | 52/52 pass, 0 failures. Regression coverage now checks the shared fullscreen behavior and that opaque cache keys do not cause false version errors. |
| Registry | `node scripts/validate-registry.mjs` in the reconciled derivative | PASS | 14 types and 24 curated examples validate. |
| Version guard | `node scripts/validate-version.mjs` in the reconciled derivative | PASS | Rich Viz 0.5.0; 33 semver asset references checked across 59 source files. |
| Python visual-browser server suite | `python -m unittest discover -s tests -p 'test_*.py'` in a fresh extracted package with local loopback permission | PASS | 5/5 pass. Sandbox-only loopback denial was resolved by running the local test server under the approved test permission; the test reached only 127.0.0.1. |
| Generic host API audit | Inspected `src/RichVisualization.js`, `docs/API.md` and README in the supplied ZIP | PASS | The public API accepts a DOM element or selector and does not require a specific CMS or framework. Runtime host fixtures are scheduled for P12. |
| Browser visual, RTL/LTR, mobile, keyboard | Not applicable to P00 source audit; dedicated browser identity and neutral navigation were verified as required by the supplied browser prompt | UNVERIFIED for product UI visuals | P00 produced no UI; no product visual/RTL/mobile/keyboard claim is made. |

## AI browser verification

| Field | Status |
|---|---|
| CONFIGURED | PASS — `AI-Agent-Browser` identity matched the supplied configuration |
| BROWSER_RUNNING | PASS — Edge PID 6788 owned the listener |
| CDP_VERIFIED | PASS — `127.0.0.1:9222/json/version`, `Edg/155.0.4283.45`, protocol 1.3, WebSocket on loopback |
| ACTIVE_PROFILE_VERIFIED | PASS — `edge://version` reported `C:\\Users\\<redacted>\\AppData\\Local\\IB-Edge-Debug\\Profile` |
| NAVIGATION_VERIFIED | PASS — new tab reached `https://example.com/`, title `Example Domain` |
| SCREENSHOT_VERIFIED | PASS — `edge-ai` screenshot captured and returned inline with the verification output |

**Overall:** `VERIFIED`. **MCP_TOOL:** `mcp__edge_ai`.

**PROCESS_IDENTITY:** PID `6788`; executable matched `C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe`; browser-root process included the dedicated `--user-data-dir`, loopback address and port 9222 flags. **USER_DATA_DIRECTORY:** `C:\\Users\\<redacted>\\AppData\\Local\\IB-Edge-Debug`. The CDP listener was bound to `127.0.0.1` and owned by this process. The screenshot is available inline in the verification tool output; saving a copy through the connector was denied because its file policy did not include the project path.

## Modified files and history

Created or updated only phase artifacts and project-governance documentation; the owner-supplied ZIP is unchanged:

- `IntuiForge-Implementation-Kit/Execution-State/zip-audit.json`
- `IntuiForge-Implementation-Kit/Execution-State/phase-state.json`
- `Execution-State/P00-feature-ledger.json`
- `Reports/P00-Completion.md`
- `Reports/RichViz-v0.5.0-P00-test-reconciled.zip` (separate derivative; SHA-256 `8df2d076cf8a5c66d328b64f63218c7194159507668cd24d3afa30b6514fa88b`)
- `IntuiForge-Implementation-Kit/00-Start-Here-AR.md`
- `IntuiForge-Implementation-Kit/Project-Charter.md`
- `IntuiForge-Implementation-Kit/Architecture-Blueprint.md`
- `IntuiForge-Implementation-Kit/Feature-Coverage-Matrix.md`
- `IntuiForge-Implementation-Kit/Feature-Traceability.csv`
- `IntuiForge-Implementation-Kit/Feature-Traceability.json`
- `IntuiForge-Implementation-Kit/Integration-And-Migration.md`
- `IntuiForge-Implementation-Kit/Acceptance-Scenarios.md`
- `IntuiForge-Implementation-Kit/Phase-Dependency-And-Gates.md`
- `IntuiForge-Implementation-Kit/Report-Template.md`
- `IntuiForge-Implementation-Kit/Reference-Evidence-And-Gaps.md`
- `IntuiForge-Implementation-Kit/Requirements-Provenance.md`
- P00, P01–P05, and P06–P15 handoffs updated to use host-neutral language and acceptance criteria.

The owner-supplied ZIP and its entries were not modified. Inside the separate verification ZIP, only `tests/core.test.mjs`, `tests/controls-connectors.test.mjs`, `tests/version-consistency.test.mjs`, and `scripts/validate-version.mjs` were changed. No runtime renderer, adapter, vendor library, example, asset, or IntuiForge application code was modified. No project history system, CID/NID/RID allocator, release version, or build record exists in this workspace; no value was invented.

## Corrections and remaining issues

- Reconciled the fullscreen regression test with the actual shared-control architecture and added a behavioral test that exercises entry, exit, `aria-pressed`, accessible labels and layout refresh.
- Fixed the version-guard false positive: semantic cache versions must match `VERSION`; opaque cache-busting keys such as `reader5` remain valid. Added a regression test; outdated SemVer references are still rejected.
- The Python endpoint test now passes against v0.5.0. Its earlier `0.4.0` mismatch was from the prior archive; the current owner-supplied ZIP passes 5/5 when local loopback is allowed.
- All corrections are confined to the separate reconciled ZIP. No unresolved P00 blocker remains. The original input ZIP has not been edited.

## Next phase gate

`COMPLETE`: P00 is closed. Do not open or begin P01 until the owner explicitly approves the transition.
