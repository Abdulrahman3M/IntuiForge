# Infographic-style explanation

**Category:** F12  
**Rendering:** Static  
**Renderer:** `composite`

## Description

Version control keeps history, supports teamwork, and makes it safe to experiment.

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

Open the [gallery preview](../../src/gallery/index.html#example-infographic) for a rendered example, or inspect the [source specification](../../Examples/core/infographic.json).

```js
import { RichViz } from "../../src/RichVisualization.js";
import { EXAMPLES } from "../../src/RichVisualizationExamples.js";
const view = RichViz.render("#visualization", EXAMPLES["infographic"]);
```

## Variations and responsive behavior

The example gallery includes themed variants, narrow viewport rendering, and chart engine selection. Layout uses responsive components and local horizontal scrolling for intrinsically wide diagrams.

## Accessibility

Every visualization requires a title and description and exposes a text alternative. Keep meaningful labels in the data, preserve keyboard focus and test screen-reader output when introducing new interactions.

## Related types

- [Custom visual composition](custom.md)

## Source specification

```json
{
  "version": 1,
  "type": "infographic",
  "title": "Why use version control",
  "description": "Version control keeps history, supports teamwork, and makes it safe to experiment.",
  "data": {
    "columns": 3,
    "intro": {
      "title": "Three reasons teams adopt Git",
      "text": "Each one removes a common risk of working on shared files.",
      "icon": "git-branch",
      "tone": "accent"
    },
    "sections": [
      {
        "title": "History",
        "subtitle": "Never lose work",
        "icon": "clock",
        "tone": "info",
        "metric": {
          "value": "100",
          "unit": "%",
          "label": "Recoverable"
        },
        "text": "Every change is saved, so you can go back to any earlier state."
      },
      {
        "title": "Teamwork",
        "subtitle": "Work in parallel",
        "icon": "users",
        "tone": "violet",
        "items": [
          {
            "label": "Branches",
            "value": "Unlimited"
          },
          {
            "label": "Reviews",
            "value": "Built in"
          },
          {
            "label": "Merges",
            "text": "Combine work safely"
          }
        ]
      },
      {
        "title": "Safety",
        "subtitle": "Experiment freely",
        "icon": "shield",
        "tone": "success",
        "steps": [
          "Create a branch",
          "Try the idea",
          "Keep it or discard it"
        ],
        "progress": {
          "value": 85,
          "label": "Confidence"
        }
      }
    ]
  }
}
```
