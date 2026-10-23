# P01 — Core Workspace & Extension Contracts

- **Date:** 2026-10-18 (Asia/Dubai)
- **Final Status:** `COMPLETE`
- **Source ZIP:** `Input/RichViz v0.5.0.zip`
- **SHA-256:** `6639552377c83b0fa48739c2140b808ff71cecf5ed9bc68c427d4e3b3482eef3`
- **Git / Build:** Not Applicable — workspace has no Git repository, and no P01 build/release allocation exists.
- **Scope:** P01 only. P02 schema/Markdown work was not opened or started.

## Governance, baseline, and owner decisions

Reviewed the owner-approved host-agnostic requirement; `00-Start-Here-AR.md`; `Agent-Execution-Protocol.md`; P01 handoff; architecture, article-format, design-quality, security, traceability, dependency/gate, and report contracts; the source ZIP's `RichViz-main/AGENTS.md`; and the dedicated AI Browser connect/verify prompt. No root or nested project agent-policy file or Git metadata exists in the workspace.

IntuiForge remains independent of InfoBank and any specific site, CMS, identity provider, or framework. Its article validator is injected; P01 deliberately does not create or freeze the article schema owned by P02. The original ZIP was verified unchanged at completion. RichViz files were copied into a separate adapter package without editing the supplied archive.

## Implemented features

| ID | Status | Canonical implementation | Evidence / observed result |
|---|---|---|---|
| CORE-01 | PASS | `packages/core/src/engine.js` | `tests/p01-core.test.mjs`: mount, ready, refresh, update, disposal, abortable listener cleanup, per-renderer cleanup and isolated host root pass. |
| CORE-02 | PASS | `packages/core/src/registry.js` | Stable IDs, strict SemVer (including prerelease numeric-leading-zero rejection), capabilities, duplicate rejection, immutable metadata and idempotent unregister pass. Test was first run red for `1.2.3-01`, then passed after the fix; valid prerelease/build metadata is also covered. |
| CORE-03 | PASS | `packages/core/src/engine.js`; `packages/visualization-legacy/src/index.js` | Separate component/renderer/adapter registries and adapter-only RichViz boundary pass; core source has no RichViz/vendor imports. |
| CORE-04 | PASS | `packages/react-island/src/index.js` | Injected React root mounts, updates and unmounts only inside its child island; React is not imported or required. |
| CORE-05 | PASS | `package.json`; declarations under `packages/*/src/*.d.ts`; `packages/visualization-legacy/src/index.js` | Versioned package exports and API docs exist. Node imports the real RichViz 0.5.0 runtime; confirms 14 types, validate/render surface, valid-source validation, legacy-render invalid-source errors, and adapter registration. |
| CORE-06 | PASS | `packages/core/src/fallback.js`; `tests/browser/fallback.html` | Localized accessible fallback keeps host content intact, hides private exception details, supports RTL/LTR and light/dark colors, and maintains 16 CSS px text. Node and dedicated-browser checks pass. |

## Architecture and compatibility

The workspace is split into a dependency-free core kernel, optional injected React island, and a RichViz compatibility package. The public contract is exposed at `@intuiforge/engine/v1`; API declarations accompany core, React-island, and RichViz exports. No host-specific route, identity, storage, CMS, or content behavior was introduced.

The vendor manifest records source provenance, version, archive hash, preserved licenses/notices, file comparison, and exclusions. Runtime `src` plus all six local engine adapters are vendored; all 165 imported runtime/vendor files compared with the inspection source without mismatches. GPL Captiva assets, gallery/examples, and unrelated docs were not imported. RichViz remains behind the legacy adapter, and the original archive remains untouched.

## Validation matrix

