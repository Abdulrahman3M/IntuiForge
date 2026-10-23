import test from "node:test";
import assert from "node:assert/strict";
import {
  DESIGN_TOKENS,
  createDesignSystemStyles,
  normalizeHostThemeTokens,
  resolveTheme,
} from "@intuiforge/engine/design-system";

function luminance(hex) {
  const channels = hex.slice(1).match(/.{2}/g).map((part) => parseInt(part, 16) / 255);
  const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(first, second) {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test("UI-01 tokens describe a restrained editorial system and freeze public values", () => {
  assert.equal(DESIGN_TOKENS.color.light.canvas, "#F5F7F4");
  assert.equal(DESIGN_TOKENS.color.light.accent, "#176B5B");
  assert.equal(DESIGN_TOKENS.typography.minimumArticlePx, 16);
  assert.ok(Object.isFrozen(DESIGN_TOKENS));
  assert.ok(Object.isFrozen(DESIGN_TOKENS.color.light));
});

test("UI-01 and UI-05 semantic body/accent pairs meet WCAG AA contrast in both themes", () => {
  for (const theme of [DESIGN_TOKENS.color.light, DESIGN_TOKENS.color.dark]) {
    assert.ok(contrast(theme.text, theme.canvas) >= 4.5);
    assert.ok(contrast(theme.muted, theme.surface) >= 4.5);
    assert.ok(contrast(theme.accentText, theme.accent) >= 4.5);
  }
});

test("UI-05 accepts only known host color tokens and returns isolated CSS custom properties", () => {
  assert.deepEqual(normalizeHostThemeTokens({
    canvas: "#FAFAFA",
    accent: "rgb(20, 90, 70)",
  }), {
    "--if-host-canvas": "#FAFAFA",
    "--if-host-accent": "rgb(20, 90, 70)",
  });
  assert.throws(() => normalizeHostThemeTokens({ "--host-global": "#fff" }), /Unsupported host theme token/);
  assert.throws(() => normalizeHostThemeTokens({ accent: "#fff; body{display:none}" }), /Invalid color/);
  assert.throws(() => normalizeHostThemeTokens(null), /object/);
});

test("UI-05 resolves only light, dark and system theme modes", () => {
  for (const mode of ["light", "dark", "system"]) assert.equal(resolveTheme(mode), mode);
  assert.throws(() => resolveTheme("host"), /Unsupported theme/);
});

test("UI-02 through UI-06 styles are scoped, logical, responsive and accessible by default", () => {
  const css = createDesignSystemStyles({ theme: "system" });
  assert.match(css, /:host\s*\{/);
  assert.doesNotMatch(css, /(^|[},])\s*(?:html|body|:root)\b/m);
  assert.match(css, /--if-article-min-size:\s*16px/);
  assert.match(css, /font:\s*max\(var\(--if-font-size\), var\(--if-article-min-size\)\)/);
  assert.match(css, /font-size:\s*max\(1\.375rem, var\(--if-article-min-size\)\)/);
  assert.match(css, /font-size:\s*max\(1\.125rem, var\(--if-article-min-size\)\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /prefers-color-scheme:\s*dark/);
  assert.match(css, /\[dir="rtl"\]/);
  assert.match(css, /max-width:\s*38rem/);
  assert.match(css, /max-width:\s*55rem/);
  assert.match(css, /grid-template-columns:\s*minmax\(0, 1fr\)/);
  assert.match(css, /min-width:\s*48rem/);
});
