# P11 — AI Article Authoring Studio & Export

P11 adds an optional authoring package to the host-agnostic engine. It authors and edits the existing portable `intui.article` v1 contract; it does not introduce a parallel article model, a CMS dependency, or executable content.

## Public package

```js
import {
  ARTICLE_TEMPLATES,
  createArticleFromTemplate,
  createArticlePrompt,
  createAuthoringSession,
  exportArticlePackage,
  importArticlePackage,
  mountArticleAuthoringStudio,
} from "@intuiforge/engine/authoring";
```

The same API is available through the source entry point `packages/authoring/src/index.js`; TypeScript declarations are in `packages/authoring/src/index.d.ts`.

## AI authoring contract

`createArticlePrompt({ request, locale })` returns an offline prompt contract for one JSON `intui.article` envelope at `schemaVersion: "1.0.0"`. It requires stable unique IDs, supported declarative block fields and allowlisted events, and explicitly prohibits article HTML/CSS/JavaScript, dynamic expressions, comments, and prose around the JSON object. The engine remains responsible for validation and rendering; the prompt is not a trust boundary.

## Import, export, and version behavior

- `importArticlePackage(source, options)` delegates JSON, the documented single `intui-article` Markdown manifest, objects, and host asset policy to the shared `parseArticleSource` / `validateArticle` path.
- `exportArticlePackage(article, { format })` returns `{ ok, value }` or the validator's structured issues. Formats are `json` and `markdown`; Markdown output is a single JSON manifest fence so a valid roundtrip does not lose sections or block IDs.
- Export preserves the complete validated article envelope, including metadata, source records, assets, initial/derived state, IDs, block props, bindings, and declared events. Filenames derive only from a sanitized article ID.
- Article v1 is validated losslessly. No other schema migration is registered; unsupported versions fail with `UNSUPPORTED_SCHEMA_VERSION` at `/schemaVersion` and are never silently rewritten.

## Templates

`ARTICLE_TEMPLATES` contains validated, immutable starters for a general article, a single-choice quiz, a local knowledge map, and a bounded mathematical science graph. `createArticleFromTemplate(id, options)` returns a fresh validated copy; `options` can set `articleId`, `title`, `locale`, and `dir`.

## In-memory draft lifecycle

`createAuthoringSession(article, { maxHistory })` clones a valid starting article. Edits are copied as JSON-compatible data only; snapshots returned by `getDraft()` / `getPublished()` are copies, not internal mutable references. History is bounded to 1–100 entries (50 by default). `update()` can retain a schema-invalid JSON draft so the caller can report/correct its precise validator issues; `publish()` validates first and leaves the previous published snapshot unchanged on failure. A valid publish is an explicit in-memory transition only—there is no local storage, server request, account, or automatic write.

## Visual studio

```js
const studio = mountArticleAuthoringStudio(container, {
  article,
  theme: "system", // light | dark | system
  onExport(bundle) { /* optional explicit host handoff */ },
});
await studio.ready;
// studio.draft / studio.published / studio.validation / studio.rendererId
await studio.dispose();
```

The isolated Shadow DOM editor provides title/summary/section/block editing, declarative JSON fields for component props/bindings/events, add/remove controls, templates, JSON/Markdown import/export, undo/redo, a generated AI contract, validation diagnostics with field locators, and explicit publish. The inspector displays event descriptors but does not execute them. Invalid draft data is not passed to the preview; the last valid preview remains visible with a clear stale-preview state.

Preview mounts `createIntuiEngine({ validateArticle })` with the same registered `org.intuiforge.article` renderer used by normal article rendering. It is not a separate mock renderer. Theme changes remount and dispose that renderer cleanly. The interface uses the existing light/dark token palette, CSS Shadow DOM isolation, native keyboard-operable controls, visible focus, 16px meaningful text, and a responsive 3→2→1-column layout.

## Safety and host boundaries

- Article source is inert validated JSON/Markdown; no `innerHTML`, `eval`, `Function`, arbitrary event handlers, endpoint fetches, local storage, or implicit persistence is used by the authoring studio.
- The P11 browser fixture uses only `127.0.0.1` and project-owned assets/modules.
- Optional export delivery belongs to the explicit `onExport` host callback; without it, the browser creates a user-triggered local download. Nothing is sent to a service.
- Existing article v1 schema, renderer, routes, safe asset policy, RichViz adapter and host APIs remain the source of truth.

## Verification

Run `npm run test:p11` for the authoring API gate and `npm test` for all phase regressions. The real-browser P11 fixture is `tests/browser/p11.html`; its observable check runner is `window.P11_RUN_CHECKS()`. Browser evidence and exact viewport/profile/network results are recorded in `Reports/P11-Completion.md`.
