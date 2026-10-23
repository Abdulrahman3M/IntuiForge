import { createDesignSystemStyles, normalizeHostThemeTokens, resolveTheme } from "./tokens.js";

const GALLERY_MARKUP = `
  <div class="if-gallery" data-theme="system" lang="ar" dir="rtl">
    <div class="if-shell">
      <header class="if-sitehead">
        <div class="if-brand"><span>IntuiForge</span><span class="if-brand-note" data-copy="brandNote"></span></div>
        <nav class="if-toolbar" data-copy-aria="controlsLabel">
          <button class="if-button" type="button" data-action="theme"></button>
          <button class="if-button" type="button" data-action="locale"></button>
        </nav>
      </header>

      <section class="if-hero" aria-labelledby="if-title">
        <p class="if-eyebrow" data-copy="eyebrow"></p>
        <h1 class="if-title" id="if-title" data-copy="title"></h1>
        <p class="if-lead" data-copy="lead"></p>
      </section>

      <main class="if-article-grid">
        <article class="if-article" aria-labelledby="if-section-title">
          <h2 id="if-section-title" data-copy="sectionTitle"></h2>
          <p data-copy="paragraphOne"></p>
          <p data-copy="paragraphTwo"></p>
          <p class="if-code-sample"><span data-copy="pathLead"></span> <code><bdi dir="ltr">packages/design-system</bdi></code></p>

          <figure class="if-figure" aria-labelledby="if-figure-caption">
            <div class="if-figure-label" role="img" data-copy-aria="figureDescription">
              <div class="if-graph-node if-graph-label" data-copy="stepOne"></div>
              <div class="if-graph-node if-graph-label" data-copy="stepTwo"></div>
              <div class="if-graph-node if-graph-label" data-copy="stepThree"></div>
            </div>
            <figcaption class="if-caption" id="if-figure-caption" data-copy="figureCaption"></figcaption>
          </figure>

          <aside class="if-callout" data-copy-aria="readingPrincipleLabel">
            <p data-copy="callout"></p>
          </aside>
          <p class="if-tooltip" role="note" data-copy="tooltip"></p>
        </article>

        <aside class="if-rail" data-copy-aria="samplesLabel">
          <section class="if-panel" aria-labelledby="if-state-heading">
            <div class="if-panel-heading"><h2 id="if-state-heading" data-copy="stateHeading"></h2><span class="if-meta">01</span></div>
            <p class="if-card-copy" data-copy="stateIntro"></p>
            <fieldset class="if-state-options">
              <legend class="if-control-label" data-copy="stateLegend"></legend>
              <button class="if-button if-button--primary" type="button" data-preview-state="ready" aria-pressed="true" data-copy="stateReadyLabel"></button>
              <button class="if-button" type="button" data-preview-state="loading" aria-pressed="false" data-copy="stateLoadingLabel"></button>
              <button class="if-button" type="button" data-preview-state="empty" aria-pressed="false" data-copy="stateEmptyLabel"></button>
              <button class="if-button" type="button" data-preview-state="error" aria-pressed="false" data-copy="stateErrorLabel"></button>
              <button class="if-button" type="button" data-preview-state="disabled" aria-pressed="false" data-copy="stateDisabledLabel"></button>
            </fieldset>
            <div class="if-state-panel" data-state="ready" role="status" aria-live="polite" aria-busy="false">
              <p class="if-state-title" data-copy="previewReadyTitle"></p>
              <p class="if-state-copy" data-copy="previewReadyCopy"></p>
              <button class="if-button if-disabled-sample" type="button" disabled hidden data-copy="disabledAction"></button>
            </div>
            <p class="if-tooltip" data-copy="previewNote"></p>
          </section>

          <section class="if-panel" aria-labelledby="if-tokens-heading">
            <div class="if-panel-heading"><h2 id="if-tokens-heading" data-copy="tokensHeading"></h2><span class="if-meta">02</span></div>
            <p class="if-card-copy" data-copy="tokensIntro"></p>
            <dl class="if-token-list">
              <dt data-copy="canvasLabel"></dt><dd>#F5F7F4</dd>
              <dt data-copy="inkLabel"></dt><dd>#17231F</dd>
              <dt data-copy="accentLabel"></dt><dd>#176B5B</dd>
            </dl>
          </section>
        </aside>
      </main>

      <footer class="if-footer" data-copy="footer"></footer>
    </div>
  </div>
`;

