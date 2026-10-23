# Portable Article & Action Format — P02 Normative Contract

## Reader contract

P02 freezes `intui.article` schema version `1.0.0` in `packages/article/schema/article-v1.schema.json` (JSON Schema Draft 2020-12). The implementation details, Markdown grammar, limits, and API are documented in `docs/P02-Article-Format-And-Validation.md`. Article version is independent of the engine API and RichViz's legacy version. Future versions require a tested, lossless migration or an explicit unsupported-version diagnostic; unknown fields are never silently reinterpreted.

The article envelope requires `kind`, `schemaVersion`, `id`, `locale`, `dir`, `title`, `summary`, `metadata`, `assets`, `initialState`, `derived`, and `sections`. Metadata has draft/published status, content type, citations, canonical references, supported locales, and provenance. Sections and nested blocks use stable canonical IDs. Blocks use a structural type/content/props/children model; article input is inert declarative data, never executable HTML or JavaScript. P05 adds the backward-compatible `group` block type as a nested container/tab panel; tab groups use stable child IDs and optional display labels in `props.label`.

## Inputs and compatibility

JSON text, the one-manifest `intui-article` Markdown format, and plain JavaScript objects pass through the same bounded normalizer and validator. Unknown structural fields, hostile object shapes, cycles, non-finite numbers, script tags, event-handler properties in any casing, unsafe links, unresolved in-article Markdown fragments, and invalid resource references are rejected with diagnostics. The P05 renderer safely formats a bounded inline Markdown subset; it creates anchors only for safe destinations and declared section/block fragments, and never interprets article content as HTML. Valid `edu-viz` fences are checked through the preserved RichViz v1 validator and remain a separately versioned compatibility surface; they are not rewritten as article actions or a particular host integration.

## Declarative behavior and security boundary

Bindings are variable tokens, derived values use a bounded fixed-operator AST, and events use an allowlisted action vocabulary with explicit fields. P04 provides an article-scoped runtime for state updates, topological derived values, selector notifications, actions and block bindings. In addition to the existing `setFilter`, `submitQuiz`, `playMedia` and `seekMedia` actions, `scroll` and `expand` are supported declarative intents. There is no `eval`, source-defined JavaScript, dynamic module import, endpoint string, or implicit article-driven network access. Host navigation, media, persistence, filtering, scrolling, expansion and external resources require host-approved adapters/capabilities; P02/P04 validate or dispatch declared intent but do not grant authorization. External asynchronous data loading receives no endpoint from article content and must go through a host-supplied loader; a resource marked external remains idle until the caller explicitly supplies consent.

## Educational interaction contracts (P07, additive within article v1)

- `stepper` and `timeline` render their stable nested `children` as selectable panels. `bindings.selected`, when present, must reference a mutable enum containing each child ID. Timeline children require an ISO date/datetime in `props.date`. Panel contents may include ordinary article blocks, media, or adapter-backed visualizations; the renderer synchronizes selection and visible content.
- `quiz.props.questions` is a bounded list of stable question records. Supported `type` values are `single-choice`, `multiple-choice`, `true-false`, `short-answer`, `matching`, and `ordering`; each record supplies a non-empty `prompt` and an inert answer key. Choice IDs, matching maps, ordering permutations, and positive weights are validated before scoring. Scoring is deterministic and gives credit only for an exact response; explanatory text is shown after submission.
- `flashcards.props.cards` contains unique `{id,front,back}` records. Flip and review are session-local. A save callback is invoked only after an explicit user action and only if the host supplies the progress capability.
- `progress` requires a scalar numeric value or a bounded numeric state binding (`min >= 0`, declared `max <= props.max`). A `saveProgress` action can request host persistence, but the engine does not write local/session storage or make network requests itself.
- `guidedComparison.props.scenarios` contains at least two stable scenarios with labeled scalar left/right values and a non-empty rationale. Its optional selected-state binding is an enum containing all scenario IDs.
- Matching uses native selects. Ordering supports pointer drag and equivalent keyboard-operable move controls. Neither interaction uses article-provided code.

These additions do not change `schemaVersion` or introduce a host-specific persistence backend. Optional saved progress remains the responsibility of a trusted embedding host.

Assets require stable IDs, URL, MIME type, alt text, license, and provenance. Traversal, protocol-relative, and non-HTTPS external asset URLs are rejected. External HTTPS origins must be explicitly allowed by the embedding host and accompanied by integrity metadata. The validator does not fetch assets or sanitize SVG bytes; renderers must independently maintain safe DOM/text and resource handling.

## Rich editorial content (P10, additive to article v1)

- Audio/video blocks reference a manifest `assetId`; media assets may retain the legacy locale-keyed `captions` strings and may add `captionTracks: [{ assetId, locale, label, kind? }]`. Each track points to a separately declared `text/vtt` asset. Interactive renderers provide native controls, a readable transcript (`block.props.transcript` or the compatible asset caption), and an accessible playback-rate selector.
- Figure blocks may add `hotspots: [{ id, label, description, x, y }]`; IDs are stable tokens and `x`/`y` are percentage coordinates in the inclusive range 0–100. The alt text and a textual hotspot list remain available alongside interactive markers.
- Citation blocks can reference a declared `metadata.sources[].id` using `props.sourceId`, or carry a bounded plain-text `props.note` footnote. References are numbered in first-use order, link to the source list, and provide focusable backlinks. Legacy inline title/URL citations remain supported.
- Math blocks accept a bounded TeX-like subset and render as MathML; unrecognized input is shown as the original notation with a localized error. Code blocks are rendered as inert text with optional token styling and copy only after explicit activation. Neither format executes article-provided code or HTML.
- When an asset supplies SRI metadata, the interactive renderer verifies the fetched bytes before exposing them and revokes temporary object URLs on disposal. Static output cannot verify a resource synchronously, so it withholds integrity-protected resources and preserves their descriptive fallback. Relative local assets remain portable; no host or CMS is implied.

The feature-level API and grammar details are in `../docs/P10-Rich-Media-References-Math-Code.md` and the public types are exported from `@intuiforge/engine/article`.

The required static summary is the no-JavaScript narrative fallback. P02 validates the contract but does not implement a renderer or claim that interactive controls, accessibility presentation, export/import, or host services already exist; those remain assigned to their later phases.
