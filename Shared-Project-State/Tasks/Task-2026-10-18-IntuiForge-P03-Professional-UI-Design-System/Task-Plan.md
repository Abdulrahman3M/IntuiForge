# Task Plan — IntuiForge P03

## Objective

Execute only P03 after the owner-authorized transition and verified P02 COMPLETE gate. Build a reusable, host-agnostic professional design system and a responsive, functioning visual reference gallery that proves UI-01 through UI-07.

## Scope

- P03 Feature IDs UI-01 through UI-07 only.
- Central design tokens and local-font typography, article reading styles, responsive layout, RTL/LTR and mixed-script rules, light/dark/system theme bridge, isolated styling, primitive UI states and the P03 reference gallery.
- Focused unit/runtime tests, browser verification and screenshots where the approved dedicated AI browser is available, and directly affected API/design-system documentation.
- Update P03 feature evidence, phase state, shared state and completion report.

## Must Preserve

- IntuiForge remains independent and host-agnostic: usable from any compatible web project/page, with no InfoBank, CMS, framework, identity, storage or website dependency.
- Existing core lifecycle/API, article schema/version, RichViz v0.5.0 compatibility, 14 documented visualization types, six adapters, licenses/notices and `edu-viz` behavior.
- No global host CSS, route, content, theme, or application rewrite; P03 styles must remain isolated and host integration opt-in.
- Original `Input/RichViz v0.5.0.zip` unchanged, with the verified SHA-256 recorded in state.
- Existing examples, stable IDs, P00–P02 reports/ledgers and unrelated owner data.
- The prior standalone `richviz_intelligent_ui.html` is a negative style reference only, not a visual template.

## Out of Scope

- Reactive store/action execution (P04), full article renderer (P05), general widgets (P06+), host/CMS/account integration, RichViz visual redesign, vendor edits, unrelated cleanup, external font/CDN downloads, and all later phases.
- Fake or inert controls, fabricated metrics, article-side HTML/JS execution, or any claim of pixel-perfect ChatGPT cloning.

## Design Direction — P03 Reference Only

- Name: **Quiet Signal / Intelligent Editorial**.
- Primary light palette: paper `#F5F7F4`, surface `#FFFFFF`, ink `#17231F`, secondary ink `#57665F`, evergreen accent `#176B5B`, border `#DCE4DE`. Add restrained dark semantic counterparts and accessible chart-series tokens; verify contrast rather than assuming it.
- Typography: local system sans stack with Segoe UI/Tahoma/Arial Arabic fallbacks; optional local serif stack only for display headings. No remote fonts. Meaningful article/UI text defaults to 16px minimum.
- Layout: compact top controls, clear eyebrow/title/lead hierarchy, a comfortable central reading column, a narrow complementary state/token rail at desktop, and a single-column stack on mobile. Use logical CSS properties, not directional hardcoding.
- Principles: content-first, refined whitespace, subtle borders/surfaces, one primary accent, no gratuitous gradients/neon/badge stacks, no invented measurements, mixed technical identifiers isolated LTR with `bdi`/`dir=ltr`.
- Interaction: gallery theme and language controls must work. State previews must be honestly labeled as visual previews. Native semantics, visible keyboard focus, reduced-motion-safe transitions and explicit disabled/busy/error/empty treatment.

## P03 Acceptance Criteria

- [x] UI-01: a cohesive high-quality editorial visual system; no proprietary internals or pixel-clone claim.
- [x] UI-02: computed article, card, caption, tooltip/label and graph-label design targets are at least 16 CSS px.
- [x] UI-03: no page-level destructive overflow at 320, 360, 768, 1024 and 1440 CSS px; internal scrolling only when explicitly semantic and accessible.
- [x] UI-04: Arabic RTL, English LTR and mixed-script URLs/technical identifiers retain correct reading direction and keyboard order.
- [x] UI-05: light/dark/system plus host-token bridge work; no CSS or style mutation leaks into/out of the gallery scope.
- [x] UI-06: consistent hierarchy/spacing and usable ready/loading/empty/error/disabled, hover, active and focus-visible states; gallery controls have real behavior.
- [x] UI-07: reference gallery, screenshot/checklist evidence, interaction and layout checks are recorded; missing browser proof is UNVERIFIED, never PASS.
- [x] Focused tests, direct dependents, docs, source ZIP integrity and P03 feature ledger/report agree; stop before P04.

