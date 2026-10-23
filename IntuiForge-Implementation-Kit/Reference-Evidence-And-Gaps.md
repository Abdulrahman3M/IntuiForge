# Source Evidence, Historical Context & Unverified Items

## Evidence inspected by handoff author
- Owner repository `Abdulrahman3M/Universal-AI-ToolKit`: `01-Skills-General/create-strict-implementation-handoff/SKILL.md` v1.4.0; `token-optimization/SKILL.md` v1.0.1; `browser-environment-manager/SKILL.md` v1.0.1. The name the owner paraphrased as “Create a Script Implementation Handoff” corresponds to current `create-strict-implementation-handoff`.
- `Abdulrahman3M/RichViz` README, package, architecture, API, engines and source registry/schema/renderers/live runtime/styles. Main currently describes `Rich Visualization Library` v0.5.0, 14 visualization types, 6 engines. GitHub repo contents may be newer/older than owner's ZIP.
- Prior discussion: full intelligent articles, state, interactive calculators/tables/form inputs, React Islands, RichViz existing visualizations, educational and scientific plugins, AI import/export and professional GPT-6-inspired UI, adaptive RTL, 16px minimum article fonts, Word/Markdown preservation, local/offline.
- Additional previously expressed requirement: roadmap.sh-like knowledge map supporting touch pan/pinch zoom, node summaries, links to full articles and automated layout; native local Visual Browser gallery; component/source metadata; separate original/extended examples, no destructive replacement; professional diagrams and stable reference IDs.

## Hyperlinks for verification
- [RichViz README](https://github.com/Abdulrahman3M/RichViz/blob/main/README.md)
- [RichViz Architecture](https://github.com/Abdulrahman3M/RichViz/blob/main/docs/ARCHITECTURE.md)
- [RichViz Registry](https://github.com/Abdulrahman3M/RichViz/blob/main/src/RichVisualizationRegistry.js)
- [RichViz Schema](https://github.com/Abdulrahman3M/RichViz/blob/main/src/RichVisualizationSchema.js)
- [RichViz Runtime](https://github.com/Abdulrahman3M/RichViz/blob/main/src/RichVisualization.js)
- [RichViz Styles](https://github.com/Abdulrahman3M/RichViz/blob/main/src/rich-visualization.css)
- [Implementation Handoff Skill](https://github.com/Abdulrahman3M/Universal-AI-ToolKit/blob/main/01-Skills-General/create-strict-implementation-handoff/SKILL.md)
- [Token Optimization Skill](https://github.com/Abdulrahman3M/Universal-AI-ToolKit/blob/main/01-Skills-General/token-optimization/SKILL.md)
- [Browser Environment Manager Skill](https://github.com/Abdulrahman3M/Universal-AI-ToolKit/blob/main/01-Skills-General/browser-environment-manager/SKILL.md)

## Known risks / negative evidence
- `RichViz.render()` currently uses validation for input string but object path sets `{ok:true,spec}` directly — requires correction once verified in owner's actual ZIP.
- `.rev` sets 16px base but `.rev-card__text{font-size:.92em}` and `.rev__note{font-size:.9em}`, etc. fall below 16px — repair centrally in design phase, test computed styles.
- `step-guide` currently allows card selection but selection does not update a general shared article state/plot, and `custom` has tabs+accordion, not a general calculator/quiz.
- Previous locally generated HTML artifact `richviz_intelligent_ui.html` is explicitly rejected as a style precedent by the owner. It may be kept for tracing text only, and never used for CSS/layout imitation.

## Unknown until P00 execution
1. Exact ZIP content/files/source hashes and whether changes beyond `main` exist.
2. Existing local AGENTS/CLAUDE rules and developer history systems and whether source is clean.
3. Current approved dedicated Edge AI environment **identity** (historically an IB-Edge-Debug profile, 9222, but must verify config, process, CDP and actual profile).
4. License redistribution/compatibility for every optional downloaded vendor/plugin.
5. Whether P12 can run the host-neutral acceptance fixtures in a plain HTML page and an independent framework-managed page without modifying an unrelated host project.
Do not invent answers to unknowns; the P00 phase resolves evidence, not product decisions.
