function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const child of Object.values(value)) deepFreeze(child);
  return Object.freeze(value);
}

export const DESIGN_TOKENS = deepFreeze({
  color: {
    light: {
      canvas: "#F5F7F4",
      surface: "#FFFFFF",
      raised: "#FFFFFF",
      text: "#17231F",
      muted: "#57665F",
      border: "#DCE4DE",
      accent: "#176B5B",
      accentText: "#FFFFFF",
      focus: "#176B5B",
      series: ["#176B5B", "#494B91", "#7D541C", "#883A52"],
    },
    dark: {
      canvas: "#111814",
      surface: "#18221C",
      raised: "#202B24",
      text: "#EEF3EF",
      muted: "#B5C3BA",
      border: "#35443B",
      accent: "#80D5B5",
      accentText: "#102018",
      focus: "#A9EAD3",
      series: ["#6BD3B0", "#AAA9FF", "#F1B967", "#F2A0B3"],
    },
  },
  typography: {
    minimumArticlePx: 16,
    fontSans: '"Segoe UI", Tahoma, Arial, sans-serif',
    fontDisplay: 'Georgia, "Times New Roman", serif',
    baseSize: "1rem",
    leadSize: "1.125rem",
    displaySize: "clamp(2rem, 4.4vw, 3.75rem)",
    articleLineHeight: 1.78,
    readingMeasure: "68ch",
  },
  spacing: {
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    6: "1.5rem",
    8: "2rem",
    12: "3rem",
    16: "4rem",
  },
  radius: { control: "0.75rem", surface: "1rem", feature: "1.5rem", pill: "999px" },
  elevation: { surface: "0 1px 2px rgb(19 34 27 / 5%)", floating: "0 14px 36px rgb(19 34 27 / 10%)" },
  layout: { reading: "68ch", gallery: "76rem", rail: "19rem" },
  motion: { quick: "140ms", standard: "220ms" },
});

const HOST_COLOR_TOKENS = Object.freeze({
  canvas: "--if-host-canvas",
  surface: "--if-host-surface",
  raised: "--if-host-raised",
  text: "--if-host-text",
  muted: "--if-host-muted",
  border: "--if-host-border",
  accent: "--if-host-accent",
  accentText: "--if-host-accent-text",
  focus: "--if-host-focus",
});

const SAFE_COLOR_FUNCTION = /^(?:rgb|hsl|hwb|lab|lch|oklab|oklch|color)\([^{};<>]{1,64}\)$/i;
const SAFE_COLOR_NAME = /^[a-z]{1,24}$/i;
const SAFE_CSS_VARIABLE = /^var\(--[a-z0-9-]+\)$/i;