## Baseline Evidence (before P03 product edits)

- Owner authorization: “ابدأ المرحله التاليه P03”.
- P02 phase state/report/ledger mark COMPLETE; fresh `npm test` PASS 19/19; kit validator PASS (16 phases, 114 features, 0 structural errors); shared-state doctor PASS (0 problems).
- Protected input ZIP SHA-256: `6639552377C83B0FA48739C2140B808FF71CECF5ED9BC68C427D4E3B3482EEF3`.
- No root IntuiForge `AGENTS.md` found; only vendor-scoped RichViz `AGENTS.md`, outside P03 edit scope. No Git repository exists.
- Current package inventory has `core`, `article`, `react-island`, `visualization-legacy`; no design-system package/styles/gallery. Core mount and article contracts are in `packages/core/src/` and `packages/article/src/`; regression baseline is `tests/p01-core.test.mjs` and `tests/p02-article.test.mjs`.
- Baseline hashes: `package.json` `B3CFAB28261831B5E0A948D72987E416DD6756744D2E3E36EC2EE26E319025DC`; `README.md` `38BB46FF45B315559C098208008525639DED3CEA145F38A5CCC64BEFFF9D81C2`; core engine `374638D0B0A4B6B2105B5A18E6A142131EEC60FF748E106C3E1A8CF678126A34`; core declarations `EBCD1F5437D7FF2752E1D7C25A12408CE51B884C5C972DB7EFA35CA59399A9AF`; article declarations `CB08F982C3F93067BCE5AA9A463937398B5AEEBDB761B21167FA8E752158D215`; P01 tests `48F50800E37FB1F49B49A20753F4DAF598AF10854B7B4750DCED6169DA8E6155`; P02 tests `90BB9E9A327368512299F1F7CF51822C84FB15CEEC51A99BC45EAE5DCA1F09DF`.
- Browser preflight at phase start: Browser Environment Manager `Status -Name AI-Agent-Browser` returned `Unknown environment`; the canonical manager directory was absent. The owner later authorized use of the exact dedicated session and it became verifiable; the preflight result below is historical, not the final gate state.

## Execution Sequence

1. Keep project source/governance and UI contract as authoritative; do not open another phase.
2. Write focused tests for the proposed public design-system contract and run them RED before production implementation.
3. Add the smallest central design-system package and public export, including semantic tokens, token/theme helpers, isolated visual gallery and valid declaration surface.
4. Add browser fixture and focused browser assertions for 16px computed typography, 5 widths, themes, RTL/LTR, theme bridge isolation, keyboard focus and functioning controls.
5. Run focused tests and `npm test`; debug failures at their source, not by weakening acceptance.
6. Attempt visual/browser evidence only after manager identity preflight succeeds; otherwise continue safe code/tests but mark all affected checks UNVERIFIED and hold COMPLETE.
7. Update only the directly affected README/design-system docs and P03 evidence records. Check for a canonical history allocator; none was found earlier, and no values may be invented.
8. Verify all UI IDs, tests, source ZIP hash, isolation/preservation, state/report consistency; stop after P03.

## Risks

- Browser identity initially blocked the visual gate; the dedicated session was later verified and all required P03 browser evidence passed.
- CSS isolation and inherited host theme values can conflict; test host-token precedence and non-mutation in a real browser.
- A polished reference gallery could drift into P04/P05 behavior; keep its controls confined to design/theme/locale/state-preview behavior.

## P03 Closing Note — 2026-10-18

- The owner later supplied access to the existing dedicated Edge session; process/CDP/profile identity, `https://example.com`, and the P03 browser/visual checks were verified. See `Reports/P03-Completion.md` and the closing checkpoint.
- The owner separately authorized an isolated compatibility snapshot under InfoBank's `Engines` folder. The design system was imported, mounted and disposed in-memory on the actual InfoBank homepage served read-only; the 24-test suite passed from that snapshot. No host project files were intentionally changed, and IntuiForge remains generic/host-agnostic.
- P03 is COMPLETE. P04 is NOT_STARTED and requires explicit owner approval.
