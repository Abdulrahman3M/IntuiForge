# Custom visual composition

**Category:** E7  
**Rendering:** Static and interactive  
**Renderer:** `composite`

## Description

Trunk-based development favours short branches; Git Flow uses long-lived release branches.

## Best use cases

Use this type when its structure matches the information learners need to understand. Avoid using a visual encoding that implies relationships the data does not support.

## Features

- responsive
- accessible text
- rtl
- theme aware
- interaction

## Limitations

- This type accepts only the fields defined by its schema.
- Interactive engine features depend on the corresponding local engine being available.
- Chart kinds requiring radar or scatter support cannot use Native SVG.

## Configuration

See the [schema definition](../../src/schema/) and the current [engine matrix](../ENGINES.md). Dimensions, chart engine, display title, and data fields are constrained by the validated type.

## Example

Open the [gallery preview](../../src/gallery/index.html#example-custom) for a rendered example, or inspect the [source specification](../../Examples/core/custom.json).

```js
import { RichViz } from "../../src/RichVisualization.js";
import { EXAMPLES } from "../../src/RichVisualizationExamples.js";
const view = RichViz.render("#visualization", EXAMPLES["custom"]);
```

## Variations and responsive behavior

The example gallery includes themed variants, narrow viewport rendering, and chart engine selection. Layout uses responsive components and local horizontal scrolling for intrinsically wide diagrams.

## Accessibility

Every visualization requires a title and description and exposes a text alternative. Keep meaningful labels in the data, preserve keyboard focus and test screen-reader output when introducing new interactions.

## Related types

- [Infographic-style explanation](infographic.md)

## Source specification

```json
{
  "version": 1,
  "type": "custom",
  "title": "Branch strategies compared",
  "description": "Trunk-based development favours short branches; Git Flow uses long-lived release branches.",
  "data": {
    "layout": "grid",
    "columns": 2,
    "blocks": [
      {
        "block": "card",
        "title": "Trunk-based",
        "subtitle": "Short-lived branches",
        "icon": "git-merge",
        "tone": "success",
        "text": "Merge small changes to main many times a day.",
        "status": {
          "text": "Fast feedback",
          "state": "ok"
        }
      },
      {
        "block": "card",
        "title": "Git Flow",
        "subtitle": "Long-lived branches",
        "icon": "git-branch",
        "tone": "violet",
        "text": "Separate develop, release and hotfix branches.",
        "status": {
          "text": "More ceremony",
          "state": "warn"
        }
      },
      {
        "block": "group",
        "title": "Compare in detail",
        "layout": "stack",
        "blocks": [
          {
            "block": "tabs",
            "items": [
              {
                "label": "Release cadence",
                "icon": "calendar",
                "blocks": [
                  {
                    "block": "progress",
                    "label": "Trunk-based",
                    "value": 90,
                    "tone": "success"
                  },
                  {
                    "block": "progress",
                    "label": "Git Flow",
                    "value": 45,
                    "tone": "violet"
                  }
                ]
              },
              {
                "label": "Risk",
                "icon": "alert",
                "blocks": [
                  {
                    "block": "callout",
                    "title": "Watch out",
                    "text": "Long-lived branches drift and make merges painful.",
                    "tone": "warning",
                    "icon": "alert"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "block": "list",
        "items": [
          "Pick one strategy per team",
          "Automate the checks",
          "Keep branches small"
        ],
        "ordered": true
      }
    ]
  }
}
```
