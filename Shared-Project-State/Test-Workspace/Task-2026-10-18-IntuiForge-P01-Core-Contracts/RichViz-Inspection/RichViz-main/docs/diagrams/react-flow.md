# React Flow interactive diagram

**Category:** F2  
**Rendering:** Static and interactive  
**Renderer:** `react-flow/svg`

## Description

A commit moves from the working directory to the staging area, the local repository and then the remote repository.

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

Open the [gallery preview](../../src/gallery/index.html#example-react-flow) for a rendered example, or inspect the [source specification](../../Examples/core/react-flow.json).

```js
import { RichViz } from "../../src/RichVisualization.js";
import { EXAMPLES } from "../../src/RichVisualizationExamples.js";
const view = RichViz.render("#visualization", EXAMPLES["react-flow"]);
```

## Variations and responsive behavior

The example gallery includes themed variants, narrow viewport rendering, and chart engine selection. Layout uses responsive components and local horizontal scrolling for intrinsically wide diagrams.

## Accessibility

Every visualization requires a title and description and exposes a text alternative. Keep meaningful labels in the data, preserve keyboard focus and test screen-reader output when introducing new interactions.

## Related types

- [Interactive node map](node-map.md)

## Source specification

```json
{
  "version": 1,
  "type": "react-flow",
  "title": "Where a commit travels",
  "description": "A commit moves from the working directory to the staging area, the local repository and then the remote repository.",
  "data": {
    "graph": {
      "version": 1,
      "nodes": [
        {
          "id": "wd",
          "position": {
            "x": 0,
            "y": 0
          },
          "data": {
            "label": "Working directory",
            "subtitle": "Edit files",
            "icon": "folder",
            "tone": "info"
          }
        },
        {
          "id": "stage",
          "position": {
            "x": 330,
            "y": 0
          },
          "data": {
            "label": "Staging area",
            "subtitle": "git add",
            "icon": "layers",
            "tone": "violet"
          }
        },
        {
          "id": "local",
          "position": {
            "x": 660,
            "y": 0
          },
          "data": {
            "label": "Local repository",
            "subtitle": "git commit",
            "icon": "database",
            "tone": "teal"
          }
        },
        {
          "id": "remote",
          "position": {
            "x": 990,
            "y": 0
          },
          "data": {
            "label": "Remote repository",
            "subtitle": "git push",
            "icon": "cloud",
            "tone": "success",
            "status": {
              "text": "Shared",
              "state": "ok"
            }
          }
        }
      ],
      "edges": [
        {
          "id": "e1",
          "source": "wd",
          "target": "stage",
          "label": "add"
        },
        {
          "id": "e2",
          "source": "stage",
          "target": "local",
          "label": "commit"
        },
        {
          "id": "e3",
          "source": "local",
          "target": "remote",
          "label": "push",
          "animated": true
        }
      ]
    }
  }
}
```
