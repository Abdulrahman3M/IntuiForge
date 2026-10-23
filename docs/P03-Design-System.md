# P03 — Professional UI Design System

`@intuiforge/engine/design-system` provides the first reusable visual contract for IntuiForge. It is independent of a CMS, website, or framework, does not change host routes/styles, and can be mounted in any compatible browser page.

## Design direction

The reference gallery uses **Quiet Signal / Intelligent Editorial**: content leads; typography and whitespace establish hierarchy; a neutral paper/surface/ink palette uses one evergreen accent; technical identifiers retain LTR isolation inside Arabic text. There are no remote fonts, CDN requests, fabricated metrics, gratuitous gradients, or claims of proprietary ChatGPT UI reuse.

Primary light tokens are paper `#F5F7F4`, surface `#FFFFFF`, ink `#17231F`, secondary ink `#57665F`, accent `#176B5B`, and border `#DCE4DE`. Dark-mode semantic counterparts and four chart-series colors are in `DESIGN_TOKENS.color.dark` and `.series`. Body and meaningful component text use a 16px minimum. Font stacks use local system fonts with Windows Arabic fallbacks; display headings may use a local serif stack.

## Public API

```js
import {
  DESIGN_TOKENS,
  createDesignSystemStyles,
  mountDesignReferenceGallery,
} from "@intuiforge/engine/design-system";

const gallery = mountDesignReferenceGallery(document.querySelector("#preview"), {
  theme: "system", // "light" | "dark" | "system"
  locale: "ar", // Arabic starts RTL; English starts LTR
  hostTokens: {
    canvas: "#F7F8F6",
    accent: "#155E50",
  },
});

gallery.update({ theme: "dark", locale: "en" });
gallery.dispose();
```

`DESIGN_TOKENS` is deeply immutable. `createDesignSystemStyles({ theme })` returns the scoped stylesheet used inside the gallery's Shadow DOM; its selectors are scoped to the component root and never target `html`, `body`, or `:root`. A consumer building its own design-system surface may use the semantic tokens and matching component classes inside its own opt-in isolated root.

`mountDesignReferenceGallery()` appends one owned host element under the supplied container and renders into an open Shadow Root. It returns the element/root, current theme/locale/direction, `update()`, and idempotent `dispose()`. Disposing removes only the element it created and its listener. Invalid theme, direction, host token, document, or container inputs fail explicitly.

The supported host color tokens are `canvas`, `surface`, `raised`, `text`, `muted`, `border`, `accent`, `accentText`, and `focus`. Values must be valid CSS colors; unsupported names and unsafe values are rejected. Accepted values apply to the internally owned gallery host element, not the caller's container. Explicit host colors take precedence for the matching semantic role; remaining roles follow the selected light/dark/system palette.

## Visual and interaction contract

- A clear eyebrow/title/lead hierarchy precedes the reading column. A complementary rail is beside it on wider screens and stacks below on narrow screens.
- Layout uses logical spacing/direction properties, min-width safeguards, and breakpoints that adapt at narrow/mobile/tablet widths. Browser evidence must include 320, 360, 768, 1024, and 1440 CSS-pixel viewports.
- Arabic and English can be changed in the gallery. Language updates `lang` and reading direction together; technical paths use `bdi`/LTR isolation.
- Theme controls cycle through system, light, and dark. Host color overrides are explicit and narrowly allowlisted.
- Buttons use native semantics, at least 44px interaction height, hover/active/disabled states, and visible `:focus-visible`. Reduced-motion preferences suppress transitions/animations.
- Ready/loading/empty/error/disabled examples are selectable and update an accessible state panel. These are labeled visual previews: they do not execute article actions, contact a service, or imply that P04 reactive behavior exists.
- The three-step figure is conceptual explanatory content with an accessible text alternative, not chart data or an empirical result. Actual visualization engines remain in later phases.
- Text styles for article prose, card copy, captions, tooltips, diagram labels and controls are at least 16 CSS pixels by contract. Browser checks verify computed values.

## Verification

Run `npm run test:p03` for token/theme/contrast/scope checks and `npm test` for regression. For real UI verification, run `node tests/browser-server.mjs` on loopback and open `/tests/browser/p03.html` only in the identity-verified dedicated AI Edge. The fixture exposes `window.__INTUIFORGE_P03__` with computed layout evidence and a behavior-check function. Check screenshots, focus/keyboard path, computed font sizes, host-token resolution, outside-style isolation, RTL/LTR, theme changes, component states, and overflow at all required widths. Do not report browser checks as PASS if the dedicated browser cannot be verified.

## Phase boundary

This package supplies design tokens, scoped styles, primitive visual states, and a reference gallery only. Reactive event/data binding belongs to P04; composing complete portable articles belongs to P05; general dialog/table/form widgets belong to later phases. The P03 gallery does not change those phase boundaries.
