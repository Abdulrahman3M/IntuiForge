# P02 — Article Format, Schemas & Validation

- **Date:** 2026-10-18 (Asia/Dubai)
- **Final Status:** `COMPLETE`
- **Source ZIP:** `Input/RichViz v0.5.0.zip`
- **SHA-256:** `6639552377C83B0FA48739C2140B808FF71CECF5ED9BC68C427D4E3B3482EEF3`
- **Git / Build / Release:** Not Applicable — this workspace has no Git repository or canonical release/build allocator.
- **Scope:** P02 only. No P03 or later-phase work was started.

## Summary

P02 freezes and implements the host-agnostic `intui.article` schema version `1.0.0`, exports its JSON Schema and validator, and validates JSON text, the documented Markdown manifest/body format, and plain JavaScript objects through a bounded shared normalization path. It preserves `edu-viz` through the actual RichViz v1 validator, provides stable target IDs and structured diagnostics, and rejects unsupported article versions explicitly. There is no dependency on InfoBank, a CMS, any named site, identity service, or framework.

## Governance and owner decisions

Reviewed the project start guide and execution protocol; P02 handoff and start prompt; architecture, article-format, security, dependency/gate, feature traceability, acceptance, migration, and report contracts; relevant examples; P00/P01 reports and P01 feature ledger; and the nested RichViz source policy/schema used by `edu-viz`. No root project agent-policy files or Git repository are present. The owner-authorized host-agnostic decision was preserved. The P02 handoff authorizes freezing the article contract and does not require an additional product approval gate.

No historical IntuiForge article schema version was evidenced in P00/P01, so no migration was fabricated. The migration dispatcher accepts v1 losslessly and reports `UNSUPPORTED_SCHEMA_VERSION` for unregistered versions. RichViz's independent v1 format remains unchanged.

## Implemented features

| ID | Status | Canonical implementation | Evidence / observed result |
|---|---|---|---|
| <a id="art-01"></a>ART-01 | PASS | `packages/article/src/schema.js`; `packages/article/schema/article-v1.schema.json`; package exports | Required versioned envelope and metadata validate. Runtime schema and public JSON file are asserted equal; package subpath imports pass. |
| <a id="art-02"></a>ART-02 | PASS | `packages/article/src/index.js` Markdown parser | One `intui-article` manifest plus ordinary Markdown is normalized; `edu-viz` is accepted only through RichViz validation and retained as `legacyViz`. Mixed fixture passes; generated IDs remain stable after line movement. |
| <a id="art-03"></a>ART-03 | PASS | `validateBlocks` in `packages/article/src/index.js` | Canonical ASCII IDs are checked and uniqueness spans assets, sections, blocks, and nested children. Duplicate fixture is rejected with path-bearing diagnostic. |
| <a id="art-04"></a>ART-04 | PASS | `validateArticle`, `safeClone`, schema validation | JSON and object forms normalize identically without caller mutation; unknown fields, cycles, hostile prototypes, accessors, functions/non-JSON values and oversize Markdown are rejected. |
| <a id="art-05"></a>ART-05 | PASS | `migrateArticle` version dispatcher | Current v1 input is lossless; an unregistered version returns an explicit, non-mutating diagnostic. No legacy RichViz schema is conflated with article versions. |
| <a id="art-06"></a>ART-06 | PASS | Summary semantic validation | Summary needs at least 24 characters after trimming outer whitespace; insufficient static fallback is rejected. |
| <a id="art-07"></a>ART-07 | PASS | Resource manifest, link and action validation | Traversal, unsafe protocols, missing host origin allowlist/SRI, unsafe link targets, unmanifested media URLs and invalid alt/decorative combinations are rejected. Approved HTTPS origin plus integrity passes. |
| <a id="art-08"></a>ART-08 | PASS | Diagnostic/source-map helpers | Issues expose code, JSON path, severity, message and non-autocorrective fix hint; malformed Markdown JSON includes line/column; Markdown block paths carry source maps. |

