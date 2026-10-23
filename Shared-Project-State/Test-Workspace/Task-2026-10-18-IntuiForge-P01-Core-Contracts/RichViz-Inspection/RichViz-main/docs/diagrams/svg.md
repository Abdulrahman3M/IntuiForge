# SVG illustration

**Category:** SVG  
**Rendering:** Static  
**Renderer:** `svg`

## Description

A client sends a request to a server and the server sends back a response.

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

Open the [gallery preview](../../src/gallery/index.html#example-svg) for a rendered example, or inspect the [source specification](../../Examples/core/svg.json).

```js
import { RichViz } from "../../src/RichVisualization.js";
import { EXAMPLES } from "../../src/RichVisualizationExamples.js";
const view = RichViz.render("#visualization", EXAMPLES["svg"]);
```

## Variations and responsive behavior

The example gallery includes themed variants, narrow viewport rendering, and chart engine selection. Layout uses responsive components and local horizontal scrolling for intrinsically wide diagrams.

## Accessibility

Every visualization requires a title and description and exposes a text alternative. Keep meaningful labels in the data, preserve keyboard focus and test screen-reader output when introducing new interactions.

## Related types

- [Annotated visual explanation](annotated.md)

## Source specification

```json
{
  "version": 1,
  "type": "svg",
  "title": "Client and server exchange",
  "description": "A client sends a request to a server and the server sends back a response.",
  "data": {
    "viewBox": [
      0,
      0,
      640,
      220
    ],
    "elements": [
      {
        "type": "rect",
        "x": 30,
        "y": 60,
        "width": 160,
        "height": 100,
        "rx": 16,
        "fill": "info",
        "opacity": 0.25,
        "stroke": "info",
        "strokeWidth": 2
      },
      {
        "type": "text",
        "x": 110,
        "y": 116,
        "text": "Client",
        "size": 22,
        "weight": "bold"
      },
      {
        "type": "rect",
        "x": 450,
        "y": 60,
        "width": 160,
        "height": 100,
        "rx": 16,
        "fill": "teal",
        "opacity": 0.25,
        "stroke": "teal",
        "strokeWidth": 2
      },
      {
        "type": "text",
        "x": 530,
        "y": 116,
        "text": "Server",
        "size": 22,
        "weight": "bold"
      },
      {
        "type": "line",
        "x1": 195,
        "y1": 90,
        "x2": 445,
        "y2": 90,
        "stroke": "violet",
        "strokeWidth": 3,
        "arrow": true
      },
      {
        "type": "text",
        "x": 320,
        "y": 78,
        "text": "Request",
        "size": 15
      },
      {
        "type": "line",
        "x1": 445,
        "y1": 135,
        "x2": 195,
        "y2": 135,
        "stroke": "success",
        "strokeWidth": 3,
        "arrow": true,
        "dash": true
      },
      {
        "type": "text",
        "x": 320,
        "y": 160,
        "text": "Response",
        "size": 15
      }
    ]
  }
}
```
