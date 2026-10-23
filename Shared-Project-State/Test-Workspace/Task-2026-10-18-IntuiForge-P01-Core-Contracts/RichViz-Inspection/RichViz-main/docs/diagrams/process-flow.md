# Process flow cards

**Category:** F4  
**Rendering:** Static  
**Renderer:** `richviz-native`

## Description

Checks run first. If they pass and a reviewer approves, the change is merged; otherwise the author fixes it and runs the checks again.

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

Open the [gallery preview](../../src/gallery/index.html#example-process-flow) for a rendered example, or inspect the [source specification](../../Examples/core/process-flow.json).

```js
import { RichViz } from "../../src/RichVisualization.js";
import { EXAMPLES } from "../../src/RichVisualizationExamples.js";
const view = RichViz.render("#visualization", EXAMPLES["process-flow"]);
```

## Variations and responsive behavior

The example gallery includes themed variants, narrow viewport rendering, and chart engine selection. Layout uses responsive components and local horizontal scrolling for intrinsically wide diagrams.

## Accessibility

Every visualization requires a title and description and exposes a text alternative. Keep meaningful labels in the data, preserve keyboard focus and test screen-reader output when introducing new interactions.

## Related types

- [Rich card-based process](process-cards.md)
- [Step-by-step visual guide](step-guide.md)
- [Pipeline diagram](pipeline.md)
- [Dashboard / KPI visualization](kpi-dashboard.md)

## Source specification

```json
{
  "version": 1,
  "type": "process-flow",
  "title": "Should this change be merged?",
  "description": "Checks run first. If they pass and a reviewer approves, the change is merged; otherwise the author fixes it and runs the checks again.",
  "data": {
    "direction": "TB",
    "nodes": [
      {
        "id": "start",
        "title": "Change ready",
        "icon": "flag",
        "tone": "info",
        "shape": "pill"
      },
      {
        "id": "checks",
        "title": "Automated checks",
        "subtitle": "Tests, lint, security",
        "icon": "list-check",
        "tone": "violet"
      },
      {
        "id": "pass",
        "title": "Checks pass?",
        "shape": "diamond",
        "tone": "warning"
      },
      {
        "id": "review",
        "title": "Peer review",
        "subtitle": "A teammate approves",
        "icon": "users",
        "tone": "teal"
      },
      {
        "id": "fix",
        "title": "Fix and push again",
        "icon": "wrench",
        "tone": "danger"
      },
      {
        "id": "merge",
        "title": "Merge",
        "icon": "git-merge",
        "tone": "success",
        "shape": "pill"
      }
    ],
    "edges": [
      {
        "from": "start",
        "to": "checks"
      },
      {
        "from": "checks",
        "to": "pass"
      },
      {
        "from": "pass",
        "to": "review",
        "label": "Yes",
        "tone": "success"
      },
      {
        "from": "pass",
        "to": "fix",
        "label": "No",
        "tone": "danger"
      },
      {
        "from": "fix",
        "to": "checks",
        "dashed": true
      },
      {
        "from": "review",
        "to": "merge"
      }
    ]
  }
}
```
