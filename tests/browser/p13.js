import { createIntuiEngine } from "/packages/core/src/index.js";
import { validateArticle } from "/packages/article/src/index.js";
import { registerArticleRenderer } from "/packages/article-renderer/src/index.js";
import { fetchVerifiedAsset } from "/packages/article-renderer/src/rich-media.js";
import { registerRichVizAdapter } from "/packages/visualization-legacy/src/index.js";
import { mountArticleAuthoringStudio } from "/packages/authoring/src/studio.js";
import { mountDesignReferenceGallery } from "/packages/design-system/src/gallery.js";
import { renderErrorFallback } from "/packages/core/src/fallback.js";

const assetUrl = "/tests/browser/p10/scene.svg";
const assetBytes = new Uint8Array(await (await fetch(assetUrl, { credentials: "omit" })).arrayBuffer());
const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", assetBytes));
let digestBinary = "";
for (const byte of digest) digestBinary += String.fromCharCode(byte);
const integrity = `sha256-${btoa(digestBinary)}`;
const unsafeBytes = new Uint8Array(await (await fetch("/tests/browser/p13-unsafe.svg", { credentials: "omit" })).arrayBuffer());
const unsafeDigest = new Uint8Array(await crypto.subtle.digest("SHA-256", unsafeBytes));
let unsafeBinary = "";
for (const byte of unsafeDigest) unsafeBinary += String.fromCharCode(byte);
let unsafeSvgRejected = false;
try {
  await fetchVerifiedAsset(document, "/tests/browser/p13-unsafe.svg", { integrity: `sha256-${btoa(unsafeBinary)}`, type: "image/svg+xml" });
} catch { unsafeSvgRejected = true; }
let unsafeSvgWithoutIntegrityRejected = false;
try {
  await fetchVerifiedAsset(document, "/tests/browser/p13-unsafe.svg", { type: "image/svg+xml" });
} catch { unsafeSvgWithoutIntegrityRejected = true; }
const nonce = "p13-fixture";
const article = {
  kind: "intui.article", schemaVersion: "1.0.0", id: "p13-rtl-hardening", locale: "ar", dir: "rtl",
  title: "اختبار اتجاه عربي مع IntuiForge",
  summary: "يعرض هذا المقال العربي محتوى مختلطًا ويختبر العزل والوسائط والأنماط تحت سياسة CSP مقيدة.",
  metadata: { status: "draft", contentType: "article", sources: [], canonicalReferences: [], supportedLocales: ["ar", "en"], provenance: [] },
  assets: [{ id: "diagram", url: assetUrl, type: "image/svg+xml", alt: "رسم يوضح مسار المفهوم من البداية إلى النتيجة", license: "CC0-1.0", provenance: "P13 browser fixture", integrity, width: 800, height: 420 }],
  initialState: { selected: { type: "enum", value: "start", values: ["start", "result"] } }, derived: {},
  sections: [{ id: "overview", heading: "نظرة عامة", blocks: [
    { id: "mixed-copy", type: "paragraph", content: "القيمة العربية English 123 — افتح الرابط https://example.test/guide لمراجعة المصدر." },
    { id: "diagram-block", type: "figure", content: "رسم توضيحي لاختبار SVG", props: { assetId: "diagram" } },
    { id: "map", type: "knowledgeMap", props: { title: "مسار التعلم", nodes: [{ id: "start", label: "البداية", summary: "المفهوم الأول." }, { id: "result", label: "النتيجة English", summary: "الخلاصة العربية." }], edges: [{ id: "start-result", source: "start", target: "result", label: "ثم English" }] } },
    { id: "legacy-guide", type: "legacyViz", props: { description: "خطوات قراءة الرسم", spec: { version: 1, type: "step-guide", title: "خطوات English", description: "تعليمات مختلطة للتحقق من الخط", data: { steps: [{ title: "الخطوة الأولى", text: "افتح العنصر English ثم اقرأ الشرح." }] } } } },
  ] }],
};

