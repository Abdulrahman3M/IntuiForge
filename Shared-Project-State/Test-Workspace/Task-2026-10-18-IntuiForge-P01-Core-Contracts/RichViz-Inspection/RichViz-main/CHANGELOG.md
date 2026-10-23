# 0.5.0 — 2026-10-08

## Unified Reader Controls and Connectors (0.5.0)

Graph readers share one persistent, single-row toolbar across static and interactive views: Zoom In, Zoom Out, Fit to View (target icon), Fullscreen (corner icon), view toggle and Text Version. Small screens scroll the toolbar horizontally without wrapping or widening the page. Other renderers expose their supported controls in the same toolbar component; they do not claim unsupported zoom or interactive capabilities.

Every icon-only control must have a clear localized tooltip on hover/focus and an accessible label. Use `controlButton()`/`setControlLabel()` and the shared toolbar; never reuse one ambiguous glyph for different actions. Fullscreen requires browser permission and user activation; report denial without claiming success.

Static and interactive node maps / React Flow specifications share rounded orthogonal routing, grouped card-edge ports, obstacle clearance, aligned arrow tips and label backgrounds. Interactive connectors inherit the engine viewport transform and reroute only when measured card sizes change. Selection stays accessible; observers and listeners are disposed with their graph. Existing cards, source JSON and relationship direction are preserved. Process-card/flow renderers keep their semantic layout; independent vendor engines retain their own connectors.

Focused checks: `node --test tests/controls-connectors.test.mjs`; existing registry, stylesheet, layout and lifecycle checks remain required. Verify RTL/LTR, narrow widths, all controls, label clearance and viewport alignment in a real browser.

# Changelog

## Unreleased

- Synchronized Visual Browser cache-busting asset URLs with release 0.5.0 and corrected the live server version assertion to read `VERSION`.
- Added an automatic version consistency guard to `npm test`, a standalone `npm run validate:version` command and a GitHub Actions check for pushes and pull requests.
- Added full-screen reading controls for static and interactive node maps, fit-to-view on expansion, higher-contrast arrowheads, accessible 44px controls and a styled text-version disclosure. Fullscreen denial now receives localized feedback.

## 0.4.0 — 2026-10-06

- Reorganized the Visual Browser around a product homepage, an Explore Library hub, and focused Project and About pages.
- Added a shared four-item primary navigation and a sticky, keyboard-accessible library navigation for Diagrams, Icons, Application Icons, SVG and Stickers.
- Kept the existing diagram gallery and dedicated asset pages intact while making their active library section clear; category counts and hub search are built from canonical registries and discovered assets.
- Added a responsive homepage showcase rendered from existing library examples, a dynamic library summary, cross-page search links, reduced-motion-aware page transitions, and direct query restoration in collection searches.
- Updated the version to 0.4.0 and synchronized the website guide, project links, and browser layout tests.

## 0.3.2 — 2026-10-05

- Split application artwork into its own Application Icons route, separate from the 99 original interface glyphs.
- Added 231 unique Captiva application/web icons from the pinned GPL-3.0+ source. Dereferenced upstream symlink aliases, excluded all exact duplicate PNG bytes, and retained the full upstream license and per-file provenance.
- Added ten original developer SVG illustrations and eleven original developer stickers, each catalogued with author, license, dimensions and hash.
- Added progressive 48-item asset loading and updated all asset counts, references, navigation, server catalog tests and project rules against duplicate assets and visual browser synchronization.

## 0.3.1 — 2026-10-05

- Added direct top navigation to the complete Icons atlas and SVG asset catalog, with links to their existing library sections.
- Added a live version badge that reads the canonical `VERSION` file at page load; release updates no longer require a hard-coded gallery edit.
- Explained that the browser exists for visual exploration of library contents, and added a GitHub README preview image.
- Kept the asset catalog and examples as the single source for icons and SVGs; no duplicate registry or framework was introduced.

## 0.3.0 — 2026-10-05

- Expanded the Visual Reference Browser to use the available page width with responsive spacing and a persistent, keyboard-accessible Project / Full Gallery / About navigation.
- Added an accessible, animated visual detail dialog with a sticky close header, Escape/backdrop closing, background scroll lock, item metadata, stable IDs, and copy actions.
- Made image discovery scan all supported image and sticker files under owned asset folders, in addition to the authored SVG illustrations and 99 inline SVG icon glyphs; previews are lazy and preserve aspect ratio.
- Added light/dark browser themes, category and asset-type filters, a real empty sticker state, and safer URL encoding for nested/spaced asset paths.
- Improved the Python loopback server's image MIME types, cache policy, startup readiness/browser launch, Python version check, and restricted dynamic asset catalog.
- Updated the full QA gallery and asset page to share the full-width/sticky navigation treatment and documented the audit.
- No JavaScript/Python dependencies were added; authored and vendor license boundaries are unchanged.

## 0.2.0 — 2026-10-05

- Standardized the product identity as **Rich Visualization Library**, with **Rich Viz** as the short brand and `RichViz` retained for code/API compatibility.
- Added a local, searchable Visual Reference Browser derived from the examples, diagram, asset, and icon registries, plus a path-restricted Python standard-library server and Windows launcher.
- Added the separate `richviz-updater` skill for evidence-based, reversible differential upgrades of integrated copies.
- Updated the installation skill and project guidance to distinguish first installation from existing-copy updates.
- Added actual library SVG previews and direct links to the README without duplicating assets.

## 0.1.0 — 2026-10-05

- Initial standalone RichViz distribution with a unified renderer registry and engine adapters.
- Unified the 14 core visualization examples and nine additional patterns under one searchable Examples catalog.
- Added a general-purpose entry point, diagram registry, documentation index, asset metadata contract, and standalone local gallery.
- Licensed original RichViz material under Apache-2.0 and audited the bundled engine notices; separate upstream license texts remain with third-party code.
- Hardened `.gitignore` for local build output, environment files, secrets, and editor artifacts.
- Preserved original renderers and engine adapters; no redundant renderer files were removed because the audit found none.
- Adopted **RichViz — Rich Visualization Library** as the product identity, broadening the stated audience beyond educational articles while preserving legacy host identifiers for compatibility. (Historical release note.)
- Connected the searchable Icons, SVG & Stickers Library catalog to the main gallery and documented that two SVG illustrations and 99 icons are included; no sticker files are bundled yet.
- Made the RichViz integration skill the required workflow for installations and upgrades.

