# Dashboard / KPI visualization

**Category:** F7  
**Rendering:** Static  
**Renderer:** `richviz-native`

## Description

The learner has completed 62 percent of the objective; checks and security pass, one review is still pending.

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

Open the [gallery preview](../../src/gallery/index.html#example-kpi-dashboard) for a rendered example, or inspect the [source specification](../../Examples/core/kpi-dashboard.json).

```js
import { RichViz } from "../../src/RichVisualization.js";
import { EXAMPLES } from "../../src/RichVisualizationExamples.js";
const view = RichViz.render("#visualization", EXAMPLES["kpi-dashboard"]);
```

## Variations and responsive behavior

The example gallery includes themed variants, narrow viewport rendering, and chart engine selection. Layout uses responsive components and local horizontal scrolling for intrinsically wide diagrams.

## Accessibility

Every visualization requires a title and description and exposes a text alternative. Keep meaningful labels in the data, preserve keyboard focus and test screen-reader output when introducing new interactions.

## Related types

- [Rich card-based process](process-cards.md)
- [Process flow cards](process-flow.md)
- [Step-by-step visual guide](step-guide.md)
- [Pipeline diagram](pipeline.md)

## Source specification

```json
{
  "version": 1,
  "type": "kpi-dashboard",
  "title": "Learning objective: merge a pull request",
  "description": "The learner has completed 62 percent of the objective; checks and security pass, one review is still pending.",
  "data": {
    "current": {
      "title": "Learning objective",
      "subtitle": "Merge your first pull request safely",
      "icon": "target",
      "tone": "accent",
      "progress": {
        "value": 62,
        "label": "Objective progress"
      },
      "chips": [
        {
          "text": "Checks passing",
          "state": "ok"
        },
        {
          "text": "1 review pending",
          "state": "warn"
        },
        {
          "text": "Security clear",
          "state": "ok"
        }
      ]
    },
    "metrics": [
      {
        "label": "Lessons done",
        "value": 8,
        "unit": "/ 12",
        "icon": "book",
        "tone": "info",
        "delta": {
          "text": "+2 this week",
          "direction": "up",
          "tone": "success"
        }
      },
      {
        "label": "Quiz score",
        "value": 91,
        "unit": "%",
        "icon": "check-circle",
        "tone": "success",
        "progress": 91
      },
      {
        "label": "Open reviews",
        "value": 1,
        "icon": "eye",
        "tone": "warning",
        "note": "Waiting on a teammate"
      }
    ],
    "progress": [
      {
        "label": "Branching",
        "value": 100,
        "tone": "success"
      },
      {
        "label": "Pull requests",
        "value": 62,
        "tone": "info"
      },
      {
        "label": "Conflict resolution",
        "value": 20,
        "tone": "orange"
      }
    ],
    "statuses": [
      {
        "label": "CI",
        "state": "ok",
        "text": "Passing"
      },
      {
        "label": "Review",
        "state": "warn",
        "text": "Pending"
      },
      {
        "label": "Deploy",
        "state": "pending",
        "text": "Not started"
      }
    ]
  }
}
```
