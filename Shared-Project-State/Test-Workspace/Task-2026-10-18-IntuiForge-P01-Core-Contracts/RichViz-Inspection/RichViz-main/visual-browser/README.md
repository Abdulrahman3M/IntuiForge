# Rich Viz Visual Browser

The browser makes the library’s real contents easy to explore visually instead of opening source files one by one. The Home page introduces Rich Viz and previews canonical examples. **Explore Library** opens a hub with live collection counts, cross-library search, and links into each independent collection. The primary navigation is Home, Explore Library, Project, and About; a shared secondary bar groups Diagrams, Icons, Application Icons, SVG, and Stickers under the library.

## Routes and sources

- [Home](./index.html) renders a small showcase from `EXAMPLES_CATALOG` and reads summary counts from the same registries and discovered asset catalog as the gallery.
- [Explore Library](./library.html) derives each collection count from `EXAMPLES_CATALOG`, `DIAGRAM_REGISTRY`, `ICON_NAMES`, and `/visual-browser/catalog.json`. Search results preserve their query when opening a collection.
- [Diagrams](./diagrams.html) is the existing full example gallery, built from `EXAMPLES_CATALOG`, `DIAGRAM_REGISTRY`, and `ICON_NAMES` with lazy preview rendering.
- [Icons](./icons.html), [Application Icons](./app-icons.html), [SVG](./svg.html), and [Stickers](./stickers.html) are independent galleries with shared cards, search, metadata, references, and detail dialogs.
- [Project](./project.html) describes the library architecture; [About](./about.html) describes the browser and its purpose.

All routes use `shell.js` for the consistent top bar, library tabs, version badge, theme, and footer. The badge reads the root `VERSION` file on every page load. Links retain normal URL and browser-history behavior; supported browsers use a short, reduced-motion-aware navigation transition. Each collection only mounts its own gallery cards and lazy-loads previews near the viewport.

## Current inventory

The canonical source currently contains 24 examples, 14 visualization types, 99 interface glyphs, 231 unique Captiva application icons, 12 catalogued SVG illustrations (13 after live discovery), and 11 stickers. Asset discovery merges maintained provenance from `Assets/catalog.json`; upstream aliases are dereferenced to their PNG artwork and exact duplicate SHA-256 hashes are excluded. Reference IDs use `RV-EX-CORE-<example>`, `RV-EX-PATTERNS-<example>`, `RV-SVG-<asset>`, `RV-STICKER-<asset>`, `RV-APP-<collection>-<icon>`, `RV-ASSET-<path>`, and `RV-ICON-<glyph>`.

The browser is a view over canonical registries and discovered/catalogued assets, not a second manually maintained item list. When library content changes, update its source catalog and tests; the Home summary, Explore Library counts, search, and collection pages then reflect it.
