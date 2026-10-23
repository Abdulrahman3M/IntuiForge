# P02 — Portable Article v1

P02 freezes the host-agnostic article envelope as `kind: "intui.article"`, `schemaVersion: "1.0.0"`. The article format version is independent from the IntuiForge engine API version and from RichViz's legacy `version: 1` specification. No website, CMS, identity provider, storage service, or framework is required.

The machine-readable contract is [article-v1.schema.json](../packages/article/schema/article-v1.schema.json), Draft 2020-12. The ESM API is exported by `@intuiforge/engine/article`; the same schema object is available at `@intuiforge/engine/article/schema`.

## Envelope

The required top-level fields are:

| Field | Contract |
|---|---|
| `kind` | Exactly `intui.article`. |
| `schemaVersion` | Exactly `1.0.0`. No earlier IntuiForge article version was present in the P00/P01 evidence, so this release does not invent a migration. Unknown versions fail with `UNSUPPORTED_SCHEMA_VERSION`. |
| `id` | Canonical article ID. |
| `locale`, `dir` | BCP-47-like locale token and `ltr`/`rtl` direction. The primary locale must appear in `metadata.supportedLocales`. |
| `title`, `summary` | Visible title and a static narrative summary whose length is at least 24 after trimming leading/trailing whitespace. The summary is the content-level fallback contract when interactive JavaScript is unavailable. |
| `metadata` | Required `status`, `contentType`, `sources`, `canonicalReferences`, `supportedLocales`, and `provenance`. Unknown metadata keys fail. |
| `assets` | Typed resource manifest; may be empty. |
| `initialState`, `derived` | Declarative state declarations and derived-expression ASTs; may be empty. |
| `sections` | At least one section. Each section has a canonical `id`, `heading`, and one or more blocks. |

Metadata `sources` require stable `id` and `title`; optional citation fields are `author`, `publisher`, `url`, `license`, `publishedAt`, and `accessedAt`. A metadata provenance record requires a `kind` from `author-supplied`, `ai-generated`, `imported`, `derived`, or `reviewed`, and may include `source`, `attribution`, and `license`. Canonical references are stable ID tokens, not website-specific routes.

Assets require `id`, `url`, MIME `type`, `alt`, `license`, and `provenance`. Informative assets require non-empty alt text; a decorative asset must set `decorative: true` and an empty alt string. Optional fields include localized `captions`, `integrity`, dimensions, and duration. Relative paths are accepted unless malformed or traversing. Protocol-relative URLs and non-HTTPS schemes are rejected. An external HTTPS asset requires both the exact origin in the embedding host's `allowedAssetOrigins` option and a `sha256`, `sha384`, or `sha512` integrity token. The validator does not fetch resources.

P10 extends this manifest additively with typed `captionTracks` and adds validated figure hotspots and citation cross-references. Runtime verification, transcripts, playback controls, MathML, safe code presentation and citation focus behavior are documented in [P10 Rich Media, References, Math & Code](P10-Rich-Media-References-Math-Code.md).

## Blocks, identifiers, state, and actions

Blocks use the closed vocabulary published by `ARTICLE_BLOCK_TYPES`. A block has `id`, `type`, and at least one of `content`, `props`, or `children`; it may also have `bindings` and `events`. Section/block structural fields reject unknown keys. `props` is bounded inert JSON for component-specific data, not executable code. Dangerous property names, event-handler properties in any casing (for example `onClick` or `onclick`), and raw script tags in any string are rejected. This phase validates data; it does not render HTML. Later renderers must preserve the declarative boundary and render content through safe text/Markdown handling.

Article-target IDs for assets, sections, blocks, and nested children must match `^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$` and be globally unique within that target set. Source-record IDs and external canonical-reference tokens are not DOM/deep-link targets and are not part of this uniqueness set. Markdown-generated IDs are stable from their content/heading, not their line number. Authors should supply explicit `{#stable-id}` anchors when repeated headings or identical generated content would otherwise collide.

