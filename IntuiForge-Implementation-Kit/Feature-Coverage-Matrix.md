# Feature Coverage Ledger

**Tracked capabilities:** 114. P00–P15 are complete. Per-feature status and test/report evidence are in `Feature-Traceability.csv`, `Feature-Traceability.json`, and `Reports/P15-Feature-Audit.csv`.

| ID | Phase | Requirement | Observable gate |
|---|---|---|---|
| BASE-01 | P00 | Source ZIP inventory & integrity | SHA-256, tree, unsafe entry scan and licenses reported before any edit |
| BASE-02 | P00 | RichViz 0.5.0 core preservation | All existing documented types, examples, APIs and test outcomes inventoried and protected |
| BASE-03 | P00 | Host-agnostic compatibility surface | Audit a framework-neutral browser mount API and legacy RichViz contract; no specific host is required |
| BASE-04 | P00 | Clean new IntuiForge project | No source overwritten; import decisions based on audited actual ZIP |
| BASE-05 | P00 | Third-party licenses & offline libraries | Apache original + each external license provenance/redistribution evaluated |
| BASE-06 | P00 | Agent instructions & pending work | Nested AGENTS/CLAUDE/Codex instructions and working-tree status recorded |
| CORE-01 | P01 | Modular engine kernel & lifecycle | mount/refresh/dispose with no orphan listeners |
| CORE-02 | P01 | Component/extension registry | Module registers components by stable ID/version/capabilities |
| CORE-03 | P01 | Renderer & adapter abstraction | Vendor engines remain behind isolated adapters |
| CORE-04 | P01 | React Islands optional | Complex React component mounts only inside island; no whole-host React migration |
| CORE-05 | P01 | Public package & stable APIs | Documented versioned exports plus RichViz compatibility façade |
| CORE-06 | P01 | Error boundary & capability fallback | Module failure produces localized useful fallback without page crash |
| ART-01 | P02 | Versioned portable article package | kind+schemaVersion+id+locale+content/media metadata validated |
| ART-02 | P02 | JSON and Markdown coexistence | edu-viz and proposed intui-article fence parsed safely |
| ART-03 | P02 | Canonical block/component IDs | Stable uniqueness across nested article and deep-link targets |
| ART-04 | P02 | Universal input validation | Strings AND JS objects validated, normalized and rejected on unknown fields |
| ART-05 | P02 | Schema migrations | Known older article versions migrate losslessly or fail with explicit diagnostic |
| ART-06 | P02 | Accessible text/JS-off fallback contract | Article has meaningful static accessible narrative |
| ART-07 | P02 | Safe media and resource manifest | Type/source/provenance/license/integrity/alt metadata |
| ART-08 | P02 | Source-location errors | Validation reports paths, severity, fix hints without pretending autocorrect |
| UI-01 | P03 | Premium GPT-6-inspired Intelligent UI aesthetic | Coherent high-quality editorial UI; no claim proprietary pixel-perfect cloning |
| UI-02 | P03 | 16px minimum article text | Article body, cards, captions, tooltips and graph textual labels >=16 CSS px unless owner overrides |
| UI-03 | P03 | Responsive adaptive layout | 320/360/768/1024/1440 widths no destructive overflow of content |
| UI-04 | P03 | RTL/LTR plus mixed-script handling | Arabic content correctly laid out; LTR tech paths preserved |
| UI-05 | P03 | Theme bridge and isolation | Light/dark/system and host tokens; no CSS leakage |
| UI-06 | P03 | Visual hierarchy/spacing/component states | Tokens, interaction surfaces, focus, hover, disabled, busy and error states |
| UI-07 | P03 | Design reference gallery | Representative snapshots with clear pass/fail visual checklist |
| INT-01 | P04 | Central scoped reactive store | One state update propagates to dependent widgets synchronously |
| INT-02 | P04 | Declarative events/actions | Allowlisted setState/nextStep/selectOption/filter/submit/navigate/scroll/expand/media |
| INT-03 | P04 | Secure expression engine | AST/operator allowlist; no eval, new Function or arbitrary injected JS |
| INT-04 | P04 | Computed graph & cycles | Topological computation with cycle failure, dependency isolation and bounds |
| INT-05 | P04 | Multi-widget data binding | Slider changes text, metric and plot from single variable |
| INT-06 | P04 | Async data/error semantics | Idle/loading/ready/empty/error/retry and user consent for external fetches |
| INT-07 | P04 | State lifecycle and cleanup | No leaked subscriptions after navigating or disposing |
| DOC-01 | P05 | Full interactive article composition | Article combines prose, blocks, visuals and active components |
| DOC-02 | P05 | TOC/navigation/sections | In-page navigation, section anchors and ordered chapter sequence |
| DOC-03 | P05 | Dynamic/nested/conditional blocks | Tabs/accordion/groups/conditionals driven from shared state |
| DOC-04 | P05 | Portable rendering | Same article renders in standalone mode and a compatible web host without host-specific content rewrites |
| DOC-05 | P05 | Progressive hydration/print fallback | Content readable before JS and as accessible print/export |
| DOC-06 | P05 | Text/media and visualization coexistence | Graphs and prose exchange state via declared bindings |
| DOC-07 | P05 | Stable deep links | Internal and cross-article links use stable IDs |
| WGT-01 | P06 | Smart table | Sort, search, filter, page/virtualize and accessible export |
| WGT-02 | P06 | Forms/inputs/sliders/selects | Controlled validation and no arbitrary executable onChange |
| WGT-03 | P06 | Interactive calculators | Safe deterministic operators with input bounds/units/results |
| WGT-04 | P06 | Reactive comparisons | Side-by-side/overlay conditional comparison bound to data |
| WGT-05 | P06 | Buttons/menus/tooltips/dialogs | Semantics, gestures, keyboard, focus and accessible labels |
| WGT-06 | P06 | Data filters and KPI widgets | Filters update metrics and plots together |
| WGT-07 | P06 | Stateful tabs/accordion/cards | Existing components reused, extended and accessible |
| EDU-01 | P07 | Interactive stepper | Switch step updates text/media/graph/progress linked by stable ID |
| EDU-02 | P07 | Quiz/scoring/explanations | Multiple question types, deterministic scoring, correct feedback |
| EDU-03 | P07 | Flashcards | Flip/review/keyboard support and optional adapter persistence |
| EDU-04 | P07 | Interactive timelines | Navigate dates/events and synchronize media/visuals |
| EDU-05 | P07 | Drag-drop and matching | Pointer + keyboard equivalent, reorder and match validation |
| EDU-06 | P07 | Learning progress | Per session stable progress model; user save adapter optional |
| EDU-07 | P07 | Interactive guided comparisons | Learner explores scenarios and sees rationale |
| VIZ-01 | P08 | Existing 14 visual types | All types compatible or explicit equivalent/fallback with regression evidence |
| VIZ-02 | P08 | Six external chart/diagram engines | Mermaid, XYFlow, Chart.js, Recharts, ECharts, Plotly adapters supported |
| VIZ-03 | P08 | Native SVG renderer | Accessible dependency-free fallback for supported chart types |
| VIZ-04 | P08 | Interactive knowledge-map article | Pan/zoom/pinch, nodes, edges, node summaries, article deep links |
| VIZ-05 | P08 | Large canvas/automatic layout | Viewport, optional minimap, scalable node layout & zoom fit |
| VIZ-06 | P08 | Rich dashboards & diagrams | Infographics, graphs, KPI views responsive and state-bindable |
| VIZ-07 | P08 | Shared control bar | Zoom, Fit, Fullscreen, static/interactive toggles, text alt where supported |
| SCI-01 | P09 | 2D simulations | Bounded deterministic simulation with run/pause/reset |
| SCI-02 | P09 | 3D viewer/models | Orbit/pan/zoom, loading/fallback, safe model formats/assets |
| SCI-03 | P09 | Geographic map extension | Layers, markers, interaction, offline/online graceful behavior |
| SCI-04 | P09 | Mathematical graphs | Function/procedure input safe parsing; live graphs and units |
| SCI-05 | P09 | Physics learning modules | Representative parameter-driven experiment |
| SCI-06 | P09 | Chemistry/molecule viewer | Molecular structure with labels and accessible description |
| SCI-07 | P09 | Biology/anatomy viewer | Hierarchical parts/highlighting and 2D text alternative |
| SCI-08 | P09 | Animation timeline controller | Playback, seek, speed, pause, reduced motion |
| MED-01 | P10 | Audio/video playback | Captions/transcripts and accessible controls |
| MED-02 | P10 | Media speed control | Icon-only with clear label, accessible list of speeds and keyboard support |
| MED-03 | P10 | Annotated images/scenes | Interactive hotspots and description alternatives |
| MED-04 | P10 | Scientific citations/footnotes | Numbered references, links, sources and focus behavior |
| MED-05 | P10 | Mathematics notation | Accessible math markup and error behavior |
| MED-06 | P10 | Code and technical blocks | Syntax-safe display, copy action, no execution of untrusted code |
| MED-07 | P10 | Image/media asset management | Relative-path resolution, licensing, integrity, offline resources |
| AI-01 | P11 | AI-exportable declarative article format | ChatGPT can author spec offline; actual behavior rendered by IntuiForge |
| AI-02 | P11 | Import/export roundtrip | Stable IDs, same semantics, lossless supported fields and version checks |
| AI-03 | P11 | Visual Article Editor | Edit blocks and data without hand-changing JS source |
| AI-04 | P11 | Live Preview | Same renderer preview with safe draft isolation |
| AI-05 | P11 | Component Inspector | Validated props, binding viewer, event preview and errors |
| AI-06 | P11 | Template library | Multi-use article/quiz/map/science templates with valid schemas |
| AI-07 | P11 | Validation error/report before publish | Invalid content blocked and exact corrective messages |
| AI-08 | P11 | Undo/redo and draft handling | Safe edit history and no published-data mutation until explicit action |
| HOST-01 | P12 | Generic host integration contract | Mounts through the public browser API with explicit host capabilities; no CMS/framework dependency |
| HOST-02 | P12 | Any-host portable integration | Vanilla DOM API; no mandatory site framework conversion |
| HOST-03 | P12 | Legacy RichViz/edu-viz adapter | Existing markdown visualizations continue to render |
| HOST-04 | P12 | Optional progress persistence adapter | Per-user data outside article and not in RichViz content source |
| HOST-05 | P12 | React island lifecycle | Uses React only when required within contained component |
| HOST-06 | P12 | Host-owned application services | The host retains its CMS, storage, search, identity and user data; IntuiForge does not assume or duplicate them |
| NFR-01 | P13 | Security validation all pathways | PASS — hostile JSON/object/Markdown/plugin/media paths bounded and tested; see P13 report and focused suite |
| NFR-02 | P13 | CSP, sanitization, sandbox, URL policies | PASS — CSP blocks inline script; unsafe SVG rejected with/without SRI; nonce styles and local URL policy verified |
| NFR-03 | P13 | Resource caps & performance | PASS — input/media caps, cancellation/disposal regression; final trace LCP 164ms, CLS 0.00 |
| NFR-04 | P13 | Accessibility tests | PASS — Lighthouse 52/52, visible keyboard focus, alternatives, >=16px text, 24px RichViz buttons |
| NFR-05 | P13 | Localization, Arabic & bidirectional text | PASS — Arabic RTL, English LTR, mixed-token isolation verified |
| NFR-06 | P13 | Offline and lazy-load | PASS — loopback-only assets; mounted article remains usable offline and unavailable local media degrades to readable text |
| NFR-07 | P13 | Automated focused & E2E tests | PASS — `test:p13` 5/5, full suite 116/116, live browser and visual evidence |
| NFR-08 | P13 | Secure browser profile testing | PASS — dedicated Edge process/CDP/profile, navigation and inline screenshot verified |
| SHOW-01 | P14 | Premium article showcase | PASS — dedicated Edge rendered all five scenes; responsive evidence and inline visual inspection recorded |
| SHOW-02 | P14 | Visual regression reference | PASS — inline screenshots captured/inspected at 360/768/1440 px in light/dark and RTL/LTR with focus/error states; widths 320/360/768/1024/1440 show no overflow or text clipping |
| SHOW-03 | P14 | Interactive GPT-6-style semantics | PASS — dedicated Edge interaction checks pass for science, language, map, data, fallback, theme and locale |
| SHOW-04 | P14 | Reject previous HTML style | PASS — browser evidence reports legacyHtmlStyleReference=false |
| SHOW-05 | P14 | No false equivalence claims | PASS — browser evidence reports proprietaryParity=false |
| REL-01 | P15 | Reproducible package | Versioned outputs install/run offline where supported |
| REL-02 | P15 | Migration/rollback | Non-destructive change and rollback instructions verified |
| REL-03 | P15 | License compliance | Third-party bundled licenses and attribution retained |
| REL-04 | P15 | Complete traceability audit | Every feature has executable test evidence or explicit unresolved status |
| REL-05 | P15 | Release documentation | Quick start, architecture, API, component gallery, samples, migration |
| REL-06 | P15 | Final project governance & logs | Follow canonical CID/NID/RID/version/build rules if present |
| VIZ-08 | P08 | Visual Browser and asset catalogs | Preserve and extend searchable/previewable diagram/icon/SVG/sticker galleries with stable IDs/metadata |
| VIZ-09 | P08 | Original + third-party icon provenance | Preserve distinct interface glyphs, application icons, diagrams, illustrations and sticker catalogs with notices |
| HOST-07 | P12 | First install and differential update workflow | Existing host adapters and installed RichViz copies can upgrade safely; reproducible no-destructive-path rollback |
| REL-07 | P15 | Local visual gallery launcher and docs | Keep working visual browser/server.py/Start Website.bat where present; test actual Windows launch |

