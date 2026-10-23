# Task Plan — IntuiForge P05 Complete Portable Article Renderer

## Objective

Execute only P05 / DOC-01..DOC-07. Add a reusable, host-agnostic renderer for normalized `intui.article` v1 content, mounted through the existing core renderer registry. It must compose prose, nested blocks, controls, legacy visual adapters, navigation and deep links, while using the P04 state/action/binding runtime and the P03 design contract.

## Scope

- One central renderer package and public export; no page-specific implementations.
- Semantic rendering for article metadata, sections, prose, supported structured blocks, and nested groups.
- Table of contents, stable in-article anchors, route-ID actions through host capabilities, conditionals/tabs/accordion connected to P04 state.
- Safe actual DOM rendering; no article-authored HTML, script, dynamic imports or arbitrary code.
- Host/CMS/framework-independent embedding and standalone use; isolated styles, theme bridge, locale/RTL, responsive behavior, keyboard support and print/static fallback.
- Focused tests, relevant P01–P04 regression suites, browser fixture/evidence, documentation, feature traceability, phase ledger and P05 report.

## Must Preserve

- P00–P04 contracts and tests; article schema version `1.0.0`; compatibility with `edu-viz` and RichViz v0.5.0; P03 tokens and host style isolation.
- No mandatory framework, CMS, host project, remote font, CDN, network fetch or external dependency.
- Stable canonical IDs, article state scope, accessibility, RTL/LTR behavior, no-JavaScript summary, license/NOTICE data and original ZIP hash.
- InfoBank is not a product dependency; no InfoBank files are in P05 scope.
- Do not modify unrelated code merely because another issue is noticed. Preserve any unknown pending changes.

## Out of Scope

- P06 general widgets, P07 education systems, later visualization/science/editor features, host/CMS/account integration, RichViz vendor edits, old HTML redesign, InfoBank modifications, browser-environment creation/repair, and unrelated refactors.

## Design Direction

- Reuse P03 `Quiet Signal / Intelligent Editorial`; do not mint a second palette. Light tokens: paper `#F5F7F4`, surface `#FFFFFF`, ink `#17231F`, muted `#57665F`, accent `#176B5B`, border `#DCE4DE`; dark colors use the existing token set.
- Typography: existing local system sans stack for Arabic/English body, local Georgia serif for display headings; meaningful article text remains at least 16 CSS px.
- Desktop: centered reading experience with a ~68ch article column and a narrow TOC rail; the rail follows logical inline-start for RTL/LTR. Mobile: single column, compact TOC disclosure above the section sequence.
- Surface hierarchy comes from typography, spacing and inline component context—not a uniform card grid. Interactive blocks retain semantic native controls and visible focus.
- Isolate renderer CSS in a Shadow Root when available; use a uniquely namespaced light-DOM fallback without mutating host styles.
- Review screenshot design against the project contract; keep article content as text/nodes and treat renderer adapters as the only path to registered visual engines.

## Acceptance Criteria

- [ ] DOC-01: one validated article composes title/summary/prose, structured blocks, visualization adapters and functional controls.
- [ ] DOC-02: TOC links scroll to ordered section targets; section anchors are stable and keyboard-operable.
- [ ] DOC-03: nested groups render; tabs, disclosure blocks and conditionals update from the article's shared P04 state.
- [ ] DOC-04: same validated article works in standalone mounting and a compatible host without host-specific article rewrites or host CSS mutation.
- [ ] DOC-05: meaningful static article content/fallback is available before interactive enhancement; print output remains readable and exposes hidden interactive content appropriately.
- [ ] DOC-06: one declared state variable updates prose/metrics and registered visualization bindings; legacy `edu-viz` stays behind its adapter.
- [ ] DOC-07: article/section/block targets and internal/cross-article route intents use canonical stable IDs; no content URL is treated as trusted navigation.
- [ ] Focused automated and relevant regression tests pass; browser tests cover actual behavior, screenshots, viewport, theme, RTL/LTR, focus, font size and no overflow at required widths. Mark unperformed browser checks UNVERIFIED and do not mark P05 COMPLETE.
- [ ] Docs, feature ledger, CSV/JSON traceability and shared state agree; no P06 implementation.

## Baseline / Constraints

- P04 is verified COMPLETE; its report and feature ledger are predecessor evidence.
- Baseline focused suites passed: P01 7/7, P02 12/12, P03 5/5, P04 8/8.
- No Git repository or root AGENTS/CLAUDE/CODEX/GEMINI file exists. See `Test-Reports/P05-Baseline.md` for code hashes and detailed gap map.
- Browser manager skill available locally is 1.0.0 (kit asks 1.0.1); strict-handoff skill snapshot available locally is 1.0.0 (kit asks 1.4.0); token-optimization local version is 1.0.0 (kit asks 1.0.1). Follow the actual P05 project handoff/protocol as authoritative; do not claim the unavailable versions were loaded.
- Browser visual gate is currently UNVERIFIED: manager cannot find the canonical AI-Agent-Browser configuration; process inspection is denied; no 9222 listener was observed. Continue local work, do not connect to exposed adapters until process/profile identity is proved.

## Execution Sequence

1. Record exact source baseline and P04 gate proof (recorded in `Test-Reports/P05-Baseline.md` and checkpoint CP-002).
2. Add behavior-first P05 tests for the core renderer registration, composition, safe text, stable anchors, state-driven interactions and disposal; run focused RED.
3. Implement the smallest central article renderer using `packages/core`, `packages/article`, `packages/state`, `packages/design-system` and registered adapters.
4. Extend schema/semantic validation only for additive features required by DOC-03/DOC-07, and synchronize the public schema/tests.
5. Add focused DOM tests and a real browser fixture; validate safe mounting, host isolation, native keyboard behavior and responsive/print states.
6. Run only the focused P05 suite and immediately relevant P01–P04 regression suites; run broader checks only if a project rule requires them.
7. Update directly affected API/docs, traceability and phase report with evidence; reconcile browser status honestly.
8. Stop after P05; do not open or implement P06.

## Phase Map

| Phase | Objective | Status | Dependency |
|---|---|---|---|
| P05 | Complete Portable Article Renderer | PARTIALLY COMPLETE | Automated work passes; verified browser evidence remains required |
| P06+ | Not in this task | NOT_STARTED | P05 completion and separate owner approval |
