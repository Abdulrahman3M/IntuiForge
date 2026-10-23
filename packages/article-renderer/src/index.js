import { validateArticle } from "../../article/src/index.js";
import { DESIGN_TOKENS, normalizeHostThemeTokens, resolveTheme } from "../../design-system/src/index.js";
import { bindArticleBlocks, createActionDispatcher, createLearningProgress, createReactiveStore, evaluateExpression } from "../../state/src/index.js";
import { buildComparisonModel, deriveSmartTableView, encodeCsv, evaluateCalculator, matchesWidgetFilter, normalizeSmartTableColumns, validateWidgetValue } from "./widgets.js";
import { gradeQuiz } from "./education.js";
import { createKnowledgeMap } from "./knowledge-map.js";
import { applyVisualizationBindings } from "./visualization-bindings.js";
import { SCIENTIFIC_CSS } from "../../scientific-plugins/src/styles.js";
import { buildCitationPlan, createMathML, createSafeCodeNode, fetchVerifiedAsset, mathNotationToMarkup } from "./rich-media.js";

export { gradeQuiz } from "./education.js";

const RENDERER_ID = "org.intuiforge.article";
const DOM_EVENTS = new Set(["click", "change", "input", "keydown", "submit", "toggle"]);
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
const text = (value) => typeof value === "string" ? value : value == null ? "" : String(value);
const mixedBidi = (value) => /\p{Script=Arabic}/u.test(value) && /[A-Za-z0-9]/.test(value);
const inlineTextMarkup = (value) => mixedBidi(value) ? `<bdi dir="auto">${escapeHtml(value)}</bdi>` : escapeHtml(value);

const COPY = Object.freeze({
  en: { contents: "Contents", article: "Article", unavailable: "Interactive visualization unavailable", asset: "Media unavailable", sectionLink: "Link to section", reading: "Current value", search: "Search rows", filter: "Filter rows", all: "All", export: "Export CSV", previous: "Previous", next: "Next", page: "Page", noRows: "No matching rows", close: "Close", moreInfo: "More information", select: "Select", sort: "sort", overlayPosition: "Comparison position", required: "This field is required.", typeError: "Enter a valid value.", integerError: "Enter a whole number.", minError: "Value is below the allowed minimum.", maxError: "Value is above the allowed maximum.", minLengthError: "Value is too short.", maxLengthError: "Value is too long.", enumError: "Choose one of the available options.", calculationError: "The result is unavailable for these values." },
  ar: { contents: "المحتويات", article: "مقال", unavailable: "الرسم التفاعلي غير متاح", asset: "الوسيط غير متاح", sectionLink: "رابط إلى القسم", reading: "القيمة الحالية", search: "ابحث في الصفوف", filter: "تصفية الصفوف", all: "الكل", export: "تصدير CSV", previous: "السابق", next: "التالي", page: "الصفحة", noRows: "لا توجد صفوف مطابقة", close: "إغلاق", moreInfo: "معلومات إضافية", select: "اختيار", sort: "فرز", overlayPosition: "موضع المقارنة", required: "هذا الحقل مطلوب.", typeError: "أدخل قيمة صالحة.", integerError: "أدخل عددًا صحيحًا.", minError: "القيمة أقل من الحد المسموح.", maxError: "القيمة أعلى من الحد المسموح.", minLengthError: "النص أقصر من الحد المسموح.", maxLengthError: "النص أطول من الحد المسموح.", enumError: "اختر إحدى القيم المتاحة.", calculationError: "تعذر حساب النتيجة لهذه القيم." },
  ru: { contents: "Содержание", article: "Статья", unavailable: "Интерактивная визуализация недоступна", asset: "Медиа недоступно", sectionLink: "Ссылка на раздел", reading: "Текущее значение", search: "Поиск строк", filter: "Фильтр строк", all: "Все", export: "Экспорт CSV", previous: "Назад", next: "Далее", page: "Страница", noRows: "Нет совпадающих строк", close: "Закрыть", moreInfo: "Подробнее", select: "Выбрать", sort: "сортировка", overlayPosition: "Положение сравнения", required: "Это поле обязательно.", typeError: "Введите допустимое значение.", integerError: "Введите целое число.", minError: "Значение меньше допустимого минимума.", maxError: "Значение превышает допустимый максимум.", minLengthError: "Слишком короткое значение.", maxLengthError: "Слишком длинное значение.", enumError: "Выберите одно из доступных значений.", calculationError: "Не удалось вычислить результат." },
});

const RICH_COPY = Object.freeze({
  en: { references: "References", playbackSpeed: "Playback speed", speedOptions: "Playback speed options", transcript: "Transcript", readTranscript: "Read transcript", closeTranscript: "Close transcript", imageZoom: "Zoom image", imageZoomOut: "Return image to normal size", selectHotspot: "Select an image marker", copyCode: "Copy code", codeCopied: "Code copied to clipboard.", copyUnavailable: "Clipboard access is unavailable; select the code and copy it manually.", mathUnavailable: "Mathematics could not be rendered. The original notation follows:", assetChecking: "Verifying this media file…", assetFailed: "This media file could not be verified or loaded.", staticIntegrityUnavailable: "This media is withheld in static output because integrity cannot be checked without the interactive renderer.", sourceBack: "Return to citation", footnote: "Footnote", downloadMedia: "Download media", selectSpeed: "Set playback speed" },
  ar: { references: "المراجع", playbackSpeed: "سرعة التشغيل", speedOptions: "خيارات سرعة التشغيل", transcript: "النص المفرغ", readTranscript: "اقرأ النص المفرغ", closeTranscript: "أغلق النص المفرغ", imageZoom: "تكبير الصورة", imageZoomOut: "إعادة الصورة إلى حجمها الطبيعي", selectHotspot: "اختر علامة على الصورة", copyCode: "نسخ الشيفرة", codeCopied: "نُسخت الشيفرة إلى الحافظة.", copyUnavailable: "الوصول إلى الحافظة غير متاح؛ حدّد الشيفرة وانسخها يدويًا.", mathUnavailable: "تعذّر عرض الصيغة الرياضية. هذا نص الترميز الأصلي:", assetChecking: "جارٍ التحقق من ملف الوسائط…", assetFailed: "تعذّر تحميل ملف الوسائط أو التحقق منه.", staticIntegrityUnavailable: "حُجب هذا الوسيط في العرض الثابت لأن التحقق من سلامته يتطلب العارض التفاعلي.", sourceBack: "العودة إلى موضع الإحالة", footnote: "حاشية", downloadMedia: "تنزيل الوسيط", selectSpeed: "تعيين سرعة التشغيل" },
  ru: { references: "Источники", playbackSpeed: "Скорость воспроизведения", speedOptions: "Варианты скорости", transcript: "Текстовая расшифровка", readTranscript: "Открыть расшифровку", closeTranscript: "Закрыть расшифровку", imageZoom: "Увеличить изображение", imageZoomOut: "Вернуть исходный размер", selectHotspot: "Выберите отметку на изображении", copyCode: "Копировать код", codeCopied: "Код скопирован.", copyUnavailable: "Буфер обмена недоступен; выделите и скопируйте код вручную.", mathUnavailable: "Не удалось отобразить формулу. Исходная запись:", assetChecking: "Проверка медиафайла…", assetFailed: "Не удалось проверить или загрузить медиафайл.", staticIntegrityUnavailable: "Медиа скрыто в статическом выводе, поскольку целостность можно проверить только интерактивным модулем.", sourceBack: "Вернуться к ссылке", footnote: "Сноска", downloadMedia: "Скачать медиа", selectSpeed: "Выбрать скорость" },
});

function richCopy(locale) { return RICH_COPY[languageOf(locale)] ?? RICH_COPY.en; }

const EDUCATION_COPY = Object.freeze({
  en: { previous: "Previous", next: "Next", submit: "Check answers", correct: "Correct", incorrect: "Not yet", score: "Score", flip: "Reveal answer", unflip: "Show prompt", reviewed: "Mark reviewed", reviewedDone: "Reviewed", reviewedCount: "Cards reviewed", true: "True", false: "False", save: "Save progress", moveUp: "Move up", moveDown: "Move down", answer: "Answer" },
  ar: { previous: "السابق", next: "التالي", submit: "تحقق من الإجابات", correct: "إجابة صحيحة", incorrect: "ليست صحيحة بعد", score: "النتيجة", flip: "أظهر الإجابة", unflip: "أظهر السؤال", reviewed: "سجّل مراجعة البطاقة", reviewedDone: "تمت المراجعة", reviewedCount: "البطاقات التي تمت مراجعتها", true: "صحيح", false: "خطأ", save: "حفظ التقدم", moveUp: "تحريك لأعلى", moveDown: "تحريك لأسفل", answer: "الإجابة" },
  ru: { previous: "Назад", next: "Далее", submit: "Проверить ответы", correct: "Верно", incorrect: "Пока неверно", score: "Результат", flip: "Показать ответ", unflip: "Показать вопрос", reviewed: "Отметить просмотренной", reviewedDone: "Просмотрена", reviewedCount: "Просмотрено карточек", true: "Верно", false: "Неверно", save: "Сохранить прогресс", moveUp: "Переместить вверх", moveDown: "Переместить вниз", answer: "Ответ" },
});

function languageOf(locale) {
  const language = String(locale || "en").toLowerCase().split("-")[0];
  return COPY[language] ? language : "en";
}