`initialState` variable names use ASCII letters followed by letters, digits, `_`, or `-`. Variables declare `type` and `value`; numeric/string/enum bounds are checked and enum values must be unique. `derived` values are literals, `{ "ref": "name" }`, or fixed AST nodes: `add`, `subtract`, `multiply`, `divide`, `clamp`, `if`, comparisons (`lt`, `lte`, `gt`, `gte`, `eq`), boolean (`and`, `or`, `not`), `lookup`, and `formatNumber`. References must resolve to declared state/derived names; derived cycles, statically known division by zero, unknown operands/operators, and excessive complexity are rejected. There is no expression-string evaluation.

Events are declarative action objects only: `setState`, `nextStep`, `previousStep`, `selectOption`, `setFilter`, `submitQuiz`, `toggle`, `openDialog`, `closeDialog`, `navigate`, `seekMedia`, `playMedia`, `resetActivity`, and `saveProgress`. Each has an action-specific allowlist of fields. `valueFrom`, where accepted, is limited to `event.value`, `event.checked`, `event.index`, or `event.optionId`; navigation uses a route ID for later host authorization, never an endpoint/URL; media actions reference declared asset IDs; playback requires `gestureRequired: true`; progress scope is explicitly `article` or `activity`. This validates an intent only—host adapters remain responsible for authorization and execution.

## Accepted input forms

`validateArticle(input, options?)`, `parseArticleSource(input, options?)`, and `migrateArticle(input, options?)` share the same inert clone, schema, and semantic validation path. They accept JSON text, the documented Markdown form, or plain JavaScript objects. Successful validation returns a fresh normalized value without mutating the caller. Failures are not auto-corrected.

Plain objects must be JSON-like trees: ordinary objects/arrays, finite numbers, and JSON scalar values. Cycles, custom prototypes/class instances, symbol properties, getters/setters, non-enumerable fields, sparse arrays, functions, `undefined`, and executable/non-JSON values are rejected. Getter/accessor descriptors are inspected without invoking them. Bounds are source length 1,000,000 characters for JSON and Markdown strings; nesting depth 32; 10,000 value nodes; arrays up to 10,000 entries; and strings up to 100,000 characters, with narrower schema limits where declared.

JSON source is parsed as one complete article envelope. Duplicate JSON keys are reported rather than silently treated as author intent. Unknown top-level and structural fields are rejected for v1.

Markdown source must contain exactly one fence whose opening line has three backticks followed by the info string `intui-article`, with no attributes. Its body is one JSON object envelope. The fence is metadata, not executable content. Text outside it is combined into article sections and appended to any manifest-provided sections. `# Heading` starts a section; `##` through `######` produce heading blocks; blank lines split paragraphs. A trailing `{#stable-id}` assigns an explicit section/heading/paragraph ID. Without an H1, body text belongs to a `markdown-body` section titled with the article title. Generated IDs do not depend on line numbers.

Other fenced blocks are inert `code` blocks (the language label is retained as metadata), except fences whose info string is exactly `edu-viz`, which are passed to the preserved RichViz v1 validator and normalized as a `legacyViz` block. RichViz remains separately versioned and is not migrated into the article schema. A second manifest, malformed/unclosed fence, or invalid `edu-viz` data yields a diagnostic. Markdown not covered by these rules remains paragraph text; this parser does not claim to implement all CommonMark extensions.

## Diagnostics and guarantees

Failure results have `{ ok: false, errors }`; success results have `{ ok: true, value }`. Each issue contains `code`, JSON Pointer-like `path`, `severity: "error"`, a plain-language `message`, and a non-autocorrective `fixHint`. `location: {line, column}` is included where text parsing can map the issue to source. Parsed Markdown also exposes a `sourceMap` from normalized section/block paths to source locations. JavaScript-object input has paths but no source line mapping.

The validator checks structure, inert data shape, stable IDs, versions, state/action ASTs, summary fallback, link/asset protocols and traversal, external-origin integrity policy, `edu-viz`, and common script/property injection indicators. It does not fetch URLs, sanitize SVG bytes, render content, authorize host routes, persist progress, or prove that downstream component props are safe for a renderer. Those are separate engine/host responsibilities and later-phase gates.

Run focused checks with `npm run test:p02`; the full P02 acceptance tests are in `tests/p02-article.test.mjs`, with representative valid/invalid inputs in `tests/fixtures/p02/`.
