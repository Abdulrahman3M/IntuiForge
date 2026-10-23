---
name: richviz-integration
description: Install Rich Visualization Library (Rich Viz) into a project for the first time, integrate its visualizations, or remove an existing integration. Use this skill for first-time installation and host adaptation; use richviz-updater for upgrading an already integrated copy.
---

# Rich Visualization Library Installation & Integration

Use this skill to integrate RichViz with minimal, reversible changes. Original RichViz material authored by Abdulrahman ElBatrah is licensed under Apache-2.0. Third-party engines and assets retain their own licenses and notices; verify redistribution rights before copying them.

## Required references

- Read `README.md`, `VERSION`, `src/registry.json`, `docs/API.md`, `docs/ENGINES.md`, `LICENSE`, and `Assets/catalog.json` before installation.
- For a type, inspect its `docs/diagrams/<type>.md` page and the named example under `Examples/`.
- Use bundled scripts in `Scripts/` when present. If integrating the skill from another checkout, the adjacent repository root is the canonical source.
- Browse available visuals and stable reference IDs in the [local Visual Reference Browser](../../visual-browser/README.md); start it only when a visual inventory helps select host content.

## Scope boundary

This skill handles the first installation into a host, integrations, and carefully proven removal. If Rich Viz is already present and the request is to update, upgrade, or migrate its version, stop before edits and follow [`../richviz-updater/SKILL.md`](../richviz-updater/SKILL.md). Do not treat an existing installation as a fresh copy target.

## Gate 1: inspect the host before editing

1. Identify framework, runtime, package/build tools, router, deploy base path, module format, and browser support from manifests and source.
2. Locate existing visualization engines, icon systems, styles, asset managers, CSP headers, and dependency governance. Inspect only relevant files and direct dependencies.
3. Confirm whether RichViz and required engine files already exist. Reuse a compatible installed copy; never add a second React/ReactDOM runtime, duplicate Mermaid/Chart.js/etc., or overwrite a managed vendor directory.
4. Map local static paths, base URLs, CSP `script-src`/`style-src`/`img-src`, offline requirements, lazy-loading conventions, themes, RTL handling, and accessible interaction patterns.
5. Check project policy, the RichViz license, and each vendor's own license/NOTICE. Do not use a CDN as a required source. Do not add an asset whose redistribution terms are unclear.
6. If license, ownership, redistribution, commercial status, or a breaking schema choice is unclear, stop before that dependent edit and report the precise conflict. Continue independent read-only audit and prepare a reversible proposal.

## Gate 2: choose and record an integration method

Prefer the least invasive method that fits the host:

1. A host package/build integration when the project has an established, license-compatible dependency workflow and bundling can preserve lazy loading.
2. A versioned local copy of `src/` plus only required `External-Libraries/<id>/active/` directories when the project serves static modules. Keep the original RichViz files under a named owned directory; record version and checksums in the host's existing dependency registry.
3. A local vendored archive only if the project already uses that pattern; retain all upstream license/NOTICE files and pin the release.

Do not install every engine by default. Choose only engines required by the target types. Keep the source and vendor library ownership boundaries clear.

## Gate 3: implement a narrow integration

1. Load `src/rich-visualization.css` once using the host's existing asset strategy.
2. Import `RichViz` from `src/RichVisualization.js` and render validated source into an existing host element. Example:

   ```js
   import { RichViz } from "./richviz/src/RichVisualization.js";
   const handle = RichViz.render(container, spec, { lang, dir, onError });
   // Call handle.dispose() when that component/page is removed.
   ```

3. Prefer `RichViz.validate(source)` before save, and keep the editable JSON adjacent to the content that owns it. Do not store generated screenshots as the only source.
4. Keep rendering on demand: dynamically import RichViz only where the feature is used; do not mount hidden galleries or unrelated trees. Dispose handles and listeners on route/component teardown.
5. Resolve chart/diagram engines using adapter-relative paths from the same origin. Preserve offline/local behavior and CSP. Do not insert user-provided HTML, JavaScript, raw SVG, or arbitrary CSS.
6. Keep fallback text, keyboard access, focus, reduced motion, theme and RTL behavior. Supply meaningful title, description, and alt text for media.
7. Add only directly necessary styles. Prefix host additions; do not rewrite global CSS or the router.

## Static and interactive modes

- Mermaid, SVG, cards, flows, charts, infographic, and annotation types support a static presentation; charts expose a text data table.
- React Flow and selected node/custom compositions may provide interaction. Load shared React/XYFlow lazily only for the interactive type. Preserve a static fallback if the engine cannot load.
- Native SVG supports bar, horizontal bar, stacked bar, line, area, pie, and doughnut. Radar and scatter need a compatible external chart engine.
- `src/registry.json` and `docs/ENGINES.md` are the compatibility authority; don't infer support from a vendor's general capabilities.

## Validation and tests

1. Run `node scripts/validate-registry.mjs` and the focused integration test for the host. Validate every inserted spec through `RichViz.validate()`.
2. Confirm local responses for the CSS, runtime, selected renderer chunk, adapter, engine script/module, and media assets. Check CSP console errors and absence of requests to remote CDNs.
3. Exercise an affected static example, chart fallback, interactive lifecycle/dispose when used, keyboard path, narrow viewport, light/dark theme, and RTL if the host supports it.
4. Confirm no duplicate libraries, global overflow, console errors, broken links, unhandled promise rejections, or unexpected requests. Run only targeted suites and report untested combinations honestly.
5. Record the RichViz version, chosen engines, file paths, checksum/manifest changes, checks run, and rollback steps in the host's normal change record.

## Uninstall

1. Search for RichViz imports, fences/spec data, CSS links, adapter URLs, registry entries, CSP entries, and scheduled loaders.
2. Remove only RichViz-owned files and references proven unused. Preserve saved source specs and vendor files still used by another feature.
3. Re-run directly affected tests and search again for stale references. Report leftovers and data migration needs.

## Troubleshooting

- **Blank frame:** inspect `data-rev-state`, validation results, network path, CSP, and lazy import errors; retain the text alternative.
- **Missing chart engine:** confirm the adapter path and exact local library id/file; switch to a compatible engine or native SVG kind.
- **Duplicate React warning:** use one shared React runtime for XYFlow and Recharts; remove the duplicate import only after dependency usage is verified.
- **Media missing:** resolve paths against the content package root; check safe relative path validation, HTTP status, and meaningful alt text.
- **Overflow:** check the containing width, `min-width:0`, and local scroll container; test 390 px and RTL.
- **Theme mismatch:** check host theme tokens and trigger supported refresh; do not add type-specific global overrides as a first fix.
- **CSP block:** serve required local scripts/styles/assets and document exact policy additions. Never suggest weakening CSP globally.

## Related workflow

For an already installed copy, use the separate [Rich Viz Updater](../richviz-updater/SKILL.md). It maps the adapted host paths and local changes before updating.

## Report format

Report host stack, chosen installation method and version, diagram types/engines installed, exact files changed, validation evidence, accessibility/responsive checks, license/assets review, rollback path, limitations, and any unresolved decision gate.
