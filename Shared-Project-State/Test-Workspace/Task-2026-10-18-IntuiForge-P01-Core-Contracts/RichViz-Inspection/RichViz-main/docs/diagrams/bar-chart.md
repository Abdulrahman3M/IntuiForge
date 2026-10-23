# Bar / comparison chart

**Category:** F8  
**Rendering:** Static  
**Renderer:** `chart-adapters/svg`

## Description

Model C costs the least per month, Model A the most; values are in US dollars.

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

Open the [gallery preview](../../src/gallery/index.html#example-bar-chart) for a rendered example, or inspect the [source specification](../../Examples/core/bar-chart.json).

```js
import { RichViz } from "../../src/RichVisualization.js";
import { EXAMPLES } from "../../src/RichVisualizationExamples.js";
const view = RichViz.render("#visualization", EXAMPLES["bar-chart"]);
```

## Variations and responsive behavior

The example gallery includes themed variants, narrow viewport rendering, and chart engine selection. Layout uses responsive components and local horizontal scrolling for intrinsically wide diagrams.

## Accessibility

Every visualization requires a title and description and exposes a text alternative. Keep meaningful labels in the data, preserve keyboard focus and test screen-reader output when introducing new interactions.

## Related types

- [Data-driven educational visualization](data-chart.md)

## Source specification

```json
{
  "version": 1,
  "type": "bar-chart",
  "title": "Monthly cost by model",
  "description": "Model C costs the least per month, Model A the most; values are in US dollars.",
  "options": {
    "engine": "chartjs"
  },
  "data": {
    "chart": "bar",
    "unit": "$",
    "labels": [
      "Model A",
      "Model B",
      "Model C"
    ],
    "series": [
      {
        "name": "Monthly cost",
        "values": [
          240,
          120,
          60
        ]
      }
    ],
    "highlight": 2,
    "axis": {
      "y": "Cost (USD)"
    }
  }
}
```