## P09 execution update — 2026-10-19

SCI-01 through SCI-08 are implemented and individually `PASS`; focused and full automated suites pass. The local real-browser fixture passes all 28 interaction assertions and all eight components mount. Responsive measurements pass at 360/768/1440 px, and the desktop full-page screenshot was captured and visually inspected. The required 360 px and 768 px viewport screenshots remain unavailable because the authorized Edge screenshot connector stalled; P09 therefore remains `PARTIALLY COMPLETE`, and P10 remains `NOT_STARTED`. Evidence: `Reports/P09-Completion.md`, `Execution-State/P09-feature-ledger.json`, and `tests/browser/p09.js`.

## P10 execution update — 2026-10-19


MED-01 through MED-07 are implemented and individually `PASS`. Focused P10 tests pass 7/7; full suite 93/93; P02 12/12, P05 5/5, and P09 17/17. The authorized AI Edge fixture verified RTL and LTR, native media playback and WebVTT loading, captions/transcripts, speed keyboard interaction, hotspot/zoom behavior, citation focus in both directions, code copy, MathML/fallback, integrity-checked local image, dark theme and 390 px mobile layout without overflow or text below 16 px. Screenshots were captured and visually inspected in the browser tool; the connector returned them inline but denied saving under this workspace. The owner explicitly authorized P10 while P09 remained `PARTIALLY COMPLETE`; P09 is unchanged and P11 remains `NOT_STARTED`. Evidence: `Reports/P10-Completion.md`, `Execution-State/P10-feature-ledger.json`, and `tests/p10-rich-media.test.mjs`.

