# API

## Convenience API

```js
import { RichViz } from "../src/RichVisualization.js";
const handle = RichViz.render("#host", spec, { lang: "en", dir: "ltr", onError(error) {} });
handle.dispose();
```

`container` is a selector or DOM element. `spec` is validated object data or JSON text. `render()` returns a handle with `ready`, `refresh()`, and `dispose()`. Invalid text throws an Error carrying an `errors` array. Dispose when the owning view is removed.

## Explicit lifecycle API

```js
import { validateVisualizationSource, mountVisualization } from "../src/RichVisualization.js";
const result = validateVisualizationSource(sourceText);
if (!result.ok) showErrors(result.errors);
else {
  const handle = mountVisualization(host, result.spec, { lang, dir, resolveMedia, onError });
  await handle.ready;
}
```

`hydrateArticleFigure()` is for inert `<figure>` blocks with a `<template class="article-diagram__source">`. `mountMermaid()` preserves the minimal legacy Mermaid host. `ensureStyles()` can preload the shared stylesheet.

## Specification shape

```json
{"version":1,"type":"step-guide","title":"Example","description":"A short accessible explanation.","options":{"showTitle":true},"data":{"steps":[{"title":"Prepare","text":"Check the materials."}]}}
```

Use `src/RichVisualizationSchema.js` for the complete type definitions, limits, option validation, engine capabilities, and text alternative generation. Unknown fields are rejected and the validator returns normalized data.