function articleStyles(theme) {
  const { light, dark } = DESIGN_TOKENS.color;
  const { typography, spacing, radius, elevation, layout } = DESIGN_TOKENS;
  const vars = (colors) => `--if-article-canvas: var(--if-host-canvas, ${colors.canvas});
    --if-article-surface: var(--if-host-surface, ${colors.surface});
    --if-article-raised: var(--if-host-raised, ${colors.raised});
    --if-article-text: var(--if-host-text, ${colors.text});
    --if-article-muted: var(--if-host-muted, ${colors.muted});
    --if-article-border: var(--if-host-border, ${colors.border});
    --if-article-accent: var(--if-host-accent, ${colors.accent});
    --if-article-accent-text: var(--if-host-accent-text, ${colors.accentText});
    --if-article-focus: var(--if-host-focus, ${colors.focus});`;
  return `
.if-article-root, .if-article-root * { box-sizing: border-box; }
.if-article-root { ${vars(light)} --if-article-font: ${typography.fontSans}; --if-article-display: ${typography.fontDisplay}; --if-article-reading: ${layout.reading};
  display:block; min-width:0; color:var(--if-article-text); background:var(--if-article-canvas); font: max(1rem, ${typography.minimumArticlePx}px)/${typography.articleLineHeight} var(--if-article-font); font-synthesis:none; text-rendering:optimizeLegibility; }
.if-article-root[data-theme="light"] { ${vars(light)} color-scheme:light; }
.if-article-root[data-theme="dark"] { ${vars(dark)} color-scheme:dark; }
.if-article-root[data-theme="system"] { color-scheme:light dark; }
@media (prefers-color-scheme: dark) { .if-article-root[data-theme="system"] { ${vars(dark)} } }
.if-article-root button, .if-article-root input, .if-article-root select { font:inherit; }
.if-article-root a { color:var(--if-article-accent); text-underline-offset:.18em; }
.if-article-root :focus-visible { outline:3px solid var(--if-article-focus); outline-offset:3px; }
.if-article-shell { width:min(100%, 88rem); margin-inline:auto; padding:clamp(${spacing[4]}, 4vw, ${spacing[8]}); }
.if-article-hero { max-width:var(--if-article-reading); padding-block:clamp(${spacing[8]}, 9vw, ${spacing[16]}) ${spacing[8]}; }
.if-article-title { max-width:18ch; margin:0; font:650 clamp(2rem, 4.4vw, 3.75rem)/1.14 var(--if-article-display), var(--if-article-font); letter-spacing:-.035em; overflow-wrap:anywhere; }
.if-article-lead { max-width:var(--if-article-reading); margin:${spacing[4]} 0 0; color:var(--if-article-muted); font-size:max(1.125rem, ${typography.minimumArticlePx}px); line-height:1.7; }
.if-article-grid { display:grid; grid-template-columns:minmax(0, 1fr) minmax(14rem, 19rem); align-items:start; gap:clamp(${spacing[6]}, 5vw, ${spacing[12]}); }
.if-article-body { min-width:0; max-width:var(--if-article-reading); }
.if-article-section { min-width:0; margin-block:0 ${spacing[12]}; scroll-margin-block:2rem; }
.if-article-section h2, .if-article-subheading { margin:0 0 ${spacing[3]}; font-size:max(1.375rem, ${typography.minimumArticlePx}px); line-height:1.35; }
.if-article-block { min-width:0; margin-block:${spacing[4]}; overflow-wrap:anywhere; }
.if-article-block p, .if-article-copy { margin:0 0 ${spacing[4]}; font-size:max(1rem, ${typography.minimumArticlePx}px); line-height:${typography.articleLineHeight}; }
.if-article-callout { border-inline-start:4px solid var(--if-article-accent); padding:${spacing[4]}; background:var(--if-article-surface); }
.if-article-quote { margin-inline:0; border-inline-start:2px solid var(--if-article-border); padding-inline-start:${spacing[4]}; color:var(--if-article-muted); }
.if-article-code { direction:ltr; text-align:left; white-space:pre-wrap; overflow-wrap:anywhere; border:1px solid var(--if-article-border); border-radius:${radius.control}; padding:${spacing[4]}; background:var(--if-article-surface); }
.if-article-code-wrap { display:grid; grid-template-columns:minmax(0, 1fr) auto; align-items:start; gap:${spacing[2]}; }
.if-code-token-keyword { color:var(--if-article-accent); font-weight:700; }
.if-code-token-string { color:#087443; }
.if-code-token-comment { color:var(--if-article-muted); font-style:italic; }
.if-code-token-number { color:#895600; }
.if-code-copy, .if-media-speed-toggle, .if-media-speed-option, .if-image-zoom, .if-image-hotspot { min-width:44px; min-height:44px; border:1px solid var(--if-article-border); border-radius:${radius.control}; color:var(--if-article-text); background:var(--if-article-raised); cursor:pointer; }
.if-media-tools { display:flex; flex-wrap:wrap; align-items:center; gap:${spacing[2]}; margin-block:${spacing[3]}; }
.if-media-speed-options { display:flex; flex-wrap:wrap; gap:${spacing[2]}; padding:${spacing[2]}; border:1px solid var(--if-article-border); border-radius:${radius.control}; background:var(--if-article-raised); }
.if-media-speed-options[hidden] { display:none; }
.if-media-speed-option[aria-pressed="true"] { border-color:var(--if-article-accent); background:var(--if-article-accent); color:var(--if-article-accent-text); }
.if-media-transcript { margin-block:${spacing[3]}; }
.if-media-transcript summary { min-height:44px; display:flex; align-items:center; cursor:pointer; }
.if-figure-stage { position:relative; max-width:100%; max-height:65vh; overflow:auto; margin-inline:auto; text-align:center; }
.if-figure-stage img { display:block; max-width:100%; height:auto; margin-inline:auto; }
.if-figure-stage[data-zoomed="true"] img { max-width:none; width:auto; max-height:none; }
.if-image-hotspot { position:absolute; transform:translate(-50%, -50%); border-radius:50%; border:2px solid #fff; background:var(--if-article-accent); color:var(--if-article-accent-text); box-shadow:0 0 0 2px var(--if-article-accent); }
.if-hotspot-alternatives { margin-block:${spacing[3]}; }
.if-hotspot-description, .if-article-status { min-height:1.6em; }
.if-article-math { display:block; max-width:100%; overflow-x:auto; padding:${spacing[3]}; text-align:center; font-size:1.2em; }
.if-article-math * { font-size:max(1rem, ${typography.minimumArticlePx}px) !important; }
.if-article-math-error { border-inline-start:4px solid #a33; padding:${spacing[3]}; background:var(--if-article-surface); }
.if-article-references { margin-block:${spacing[12]}; padding-block:${spacing[4]}; border-block-start:1px solid var(--if-article-border); }
.if-article-references li { margin-block:${spacing[3]}; overflow-wrap:anywhere; scroll-margin-block:2rem; }
.if-reference-backlink { display:inline-block; min-width:44px; min-height:44px; padding:${spacing[2]}; }
.if-article-figure, .if-article-panel { min-width:0; margin:0; border:1px solid var(--if-article-border); border-radius:${radius.surface}; padding:${spacing[4]}; background:var(--if-article-surface); box-shadow:${elevation.surface}; }
.if-article-figure img, .if-article-figure video { display:block; max-width:100%; height:auto; margin-inline:auto; }
.if-knowledge-map { min-width:0; container-type:inline-size; border:1px solid var(--if-article-border); border-radius:${radius.surface}; padding:${spacing[3]}; background:var(--if-article-surface); }
.if-knowledge-map[data-fullscreen-fallback="true"] { position:fixed; inset:0; z-index:2147483000; width:auto; height:100dvh; max-width:none; max-height:none; overflow:auto; border:0; border-radius:0; padding:${spacing[4]}; background:var(--if-article-surface); box-shadow:none; }
.if-map-toolbar { display:flex; flex-wrap:nowrap; align-items:center; gap:${spacing[2]}; overflow-x:auto; padding:2px 2px ${spacing[2]}; white-space:nowrap; }
.if-map-control, .if-map-open-article, .if-map-text-node { min-height:44px; border:1px solid var(--if-article-border); border-radius:${radius.control}; padding:${spacing[2]} ${spacing[3]}; color:var(--if-article-text); background:var(--if-article-raised); cursor:pointer; }
.if-map-control[aria-pressed="true"], .if-map-node[aria-pressed="true"], .if-map-text-node[aria-pressed="true"] { border-color:var(--if-article-accent); box-shadow:0 0 0 2px var(--if-article-accent); }
.if-map-visual-row { display:grid; grid-template-columns:minmax(0, 1fr) minmax(14rem, 19rem); grid-template-rows:minmax(24rem, 1fr) 7rem; gap:${spacing[3]}; min-width:0; }
.if-map-viewport { position:relative; grid-column:1; grid-row:1 / 3; min-width:0; min-height:24rem; max-height:42rem; overflow:hidden; border:1px solid var(--if-article-border); border-radius:${radius.control}; background:var(--if-article-canvas); touch-action:none; }
.if-map-viewport[data-interactive="false"] { touch-action:auto; }
.if-map-stage { position:absolute; top:0; left:0; transform-origin:0 0; will-change:transform; }
.if-map-edges { position:absolute; inset:0; overflow:visible; pointer-events:none; }
.if-map-edge { fill:none; stroke:var(--if-article-muted); stroke-width:2.25; vector-effect:non-scaling-stroke; }
.if-map-arrow { fill:var(--if-article-muted); }
.if-map-edge-label { fill:var(--if-article-text); font:16px var(--if-article-font); paint-order:stroke; stroke:var(--if-article-surface); stroke-width:5px; stroke-linejoin:round; }
.if-map-node { position:absolute; z-index:1; display:flex; flex-direction:column; justify-content:center; gap:4px; overflow:hidden; border:1px solid var(--if-article-border); border-radius:${radius.control}; padding:${spacing[3]}; color:var(--if-article-text); background:var(--if-article-surface); text-align:start; box-shadow:${elevation.surface}; cursor:pointer; }
.if-map-node span { color:var(--if-article-muted); font-size:max(1rem, ${typography.minimumArticlePx}px); line-height:1.4; }
.if-map-summary { grid-column:2; grid-row:1; min-width:0; padding:${spacing[3]}; border-inline-start:1px solid var(--if-article-border); overflow-wrap:anywhere; }
.if-map-summary h3, .if-map-text-alternative h3 { margin-block:0 ${spacing[2]}; font-size:max(1.125rem, ${typography.minimumArticlePx}px); }
.if-map-minimap { position:relative; grid-column:2; grid-row:2; min-width:0; min-height:7rem; overflow:hidden; border:1px solid var(--if-article-border); border-radius:${radius.control}; background:var(--if-article-raised); font-size:0; cursor:crosshair; }
.if-map-minimap-dot { position:absolute; width:5px; height:5px; border-radius:50%; background:var(--if-article-accent); transform:translate(-50%, -50%); }
.if-map-text-alternative { max-height:28rem; overflow:auto; padding:${spacing[3]}; border:1px solid var(--if-article-border); border-radius:${radius.control}; }
.if-map-text-alternative li { margin-block:${spacing[2]}; }
.if-map-status { min-height:1.5em; margin-block:${spacing[2]} 0; color:var(--if-article-muted); }
.if-article-caption, .if-article-status, .if-article-label { font-size:max(1rem, ${typography.minimumArticlePx}px); line-height:1.6; }
.if-article-caption { margin-block-start:${spacing[3]}; color:var(--if-article-muted); }
.if-article-control { display:grid; gap:${spacing[2]}; max-width:var(--if-article-reading); }
.if-article-control input, .if-article-control select { max-width:100%; min-height:44px; }
.if-article-button, .if-article-tab { min-height:44px; border:1px solid var(--if-article-border); border-radius:${radius.control}; padding:.55rem .9rem; color:var(--if-article-text); background:var(--if-article-surface); cursor:pointer; }
.if-article-button:hover, .if-article-tab:hover { border-color:var(--if-article-accent); }
.if-article-tablist { display:flex; flex-wrap:wrap; gap:${spacing[2]}; border-block-end:1px solid var(--if-article-border); padding-block-end:${spacing[2]}; }
.if-article-tab[aria-selected="true"] { border-color:var(--if-article-accent); color:var(--if-article-accent); font-weight:700; }
.if-article-tabpanel { min-width:0; padding-block:${spacing[4]}; }
.if-article-details { border-block:1px solid var(--if-article-border); padding-block:${spacing[3]}; }
.if-article-details summary { min-height:44px; cursor:pointer; font-weight:650; }
.if-article-toc { position:sticky; inset-block-start:1rem; border:1px solid var(--if-article-border); border-radius:${radius.surface}; padding:${spacing[4]}; background:var(--if-article-surface); }
.if-article-toc summary { min-height:44px; cursor:pointer; font-weight:700; }
.if-article-toc ol { margin:${spacing[3]} 0 0; padding-inline-start:1.4em; }
.if-article-toc li { margin-block:${spacing[2]}; }
.if-article-section-link { margin-inline-start:.5rem; font-size:1rem; text-decoration:none; }
.if-article-root [hidden] { display:none !important; }
.if-article-root [role="status"] { color:var(--if-article-muted); }
.if-widget-toolbar { display:flex; flex-wrap:wrap; align-items:end; gap:${spacing[3]}; margin-block-end:${spacing[3]}; }
.if-widget-field { display:grid; gap:${spacing[1]}; min-width:min(100%, 14rem); }
.if-smart-table-scroll { max-width:100%; overflow-x:auto; border:1px solid var(--if-article-border); border-radius:${radius.control}; background:var(--if-article-surface); }
.if-smart-table { width:100%; min-width:36rem; border-collapse:collapse; text-align:start; }
.if-smart-table caption { padding:${spacing[3]}; text-align:start; font-weight:700; }
.if-smart-table th, .if-smart-table td { padding:${spacing[3]}; border-block-end:1px solid var(--if-article-border); text-align:start; font-size:max(1rem, ${typography.minimumArticlePx}px); }
.if-smart-table th button { min-height:44px; font:inherit; color:inherit; border:0; background:transparent; text-align:inherit; cursor:pointer; }
.if-widget-pagination { display:flex; align-items:center; justify-content:space-between; gap:${spacing[3]}; margin-block-start:${spacing[3]}; }
.if-widget-error { color:#a12121; margin-block-start:${spacing[1]}; }
.if-calculator-inputs { display:grid; grid-template-columns:repeat(auto-fit, minmax(min(100%, 14rem), 1fr)); gap:${spacing[3]}; }
.if-calculator-result { display:block; margin-block-start:${spacing[4]}; font-weight:700; }
.if-article-comparison[data-mode="side-by-side"] .if-comparison-stage { display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:${spacing[3]}; }
.if-article-comparison[data-mode="overlay"] .if-comparison-stage { position:relative; display:grid; min-height:8rem; }
.if-article-comparison[data-mode="overlay"] .if-comparison-panel { grid-area:1/1; }
.if-article-comparison[data-mode="overlay"] .if-comparison-panel:last-child { clip-path:inset(0 0 0 var(--if-comparison-position, 50%)); }
.if-comparison-panel { min-width:0; border:1px solid var(--if-article-border); border-radius:${radius.control}; padding:${spacing[3]}; background:var(--if-article-surface); }
.if-comparison-panel output { display:block; font-size:1.25rem; font-weight:700; overflow-wrap:anywhere; }
.if-article-comparison[data-mode="overlay"] .if-widget-field { margin-block-start:${spacing[3]}; }
.if-education-nav, .if-education-controls, .if-education-options { display:flex; flex-wrap:wrap; align-items:center; gap:${spacing[2]}; margin-block:${spacing[3]}; }
.if-education-panel, .if-education-question, .if-flashcard-face, .if-guided-panel { min-width:0; border:1px solid var(--if-article-border); border-radius:${radius.control}; padding:${spacing[3]}; background:var(--if-article-surface); }
.if-education-progress { display:flex; align-items:center; gap:${spacing[2]}; margin-block:${spacing[3]}; }
.if-education-progress progress { flex:1; min-width:5rem; }
.if-quiz-feedback, .if-education-rationale { margin-block:${spacing[3]}; }
.if-quiz-options { display:grid; gap:${spacing[2]}; }
.if-quiz-option[aria-pressed="true"], .if-guided-choice[aria-pressed="true"] { border-color:var(--if-article-accent); font-weight:700; }
.if-ordering-list { display:grid; gap:${spacing[2]}; padding-inline-start:1.5rem; }
.if-ordering-item { display:flex; flex-wrap:wrap; align-items:center; gap:${spacing[2]}; }
.if-matching-list, .if-guided-stage { display:grid; grid-template-columns:repeat(auto-fit, minmax(min(100%, 14rem), 1fr)); gap:${spacing[3]}; }
.if-flashcard-face { min-height:8rem; display:grid; align-content:center; }
.if-article-block[data-block-type="progress"] progress { width:100%; min-height:1rem; }
.if-article-menu { border:1px solid var(--if-article-border); border-radius:${radius.control}; padding:${spacing[3]}; }
.if-article-menu summary { min-height:44px; cursor:pointer; font-weight:700; }
.if-article-menu-content { display:grid; gap:${spacing[2]}; padding-block-start:${spacing[3]}; }
.if-article-tooltip { position:relative; display:inline-flex; }
.if-article-tooltip [role="tooltip"] { position:absolute; z-index:2; inset-block-end:calc(100% + .5rem); inset-inline-start:0; width:max-content; max-width:min(22rem, calc(100vw - 2rem)); border:1px solid var(--if-article-border); border-radius:${radius.control}; padding:${spacing[3]}; color:var(--if-article-text); background:var(--if-article-surface); box-shadow:${elevation.surface}; opacity:0; pointer-events:none; }
.if-article-tooltip:hover [role="tooltip"], .if-article-tooltip:focus-within [role="tooltip"] { opacity:1; }
.if-article-card { display:block; width:100%; text-align:start; border:1px solid var(--if-article-border); border-radius:${radius.surface}; padding:${spacing[4]}; color:var(--if-article-text); background:var(--if-article-surface); }
.if-article-card[aria-pressed="true"] { border-color:var(--if-article-accent); box-shadow:0 0 0 2px var(--if-article-accent); }
.if-article-dialog { max-width:min(42rem, calc(100vw - 2rem)); max-height:min(85vh, 50rem); overflow:auto; border:1px solid var(--if-article-border); border-radius:${radius.surface}; padding:${spacing[6]}; color:var(--if-article-text); background:var(--if-article-surface); }
.if-article-dialog::backdrop { background:rgb(12 20 17 / .48); }
@media (max-width:55rem) { .if-article-grid { grid-template-columns:minmax(0, 1fr); } .if-article-body { max-width:none; } .if-article-toc { position:static; order:-1; } }
@media (max-width:38rem) { .if-article-shell { padding-inline:${spacing[4]}; } .if-article-figure, .if-article-panel { padding:${spacing[3]}; } .if-article-comparison[data-mode="side-by-side"] .if-comparison-stage { grid-template-columns:minmax(0, 1fr); } }
@container (max-width:56rem) { .if-map-visual-row { grid-template-columns:minmax(0, 1fr); grid-template-rows:minmax(20rem, auto) auto 6rem; } .if-map-viewport { grid-column:1; grid-row:1; min-height:20rem; } .if-map-summary { grid-column:1; grid-row:2; border-inline-start:0; border-block-start:1px solid var(--if-article-border); } .if-map-minimap { grid-column:1; grid-row:3; min-height:6rem; } }
@media (prefers-reduced-motion: reduce) { .if-article-root *, .if-article-root *::before, .if-article-root *::after { scroll-behavior:auto !important; animation-duration:.01ms !important; transition-duration:.01ms !important; } }
@media print { .if-article-root { color:#000; background:#fff; font-size:12pt; } .if-article-toc { display:none; } .if-article-shell { width:100%; padding:0; } .if-article-grid { display:block; } .if-article-body { max-width:none; } .if-article-root [hidden] { display:block !important; } .if-article-details:not([open]) > :not(summary) { display:block !important; } .if-article-details summary { display:none; } .if-article-tablist { display:none; } .if-article-tabpanel { display:block !important; break-inside:avoid; } .if-article-dialog { display:block; position:static; max-width:100%; max-height:none; break-inside:avoid; } .if-article-root a { color:#000; text-decoration:underline; } }
${SCIENTIFIC_CSS}
`;
}

function setText(document, tag, value, className) {
  const node = document.createElement(tag);
  if (className) node.setAttribute("class", className);
  node.textContent = text(value);
  return node;
}

function setAttr(node, name, value) {
  if (value !== undefined && value !== null) node.setAttribute(name, String(value));
}

function setControlIdentity(node, state, blockId, purpose, name = `if-${blockId}-${purpose}`) {
  const baseId = `if-control-${blockId}-${purpose}`;
  let id = baseId;
  let suffix = 2;
  while (state.targetIds.has(id) || state.controlIds.has(id)) id = `${baseId}-${suffix++}`;
  state.controlIds.add(id);
  node.setAttribute("id", id);
  node.setAttribute("name", name);
}

function collectArticleTargets(article) {
  const targets = new Set();
  const visit = (block) => { if (!block || typeof block !== "object") return; if (typeof block.id === "string") targets.add(block.id); for (const child of block.children ?? []) visit(child); };
  for (const section of article.sections ?? []) { if (typeof section?.id === "string") targets.add(section.id); for (const block of section?.blocks ?? []) visit(block); }
  return targets;
}

function collectLearningActivities(article) {
  const activityTypes = new Set(["stepper", "timeline", "quiz", "flashcards", "guidedComparison"]);
  const ids = [];
  const visit = (block) => {
    if (!block || typeof block !== "object") return;
    if (activityTypes.has(block.type) && typeof block.id === "string") ids.push(block.id);
    for (const child of block.children ?? []) visit(child);
  };
  for (const section of article.sections ?? []) for (const block of section?.blocks ?? []) visit(block);
  return ids;
}

