import { mountArticleAuthoringStudio } from "/packages/authoring/src/index.js";

const english = new URLSearchParams(location.search).get("locale") === "en";
document.documentElement.lang = english ? "en" : "ar";
document.documentElement.dir = english ? "ltr" : "rtl";
const initialArticle = {
  kind: "intui.article",
  schemaVersion: "1.0.0",
  id: "p11-authoring-fixture",
  locale: english ? "en" : "ar",
  dir: english ? "ltr" : "rtl",
  title: english ? "An editable learning article" : "مقال تعليمي قابل للتحرير",
  summary: english ? "A safe local authoring and preview fixture." : "مساحة محلية آمنة للتأليف والمعاينة.",
  metadata: { status: "draft", contentType: "article", sources: [], canonicalReferences: [], supportedLocales: [english ? "en" : "ar"], provenance: [] },
  assets: [],
  initialState: { score: { type: "number", value: 35, min: 0, max: 100, step: 1 } },
  derived: {},
  sections: [{ id: "lesson", heading: english ? "A focused explanation" : "شرح مركز", blocks: [
    { id: "lead", type: "paragraph", content: english ? "Edit this paragraph and confirm the production renderer updates." : "حرّر هذه الفقرة وتحقق من تحديث renderer الإنتاج." },
    { id: "score-slider", type: "slider", content: english ? "Confidence score" : "مستوى الثقة", props: { min: 0, max: 100, step: 1 }, bindings: { value: "score" }, events: { input: { action: "setState", variable: "score", valueFrom: "event.value" } } },
    { id: "score-metric", type: "metric", content: english ? "Current score" : "الدرجة الحالية", props: { label: english ? "Score" : "الدرجة" }, bindings: { value: "score" } },
  ] }],
};

const host = document.querySelector("#studio");
const exportBundles = [];
window.P11_INITIAL_ARTICLE = structuredClone(initialArticle);
window.P11_EXPORTS = exportBundles;
window.P11_STUDIO = mountArticleAuthoringStudio(host, {
  article: initialArticle,
  document,
  theme: new URLSearchParams(location.search).get("theme") || "light",
  onExport: (bundle) => exportBundles.push(bundle),
});
document.querySelector("[data-p11-fixture-mode]").textContent = `${english ? "English · LTR" : "العربية · RTL"} — ${host.dataset.theme}`;

