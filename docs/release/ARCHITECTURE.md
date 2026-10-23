# IntuiForge architecture

The engine is a single private npm package with stable public subpath exports. IntuiForge-authored code and documentation use Apache License 2.0; third-party content keeps its own notices and license terms. The package stays host-neutral; its modules keep validation, lifecycle, content rendering, state, adapters, and host integration separated.

| Package area | Owner | Public entry |
|---|---|---|
| Kernel and component lifecycle | `packages/core/` | `@intuiforge/engine` and `/v1` |
| Portable article schema, parser, validation | `packages/article/` | `/article` and `/article/schema` |
| Article and static renderer | `packages/article-renderer/` | `/article-renderer` |
| Design tokens and reference gallery | `packages/design-system/` | `/design-system` |
| Reactive state and declarative actions | `packages/state/` | `/state` |
| Scientific extensions | `packages/scientific-plugins/` | `/scientific` |
| Safe authoring tools | `packages/authoring/` | `/authoring` |
| Framework-neutral host bridge | `packages/host-integration/` | `/host` |
| Optional React island | `packages/react-island/` | `/react-island` |
| RichViz compatibility adapter and local assets | `packages/visualization-legacy/` | `/richviz` |

`@intuiforge/engine` is the distribution boundary, not a mandate that consumers import one large entry point. Each subpath is explicit in the root `package.json` exports map. Relative internal imports and local assets stay together in the tarball so offline installations resolve without a CDN.

Articles pass the versioned validator before rendering. The article uses a declarative schema and allowlisted actions; it cannot execute authored JavaScript. The kernel owns mount/update/dispose lifecycle and error fallback. The article renderer composes validated blocks. The state runtime scopes values to an article. Visualization and science code is reached through registries and adapters. The host supplies routes, external resources, themes, and optional persistence; the engine does not infer those services.

RichViz v0.5.0 remains isolated behind its compatibility package. Its source APIs, engine libraries, assets, and notices remain under `packages/visualization-legacy/`. No package-wide license changes third-party terms.

See the [host integration guide](../P12-Portable-Host-Integrations-And-User-Progress.md) for lifecycle and capability contracts.