## P11 execution update — 2026-10-20

AI-01 through AI-08 are implemented and individually PASS. P11 focused tests pass 7/7, the complete suite 100/100, and regressions P02 12/12, P05 5/5, P10 7/7. The verified dedicated Edge fixture passed 28/28 observable assertions in Arabic RTL and English LTR. Responsive widths 320/360/768/1024/1440 had no horizontal overflow; meaningful text remained at least 16px, primary touch target at least 44px, focus was visible, console was empty and all 46 requests per session were loopback-only. Inline screenshots were visually inspected; connector denied persistent PNG saving under Reports. Evidence: Reports/P11-Completion.md, Execution-State/P11-feature-ledger.json, Execution-State/P11-execution-ledger.md, and tests/p11-authoring.test.mjs.

## P12 execution update — 2026-10-20

HOST-01 through HOST-07 are implemented and individually PASS. `npm run test:p12` passes 11/11, `npm run test:p05` 5/5, `npm run test:p07` 10/10, and the full suite passes 111/111. Dedicated Edge browser fixtures pass for vanilla HTML and a framework-managed island; the no-script fallback contains no scripts and remains readable. Responsive checks at 320/360/768/1024/1440 px pass with 16px article text and no horizontal overflow. Host navigation, theme updates, `edu-viz`/RichViz 0.5.0 coexistence, opt-in per-user progress save/restore, and both rollback branches pass. Browser console is empty and all fixture requests remain on project loopback. Evidence: `Reports/P12-Completion.md`, `Execution-State/P12-feature-ledger.json`, `Execution-State/P12-execution-ledger.md`, `tests/p12-host-integration.test.mjs`, and `tests/browser/p12-host-fixtures.js`.

## P13 execution update — 2026-10-20

NFR-01 through NFR-08 are implemented and individually PASS. `npm run test:p13` passes 5/5 and the full suite passes 116/116. The dedicated Edge fixture passed CSP, SRI and no-SRI SVG sanitization, nonce, RichViz, keyboard, Arabic RTL, English LTR, mixed bidi, offline, and responsive checks at 320/360/768/1024/1440 px with no horizontal overflow and no visible text below 16px. Mobile Lighthouse passed 52/52 audits with all reported categories at 100; the final performance trace measured LCP 164ms and CLS 0.00 at 1x CPU. All 57 fixture requests were loopback-only. Offline emulation also confirmed that a missing local image produces readable fallback text without leaking its URL. The full-page screenshot was returned inline and visually inspected; no persistent image path is claimed. Evidence: `Reports/P13-Completion.md`, `Execution-State/P13-feature-ledger.json`, `Execution-State/P13-execution-ledger.md`, `tests/p13-hardening.test.mjs`, and `tests/browser/p13.*`.
