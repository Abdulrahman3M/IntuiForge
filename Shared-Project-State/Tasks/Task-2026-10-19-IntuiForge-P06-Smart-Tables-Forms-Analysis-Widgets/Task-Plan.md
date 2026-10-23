# Task Plan — IntuiForge P06 Smart Tables, Forms & Analysis Widgets

## Objective

Implement all P06 feature IDs WGT-01..WGT-07 through IntuiForge's verified central, host-agnostic architecture. Every control must perform its labeled behavior, use validated declarative data/actions, respond to shared state, and be covered by focused tests.

## In scope

- WGT-01 smart table: sortable columns, search, filters, pagination or bounded virtualization, and accessible CSV/export behavior.
- WGT-02 controlled inputs, sliders, selects and form validation; no executable callbacks from article data.
- WGT-03 deterministic calculators using the existing bounded expression vocabulary, explicit units, bounds and result outputs.
- WGT-04 responsive side-by-side or overlay comparisons, conditionally rendered and state-bound.
- WGT-05 accessible buttons, menus, tooltips and dialogs with semantics, keyboard, focus and labels.
- WGT-06 declarative filters that update KPI/metric values and visualization bindings together.
- WGT-07 reuse and extend stateful tabs/accordion; add accessible stateful cards if repository evidence confirms no existing central component.
- Minimal necessary schema/validation, renderer, style, type, test and directly affected documentation updates.

## Out of scope / prohibited

- P07+ features, site/CMS-specific patches, InfoBank integration, auth/accounts, arbitrary JavaScript/HTML evaluation, vendor replacement, external downloads/dependencies, unrelated cleanup, destructive migrations, and RichViz vendor/ZIP edits.
- No subagents or parallel agent execution.
- Do not modify unrelated code merely because another issue is noticed while working on this task.

## Must preserve

- P00-P05 APIs, validation and regression tests; article v1 compatibility; public IDs; P03 tokens; P04 state/actions; the working P05 article renderer; RichViz/edu-viz adapter behavior; host styles; offline assets/notices; no framework/CMS dependency; safe rendering; no personal browser access.

## Initial baseline and gaps

- P05 renderer is the present central composition/UI surface. Existing article schema already lists `smartTable`, `calculator`, `comparison`, `filter`, `input`, `select`, `slider`, `button`, `dialog`, `tabs`, `accordion`, and `metric`.
- Renderer presently supports simple static tables, basic input/select/slider, metric, button, tabs and accordion. `smartTable`, `calculator`, `comparison`, and `filter` currently fall through to unsupported content; `dialog` is a labeled section rather than an interactive dialog; menu, tooltip and card types are absent.
- Existing state package provides bounded expressions and declarative actions; verify the actual contracts before designing new props. Existing generic filter action delegates to a host callback, so do not assume it supplies in-article filter state.
- There is no P06 focused test or `test:p06` script at baseline.
- Baseline code hashes and phase-test outcomes are recorded in `Checkpoints/CP-001.md`.

## Deterministic sequence

1. Reconfirm P05 COMPLETE, root/nested governance, current file state, P06 handoff and relevant schema/renderer/state/style contracts.
2. Complete an evidence-based WGT ID → contract → renderer → test map; settle low-level data shapes from existing schema conventions, not invented host APIs.
3. Add focused failing tests for every WGT ID, including invalid/edge/security inputs and keyboard/focus where interactive.
4. Implement the smallest central reusable contracts and components, preserving stable article IDs and existing state/actions.
5. Add only the necessary type-specific validation/JSON Schema and document the public declarative shape.
6. Verify light/dark, RTL/LTR, responsive and reduced-motion behavior in the verified dedicated Edge browser.
7. Run P06 focused tests and direct P01-P05 regressions where changes affect their consumers.
8. Update traceability CSV/JSON, P06 ledger, execution phase state, relevant docs and report; inspect project history rules and examples without fabricating IDs.
9. Verify no P06 stub/TODO/placeholder remains and stop at P06; do not start P07.

## Acceptance criteria

- [x] WGT-01 sorts, searches, filters and pages actual rows; accessible deterministic export is covered.
- [x] WGT-02 controls are bound, validated, expose errors accessibly, reject arbitrary executable handlers, and have stable unique form identity.
- [x] WGT-03 calculator uses bounded deterministic operators, handles invalid math, and displays units/results accessibly.
- [x] WGT-04 comparison updates from declared state, supports side-by-side/overlay, and remains responsive.
- [x] WGT-05 buttons, menu, tooltip and dialog support semantics, labels, keyboard, focus and close/Escape behavior.
- [x] WGT-06 filter state updates dependent metrics and visualization bindings without a host dependency.
- [x] WGT-07 tabs/accordion remain accessible/stateful and card selection uses the article state lifecycle.
- [x] Each WGT ID has focused automated and relevant live-browser evidence; full P01-P06 regression passes.
- [x] Schema/types/docs/feature traceability/report agree; no P07 feature implementation or unrelated files changed.
- [x] Unavailable checks, screenshot persistence limitation, and skill-version mismatch are reported honestly.

## Definition of Done

P06 is complete only when all seven WGT IDs meet their observable requirements, focused and directly affected regression tests pass, relevant browser checks are recorded, docs and ledgers agree, no in-scope stub remains, and `Reports/P06-Completion.md` records a truthful final status. Then stop; P07 needs a separate owner instruction.

## Phase Map / Closeout

| Phase | Status | Dependency | Evidence |
|---|---|---|---|
| P06 — General Widgets | COMPLETE | P05 COMPLETE and owner-approved activation | `Reports/P06-Completion.md`, `Phase-Reports/P06-Completion.md`, checkpoint CP-002 |

P06 is closed. The owner explicitly authorized transitioning to the next phase; read the P07 start prompt/handoff after this closeout and maintain P07 as a separate phase/task boundary.