const COPY = Object.freeze({
  ar: Object.freeze({
    brandNote: "نظام واجهات قابل للتضمين",
    eyebrow: "مرجع بصري · P03",
    title: "دع الفكرة تقود العين",
    lead: "نظام تصميم تحريري هادئ يضع المحتوى أولًا، ويقدّم التفاعل عندما يضيف معنى — مع مساحة متوازنة للعربية والإنجليزية.",
    sectionTitle: "وضوح بلا ضجيج",
    paragraphOne: "تبدأ الواجهة من ترتيب الفكرة: عنوان واضح، تمهيد موجز، ثم شرح متدرّج. لا تحتاج كل فقرة إلى بطاقة؛ فالمسافة والوزن الطباعي يكفيان لصنع التسلسل.",
    paragraphTwo: "تظل الأدوات قريبة من السياق، فيما تحافظ مكوّنات المضيف على ألوانها ومساراتها ومحتواها. يعمل هذا المرجع مستقلًا عن أي موقع أو نظام إدارة محتوى.",
    pathLead: "المسار التقني يبقى باتجاه القراءة الصحيح:",
    figureDescription: "تسلسل توضيحي من ثلاث مراحل: التحقق، ثم التركيب، ثم التكيّف.",
    stepOne: "تحقّق",
    stepTwo: "ركّب",
    stepThree: "تكيّف",
    figureCaption: "تسلسل مفاهيمي توضيحي؛ لا يمثل قياسًا أو نتيجة تجريبية.",
    callout: "المبدأ: اشرح أولًا، ثم أظهر التفاعل الذي يساعد القارئ على الفهم.",
    tooltip: "تلميح سياقي: اختبر تغيير المظهر واللغة من شريط التحكم، ثم تنقّل بلوحة المفاتيح بين الحالات.",
    stateHeading: "إيقاع المكوّن",
    stateIntro: "لكل حالة إشارة نصية واضحة، ولا يعتمد المعنى على اللون وحده.",
    stateLegend: "معاينة حالة المكوّن",
    stateReadyLabel: "جاهز",
    stateLoadingLabel: "تحميل",
    stateEmptyLabel: "فارغ",
    stateErrorLabel: "خطأ",
    stateDisabledLabel: "معطّل",
    previewReadyTitle: "المحتوى جاهز",
    previewReadyCopy: "تظهر المعلومة هنا بترتيب مقروء.",
    previewLoadingTitle: "حالة تحميل توضيحية",
    previewLoadingCopy: "هذه معاينة بصرية فقط؛ لم يبدأ طلب شبكة أو عملية بيانات.",
    previewEmptyTitle: "لا يوجد محتوى بعد",
    previewEmptyCopy: "تشرح الرسالة ما ينقص وتقترح الخطوة التالية بوضوح.",
    previewErrorTitle: "تعذّر عرض هذا الجزء",
    previewErrorCopy: "تصف الرسالة المشكلة دون كشف تفاصيل داخلية، وتبقي بقية الصفحة قابلة للاستخدام.",
    previewDisabledTitle: "الإجراء غير متاح الآن",
    previewDisabledCopy: "يبقى النص واضحًا ويظهر سبب التعطيل بجواره.",
    disabledAction: "إجراء معطّل",
    previewNote: "معاينة تعليمية للحالات؛ السلوك التطبيقي يرتبط بعقد كل مكوّن لاحقًا.",
    tokensHeading: "لغة بصرية مشتركة",
    tokensIntro: "قيم دلالية قابلة للربط بثيم المضيف دون تعديل أنماطه العامة.",
    canvasLabel: "خلفية",
    inkLabel: "نص أساسي",
    accentLabel: "تمييز",
    footer: "IntuiForge · مرجع تصميم مستقل عن المضيف · لا يعتمد على خطوط أو خدمات خارجية.",
    themePrefix: "المظهر",
    themeSystem: "النظام",
    themeLight: "فاتح",
    themeDark: "داكن",
    languageButton: "English · LTR",
    languageLabel: "تغيير لغة واتجاه المعرض إلى الإنجليزية",
    controlsLabel: "إعدادات المعرض",
    readingPrincipleLabel: "مبدأ القراءة",
    samplesLabel: "عينات نظام التصميم",
  }),
  en: Object.freeze({
    brandNote: "Portable interface system",
    eyebrow: "Visual reference · P03",
    title: "Let the idea lead",
    lead: "A quiet editorial system that puts content first and reveals interaction when it adds meaning — with room for both English and Arabic.",
    sectionTitle: "Clarity without noise",
    paragraphOne: "A page begins with the shape of an idea: a clear heading, a short lead, then a measured explanation. Not every paragraph needs a card; type and space can carry the hierarchy.",
    paragraphTwo: "Controls stay close to their context while host colors, routes, and content remain the host's own. This reference works independently of any site or content platform.",
    pathLead: "A technical path keeps its reading direction:",
    figureDescription: "An illustrative three-step sequence: validate, compose, adapt.",
    stepOne: "Validate",
    stepTwo: "Compose",
    stepThree: "Adapt",
    figureCaption: "A conceptual illustration; it is not a measurement or empirical result.",
    callout: "Principle: explain first, then reveal the interaction that helps a reader understand.",
    tooltip: "Context tip: change the theme and language from the toolbar, then use the keyboard to move through the states.",
    stateHeading: "Component rhythm",
    stateIntro: "Each state has a clear text signal; meaning never depends on color alone.",
    stateLegend: "Preview a component state",
    stateReadyLabel: "Ready",
    stateLoadingLabel: "Loading",
    stateEmptyLabel: "Empty",
    stateErrorLabel: "Error",
    stateDisabledLabel: "Disabled",
    previewReadyTitle: "Content is ready",
    previewReadyCopy: "Information appears here in a readable order.",
    previewLoadingTitle: "Illustrative loading state",
    previewLoadingCopy: "This is a visual preview only; no network request or data operation has started.",
    previewEmptyTitle: "Nothing here yet",
    previewEmptyCopy: "The message explains what is missing and makes the next step clear.",
    previewErrorTitle: "This section could not be shown",
    previewErrorCopy: "The message describes the issue without exposing internals and keeps the rest of the page usable.",
    previewDisabledTitle: "This action is not available now",
    previewDisabledCopy: "The label stays legible and the reason for the disabled state remains nearby.",
    disabledAction: "Disabled action",
    previewNote: "State previews are illustrative; a real component will connect behavior to its contract.",
    tokensHeading: "A shared visual language",
    tokensIntro: "Semantic values can bridge to host themes without changing global host styles.",
    canvasLabel: "Canvas",
    inkLabel: "Primary text",
    accentLabel: "Accent",
    footer: "IntuiForge · Host-independent design reference · No external fonts or services.",
    themePrefix: "Theme",
    themeSystem: "System",
    themeLight: "Light",
    themeDark: "Dark",
    languageButton: "العربية · RTL",
    languageLabel: "Change gallery language and direction to Arabic",
    controlsLabel: "Gallery settings",
    readingPrincipleLabel: "Reading principle",
    samplesLabel: "Design system samples",
  }),
});

