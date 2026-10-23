# Premium Intelligent UI — Design & Interaction Acceptance Contract

## Source of visual intent
The owner **rejects** the previous standalone `richviz_intelligent_ui.html` styling as insufficient/annoying. Do NOT inherit its CSS, navigation, bulky card density, color decorations or layout design. It is only a content reference. Build a **new coherent, restrained and high-fidelity editorial design system** inspired by the *functional quality* of GPT-6 Intelligent UI interaction, not a clone of undocumented ChatGPT UI code.

## Design principles (normative)
1. Article is content-led. Primary explanation is prose; expose rich interaction only where it improves understanding. No endless stacks of uniform boxes, no gratuitous badges, gradients, or neon ornament.
2. Clear hierarchy: article header → lead → section → subsection → context-specific visualization/control → references. Establish consistent type ramp, whitespace rhythm, max readable line width, thoughtful inline icon use, balanced density and responsive art direction.
3. Every rendered interactive unit is **actually functional**: no decorative inert button, fake dropdown, demo-only chart, fabricated metric, unlabeled icon, or inaccessible panel.
4. **Text minimum 16 CSS pixels** for article content including captions/cards/tooltips/diagram labels. Form labels and all essential content must be legible. Use `rem` and enforce computed style in browser tests, not only root declaration.
5. Design tokens and host theme bridge: type scale, spacing, corners, border, surface, text, accent, focus, motion, chart series semantic colors; color contrast meets WCAG 2.2 AA where applicable. Avoid using color alone for meaning.
6. Adapt to 320, 360, 768, 1024 and 1440 CSS px; overflow allowed only inside intentionally scrollable data visualizations with accessible hints, never page-wide accidental clipping. Mobile touch targets and sticky controls verified.
7. Natural Arabic RTL including layout, arrows, focus order, number isolation, quote punctuation and mixed English technical tokens. Explicit LTR inside terminal code and URLs. English/Russian supported in showcase. Dynamic locale/dir changes must not corrupt scroll or state.
8. Keyboard support: Tab order; Enter/Space; Esc close; arrow keys for proper widget roles; visible focus; dialogs trap/return focus; reduced motion; high contrast; screen reader labels; alt and text alternatives for graphs/maps/simulations.
9. Every component defines `loading`, `ready`, `empty`, `error`, `disabled` and, when applicable, offline states. Layout remains stable in content loading/reflow. Tooltips not cut off by table scrolling/overflow.
10. Reuse core components/design tokens and make host adapters map theme variables; React islands must preserve host context without global CSS mutation.

## Professional benchmarks (real demos, mandatory P14)
- One extended Arabic scientific article featuring scientific stepper, live chart, simulation, citations and a short interactive quiz — not just UI samples.
- One bilingual language lesson featuring audio (if user-supplied sound available), correct speed control, tabs, flashcards, keyboard matching, progress and text-only fallback.
- One interactive knowledge-map article comparable in *purpose* to roadmap.sh: touch pan, pinch zoom, mouse wheel zoom, nodes with summaries, links to details, accessible linear version.
- One data explainer with sortable/searchable table, real filtering, calculator/sliders and reactive visual updates.
- One 3D/map/scientific extension example with honest fallback when plugin/device unavailable; no fake scientific output.

## Required screenshot and behavior matrix
Visual/browser testing needs verified dedicated Edge AI environment. Collect screenshots and activity evidence at 360/768/1440 widths, dark/light, Arabic RTL and English LTR; include a keyboard-only route, dialog/open state, chart alt, loading/empty/error state and mobile/touch emulation where possible. Run automated computed-font and horizontal-overflow assertions for essential content.

## Objective visual quality gate
The phase report supplies before/after screenshots, accessible outcomes, layout grid inspection (no clipped text), readability/font evidence, focus states, actual interactions, design tokens and regression on legacy widgets. Independent visual comparison is useful, but never call 'GPT-6 identical'; evaluation is for parity of **interaction capability/polish**, not pixel identity.
