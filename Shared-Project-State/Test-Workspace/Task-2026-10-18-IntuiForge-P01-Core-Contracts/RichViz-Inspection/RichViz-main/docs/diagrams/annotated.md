# Annotated visual explanation

**Category:** F11  
**Rendering:** Static  
**Renderer:** `svg`

## Description

The pull request page shows the title, the changed files and the review status; numbered markers explain each area.

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

Open the [gallery preview](../../src/gallery/index.html#example-annotated) for a rendered example, or inspect the [source specification](../../Examples/core/annotated.json).

```js
import { RichViz } from "../../src/RichVisualization.js";
import { EXAMPLES } from "../../src/RichVisualizationExamples.js";
const view = RichViz.render("#visualization", EXAMPLES["annotated"]);
```

## Variations and responsive behavior

The example gallery includes themed variants, narrow viewport rendering, and chart engine selection. Layout uses responsive components and local horizontal scrolling for intrinsically wide diagrams.

## Accessibility

Every visualization requires a title and description and exposes a text alternative. Keep meaningful labels in the data, preserve keyboard focus and test screen-reader output when introducing new interactions.

## Related types

- [SVG illustration](svg.md)

## Source specification

```json
{
  "version": 1,
  "type": "annotated",
  "title": "Anatomy of a pull request page",
  "description": "The pull request page shows the title, the changed files and the review status; numbered markers explain each area.",
  "data": {
    "aspect": 1.6,
    "scene": {
      "viewBox": [
        0,
        0,
        640,
        400
      ],
      "elements": [
        {
          "type": "rect",
          "x": 10,
          "y": 10,
          "width": 620,
          "height": 380,
          "rx": 14,
          "fill": "neutral",
          "stroke": "neutral",
          "opacity": 0.12
        },
        {
          "type": "rect",
          "x": 30,
          "y": 30,
          "width": 580,
          "height": 56,
          "rx": 10,
          "fill": "info",
          "opacity": 0.25
        },
        {
          "type": "text",
          "x": 56,
          "y": 64,
          "text": "Add login validation  #42",
          "size": 22,
          "anchor": "start",
          "weight": "bold"
        },
        {
          "type": "rect",
          "x": 30,
          "y": 106,
          "width": 360,
          "height": 250,
          "rx": 10,
          "fill": "neutral",
          "opacity": 0.18
        },
        {
          "type": "line",
          "x1": 50,
          "y1": 150,
          "x2": 370,
          "y2": 150,
          "stroke": "success",
          "strokeWidth": 6
        },
        {
          "type": "line",
          "x1": 50,
          "y1": 190,
          "x2": 300,
          "y2": 190,
          "stroke": "danger",
          "strokeWidth": 6
        },
        {
          "type": "line",
          "x1": 50,
          "y1": 230,
          "x2": 340,
          "y2": 230,
          "stroke": "success",
          "strokeWidth": 6
        },
        {
          "type": "rect",
          "x": 410,
          "y": 106,
          "width": 200,
          "height": 250,
          "rx": 10,
          "fill": "warning",
          "opacity": 0.2
        },
        {
          "type": "icon",
          "name": "check-circle",
          "x": 430,
          "y": 130,
          "size": 30,
          "stroke": "success",
          "label": "Checks"
        },
        {
          "type": "icon",
          "name": "users",
          "x": 430,
          "y": 190,
          "size": 30,
          "stroke": "warning",
          "label": "Reviewers"
        }
      ]
    },
    "annotations": [
      {
        "x": 90,
        "y": 15,
        "title": "Title and number",
        "text": "Names the change and gives it a number you can reference.",
        "icon": "tag",
        "tone": "info"
      },
      {
        "x": 62,
        "y": 38,
        "title": "Changed lines",
        "text": "Green lines were added, red lines were removed.",
        "icon": "code",
        "tone": "success"
      },
      {
        "x": 93,
        "y": 62,
        "title": "Checks and reviewers",
        "text": "Automated checks and the people asked to review the change.",
        "icon": "shield",
        "tone": "warning"
      }
    ]
  }
}
```
