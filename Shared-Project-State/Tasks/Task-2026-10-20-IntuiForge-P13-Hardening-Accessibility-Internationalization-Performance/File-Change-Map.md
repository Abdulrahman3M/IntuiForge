# File Change Map — P13

| Feature | Canonical source candidates (verified) | Evidence target |
|---|---|---|
| NFR-01 | `packages/article/src/index.js`; `packages/visualization-legacy/src/index.js`; `packages/core/src/registry.js` | `tests/p13-hardening.test.mjs` adversarial JSON/object/Markdown/plugin/media cases |
| NFR-02 | `packages/article-renderer/src/rich-media.js`; `packages/article-renderer/src/index.js`; `packages/core/src/fallback.js`; `packages/design-system/src/gallery.js` | Focused CSP, URL, inert HTML, SVG sanitization and media fallback evidence |
| NFR-03 | `packages/article/src/index.js`; `packages/article-renderer/src/widgets.js`; `packages/article-renderer/src/knowledge-map.js`; `packages/scientific-plugins/src/validation.js` and `renderers.js` | Bounded inputs, lazy pages, large table/map/model and dispose/abort checks |
| NFR-04 | `packages/article-renderer/src/index.js`; `packages/scientific-plugins/src/renderers.js`; `packages/visualization-legacy/src` | Browser keyboard, semantics, focus, reader alternatives, font and viewport audit |
| NFR-05 | `packages/article-renderer/src/index.js`; `packages/scientific-plugins/src/renderers.js`; `packages/core/src/fallback.js` | Arabic RTL, English LTR, mixed bidi and locale fallback checks |
| NFR-06 | `packages/article-renderer/src/index.js`; `packages/article-renderer/src/rich-media.js`; first-party local asset paths | Browser lazy-load, loopback-only and offline fallback checks |
| NFR-07 | `tests/p13-hardening.test.mjs`; `tests/browser/p13.html`; `tests/browser/p13.js`; `package.json`; `tests/browser-server.mjs` as needed | Exact focused commands, browser/a11y/performance results and output paths |
| NFR-08 | Browser Environment Manager only for process/CDP/profile checks; no project browser-management implementation | Manager status, `edge://version`, P13 fixture, screenshot and profile evidence |

Only edit files confirmed to be canonical owners during source inspection. Do not edit `packages/visualization-legacy/vendor/**` or `Input/RichViz v0.5.0.zip` without proof of necessity and the vendor updater protocol.