const THEME_MODES = Object.freeze(["system", "light", "dark"]);
const PREVIEW_STATES = Object.freeze(["ready", "loading", "empty", "error", "disabled"]);

function normalizeLocale(value) {
  return String(value || "ar").toLowerCase().startsWith("ar") ? "ar" : "en";
}

function applyCopy(root, locale) {
  const copy = COPY[locale];
  for (const node of root.querySelectorAll("[data-copy]")) {
    const value = copy[node.getAttribute("data-copy")];
    if (value) node.textContent = value;
  }
  for (const node of root.querySelectorAll("[data-copy-aria]")) {
    const value = copy[node.getAttribute("data-copy-aria")];
    if (value) node.setAttribute("aria-label", value);
  }
}

function updateThemeButton(root, theme, locale) {
  const copy = COPY[locale];
  const button = root.querySelector('[data-action="theme"]');
  const label = `${copy.themePrefix}: ${copy[`theme${theme[0].toUpperCase()}${theme.slice(1)}`]}`;
  button.textContent = label;
  button.setAttribute("aria-label", label);
}

function showPreview(root, state, locale) {
  const panel = root.querySelector(".if-state-panel");
  const copy = COPY[locale];
  const titleKey = `preview${state[0].toUpperCase()}${state.slice(1)}Title`;
  const bodyKey = `preview${state[0].toUpperCase()}${state.slice(1)}Copy`;
  panel.dataset.state = state;
  panel.setAttribute("aria-busy", String(state === "loading"));
  panel.setAttribute("role", state === "error" ? "alert" : "status");
  panel.querySelector(".if-state-title").textContent = copy[titleKey];
  panel.querySelector(".if-state-copy").textContent = copy[bodyKey];
  panel.querySelector("[data-copy='disabledAction']").hidden = state !== "disabled";

  for (const button of root.querySelectorAll("[data-preview-state]")) {
    const selected = button.getAttribute("data-preview-state") === state;
    button.setAttribute("aria-pressed", String(selected));
    button.classList.toggle("if-button--primary", selected);
  }
}

