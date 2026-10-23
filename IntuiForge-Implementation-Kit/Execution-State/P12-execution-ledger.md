# P12 execution ledger — Portable Host Integrations & User Progress

## Checkpoint 2026-10-20 — pre-change baseline

- **Gate:** P11 is `COMPLETE` in `Execution-State/phase-state.json`; `Reports/P11-Completion.md` and `Execution-State/P11-feature-ledger.json` record AI-01..AI-08 as PASS. The P11 report, tests, and browser results were reviewed.
- **Source integrity:** `Input/RichViz v0.5.0.zip` SHA-256 is `6639552377C83B0FA48739C2140B808FF71CECF5ED9BC68C427D4E3B3482EEF3`, matching the recorded P00/P11 value.
- **Baseline verification:** `npm test` — PASS, 100/100, 0 failures on 2026-10-20.
- **Workspace:** project root has no `.git`; `git status`/branch/history are unavailable. No Git worktree can be created here. Preserve files by recorded hashes and phase-scoped edits; do not invent commits, tags, versions, or build IDs.
- **Instructions:** no root/scoped `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or equivalent applies to IntuiForge. `packages/visualization-legacy/vendor/RichViz-main/AGENTS.md` applies to the vendored RichViz boundary and was read. `IntuiForge-Implementation-Kit/Agent-Execution-Protocol.md`, Project Charter, Architecture Blueprint, Article Format, Design Quality, Security, Browser Environment, Integration/Migration, Feature Traceability, Report Template, and the P12 handoff were read.
- **P12 start state:** HOST-01..HOST-07 are PLANNED; no P12 ledger/report exists; P12 is NOT_STARTED in phase state. No source files have been changed at this checkpoint.

## Feature ownership map

| Feature | Canonical owner and evidence path | P12 work |
|---|---|---|
| HOST-01 | `packages/core/src/engine.js`, `packages/core/src/index.d.ts` | Additive host-facing browser mount API with explicit capabilities and lifecycle. |
| HOST-02 | New `packages/host-integration/src/`; `tests/browser/` | Vanilla DOM host fixture, JS-off static fallback, framework-independent public entry. |
| HOST-03 | `packages/article/src/index.js`, `packages/visualization-legacy/src/index.js`, article renderer | Auto-register the preserved RichViz adapter through the host entry; prove `edu-viz` compatibility. |
| HOST-04 | `packages/state/src/learning-progress.js`, `packages/article-renderer/src/index.js`, new host package | Opt-in host-provided load/save adapter, scoped by host user and article IDs; no ambient storage or article mutation. |
| HOST-05 | `packages/react-island/src/`, new host fixture | Keep React optional/injected and exercise contained mount/update/unmount lifecycle. |
| HOST-06 | Core `HostEnvironment` and host capability contract | Host retains router, identity, search, storage and CMS; IntuiForge invokes only supplied callbacks. |
| HOST-07 | New host package, P12 integration guide, host fixtures/tests | First-install and differential-upgrade runbook, preserve local/host files and legacy RichViz, keep a reversible version switch/rollback path. |

## Baseline hashes (before P12 source edits)

| File | SHA-256 |
|---|---|
| `packages/core/src/engine.js` | `374638D0B0A4B6B2105B5A18E6A142131EEC60FF748E106C3E1A8CF678126A34` |
| `packages/core/src/index.d.ts` | `CE413627DCE429373E515CCA0222740D7ED49F432A8B4073B1072C392D95B266` |
| `packages/article-renderer/src/index.js` | `B5B732789F92843869685A2F71D53A14E309AA30089EBD1A897CF76F97BFFDC7` |
| `packages/visualization-legacy/src/index.js` | `F2476049E493F4C690C0DCE9D1558244E5A0F283D07D5DB8E876710933630877` |
| `packages/state/src/learning-progress.js` | `FCE6475F48765A156C9B80CAC6623D30EA6F743F9D255F244AA59A1F86FE7437` |
| `packages/react-island/src/index.js` | `0A19AAD87AEED121A8619D8C699BFB7319C373ECD13D28D2E962783E5770C4FE` |
| `package.json` | `9ABF5606E6380CE78A3733D874DEE24B6C83F5A1430A8AE70E05E9BECAE09AC2` |
| `IntuiForge-Implementation-Kit/Feature-Traceability.csv` | `19C1DA5DBA949A2867A38F4EFB5F13F23FC8DC18E0020291857C8FD4F5113A5B` |
| `IntuiForge-Implementation-Kit/Feature-Traceability.json` | `3A8A21EDFEFBA3B3001620C2681E880E54E688CC1AB673E66E39FBF97FD2EA0B` |
| `IntuiForge-Implementation-Kit/Execution-State/phase-state.json` | `FB15D24FA15F368235657A60D0B8E741631C47B7A0D4A333BAF6A768DCFDF15C` |
| `IntuiForge-Implementation-Kit/Execution-State/P11-feature-ledger.json` | `C4279635C1AE88D669E56A6781DEE522DF3177503BFAC4C82F8883DA1B875DF5` |

## Decisions

- **Ruling:** Implement P12 as an additive, host-neutral package and preserve the vendored RichViz 0.5.0 runtime/API. Provide a generic install/update/rollback workflow and prove side-by-side fallback without changing a third-party host, since this workspace is private, has no Git/history tooling, and supplies no real host project. **Cost if wrong:** a package-manager-specific updater for an external host would still need to be authored when such a host and its install manifest are supplied.

## Final execution status — 2026-10-20

- **Features:** HOST-01..HOST-07 PASS; see `P12-feature-ledger.json` and `Reports/P12-Completion.md`.
- **Implementation:** public `@intuiforge/engine/host` API, explicit host capabilities, bounded versioned progress adapter, validated progress hydration, preserved `edu-viz`/RichViz adapter, plain/framework/no-script fixtures, and documented first-install/update/rollback runbook.
- **Focused verification:** `npm run test:p12` PASS 11/11; `npm run test:p05` PASS 5/5; `npm run test:p07` PASS 10/10; `npm test` PASS 111/111.
- **Browser identity:** `mcp__edge_ai`; current dedicated Edge PID 29508 matched `IB-Edge-Debug`, same PID owned loopback CDP port 9222, `/json/version` reported Edg/155.0.4283.62 and protocol 1.3, and `edge://version` confirmed the active profile under the dedicated directory. The browser-environment-manager registry record was absent, so `CONFIGURED` remains UNVERIFIED; no manager configuration was written.
- **Browser acceptance:** plain and framework fixtures passed. Both handled stable route delegation, `edu-viz`/RichViz 0.5.0 rendering, theme change, explicit progress save/restore (framework fixture), and rollback. Static fallback had zero scripts and readable 16px text. Both interactive fixtures passed viewport 320/360/768/1024/1440 without horizontal overflow or article text below 16px. Console was empty; 51 plain, 50 framework, and 2 static requests stayed on loopback. One 1440x900 viewport screenshot was returned inline and visually inspected; no persistent screenshot file is claimed.
- **Limitations:** no external host project/manifest exists, so package-manager-specific update is documented and rollback was exercised by fixtures; no actual React package is installed, so the optional injected root lifecycle is tested without adding a framework dependency. No Git metadata or official build/release record exists.
- **Preservation:** RichViz ZIP remains `6639552377C83B0FA48739C2140B808FF71CECF5ED9BC68C427D4E3B3482EEF3`; vendored RichViz sources remain unchanged. P13 remains NOT_STARTED; stop after P12.
