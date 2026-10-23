# P10 Implementation Plan — Rich Media, References, Math & Code

Date: 2026-10-19 (Asia/Dubai)

## Authority and boundary

- Execute P10 only. Do not begin P11.
- The published predecessor gate says P09 must be COMPLETE, while the current project state says P09 is PARTIALLY COMPLETE because two viewport screenshot captures stalled. The owner's latest direct instruction, “ابدأ بمهمة P10 وقم بتنفيذها”, authorizes beginning P10 in this conversation. Preserve P09's status and report this explicit gate override and its risk; do not rewrite the earlier report or infer that P09's screenshot gate passed.
- Scope: shared portable article schema/validation and renderer behavior for MED-01 through MED-07, directly relevant docs/examples/tests, and P10 evidence. Preserve unrelated state, RichViz, and host projects.
- Workspace has no `.git`; therefore no branch/worktree or official commit/version history can be claimed. Preserve pre-edit hashes in the execution ledger.

## Baseline

- `npm test`: PASS, 86/86 on 2026-10-19.
- Relevant central owners: `packages/article/src/schema.js`, its published JSON mirror, `packages/article/src/index.js`, and `packages/article-renderer/src/index.js`.
- Existing article contract already declares `math`, `code`, `citation`, `figure`, `audio`, `video`; assets already carry relative URLs, license, provenance, optional integrity, dimensions, and legacy captions. The renderer currently shows plain code, omits numbered source references, and renders basic native media without captions/transcripts/speed/hotspots/zoom/integrity checking.
- Existing browser fixtures are isolated behind `tests/browser-server.mjs`; no non-legacy audio/video fixture files exist. The project provides FFmpeg locally, so create a tiny deterministic local video fixture from generated test media only if needed; do not fetch external media.

## Ordered work

1. Add red tests for typed media/caption cross-references, bounded image hotspots and source citation references; test exact validation paths and compatibility of existing v1 articles.
2. Add portable schema fields and cross-field validation: caption tracks reference declared `text/vtt` assets; hotspot IDs/labels/descriptions and percentage coordinates are bounded; citations reference declared metadata sources. Keep older `captions` fields and citation URL/title fallback compatible.
3. Implement a small renderer-owned P10 module for restricted TeX-to-MathML conversion, allowlisted tokenized code display, citation numbering/source list/backlinks, native media helpers and content integrity verification. No `eval`, arbitrary article HTML, external math/highlight library, or implicit network origin.
4. Integrate accessible controls and lifecycle disposal in the shared renderer: native media controls and tracks, transcript disclosure, icon-only speed trigger with keyboard-operable options, image hotspots/alternative and zoom, localized asset/error states, code copy on explicit user gesture, MathML fallback for malformed notation.
5. Extend the local browser fixture with self-hosted minimal WAV/WebVTT/video test responses (no downloads) and a bilingual/RTL demonstration. Add `npm run test:p10`; cover all MED IDs, regression tests and public schema/renderer parity.
6. Run focused P10 tests, direct dependents (P02/P05), full suite, syntax checks and browser interaction/responsive/offline checks in the verified AI Edge environment only. Capture and inspect the actual P10 screenshots; record any distinct environment-only limitation without calling it PASS.
7. Update only P10-relevant contract/API/sample docs, traceability, feature ledger, phase-state and `Reports/P10-Completion.md`. Review the diff by explicit file inventory and recheck preserved hashes for out-of-scope legacy files. Stop after P10.

## Acceptance evidence

- MED-01..MED-07 each have implementation, focused automated coverage, and browser evidence for user-visible behavior where applicable.
- Audio/video supports native playback, WebVTT captions and readable transcript; speed options are accessible and actually affect playback rate.
- Annotated images expose clickable/focusable hotspots, a meaningful text alternative and a working zoom toggle.
- References number in first-citation order and navigate both ways with stable focusable targets.
- Math is built only from a bounded allowlist into MathML; malformed/unsupported notation yields a readable error/alternative.
- Code tokens are rendered as text, never interpreted; explicit copy works or reports a localized capability failure.
- Manifest entries retain relative path, licensing/provenance and integrity metadata; supplied integrity is verified before display; all demo assets work locally/offline.
- Automated and browser results, screenshots, accessibility, RTL/LTR and responsive observations are recorded honestly. No P10 COMPLETE status until every MED row is evidenced.
