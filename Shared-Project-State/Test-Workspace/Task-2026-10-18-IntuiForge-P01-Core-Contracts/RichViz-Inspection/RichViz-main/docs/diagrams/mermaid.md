# Mermaid diagram

**Category:** F1  
**Rendering:** Static  
**Renderer:** `mermaid`

## Description

A feature branch is created from main, receives commits and is merged back into main.

## Best use cases

Use this type when its structure matches the information learners need to understand. Avoid using a visual encoding that implies relationships the data does not support.

## Features

- responsive
- accessible text
- rtl
- theme aware

## Limitations

- This type accepts only the fields defined by its schema.
- Interactive engine features depend on the corresponding local engine being available.
- Chart kinds requiring radar or scatter support cannot use Native SVG.

## Configuration

See the [schema definition](../../src/schema/) and the current [engine matrix](../ENGINES.md). Dimensions, chart engine, display title, and data fields are constrained by the validated type.

## Example

Open the [gallery preview](../../src/gallery/index.html#example-mermaid) for a rendered example, or inspect the [source specification](../../Examples/core/mermaid.json).

```js
import { RichViz } from "../../src/RichVisualization.js";
import { EXAMPLES } from "../../src/RichVisualizationExamples.js";
const view = RichViz.render("#visualization", EXAMPLES["mermaid"]);
```

## Variations and responsive behavior

The example gallery includes themed variants, narrow viewport rendering, and chart engine selection. Layout uses responsive components and local horizontal scrolling for intrinsically wide diagrams.

## Accessibility

Every visualization requires a title and description and exposes a text alternative. Keep meaningful labels in the data, preserve keyboard focus and test screen-reader output when introducing new interactions.

## Related types

- See the full [diagram catalog](../../README.md#diagram-catalog).

## Source specification

```json
{
  "version": 1,
  "type": "mermaid",
  "title": "Git branching sequence",
  "description": "A feature branch is created from main, receives commits and is merged back into main.",
  "data": {
    "source": "flowchart LR\n  A[main] --> B(create feature branch)\n  B --> C[commit work]\n  C --> D{review ok?}\n  D -- yes --> E[merge into main]\n  D -- no --> C"
  }
}
```
