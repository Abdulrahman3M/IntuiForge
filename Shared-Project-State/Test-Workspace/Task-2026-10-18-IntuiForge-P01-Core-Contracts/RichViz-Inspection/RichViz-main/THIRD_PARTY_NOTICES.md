# Third-party software notices

Copyright © 2026 Abdulrahman ElBatrah applies only to original RichViz material. This file identifies bundled upstream software; RichViz does not claim ownership of these components. Each component retains its own license. The upstream license and notice files named below are included in the repository and must remain with the corresponding software when redistributed.

| Bundled component | Version evidence | Upstream license | Preserved license/notice files |
| --- | --- | --- | --- |
| Chart.js | 4.5.1 (bundle banner) | MIT | `External-Libraries/chartjs/active/LICENSE.md` |
| Mermaid | Vendored browser ESM distribution; embedded upstream chunks | MIT | `External-Libraries/mermaid/active/LICENSE` |
| Apache ECharts | Vendored browser distribution | Apache-2.0; embedded D3 subcomponents under BSD-3-Clause | `External-Libraries/echarts/active/LICENSE`, `NOTICE`, and `licenses/LICENSE-d3` |
| Plotly.js | 4.1.1 (bundle banner) | MIT; the embedded MapLibre GL JS component is BSD-3-Clause, with Mapbox BSD-3-Clause, d3-color BSD-3-Clause, and glfx.js MIT components | `External-Libraries/plotly/active/LICENSE`, `THIRD-PARTY-NOTICES.txt`, and `licenses/LICENSE-maplibre.txt` |
| React Flow / XYFlow | `@xyflow/react` 12.11.6; `@xyflow/system` 0.0.82 | MIT; dependencies include ISC and BSD-3-Clause | `External-Libraries/react-flow/active/THIRD-PARTY-NOTICES.txt` (dependency list and full upstream texts) |
| Recharts | 3.10.1 | MIT; dependencies include ISC and BSD-3-Clause | `External-Libraries/recharts/active/THIRD-PARTY-NOTICES.txt` (dependency list and full upstream texts) |
| React, ReactDOM, scheduler, Zustand and other React Flow runtime dependencies | Versions and license identifiers are enumerated in the React Flow notice file | MIT | `External-Libraries/react-flow/active/THIRD-PARTY-NOTICES.txt` |
| Captiva application and web icons (231 unique 256×256 PNG files) | Pinned upstream commit `3d78e9f625ed5d36cc4d3c8523c1835f212342c3`; icon pack page reports Captiva Icons Pack, 174 icons | GPL-3.0+ | `Assets/Application-Icons/Captiva/LICENSE` and `Assets/Application-Icons/Captiva/README.md`; per-file provenance and hashes in `Assets/catalog.json` |

The Captiva icon assets are unchanged third-party files and remain under GPL-3.0+ in their own collection. Their individual SHA-256 hashes are recorded to guard against exact duplicate files. The official upstream repository declares GPL-3.0+; IconArchive's referenced pack page reports GPL/Open Source and attributes the pack to bokehlicia. See the per-collection README and license. Application/software brand artwork may also implicate trademark rights separate from copyright licenses.

The React Flow and Recharts bundled dependency notices identify individual transitive packages, versions, SPDX license identifiers, upstream locations, copyright notices, and license texts. They include MIT, ISC, and BSD-3-Clause components. The `victory-vendor@37.3.6` package declares `MIT AND ISC`; its MIT notice is reproduced in the Recharts notice file, and the bundled D3 ISC license texts are retained there for the ISC-licensed implementation components.

Plotly.js's preserved bundled-license block also identifies `native-promise-only`, `polybooljs`, `ieee754`, `buffer`, `safe-buffer`, Node's `assert` comparison utility, `object-assign`, `pad-left`, `repeat-string`, and MapLibre GL JS. Their embedded upstream attributions remain in `plotly.min.js` and are copied into `External-Libraries/plotly/active/THIRD-PARTY-NOTICES.txt`; MapLibre's complete license and the bundled Mapbox/d3-color/glfx.js terms are retained separately in `licenses/LICENSE-maplibre.txt`. Mermaid's preserved ESM chunks contain their MIT license comments alongside the upstream MIT license file. The Captiva collection is GPL-3.0+ and is kept with its own full license and provenance, separate from original Apache-2.0 material.

## RichViz integration modifications

- `react-flow-editor.js` and its stylesheet are adapted from the upstream XYFlow/React Flow distribution: the viewer CSS namespace is changed from `ib-flow-viewer` to `richviz-flow-viewer`, and the editor uses RichViz's shared local React runtime. See the file-level modification notices and the preserved dependency notices.
- `recharts.js` is adapted from upstream Recharts to use `globalThis.__RICHVIZ_SHARED_REACT__` and the same shared runtime. See the file-level modification notice and preserved dependency notices.

These modifications do not replace upstream licenses or copyrights. They are described to satisfy upstream modified-file notice conditions. Vendor snapshots remain outside `src/` and are loaded locally; no CDN is required.

## Audit scope and result

The audit inspected every bundled engine directory, its license/NOTICE files, the bundled license blocks, both generated transitive-dependency notices, original-asset metadata, repository manifests, and references to licensing/provenance in the source and docs. The manifest declares no install-time npm dependencies (`package.json` is `private` and contains scripts only); runtime engines are vendored. All identified licenses are permissive (Apache-2.0, MIT, ISC, BSD-3-Clause) and no license incompatibility was found for the current private GitHub repository distribution, subject to the retained notices and upstream terms. The Mermaid artifact does not retain its package version metadata, so its exact version could not be independently established from the files available; its included license is MIT. This is a file-based compliance review, not a legal opinion or automated SBOM scan.
