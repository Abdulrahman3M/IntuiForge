# IntuiForge — Intelligent UI Engine

IntuiForge is a host-agnostic browser engine for intelligent articles and interactive UI. It is designed to mount into a standalone page or any compatible web project; no CMS, framework, or website is the required host.

P01 establishes the kernel, lifecycle, extension and renderer contracts, optional React islands, and an isolated RichViz 0.5.0 compatibility package. P02 adds the versioned portable article contract and safe validator as a separate package; hosts can inject `validateArticle` into the core without coupling the engine to a particular website or CMS.

P03 adds `@intuiforge/engine/design-system`: host-agnostic semantic design tokens, a Shadow DOM-isolated responsive visual reference gallery, light/dark/system themes, and an allowlisted host color-token bridge. Its styles do not rewrite host CSS or routes. See [the P03 design-system guide](docs/P03-Design-System.md).

P04 adds `@intuiforge/engine/state`: an article-scoped reactive store, bounded expression evaluator, allowlisted action dispatcher, shared block-binding coordinator, and host-injected async resource states. It runs no article JavaScript and performs no implicit fetch or host navigation. See [the P04 reactive runtime guide](docs/P04-Reactive-State-Events-And-Data-Binding.md).

P12 adds `@intuiforge/engine/host`, a vanilla DOM mount API, optional host-owned progress persistence, and a contained framework-island lifecycle. The host retains routes, identity, user data, and existing RichViz installations. See [the P12 host integration guide](docs/P12-Portable-Host-Integrations-And-User-Progress.md).

## Workspace

- `packages/core/` — engine lifecycle, registration contracts, capabilities, and safe error fallback.
- `packages/react-island/` — optional React root adapter. React is not a required dependency and does not take over the host page.
- `packages/visualization-legacy/` — RichViz compatibility façade and preserved local runtime/vendor packages.
- `packages/article/` — versioned portable article schema, JSON/Markdown parser, safe normalizer and validation diagnostics.
- `packages/design-system/` — shared visual tokens, scoped styles and interactive design reference gallery.
- `packages/state/` — scoped reactive state, safe derived expressions, declarative actions, bindings and async resource lifecycle.
- `packages/host-integration/` — host-neutral browser entry point and optional adapter for host-owned learning-progress storage.
- `tests/` — dependency-free Node tests and a browser smoke fixture.
- `IntuiForge-Implementation-Kit/` — phase requirements, architecture, and acceptance contracts.

## Public API

The private workspace package exports the stable core API at `@intuiforge/engine/v1`, the optional island at `@intuiforge/engine/react-island`, the preserved compatibility API at `@intuiforge/engine/richviz`, and capability-specific APIs at `@intuiforge/engine/design-system` and `@intuiforge/engine/state`. Release metadata is allocated; the package remains private and is not published to a registry.

The kernel requires a trusted validator and a registered default renderer before it can render content. A missing validator or renderer is reported through the localized fallback rather than treated as permissive validation. See [the P01 contract](docs/P01-Core-Workspace-And-Extension-Contracts.md) for the exact lifecycle and registration shapes.

Import `validateArticle` from `@intuiforge/engine/article` and pass it to `createIntuiEngine({ validateArticle })`. The public JSON Schema is exported at `@intuiforge/engine/article/schema`; article schema versioning is independent of the engine API version. P02 accepts normalized JSON, its documented Markdown manifest/fence format, and plain JavaScript objects through the same validator. External assets are rejected unless the host explicitly allows their HTTPS origin and the asset declares integrity metadata. See [the P02 article contract](docs/P02-Article-Format-And-Validation.md).

The design-system API exports immutable tokens, `createDesignSystemStyles()`, and `mountDesignReferenceGallery(container, options)`. The reference gallery uses an isolated Shadow DOM and can be embedded in any compatible page; `hostTokens` maps only supported color tokens and never changes the host container's styles. The gallery's state buttons preview visual states locally and do not run article actions or network requests.

The state API consumes a previously validated article. Each `createReactiveStore(article)` call creates an independent state scope; selectors and compiled article bindings update synchronously after a successful transaction. Derived values use the article's fixed operator AST. Host effects such as navigation, media, persistence, filtering and scrolling are inert unless the embedding project supplies the corresponding trusted capability handler. External loading uses a host-supplied loader and requires an explicit `{ consent: true }` call when configured as external. See the P04 guide for lifecycle and security details.

The host API exports `createIntuiHost`, `mountIntuiArticle`, and `createProgressPersistenceAdapter`. Hosts supply route and storage callbacks explicitly; IntuiForge does not choose `localStorage`, IndexedDB, cookies, a CMS, or an account system. Progress is loaded through the supplied adapter and saved only after an explicit article save action. See the P12 guide for install, update, and rollback steps.

P05 adds the host-neutral `@intuiforge/engine/article-renderer` package. See [the P05 renderer guide](docs/P05-Complete-Portable-Article-Renderer.md) for its mount, static-output, theme, adapter, and host-capability contracts.

## Release and migration

The private local release package is `@intuiforge/engine` version `1.0.0`. Run `npm run release:build` to create a reproducible offline-installable archive under `release/`; this does not publish the package. IntuiForge-authored code and documentation are licensed under Apache License 2.0; bundled components retain their own license terms. Start the local asset browser on Windows with `Start Visual Gallery.bat`. The [release quick start](docs/release/QUICKSTART.md), [API reference](docs/release/API.md), [gallery guide](docs/release/GALLERY.md), [migration/rollback guide](docs/release/MIGRATION.md), and [license guide](LICENSES/README.md) describe distribution and host integration.

## Verification

Requires Node.js 18+ and no package installation:

```powershell
npm test
npm run test:p01
npm run test:p02
npm run test:p03
npm run test:p04
npm run test:p12
```

`tests/browser/p01.html`, `p03.html`, `p12-plain.html`, `p12-framework.html`, and `p12-static.html` are ES-module smoke/reference fixtures served only on loopback with `node tests/browser-server.mjs`. P12 exercises plain HTML, a framework-managed island, and a static page with no scripts. Run browser checks only after the approved dedicated AI Edge process, CDP endpoint, and active profile are verified; never use the personal browser profile. `tests/browser/fallback.html` remains a file-safe P01 fallback check.
