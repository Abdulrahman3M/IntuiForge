# Task Plan — Task-2026-10-18-IntuiForge-P01-Core-Contracts

## Objective

Execute only P01 — Core Workspace & Extension Contracts — after the owner-approved P00 COMPLETE gate. Build the smallest bootable, host-agnostic engine kernel and compatibility boundary while preserving the RichViz 0.5.0 package and original input ZIP.

## Scope

- P01 Feature IDs CORE-01 through CORE-06 only.
- Establish package boundaries, versioned public exports, lifecycle, extension/renderer/adapter contracts, optional React island integration, and localized error fallback.
- Import RichViz from the P00-verified source without modifying the owner-supplied ZIP; preserve its licenses and existing public API behind a compatibility façade.
- Add focused automated tests, a real browser smoke check where the approved dedicated AI Edge is usable, and directly affected API/architecture documentation.
- Update P01 feature evidence, phase state, and completion report.

## Must Preserve

- Host-agnostic behavior: no dependency on InfoBank, any CMS, a particular website, or a host framework.
- The original ZIP byte-for-byte, RichViz 0.5.0 APIs and package contents, 14 types, six engine adapters, local vendor assets, licenses/notices, and `edu-viz` compatibility.
- Host-owned routes, styles, authentication, storage, user data, and content.
- Optional React isolated to its own mount island; no host-wide React migration.
- Unrelated owner data and all existing reports/state.

## Out Of Scope

- P02 article schema/Markdown parser and schema migrations.
- P03 design-system redesign, showcase pages, and broad visual QA.
- P04+ capabilities, CMS/account systems, ecosystem replacement, RichViz redesign, and unrelated cleanup.
- P02 handoff or implementation. Do not inspect P02 while executing this task.

## Acceptance Criteria

- [x] CORE-01: mount, update/refresh, and dispose lifecycle handles cleanups/AbortSignals and has no orphan listeners.
- [x] CORE-02: extensions register by validated stable ID, SemVer, and declared capabilities; duplicates reject and unregister is safe.
- [x] CORE-03: renderers and vendor adapters are separate registries/contracts; core imports no vendor engine directly.
- [x] CORE-04: optional React root is mounted only in an isolated island and unmounts on disposal; React is not a required dependency.
- [x] CORE-05: versioned package exports and API docs exist; RichViz façade forwards legacy validate/types/render and return-handle behavior; actual RichViz module imports and smoke-tests.
- [x] CORE-06: module/validation failures render a localized, accessible fallback without escaping the host page; Arabic RTL and English LTR are tested.
- [x] Focused Node tests pass; legacy import smoke passes; P00 source ZIP remains unchanged.
- [x] Dedicated AI Edge identity is verified before the neutral navigation and final browser screenshots; remaining optional browser fixture limitation is recorded.
- [x] Report, feature ledger, and phase-state agree; P02 remains NOT_STARTED.

## Phase Map

| Phase | Objective | Status | Depends On | Verification |
|---|---|---|---|---|
| P00 | Source audit / non-destructive migration | COMPLETE | — | `Reports/P00-Completion.md`; source hash and six BASE IDs |
| P01 | Core Workspace & Extension Contracts | COMPLETE | P00 | Six CORE IDs, focused tests, legacy import and browser fallback evidence |
| P02 | Article Format, Schemas & Validation | NOT_STARTED | P01 + separate owner approval | Out of scope for this task |

## Phase P01

### Prerequisites

- Verify `P00` is COMPLETE and the original ZIP hash is unchanged.
- Review applicable root/nested rules, the P01 handoff, architecture, article boundary, design/security contracts, traceability, and existing source/test evidence.
- Record the no-Git baseline and use one agent only.

### Steps

1. Create a CORE-01..CORE-06 test matrix and write tests before implementation.
2. Implement the minimum modular core/registry/renderer/adapter/React-island/error-fallback contracts.
3. Vendor only the verified RichViz distribution required for runtime compatibility, preserving its notices and source layout; never edit `Input/RichViz v0.5.0.zip`.
4. Run focused Node tests, RichViz import/registry smoke checks, static checks, and relevant legacy regression checks.
5. Run the fallback in the dedicated AI browser only after identity verification; record every browser status separately.
6. Update only affected public API/architecture documentation, feature ledger, phase state, and P01 report.
7. Stop. Do not begin P02.

### Acceptance Criteria

All mandatory P01 criteria have passing evidence. The optional module-based RichViz rendering fixture remains UNVERIFIED due to isolated loopback access; this is recorded in the completion report and does not affect CORE-01..CORE-06 proof. P02 remains unopened pending owner approval.

### Verification

Record exact commands, environment, result, and evidence in `Test-Status.md` and `Reports/P01-Completion.md`.
