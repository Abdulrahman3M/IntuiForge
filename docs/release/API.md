# Public API reference

The root `package.json` `exports` map is authoritative. `@intuiforge/engine` is version `1.0.0`; the portable article envelope remains independently versioned at schema `1.0.0`. All package imports resolve from local files.

| Import | Main exports |
|---|---|
| `@intuiforge/engine` or `/v1` | `createIntuiEngine`, lifecycle/registry contracts |
| `/article` | `validateArticle`, article parser and normalization |
| `/article/schema` | Versioned JSON Schema document |
| `/article-renderer` | Article renderer registration, static rendering, widgets and render helpers |
| `/design-system` | Semantic tokens, scoped styles, reference gallery and showcase |
| `/state` | Reactive store, declarative action dispatcher, bindings and resources |
| `/scientific` | Bounded science simulations, graph and spatial helpers |
| `/authoring` | Import/export, templates, draft history and editor helpers |
| `/host` | `createIntuiHost`, `mountIntuiArticle`, optional progress persistence adapter |
| `/react-island` | Contained optional React-island lifecycle |
| `/richviz` | RichViz v0.5.0 compatibility façade and visual catalog |

The declaration files adjacent to each entry are the detailed TypeScript contract. The core requires a trusted article validator and a registered renderer. Hosts supply routes, external resource loaders, optional persistence, language, direction, and theme; none is selected implicitly.

Example:

```js
import { validateArticle } from "@intuiforge/engine/article";
import { createIntuiHost, mountIntuiArticle } from "@intuiforge/engine/host";

const validation = validateArticle(articleObject);
if (!validation.ok) throw new Error("Article validation failed");
const host = createIntuiHost({ validateArticle });
const handle = await mountIntuiArticle(container, validation.value, { lang: "ar", dir: "rtl" });
// Await handle.dispose() and host.dispose() as part of host teardown.
```

Invalid articles return structured diagnostics with paths; callers should display a useful safe error state instead of bypassing validation. See [the article contract](../P02-Article-Format-And-Validation.md), [host integration](../P12-Portable-Host-Integrations-And-User-Progress.md), and [P01 API contracts](../P01-Core-Workspace-And-Extension-Contracts.md).
