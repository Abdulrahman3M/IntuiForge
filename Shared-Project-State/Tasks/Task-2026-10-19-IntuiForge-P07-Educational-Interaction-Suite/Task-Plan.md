# Task Plan — IntuiForge P07 Educational Interaction Suite

## Objective

Implement P07 EDU-01..EDU-07 centrally in IntuiForge as safe declarative, accessible educational interactions. The owner authorized transition after P06 closeout.

## In scope

- EDU-01 linked stepper that changes stable step content and exposes progress.
- EDU-02 deterministic quizzes with multiple declared question types and explanations.
- EDU-03 keyboard-operable flashcards with optional host persistence adapter.
- EDU-04 navigable timelines with synchronized stable selection/content/media/visual references.
- EDU-05 matching/order activities with pointer interaction and keyboard equivalent, validated answers.
- EDU-06 per-session activity/progress model and optional host save adapter.
- EDU-07 guided scenario comparisons with selectable scenarios and rationale.
- Minimum schema/validation, central renderer, types, tests, browser fixture, documentation and traceability updates.

## Out of scope / prohibited

- P08+ implementation; InfoBank or any site-specific patch; CMS, accounts, authentication or remote progress service; arbitrary JavaScript/HTML; unapproved dependencies/downloads; destructive migrations; changes to RichViz vendor/ZIP; unrelated refactors; personal Edge.

## Must preserve

P00-P06 APIs and all 50 existing tests, article v1 behavior and stable IDs, RichViz behind its adapter, declarative action allowlist, safe text rendering, design tokens, 16px minimum content, RTL/LTR, offline fallbacks and host CSS isolation.

## Baseline findings

- `packages/article/src/schema.js` already admits `quiz`, `flashcards`, `stepper`, `timeline`, and `progress`, and actions already include `submitQuiz`, `resetActivity`, and `saveProgress`.
- `packages/article/src/index.js` currently validates P06 widget props only (including scalar comparison), with no P07-specific validation for those educational blocks.
- `packages/article-renderer/src/index.js` has no runtime cases for `quiz`, `flashcards`, `stepper`, `timeline`, or `progress`; unsupported types fall through its generic static/text fallback. P06 comparison supports only a two-value pair, not guided scenarios/rationale.
- There is no `matching`/`ordering` block type or P07 test suite. P04 actions delegate submit/activity/progress to optional host callbacks. Store accepts a `persistence` declaration but does not itself persist values; P07 must not silently invent durable storage.
- Baseline hashes and exact source anchors: `Checkpoints/CP-001.md`.

## Deterministic sequence

1. Confirm P06 report, ledger, phase state and EDU traceability baseline; scan applicable agent instructions; record source hashes and actual no-Git state.
2. Map EDU-01..07 to validated data shape, shared renderer/state ownership, tests and one observable browser proof each.
3. Define minimum compatible declarative contracts from existing conventions; add failing validation/helper/renderer tests before implementation.
4. Implement central widget helpers/renderers and bounded safe interactions; wire only existing host-approved activity/progress callbacks where persistence is requested.
5. Add/update types and generated JSON Schema consistently, with backward-compatible article v1 additions only.
6. Run focused automated tests, affected P00-P06 regressions and static/syntax checks.
7. Freshly verify the approved dedicated Edge process/CDP/active profile before browser interaction; test behavior, keyboard, direction, themes and widths 320/360/768/1024/1440; capture actual screenshots.
8. Update directly affected docs, traceability, EDU ledger, phase state, report and Shared Project State; review exact changed files and stop after P07.

## Acceptance criteria

- [ ] EDU-01 step changes update visible step, stable content and session progress.
- [ ] EDU-02 supports multiple declared question types, deterministic score, correct/incorrect feedback and per-question explanations; invalid input rejected.
- [ ] EDU-03 flips/reviews flashcards by click and keyboard; host persistence is optional, with no implicit network/storage.
- [ ] EDU-04 timeline navigation selects actual events and synchronizes child content and optional declared media/visual adapters.
- [ ] EDU-05 matching/order is validated, works with pointer and has an equivalent keyboard path; correct results are deterministic.
- [ ] EDU-06 maintains stable in-session progress and calls optional host save adapter only through declared/authorized capability; no unapproved persistence.
- [ ] EDU-07 scenario selection updates comparison content and rationale from validated data.
- [ ] Every EDU ID has focused tests and one observable actual browser proof; P00-P06 regressions remain green.
- [ ] Article data remains inert; no executable HTML/JS, arbitrary endpoint or unsafe asset path is introduced.
- [ ] Accessibility, 16px content, responsive layout, RTL/LTR, light/dark and reduced motion pass relevant checks.
- [ ] Docs, JSON Schema/runtime schema, feature traceability, EDU ledger and report agree; no P08+ code changed.

## Definition of done

P07 is COMPLETE only after EDU-01..EDU-07 are PASS, focused/affected regression and live-browser gates pass, documentation and ledgers agree, all modified files are isolated, and `Reports/P07-Completion.md` exists. Then stop; P08 requires a separate owner instruction.
