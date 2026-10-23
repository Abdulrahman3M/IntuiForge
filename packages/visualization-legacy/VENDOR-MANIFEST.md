# RichViz compatibility package import

- Source: owner-provided `Input/RichViz v0.5.0.zip`.
- Source SHA-256: `6639552377C83B0FA48739C2140B808FF71CECF5ED9BC68C427D4E3B3482EEF3`.
- Package version: `0.5.0`, confirmed by the source `VERSION` and package manifest.
- Runtime import location: `packages/visualization-legacy/vendor/RichViz-main/`.
- Imported runtime: `src/` and `External-Libraries/` (165 files). SHA-256 comparison against the inspected archive extraction found zero mismatches.
- Preserved notices: `AGENTS.md`, `package.json`, `VERSION`, `LICENSE`, `NOTICE`, and `THIRD_PARTY_NOTICES.md` are copied beside the runtime.
- IntuiForge code is separate: `packages/visualization-legacy/src/index.js` wraps the original public API and registers the adapter; no copied RichViz source or vendor file was edited.
- Runtime vendor engines remain on RichViz's existing lazy-load paths; no CDN or installation step was added.
- P01 did not import the visual-gallery/docs/examples or `Assets/` directory; that was the scope decision at the time, not a statement that those assets could never be used.

## P08 visual catalog extension

- `packages/visualization-legacy/asset-library/` contains unchanged copies of the archive's `Assets/` tree and the two referenced `src/gallery/media/` SVGs, extracted from the SHA-256-verified owner ZIP for the P08 Visual Browser.
- The canonical `Assets/catalog.json` remains the asset inventory; the gallery derives searchable cards from it and the canonical RichViz type/example/icon registries.
- The catalog declares 23 Apache-2.0 project illustrations/stickers and 231 Captiva application icons under GPL-3.0+. The Captiva collection is isolated in its own directory with its upstream LICENSE and README, provenance and SHA-256 values retained.
- No source file under `vendor/RichViz-main/` or the original ZIP was modified. These added assets are not a license conversion or a determination that GPL assets may be combined with any particular distribution.

Rollback is non-destructive: remove the IntuiForge façade and copied runtime directory only as a separately authorized change. The original ZIP remains the recovery source and must not be edited or replaced.