function isSafeColor(value) {
  if (typeof value !== "string" || value.length > 80 || /[;{}<>]/.test(value) || /(?:url|expression)\s*\(/i.test(value)) return false;
  const color = value.trim();
  if (!color) return false;
  if (globalThis.CSS?.supports) return globalThis.CSS.supports("color", color);
  return /^#[\da-f]{3,8}$/i.test(color)
    || SAFE_COLOR_FUNCTION.test(color)
    || SAFE_COLOR_NAME.test(color)
    || SAFE_CSS_VARIABLE.test(color);
}

export function normalizeHostThemeTokens(tokens = {}) {
  if (!tokens || typeof tokens !== "object" || Array.isArray(tokens)) {
    throw new TypeError("Host theme tokens must be an object of supported color values.");
  }

  const normalized = {};
  for (const [name, value] of Object.entries(tokens)) {
    const property = HOST_COLOR_TOKENS[name];
    if (!property) throw new TypeError(`Unsupported host theme token: ${name}`);
    if (!isSafeColor(value)) throw new TypeError(`Invalid color for host theme token: ${name}`);
    normalized[property] = value.trim();
  }
  return Object.freeze(normalized);
}

export function resolveTheme(theme = "system") {
  if (!new Set(["light", "dark", "system"]).has(theme)) {
    throw new TypeError(`Unsupported theme: ${String(theme)}`);
  }
  return theme;
}

function themeDeclarations(colors) {
  return [
    `--if-color-canvas: var(--if-host-canvas, ${colors.canvas});`,
    `--if-color-surface: var(--if-host-surface, ${colors.surface});`,
    `--if-color-raised: var(--if-host-raised, ${colors.raised});`,
    `--if-color-text: var(--if-host-text, ${colors.text});`,
    `--if-color-muted: var(--if-host-muted, ${colors.muted});`,
    `--if-color-border: var(--if-host-border, ${colors.border});`,
    `--if-color-accent: var(--if-host-accent, ${colors.accent});`,
    `--if-color-accent-text: var(--if-host-accent-text, ${colors.accentText});`,
    `--if-color-focus: var(--if-host-focus, ${colors.focus});`,
    ...colors.series.map((color, index) => `--if-color-series-${index + 1}: ${color};`),
  ].join("\n    ");
}

export function createDesignSystemStyles({ theme = "system" } = {}) {
  const initialTheme = resolveTheme(theme);
  const { light, dark } = DESIGN_TOKENS.color;
  const { typography, spacing, radius, elevation, layout, motion } = DESIGN_TOKENS;

  return `
:host {
  all: initial;
  display: block;
  width: 100%;
  color-scheme: ${initialTheme === "system" ? "light dark" : initialTheme};
  font-family: ${typography.fontSans};
}
.if-gallery, .if-gallery * { box-sizing: border-box; }
.if-gallery {
  all: initial;
  ${themeDeclarations(light)}
  --if-font-sans: ${typography.fontSans};
  --if-font-display: ${typography.fontDisplay};
  --if-font-size: ${typography.baseSize};
  --if-article-min-size: ${typography.minimumArticlePx}px;
  --if-line-height: ${typography.articleLineHeight};
  --if-reading-measure: ${typography.readingMeasure};
  --if-space-1: ${spacing[1]}; --if-space-2: ${spacing[2]}; --if-space-3: ${spacing[3]};
  --if-space-4: ${spacing[4]}; --if-space-6: ${spacing[6]}; --if-space-8: ${spacing[8]};
  --if-space-12: ${spacing[12]}; --if-space-16: ${spacing[16]};
  --if-radius-control: ${radius.control}; --if-radius-surface: ${radius.surface};
  --if-radius-feature: ${radius.feature}; --if-radius-pill: ${radius.pill};
  --if-shadow-surface: ${elevation.surface}; --if-shadow-floating: ${elevation.floating};
  --if-layout-reading: ${layout.reading}; --if-layout-gallery: ${layout.gallery};
  --if-layout-rail: ${layout.rail};
  --if-motion-quick: ${motion.quick}; --if-motion-standard: ${motion.standard};
  display: block;
  min-width: 0;
  background: var(--if-color-canvas);
  color: var(--if-color-text);
  color-scheme: light dark;
  font: max(var(--if-font-size), var(--if-article-min-size))/1.55 var(--if-font-sans);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}
.if-gallery[data-theme="light"] {
  ${themeDeclarations(light)}
  color-scheme: light;
}
.if-gallery[data-theme="dark"] {
  ${themeDeclarations(dark)}
  color-scheme: dark;
}
.if-gallery[data-theme="system"] { ${themeDeclarations(light)} color-scheme: light dark; }
@media (prefers-color-scheme: dark) {
  .if-gallery[data-theme="system"] { ${themeDeclarations(dark)} }
}
.if-gallery button, .if-gallery input, .if-gallery select { font: inherit; }
.if-shell { width: min(100%, var(--if-layout-gallery)); margin-inline: auto; padding: var(--if-space-6) clamp(var(--if-space-4), 4vw, var(--if-space-8)) var(--if-space-16); }
.if-sitehead { display: flex; align-items: center; justify-content: space-between; gap: var(--if-space-4); border-bottom: 1px solid var(--if-color-border); padding-block: var(--if-space-3) var(--if-space-4); }
.if-brand { display: flex; align-items: baseline; flex-wrap: wrap; gap: var(--if-space-2); font-weight: 700; letter-spacing: -0.02em; }
.if-brand-note, .if-eyebrow, .if-meta { color: var(--if-color-muted); font-size: max(1rem, var(--if-article-min-size)); }
.if-toolbar { display: flex; align-items: center; justify-content: end; flex-wrap: wrap; gap: var(--if-space-2); }
.if-button { display: inline-flex; align-items: center; justify-content: center; gap: var(--if-space-2); min-block-size: 44px; border: 1px solid var(--if-color-border); border-radius: var(--if-radius-control); padding: 0.55rem 0.9rem; background: var(--if-color-surface); color: var(--if-color-text); font-size: max(1rem, var(--if-article-min-size)); font-weight: 600; line-height: 1.35; text-align: center; cursor: pointer; transition: background-color var(--if-motion-quick), border-color var(--if-motion-quick), color var(--if-motion-quick), transform var(--if-motion-quick); }
.if-button:hover:not(:disabled) { border-color: var(--if-color-accent); background: color-mix(in srgb, var(--if-color-accent) 7%, var(--if-color-surface)); }
.if-button:active:not(:disabled) { transform: translateY(1px); }
.if-button:focus-visible, .if-gallery a:focus-visible { outline: 3px solid var(--if-color-focus); outline-offset: 3px; }
.if-button--primary { border-color: var(--if-color-accent); background: var(--if-color-accent); color: var(--if-color-accent-text); }
.if-button--primary:hover:not(:disabled) { background: color-mix(in srgb, var(--if-color-accent) 88%, var(--if-color-text)); color: var(--if-color-accent-text); }
.if-button:disabled { border-color: var(--if-color-border); background: var(--if-color-raised); color: var(--if-color-muted); cursor: not-allowed; opacity: 0.9; }
.if-button[aria-busy="true"] { cursor: progress; }
.if-hero { max-width: var(--if-layout-reading); padding-block: clamp(var(--if-space-8), 9vw, var(--if-space-16)) var(--if-space-8); }
.if-eyebrow { margin: 0 0 var(--if-space-3); font-weight: 700; letter-spacing: 0.08em; }
.if-title { max-width: 15ch; margin: 0; font: 650 ${typography.displaySize}/1.14 var(--if-font-display), var(--if-font-sans); letter-spacing: -0.035em; overflow-wrap: anywhere; }
.if-lead { max-width: var(--if-layout-reading); margin: var(--if-space-4) 0 0; color: var(--if-color-muted); font-size: max(${typography.leadSize}, var(--if-article-min-size)); line-height: 1.7; }
.if-article-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(15rem, var(--if-layout-rail)); align-items: start; gap: clamp(var(--if-space-6), 5vw, var(--if-space-12)); }
.if-article { min-width: 0; max-width: var(--if-layout-reading); }
.if-article h2, .if-panel h2 { margin: 0 0 var(--if-space-3); font-size: max(1.375rem, var(--if-article-min-size)); line-height: 1.35; letter-spacing: -0.02em; }
.if-article p { max-width: var(--if-layout-reading); margin: 0 0 var(--if-space-4); font-size: max(1rem, var(--if-article-min-size)); line-height: var(--if-line-height); overflow-wrap: anywhere; }
.if-caption, .if-tooltip, .if-graph-label, .if-card-copy, .if-state-copy, .if-control-label { font-size: max(1rem, var(--if-article-min-size)); line-height: 1.6; }
.if-article a { color: var(--if-color-accent); text-decoration-thickness: 0.08em; text-underline-offset: 0.18em; }
.if-article a:hover { text-decoration-thickness: 0.14em; }
.if-code-sample { direction: ltr; text-align: left; unicode-bidi: isolate; overflow-wrap: anywhere; }
.if-figure { margin: var(--if-space-8) 0; padding: var(--if-space-4); border: 1px solid var(--if-color-border); border-radius: var(--if-radius-surface); background: var(--if-color-surface); }
.if-figure-label { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: stretch; gap: var(--if-space-2); margin-block: var(--if-space-4); }
.if-graph-node { display: grid; place-items: center; min-width: 0; min-height: 4rem; border: 1px solid var(--if-color-border); border-radius: var(--if-radius-control); padding: var(--if-space-2); background: var(--if-color-raised); text-align: center; }
.if-callout { margin-block: var(--if-space-6); border-inline-start: 4px solid var(--if-color-accent); border-radius: 0 var(--if-radius-control) var(--if-radius-control) 0; padding: var(--if-space-4); background: var(--if-color-surface); }
.if-callout p { margin: 0; }
.if-panel { min-width: 0; border: 1px solid var(--if-color-border); border-radius: var(--if-radius-feature); padding: var(--if-space-4); background: var(--if-color-surface); box-shadow: var(--if-shadow-surface); }
.if-panel + .if-panel { margin-block-start: var(--if-space-4); }
.if-panel-heading { display: flex; align-items: baseline; justify-content: space-between; gap: var(--if-space-2); border-bottom: 1px solid var(--if-color-border); padding-block-end: var(--if-space-3); }
.if-panel-heading h2 { margin: 0; }
.if-state-options { display: flex; min-width: 0; flex-wrap: wrap; gap: var(--if-space-2); margin: var(--if-space-4) 0; border: 0; padding: 0; }
.if-state-options .if-button { min-block-size: 44px; padding-inline: 0.7rem; }
.if-state-panel { min-height: 9rem; border: 1px solid var(--if-color-border); border-radius: var(--if-radius-control); padding: var(--if-space-4); background: var(--if-color-raised); }
.if-state-panel[data-state="error"] { border-color: var(--if-color-accent); }
.if-state-panel[data-state="loading"]::before { content: "…"; display: block; color: var(--if-color-accent); font-size: 1.5rem; font-weight: 700; }
.if-state-panel[data-state="loading"] { cursor: progress; }
.if-state-panel[data-state="error"] .if-state-title { color: var(--if-color-text); }
.if-state-title { margin: 0 0 var(--if-space-2); font-weight: 700; }
.if-disabled-sample[hidden] { display: none; }
.if-tooltip { margin: var(--if-space-3) 0 0; color: var(--if-color-muted); }
.if-token-list { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--if-space-2) var(--if-space-3); margin: var(--if-space-4) 0 0; }
.if-token-list dt, .if-token-list dd { min-width: 0; margin: 0; font-size: max(1rem, var(--if-article-min-size)); }
.if-token-list dd { direction: ltr; text-align: left; font-family: ui-monospace, Consolas, monospace; }
.if-footer { margin-block-start: var(--if-space-12); border-top: 1px solid var(--if-color-border); padding-block-start: var(--if-space-4); color: var(--if-color-muted); font-size: max(1rem, var(--if-article-min-size)); }
.if-gallery[dir="rtl"] .if-code-sample, .if-gallery[dir="rtl"] .if-token-list dd { text-align: left; }
@media (max-width: 55rem) { .if-article-grid { grid-template-columns: minmax(0, 1fr); } .if-article { max-width: none; } .if-rail { order: 2; } }
@media (max-width: 38rem) { .if-shell { padding-inline: var(--if-space-4); } .if-sitehead { align-items: flex-start; flex-direction: column; } .if-toolbar { justify-content: start; width: 100%; } .if-toolbar .if-button { flex: 1 1 auto; } .if-title { max-width: 13ch; font-size: clamp(2rem, 10vw, 2.8rem); } .if-figure { padding: var(--if-space-3); } .if-figure-label { grid-template-columns: minmax(0, 1fr); } .if-panel { padding: var(--if-space-3); } }
@media (min-width: 48rem) { .if-state-options { gap: var(--if-space-2); } }
@media (prefers-reduced-motion: reduce) { .if-gallery *, .if-gallery *::before, .if-gallery *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }
`;
}

export const DESIGN_SYSTEM_CSS = createDesignSystemStyles();
