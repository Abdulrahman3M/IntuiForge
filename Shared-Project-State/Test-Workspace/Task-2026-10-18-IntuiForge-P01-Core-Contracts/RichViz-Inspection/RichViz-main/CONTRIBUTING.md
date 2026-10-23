# Contributing to Rich Visualization Library

Original RichViz material is licensed under Apache-2.0 as described in `LICENSE` and `NOTICE`. Contributions to original project material are submitted under Apache-2.0 unless the contributor explicitly states otherwise. Do not claim or relicense third-party components; preserve each upstream license and notice.

Keep changes small and focused. Add a schema definition, renderer route, named example, documentation page, and tests together for each new visualization type. Run `npm test` and `npm run validate:registry`. For renderer or gallery changes, start `npm run gallery` and exercise the affected type at desktop and mobile widths, including keyboard and RTL when applicable.

Never add vendor distributions to `src/`. Keep each engine in its own `External-Libraries/<id>/active/` directory with its upstream license and notices. Record all bundled assets and licenses in `Assets/catalog.json`.