const waitFor = async (predicate, timeout = 5000) => {
  const until = Date.now() + timeout;
  while (Date.now() < until) {
    if (predicate()) return true;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return false;
};

window.P11_RUN_CHECKS = async () => {
  const root = host.shadowRoot;
  const checks = {};
  const find = (name) => root.querySelector(`[data-p11="${name}"]`);
  const click = (name) => find(name).click();
  const fill = (name, value) => { const field = find(name); field.value = value; field.dispatchEvent(new Event("input", { bubbles: true })); };
  const previewArticle = () => find("preview").shadowRoot?.querySelector(".if-article-root");
  const previewText = () => previewArticle()?.textContent ?? "";
  await window.P11_STUDIO.ready;
  checks.initialRenderer = window.P11_STUDIO.rendererId === "org.intuiforge.article";
  checks.initialPreview = Boolean(previewArticle()?.textContent.includes(initialArticle.title));
  checks.initialDirection = find("preview").shadowRoot?.querySelector(".if-article-root")?.getAttribute("dir") === initialArticle.dir;
  const initialTheme = host.dataset.theme;
  const themeNames = { light: "فاتح", dark: "داكن", system: "النظام" };
  const nextTheme = initialTheme === "light" ? "dark" : initialTheme === "dark" ? "system" : "light";
  checks.initialTheme = find("theme").textContent === `المظهر: ${themeNames[initialTheme]}`;
  checks.noImplicitPublishedData = window.P11_STUDIO.published === null && window.P11_INITIAL_ARTICLE.metadata.status === "draft";
  const chromeFonts = [...root.querySelectorAll(".eyebrow,.preview-status,.small-button")].map((item) => parseFloat(getComputedStyle(item).fontSize));
  const articleRootAtStart = previewArticle();
  const articleFonts = [...(articleRootAtStart?.querySelectorAll("h1,h2,h3,p,li,figcaption,label,button,th,td") ?? [])].filter((item) => item.textContent.trim()).map((item) => parseFloat(getComputedStyle(item).fontSize));
  checks.meaningfulTextAtLeast16px = chromeFonts.every((size) => size >= 16) && articleFonts.every((size) => size >= 16);
  checks.primaryTouchTargetAtLeast44px = find("apply").getBoundingClientRect().height >= 44 && find("publish").getBoundingClientRect().height >= 44;
  checks.formControlsNamed = [...root.querySelectorAll("input,textarea,select")].every((item) => Boolean(item.id || item.name));
  click("theme");
  checks.themeToggle = await waitFor(() => host.dataset.theme === nextTheme && previewArticle()?.dataset.theme === nextTheme);
  const promptDetails = root.querySelector("details.prompt");
  promptDetails.open = true;
  checks.promptVisible = await waitFor(() => find("prompt").value.includes("schemaVersion") && find("prompt").value.includes("JavaScript"));

  fill("title", english ? "An edited learning article" : "مقال تعليمي بعد التعديل");
  fill("summary", english ? "An updated summary with enough detail for a useful static fallback." : "ملخص توضيحي كافٍ يبقى مفيدًا حتى عند تعطيل التفاعلات البرمجية.");
  fill("section-heading", english ? "A revised section" : "عنوان قسم محدث");
  fill("content", english ? "The preview now shows the edited paragraph." : "تظهر المعاينة الفقرة المعدلة الآن.");
  click("apply");
  checks.visualEdit = await waitFor(() => window.P11_STUDIO.draft.title.includes(english ? "edited" : "بعد التعديل") && previewText().includes(english ? "edited paragraph" : "الفقرة المعدلة") && previewText().includes(english ? "A revised section" : "عنوان قسم محدث"));

  const sliderButton = root.querySelector('[data-p11="block"][data-block-id="score-slider"]');
  sliderButton.click();
  const inspected = JSON.parse(find("inspector").textContent);
  checks.inspector = inspected.id === "score-slider" && inspected.bindings.value === "score" && inspected.events.input.action === "setState";

  fill("props", JSON.stringify({ min: "not-a-number", max: 100, step: 1 }));
  click("apply");
  checks.invalidDraftBlocked = await waitFor(() => !window.P11_STUDIO.validation.ok && find("publish").disabled && find("errors").textContent.includes("/sections/0/blocks/1/props/min"));
  checks.previewPreserved = previewText().includes(english ? "edited paragraph" : "الفقرة المعدلة");
  const locate = root.querySelector('[data-p11="errors"] button[data-error-path*="/props/min"]');
  locate?.click();
  checks.errorLocatorFocus = root.activeElement === find("props");
  fill("props", JSON.stringify({ min: 0, max: 100, step: 1 }));
  click("apply");
  checks.correctedDraftPreview = await waitFor(() => window.P11_STUDIO.validation.ok && !find("publish").disabled && find("preview").dataset.valid === "true");

  click("add-block");
  checks.undoRedo = await waitFor(() => window.P11_STUDIO.draft.sections[0].blocks.length === 4);
  click("undo");
  checks.undoRedo = checks.undoRedo && await waitFor(() => window.P11_STUDIO.draft.sections[0].blocks.length === 3);
  click("redo");
  checks.undoRedo = checks.undoRedo && await waitFor(() => window.P11_STUDIO.draft.sections[0].blocks.length === 4);
  click("remove-block");
  checks.removeBlock = await waitFor(() => window.P11_STUDIO.draft.sections[0].blocks.length === 3);
  click("undo");
  checks.removeBlock = checks.removeBlock && await waitFor(() => window.P11_STUDIO.draft.sections[0].blocks.length === 4);

  for (const [templateId, expectedType] of [["quiz-starter", "quiz"], ["map-starter", "knowledgeMap"], ["science-starter", "mathGraph"]]) {
    find("template").value = templateId;
    find("template").dispatchEvent(new Event("change", { bubbles: true }));
    click("template-load");
    const loaded = await waitFor(() => window.P11_STUDIO.draft.sections[0].blocks[0]?.type === expectedType && window.P11_STUDIO.validation.ok);
    checks.templates ??= [];
    checks.templates.push({ id: templateId, loaded, type: window.P11_STUDIO.draft.sections[0].blocks[0]?.type });
  }

  find("export-format").value = "json";
  click("export");
  checks.jsonExport = await waitFor(() => exportBundles.length === 1) && JSON.parse(exportBundles[0].content).id === window.P11_STUDIO.draft.id;
  find("export-format").value = "markdown";
  click("export");
  checks.markdownExport = await waitFor(() => exportBundles.length === 2) && exportBundles[1].content.startsWith("```intui-article\n");

  fill("import-source", JSON.stringify(window.P11_INITIAL_ARTICLE));
  click("import");
  checks.import = await waitFor(() => window.P11_STUDIO.draft.id === "p11-authoring-fixture" && window.P11_STUDIO.validation.ok);
  const unsupported = { ...window.P11_INITIAL_ARTICLE, schemaVersion: "99.0.0" };
  fill("import-source", JSON.stringify(unsupported));
  click("import");
  checks.importVersionError = await waitFor(() => find("errors").textContent.includes("UNSUPPORTED_SCHEMA_VERSION") && find("errors").textContent.includes("/schemaVersion"));
  checks.invalidImportDidNotReplaceDraft = window.P11_STUDIO.draft.id === "p11-authoring-fixture";

  fill("import-source", JSON.stringify(window.P11_INITIAL_ARTICLE));
  click("import");
  await waitFor(() => window.P11_STUDIO.validation.ok);
  click("publish");
  checks.explicitPublish = await waitFor(() => window.P11_STUDIO.published?.metadata.status === "published");
  checks.finalPreviewDirection = await waitFor(() => previewArticle()?.getAttribute("dir") === initialArticle.dir);
  checks.originalUnchanged = window.P11_INITIAL_ARTICLE.metadata.status === "draft" && window.P11_INITIAL_ARTICLE.title === (english ? "An editable learning article" : "مقال تعليمي قابل للتحرير");
  checks.direction = { page: document.documentElement.dir, article: previewArticle()?.getAttribute("dir") };
  checks.pageAndArticleDirectionMatch = checks.direction.page === checks.direction.article;
  checks.templatesPass = Array.isArray(checks.templates) && checks.templates.every((item) => item.loaded);

  window.P11_RESULT = checks;
  return checks;
};

window.P11_READY = window.P11_STUDIO.ready;