| Check | Command / interaction | Status | Evidence |
|---|---|---|---|
| P01 focused + full Node suite | `npm test` | PASS | 7 tests, 7 passed, 0 failed on Node v24.19.0. |
| P01 focused suite | `npm run test:p01` | PASS | 7 tests, 7 passed after SemVer regression fix. |
| Shared project state | `sps.mjs doctor --project-root .` | PASS | Node v24.19.0, Python 3.14.6, workspace writable, no Git, 0 problems. |
| Implementation-kit structure | `python .\IntuiForge-Implementation-Kit\Scripts\Validate-Kit.py` | PASS | 16 phases, 114 tracked features, 0 structural errors. |
| Original source integrity | `Get-FileHash -LiteralPath 'Input\RichViz v0.5.0.zip' -Algorithm SHA256` | PASS | SHA-256 matches P00: `6639552377c83b0fa48739c2140b808ff71cecf5ed9bc68c427d4e3b3482eef3`. |
| RichViz vendor copy | Compare the imported source/runtime with the P00 inspection extraction | PASS | 165 files compared; zero mismatches. |
| Fallback visual — mobile/light | Approved AI Edge, 360 × 900 emulated viewport | PASS | Arabic RTL, English LTR, 16px, `role=alert`, no private error text, no horizontal overflow. Screenshot returned inline. |
| Fallback visual — mobile/dark | Approved AI Edge, 360 × 900 emulated viewport | PASS | Both fallbacks use dark Canvas/CanvasText colors, retain 16px and have no horizontal overflow. Screenshot returned inline. |
| P01 module-based real-RichViz browser fixture | `tests/browser/p01.html` via loopback server | UNVERIFIED (non-blocking) | The browser connector could not reach the local loopback server, and `file://` blocks module imports. Actual RichViz import, validation, type list, and adapter registration passed in Node; P12 owns full host/runtime browser demonstrations. |

## Dedicated AI browser verification

| Field | Status | Evidence |
|---|---|---|
| CONFIGURED | PASS | The owner-provided `AI-Agent-Browser` prompt's executable, dedicated user-data directory, and loopback CDP flags match the live process. Browser Environment Manager `Status` returned `Unknown environment` because its canonical `AI-Browser-Environments/AI-Agent-Browser/environment.json` was absent; no environment was created or changed. |
| BROWSER_RUNNING | PASS | Edge root PID `6788` is running from the configured executable. |
| CDP_VERIFIED | PASS | `127.0.0.1:9222/json/version` reports `Edg/155.0.4283.45`, protocol `1.3`, a loopback WebSocket host; the loopback listener is owned by PID `6788`. |
| ACTIVE_PROFILE_VERIFIED | PASS | Live `edge://version` reports the profile under `C:\Users\<redacted>\AppData\Local\IB-Edge-Debug\Profile`, inside the verified dedicated user-data directory. Chromium `155.0.8059.40`. |
| NAVIGATION_VERIFIED | PASS | After identity verification, a new dedicated-session tab reached `https://example.com/`, title `Example Domain`. |
| SCREENSHOT_VERIFIED | PASS | Screenshots of the localized fallback in light and dark mode and of the neutral page were returned inline by `mcp__edge_ai`. Saving a PNG into `Reports/` was denied by the connector's path policy; no screenshot file is claimed. |

`MCP_TOOL`: `mcp__edge_ai`. `PROCESS_IDENTITY`: executable matches `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`; root process command line matches the configured `--user-data-dir` and loopback `--remote-debugging-port=9222`; listener owner PID matches. No cookies, tokens, or process environment were read. The user's personal Edge profile was not used.

## Modified files

- Workspace package exports and docs: `package.json`, `README.md`, `docs/P01-Core-Workspace-And-Extension-Contracts.md`.
- Core API, lifecycle, registry, localized fallback, and declarations: `packages/core/`.
- Optional React island and declarations: `packages/react-island/`.
- RichViz façade, vendor manifest/notices, and isolated runtime/adapters: `packages/visualization-legacy/`.
- Focused tests and browser fixtures/server: `tests/p01-core.test.mjs`, `tests/browser/`, `tests/browser-server.mjs`.
- P01 evidence/governance: `Execution-State/P01-feature-ledger.json`, `IntuiForge-Implementation-Kit/Execution-State/phase-state.json`, `Reports/P01-Completion.md`, and `Shared-Project-State/` task records.

No P01 source changes were made to `Input/RichViz v0.5.0.zip`; no unrelated site or InfoBank files were added or changed.

## Documentation and history

Public exports, dependency direction, lifecycle, registry, React-island, failure fallback, RichViz compatibility, and browser fixture usage are documented. No canonical NID/CID/RID allocator, version-release tool, build-history system, or Git repository exists; such values are Not Applicable and none were invented.

## Remaining issues / gate

No mandatory P01 feature ID or required verification remains unresolved. The optional module-based RichViz visual fixture is recorded UNVERIFIED due to loopback isolation; its P01 API/import contract is verified in Node and P01 fallback UI is verified in the dedicated real browser. Screenshot files could not be persisted by the browser connector, though screenshots were captured inline.

P01 is `COMPLETE`. P02 remains `NOT_STARTED` and was not opened. Stop here and wait for the owner's explicit approval before opening the next phase.
