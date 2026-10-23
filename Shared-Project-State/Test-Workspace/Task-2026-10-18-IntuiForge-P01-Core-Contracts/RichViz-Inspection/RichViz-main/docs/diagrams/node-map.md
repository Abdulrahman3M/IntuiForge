# Interactive node map

**Category:** F10  
**Rendering:** Static and interactive  
**Renderer:** `react-flow/svg`

## Description

Repositories contain branches; branches hold commits; pull requests propose merging one branch into another.

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

Open the [gallery preview](../../src/gallery/index.html#example-node-map) for a rendered example, or inspect the [source specification](../../Examples/core/node-map.json).

```js
import { RichViz } from "../../src/RichVisualization.js";
import { EXAMPLES } from "../../src/RichVisualizationExamples.js";
const view = RichViz.render("#visualization", EXAMPLES["node-map"]);
```

## Variations and responsive behavior

Static node-map cards wrap subtitles into up to two lines and reserve enough height for group tags. SVG arrow marker anchors match the triangle tip so each edge meets the arrow through its center. Instructional text labels remain at least 16px. The interactive toolbar provides zoom and one fullscreen control; the graph fits automatically when opened and after entering fullscreen. The example gallery includes themed variants, narrow viewport rendering, and chart engine selection. Layout uses responsive components and local horizontal scrolling for intrinsically wide diagrams.

## Accessibility

Every visualization requires a title and description and exposes a text alternative. Keep meaningful labels in the data, preserve keyboard focus and test screen-reader output when introducing new interactions.

## Related types

- [React Flow interactive diagram](react-flow.md)

## Source specification

```json
{
  "version": 1,
  "type": "node-map",
  "title": "Git concepts map",
  "description": "Repositories contain branches; branches hold commits; pull requests propose merging one branch into another.",
  "data": {
    "layout": "layered",
    "direction": "LR",
    "groups": [
      {
        "id": "local",
        "label": "Local",
        "tone": "teal"
      },
      {
        "id": "remote",
        "label": "Remote",
        "tone": "info"
      }
    ],
    "nodes": [
      {
        "id": "repo",
        "label": "Repository",
        "subtitle": "All history",
        "icon": "database",
        "tone": "accent",
        "details": "A repository stores every commit and branch of a project."
      },
      {
        "id": "branch",
        "label": "Branch",
        "subtitle": "A line of work",
        "icon": "git-branch",
        "tone": "violet",
        "group": "local",
        "details": "A branch is a movable pointer to a commit."
      },
      {
        "id": "commit",
        "label": "Commit",
        "subtitle": "A snapshot",
        "icon": "git-commit",
        "tone": "teal",
        "group": "local",
        "details": "A commit records the project state and a message."
      },
      {
        "id": "remote",
        "label": "Remote",
        "subtitle": "Shared copy",
        "icon": "cloud",
        "tone": "info",
        "group": "remote",
        "details": "A remote is a copy of the repository hosted elsewhere."
      },
      {
        "id": "pr",
        "label": "Pull request",
        "subtitle": "Review and merge",
        "icon": "git-pull-request",
        "tone": "success",
        "group": "remote",
        "status": {
          "text": "Open",
          "state": "ok"
        },
        "details": "A pull request proposes merging one branch into another."
      }
    ],
    "edges": [
      {
        "from": "repo",
        "to": "branch",
        "label": "has"
      },
      {
        "from": "branch",
        "to": "commit",
        "label": "points to"
      },
      {
        "from": "repo",
        "to": "remote",
        "label": "syncs with"
      },
      {
        "from": "remote",
        "to": "pr",
        "label": "hosts"
      },
      {
        "from": "branch",
        "to": "pr",
        "label": "proposed in"
      }
    ]
  }
}
```