const host = document.querySelector("#host");
const validationResult = validateArticle(article);
const engine = createIntuiEngine({ validateArticle });
registerRichVizAdapter(engine);
registerArticleRenderer(engine);
const handle = engine.mount(host, article, { lang: "ar", dir: "rtl", cspNonce: nonce });
const mountResult = await handle.ready;
const nonceProbeRoot = document.createElement("section");
nonceProbeRoot.hidden = true;
const galleryContainer = document.createElement("div");
const fallbackContainer = document.createElement("div");
const studioContainer = document.createElement("div");
nonceProbeRoot.append(galleryContainer, fallbackContainer, studioContainer);
document.body.appendChild(nonceProbeRoot);
const gallery = mountDesignReferenceGallery(galleryContainer, { locale: "ar", cspNonce: nonce });
const fallback = renderErrorFallback(fallbackContainer, new Error("P13 nonce probe"), { document, lang: "ar", cspNonce: nonce });
const studio = mountArticleAuthoringStudio(studioContainer, { article, document, cspNonce: nonce });
const studioReady = await studio.ready;

function collectEvidence() {
  const root = host.shadowRoot;
  const app = root?.querySelector(".if-article-root");
  const image = root?.querySelector("img");
  const edgeLabel = root?.querySelector(".if-map-edge-label");
  const richvizRoot = root?.querySelector("[data-visualization-host].rev");
  const richvizText = [...(richvizRoot ? [richvizRoot, ...richvizRoot.querySelectorAll("*")] : [])]
    .filter((node) => node.children.length === 0 && node.textContent.trim() && !node.closest("[hidden]"))
    .map((node) => Number.parseFloat(getComputedStyle(node).fontSize));
  const richvizStyleLink = root?.querySelector('link[data-intui-richviz-accessibility=""]');
  const textSizes = [...(root?.querySelectorAll(".if-article-root *") ?? [])]
    .filter((node) => node.children.length === 0 && node.textContent.trim() && !node.closest("[hidden]"))
    .map((node) => Number.parseFloat(getComputedStyle(node).fontSize));
  return {
    mountStatus: mountResult.status,
    locale: app?.lang,
    direction: app?.dir,
    mixedBidiIsolation: root?.querySelectorAll("bdi[dir=auto]").length ?? 0,
    inlineScriptBlocked: window.__P13_INLINE_SCRIPT_EXECUTED__ !== true,
    nonceStylePresent: root?.querySelector("style")?.nonce === nonce,
    galleryNoncePresent: gallery.shadowRoot.querySelector("style")?.nonce === nonce,
    fallbackNoncePresent: fallback.shadowRoot.querySelector("style")?.nonce === nonce,
    studioNoncePresent: studioContainer.shadowRoot.querySelector("style")?.nonce === nonce,
    studioReady,
    imageIntegrityState: image?.getAttribute("data-integrity-state"),
    imageLoaded: image?.complete && image.naturalWidth > 0,
    imageAlt: image?.alt,
    unsafeSvgRejected,
    unsafeSvgWithoutIntegrityRejected,
    mapEdgeFontSize: edgeLabel ? getComputedStyle(edgeLabel).fontSize : null,
    minimumVisibleTextPx: textSizes.length ? Math.min(...textSizes) : null,
    richvizAccessibilityStylesheetLoaded: richvizStyleLink?.sheet !== null && richvizStyleLink?.sheet !== undefined,
    minimumRichvizTextPx: richvizText.length ? Math.min(...richvizText) : null,
    richvizTooltipMinimumPx: (() => {
      if (!richvizRoot) return null;
      const tooltip = document.createElement("div");
      tooltip.className = "rev-tooltip";
      tooltip.style.fontSize = "14px";
      tooltip.textContent = "Tooltip accessibility probe";
      richvizRoot.appendChild(tooltip);
      const size = Number.parseFloat(getComputedStyle(tooltip).fontSize);
      tooltip.remove();
      return size;
    })(),
    articleHasTextAlternatives: Boolean(root?.querySelector(".if-map-text-alternative")),
    pageHasNoHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth,
    externalRequests: performance.getEntriesByType("resource").map((entry) => entry.name).filter((url) => !url.startsWith(location.origin)),
  };
}

