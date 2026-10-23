# Rich card-based process

**Category:** F3  
**Rendering:** Static  
**Renderer:** `richviz-native`

## Description

Claude Code writes its progress to a shared project state, and Codex reads that state before continuing the work.

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

Open the [gallery preview](../../src/gallery/index.html#example-process-cards) for a rendered example, or inspect the [source specification](../../Examples/core/process-cards.json).

```js
import { RichViz } from "../../src/RichVisualization.js";
import { EXAMPLES } from "../../src/RichVisualizationExamples.js";
const view = RichViz.render("#visualization", EXAMPLES["process-cards"]);
```

## Variations and responsive behavior

The example gallery includes themed variants, narrow viewport rendering, and chart engine selection. Layout uses responsive components and local horizontal scrolling for intrinsically wide diagrams.

## Accessibility

Every visualization requires a title and description and exposes a text alternative. Keep meaningful labels in the data, preserve keyboard focus and test screen-reader output when introducing new interactions.

## Related types

- [Process flow cards](process-flow.md)
- [Step-by-step visual guide](step-guide.md)
- [Pipeline diagram](pipeline.md)
- [Dashboard / KPI visualization](kpi-dashboard.md)

## Source specification

```json
{
  "version": 1,
  "type": "process-cards",
  "title": "Shared project state between two coding agents",
  "description": "Claude Code writes its progress to a shared project state, and Codex reads that state before continuing the work.",
  "data": {
    "group": {
      "title": "Hand-off between agents",
      "subtitle": "One source of truth",
      "icon": "workflow",
      "tone": "accent"
    },
    "orientation": "vertical",
    "stages": [
      {
        "title": "Claude Code",
        "subtitle": "Implements the change and records what is finished",
        "icon": "terminal",
        "tone": "violet",
        "status": {
          "text": "Done",
          "state": "ok"
        }
      },
      {
        "title": "Shared project state",
        "subtitle": "Files, notes and the task list that both agents read",
        "icon": "database",
        "tone": "info",
        "active": true,
        "status": {
          "text": "Source of truth",
          "tone": "info"
        }
      },
      {
        "title": "Codex",
        "subtitle": "Reads the state, reviews and continues from the same point",
        "icon": "code",
        "tone": "teal",
        "progress": {
          "value": 40,
          "label": "Review"
        }
      }
    ]
  }
}
```
