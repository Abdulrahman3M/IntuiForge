# Task Plan — IntuiForge P02

## Objective

Execute only P02 after the owner-approved P01 COMPLETE gate. Freeze the host-agnostic `intui.article` v1 format, implement one strict normalizer for JSON strings, Markdown sources and JavaScript objects, preserve RichViz v1/`edu-viz`, and prove ART-01 through ART-08.

## Scope

- P02 Feature IDs ART-01 through ART-08 only.
- Public article schema, safe parsing/normalization, documented Markdown grammar, version diagnostics, static accessible summary, safe resource validation and actionable source-location errors.
- Focused canonical tests/fixtures and directly affected API/schema documentation.
- Update P02 evidence, phase state, shared execution state and completion report.

## Must Preserve

- Host agnosticism: no dependency on InfoBank, any website, CMS, framework, identity or storage service.
- Original `Input/RichViz v0.5.0.zip` unchanged; RichViz v0.5.0 API, 14 types, six adapters, notices, `edu-viz` syntax and v1 data behavior.
- Existing sample meanings and IDs; schema evolution is additive and documented.
- Declarative-only content: no HTML/JS execution, `eval`, implicit network or host capability.
- Existing P01 core injection/lifecycle contract and all P01 tests.
- Unrelated user data and completed P00/P01 reports/state.

## Out Of Scope

- Renderer/UI/design system, state/event execution runtime, CMS/account system, host-specific integration, or any phase after P02.
- Vendor-source edits, RichViz redesign, release/build allocation, unrelated cleanup and external downloads.
- Inventing a historical IntuiForge article version when P00/P01 evidence shows none exists.

## Acceptance Criteria

- [x] ART-01: versioned `intui.article` v1 envelope and public JSON Schema validate required content/media metadata.
- [x] ART-02: JSON and documented Markdown grammar coexist safely; `edu-viz` retains legacy validation and `intui-article` is additive.
- [x] ART-03: canonical IDs are valid and unique across sections, blocks, nested block nodes and resource IDs.
- [x] ART-04: JSON strings, Markdown strings and plain JS objects use one normalizer; unknown structural fields and unsafe object shapes reject.
- [x] ART-05: current v1 normalization preserves meaning; unsupported versions produce explicit non-mutating diagnostics; legacy RichViz v1 remains independent.
- [x] ART-06: static narrative summary is required as the no-JS/accessibility fallback contract.
- [x] ART-07: resource source/type/alt/license/provenance and conditional integrity/origin rules reject unsafe assets.
- [x] ART-08: diagnostics include code, JSON path, severity, non-autocorrective fix hint and source line/column where source text permits.
- [x] Valid/invalid fixtures and focused TDD evidence exist; focused P02 tests and `npm test` pass.
- [x] Schema/API docs and the P02 feature ledger/report agree; input ZIP hash is unchanged.
- [x] Stop after P02 and await the owner before any later phase.

## Phase Map

| Phase | Objective | Status | Dependency | Verification |
|---|---|---|---|---|
| P00 | Source audit / non-destructive migration | COMPLETE | — | P00 report, source hash, BASE evidence |
| P01 | Core workspace / extension contracts | COMPLETE | P00 | P01 report, six CORE IDs, 7/7 Node tests |
| P02 | Article format, schemas and validation | COMPLETE | P01 + explicit owner approval (received) | `Reports/P02-Completion.md`; eight ART IDs PASS; focused 12/12 and full 19/19 Node tests |

## P02 Execution Steps

1. Write ART-01..ART-08 tests and fixtures before production code; observe expected RED failures.
2. Implement the smallest central article schema/validator/parser/version boundary after verifying current source paths.
3. Preserve legacy `edu-viz` by using the real vendored RichViz validator; never modify the input ZIP or vendor files.
4. Verify proposal examples against the frozen schema; make only documented additive alignment changes if required.
5. Run focused P02 tests, whole `npm test`, schema/kit/state validation and source hash checks — PASS.
6. Update only directly affected docs, feature ledger, phase state, shared state and P02 report — COMPLETE.
7. Stop; do not open or start any later phase — COMPLETE; awaiting owner authorization.

## Tests

- `node --test tests/p02-article.test.mjs`
- `npm test`
- P02: `npm run test:p02 -- --test-reporter=dot` — 12/12 PASS; `npm test` — 19/19 PASS.
- Kit: `python .\IntuiForge-Implementation-Kit\Scripts\Validate-Kit.py` — 16 phases, 114 features, 0 structural errors.
- Shared-state doctor — PASS, 0 problems; protected ZIP SHA-256 unchanged.
