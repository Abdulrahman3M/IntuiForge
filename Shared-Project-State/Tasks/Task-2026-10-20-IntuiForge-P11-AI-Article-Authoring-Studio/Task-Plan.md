# Task Plan — IntuiForge P11 AI Article Authoring Studio & Export

## Objective

Implement AI-01..AI-08 in the shared engine as a safe, generic authoring workflow. Preserve the article v1 format and have studio preview use the production validator and renderer.

## In Scope

- A public declarative authoring/import/export API and strict format/version diagnostics.
- Visual editing of article metadata, section headings and supported block content/data without author-written JavaScript.
- Live preview through `createIntuiEngine` + `registerArticleRenderer`.
- Component inspector with current block props, bindings, events, validation path and errors.
- Valid article, quiz, knowledge-map, and science templates.
- Error report and disabled publish on invalid drafts.
- Draft session history, undo/redo, and explicit publish transition without mutating the original published article.
- An offline AI prompt contract, focused tests, browser fixture, docs, reports, and traceability.

## Out of Scope / Prohibited

- P12+ capabilities, InfoBank/CMS integration, accounts, auth, remote storage, or host-specific patches.
- Arbitrary article HTML/JavaScript execution, dynamic evaluation, unapproved dependencies, implicit network requests, or implicit durable storage.
- Breaking schema changes, silent version migration, unrelated cleanup, and RichViz vendor/ZIP modifications.
- Personal Edge, browser reset/launch, or global process termination.

## Preservation Requirements

Preserve P00–P10 APIs, all 93 baseline tests, article schema v1, stable block/section IDs, shared renderer behavior, RichViz compatibility, offline safety, RTL/LTR, host CSS isolation, and 16px minimum article content.

## Ordered Work

1. Verify P10 gate and baseline; map AI IDs to existing shared modules and evidence.
2. Write failing tests for safe format/package roundtrip, templates, session history, validation gating, and same-renderer studio interactions.
3. Implement the smallest public authoring module and types; add studio only with functioning controls.
4. Add browser fixture and exercise real create/edit/preview/inspect/undo/import/export/publish flows.
5. Run focused, regression, full, schema, syntax and browser tests; fix failures within P11.
6. Update P11 docs, traceability, coverage, feature/execution ledgers, state, and final report. Verify P12+ unchanged and stop.

## Acceptance Checklist

- [x] AI-01: Offline AI contract produces declarative article v1 data rendered by IntuiForge.
- [x] AI-02: JSON import/export preserves IDs and semantics; unknown versions receive explicit diagnostics.
- [x] AI-03: Visual editor edits content/data and validates changes.
- [x] AI-04: Preview uses production validation/renderer and shows only valid draft state.
- [x] AI-05: Inspector exposes props, bindings, events and field-level errors.
- [x] AI-06: Article, quiz, map and science templates all validate.
- [x] AI-07: Invalid draft shows exact error path/fix hint and cannot publish.
- [x] AI-08: Undo/redo works and published data changes only through explicit valid publish.
- [x] Focused/all relevant tests and browser acceptance pass; P00–P10 stay green.
- [x] No scope leakage; documentation and evidence are synchronized.
