import { mountDesignReferenceGallery } from "../../packages/design-system/src/index.js";

const host = document.querySelector("#gallery-host");
const hostStyleBefore = host.getAttribute("style");
const gallery = mountDesignReferenceGallery(host, {
  theme: "light",
  locale: "ar",
  hostTokens: { canvas: "#EDF3F1", accent: "#0B674F" },
});

function record(name, actual, expected) {
  return { name, status: actual === expected ? "PASS" : "FAIL", actual, expected };
}

function collectLayoutEvidence() {
  const root = gallery.shadowRoot;
  const textNodes = [...root.querySelectorAll(".if-article, .if-card-copy, .if-caption, .if-tooltip, .if-graph-label, .if-control-label, .if-token-list dt, .if-token-list dd, .if-button")];
  const smallText = textNodes.map((node) => ({
    selector: node.className || node.tagName.toLowerCase(),
    text: node.textContent.trim().slice(0, 48),
    fontSize: getComputedStyle(node).fontSize,
    pixels: Number.parseFloat(getComputedStyle(node).fontSize),
  })).filter((node) => node.pixels < 16);
  const computedRoot = getComputedStyle(root.querySelector(".if-gallery"));
  return {
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    noPageOverflow: document.documentElement.scrollWidth <= window.innerWidth,
    hostStyleUnchanged: host.getAttribute("style") === hostStyleBefore,
    articleTextAtLeast16px: smallText.length === 0,
    smallText,
    direction: root.querySelector(".if-gallery").dir,
    language: root.querySelector(".if-gallery").lang,
    hostCanvasApplied: computedRoot.backgroundColor === "rgb(237, 243, 241)",
    chartAlt: root.querySelector('[role="img"]')?.getAttribute("aria-label") || null,
    outsideButtonRadius: getComputedStyle(document.querySelector("#outside-probe")).borderRadius,
    insideButtonRadius: getComputedStyle(root.querySelector(".if-button")).borderRadius,
  };
}

async function runBehaviorChecks() {
  const checks = [];
  const root = gallery.shadowRoot;
  root.querySelector('[data-action="theme"]').click();
  checks.push(record("theme button cycles to dark", gallery.theme, "dark"));

  root.querySelector('[data-action="locale"]').click();
  checks.push(record("language control updates locale", gallery.locale, "en"));
  checks.push(record("English direction is LTR", root.querySelector(".if-gallery").dir, "ltr"));
  checks.push(record("technical identifier is isolated LTR", root.querySelector("bdi").dir, "ltr"));

  root.querySelector('[data-preview-state="error"]').click();
  checks.push(record("error state is announced", root.querySelector(".if-state-panel").getAttribute("role"), "alert"));
  checks.push(record("error state is selected", root.querySelector(".if-state-panel").dataset.state, "error"));
  root.querySelector('[data-preview-state="loading"]').click();
  checks.push(record("loading state is busy and explicit", root.querySelector(".if-state-panel").getAttribute("aria-busy"), "true"));
  root.querySelector('[data-preview-state="empty"]').click();
  checks.push(record("empty state is explicit", root.querySelector(".if-state-title").textContent, "Nothing here yet"));
  root.querySelector('[data-preview-state="disabled"]').click();
  checks.push(record("disabled sample is natively disabled", root.querySelector("[data-copy='disabledAction']").disabled, true));

  gallery.update({ theme: "light", locale: "ar", dir: "rtl", hostTokens: { canvas: "#EDF3F1", accent: "#0B674F" } });
  root.querySelector('[data-preview-state="ready"]').click();
  checks.push(record("Arabic direction is restored", root.querySelector(".if-gallery").dir, "rtl"));
  checks.push(record("ready state can be restored", root.querySelector(".if-state-panel").dataset.state, "ready"));
  checks.push(record("host mount element stays unchanged", host.getAttribute("style"), hostStyleBefore));
  return checks;
}

const result = {
  status: "READY",
  layout: collectLayoutEvidence(),
  runBehaviorChecks,
};
document.querySelector("#result").textContent = "P03 gallery ready for browser verification.";
document.documentElement.dataset.p03Status = "READY";
window.__INTUIFORGE_P03__ = result;