async function runBehaviorChecks() {
  const root = host.shadowRoot;
  const link = root?.querySelector(".if-article-toc a");
  link?.focus();
  const focused = root?.activeElement === link;
  const mapToggle = root?.querySelector('[data-map-action="toggle-text"]');
  mapToggle?.click();
  const inlineProbe = document.createElement("script");
  inlineProbe.textContent = "window.__P13_INLINE_SCRIPT_EXECUTED__ = true";
  document.head.appendChild(inlineProbe);
  inlineProbe.remove();
  const englishHost = document.createElement("main");
  englishHost.hidden = true;
  document.body.appendChild(englishHost);
  const englishArticle = structuredClone(article);
  englishArticle.id = "p13-english-ltr";
  englishArticle.locale = "en";
  englishArticle.dir = "ltr";
  englishArticle.title = "English direction check";
  englishArticle.summary = "This English article confirms that localization keeps left-to-right reading order.";
  englishArticle.metadata.supportedLocales = ["en"];
  englishArticle.assets = [];
  englishArticle.initialState = {};
  englishArticle.sections = [{ id: "english-section", heading: "Overview", blocks: [{ id: "english-copy", type: "paragraph", content: "English text with Arabic token اختبار stays isolated." }] }];
  const englishHandle = engine.mount(englishHost, englishArticle, { lang: "en", dir: "ltr", cspNonce: nonce });
  const englishResult = await englishHandle.ready;
  const englishApp = englishHost.shadowRoot?.querySelector(".if-article-root");
  const englishLocale = { status: englishResult.status, lang: englishApp?.lang, dir: englishApp?.dir, mixedBidiIsolation: englishHost.shadowRoot?.querySelectorAll("bdi[dir=auto]").length ?? 0 };
  await englishHandle.dispose();
  englishHost.remove();
  return {
    keyboardFocusMovesToToc: focused,
    mapTextAlternativeCanBeToggled: root?.querySelector(".if-map-text-alternative")?.hidden === false,
    inlineScriptBlocked: window.__P13_INLINE_SCRIPT_EXECUTED__ !== true,
    englishLocale,
  };
}

async function runOfflineFallbackCheck() {
  const offlineHost = document.createElement("main");
  offlineHost.hidden = true;
  document.body.appendChild(offlineHost);
  const offlineArticle = structuredClone(article);
  offlineArticle.id = "p13-offline-media-fallback";
  offlineArticle.title = "Offline media fallback";
  offlineArticle.summary = "This article checks the readable media fallback when its local asset is unavailable.";
  offlineArticle.assets[0].url = `/tests/browser/p13-offline-missing-${Date.now()}.svg`;
  offlineArticle.sections = [{ id: "offline-section", heading: "Offline", blocks: [{ id: "offline-image", type: "figure", content: "Offline illustration", props: { assetId: "diagram" } }] }];
  const offlineHandle = engine.mount(offlineHost, offlineArticle, { lang: "en", dir: "ltr", cspNonce: nonce });
  await offlineHandle.ready;
  await new Promise((resolve) => setTimeout(resolve, 150));
  const root = offlineHost.shadowRoot;
  const image = root?.querySelector("img");
  const status = root?.querySelector(".if-article-status[role=status]");
  const result = {
    networkOffline: !navigator.onLine,
    articleReady: document.documentElement.dataset.p13Status === "READY",
    imageFailedSafely: image?.getAttribute("data-integrity-state") === "failed",
    sourceRemoved: !image?.hasAttribute("src"),
    readableAlternative: Boolean(status?.textContent.includes(offlineArticle.assets[0].alt)),
    noAssetUrlLeak: !status?.textContent.includes(offlineArticle.assets[0].url),
  };
  await offlineHandle.dispose();
  offlineHost.remove();
  return result;
}

document.querySelector("#result").textContent = mountResult.status === "ready" ? "P13 article mounted; collect window.__INTUIFORGE_P13__." : `P13 mount failed: ${mountResult.code}`;
document.documentElement.dataset.p13Status = String(mountResult.status).toUpperCase();
window.__INTUIFORGE_P13__ = { status: mountResult.status, validationErrors: validationResult.errors ?? [], collectEvidence, runBehaviorChecks, runOfflineFallbackCheck, dispose: async () => { gallery.dispose(); await studio.dispose(); fallback.remove(); nonceProbeRoot.remove(); await handle.dispose(); await engine.dispose(); } };
