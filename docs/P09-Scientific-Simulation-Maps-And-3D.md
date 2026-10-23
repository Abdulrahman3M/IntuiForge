# P09 — Scientific simulations, maps, and 3D

P09 adds eight optional scientific components to IntuiForge. The public article remains a versioned JSON contract; the article renderer does not execute article-provided HTML, JavaScript, math source, or network URLs. Scientific components are opt-in and are registered by the host.

## Registering the extension

```js
import { createIntuiEngine } from "@intuiforge/engine";
import { validateArticle } from "@intuiforge/engine/article";
import { registerArticleRenderer } from "@intuiforge/engine/article-renderer";
import { registerScientificPlugins } from "@intuiforge/engine/scientific";

const engine = createIntuiEngine({ validateArticle });
const unregisterScience = registerScientificPlugins(engine);
registerArticleRenderer(engine);
const handle = engine.mount(articleRoot, article, { document });

// On host teardown:
await handle.dispose();
unregisterScience();
await engine.dispose();
```

If a host does not register the extension, each scientific block retains a readable description fallback. Registering the extension does not modify the host's framework, routing, content store, or article source.

## Article blocks

All eight blocks require a short `description` (or readable block content), and labels/units are plain text. See [Scientific-Extension-Demo.json](../IntuiForge-Implementation-Kit/Examples/Scientific-Extension-Demo.json) for one complete, offline article.

| Block type | Supported data and behavior |
|---|---|
| `simulator2d` | Deterministic projectile trajectory; bounded speed/angle/gravity and run, pause, reset. |
| `model3d` | Local `intuiforge.mesh.v1` triangle mesh with orbit, pan, zoom, and reset; unsupported/missing models retain a text fallback. |
| `map` | Local WGS84 bounds, Point/LineString/Polygon features, visibility layers, markers, and an offline text alternative. |
| `mathGraph` | Safe arithmetic/function expression, editable formula, bounded sampling, and explicit x/y units. |
| `physicsExperiment` | Parameter controls and live projectile range/height results. |
| `chemistry` | Bounded atom/bond list, molecular formula, labels, keyboard-selectable atoms, and a text alternative. |
| `anatomy` | Bounded SVG shapes with acyclic parent hierarchy, part highlighting, and an ordered text alternative. |
| `animationTimeline` | Playback, pause, reset, seek, 0.5×/1×/2× speed, and `prefers-reduced-motion` handling. |

The validator rejects undeclared mesh vertices, unsupported fields and formula grammar, non-finite values, unsafe map endpoint properties, invalid coordinates, duplicate references, and cyclic anatomy. Scientific bounds are deliberately modest so a portable article cannot request an unbounded computation or SVG.

## Optional host data

There are no implicit fetches and no built-in map-tile/CDN dependency. A host may optionally expose `loadScientificModel(modelId, { signal, format })` or `loadMapData(mapId, { signal })` in the mount environment. A request occurs only after the learner activates the component's explicit load button. Returned model/map data is validated against the same local data contract; failure preserves the article description and any local map content. The article itself cannot choose an endpoint, URL, credential, or arbitrary source.

## Local checks

```powershell
npm run test:p09
npm test
```

The live fixture is `tests/browser/p09.html`; it is served by `tests/browser-server.mjs` on loopback and registers the same public extension API used by a host.
