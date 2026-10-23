const COPY = Object.freeze({
  ar: Object.freeze({
    title: "تعذّر عرض المحتوى التفاعلي",
    message: "ما زالت بقية الصفحة متاحة. أعد تحميل الصفحة، أو تواصل مع مسؤول الموقع إذا استمرت المشكلة.",
  }),
  en: Object.freeze({
    title: "Interactive content could not be loaded",
    message: "The rest of this page is still available. Reload the page or contact the site owner if the problem persists.",
  }),
});

const SHADOW_STYLE = `
:host{all:initial;display:block;color-scheme:light dark;font-family:system-ui,-apple-system,"Segoe UI",sans-serif}
*{box-sizing:border-box}
.if-error-surface{display:block;margin-block:1rem;padding:1rem;border:1px solid color-mix(in srgb,CanvasText 22%,transparent);border-inline-start:4px solid #a3342b;border-radius:.75rem;background:Canvas;color:CanvasText;font-size:16px;line-height:1.6}
.if-error-surface h2,.if-error-surface p{margin:0;font:inherit;font-size:16px;line-height:1.6}
.if-error-surface h2{font-weight:700;margin-block-end:.4rem}
`;

const LIGHT_STYLE = `
.intui-runtime-error-host .if-error-surface{box-sizing:border-box;display:block;margin-block:1rem;padding:1rem;border:1px solid color-mix(in srgb,CanvasText 22%,transparent);border-inline-start:4px solid #a3342b;border-radius:.75rem;background:Canvas;color:CanvasText;font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}
.intui-runtime-error-host .if-error-surface h2,.intui-runtime-error-host .if-error-surface p{margin:0;font:inherit;font-size:16px;line-height:1.6}
.intui-runtime-error-host .if-error-surface h2{font-weight:700;margin-block-end:.4rem}
`;

function localeKey(lang) {
  return String(lang || "ar").toLowerCase().startsWith("ar") ? "ar" : "en";
}

function renderErrorFallback(container, error, { document: documentRef = globalThis.document, lang = "ar", dir } = {}) {
  if (!container || typeof container.replaceChildren !== "function") throw new TypeError("A DOM element container is required for the error fallback.");
  if (!documentRef || typeof documentRef.createElement !== "function") throw new TypeError("A document implementation is required for the error fallback.");

  const locale = localeKey(lang);
  const direction = dir || (locale === "ar" ? "rtl" : "ltr");
  const copy = COPY[locale];
  const host = documentRef.createElement("div");
  host.className = "intui-runtime-error-host";
  host.setAttribute("data-intui-error-host", "");

  let root = host;
  let shadow = false;
  if (typeof host.attachShadow === "function") {
    try {
      root = host.attachShadow({ mode: "open" });
      shadow = true;
    } catch {
      root = host;
    }
  }

  const style = documentRef.createElement("style");
  style.textContent = shadow ? SHADOW_STYLE : LIGHT_STYLE;
  const panel = documentRef.createElement("section");
  panel.className = "if-error-surface";
  panel.setAttribute("role", "alert");
  panel.setAttribute("aria-live", "assertive");
  panel.setAttribute("lang", locale);
  panel.setAttribute("dir", direction);
  panel.setAttribute("data-intui-state", "error");

  const heading = documentRef.createElement("h2");
  heading.textContent = copy.title;
  const message = documentRef.createElement("p");
  message.textContent = copy.message;
  panel.append(heading, message);
  root.append(style, panel);
  container.replaceChildren(host);

  // The internal error is intentionally not rendered: adapters may include private URLs or host data.
  void error;
  return host;
}

const arabicHost = document.querySelector("#fallback-ar");
const englishHost = document.querySelector("#fallback-en");
renderErrorFallback(arabicHost, new Error("private renderer details"), { lang: "ar", dir: "rtl" });
renderErrorFallback(englishHost, new Error("private renderer details"), { lang: "en", dir: "ltr" });
const arabicAlert = arabicHost.querySelector("[data-intui-error-host]")?.shadowRoot?.querySelector('[role="alert"]');
const englishAlert = englishHost.querySelector("[data-intui-error-host]")?.shadowRoot?.querySelector('[role="alert"]');
const fontSize = arabicAlert ? getComputedStyle(arabicAlert.querySelector("p")).fontSize : null;
const safeText = ![arabicAlert?.textContent, englishAlert?.textContent].join(" ").includes("private renderer details");
const result = {
  status: arabicAlert?.getAttribute("dir") === "rtl" && englishAlert?.getAttribute("dir") === "ltr" && Number.parseFloat(fontSize) >= 16 && arabicAlert?.getAttribute("role") === "alert" && safeText ? "PASS" : "FAIL",
  arabicDirection: arabicAlert?.getAttribute("dir"),
  englishDirection: englishAlert?.getAttribute("dir"),
  arabicFontSize: fontSize,
  safeText,
  role: arabicAlert?.getAttribute("role"),
};
document.querySelector("#result").textContent = JSON.stringify(result);
document.documentElement.dataset.p01FallbackStatus = result.status;
window.__INTUIFORGE_P01_FALLBACK__ = result;
