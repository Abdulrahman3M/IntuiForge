import { createIntuiEngine } from "/packages/core/src/index.js";
import { validateArticle } from "/packages/article/src/index.js";
import { registerArticleRenderer } from "/packages/article-renderer/src/index.js";
import { registerRichVizAdapter } from "/packages/visualization-legacy/src/index.js";

const chartSpec = {
  version: 1, type: "bar-chart", title: "تقدم الفهم", description: "مقارنة توضح ارتفاع مستوى الفهم عبر مراحل التعلم.", dir: "rtl",
  data: { chart: "bar", labels: ["القراءة", "التدريب", "المراجعة"], series: [{ name: "الفهم", values: [32, 61, 88], tone: "accent" }], unit: "%", axis: { x: "المرحلة", y: "الفهم" }, valueLabels: true },
};

const article = {
  kind: "intui.article", schemaVersion: "1.0.0", id: "p07-educational-suite", locale: "ar", dir: "rtl",
  title: "رحلة التعلّم التفاعلية",
  summary: "تجربة عربية لاختبار الخطوات والاختبارات والبطاقات الزمنية والتقدم والمقارنة الموجهة.",
  metadata: { status: "draft", contentType: "تجربة تعليمية", sources: [], canonicalReferences: [], supportedLocales: ["ar"], provenance: [{ kind: "author-supplied" }] },
  assets: [{ id: "learning-chart", url: "./p07-diagram.svg", type: "image/svg+xml", alt: "مخطط يوضح نمو الفهم بعد القراءة والتدريب والمراجعة.", license: "CC0-1.0", provenance: "P07 local browser fixture", width: 640, height: 320 }],
  initialState: {
    activeStep: { type: "enum", value: "step-reading", values: ["step-reading", "step-practice"] },
    activeEvent: { type: "enum", value: "event-start", values: ["event-start", "event-review"] },
    activeScenario: { type: "enum", value: "scenario-careful", values: ["scenario-careful", "scenario-fast"] },
    lessonsCompleted: { type: "integer", value: 1, min: 0, max: 4 },
  },
  derived: {},
  sections: [{ id: "learning", heading: "التعلّم خطوة بخطوة", blocks: [
    { id: "learning-stepper", type: "stepper", props: { label: "مراحل التعلّم", progressLabel: "تقدم الدرس" }, bindings: { selected: "activeStep" }, children: [
      { id: "step-reading", type: "group", props: { label: "١. اقرأ" }, children: [
        { id: "reading-copy", type: "paragraph", content: "ابدأ بقراءة الفكرة الأساسية، ثم لاحظ كيف تتغير النتيجة مع كل محاولة." },
        { id: "reading-illustration", type: "figure", props: { assetId: "learning-chart", caption: "رسم توضيحي لمراحل التعلم" } },
      ] },
      { id: "step-practice", type: "group", props: { label: "٢. تدرّب" }, children: [
        { id: "practice-copy", type: "paragraph", content: "قارن النتائج بين التدريب والمراجعة، ثم انتقل إلى الرسم البياني." },
        { id: "practice-chart", type: "legacyViz", props: { spec: chartSpec, description: "رسم بياني لمستوى الفهم عبر المراحل." } },
      ] },
    ] },
    { id: "knowledge-check", type: "quiz", props: { label: "تحقق من الفهم", questions: [
      { id: "q-choice", type: "single-choice", prompt: "أي مرحلة ترفع مستوى الفهم أكثر في الرسم؟", options: [{ id: "reading", label: "القراءة" }, { id: "review", label: "المراجعة" }], answer: "review", explanation: "المراجعة تحقق أعلى قيمة في الرسم." },
      { id: "q-short", type: "short-answer", prompt: "ما اسم المرحلة الأخيرة؟", acceptedAnswers: ["المراجعة"] },
      { id: "q-match", type: "matching", prompt: "صل المرحلة بوصفها", pairs: [{ id: "practice", label: "التدريب" }, { id: "reviewing", label: "المراجعة" }], options: [{ id: "repeat", label: "تكرار التطبيق" }, { id: "reflect", label: "تثبيت الفهم" }], answer: { practice: "repeat", reviewing: "reflect" } },
      { id: "q-order", type: "ordering", prompt: "رتّب مراحل التعلم", items: [{ id: "last", label: "المراجعة" }, { id: "first", label: "القراءة" }, { id: "middle", label: "التدريب" }], answer: ["first", "middle", "last"] },
    ] } },
    { id: "key-cards", type: "flashcards", props: { label: "بطاقات المفاهيم", saveLabel: "حفظ تقدم البطاقات", cards: [
      { id: "card-evidence", front: "ما فائدة الدليل؟", back: "يساعد على تفسير النتيجة والتحقق منها." },
      { id: "card-review", front: "متى نراجع؟", back: "بعد التدريب لترسيخ الفهم." },
    ] } },
    { id: "course-timeline", type: "timeline", props: { label: "الخط الزمني للمقرر" }, bindings: { selected: "activeEvent" }, children: [
      { id: "event-start", type: "group", props: { label: "بداية المقرر", date: "2026-01-15" }, children: [{ id: "event-start-copy", type: "paragraph", content: "قراءة الفكرة وبناء المعرفة الأولى." }] },
      { id: "event-review", type: "group", props: { label: "موعد المراجعة", date: "2026-02-12" }, children: [{ id: "event-review-copy", type: "paragraph", content: "مراجعة النتائج ومناقشة الأدلة." }] },
    ] },
    { id: "guided-scenarios", type: "guidedComparison", props: { label: "اختر سياق المقارنة", scenarios: [
      { id: "scenario-careful", label: "نهج متأنٍ", left: { label: "الطريقة", value: "قياس قبل القرار" }, right: { label: "النتيجة", value: "مخاطر أقل" }, rationale: "يقلل القياس المسبق عدم اليقين عندما تكون المخاطر مرتفعة." },
      { id: "scenario-fast", label: "نهج سريع", left: { label: "الطريقة", value: "التجربة المباشرة" }, right: { label: "النتيجة", value: "تعلّم أسرع" }, rationale: "التجربة السريعة مناسبة عندما يكون التراجع آمنًا." },
    ] }, bindings: { selected: "activeScenario" } },
    { id: "completed-input", type: "input", props: { label: "الدروس المكتملة", inputType: "number", min: 0, max: 4 }, bindings: { value: "lessonsCompleted" } },
    { id: "course-progress", type: "progress", props: { label: "إنجاز المقرر", max: 4 }, bindings: { value: "lessonsCompleted" }, events: { click: { action: "saveProgress", activityId: "knowledge-check", scope: "activity" } } },
  ] }],
};

const errors = [];
const saved = [];
const engine = createIntuiEngine({ validateArticle });
registerRichVizAdapter(engine);
registerArticleRenderer(engine, { theme: "system" });
const handle = engine.mount(document.querySelector("#host"), article, {
  lang: "ar", dir: "rtl", theme: "system",
  onProgress: (action, context) => saved.push({ action, progress: context.learningProgress }),
  onError: (error, phase) => errors.push({ message: error?.message, phase }),
});
const mountResult = await handle.ready;
const result = { status: mountResult.status, errors, chart: document.querySelector("#host")?.shadowRoot?.querySelector("#practice-chart [data-rev-type], #practice-chart [data-rev-state]")?.getAttribute("data-rev-type") ?? "mounted", saved };
document.querySelector("#result").textContent = JSON.stringify(result);
document.documentElement.dataset.p07Status = result.status;
window.__INTUIFORGE_P07__ = { engine, handle, article, result, saved, errors };
