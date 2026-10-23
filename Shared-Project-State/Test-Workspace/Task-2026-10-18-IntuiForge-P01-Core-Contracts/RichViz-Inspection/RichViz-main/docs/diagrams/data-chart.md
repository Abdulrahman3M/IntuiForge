# Data-driven visualization

**Category:** F9  
**Rendering:** Static  
**Renderer:** `chart-adapters/svg`

## Description

Traffic is low at night, rises through the morning and peaks in the early afternoon.

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

Open the [gallery preview](../../src/gallery/index.html#example-data-chart) for a rendered example, or inspect the [source specification](../../Examples/core/data-chart.json).

```js
import { RichViz } from "../../src/RichVisualization.js";
import { EXAMPLES } from "../../src/RichVisualizationExamples.js";
const view = RichViz.render("#visualization", EXAMPLES["data-chart"]);
```

## Variations and responsive behavior

The example gallery includes themed variants, narrow viewport rendering, and chart engine selection. Layout uses responsive components and local horizontal scrolling for intrinsically wide diagrams.

## Accessibility

Every visualization requires a title and description and exposes a text alternative. Keep meaningful labels in the data, preserve keyboard focus and test screen-reader output when introducing new interactions.

## Related types

- [Bar / comparison chart](bar-chart.md)

## Source specification

```json
{
  "version": 1,
  "type": "data-chart",
  "title": "Requests per hour through the day",
  "description": "Traffic is low at night, rises through the morning and peaks in the early afternoon.",
  "options": {
    "engine": "chartjs"
  },
  "data": {
    "chart": "area",
    "labels": [
      "00",
      "04",
      "08",
      "12",
      "16",
      "20"
    ],
    "unit": "k",
    "axis": {
      "x": "Hour",
      "y": "Requests (thousands)"
    },
    "series": [
      {
        "name": "Requests",
        "values": [
          4,
          2,
          18,
          46,
          39,
          14
        ],
        "tone": "info"
      },
      {
        "name": "Errors",
        "values": [
          0.1,
          0.1,
          0.4,
          1.2,
          0.8,
          0.3
        ],
        "tone": "danger"
      }
    ]
  }
}
```
