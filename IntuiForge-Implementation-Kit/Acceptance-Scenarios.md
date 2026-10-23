# End-to-End User Acceptance Scenarios — Exact Functional Proof

These are **executable test story specifications** for the coding agent, not evidence they already pass. Link tests to the listed feature IDs and real runtime. Use fixture data only where labeled as examples; do not invent empirical statistics.

## A. Temperature as one connected article — P04/P05/P06
- Import `Examples/Temperature-Reactive-Article.json` via finalized P02 schema/migration; render a real article with prose, accessible slider, numerical temperature label, phase commentary and chart.
- Initial 25°C: label 25, liquid state, chart value 25. Change by keyboard/touch to −5°C: readout −5, freezing range explanation and plot must all update. Change to 105°C: range switches to boiling under simplified 1-atmosphere model. No second widget has copied state independently.
- Invalid 135° or malicious action is rejected; listener removed after `dispose`; remount does not duplicate event.
- RTL 360px mobile and 1440px desktop, dark/light, 16px text and tab order PASS; JS-off shows static explanation and limits honestly.

## B. Stellar life-cycle interactive article — P07/P08/P09/P10
- Steps are selectable by click, Enter, arrow navigation. Switching stage updates its explanation, visual highlight, timeline and progress simultaneously.
- Animated visualization follows reduced-motion preference, offers pause/reset and text-only alt. Place explanatory footnotes and science context adjacent to figure.
- Mini quiz: wrong answer displays feedback without false success; correct answer gives explanation and updated score; screen reader receives status; reset is deterministic.
- Scientific text must be reviewed against cited credible content **before publication**, especially differing low-/high-mass stellar endpoints; do not present illustrative schema as scientifically exhaustive.

## C. Knowledge map — P08/P12
- Drag canvas by mouse and touch; pinch zoom mobile; wheel zoom and fit view; graph remains within intended scroller. Node click opens summary and offers approved article link by ID.
- Keyboard can traverse nodes, open info and route to linked article; provide linear alternative. Unknown article ID displays safe missing-reference status, not a broken unhandled navigation.
- Optional automatic layout and minimap preserve meaningful node relations; 1000 nodes engages resource degradation/paging rather than freezing page. Test author-owned correct identifiers only.

## D. Arabic language activity — P07/P10/P12
- Audio controller: play/pause, icon-only speed button opens labeled list of allowed rates; selected speed updates playback. Press Escape closes and returns focus. Tooltips never clip inside a table.
- Cards flip with keyboard; matching/dnd offers full keyboard alternative; quiz explanations and score are correct; session progress persists only through explicit host adapter.
- No audio asset: display transcript/asset missing explanation, not an unresponsive playback control; Arabic text and Tashkeel legible with correct RTL.

## E. Data explorer — P06/P08
- Search, sort, paginate/filter in a table with stable keys; filter immediately updates corresponding KPI/chart. Keyboard sorting announces direction; export contains filtered/specified dataset per documented policy.
- Empty filter yields accessible empty state. Invalid non-numeric calculator input produces controlled error; no eval or arbitrary JS. Test 10k rows resource budget.

## F. Science ext — P09
- Independent math graph, 2D dynamics, 3D model, map, molecule and anatomy viewers each have a real interactive sample with editable parameters and accessible text counterpart.
- 3D GPU unsupported: stable 2D or prose fallback. Offline map: clear unavailable tiles indicator with static description. Missing model asset: safe failure. Sim timestep with pause/reset does not retain abandoned timers or listeners.

## G. Portable authoring — P02/P05/P11/P12
- AI-generated JSON (untrusted) import → schema validator → preview → export bundle → standalone render → re-import: stable IDs, normalized content, citations and state/interaction equal within version contract.
- Reject unknown/unsafe actions and invalid media protocols with source-path diagnostics; failure must not mutate published content.
- Embed the same article in an isolated standalone page and in two independent host fixtures (plain HTML and a framework-managed page) through the public API. Preserve host routes/content/styles and compare original legacy 14-type results. No CMS or specific host installation is required; any production host test is optional and separately authorized.

## H. Visual quality and production checks — P03/P13/P14/P15
- Review full article, not isolated cards, with screenshots at 360/768/1440 Arabic RTL and English LTR, light/dark, keyboard focus, loading/empty/error. Check no content text under 16 CSS px. No page-wide overflow or clipped captions/tooltips.
- Browser must be owner-authorized **Edge AI dedicated profile**, process/PID/user data dir and active profile verified by Browser Environment Manager. Cloud local-loopback mismatch ⇒ `UNVERIFIED`, not reported PASS.
- Final ledger requires all Feature IDs marked PASS with evidence. Unverified research or plugin license obligation blocks affected distribution gate; document exact limitation and owner decision if essential.
