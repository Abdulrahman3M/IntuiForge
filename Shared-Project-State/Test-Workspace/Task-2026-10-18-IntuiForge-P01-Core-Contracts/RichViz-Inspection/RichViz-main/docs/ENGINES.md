# Engine compatibility

| Adapter | Local package | Purpose | Notes |
|---|---|---|---|
| Mermaid | `External-Libraries/mermaid/active/` | Text-authored flow, sequence, state, ER, Gantt and other Mermaid diagrams | Strict security configuration; static SVG output |
| React Flow / XYFlow | `External-Libraries/react-flow/active/` | Interactive node graph viewer | React bundle loaded only on demand |
| Chart.js | `External-Libraries/chartjs/active/` | General charts | Supports all current chart kinds including radar and scatter |
| Recharts | `External-Libraries/recharts/active/` | React-composed charts | Uses the bundled shared runtime; notices are included |
| ECharts | `External-Libraries/echarts/active/` | Interactive charts / larger data | Includes upstream NOTICE and bundled d3 license |
| Plotly | `External-Libraries/plotly/active/` | Analytical charts | Check supported chart-kind mapping in schema |
| Native SVG | `src/renderers/ChartNative.js` | Dependency-free fallback | Bar, horizontal bar, stacked bar, line, area, pie, doughnut; no radar/scatter |

Adapters load on demand. `auto` selects one compatible engine; renderer errors fall back to native SVG or a data table where available. This list reports the current implementation, not a promise about all future upstream engine capabilities.
