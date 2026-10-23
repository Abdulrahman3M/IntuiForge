# RichViz → IntuiForge and Host Integration — Preservation Contract

## What is verified remotely, not ZIP
GitHub `Abdulrahman3M/RichViz` `main` (read 2026-10-18): package/README reports v0.5.0, 14 registered visualization types, six external engines; sources `src/RichVisualization.js`, `src/RichVisualizationSchema.js`, `src/RichVisualizationRegistry.js`, `src/renderers/Cards.js`, `src/renderers/Composite.js`, `src/rich-visualization.css`, `docs/ARCHITECTURE.md`. Repo is private, but owner connector access confirmed. Source ZIP user mentions has NOT been supplied in this conversation; it may differ from main and is sole migration input at execution.

## Preserve named legacy interfaces
- `RichViz.render(container, spec, opts)` / `validateVisualizationSource()` / `mountVisualization()` / `hydrateArticleFigure()` / `mountMermaid()` lifecycle and return handles, or provide nonbreaking compatibility wrappers with focused tests.
- Markdown fence `edu-viz` and existing legacy Mermaid paths; visualization data shape (`version:1`, type/title/description/options/data). New `intui-article` envelope is additive and versioned separately.
- Six vendor adapter IDs: Mermaid, React Flow/XYFlow, Chart.js, Recharts, ECharts, Plotly; SVG and native cards remain fallback where supported.
- 14 registered types: `mermaid`, `react-flow`, `node-map`, `process-cards`, `step-guide`, `pipeline`, `process-flow`, `kpi-dashboard`, `bar-chart`, `data-chart`, `annotated`, `svg`, `infographic`, `custom`.
- Existing `tabs`, `accordion`, icons, gallery browser, local server where present, registry, component media links, themes, Arabic RTL, accessible text alternatives and lazy loading.
- All third-party notices, local snapshots and original source attributions. Do not flatten incompatible licenses or assume commercial redistribution permission for all assets.

## Host responsibilities
IntuiForge is independent of any CMS, application, site or framework. Each host retains its own content storage, categories, routes, canonical IDs, search, authentication, user data and publishing. IntuiForge receives validated content and explicit optional capabilities through its public integration contract. It must not discover or access host databases, local folders, secrets or private data implicitly, and must not expose per-user database paths through static serving.

## Optional integration semantics
`mount(element, validatedArticle, {lang,dir,theme,resolveMedia,navigate,persistence,permissions})`; host bridges must be explicit and audited. Existing host pages without IntuiForge behave exactly as before; inclusion must be opt-in per page or content block. Avoid global scripts, styles or route changes in any host.

## Migration work order
1. P00 audit actual input ZIP and local version, compare source to remote documented baseline.
2. P01 create independent workspace and tests; keep source import reversible, avoid rewriting original ZIP.
3. P02 and P05 support additive schema+renderer and migration of `edu-viz` syntax in sample article.
4. P08 exercise all 14 types/6 engines against existing fixtures.
5. P12 prove integration in a plain HTML host and an independent framework-managed host fixture, with zero host content migration. Any real third-party host integration is optional, separately authorized work.
6. P15 publish migration guide and documented rollback to old RichViz runtime with existing articles intact.