All five illustrative article examples validate against the frozen v1 contract. Their meanings and IDs remain intact; required provenance/locale metadata was added additively.

## Architecture and security boundary

The article package is separate from the P01 kernel and is injected by the host using `createIntuiEngine({ validateArticle })`; it does not select a host or renderer. The public entry is `@intuiforge/engine/article`, with the Draft 2020-12 schema at `@intuiforge/engine/article/schema`.

The validator accepts only bounded inert article data. It rejects structural unknowns, script tags, handler/dangerous properties, non-finite values, unsafe object graphs, unsafe links/assets, undeclared asset references, unsupported actions/operators, derived cycles, and static division by zero. External assets are not fetched; the host must allow an exact HTTPS origin and the article must declare SRI. Validation does not render HTML, sanitize fetched SVG bytes, authorize host routes, or execute actions; those remain downstream renderer/host responsibilities and are not claimed complete here.

## Modified files

- `package.json`, `README.md`.
- New `packages/article/src/index.js`, `packages/article/src/schema.js`, `packages/article/src/index.d.ts`, and `packages/article/schema/article-v1.schema.json`.
- New `tests/p02-article.test.mjs` and valid/invalid fixtures under `tests/fixtures/p02/`.
- Five illustrative JSON examples updated additively to satisfy required metadata.
- New `docs/P02-Article-Format-And-Validation.md`; finalized `IntuiForge-Implementation-Kit/Article-Format-Contract.md`.
- P02 phase state, feature ledger, report, and shared P02 execution records.

No RichViz vendor source, input ZIP, P00/P01 implementation, or unrelated host/project was modified.

## Validation matrix

| Check | Command / method | Result | Evidence |
|---|---|---|---|
| P02 acceptance | `npm run test:p02` | PASS — 12/12 | `tests/p02-article.test.mjs` |
| Full Node regression suite | `npm test` | PASS — 19/19 (7 P01 + 12 P02) | Fresh run on Node v24.19.0 |
| Kit structure | `python .\IntuiForge-Implementation-Kit\Scripts\Validate-Kit.py` | PASS — 16 phases, 114 tracked features, 0 structural errors | Command output |
| Shared state doctor | `sps.mjs doctor --project-root .` | PASS — no problems; workspace writable; Python available; Git absent as expected | Command output |
| Public schema sync | ART-01 deep equality assertion and JSON package import | PASS | `tests/p02-article.test.mjs` |
| Adversarial/security cases | P02 tests: script tags, case-insensitive event-handler keys, custom prototype/getter, cycles, unsafe actions, divide by zero, traversal, unsafe protocols, external origin/SRI, hidden media URLs | PASS | Focused tests/fixtures |
| RichViz source integrity | `Get-FileHash -LiteralPath 'Input/RichViz v0.5.0.zip' -Algorithm SHA256` | PASS — unchanged | SHA-256 above |
| Git working-tree status | `git status --short --branch` | UNVERIFIED, non-blocking | Workspace is not a Git repository; no clean-tree status is claimed. |
| Commit/build/release allocation | Check for repository and official allocator | Not Applicable | No Git repository or canonical release/build allocator exists. |
| Browser / rendered UI / visual RTL/mobile/keyboard | Not run | Not Applicable to P02; schema/parser/validator only, no UI produced | No Edge process, CDP, profile, navigation, or screenshot claimed. |

P01's separately reported optional loopback-based RichViz browser fixture remains UNVERIFIED as recorded in `Reports/P01-Completion.md`; it is not a P02 UI requirement and does not invalidate the completed P01 gate. The dedicated AI Edge profile was not opened because no P02 browser check was applicable; the user's personal Edge was not used.

## Documentation and history

The normative article contract, detailed schema/Markdown/API guide, package exports and root usage instructions are synchronized. No CID/NID/RID, build/release number, or commit was allocated or invented.

## Remaining issues and next-phase gate

No mandatory P02 feature or verification remains unresolved. `COMPLETE` is backed by all eight feature proofs and the whole Node suite. Stop here and await the owner's explicit authorization before any later phase.