export function mountDesignReferenceGallery(container, options = {}) {
  if (!container || typeof container.append !== "function") {
    throw new TypeError("A DOM container with append() is required for the design reference gallery.");
  }
  const documentRef = options.document || container.ownerDocument || globalThis.document;
  if (!documentRef || typeof documentRef.createElement !== "function") {
    throw new TypeError("A document implementation is required for the design reference gallery.");
  }

  let theme = resolveTheme(options.theme);
  let locale = normalizeLocale(options.locale || options.lang || "ar");
  let dir = options.dir || (locale === "ar" ? "rtl" : "ltr");
  if (dir !== "ltr" && dir !== "rtl") throw new TypeError(`Unsupported direction: ${String(dir)}`);
  let hostTokens = normalizeHostThemeTokens(options.hostTokens || {});

  const element = documentRef.createElement("div");
  if (typeof element.attachShadow !== "function") {
    throw new TypeError("Shadow DOM support is required for the isolated design reference gallery.");
  }
  element.setAttribute("data-intui-design-system", "");
  const shadow = element.attachShadow({ mode: "open" });
  const style = documentRef.createElement("style");
  if (typeof options.cspNonce === "string" && /^[A-Za-z0-9+/_=-]{1,256}$/.test(options.cspNonce)) style.setAttribute("nonce", options.cspNonce);
  style.textContent = createDesignSystemStyles({ theme });
  const template = documentRef.createElement("template");
  template.innerHTML = GALLERY_MARKUP;
  shadow.append(style, template.content.cloneNode(true));
  container.append(element);

  const root = shadow.querySelector(".if-gallery");
  let disposed = false;
  let appliedHostProperties = [];

  function applyTheme() {
    root.dataset.theme = theme;
    updateThemeButton(shadow, theme, locale);
  }

  function applyLocale() {
    root.setAttribute("lang", locale);
    root.setAttribute("dir", dir);
    applyCopy(shadow, locale);
    const languageButton = shadow.querySelector('[data-action="locale"]');
    languageButton.textContent = COPY[locale].languageButton;
    languageButton.setAttribute("aria-label", COPY[locale].languageLabel);
    showPreview(shadow, shadow.querySelector(".if-state-panel").dataset.state || "ready", locale);
    applyTheme();
  }

  function applyHostTokens() {
    for (const property of appliedHostProperties) element.style.removeProperty(property);
    for (const [property, value] of Object.entries(hostTokens)) element.style.setProperty(property, value);
    appliedHostProperties = Object.keys(hostTokens);
  }

  function onClick(event) {
    if (disposed) return;
    const target = event.target?.closest?.("[data-action], [data-preview-state]");
    if (!target || !shadow.contains(target)) return;
    const action = target.getAttribute("data-action");
    if (action === "theme") {
      theme = THEME_MODES[(THEME_MODES.indexOf(theme) + 1) % THEME_MODES.length];
      applyTheme();
      return;
    }
    if (action === "locale") {
      locale = locale === "ar" ? "en" : "ar";
      dir = locale === "ar" ? "rtl" : "ltr";
      applyLocale();
      return;
    }
    const state = target.getAttribute("data-preview-state");
    if (PREVIEW_STATES.includes(state)) showPreview(shadow, state, locale);
  }

  shadow.addEventListener("click", onClick);
  applyLocale();
  showPreview(shadow, "ready", locale);
  applyHostTokens();

  return Object.freeze({
    element,
    shadowRoot: shadow,
    get theme() { return theme; },
    get locale() { return locale; },
    get dir() { return dir; },
    update(next = {}) {
      if (disposed) throw new TypeError("The design reference gallery has been disposed.");
      if (!next || typeof next !== "object" || Array.isArray(next)) throw new TypeError("Gallery updates must be an object.");
      const nextTheme = Object.hasOwn(next, "theme") ? resolveTheme(next.theme) : theme;
      const nextLocale = Object.hasOwn(next, "locale") || Object.hasOwn(next, "lang")
        ? normalizeLocale(next.locale || next.lang)
        : locale;
      const nextDir = Object.hasOwn(next, "dir") ? next.dir : nextLocale !== locale ? (nextLocale === "ar" ? "rtl" : "ltr") : dir;
      if (nextDir !== "ltr" && nextDir !== "rtl") throw new TypeError(`Unsupported direction: ${String(nextDir)}`);
      const nextTokens = Object.hasOwn(next, "hostTokens") ? normalizeHostThemeTokens(next.hostTokens) : hostTokens;

      theme = nextTheme;
      locale = nextLocale;
      dir = nextDir;
      hostTokens = nextTokens;
      applyLocale();
      applyHostTokens();
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      shadow.removeEventListener("click", onClick);
      element.remove();
    },
  });
}
