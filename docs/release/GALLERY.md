# Local visual library

The visual library at `packages/visualization-legacy/visual-browser.html` is served by the existing allowlisted loopback fixture server. It builds the gallery from the canonical RichViz type/example/icon registries and `Assets/catalog.json`; each result includes a stable ID, preview, author/source, license, and attribution when those fields are available. Only the selected result is rendered as a preview. No CDN is required.

## Windows

Run `Start Visual Gallery.bat` from Explorer or PowerShell. The launcher starts `tests/browser-server.mjs`, which binds only to `127.0.0.1:4173`, and prints:

`http://127.0.0.1:4173/packages/visualization-legacy/visual-browser.html`

Open that address in an approved browser. Keep the console open while using the gallery; press Ctrl+C to stop the server. If port 4173 is occupied, stop the other local fixture server or set `INTUIFORGE_TEST_PORT` in the launcher environment before starting.

The server accepts only GET and HEAD requests and only serves `tests/browser/`, `tests/fixtures/`, and `packages/`. It does not expose the project root, source ZIP, reports, or local user files. It is a development gallery server, not a production web server.

## Controls and metadata

Search by name, stable ID, description, author, source, tags, or license. Choose a category and use Previous/Next page to browse. Activate Preview to render a diagram, engine sample, glyph, or image; activate it again to close the preview. Search and category filters preserve the original registry data. Empty searches show a text explanation. Keyboard access uses native buttons and a labeled search field.

The gallery keeps Apache-licensed project glyphs and illustrations distinct from GPL-3.0-or-later Captiva application icons. Review each asset's attribution and upstream notice before reuse. See [license obligations](../../LICENSES/README.md) and the [asset catalog guide](../../packages/visualization-legacy/asset-library/README.md).
