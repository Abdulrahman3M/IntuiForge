# P10 — Rich Media, References, Math & Code

P10 adds portable, host-agnostic rich editorial behavior to article schema v1. It does not require InfoBank, a CMS, a specific site, or a third-party runtime library. The normative envelope remains `intui.article` / `1.0.0`; see [the P02 article-format guide](P02-Article-Format-And-Validation.md) and [the normative format contract](../IntuiForge-Implementation-Kit/Article-Format-Contract.md).

## Media and captions

Audio and video blocks point to declared manifest assets through `props.assetId`. Media keeps browser-native controls and may define `captionTracks` whose records contain `assetId`, BCP-47-like `locale`, accessible `label`, and optional `kind` (`captions` or `subtitles`). Each track ID must resolve to a declared `text/vtt` asset. Existing locale-keyed `captions` data remains valid. A block may provide a plain-text `props.transcript`; otherwise the renderer uses the matching legacy caption or first available caption. The transcript is in a disclosure, separate from the browser's timed text track.

The shared renderer offers six actual playback rates: `0.5×`, `0.75×`, `1×`, `1.25×`, `1.5×`, and `2×`. Its labeled button opens a keyboard-operable group; Arrow Up/Down moves between choices, Escape closes the group and returns focus, and activating a choice updates the associated media element's `playbackRate`.

## Annotated images

A figure may include `props.hotspots`, each with a stable `id`, plain-text `label` and `description`, and `x` / `y` percentages from 0 to 100. Markers are real buttons with descriptive accessible names and selected state. The figure's required manifest `alt` and a persistent text list of hotspot descriptions are available without activation. The zoom button toggles a bounded, scrollable image stage and communicates its expanded state.

## Citations and footnotes

A citation block with `props.sourceId` must reference an ID in `metadata.sources`; a `props.note` creates a plain-text footnote. Source entries are deduplicated by source ID, footnotes are block-specific, and numbering follows first use. Each inline number links to a focusable reference item; a backlink returns focus to its originating citation. Legacy title/URL-only citation blocks remain accepted.

## Math and code safety

Math blocks are parsed into MathML from an internal bounded grammar: at most 4,096 source characters and 512 MathML nodes; supports groups, fractions, square roots, subscripts/superscripts, plain `\\text{...}`, basic Latin and allowlisted Greek names/operators. Unsupported commands, malformed groups, empty input, and disallowed characters produce a localized status plus the original notation. No TeX engine or network-loaded renderer is involved.

Code blocks create text nodes and token spans; they never interpret the source as HTML or execute it. Keyword coloring is intentionally limited to bundled language sets (`javascript`, `typescript`, `python`, `json`, `bash`, plus `js` / `ts` aliases); unknown languages remain plain text. Copy is an explicit button action and announces success or a manual-copy fallback.

## Asset integrity and portability

The shared manifest continues to own URL, MIME type, alternative text, license, provenance, optional dimensions/duration, captions, and integrity metadata. Relative paths are resolved by the host's existing asset resolver and are the preferred portable choice. For explicitly integrity-protected assets, the interactive renderer fetches without credentials or referrer, verifies SHA-256/384/512 before assigning a temporary blob URL, reports failure without blanking the text alternative, and revokes that URL at renderer disposal. Static HTML cannot perform asynchronous verification; it withholds integrity-protected bytes and retains a localized alt-text explanation instead of bypassing SRI. Assets without integrity metadata retain the ordinary local/static path.

## Public API and verification

Public manifest/source/media types are exported from `@intuiforge/engine/article` (`packages/article/src/index.d.ts`). Canonical behavior lives in `packages/article/src/schema.js`, `packages/article/src/index.js`, `packages/article-renderer/src/rich-media.js`, and `packages/article-renderer/src/index.js`. The focused suite is `npm run test:p10` (`tests/p10-rich-media.test.mjs`). The real-browser fixture is `tests/browser/p10.html` and runs only against locally served test assets generated or authored inside the fixture; it does not download media or require a particular host application.
