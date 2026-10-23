import { mountPremiumShowcase } from "../../packages/design-system/src/index.js";

const host = document.querySelector("#host");
const showcase = mountPremiumShowcase(host, { document, theme: "light" });
const root = showcase.shadowRoot;

function click(selector) { root.querySelector(selector)?.click(); }

function visibleTextSizes() {
  return [...root.querySelectorAll(".if-showcase *")]
    .filter((node) => node.children.length === 0 && node.textContent.trim() && !node.closest("[hidden]"))
    .map((node) => Number.parseFloat(getComputedStyle(node).fontSize));
}

function collectEvidence() {
  const textSizes = visibleTextSizes();
  const clippedText = [...root.querySelectorAll(".if-showcase-eyebrow,.if-showcase-title,.if-showcase-lead,.if-showcase-nav button,.if-showcase-scene h2,.if-showcase-scene p")]
    .filter((node) => !node.closest("[hidden]") && node.clientWidth > 0 && node.scrollWidth > node.clientWidth + 1)
    .map((node) => node.textContent.trim().slice(0, 50));
  return {
    modelScenes: showcase.model.scenes.map((scene) => scene.id),
    claims: showcase.model.claims,
    currentTheme: root.querySelector(".if-showcase").dataset.theme,
    direction: root.querySelector(".if-showcase").dir,
    surfaceCoversViewport: root.querySelector(".if-showcase").getBoundingClientRect().height >= window.innerHeight,
    minimumVisibleTextPx: textSizes.length ? Math.min(...textSizes) : null,
    pageHasNoHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth,
    clippedText,
    focusableControls: root.querySelectorAll("button,input").length,
    extensionFallback: root.querySelector("[data-extension-state]")?.textContent,
    mapAlternativePresent: Boolean(root.querySelector("[data-map-linear]")),
    externalRequests: performance.getEntriesByType("resource").map((entry) => entry.name).filter((url) => !url.startsWith(location.origin)),
  };
}

function runBehaviorChecks() {
  click('[data-scene="science"]');
  const solar = root.querySelector('[data-input="solar"]'); solar.value = "70"; solar.dispatchEvent(new Event("input", { bubbles: true }));
  click('[data-science-step="2"]');
  click('[data-quiz="right"]');
  const citationButton = root.querySelector('[data-action="open-citation"]'); citationButton.focus(); citationButton.click(); const citationOpened = root.querySelector('[data-citation-dialog]')?.open === true; click('[data-action="close-citation"]');
  const scienceUpdated = root.querySelector('[data-output="solar"]')?.textContent === "70%" && /صحيح/.test(root.querySelector('[data-status="quiz"]')?.textContent ?? "") && /حرارة/.test(root.querySelector('[data-output="science-step-title"]')?.textContent ?? "") && citationOpened && root.activeElement === root.querySelector('[data-action="open-citation"]');
  click('[data-scene="language"]'); click('[data-action="flip-card"]');
  const matching = root.querySelector('[data-matching]'); matching.elements.river.value = "nahr"; matching.elements.book.value = "kitab"; matching.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  const languageUpdated = /نهر/.test(root.querySelector('[data-action="flip-card"]')?.textContent ?? "") && /1\/1/.test(root.querySelector('[data-status="language"]')?.textContent ?? "") && /Correct/.test(root.querySelector('[data-status="matching"]')?.textContent ?? "");
  click('[data-scene="knowledge"]'); click('[data-map="in"]'); click('[data-map-node="concepts"]'); click('[data-map="linear"]');
  const map = root.querySelector('[data-map-root]'); const pinchPointer = (type, pointerId, clientX) => map.querySelector('[data-map-canvas]').dispatchEvent(new PointerEvent(type, { pointerId, clientX, clientY: 50, bubbles: true }));
  pinchPointer('pointerdown', 21, 10); pinchPointer('pointerdown', 22, 20); pinchPointer('pointermove', 22, 30); pinchPointer('pointerup', 21, 10); pinchPointer('pointerup', 22, 30);
  const knowledgeUpdated = root.querySelector('[data-map-linear]')?.hidden === false && /المفاهيم/.test(root.querySelector('[data-status="map-node"]')?.textContent ?? "") && /scale\(2\)/.test(root.querySelector('[data-map-canvas]').style.transform);
  click('[data-map="out"]'); const mapBeforeWheel = Number(/scale\(([\d.]+)/.exec(root.querySelector('[data-map-canvas]').style.transform)?.[1] ?? 1);
  map.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, bubbles: true, cancelable: true }));
  const wheelZoomUpdated = Number(/scale\(([\d.]+)/.exec(root.querySelector('[data-map-canvas]').style.transform)?.[1] ?? 1) > mapBeforeWheel;
  click('[data-scene="data"]'); const search = root.querySelector('[data-input="search"]'); search.value = "delta"; search.dispatchEvent(new Event("input", { bubbles: true })); click('[data-sort="value"]');
  const dataUpdated = root.querySelector('[data-table]')?.textContent.includes("Delta") && !root.querySelector('[data-table]')?.textContent.includes("Arctic");
  click('[data-scene="extension"]'); click('[data-action="retry-extension"]');
  const fallbackUpdated = /Offline\/unsupported/.test(root.querySelector('[data-extension-state]')?.textContent ?? "");
  click('[data-action="theme"]'); click('[data-action="locale"]');
  return { scienceUpdated, languageUpdated, knowledgeUpdated, wheelZoomUpdated, dataUpdated, fallbackUpdated, themeUpdated: root.querySelector(".if-showcase").dataset.theme === "dark", localeUpdated: root.querySelector(".if-showcase").dir === "ltr" };
}

document.querySelector("#result").textContent = "P14 showcase mounted; collect window.__INTUIFORGE_P14__.";
document.documentElement.dataset.p14Status = "READY";
window.__INTUIFORGE_P14__ = { collectEvidence, runBehaviorChecks, dispose: () => showcase.dispose() };
