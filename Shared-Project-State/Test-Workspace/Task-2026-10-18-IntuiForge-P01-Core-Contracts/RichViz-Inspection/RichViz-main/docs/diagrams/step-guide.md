# Step-by-step visual guide

**Category:** F5  
**Rendering:** Static  
**Renderer:** `richviz-native`

## Description

Create a branch, commit the change, push it and open the pull request for review.

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

Open the [gallery preview](../../src/gallery/index.html#example-step-guide) for a rendered example, or inspect the [source specification](../../Examples/core/step-guide.json).

```js
import { RichViz } from "../../src/RichVisualization.js";
import { EXAMPLES } from "../../src/RichVisualizationExamples.js";
const view = RichViz.render("#visualization", EXAMPLES["step-guide"]);
```

## Variations and responsive behavior

The example gallery includes themed variants, narrow viewport rendering, and chart engine selection. Layout uses responsive components and local horizontal scrolling for intrinsically wide diagrams.

## Accessibility

Every visualization requires a title and description and exposes a text alternative. Keep meaningful labels in the data, preserve keyboard focus and test screen-reader output when introducing new interactions.

## Related types

- [Rich card-based process](process-cards.md)
- [Process flow cards](process-flow.md)
- [Pipeline diagram](pipeline.md)
- [Dashboard / KPI visualization](kpi-dashboard.md)

## Source specification

```json
{
  "version": 1,
  "type": "step-guide",
  "title": "Open a pull request in four steps",
  "description": "Create a branch, commit the change, push it and open the pull request for review.",
  "data": {
    "steps": [
      {
        "title": "Create a branch",
        "text": "Work on a separate branch so main stays stable.",
        "icon": "git-branch",
        "tone": "violet",
        "tip": "Name it after the change."
      },
      {
        "title": "Commit the change",
        "text": "Save a small, focused snapshot with a clear message.",
        "icon": "git-commit",
        "tone": "info"
      },
      {
        "title": "Push to GitHub",
        "text": "Send the branch to the shared repository.",
        "icon": "upload",
        "tone": "teal",
        "active": true
      },
      {
        "title": "Open the pull request",
        "text": "Ask teammates to review and merge the branch.",
        "icon": "git-pull-request",
        "tone": "success",
        "status": {
          "text": "Ready for review",
          "state": "ok"
        }
      }
    ]
  }
}
```
