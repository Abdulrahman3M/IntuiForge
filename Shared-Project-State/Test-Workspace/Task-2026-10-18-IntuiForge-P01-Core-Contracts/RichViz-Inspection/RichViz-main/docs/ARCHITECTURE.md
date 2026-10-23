# Architecture

```text
source JSON ──► pure schema validator ──► diagram registry ──► lazy renderer family
                                                       └─────► adapter ──► local engine package
```

- `src/schema/` owns the closed declarative schema and per-family validators.
- `src/RichVisualizationRegistry.js` routes types to lazy renderers, describes capabilities, and maps adapters to vendor ids.
- `src/renderers/` owns focused presentation components. Native SVG and cards are the fallback for types that do not need a vendor engine.
- `src/adapters/` contains thin glue only. Engine distributions remain separate in `External-Libraries/<id>/active/` with their own license/notice.
- `src/RichVisualization.js` owns public lifecycle, one-time CSS loading, mount/dispose, theme observation, and safe failure behavior.
- `Examples/` is the single root for curated named specifications. `src/RichVisualizationExamples.js` is their JavaScript source of truth for gallery and tests.
- `docs/diagrams/` describes each registered type. `src/registry.json` is generated metadata; regenerate it through `node scripts/build-catalog.mjs`.

The source audit compared the original and extended HTML gallery copies. There are no separate original and extended renderer implementations: both views load the same schemas, renderer registry, adapters, and modules. The extension contributes nine additional specifications. No renderer source was removed because the shared runtime already supplied both gallery views.
