# Pipeline diagram

**Category:** F6  
**Rendering:** Static  
**Renderer:** `richviz-native`

## Description

A browser request passes the load balancer and the application server, which reads the database and returns a response.

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

Open the [gallery preview](../../src/gallery/index.html#example-pipeline) for a rendered example, or inspect the [source specification](../../Examples/core/pipeline.json).

```js
import { RichViz } from "../../src/RichVisualization.js";
import { EXAMPLES } from "../../src/RichVisualizationExamples.js";
const view = RichViz.render("#visualization", EXAMPLES["pipeline"]);
```

## Variations and responsive behavior

The example gallery includes themed variants, narrow viewport rendering, and chart engine selection. Layout uses responsive components and local horizontal scrolling for intrinsically wide diagrams.

## Accessibility

Every visualization requires a title and description and exposes a text alternative. Keep meaningful labels in the data, preserve keyboard focus and test screen-reader output when introducing new interactions.

## Related types

- [Rich card-based process](process-cards.md)
- [Process flow cards](process-flow.md)
- [Step-by-step visual guide](step-guide.md)
- [Dashboard / KPI visualization](kpi-dashboard.md)

## Source specification

```json
{
  "version": 1,
  "type": "pipeline",
  "title": "Request path through a web service",
  "description": "A browser request passes the load balancer and the application server, which reads the database and returns a response.",
  "data": {
    "returnPath": {
      "label": "Response"
    },
    "stages": [
      {
        "title": "Browser",
        "subtitle": "Sends the request",
        "icon": "monitor",
        "tone": "info",
        "outputs": [
          "HTTP request"
        ],
        "linkLabel": "HTTPS"
      },
      {
        "title": "Load balancer",
        "subtitle": "Picks a healthy server",
        "icon": "network",
        "tone": "violet",
        "inputs": [
          "Request"
        ],
        "outputs": [
          "Routed request"
        ]
      },
      {
        "title": "App server",
        "subtitle": "Runs the business logic",
        "icon": "server",
        "tone": "teal",
        "active": true,
        "inputs": [
          "Routed request"
        ],
        "outputs": [
          "Query"
        ]
      },
      {
        "title": "Database",
        "subtitle": "Stores the data",
        "icon": "database",
        "tone": "orange",
        "status": {
          "text": "Healthy",
          "state": "ok"
        },
        "inputs": [
          "Query"
        ]
      }
    ]
  }
}
```