function safeContentHref(href, targetIds) {
  if (typeof href !== "string" || !href || href !== href.trim() || /[\u0000-\u0020\\]/.test(href) || href.startsWith("//")) return false;
  if (href.startsWith("#")) {
    let fragment;
    try { fragment = decodeURIComponent(href.slice(1).split(/[?#]/, 1)[0]); } catch { return false; }
    return Boolean(fragment && targetIds.has(fragment));
  }
  const scheme = href.match(/^([A-Za-z][A-Za-z\d+.-]*):/);
  if (scheme) {
    if (scheme[1].toLowerCase() !== "https") return false;
    try { const url = new URL(href); return !url.username && !url.password; } catch { return false; }
  }
  const pathname = href.split(/[?#]/, 1)[0];
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { return false; }
  return !/%2f|%5c/i.test(pathname) && !decoded.split(/[\\/]/).some((segment) => segment === "..");
}

function inlineMarkup(value, targetIds) {
  const source = text(value);
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|__([^_]+)__|`([^`]+)`|\*([^*]+)\*|_([^_]+)_/g;
  let output = "";
  let cursor = 0;
  for (const match of source.matchAll(pattern)) {
    output += inlineTextMarkup(source.slice(cursor, match.index));
    if (match[1] !== undefined) output += safeContentHref(match[2], targetIds) ? `<a href="${escapeHtml(match[2])}" rel="noopener noreferrer">${inlineTextMarkup(match[1])}</a>` : inlineTextMarkup(match[0]);
    else if (match[3] !== undefined || match[4] !== undefined) output += `<strong>${escapeHtml(match[3] ?? match[4])}</strong>`;
    else if (match[5] !== undefined) output += `<code dir="ltr">${escapeHtml(match[5])}</code>`;
    else output += `<em>${escapeHtml(match[6] ?? match[7])}</em>`;
    cursor = match.index + match[0].length;
  }
  return output + inlineTextMarkup(source.slice(cursor));
}

function appendInline(document, parent, value, targetIds) {
  const source = text(value);
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|__([^_]+)__|`([^`]+)`|\*([^*]+)\*|_([^_]+)_/g;
  const appendPlain = (chunk) => { if (!chunk) return; const span = document.createElement(mixedBidi(chunk) ? "bdi" : "span"); if (span.localName === "bdi") span.setAttribute("dir", "auto"); span.textContent = chunk; parent.appendChild(span); };
  let cursor = 0;
  for (const match of source.matchAll(pattern)) {
    appendPlain(source.slice(cursor, match.index));
    let node;
    if (match[1] !== undefined) {
      if (!safeContentHref(match[2], targetIds)) { appendPlain(match[0]); cursor = match.index + match[0].length; continue; }
      node = document.createElement("a"); node.setAttribute("href", match[2]); node.setAttribute("rel", "noopener noreferrer");
      if (mixedBidi(match[1])) { const isolated = document.createElement("bdi"); isolated.setAttribute("dir", "auto"); isolated.textContent = match[1]; node.appendChild(isolated); } else node.textContent = match[1];
    } else if (match[3] !== undefined || match[4] !== undefined) { node = document.createElement("strong"); node.textContent = match[3] ?? match[4]; }
    else if (match[5] !== undefined) { node = document.createElement("code"); node.setAttribute("dir", "ltr"); node.textContent = match[5]; }
    else { node = document.createElement("em"); node.textContent = match[6] ?? match[7]; }
    parent.appendChild(node);
    cursor = match.index + match[0].length;
  }
  appendPlain(source.slice(cursor));
}

function staticReferences(plan, locale) {
  if (!plan.entries.length) return "";
  const copy = richCopy(locale);
  const entries = plan.entries.map((entry) => {
    const source = entry.source;
    const details = source ? [source.author, source.publisher, source.license].filter(Boolean).map(escapeHtml).join(" · ") : "";
    const title = source?.title ?? `${copy.footnote} ${entry.number}`;
    const sourceLink = source?.url ? ` <a href="${escapeHtml(source.url)}" rel="noopener noreferrer">${escapeHtml(source.url)}</a>` : "";
    const note = entry.note ? `<p>${escapeHtml(entry.note)}</p>` : "";
    const backlinks = entry.blockIds.map((id) => `<a class="if-reference-backlink" href="#${escapeHtml(id)}" aria-label="${escapeHtml(copy.sourceBack)} ${entry.number}">↩</a>`).join(" ");
    return `<li id="${escapeHtml(entry.id)}" tabindex="-1"><cite>${escapeHtml(title)}</cite>${details ? `<p>${details}</p>` : ""}${sourceLink}${note}<p>${backlinks}</p></li>`;
  }).join("");
  return `<section class="if-article-references" id="article-references" tabindex="-1" data-reference-list><h2>${escapeHtml(copy.references)}</h2><ol>${entries}</ol></section>`;
}

function staticMedia(block, article, id = "") {
  const asset = article.assets.find((item) => item.id === block.props?.assetId);
  if (!asset) return `<figure class="if-article-figure"><figcaption>${escapeHtml(block.props?.description ?? block.content ?? "")}</figcaption></figure>`;
  const caption = block.props?.caption ?? block.content ?? asset.alt;
  const integrityFallback = `<p class="if-article-status" role="note">${escapeHtml(asset.alt)} ${escapeHtml(richCopy(article.locale).staticIntegrityUnavailable)}</p>`;
  if (block.type === "figure") {
    const hotspots = (block.props?.hotspots ?? []).map((hotspot) => `<li><strong>${escapeHtml(hotspot.label)}:</strong> ${escapeHtml(hotspot.description)}</li>`).join("");
    const image = asset.integrity ? integrityFallback : `<img src="${escapeHtml(asset.url)}" alt="${escapeHtml(asset.alt)}"${asset.width ? ` width="${asset.width}"` : ""}${asset.height ? ` height="${asset.height}"` : ""}>`;
    return `<figure${id} class="if-article-figure"><div class="if-figure-stage">${image}</div><figcaption>${escapeHtml(caption)}</figcaption>${hotspots ? `<ol class="if-hotspot-alternatives">${hotspots}</ol>` : ""}</figure>`;
  }
  const transcript = block.props?.transcript ?? asset.captions?.[article.locale] ?? Object.values(asset.captions ?? {})[0];
  const tracks = (asset.captionTracks ?? []).map((track) => {
    const trackAsset = article.assets.find((item) => item.id === track.assetId);
    return trackAsset && !trackAsset.integrity ? `<track kind="${escapeHtml(track.kind ?? "captions")}" src="${escapeHtml(trackAsset.url)}" srclang="${escapeHtml(track.locale)}" label="${escapeHtml(track.label)}"${track.locale.toLowerCase() === article.locale.toLowerCase() ? " default" : ""}>` : "";
  }).join("");
  const tag = block.type;
  const media = asset.integrity ? integrityFallback : `<${tag} src="${escapeHtml(asset.url)}" controls preload="none"${block.type === "video" && asset.width ? ` width="${asset.width}"` : ""}${block.type === "video" && asset.height ? ` height="${asset.height}"` : ""}>${tracks}</${tag}>`;
  const download = asset.integrity ? "" : `<a href="${escapeHtml(asset.url)}" download>${escapeHtml(richCopy(article.locale).downloadMedia)}</a>`;
  return `<figure${id} class="if-article-figure">${media}<figcaption>${escapeHtml(caption)}</figcaption>${download}${transcript ? `<details class="if-media-transcript" open><summary>${escapeHtml(richCopy(article.locale).transcript)}</summary><p lang="${escapeHtml(article.locale)}" dir="${escapeHtml(article.dir)}">${escapeHtml(transcript)}</p></details>` : ""}</figure>`;
}

function focusReferenceTarget(event, target, document) {
  if (!target) return;
  event.preventDefault?.();
  target.focus?.();
  const id = target.getAttribute?.("id") ?? target.id;
  const location = document.defaultView?.location;
  if (id && location && location.hash !== `#${id}`) location.hash = `#${id}`;
}

function createReferenceList(document, plan, locale, elements, ownedListeners) {
  if (!plan.entries.length) return undefined;
  const copy = richCopy(locale);
  const section = document.createElement("section"); section.setAttribute("class", "if-article-references"); section.setAttribute("id", "article-references"); section.setAttribute("tabindex", "-1");
  section.appendChild(setText(document, "h2", copy.references));
  const list = document.createElement("ol");
  for (const entry of plan.entries) {
    const item = document.createElement("li"); item.setAttribute("id", entry.id); item.setAttribute("tabindex", "-1");
    elements.set(entry.id, item);
    const source = entry.source;
    item.appendChild(setText(document, "cite", source?.title ?? `${copy.footnote} ${entry.number}`));
    const details = [source?.author, source?.publisher, source?.license].filter(Boolean).join(" · ");
    if (details) item.appendChild(setText(document, "p", details));
    if (source?.url) {
      const link = document.createElement("a"); link.setAttribute("href", source.url); link.setAttribute("rel", "noopener noreferrer"); link.textContent = source.url; item.appendChild(link);
    }
    if (entry.note) item.appendChild(setText(document, "p", entry.note));
    for (const blockId of entry.blockIds) {
      const backlink = document.createElement("a"); backlink.setAttribute("class", "if-reference-backlink"); backlink.setAttribute("href", `#${blockId}`); backlink.setAttribute("aria-label", `${copy.sourceBack} ${entry.number}`); backlink.textContent = "↩";
      trackListener(backlink, "click", (event) => focusReferenceTarget(event, elements.get(blockId), document), ownedListeners);
      item.appendChild(backlink);
    }
    list.appendChild(item);
  }
  section.appendChild(list);
  return section;
}

function staticBlock(block, article, targetIds, scope, citationPlan) {
  const id = ` id="${escapeHtml(block.id)}"`;
  const content = escapeHtml(block.content ?? block.props?.label ?? block.props?.description ?? "");
  const children = (block.children ?? []).map((child) => staticBlock(child, article, targetIds, scope, citationPlan)).join("");
  switch (block.type) {
    case "heading": return `<h3${id}>${inlineMarkup(block.content ?? block.props?.label ?? "", targetIds)}</h3>`;
    case "paragraph": case "text": {
      const variable = block.bindings?.text ?? block.bindings?.value;
      const boundValue = variable ? scope[variable] : undefined;
      return `<p${id}>${inlineMarkup(block.content ?? "", targetIds)}${boundValue === undefined ? "" : escapeHtml(boundValue)}</p>`;
    }
    case "quote": return `<blockquote${id}>${inlineMarkup(block.content ?? "", targetIds)}${children}</blockquote>`;
    case "callout": return `<aside${id} role="note">${inlineMarkup(block.content ?? "", targetIds)}${children}</aside>`;
    case "code": return `<pre${id} class="if-article-code" dir="ltr"><code>${escapeHtml(block.content)}</code></pre>`;
    case "math": {
      try { return `<div${id} class="if-article-math">${mathNotationToMarkup(block.content, { display: block.props?.display })}</div>`; }
      catch { return `<div${id} class="if-article-math-error" role="status"><p>${escapeHtml(richCopy(article.locale).mathUnavailable)}</p><code dir="ltr">${escapeHtml(block.content)}</code></div>`; }
    }
    case "list": {
      const tag = block.props?.ordered ? "ol" : "ul";
      const items = Array.isArray(block.props?.items) ? block.props.items : (block.content ? [block.content] : []);
      return `<${tag}${id}>${items.map((item) => `<li>${inlineMarkup(item, targetIds)}</li>`).join("")}${children}</${tag}>`;
    }
    case "tabs": return `<div${id} class="if-article-static-tabs">${(block.children ?? []).map((panel) => `<section id="${escapeHtml(panel.id)}"><h3>${escapeHtml(panel.props?.label ?? panel.content ?? "")}</h3>${(panel.children ?? []).map((child) => staticBlock(child, article, targetIds, scope, citationPlan)).join("")}</section>`).join("")}</div>`;
    case "accordion": return `<details${id} open class="if-article-details"><summary>${content}</summary>${children}</details>`;
    case "conditional": return `<div${id}>${children || content}</div>`;
    case "group": return `<div${id}>${content}${children}</div>`;
    case "metric": case "slider": case "input": case "select": case "button":
      return `<p${id}><strong>${escapeHtml(block.props?.label ?? block.content ?? block.type)}:</strong> ${escapeHtml(block.props?.value ?? scope[block.bindings?.value] ?? block.content ?? "")}${escapeHtml(block.props?.unit ?? "")}</p>`;
    case "smartTable": {
      const columns = normalizeSmartTableColumns(block.props?.columns ?? []);
      const head = `<thead><tr>${columns.map((column) => `<th scope="col">${escapeHtml(column.label)}</th>`).join("")}</tr></thead>`;
      const rows = (block.props?.rows ?? []).map((row) => `<tr>${columns.map((column) => `<td>${escapeHtml(row?.[column.id])}</td>`).join("")}</tr>`).join("");
      return `<div${id} class="if-smart-table-scroll"><table class="if-smart-table">${block.props?.caption ? `<caption>${escapeHtml(block.props.caption)}</caption>` : ""}${head}<tbody>${rows}</tbody></table></div>`;
    }
    case "calculator": {
      const result = evaluateCalculator(block.props?.expression, scope, { min: block.props?.resultMin, max: block.props?.resultMax });
      const value = result.valid ? `${escapeHtml(result.value)}${block.props?.unit ? ` ${escapeHtml(block.props.unit)}` : ""}` : escapeHtml(COPY[languageOf(article.locale)].calculationError);
      return `<section${id}><h3>${escapeHtml(block.props?.label ?? block.content ?? "Calculator")}</h3><p><strong>${escapeHtml(block.props?.resultLabel ?? COPY[languageOf(article.locale)].reading)}:</strong> <output>${value}</output></p></section>`;
    }
    case "comparison": {
      const panel = (side) => {
        const spec = block.props?.[side] ?? {};
        const value = block.bindings?.[side] ? scope[block.bindings[side]] : spec.value;
        return `<section class="if-comparison-panel"><h3>${escapeHtml(spec.label)}</h3><output>${escapeHtml(value)}${spec.unit ? ` ${escapeHtml(spec.unit)}` : ""}</output></section>`;
      };
      return `<section${id} class="if-article-comparison" data-mode="${escapeHtml(block.props?.mode ?? "side-by-side")}" aria-label="${escapeHtml(block.props?.label ?? block.content ?? "Comparison")}"><div class="if-comparison-stage">${panel("left")}${panel("right")}</div></section>`;
    }
    case "filter": {
      const selected = scope[block.bindings?.value];
      const option = block.props?.options?.find((entry) => Object.is(entry.value, selected) || String(entry.value) === String(selected));
      return `<p${id}><strong>${escapeHtml(block.props?.label ?? block.content ?? "Filter")}:</strong> ${escapeHtml(option?.label ?? selected ?? "")}</p>`;
    }
    case "stepper": case "timeline": {
      const label = block.props?.label ?? (block.type === "timeline" ? "Timeline" : "Learning steps");
      const panels = (block.children ?? []).map((child, index) => `<section id="${escapeHtml(child.id)}"><h3>${escapeHtml(child.props?.label ?? child.content ?? `${index + 1}`)}</h3>${block.type === "timeline" ? `<time datetime="${escapeHtml(child.props?.date)}">${escapeHtml(child.props?.date)}</time>` : ""}${(child.children ?? []).map((entry) => staticBlock(entry, article, targetIds, scope, citationPlan)).join("")}</section>`).join("");
      return `<section${id}><h3>${escapeHtml(label)}</h3>${panels}</section>`;
    }
    case "quiz": return `<section${id}><h3>${escapeHtml(block.props?.label ?? block.content ?? "Quiz")}</h3>${(block.props?.questions ?? []).map((question) => `<fieldset><legend>${escapeHtml(question.prompt)}</legend>${(question.options ?? []).map((option) => `<p>${escapeHtml(option.label)}</p>`).join("")}${(question.pairs ?? []).map((pair) => `<p>${escapeHtml(pair.label)}</p>`).join("")}${(question.items ?? []).map((item) => `<p>${escapeHtml(item.label)}</p>`).join("")}${question.explanation ? `<p>${escapeHtml(question.explanation)}</p>` : ""}</fieldset>`).join("")}<p role="note">Interactive scoring is available when scripting is enabled.</p></section>`;
    case "flashcards": return `<section${id}><h3>${escapeHtml(block.props?.label ?? block.content ?? "Flashcards")}</h3>${(block.props?.cards ?? []).map((card) => `<details><summary>${escapeHtml(card.front)}</summary><p>${escapeHtml(card.back)}</p></details>`).join("")}</section>`;
    case "guidedComparison": return `<section${id}><h3>${escapeHtml(block.props?.label ?? block.content ?? "Guided comparison")}</h3>${(block.props?.scenarios ?? []).map((scenario) => `<section><h4>${escapeHtml(scenario.label)}</h4><div class="if-guided-stage"><p><strong>${escapeHtml(scenario.left.label)}:</strong> ${escapeHtml(scenario.left.value)}</p><p><strong>${escapeHtml(scenario.right.label)}:</strong> ${escapeHtml(scenario.right.value)}</p></div><p>${escapeHtml(scenario.rationale)}</p></section>`).join("")}</section>`;
    case "progress": {
      const maximum = block.props?.max ?? 100; const value = block.bindings?.value ? scope[block.bindings.value] : block.props?.value ?? 0;
      return `<label${id}><span>${escapeHtml(block.props?.label ?? block.content ?? "Progress")}</span><progress min="0" max="${escapeHtml(maximum)}" value="${escapeHtml(value)}"></progress><output>${Math.round(Math.max(0, Math.min(maximum, Number(value))) / maximum * 100)}%</output></label>`;
    }
    case "menu": return `<details${id} open class="if-article-menu"><summary>${escapeHtml(block.props?.label ?? block.content ?? COPY[languageOf(article.locale)].moreInfo)}</summary><div class="if-article-menu-content">${children}</div></details>`;
    case "tooltip": return `<p${id}><strong>${escapeHtml(block.props?.label ?? block.content ?? COPY[languageOf(article.locale)].moreInfo)}:</strong> ${escapeHtml(block.props?.text ?? block.props?.description ?? "")}</p>`;
    case "card": return `<section${id} class="if-article-card">${block.props?.label ? `<h3>${escapeHtml(block.props.label)}</h3>` : ""}${children}</section>`;
    case "dialog": return `<section${id} class="if-article-dialog"><h3>${escapeHtml(block.props?.label ?? block.content ?? COPY[languageOf(article.locale)].moreInfo)}</h3>${children}</section>`;
    case "knowledgeMap": {
      const nodes = block.props?.nodes ?? [];
      const entries = nodes.map((node) => `<li><strong>${escapeHtml(node.label)}</strong>${node.summary ? ` — ${escapeHtml(node.summary)}` : ""}${node.articleRef ? ` <span>(${escapeHtml(node.articleRef)})</span>` : ""}</li>`).join("");
      return `<section${id} class="if-article-figure"><h3>${escapeHtml(block.props?.title ?? block.props?.description ?? block.content ?? "Knowledge map")}</h3><ul>${entries}</ul></section>`;
    }
    case "simulator2d": case "model3d": case "map": case "mathGraph": case "physicsExperiment": case "chemistry": case "anatomy": case "animationTimeline": {
      const description = block.props?.description ?? block.content ?? "";
      const title = block.props?.label ?? block.props?.formula ?? block.type;
      const details = block.type === "map" ? (block.props?.markers ?? []).map((marker) => `<li>${escapeHtml(marker.label)}${marker.description ? ` — ${escapeHtml(marker.description)}` : ""}</li>`).join("")
        : block.type === "chemistry" ? (block.props?.atoms ?? []).map((atom) => `<li>${escapeHtml(atom.label ?? atom.element)} (${escapeHtml(atom.element)})</li>`).join("")
          : block.type === "anatomy" ? (block.props?.parts ?? []).map((part) => `<li>${escapeHtml(part.label)} — ${escapeHtml(part.description)}</li>`).join("")
            : block.type === "animationTimeline" ? (block.props?.frames ?? []).map((frame) => `<li>${escapeHtml(frame.label)} — ${escapeHtml(frame.timeMs)} ms</li>`).join("") : "";
      return `<figure${id} class="if-science-widget if-science-static"><h3>${escapeHtml(title)}</h3><figcaption>${escapeHtml(description)}</figcaption>${details ? `<ul>${details}</ul>` : ""}</figure>`;
    }
    case "figure": case "audio": case "video": return staticMedia(block, article, id);
    case "legacyViz":
      return `<figure${id} class="if-article-figure"><figcaption>${escapeHtml(block.props?.description ?? block.props?.alt ?? block.content ?? "")}</figcaption></figure>`;
    case "citation": {
      const entry = citationPlan.byBlockId.get(block.id);
      if (entry) return `<p${id} tabindex="-1">${block.content ? `<cite>${escapeHtml(block.content)}</cite> ` : ""}<a href="#${escapeHtml(entry.id)}" aria-label="${escapeHtml(richCopy(article.locale).references)} ${entry.number}">[${entry.number}]</a></p>`;
      return `<p${id}>${content || escapeHtml(block.props?.title ?? "")}</p>`;
    }
    default: return `<div${id}>${content}${children}</div>`;
  }
}

function validatedArticle(input) {
  const result = validateArticle(input);
  if (!result.ok) {
    const error = new TypeError("Static article output requires a valid intui.article v1 document.");
    error.issues = result.errors;
    throw error;
  }
  return result.value;
}

/** Generate a safe, semantic HTML fragment for server/build-time output before client enhancement. */
export function renderArticleStatic(input, { theme = "system" } = {}) {
  const article = validatedArticle(input);
  const targetIds = collectArticleTargets(article);
  targetIds.add(article.id);
  const citationPlan = buildCitationPlan(article);
  const scope = createReactiveStore(article).getSnapshot();
  const locale = escapeHtml(article.locale);
  const direction = article.dir;
  const toc = article.sections.map((section) => `<li><a href="#${escapeHtml(section.id)}">${escapeHtml(section.heading)}</a></li>`).join("");
  const sections = article.sections.map((section) => `<section class="if-article-section" id="${escapeHtml(section.id)}"><h2>${escapeHtml(section.heading)} <a class="if-article-section-link" href="#${escapeHtml(section.id)}" aria-label="${escapeHtml(COPY[languageOf(article.locale)].sectionLink)}: ${escapeHtml(section.heading)}">¶</a></h2>${section.blocks.map((block) => staticBlock(block, article, targetIds, scope, citationPlan)).join("")}</section>`).join("");
  const references = staticReferences(citationPlan, article.locale);
  const styles = articleStyles(resolveTheme(theme));
  return `<style>${styles}</style><article class="if-article-root" data-theme="${escapeHtml(resolveTheme(theme))}" lang="${locale}" dir="${direction}"><div class="if-article-shell"><header class="if-article-hero"><p class="if-article-caption">${escapeHtml(article.metadata.contentType)}</p><h1 class="if-article-title">${escapeHtml(article.title)}</h1><p class="if-article-lead">${escapeHtml(article.summary)}</p></header><div class="if-article-grid"><main class="if-article-body" aria-label="${escapeHtml(COPY[languageOf(article.locale)].article)}">${sections}${references}</main><nav class="if-article-toc" aria-label="${escapeHtml(COPY[languageOf(article.locale)].contents)}"><details open><summary>${escapeHtml(COPY[languageOf(article.locale)].contents)}</summary><ol>${toc}</ol></details></nav></div></div></article>`;
}

function safeAssetSource(value) {
  if (typeof value !== "string" || !value || value.length > 2048 || /[\u0000-\u0020\\]/.test(value) || value.startsWith("//")) return false;
  if (/^https:\/\//i.test(value)) { try { const url = new URL(value); return !url.username && !url.password; } catch { return false; } }
  return !/^[A-Za-z][A-Za-z\d+.-]*:/.test(value) && !value.split(/[?#]/, 1)[0].split("/").includes("..");
}

function bindingValue(store, bindings, property, fallback) {
  const variable = bindings?.[property];
  if (typeof variable !== "string") return fallback;
  try { return store.get(variable); } catch { return fallback; }
}

function resolveAsset(article, assetId, host) {
  const asset = article.assets.find((candidate) => candidate.id === assetId);
  if (!asset) return undefined;
  const resolver = host?.resolveAsset;
  if (typeof resolver === "function") {
    try { const resolved = resolver(assetId, asset); return safeAssetSource(resolved) ? { asset, src: resolved } : undefined; }
    catch { return undefined; }
  }
  return safeAssetSource(asset.url) ? { asset, src: asset.url } : undefined;
}

function selectRoot(container, document) {
  if (container.shadowRoot) return { root: container.shadowRoot, shadow: true };
  if (typeof container.attachShadow === "function") {
    try { return { root: container.attachShadow({ mode: "open" }), shadow: true }; } catch { /* closed or unsupported root: use scoped fallback */ }
  }
  const root = document.createElement("div");
  container.appendChild(root);
  return { root, shadow: false };
}

function reportHostError(environment, error, phase) {
  try { environment?.onError?.(error, phase); } catch { /* Host observers cannot break the article. */ }
}

function sendProgress(environment, articleId, action, actionContext, learningProgress, store, renderContext) {
  const snapshot = learningProgress?.getSnapshot?.();
  if (!snapshot) return undefined;
  if (typeof environment?.progress?.save === "function") {
    try {
      const result = environment.progress.save({ articleId, action, progress: snapshot, learningProgress: snapshot, store, context: renderContext, signal: renderContext?.signal });
      return result && typeof result.then === "function"
        ? result.catch((error) => { reportHostError(environment, error, "progress-save"); return undefined; })
        : result;
    } catch (error) {
      reportHostError(environment, error, "progress-save");
      return undefined;
    }
  }
  if (typeof environment?.onProgress !== "function") return undefined;
  return environment.onProgress(action, Object.freeze({
    ...actionContext,
    articleId,
    progress: snapshot,
    learningProgress: snapshot,
    store,
    context: renderContext,
  }));
}

function restoreLearningSelections(article, store, learningProgress) {
  const restored = learningProgress.getSnapshot().activities;
  function visit(block) {
    if (!block || typeof block !== "object") return;
    if (["stepper", "timeline", "guidedComparison"].includes(block.type) && block.bindings?.selected) {
      const selectedId = restored[block.id]?.selectedId;
      const allowed = block.type === "guidedComparison" ? (block.props?.scenarios ?? []).map((item) => item.id) : (block.children ?? []).map((item) => item.id);
      const definition = store.getDefinition(block.bindings.selected);
      if (typeof selectedId === "string" && allowed.includes(selectedId) && definition?.type === "enum" && definition.values.includes(selectedId)) {
        try { store.set(block.bindings.selected, selectedId); } catch { /* Invalid saved state cannot block the current article. */ }
      }
    }
    for (const child of block.children ?? []) visit(child);
  }
  for (const section of article.sections ?? []) for (const block of section?.blocks ?? []) visit(block);
}

function makeHandlers(environment, elements, learningProgress, articleId, store, renderContext) {
  const handlers = {};
  const hostCallback = (actionName, callbackName) => {
    if (typeof environment?.[callbackName] === "function") handlers[actionName] = (...args) => environment[callbackName](...args);
  };
  if (typeof environment?.onNavigate === "function") handlers.navigate = (action, context) => environment.onNavigate(action.route, context);
  hostCallback("filter", "onFilter");
  hostCallback("submit", "onSubmitQuiz");
  hostCallback("media", "onMedia");
  handlers.dialog = (action, context) => {
    const target = elements.get(action.targetId);
    if (target?.tagName !== "DIALOG") throw new TypeError(`Dialog target "${action.targetId}" is unavailable.`);
    if (action.action === "openDialog") {
      if (typeof target.showModal === "function") target.showModal();
      else target.open = true;
    } else if (action.action === "closeDialog") {
      if (typeof target.close === "function") target.close();
      else target.open = false;
    }
    return environment?.onDialog?.(action, context);
  };
  hostCallback("activity", "onActivity");
  if (typeof environment?.onProgress === "function" || typeof environment?.progress?.save === "function") {
    handlers.progress = (action, context) => sendProgress(environment, articleId, action, context, learningProgress, store, renderContext);
  }
  handlers.scroll = (action) => elements.get(action.targetId)?.scrollIntoView?.({ behavior: "auto", block: "start" });
  handlers.expand = (action) => {
    const target = elements.get(action.targetId);
    if (target?.tagName === "DETAILS") target.open = true;
  };
  return handlers;
}

function eventPayload(event, node, store, block) {
  if (node.tagName === "INPUT" && node.type === "range") return { value: Number(node.value) };
  if (node.tagName === "INPUT" && node.type === "checkbox") return { checked: Boolean(node.checked) };
  if (node.tagName === "SELECT") {
    const value = node.value;
    return { value: value === "" ? value : Number.isFinite(Number(value)) && store.getDefinition(block.bindings?.value)?.type !== "string" && store.getDefinition(block.bindings?.value)?.type !== "enum" ? Number(value) : value };
  }
  if (node.value !== undefined && node.value !== "") return { value: node.value };
  return {};
}

function setBoundValue(block, property, value, targets) {
  const node = targets.get(block.id)?.get(property);
  if (!node) return;
  if (block.type === "progress" && property === "value") {
    const maximum = Number(block.props?.max ?? 100);
    node.value = Math.max(0, Math.min(maximum, Number(value)));
    const output = findNode(node.parentNode, (child) => child.getAttribute?.("data-progress-output") === "");
    if (output) output.textContent = `${Math.round((node.value / maximum) * 100)}%`;
    return;
  }
  if (property === "value" && ["INPUT", "SELECT"].includes(node.tagName)) node.value = String(value ?? "");
  else if (property === "open") node.open = Boolean(value);
  else if (property === "text" || property === "value" || property === "selected") {
    if (block.type === "metric" && property === "value") {
      node.textContent = `${text(value)}${text(block.props?.unit)}`;
      node.parentNode?.setAttribute?.("data-value", value);
    } else if (block.type === "tabs" && property === "selected") {
      for (const child of node.children) {
        const selected = child.getAttribute("data-panel-id") === String(value);
        child.setAttribute("aria-selected", String(selected));
        child.setAttribute("tabindex", selected ? "0" : "-1");
      }
      for (const panel of targets.get(`${block.id}:panels`) ?? []) panel.hidden = panel.id !== String(value);
    } else node.textContent = text(value);
  }
}

/** Create the default, host-neutral article renderer registration. */
export function createArticleRenderer(options = {}) {
  const theme = resolveTheme(options.theme ?? "system");
  return Object.freeze({
    id: RENDERER_ID,
    version: "1.0.0",
    capabilities: Object.freeze(["portable-article", "rtl", "static-fallback", "nested-blocks", "education", "knowledge-map", "visualization-state-bindings", "print"]),
    default: options.default !== false,
    render: (container, article, context) => renderArticle(container, article, context, options, theme),
  });
}

/** Register the portable article renderer with an existing IntuiForge engine. */
export function registerArticleRenderer(engine, options = {}) {
  if (!engine || typeof engine.registerRenderer !== "function") throw new TypeError("registerArticleRenderer requires an IntuiForge engine instance.");
  return engine.registerRenderer(createArticleRenderer(options));
}

async function renderArticle(container, article, context, options, configuredTheme) {
  if (!article || article.kind !== "intui.article" || article.schemaVersion !== "1.0.0") throw new TypeError("Article renderer requires normalized intui.article v1 data.");
  const document = context.environment?.document || globalThis.document;
  if (!document?.createElement) throw new TypeError("Article rendering requires a browser-compatible document.");
  const language = article.locale || context.lang || "en";
  const copy = COPY[languageOf(language)];
  const host = context.environment ?? {};
  const theme = resolveTheme(host.theme ?? configuredTheme);
  const themeTokens = normalizeHostThemeTokens(host.themeTokens ?? options.themeTokens ?? {});
  const targetIds = collectArticleTargets(article);
  const citationPlan = buildCitationPlan(article);
  const activityIds = collectLearningActivities(article);
  const { root } = selectRoot(container, document);
  root.replaceChildren();
  let restoredProgress;
  if (activityIds.length && typeof host.progress?.load === "function") {
    const loading = setText(document, "p", languageOf(language) === "ar" ? "جارٍ استعادة التقدم المحفوظ…" : "Loading saved progress…", "if-article-status");
    loading.setAttribute("role", "status");
    root.appendChild(loading);
    try {
      const loaded = await host.progress.load({ articleId: article.id, activityIds: Object.freeze([...activityIds]), signal: context.signal });
      restoredProgress = loaded?.activities;
    } catch (error) { reportHostError(host, error, "progress-load"); }
    if (context.signal?.aborted) return () => root.replaceChildren();
  }

  const store = createReactiveStore(article);
  let learningProgress;
  try { learningProgress = createLearningProgress(activityIds, restoredProgress === undefined ? undefined : { initialState: restoredProgress }); }
  catch (error) {
    reportHostError(host, error, "progress-load");
    learningProgress = createLearningProgress(activityIds);
  }
  restoreLearningSelections(article, store, learningProgress);
  root.replaceChildren();
  const style = document.createElement("style");
  const cspNonce = options.cspNonce ?? host.cspNonce;
  if (typeof cspNonce === "string" && /^[A-Za-z0-9+/_=-]{1,256}$/.test(cspNonce)) style.setAttribute("nonce", cspNonce);
  style.textContent = articleStyles(theme);
  const app = document.createElement("div");
  app.setAttribute("class", "if-article-root");
  app.setAttribute("id", article.id);
  app.setAttribute("data-theme", theme);
  app.setAttribute("lang", language);
  app.setAttribute("dir", article.dir);
  for (const [property, value] of Object.entries(themeTokens)) app.style?.setProperty?.(property, value);
  root.append(style, app);

  const elements = new Map();
  const bindingTargets = new Map();
  const blocks = new Map();
  const adapterStates = new Map();
  const mapStates = new Map();
  const controlIds = new Set();
  const ownedListeners = [];
  let disposed = false;
  const shell = document.createElement("div"); shell.setAttribute("class", "if-article-shell");
  const hero = document.createElement("header"); hero.setAttribute("class", "if-article-hero");
  hero.append(setText(document, "p", article.metadata.contentType, "if-article-caption"), setText(document, "h1", article.title, "if-article-title"), setText(document, "p", article.summary, "if-article-lead"));
  const grid = document.createElement("div"); grid.setAttribute("class", "if-article-grid");
  const main = document.createElement("main"); main.setAttribute("class", "if-article-body"); main.setAttribute("aria-label", copy.article);
  const nav = document.createElement("nav"); nav.setAttribute("class", "if-article-toc"); nav.setAttribute("aria-label", copy.contents);
  const tocDetails = document.createElement("details"); tocDetails.open = true;
  tocDetails.append(setText(document, "summary", copy.contents));
  const tocList = document.createElement("ol");
  for (const section of article.sections) {
    const item = document.createElement("li"); const link = document.createElement("a");
    link.setAttribute("href", `#${section.id}`); link.textContent = section.heading; item.appendChild(link); tocList.appendChild(item);
  }
  tocDetails.appendChild(tocList); nav.appendChild(tocDetails);
  for (const section of article.sections) {
    const sectionNode = document.createElement("section"); sectionNode.setAttribute("class", "if-article-section"); sectionNode.setAttribute("id", section.id); sectionNode.setAttribute("tabindex", "-1");
    const heading = document.createElement("h2"); heading.textContent = section.heading;
    const permalink = document.createElement("a"); permalink.setAttribute("class", "if-article-section-link"); permalink.setAttribute("href", `#${section.id}`); permalink.setAttribute("aria-label", `${copy.sectionLink}: ${section.heading}`); permalink.textContent = "¶"; heading.appendChild(permalink); sectionNode.appendChild(heading);
    elements.set(section.id, sectionNode);
    for (const block of section.blocks) sectionNode.appendChild(renderBlock(block, { document, article, targetIds, controlIds, store, learningProgress, context, host, copy, citationPlan, elements, bindingTargets, blocks, adapterStates, mapStates, ownedListeners, options, depth: 0 }));
    main.appendChild(sectionNode);
  }
  const referenceList = createReferenceList(document, citationPlan, article.locale, elements, ownedListeners);
  if (referenceList) main.appendChild(referenceList);
  grid.append(main, nav); shell.append(hero, grid); app.appendChild(shell);

  const dispatcher = createActionDispatcher({ store, article, handlers: { ...makeHandlers(host, elements, learningProgress, article.id, store, context), ...(options.handlers ?? {}) } });

  async function mountVisualization(block) {
    const state = adapterStates.get(block.id);
    const adapter = context.getAdapter?.("org.intuiforge.richviz");
    if (!adapter || typeof adapter.render !== "function" || !block.props?.spec) {
      if (!state.fallback) {
        state.fallback = setText(document, "p", block.props?.description || copy.unavailable, "if-article-status");
        state.fallback.setAttribute("role", "status"); state.host.replaceChildren(state.fallback);
      }
      return;
    }
    const revision = ++state.revision;
    try { await state.handle?.dispose?.(); } catch { /* old adapter teardown is isolated */ }
    if (disposed) return;
    state.host.replaceChildren();
    const boundSpec = applyVisualizationBindings(block.props.spec, state.bindings);
    const handle = await adapter.render(state.host, boundSpec, { lang: language, dir: article.dir, document, signal: context.signal, bindings: Object.freeze({ ...state.bindings }) });
    if (disposed || revision !== state.revision) { await handle?.dispose?.(); return; }
    state.handle = handle;
    if (handle?.ready && typeof handle.ready.then === "function") await handle.ready;
  }

  for (const block of blocks.values()) if (block.type === "legacyViz") {
    const hostNode = findNode(elements.get(block.id), (node) => node.getAttribute?.("data-visualization-host") === "");
    if (hostNode) {
      const initialBindings = {};
      for (const [property, variable] of Object.entries(block.bindings ?? {})) {
        try { initialBindings[property] = store.get(variable); } catch { /* schema validation reports unknown refs */ }
      }
      adapterStates.set(block.id, { host: hostNode, bindings: initialBindings, revision: 0, handle: null, fallback: null });
      await mountVisualization(block);
    }
  }

  function updateBoundValue(update) {
    if (disposed) return;
    const block = blocks.get(update.blockId);
    setBoundValue(block, update.property, update.value, bindingTargets);
    const adapter = adapterStates.get(update.blockId);
    if (adapter && !Object.is(adapter.bindings[update.property], update.value)) {
      adapter.bindings[update.property] = update.value;
      void mountVisualization(block).catch((error) => host.onError?.(error, "adapter"));
    }
    if (block?.type === "knowledgeMap" && update.property === "selected") mapStates.get(update.blockId)?.setSelected(update.value);
    if (block?.type === "accordion" && update.property === "open") elements.get(block.id).open = Boolean(update.value);
  }

  const bindings = bindArticleBlocks(article, store, updateBoundValue);
  for (const [blockId, block] of blocks) {
    const node = elements.get(blockId);
    const boundControl = ["slider", "input", "select"].includes(block.type);
    const eventNames = new Set(Object.keys(block.events ?? {}));
    if (boundControl) for (const eventName of block.type === "select" ? ["change"] : ["input", "change"]) eventNames.add(eventName);
    for (const eventName of eventNames) {
      if (!DOM_EVENTS.has(eventName)) continue;
      const target = controlTarget(block, node);
      if (!target?.addEventListener) continue;
      const listener = (event) => {
        try {
          const payload = eventPayload(event, target, store, block);
          if (boundControl && ["input", "change"].includes(eventName)) {
            const definition = store.getDefinition(block.bindings?.value);
            const validation = block.props.validation ?? {};
            const inferredType = definition?.type ?? (block.type === "slider" || block.props.inputType === "number" ? "number" : block.type === "select" ? "enum" : "string");
            const inputFormat = block.type === "input" && ["date", "email"].includes(block.props.inputType) ? block.props.inputType : undefined;
            const type = validation.type ?? inputFormat ?? inferredType;
            const options = (block.props.options ?? []).map((option) => option?.value ?? option?.id ?? option);
            const rules = {
              ...validation,
              type,
              values: validation.values ?? definition?.values ?? (type === "enum" ? options : undefined),
              required: validation.required ?? block.props.required ?? Boolean(definition),
              min: validation.min ?? block.props.min ?? definition?.min,
              max: validation.max ?? block.props.max ?? definition?.max,
              step: validation.step ?? block.props.step ?? definition?.step,
              minLength: validation.minLength ?? block.props.minLength ?? definition?.minLength,
              maxLength: validation.maxLength ?? block.props.maxLength ?? definition?.maxLength,
            };
            const checked = validateWidgetValue(payload.value, rules);
            let status = Array.from(node.children ?? []).find((child) => child.getAttribute?.("data-validation-error") === "");
            if (!status) { status = setText(document, "span", "", "if-widget-error"); status.setAttribute("role", "alert"); status.setAttribute("data-validation-error", ""); node.appendChild(status); }
            target.setAttribute("aria-invalid", String(!checked.valid)); status.textContent = checked.valid ? "" : validationMessage(copy, checked.error);
            if (!checked.valid) return;
            if (block.bindings?.value) store.set(block.bindings.value, checked.value);
          }
          if (Object.hasOwn(block.events ?? {}, eventName)) dispatcher.dispatchEvent(block.id, eventName, payload);
        }
        catch (error) {
          host.onError?.(error, "action");
          let status = Array.from(node.children ?? []).find((child) => child.getAttribute?.("data-action-error") === "");
          if (!status) { status = setText(document, "p", error.message || "Action unavailable", "if-article-status"); status.setAttribute("role", "status"); status.setAttribute("data-action-error", ""); node.appendChild(status); }
        }
      };
      target.addEventListener(eventName, listener);
      ownedListeners.push(() => target.removeEventListener(eventName, listener));
    }
  }
  for (const [blockId, block] of blocks) if (block.type === "conditional") {
    const condition = block.props?.condition ?? block.props?.when;
    try {
      const unsubscribe = store.subscribe((snapshot) => Boolean(evaluateExpression(condition, snapshot)), (visible) => {
        const node = elements.get(blockId);
        if (node) node.hidden = !visible;
      });
      ownedListeners.push(unsubscribe);
    } catch {
      const node = elements.get(blockId);
      if (node) { node.hidden = false; node.setAttribute("data-state", "error"); }
    }
  }
  context.signal?.addEventListener("abort", () => void cleanup(), { once: true });

  async function cleanup() {
    if (disposed) return;
    disposed = true;
    bindings.dispose();
    store.dispose();
    learningProgress.dispose();
    for (const removeListener of ownedListeners.splice(0)) removeListener();
    for (const map of mapStates.values()) map.dispose();
    mapStates.clear();
    for (const state of adapterStates.values()) { state.revision += 1; try { await state.handle?.dispose?.(); } catch { /* adapter teardown cannot break article disposal */ } }
    root.replaceChildren();
  }
  return { dispose: cleanup, state: store, learningProgress };
}

function findNode(root, predicate) {
  if (!root) return undefined;
  if (predicate(root)) return root;
  for (const child of root.children ?? []) {
    const result = findNode(child, predicate);
    if (result) return result;
  }
  return undefined;
}

function controlTarget(block, node) {
  if (["slider", "input", "select", "filter"].includes(block.type)) return findNode(node, (child) => ["INPUT", "SELECT"].includes(child.tagName)) ?? node;
  if (block.type === "progress" && block.events?.click) return findNode(node, (child) => child.getAttribute?.("data-save-progress") === "") ?? node;
  if (block.type === "button") return findNode(node, (child) => child.tagName === "BUTTON") ?? node;
  if (block.type === "tabs") return node;
  return node;
}

function trackListener(node, type, callback, ownedListeners) {
  node.addEventListener(type, callback);
  ownedListeners.push(() => node.removeEventListener?.(type, callback));
}

function validationMessage(copy, error) {
  return ({ required: copy.required, type: copy.typeError, integer: copy.integerError, min: copy.minError, max: copy.maxError, minLength: copy.minLengthError, maxLength: copy.maxLengthError, enum: copy.enumError })[error] ?? copy.typeError;
}

function renderSmartTable(block, state, wrapper) {
  const { document, copy, options, host, ownedListeners } = state;
  const columns = normalizeSmartTableColumns(block.props.columns);
  const rows = block.props.rows;
  const filters = block.props.filters ?? [];
  const current = { search: "", filters: Object.create(null), sortBy: null, sortDirection: "asc", page: 1 };
  const toolbar = document.createElement("div"); toolbar.setAttribute("class", "if-widget-toolbar");
  const searchField = document.createElement("label"); searchField.setAttribute("class", "if-widget-field"); searchField.textContent = block.props.searchLabel ?? copy.search;
  const search = document.createElement("input"); search.setAttribute("type", "search"); search.setAttribute("aria-label", block.props.searchLabel ?? copy.search); setControlIdentity(search, state, block.id, "table-search"); searchField.appendChild(search); toolbar.appendChild(searchField);
  trackListener(search, "input", () => { current.search = search.value; current.page = 1; render(); }, ownedListeners);
  for (const filter of filters) {
    const field = document.createElement("label"); field.setAttribute("class", "if-widget-field"); field.textContent = filter.label ?? copy.filter;
    const select = document.createElement("select"); select.setAttribute("aria-label", filter.label ?? copy.filter); setControlIdentity(select, state, block.id, `table-filter-${filter.columnId}`);
    const all = document.createElement("option"); all.setAttribute("value", "all"); all.textContent = copy.all; select.appendChild(all);
    for (const option of filter.options ?? []) { const item = document.createElement("option"); item.setAttribute("value", String(option.value)); item.textContent = option.label ?? String(option.value); select.appendChild(item); }
    field.appendChild(select); toolbar.appendChild(field);
    trackListener(select, "change", () => { current.filters[filter.columnId] = select.value; current.page = 1; render(); }, ownedListeners);
  }
  const exportButton = setText(document, "button", block.props.exportLabel ?? copy.export, "if-article-button"); exportButton.setAttribute("type", "button"); exportButton.setAttribute("aria-label", block.props.exportLabel ?? copy.export); toolbar.appendChild(exportButton);
  trackListener(exportButton, "click", () => {
    const first = deriveSmartTableView({ columns, rows, ...current, page: 1, pageSize: 100 });
    const exportRows = [...first.rows];
    for (let page = 2; page <= first.pageCount; page += 1) exportRows.push(...deriveSmartTableView({ columns, rows, ...current, page, pageSize: 100 }).rows);
    const csv = encodeCsv(columns, exportRows);
    const filename = block.props.filename ?? `${block.id}.csv`;
    const callback = options.onExport ?? host.onExport;
    if (typeof callback === "function") callback(Object.freeze({ blockId: block.id, filename, mimeType: "text/csv;charset=utf-8", content: csv }));
    else {
      const BlobType = document.defaultView?.Blob ?? globalThis.Blob;
      const URLApi = document.defaultView?.URL ?? globalThis.URL;
      if (!BlobType || !URLApi?.createObjectURL) throw new TypeError("CSV export is unavailable in this browser.");
      const url = URLApi.createObjectURL(new BlobType([csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a"); link.setAttribute("href", url); link.setAttribute("download", filename); link.click();
      (document.defaultView?.setTimeout ?? globalThis.setTimeout)(() => URLApi.revokeObjectURL(url), 0);
    }
  }, ownedListeners);
  wrapper.appendChild(toolbar);

  const scroll = document.createElement("div"); scroll.setAttribute("class", "if-smart-table-scroll");
  const table = document.createElement("table"); table.setAttribute("class", "if-smart-table");
  if (block.props.caption) table.appendChild(setText(document, "caption", block.props.caption));
  const head = document.createElement("thead"); const headerRow = document.createElement("tr"); const headerCells = [];
  for (const column of columns) {
    const th = document.createElement("th"); th.setAttribute("scope", "col");
    const button = setText(document, "button", column.label, null); button.setAttribute("type", "button"); button.setAttribute("aria-label", `${column.label}: ${copy.sort}`);
    trackListener(button, "click", () => {
      if (current.sortBy === column.id) current.sortDirection = current.sortDirection === "asc" ? "desc" : "asc";
      else { current.sortBy = column.id; current.sortDirection = "asc"; }
      render();
    }, ownedListeners);
    th.appendChild(button); headerRow.appendChild(th); headerCells.push(th);
  }
  head.appendChild(headerRow); table.appendChild(head);
  const body = document.createElement("tbody"); table.appendChild(body); scroll.appendChild(table); wrapper.appendChild(scroll);
  const pagination = document.createElement("div"); pagination.setAttribute("class", "if-widget-pagination");
  const previous = setText(document, "button", copy.previous, "if-article-button"); previous.setAttribute("type", "button");
  const pageStatus = setText(document, "span", "", "if-article-status"); pageStatus.setAttribute("aria-live", "polite");
  const next = setText(document, "button", copy.next, "if-article-button"); next.setAttribute("type", "button");
  trackListener(previous, "click", () => { current.page -= 1; render(); }, ownedListeners);
  trackListener(next, "click", () => { current.page += 1; render(); }, ownedListeners);
  pagination.append(previous, pageStatus, next); wrapper.appendChild(pagination);

  function render() {
    const view = deriveSmartTableView({ columns, rows, ...current, page: current.page, pageSize: block.props.pageSize ?? 10 });
    current.page = view.page;
    body.replaceChildren();
    for (const [index, column] of columns.entries()) headerCells[index].setAttribute("aria-sort", current.sortBy === column.id ? (current.sortDirection === "asc" ? "ascending" : "descending") : "none");
    for (const row of view.rows) {
      const tr = document.createElement("tr");
      for (const column of columns) tr.appendChild(setText(document, "td", row[column.id]));
      body.appendChild(tr);
    }
    if (view.totalRows === 0) { const tr = document.createElement("tr"); const td = setText(document, "td", copy.noRows); td.setAttribute("colspan", String(columns.length)); tr.appendChild(td); body.appendChild(tr); }
    previous.disabled = view.page <= 1; next.disabled = view.page >= view.pageCount;
    pageStatus.textContent = `${copy.page} ${view.page} / ${view.pageCount} · ${view.totalRows}`;
  }
  render();
}

function renderCalculator(block, state, wrapper) {
  const { document, store, copy, ownedListeners } = state;
  const props = block.props;
  const fieldset = document.createElement("fieldset"); fieldset.setAttribute("class", "if-article-panel");
  fieldset.appendChild(setText(document, "legend", props.label ?? block.content ?? "Calculator", "if-article-subheading"));
  const inputs = document.createElement("div"); inputs.setAttribute("class", "if-calculator-inputs");
  const controls = [];
  for (const [index, inputSpec] of (props.inputs ?? []).entries()) {
    const definition = store.getDefinition(inputSpec.variable);
    const field = document.createElement("label"); field.setAttribute("class", "if-widget-field"); field.textContent = inputSpec.label;
    const input = document.createElement("input"); input.setAttribute("type", "number");
    setControlIdentity(input, state, block.id, `calculator-input-${index + 1}`, `if-${block.id}-${inputSpec.variable}`);
    setAttr(input, "min", inputSpec.min ?? definition?.min); setAttr(input, "max", inputSpec.max ?? definition?.max); setAttr(input, "step", inputSpec.step ?? definition?.step ?? 1);
    const errorId = `if-error-${block.id}-${inputSpec.variable}`; const error = setText(document, "span", "", "if-widget-error"); error.setAttribute("id", errorId); error.setAttribute("role", "alert");
    input.setAttribute("aria-describedby", errorId); field.append(input, error); inputs.appendChild(field); controls.push({ input, error, inputSpec, definition });
    trackListener(input, "input", () => {
      const rules = { type: definition?.type === "integer" ? "integer" : "number", required: true, min: inputSpec.min ?? definition?.min, max: inputSpec.max ?? definition?.max };
      const result = validateWidgetValue(input.value, rules);
      input.setAttribute("aria-invalid", String(!result.valid)); error.textContent = result.valid ? "" : validationMessage(copy, result.error);
      if (result.valid) store.set(inputSpec.variable, result.value);
    }, ownedListeners);
  }
  fieldset.appendChild(inputs);
  const outputLabel = setText(document, "p", props.resultLabel ?? copy.reading, "if-article-label");
  const output = document.createElement("output"); output.setAttribute("aria-live", "polite"); output.setAttribute("aria-label", props.resultLabel ?? copy.reading);
  const status = setText(document, "p", "", "if-article-status"); status.setAttribute("role", "status");
  fieldset.append(outputLabel, output, status); wrapper.appendChild(fieldset);
  const update = (snapshot) => {
    for (const control of controls) control.input.value = String(snapshot[control.inputSpec.variable] ?? "");
    const result = evaluateCalculator(props.expression, snapshot, { min: props.resultMin, max: props.resultMax });
    output.textContent = result.valid ? `${result.value}${props.unit ? ` ${props.unit}` : ""}` : "";
    status.textContent = result.valid ? "" : copy.calculationError;
  };
  update(store.getSnapshot());
  ownedListeners.push(store.subscribe((snapshot) => snapshot, update));
}

function renderComparison(block, state, wrapper) {
  const { document, store, copy, ownedListeners } = state;
  const props = block.props;
  const component = document.createElement("section"); component.setAttribute("class", "if-article-comparison"); component.setAttribute("data-mode", props.mode ?? "side-by-side"); component.setAttribute("aria-label", props.label ?? block.content ?? "Comparison");
  const stage = document.createElement("div"); stage.setAttribute("class", "if-comparison-stage");
  let positionControl = null;
  const panels = [props.left, props.right].map((item) => {
    const panel = document.createElement("section"); panel.setAttribute("class", "if-comparison-panel");
    panel.appendChild(setText(document, "h3", item.label, "if-article-subheading"));
    const output = document.createElement("output"); output.setAttribute("aria-label", item.label); panel.appendChild(output); stage.appendChild(panel);
    return { item, output };
  });
  component.appendChild(stage);
  let position = props.position ?? 50;
  if (props.mode === "overlay") {
    const label = setText(document, "label", props.positionLabel ?? copy.overlayPosition, "if-widget-field");
    const range = document.createElement("input"); range.setAttribute("type", "range"); range.setAttribute("min", "0"); range.setAttribute("max", "100"); range.setAttribute("step", "1"); range.setAttribute("aria-label", props.positionLabel ?? copy.overlayPosition); setControlIdentity(range, state, block.id, "position"); label.appendChild(range); component.appendChild(label);
    trackListener(range, "input", () => {
      const value = Number(range.value);
      if (block.bindings?.position) store.set(block.bindings.position, value);
      else { position = value; update(store.getSnapshot()); }
    }, ownedListeners);
    positionControl = range;
  }
  wrapper.appendChild(component);
  const update = (snapshot) => {
    const model = buildComparisonModel({
      mode: props.mode ?? "side-by-side",
      left: { label: props.left.label, value: block.bindings?.left ? snapshot[block.bindings.left] : props.left.value },
      right: { label: props.right.label, value: block.bindings?.right ? snapshot[block.bindings.right] : props.right.value },
      position: block.bindings?.position ? snapshot[block.bindings.position] : position,
    });
    for (const [index, panel] of panels.entries()) {
      const value = index === 0 ? model.left?.value : model.right?.value;
      const unit = index === 0 ? props.left.unit : props.right.unit;
      panel.output.textContent = model.valid ? `${text(value)}${unit ? ` ${unit}` : ""}` : copy.calculationError;
    }
    const percentage = model.valid ? model.position : 50;
    component.style?.setProperty?.("--if-comparison-position", `${percentage}%`);
    if (positionControl) positionControl.value = String(percentage);
  };
  update(store.getSnapshot());
  ownedListeners.push(store.subscribe((snapshot) => snapshot, update));
}

function renderFilter(block, state, wrapper) {
  const { document, store, copy, ownedListeners } = state;
  const props = block.props;
  const variable = block.bindings?.value;
  const label = document.createElement("label"); label.setAttribute("class", "if-article-control"); label.appendChild(setText(document, "span", props.label ?? block.content ?? copy.filter));
  const select = document.createElement("select"); select.setAttribute("aria-label", props.label ?? block.content ?? copy.filter); setControlIdentity(select, state, block.id, "value");
  for (const option of props.options) { const node = document.createElement("option"); node.setAttribute("value", String(option.value)); node.textContent = option.label; select.appendChild(node); }
  label.appendChild(select); wrapper.appendChild(label);
  const error = setText(document, "span", "", "if-widget-error"); error.setAttribute("role", "alert"); wrapper.appendChild(error);
  const update = (value) => { select.value = String(value ?? ""); };
  update(store.get(variable));
  trackListener(select, "change", () => {
    const result = validateWidgetValue(select.value, { type: "enum", values: props.options.map((option) => option.value) });
    select.setAttribute("aria-invalid", String(!result.valid)); error.textContent = result.valid ? "" : validationMessage(copy, result.error);
    if (result.valid) store.set(variable, result.value);
  }, ownedListeners);
  ownedListeners.push(store.subscribe(variable, update));
}

function renderLearningSequence(block, state, wrapper, timeline = false) {
  const { document, article, store, copy, ownedListeners, learningProgress } = state;
  const labels = EDUCATION_COPY[languageOf(article.locale)];
  const children = block.children ?? [];
  const selectedName = block.bindings?.selected;
  let active = selectedName ? store.get(selectedName) : children[0]?.id;
  if (!children.some((child) => child.id === active)) active = children[0]?.id;
  const nav = document.createElement("div"); nav.setAttribute("class", "if-education-nav"); nav.setAttribute("role", "tablist"); nav.setAttribute("aria-label", block.props?.label ?? block.content ?? (timeline ? "Timeline events" : "Learning steps"));
  const controls = [];
  const panels = [];
  for (const [index, child] of children.entries()) {
    const control = setText(document, "button", child.props?.label ?? child.content ?? `${index + 1}`, "if-article-button");
    control.setAttribute("type", "button"); control.setAttribute("role", "tab"); control.setAttribute("aria-controls", child.id);
    control.setAttribute("id", `if-${timeline ? "event" : "step"}-${block.id}-${child.id}`);
    control.setAttribute(timeline ? "data-event-id" : "data-step-id", child.id);
    nav.appendChild(control); controls.push(control);
    const panel = renderBlock(child, { ...state, depth: state.depth + 1 });
    panel.setAttribute("class", "if-education-panel"); panel.setAttribute("role", "tabpanel"); panel.setAttribute("aria-labelledby", control.id); panel.setAttribute("tabindex", "0");
    if (timeline) {
      const date = document.createElement("time"); date.setAttribute("datetime", child.props.date); date.textContent = child.props.date;
      panel.prepend(date);
    }
    wrapper.appendChild(panel); panels.push(panel);
  }
  const progressRow = document.createElement("div"); progressRow.setAttribute("class", "if-education-progress");
  const progress = document.createElement("progress"); progress.setAttribute("max", children.length); progress.setAttribute("aria-label", block.props?.progressLabel ?? (timeline ? "Timeline position" : "Step progress")); progressRow.appendChild(progress);
  const position = setText(document, "bdi", ""); position.setAttribute("dir", "ltr"); position.setAttribute("aria-live", "polite"); progressRow.appendChild(position);
  const navigation = document.createElement("div"); navigation.setAttribute("class", "if-education-controls");
  const previous = setText(document, "button", labels.previous, "if-article-button"); previous.setAttribute("type", "button"); previous.setAttribute("data-sequence-action", "previous");
  const next = setText(document, "button", labels.next, "if-article-button"); next.setAttribute("type", "button"); next.setAttribute("data-sequence-action", "next");
  navigation.append(previous, next); wrapper.prepend(nav); wrapper.append(progressRow, navigation);
  function updateSelection(id) {
    const index = children.findIndex((child) => child.id === id);
    if (index < 0) return;
    active = id;
    for (const [controlIndex, control] of controls.entries()) {
      const selected = controlIndex === index;
      control.setAttribute("aria-selected", String(selected)); control.setAttribute("tabindex", selected ? "0" : "-1");
      control.setAttribute("aria-current", selected ? "step" : "false");
      panels[controlIndex].hidden = !selected;
    }
    progress.value = index + 1; position.textContent = `${index + 1} / ${children.length}`;
    if (index === 0) previous.setAttribute("disabled", ""); else previous.removeAttribute("disabled");
    if (index === children.length - 1) next.setAttribute("disabled", ""); else next.removeAttribute("disabled");
  }
  function choose(id) {
    if (!children.some((child) => child.id === id)) return;
    if (selectedName && store.get(selectedName) !== id) store.set(selectedName, id);
    else updateSelection(id);
    learningProgress.setSelection(block.id, id);
  }
  controls.forEach((control, index) => {
    trackListener(control, "click", () => choose(children[index].id), ownedListeners);
    trackListener(control, "keydown", (event) => {
      const backwards = article.dir === "rtl" ? "ArrowRight" : "ArrowLeft";
      const forwards = article.dir === "rtl" ? "ArrowLeft" : "ArrowRight";
      if (![backwards, forwards, "Home", "End"].includes(event.key)) return;
      event.preventDefault?.();
      const current = children.findIndex((child) => child.id === active);
      const target = event.key === "Home" ? 0 : event.key === "End" ? children.length - 1 : Math.max(0, Math.min(children.length - 1, current + (event.key === forwards ? 1 : -1)));
      choose(children[target].id); controls[target].focus?.();
    }, ownedListeners);
  });
  trackListener(previous, "click", () => { const index = children.findIndex((child) => child.id === active); if (index > 0) choose(children[index - 1].id); }, ownedListeners);
  trackListener(next, "click", () => { const index = children.findIndex((child) => child.id === active); if (index < children.length - 1) choose(children[index + 1].id); }, ownedListeners);
  updateSelection(active);
  if (selectedName) ownedListeners.push(store.subscribe(selectedName, (id, previousValue) => {
    if (children.some((child) => child.id === id)) {
      updateSelection(id);
      if (previousValue !== undefined) learningProgress.setSelection(block.id, id);
    }
  }));
}

function correctAnswerLabel(question, labels) {
  if (question.type === "single-choice") return question.options.find((option) => option.id === question.answer)?.label ?? "";
  if (question.type === "multiple-choice") return question.answer.map((id) => question.options.find((option) => option.id === id)?.label ?? id).join(", ");
  if (question.type === "true-false") return question.answer ? labels.true : labels.false;
  if (question.type === "short-answer") return (question.acceptedAnswers ?? [question.answer]).filter(Boolean).join(" / ");
  if (question.type === "matching") return question.pairs.map((pair) => `${pair.label} → ${question.options.find((option) => option.id === question.answer[pair.id])?.label ?? ""}`).join("; ");
  if (question.type === "ordering") return question.answer.map((id) => question.items.find((item) => item.id === id)?.label ?? id).join(" → ");
  return "";
}

function renderQuiz(block, state, wrapper) {
  const { document, article, host, context, copy, ownedListeners, learningProgress } = state;
  const labels = EDUCATION_COPY[languageOf(article.locale)];
  const questions = block.props.questions;
  const answers = Object.create(null);
  const questionNodes = new Map();
  const form = document.createElement("div"); form.setAttribute("class", "if-quiz"); form.setAttribute("role", "group"); form.setAttribute("aria-label", block.props.label ?? block.content ?? "Quiz");
  const feedback = setText(document, "p", "", "if-article-status"); feedback.setAttribute("role", "status"); feedback.setAttribute("aria-live", "polite"); feedback.setAttribute("data-quiz-feedback", "");
  const clearGrade = () => { feedback.textContent = ""; for (const entry of questionNodes.values()) entry.result.textContent = ""; };
  for (const question of questions) {
    const fieldset = document.createElement("fieldset"); fieldset.setAttribute("class", "if-education-question"); fieldset.setAttribute("data-question-id", question.id);
    fieldset.appendChild(setText(document, "legend", question.prompt, "if-article-subheading"));
    const result = setText(document, "p", "", "if-article-status"); result.setAttribute("aria-live", "polite"); fieldset.appendChild(result);
    questionNodes.set(question.id, { fieldset, result });
    if (["single-choice", "multiple-choice", "true-false"].includes(question.type)) {
      const options = question.type === "true-false" ? [{ id: "true", label: labels.true }, { id: "false", label: labels.false }] : question.options;
      const group = document.createElement("div"); group.setAttribute("class", "if-quiz-options");
      const selected = new Set();
      const choiceButtons = [];
      for (const option of options) {
        const button = setText(document, "button", option.label, "if-article-button"); button.setAttribute("type", "button"); button.setAttribute("class", "if-article-button if-quiz-option"); button.setAttribute("aria-pressed", "false"); button.setAttribute("data-option-id", option.id);
        trackListener(button, "click", () => {
          if (question.type === "multiple-choice") { if (selected.has(option.id)) selected.delete(option.id); else selected.add(option.id); answers[question.id] = [...selected]; }
          else { selected.clear(); selected.add(option.id); answers[question.id] = question.type === "true-false" ? option.id === "true" : option.id; }
          for (const choice of choiceButtons) choice.setAttribute("aria-pressed", String(selected.has(choice.getAttribute("data-option-id"))));
          clearGrade();
        }, ownedListeners);
        choiceButtons.push(button); group.appendChild(button);
      }
      fieldset.appendChild(group);
    } else if (question.type === "short-answer") {
      const labelNode = document.createElement("label"); labelNode.setAttribute("class", "if-widget-field");
      labelNode.appendChild(setText(document, "span", labels.answer));
      const input = document.createElement("input"); input.setAttribute("type", "text"); input.setAttribute("aria-label", `${labels.answer}: ${question.prompt}`); setControlIdentity(input, state, block.id, `answer-${question.id}`);
      trackListener(input, "input", () => { answers[question.id] = input.value; clearGrade(); }, ownedListeners); labelNode.appendChild(input); fieldset.appendChild(labelNode);
    } else if (question.type === "matching") {
      const group = document.createElement("div"); group.setAttribute("class", "if-matching-list");
      const selectors = [];
      for (const pair of question.pairs) {
        const labelNode = document.createElement("label"); labelNode.setAttribute("class", "if-widget-field"); labelNode.appendChild(setText(document, "span", pair.label));
        const select = document.createElement("select"); select.setAttribute("aria-label", pair.label); setControlIdentity(select, state, block.id, `match-${question.id}-${pair.id}`);
        const blank = document.createElement("option"); blank.setAttribute("value", ""); blank.textContent = "—"; select.appendChild(blank);
        for (const option of question.options) { const optionNode = document.createElement("option"); optionNode.setAttribute("value", option.id); optionNode.textContent = option.label; select.appendChild(optionNode); }
        trackListener(select, "change", () => {
          for (const other of selectors) if (other !== select && select.value && other.value === select.value) other.value = "";
          const response = Object.fromEntries(selectors.filter((entry) => entry.value).map((entry) => [entry.getAttribute("data-match-id"), entry.value]));
          answers[question.id] = response; clearGrade();
        }, ownedListeners);
        select.setAttribute("data-match-id", pair.id); selectors.push(select); labelNode.appendChild(select); group.appendChild(labelNode);
      }
      fieldset.appendChild(group);
    } else if (question.type === "ordering") {
      const list = document.createElement("ol"); list.setAttribute("class", "if-ordering-list"); list.setAttribute("aria-label", question.prompt); let order = question.items.map((item) => item.id); let dragging = null;
      const rebuild = () => {
        list.replaceChildren();
        for (const id of order) {
          const item = question.items.find((entry) => entry.id === id); const row = document.createElement("li"); row.setAttribute("class", "if-ordering-item"); row.setAttribute("draggable", "true"); row.setAttribute("data-order-id", item.id);
          row.appendChild(setText(document, "span", item.label));
          const up = setText(document, "button", labels.moveUp, "if-article-button"); up.setAttribute("type", "button"); up.setAttribute("aria-label", `${labels.moveUp}: ${item.label}`);
          const down = setText(document, "button", labels.moveDown, "if-article-button"); down.setAttribute("type", "button"); down.setAttribute("aria-label", `${labels.moveDown}: ${item.label}`);
          const move = (direction) => { const current = order.indexOf(item.id); const target = current + direction; if (target < 0 || target >= order.length) return; [order[current], order[target]] = [order[target], order[current]]; answers[question.id] = [...order]; rebuild(); clearGrade(); };
          trackListener(up, "click", () => move(-1), ownedListeners); trackListener(down, "click", () => move(1), ownedListeners);
          trackListener(row, "dragstart", () => { dragging = item.id; }, ownedListeners); trackListener(row, "dragover", (event) => event.preventDefault?.(), ownedListeners);
          trackListener(row, "drop", (event) => { event.preventDefault?.(); if (!dragging || dragging === item.id) return; const from = order.indexOf(dragging); const to = order.indexOf(item.id); order.splice(to, 0, ...order.splice(from, 1)); answers[question.id] = [...order]; dragging = null; rebuild(); clearGrade(); }, ownedListeners);
          row.append(up, down); list.appendChild(row);
        }
      };
      answers[question.id] = [...order]; rebuild(); fieldset.appendChild(list);
    }
    form.appendChild(fieldset);
  }
  const submit = setText(document, "button", block.props.submitLabel ?? labels.submit, "if-article-button"); submit.setAttribute("type", "button"); submit.setAttribute("data-submit-quiz", "");
  trackListener(submit, "click", () => {
    const grade = gradeQuiz(questions, answers);
    const scoreLabel = setText(document, "span", `${labels.score}: `); scoreLabel.setAttribute("dir", "auto");
    const scoreValue = setText(document, "bdi", `${grade.score} / ${grade.maximumScore}`); scoreValue.setAttribute("dir", "ltr");
    feedback.replaceChildren(scoreLabel, scoreValue);
    for (const result of grade.results) {
      const question = questions.find((entry) => entry.id === result.id); const target = questionNodes.get(result.id).result;
      target.textContent = `${result.correct ? labels.correct : labels.incorrect}. ${result.correct ? "" : `${labels.answer}: ${correctAnswerLabel(question, labels)}. `}${result.explanation}`.trim();
      target.setAttribute("data-correct", String(result.correct));
    }
    learningProgress.setScore(block.id, grade.score, grade.maximumScore);
    if (typeof host.onSubmitQuiz === "function") {
      const answerSnapshot = Object.freeze(Object.fromEntries(Object.entries(answers).map(([id, answer]) => [id, Array.isArray(answer) ? Object.freeze([...answer]) : answer && typeof answer === "object" ? Object.freeze({ ...answer }) : answer])));
      try { host.onSubmitQuiz(Object.freeze({ quizId: block.id, ...grade, answers: answerSnapshot }), context); }
      catch (error) { host.onError?.(error, "quiz"); }
    }
  }, ownedListeners);
  form.append(submit, feedback); wrapper.appendChild(form);
}

function renderFlashcards(block, state, wrapper) {
  const { document, article, host, context, ownedListeners, learningProgress } = state;
  const labels = EDUCATION_COPY[languageOf(article.locale)]; const cards = block.props.cards;
  let index = 0; let revealed = false;
  const savedReviews = learningProgress.getSnapshot().activities[block.id]?.reviewedCardIds ?? [];
  const validCardIds = new Set(cards.map((card) => card.id));
  const reviewed = new Set(savedReviews.filter((cardId) => validCardIds.has(cardId)));
  const face = setText(document, "div", "", "if-flashcard-face"); face.setAttribute("role", "status"); face.setAttribute("aria-live", "polite"); face.setAttribute("data-flashcard-face", ""); face.setAttribute("tabindex", "-1");
  const counter = setText(document, "p", "", "if-article-caption"); counter.setAttribute("aria-live", "polite");
  const position = setText(document, "bdi", ""); position.setAttribute("dir", "ltr");
  const separator = setText(document, "span", " · ");
  const reviewedCount = setText(document, "span", ""); reviewedCount.setAttribute("dir", "auto");
  counter.append(position, separator, reviewedCount);
  const navigation = document.createElement("div"); navigation.setAttribute("class", "if-education-controls");
  const previous = setText(document, "button", labels.previous, "if-article-button"); previous.setAttribute("type", "button");
  const flip = setText(document, "button", labels.flip, "if-article-button"); flip.setAttribute("type", "button"); flip.setAttribute("data-flashcard-flip", ""); flip.setAttribute("aria-pressed", "false");
  const mark = setText(document, "button", labels.reviewed, "if-article-button"); mark.setAttribute("type", "button"); mark.setAttribute("data-card-reviewed", "");
  const next = setText(document, "button", labels.next, "if-article-button"); next.setAttribute("type", "button");
  navigation.append(previous, flip, mark, next);
  function update() {
    const card = cards[index]; face.textContent = revealed ? card.back : card.front;
    flip.textContent = revealed ? labels.unflip : labels.flip; flip.setAttribute("aria-pressed", String(revealed));
    mark.setAttribute("aria-pressed", String(reviewed.has(card.id))); mark.textContent = reviewed.has(card.id) ? labels.reviewedDone : labels.reviewed;
    previous.disabled = index === 0; next.disabled = index === cards.length - 1;
    if (index === 0) previous.setAttribute("disabled", ""); else previous.removeAttribute("disabled");
    if (index === cards.length - 1) next.setAttribute("disabled", ""); else next.removeAttribute("disabled");
    position.textContent = `${index + 1} / ${cards.length}`;
    reviewedCount.textContent = `${labels.reviewedCount}: ${reviewed.size}`;
  }
  trackListener(flip, "click", () => { revealed = !revealed; update(); }, ownedListeners);
  trackListener(previous, "click", () => { if (index > 0) { index -= 1; revealed = false; update(); } }, ownedListeners);
  trackListener(next, "click", () => { if (index < cards.length - 1) { index += 1; revealed = false; update(); } }, ownedListeners);
  trackListener(mark, "click", () => { if (reviewed.has(cards[index].id)) return; reviewed.add(cards[index].id); learningProgress.markCardReviewed(block.id, cards[index].id); update(); }, ownedListeners);
  if (block.props.saveLabel && (typeof host.onProgress === "function" || typeof host.progress?.save === "function")) {
    const save = setText(document, "button", block.props.saveLabel, "if-article-button"); save.setAttribute("type", "button"); save.setAttribute("data-save-progress", "");
    trackListener(save, "click", () => sendProgress(host, article.id, Object.freeze({ action: "saveProgress", activityId: block.id, scope: "activity" }), { event: Object.freeze({ type: "click" }) }, learningProgress, state.store, context), ownedListeners);
    navigation.appendChild(save);
  }
  update(); wrapper.append(face, counter, navigation);
}

function renderGuidedComparison(block, state, wrapper) {
  const { document, store, ownedListeners, learningProgress } = state;
  const scenarios = block.props.scenarios; const selectedName = block.bindings?.selected;
  let active = selectedName ? store.get(selectedName) : scenarios[0].id;
  if (!scenarios.some((scenario) => scenario.id === active)) active = scenarios[0].id;
  const choices = document.createElement("div"); choices.setAttribute("class", "if-education-nav"); choices.setAttribute("role", "group"); choices.setAttribute("aria-label", block.props.label ?? "Scenarios");
  const buttons = new Map();
  for (const scenario of scenarios) {
    const button = setText(document, "button", scenario.label, "if-article-button"); button.setAttribute("type", "button"); button.setAttribute("class", "if-article-button if-guided-choice"); button.setAttribute("data-scenario-id", scenario.id); button.setAttribute("aria-pressed", "false");
    trackListener(button, "click", () => choose(scenario.id), ownedListeners); buttons.set(scenario.id, button); choices.appendChild(button);
  }
  const stage = document.createElement("div"); stage.setAttribute("class", "if-guided-stage");
  const left = document.createElement("section"); left.setAttribute("class", "if-guided-panel"); const leftTitle = setText(document, "h3", "", "if-article-subheading"); const leftValue = setText(document, "output", ""); left.append(leftTitle, leftValue);
  const right = document.createElement("section"); right.setAttribute("class", "if-guided-panel"); const rightTitle = setText(document, "h3", "", "if-article-subheading"); const rightValue = setText(document, "output", ""); right.append(rightTitle, rightValue);
  stage.append(left, right);
  const rationale = setText(document, "p", "", "if-education-rationale"); rationale.setAttribute("role", "status"); rationale.setAttribute("aria-live", "polite");
  wrapper.append(choices, stage, rationale);
  function update(id) {
    const scenario = scenarios.find((entry) => entry.id === id); if (!scenario) return;
    active = id;
    for (const [scenarioId, button] of buttons) button.setAttribute("aria-pressed", String(scenarioId === id));
    leftTitle.textContent = scenario.left.label; leftValue.textContent = text(scenario.left.value);
    rightTitle.textContent = scenario.right.label; rightValue.textContent = text(scenario.right.value);
    rationale.textContent = scenario.rationale;
  }
  function choose(id) { if (selectedName && store.get(selectedName) !== id) store.set(selectedName, id); else update(id); learningProgress.setSelection(block.id, id); }
  update(active);
  if (selectedName) ownedListeners.push(store.subscribe(selectedName, (id, previous) => { update(id); if (previous !== undefined) learningProgress.setSelection(block.id, id); }));
}

function renderProgress(block, state, wrapper, bind) {
  const { document, store, article, copy } = state;
  const props = block.props ?? {}; const maximum = props.max ?? 100;
  const labelNode = document.createElement("label"); labelNode.setAttribute("class", "if-widget-field"); labelNode.appendChild(setText(document, "span", props.label ?? block.content ?? copy.reading));
  const progress = document.createElement("progress"); progress.setAttribute("min", "0"); progress.setAttribute("max", maximum); progress.setAttribute("aria-label", props.label ?? block.content ?? copy.reading);
  const value = block.bindings?.value ? store.get(block.bindings.value) : props.value;
  progress.value = Math.max(0, Math.min(maximum, Number(value)));
  const output = setText(document, "bdi", `${Math.round((progress.value / maximum) * 100)}%`); output.setAttribute("dir", "ltr"); output.setAttribute("data-progress-output", "");
  labelNode.append(progress, output); wrapper.appendChild(labelNode); bind("value", progress);
  if (block.events?.click) {
    const labels = EDUCATION_COPY[languageOf(article.locale)];
    const save = setText(document, "button", props.saveLabel ?? labels.save, "if-article-button"); save.setAttribute("type", "button"); save.setAttribute("data-save-progress", ""); wrapper.appendChild(save);
  }
}

function renderCodeBlock(block, state, wrapper) {
  const { document, ownedListeners } = state;
  const copy = richCopy(state.article.locale);
  const codeText = String(block.content ?? "");
  const group = document.createElement("div"); group.setAttribute("class", "if-article-code-wrap");
  const pre = document.createElement("pre"); pre.setAttribute("class", "if-article-code"); pre.setAttribute("dir", "ltr");
  pre.appendChild(createSafeCodeNode(document, codeText, block.props?.language ?? "text"));
  const button = setText(document, "button", "⧉", "if-code-copy"); button.setAttribute("type", "button"); button.setAttribute("aria-label", copy.copyCode); button.setAttribute("title", copy.copyCode); button.setAttribute("data-copy-code", "");
  const status = setText(document, "p", "", "if-article-status"); status.setAttribute("role", "status"); status.setAttribute("aria-live", "polite");
  trackListener(button, "click", async () => {
    const clipboard = document.defaultView?.navigator?.clipboard ?? globalThis.navigator?.clipboard;
    if (typeof clipboard?.writeText !== "function") { status.textContent = copy.copyUnavailable; return; }
    try { await clipboard.writeText(codeText); status.textContent = copy.codeCopied; }
    catch { status.textContent = copy.copyUnavailable; }
  }, ownedListeners);
  group.append(pre, button); wrapper.append(group, status);
}

function showAssetFailure(node, status, copy, asset, error) {
  node.removeAttribute?.("src");
  node.setAttribute("data-integrity-state", "failed");
  status.hidden = false;
  status.textContent = `${copy.assetFailed}${asset.alt ? ` ${asset.alt}` : ""}`;
  void error;
}

function setVerifiedSource(node, status, source, asset, state) {
  const { document, context, ownedListeners } = state;
  const copy = richCopy(state.article.locale);
  let active = true;
  let revoke = () => {};
  trackListener(node, "error", () => showAssetFailure(node, status, copy, asset), ownedListeners);
  if (!asset.integrity && asset.type?.toLowerCase() !== "image/svg+xml") {
    node.setAttribute("src", source);
    node.setAttribute("data-integrity-state", "not-required");
    return;
  }
  node.setAttribute("data-integrity-state", "pending");
  status.hidden = false; status.textContent = copy.assetChecking;
  fetchVerifiedAsset(document, source, asset, context.signal).then((result) => {
    if (!active) { result.revoke(); return; }
    revoke = result.revoke; node.setAttribute("src", result.source); node.setAttribute("data-integrity-state", result.state); status.hidden = true; status.textContent = "";
  }).catch((error) => { if (active) showAssetFailure(node, status, copy, asset, error); });
  ownedListeners.push(() => { active = false; revoke(); });
}

function renderFigureBlock(block, state, wrapper, source) {
  const { document, ownedListeners } = state;
  const copy = richCopy(state.article.locale);
  const figure = document.createElement("figure"); figure.setAttribute("class", "if-article-figure");
  if (!source) {
    const fallback = setText(document, "p", block.props?.alt ?? block.props?.description ?? block.content ?? state.copy.asset, "if-article-status"); fallback.setAttribute("role", "status"); figure.appendChild(fallback); wrapper.appendChild(figure); return;
  }
  const stage = document.createElement("div"); stage.setAttribute("class", "if-figure-stage");
  const image = document.createElement("img"); image.setAttribute("alt", source.asset.alt ?? ""); setAttr(image, "width", source.asset.width); setAttr(image, "height", source.asset.height);
  image.setAttribute("loading", "lazy"); image.setAttribute("decoding", "async");
  if (source.asset.width && source.asset.height) image.setAttribute("style", `aspect-ratio:${source.asset.width} / ${source.asset.height}`);
  const assetStatus = setText(document, "p", "", "if-article-status"); assetStatus.setAttribute("role", "status"); assetStatus.setAttribute("aria-live", "polite"); assetStatus.hidden = true;
  stage.appendChild(image); setVerifiedSource(image, assetStatus, source.src, source.asset, state);
  const description = setText(document, "p", copy.selectHotspot, "if-hotspot-description"); description.setAttribute("aria-live", "polite");
  for (const hotspot of block.props?.hotspots ?? []) {
    const button = setText(document, "button", "•", "if-image-hotspot"); button.setAttribute("type", "button"); button.setAttribute("aria-label", `${hotspot.label}: ${hotspot.description}`); button.setAttribute("aria-pressed", "false"); button.setAttribute("data-hotspot-id", hotspot.id); button.setAttribute("style", `left:${hotspot.x}%;top:${hotspot.y}%`);
    trackListener(button, "click", () => {
      for (const candidate of stage.children) if (candidate.getAttribute?.("data-hotspot-id")) candidate.setAttribute("aria-pressed", String(candidate === button));
      description.textContent = `${hotspot.label}: ${hotspot.description}`;
    }, ownedListeners);
    stage.appendChild(button);
  }
  const tools = document.createElement("div"); tools.setAttribute("class", "if-media-tools");
  const zoom = setText(document, "button", "⌕", "if-image-zoom"); zoom.setAttribute("type", "button"); zoom.setAttribute("aria-label", copy.imageZoom); zoom.setAttribute("title", copy.imageZoom); zoom.setAttribute("aria-expanded", "false"); zoom.setAttribute("data-image-zoom", "");
  trackListener(zoom, "click", () => {
    const expanded = zoom.getAttribute("aria-expanded") !== "true";
    zoom.setAttribute("aria-expanded", String(expanded)); zoom.setAttribute("aria-label", expanded ? copy.imageZoomOut : copy.imageZoom); zoom.setAttribute("title", expanded ? copy.imageZoomOut : copy.imageZoom); stage.setAttribute("data-zoomed", String(expanded));
  }, ownedListeners);
  tools.appendChild(zoom); figure.append(stage, tools, assetStatus);
  if (block.content || block.props?.caption) figure.appendChild(setText(document, "figcaption", block.props?.caption ?? block.content, "if-article-caption"));
  if ((block.props?.hotspots ?? []).length) {
    const alternatives = document.createElement("ol"); alternatives.setAttribute("class", "if-hotspot-alternatives");
    for (const hotspot of block.props.hotspots) { const item = document.createElement("li"); item.textContent = `${hotspot.label}: ${hotspot.description}`; alternatives.appendChild(item); }
    figure.append(description, alternatives);
  }
  wrapper.appendChild(figure);
}

function renderMediaBlock(block, state, wrapper, source) {
  const { document, article, ownedListeners } = state;
  const copy = richCopy(article.locale);
  const figure = document.createElement("figure"); figure.setAttribute("class", "if-article-figure");
  if (!source) {
    const fallback = setText(document, "p", block.props?.alt ?? block.props?.description ?? block.content ?? state.copy.asset, "if-article-status"); fallback.setAttribute("role", "status"); figure.appendChild(fallback); wrapper.appendChild(figure); return;
  }
  const media = document.createElement(block.type); media.setAttribute("controls", ""); media.setAttribute("preload", "none"); media.setAttribute("aria-label", block.props?.caption ?? block.content ?? source.asset.alt);
  if (block.type === "video") { media.setAttribute("playsinline", ""); setAttr(media, "width", source.asset.width); setAttr(media, "height", source.asset.height); }
  const assetStatus = setText(document, "p", "", "if-article-status"); assetStatus.setAttribute("role", "status"); assetStatus.setAttribute("aria-live", "polite"); assetStatus.hidden = true;
  setVerifiedSource(media, assetStatus, source.src, source.asset, state);
  for (const trackData of source.asset.captionTracks ?? []) {
    const trackSource = resolveAsset(article, trackData.assetId, state.host);
    if (!trackSource) continue;
    const track = document.createElement("track"); track.setAttribute("kind", trackData.kind ?? "captions"); track.setAttribute("srclang", trackData.locale); track.setAttribute("label", trackData.label);
    if (trackData.locale.toLowerCase() === article.locale.toLowerCase()) track.setAttribute("default", "");
    setVerifiedSource(track, assetStatus, trackSource.src, trackSource.asset, state); media.appendChild(track);
  }
  figure.appendChild(media);
  const controls = document.createElement("div"); controls.setAttribute("class", "if-media-tools");
  const speedWrap = document.createElement("div"); speedWrap.setAttribute("class", "if-media-speed");
  const menuId = `if-speed-options-${block.id}`;
  const trigger = setText(document, "button", "⏩", "if-media-speed-toggle"); trigger.setAttribute("type", "button"); trigger.setAttribute("aria-label", copy.playbackSpeed); trigger.setAttribute("title", copy.playbackSpeed); trigger.setAttribute("aria-expanded", "false"); trigger.setAttribute("aria-controls", menuId); trigger.setAttribute("data-speed-menu-toggle", "");
  const menu = document.createElement("div"); menu.setAttribute("class", "if-media-speed-options"); menu.setAttribute("id", menuId); menu.setAttribute("role", "group"); menu.setAttribute("aria-label", copy.speedOptions); menu.hidden = true;
  const options = [];
  for (const rate of [0.5, 0.75, 1, 1.25, 1.5, 2]) {
    const label = `${rate}×`;
    const option = setText(document, "button", label, "if-media-speed-option"); option.setAttribute("type", "button"); option.setAttribute("data-playback-rate", rate); option.setAttribute("aria-label", `${copy.selectSpeed}: ${label}`); option.setAttribute("aria-pressed", String(rate === 1));
    trackListener(option, "click", () => {
      media.playbackRate = rate;
      for (const other of options) other.setAttribute("aria-pressed", String(other === option));
      menu.hidden = true; trigger.setAttribute("aria-expanded", "false"); speedStatus.textContent = `${copy.playbackSpeed}: ${label}`;
    }, ownedListeners);
    options.push(option); menu.appendChild(option);
  }
  trackListener(trigger, "click", () => { menu.hidden = !menu.hidden; trigger.setAttribute("aria-expanded", String(!menu.hidden)); if (!menu.hidden) options.find((option) => option.getAttribute("aria-pressed") === "true")?.focus?.(); }, ownedListeners);
  trackListener(menu, "keydown", (event) => {
    if (event.key === "Escape") { menu.hidden = true; trigger.setAttribute("aria-expanded", "false"); trigger.focus?.(); event.preventDefault?.(); return; }
    if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
    const index = options.indexOf(event.target); if (index < 0) return;
    const offset = event.key === "ArrowDown" ? 1 : -1; options[(index + offset + options.length) % options.length]?.focus?.(); event.preventDefault?.();
  }, ownedListeners);
  const speedStatus = setText(document, "span", "", "if-article-status"); speedStatus.setAttribute("role", "status"); speedStatus.setAttribute("aria-live", "polite");
  speedWrap.append(trigger, menu); controls.append(speedWrap, speedStatus); figure.append(controls);
  if (block.content || block.props?.caption) figure.appendChild(setText(document, "figcaption", block.props?.caption ?? block.content, "if-article-caption"));
  const transcript = block.props?.transcript ?? source.asset.captions?.[article.locale] ?? Object.values(source.asset.captions ?? {})[0];
  if (transcript) {
    const details = document.createElement("details"); details.setAttribute("class", "if-media-transcript");
    const summary = setText(document, "summary", copy.transcript); summary.setAttribute("aria-label", copy.readTranscript);
    const textNode = setText(document, "p", transcript); textNode.setAttribute("lang", article.locale); textNode.setAttribute("dir", article.dir);
    details.append(summary, textNode); figure.appendChild(details);
  }
  figure.appendChild(assetStatus); wrapper.appendChild(figure);
}

function renderBlock(block, state) {
  const { document, article, targetIds, controlIds, store, context, host, copy, citationPlan, elements, bindingTargets, blocks, adapterStates, mapStates, ownedListeners, options, depth } = state;
  if (depth > 32) return setText(document, "p", "Nested article content exceeds the rendering limit.", "if-article-status");
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "if-article-block"); wrapper.setAttribute("id", block.id); wrapper.setAttribute("data-block-type", block.type);
  elements.set(block.id, wrapper); blocks.set(block.id, block);
  const targets = new Map(); bindingTargets.set(block.id, targets);
  const children = () => (block.children ?? []).map((child) => renderBlock(child, { ...state, depth: depth + 1 }));
  const label = block.content ?? block.props?.label ?? block.props?.description ?? "";
  const bind = (property, node) => { if (block.bindings?.[property]) targets.set(property, node); };
  switch (block.type) {
    case "heading": { const heading = document.createElement("h3"); heading.setAttribute("class", "if-article-subheading"); appendInline(document, heading, label, targetIds); wrapper.appendChild(heading); break; }
    case "paragraph": case "text": {
      const copyNode = document.createElement(block.type === "text" ? "span" : "p"); copyNode.setAttribute("class", "if-article-copy"); appendInline(document, copyNode, label, targetIds); wrapper.appendChild(copyNode); bind("text", copyNode); bind("value", copyNode); break;
    }
    case "quote": { const quote = document.createElement("blockquote"); quote.setAttribute("class", "if-article-quote"); appendInline(document, quote, label, targetIds); wrapper.append(quote, ...children()); break; }
    case "callout": { const aside = document.createElement("aside"); aside.setAttribute("class", "if-article-callout"); aside.setAttribute("role", "note"); appendInline(document, aside, label, targetIds); wrapper.append(aside, ...children()); break; }
    case "code": renderCodeBlock(block, state, wrapper); break;
    case "math": {
      try { const math = createMathML(document, block.content, { display: block.props?.display }); math.setAttribute("class", "if-article-math"); wrapper.appendChild(math); }
      catch { wrapper.setAttribute("data-state", "error"); const status = setText(document, "p", richCopy(article.locale).mathUnavailable, "if-article-status"); status.setAttribute("class", "if-article-math-error"); status.setAttribute("role", "status"); const original = setText(document, "code", block.content); original.setAttribute("dir", "ltr"); wrapper.append(status, original); }
      break;
    }
    case "list": {
      const list = document.createElement(block.props?.ordered ? "ol" : "ul");
      const items = Array.isArray(block.props?.items) ? block.props.items : (block.content ? [block.content] : []);
      for (const item of items) { const itemNode = document.createElement("li"); appendInline(document, itemNode, item, targetIds); list.appendChild(itemNode); } wrapper.append(list, ...children()); break;
    }
    case "table": {
      const table = document.createElement("table");
      if (block.props?.caption) table.appendChild(setText(document, "caption", block.props.caption));
      const rows = Array.isArray(block.props?.rows) ? block.props.rows : [];
      for (const [index, row] of rows.entries()) { const tr = document.createElement("tr"); for (const cell of Array.isArray(row) ? row : []) tr.appendChild(setText(document, index === 0 ? "th" : "td", cell)); table.appendChild(tr); }
      wrapper.append(table, ...children()); break;
    }
    case "smartTable": renderSmartTable(block, state, wrapper); break;
    case "calculator": renderCalculator(block, state, wrapper); break;
    case "comparison": renderComparison(block, state, wrapper); break;
    case "filter": renderFilter(block, state, wrapper); break;
    case "stepper": renderLearningSequence(block, state, wrapper, false); break;
    case "timeline": renderLearningSequence(block, state, wrapper, true); break;
    case "quiz": renderQuiz(block, state, wrapper); break;
    case "flashcards": renderFlashcards(block, state, wrapper); break;
    case "guidedComparison": renderGuidedComparison(block, state, wrapper); break;
    case "progress": renderProgress(block, state, wrapper, bind); break;
    case "citation": {
      const reference = citationPlan.byBlockId.get(block.id);
      if (reference) {
        wrapper.setAttribute("tabindex", "-1");
        if (block.content) wrapper.appendChild(setText(document, "cite", block.content));
        const link = setText(document, "a", `[${reference.number}]`); link.setAttribute("href", `#${reference.id}`); link.setAttribute("aria-label", `${richCopy(article.locale).references} ${reference.number}`);
        trackListener(link, "click", (event) => focusReferenceTarget(event, elements.get(reference.id), document), ownedListeners);
        wrapper.appendChild(link); break;
      }
      const citation = block.props?.url ? document.createElement("a") : document.createElement("cite");
      if (block.props?.url) { citation.setAttribute("href", block.props.url); citation.setAttribute("rel", "noopener noreferrer"); }
      citation.textContent = text(block.content ?? block.props?.title ?? block.props?.url ?? ""); wrapper.appendChild(citation); break;
    }
    case "group": wrapper.setAttribute("class", "if-article-block if-article-panel"); if (block.props?.label) wrapper.appendChild(setText(document, "h3", block.props.label, "if-article-subheading")); wrapper.append(...children()); break;
    case "accordion": {
      const details = document.createElement("details"); details.setAttribute("class", "if-article-details"); details.setAttribute("id", block.id); details.open = Boolean(bindingValue(store, block.bindings, "open", block.props?.open));
      if (block.bindings?.open && store.getDefinition(block.bindings.open)) {
        const onToggle = () => { if (store.get(block.bindings.open) !== Boolean(details.open)) store.set(block.bindings.open, Boolean(details.open)); };
        details.addEventListener("toggle", onToggle);
        ownedListeners.push(() => details.removeEventListener?.("toggle", onToggle));
      }
      const summary = setText(document, "summary", label || "Details"); details.append(summary, ...children()); wrapper.appendChild(details); elements.set(block.id, details); bind("open", details); break;
    }
    case "tabs": {
      const list = document.createElement("div"); list.setAttribute("class", "if-article-tablist"); list.setAttribute("role", "tablist"); list.setAttribute("aria-label", block.props?.label ?? "Sections");
      const panels = [];
      const selectedName = block.bindings?.selected;
      let active = selectedName ? store.get(selectedName) : block.children?.[0]?.id;
      if (!block.children?.some((child) => child.id === active)) active = block.children?.[0]?.id;
      for (const [index, child] of (block.children ?? []).entries()) {
        const tab = document.createElement("button"); tab.setAttribute("class", "if-article-tab"); tab.setAttribute("type", "button"); tab.setAttribute("role", "tab"); tab.setAttribute("aria-controls", child.id); tab.setAttribute("data-panel-id", child.id); tab.setAttribute("aria-selected", String(child.id === active)); tab.setAttribute("tabindex", child.id === active ? "0" : "-1"); tab.textContent = text(child.props?.label ?? child.content ?? `${index + 1}`);
        tab.setAttribute("id", `if-tab-${block.id}-${child.id}`);
        const choose = () => { if (selectedName) store.set(selectedName, child.id); else selectTab(child.id); };
        const onKeydown = (event) => {
          const backwards = article.dir === "rtl" ? "ArrowRight" : "ArrowLeft";
          const forwards = article.dir === "rtl" ? "ArrowLeft" : "ArrowRight";
          if (![backwards, forwards, "Home", "End"].includes(event.key)) return;
          event.preventDefault?.();
          const indexNow = block.children.findIndex((entry) => entry.id === active);
          const next = event.key === "Home" ? 0 : event.key === "End" ? block.children.length - 1 : (indexNow + (event.key === forwards ? 1 : -1) + block.children.length) % block.children.length;
          selectTab(block.children[next].id); list.children[next]?.focus?.();
        };
        tab.addEventListener("click", choose);
        tab.addEventListener("keydown", onKeydown);
        ownedListeners.push(() => { tab.removeEventListener?.("click", choose); tab.removeEventListener?.("keydown", onKeydown); });
        list.appendChild(tab);
        const panel = renderBlock(child, { ...state, depth: depth + 1 }); panel.setAttribute("role", "tabpanel"); panel.setAttribute("aria-labelledby", `if-tab-${block.id}-${child.id}`); panel.hidden = child.id !== active; panels.push(panel); wrapper.appendChild(panel);
      }
      function selectTab(id) {
        active = id;
        for (const tab of list.children) { const selected = tab.getAttribute("data-panel-id") === id; tab.setAttribute("aria-selected", String(selected)); tab.setAttribute("tabindex", selected ? "0" : "-1"); }
        for (const panel of panels) panel.hidden = panel.id !== id;
        if (selectedName && store.getDefinition(selectedName) && store.get(selectedName) !== id) store.set(selectedName, id);
      }
      targets.set("selected", list); bindingTargets.set(`${block.id}:panels`, panels);
      list.setAttribute("data-tablist-for", block.id);
      if (typeof wrapper.prepend === "function") wrapper.prepend(list); else wrapper.appendChild(list);
      if (selectedName) {
        const unsubscribe = store.subscribe(selectedName, (value) => { if (block.children?.some((child) => child.id === value)) selectTab(value); });
        ownedListeners.push(unsubscribe);
      }
      break;
    }
    case "conditional": {
      const conditionalChildren = children(); wrapper.append(...conditionalChildren);
      const condition = block.props?.condition ?? block.props?.when;
      try { wrapper.hidden = !Boolean(evaluateExpression(condition, store.getSnapshot())); }
      catch { wrapper.setAttribute("data-state", "error"); const status = setText(document, "p", "Conditional content is unavailable.", "if-article-status"); status.setAttribute("role", "status"); wrapper.appendChild(status); }
      break;
    }
    case "slider": case "input": case "select": {
      const labelNode = setText(document, "label", block.props?.label ?? block.content ?? block.id, "if-article-label");
      labelNode.setAttribute("class", "if-article-control");
      const input = document.createElement(block.type === "select" ? "select" : "input");
      setControlIdentity(input, state, block.id, "value");
      if (block.type === "slider") { input.setAttribute("type", "range"); const definition = store.getDefinition(block.bindings?.value); setAttr(input, "min", block.props?.min ?? definition?.min ?? 0); setAttr(input, "max", block.props?.max ?? definition?.max ?? 100); setAttr(input, "step", block.props?.step ?? definition?.step ?? 1); }
      else if (block.type === "input") {
        const inputType = ["text", "number", "date", "email"].includes(block.props?.inputType) ? block.props.inputType : "text";
        input.setAttribute("type", inputType);
        const definition = store.getDefinition(block.bindings?.value);
        setAttr(input, "min", block.props?.min ?? definition?.min); setAttr(input, "max", block.props?.max ?? definition?.max);
        setAttr(input, "minlength", block.props?.minLength ?? definition?.minLength); setAttr(input, "maxlength", block.props?.maxLength ?? definition?.maxLength);
      if (block.props?.required === true || block.props?.validation?.required === true) input.setAttribute("required", "");
      }
      if (block.props?.required === true || block.props?.validation?.required === true) input.setAttribute("aria-required", "true");
      if (block.type === "select") for (const option of block.props?.options ?? []) { const optionNode = document.createElement("option"); optionNode.setAttribute("value", option.value ?? option.id ?? option); optionNode.textContent = text(option.label ?? option.value ?? option.id ?? option); input.appendChild(optionNode); }
      const current = bindingValue(store, block.bindings, "value", block.props?.value ?? ""); input.value = String(current ?? "");
      labelNode.appendChild(input); wrapper.appendChild(labelNode); bind("value", input); break;
    }
    case "metric": {
      const labelNode = setText(document, "p", block.props?.label ?? block.content ?? "", "if-article-label");
      const output = document.createElement("output"); const value = bindingValue(store, block.bindings, "value", block.props?.value ?? ""); output.textContent = `${text(value)}${text(block.props?.unit)}`; output.setAttribute("aria-label", `${copy.reading}: ${text(block.props?.label ?? block.content ?? "")}`); wrapper.setAttribute("data-value", value); wrapper.append(labelNode, output); bind("value", output); break;
    }
    case "button": {
      const button = setText(document, "button", label || "Continue", "if-article-button"); button.setAttribute("type", "button"); wrapper.appendChild(button); break;
    }
    case "menu": {
      const menu = document.createElement("details"); menu.setAttribute("class", "if-article-menu");
      menu.appendChild(setText(document, "summary", label || block.props?.label || copy.moreInfo));
      const content = document.createElement("div"); content.setAttribute("class", "if-article-menu-content"); content.append(...children()); menu.appendChild(content); wrapper.appendChild(menu); elements.set(block.id, menu); break;
    }
    case "tooltip": {
      const tooltip = document.createElement("span"); tooltip.setAttribute("class", "if-article-tooltip");
      const trigger = setText(document, "button", label || block.props?.label || copy.moreInfo, "if-article-button"); trigger.setAttribute("type", "button"); trigger.setAttribute("aria-describedby", `${block.id}-tooltip`);
      const content = setText(document, "span", block.props?.text ?? block.props?.description ?? ""); content.setAttribute("id", `${block.id}-tooltip`); content.setAttribute("role", "tooltip"); tooltip.append(trigger, content); wrapper.appendChild(tooltip); break;
    }
    case "card": {
      const card = document.createElement("section"); card.setAttribute("class", "if-article-card"); card.setAttribute("role", "group");
      const title = block.props?.label ?? label;
      if (title) card.appendChild(setText(document, "h3", title, "if-article-subheading"));
      const selectedVariable = block.bindings?.selected;
      if (selectedVariable) {
        const select = setText(document, "button", block.props?.selectLabel ?? copy.select, "if-article-button"); select.setAttribute("type", "button"); select.setAttribute("aria-pressed", String(store.get(selectedVariable) === block.id));
        trackListener(select, "click", () => store.set(selectedVariable, block.id), ownedListeners); card.appendChild(select);
        const update = (value) => select.setAttribute("aria-pressed", String(value === block.id));
        ownedListeners.push(store.subscribe(selectedVariable, update));
      }
      card.append(...children()); wrapper.appendChild(card); elements.set(block.id, card); break;
    }
    case "legacyViz": {
      const figure = document.createElement("figure"); figure.setAttribute("class", "if-article-figure");
      const canvas = document.createElement("div"); canvas.setAttribute("data-visualization-host", ""); canvas.setAttribute("role", "group"); canvas.setAttribute("aria-label", block.props?.description ?? copy.unavailable);
      const caption = setText(document, "figcaption", block.props?.description ?? block.content ?? copy.unavailable, "if-article-caption"); figure.append(canvas, caption); wrapper.appendChild(figure); break;
    }
    case "knowledgeMap": {
      const selectedVariable = block.bindings?.selected;
      const map = createKnowledgeMap(document, {
        props: block.props ?? {}, articleId: article.id, blockId: block.id, dir: article.dir, language: article.locale,
        selected: selectedVariable ? store.get(selectedVariable) : "",
        onSelect: (id) => { if (selectedVariable && id && store.get(selectedVariable) !== id) store.set(selectedVariable, id); },
        onNavigate: typeof host.onNavigate === "function" ? (route, navigationContext) => host.onNavigate(route, Object.freeze({ ...navigationContext, articleId: article.id, context })) : undefined,
      });
      mapStates.set(block.id, map); ownedListeners.push(() => map.dispose()); wrapper.appendChild(map.element); break;
    }
    case "simulator2d": case "model3d": case "map": case "mathGraph": case "physicsExperiment": case "chemistry": case "anatomy": case "animationTimeline": {
      const suffix = ({ simulator2d: "simulator2d", model3d: "model3d", map: "map", mathGraph: "mathgraph", physicsExperiment: "physics-experiment", chemistry: "chemistry", anatomy: "anatomy", animationTimeline: "animation-timeline" })[block.type];
      const component = context.getComponent?.(`org.intuiforge.science.${suffix}`);
      if (component && typeof component.render === "function") {
        try {
          const result = component.render(wrapper, block, Object.freeze({ document, locale: article.locale, dir: article.dir, environment: host, signal: context.signal, articleId: article.id, blockId: block.id }));
          if (typeof result === "function") ownedListeners.push(result);
          else if (typeof result?.dispose === "function") ownedListeners.push(() => result.dispose());
        } catch (error) {
          host.onError?.(error, "component");
          const fallback = setText(document, "p", block.props?.description ?? block.content ?? copy.unavailable, "if-science-fallback"); fallback.setAttribute("role", "status"); wrapper.appendChild(fallback);
        }
      } else {
        const fallback = setText(document, "p", block.props?.description ?? block.content ?? copy.unavailable, "if-science-fallback"); fallback.setAttribute("role", "status"); wrapper.appendChild(fallback);
      }
      break;
    }
    case "figure": case "audio": case "video": {
      const source = resolveAsset(article, block.props?.assetId, host);
      if (block.type === "figure") renderFigureBlock(block, state, wrapper, source);
      else renderMediaBlock(block, state, wrapper, source);
      break;
    }
    case "dialog": {
      const dialog = document.createElement("dialog"); dialog.setAttribute("class", "if-article-dialog");
      const titleId = `if-dialog-title-${block.id}`; const title = setText(document, "h2", label || block.props?.label || copy.moreInfo); title.setAttribute("id", titleId); dialog.setAttribute("aria-labelledby", titleId);
      const close = setText(document, "button", block.props?.closeLabel ?? copy.close, "if-article-button"); close.setAttribute("type", "button");
      trackListener(close, "click", () => { if (typeof dialog.close === "function") dialog.close(); else dialog.open = false; }, ownedListeners);
      dialog.append(title, close, ...children()); wrapper.appendChild(dialog); elements.set(block.id, dialog); break;
    }
    default: {
      if (label) wrapper.appendChild(setText(document, "p", label, "if-article-copy"));
      wrapper.append(...children());
      if (!label && !block.children?.length) { const fallback = setText(document, "p", `${block.type} content is not supported by this renderer yet.`, "if-article-status"); fallback.setAttribute("role", "status"); wrapper.appendChild(fallback); }
    }
  }
  if (!["accordion", "tabs", "menu", "card", "dialog"].includes(block.type)) elements.set(block.id, wrapper);
  return wrapper;
}
