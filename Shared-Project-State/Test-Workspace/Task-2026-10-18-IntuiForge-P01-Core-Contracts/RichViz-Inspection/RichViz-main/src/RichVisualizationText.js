/* RichViz — interface strings (Arabic, English, Russian).
 * Article content (titles, labels, data) is never translated here; this is only the library's own chrome. */
const TEXT = {
  en: {
    step: "Step", textVersion: "Text version", sourceLabel: "Visualization source", loading: "Loading visualization…",
    failed: "This visualization could not be displayed. Its description and text version are shown instead.",
    invalid: "This visualization has a problem and cannot be shown.", invalidAuthor: "Fix these problems to display the visualization:",
    chartTable: "Chart data", mediaMissing: "Image unavailable", engineFallback: "The interactive chart could not be loaded, so a simpler version is shown.",
    unsupportedChart: "This chart type needs the interactive engine, which could not be loaded. The data table below has the same information.",
    makeInteractive: "Make interactive", backToStatic: "Back to static view", loadingInteractive: "Loading interactive view…",
    interactiveFailed: "The interactive view could not be loaded. The static diagram shows the same information.",
    nodeHint: "Select a node to see what it connects to.", clearSelection: "Clear selection", leadsTo: "Leads to", comesFrom: "Comes from", none: "nothing",
    selected: "Selected", details: "Details", legend: "Groups", marker: "Marker", region: "Visualization", mermaidSource: "Diagram source",
    tabs: "Sections", progress: "Progress", current: "Current stage", status: "Status", from: "from", to: "to",
    zoomIn: "Zoom in", zoomOut: "Zoom out", fitView: "Fit to view", fullscreen: "Full screen", exitFullscreen: "Exit full screen", fullscreenUnavailable: "The browser did not allow full screen.", controls: "Diagram controls",
  },
  ar: {
    step: "الخطوة", textVersion: "النسخة النصية", sourceLabel: "مصدر التصور", loading: "جارٍ تحميل التصور…",
    failed: "تعذّر عرض هذا التصور. يظهر بدلًا منه وصفه ونسخته النصية.",
    invalid: "في هذا التصور مشكلة ولا يمكن عرضه.", invalidAuthor: "أصلح هذه المشكلات ليظهر التصور:",
    chartTable: "بيانات الرسم", mediaMissing: "الصورة غير متاحة", engineFallback: "تعذّر تحميل الرسم التفاعلي، لذا تُعرض نسخة أبسط.",
    unsupportedChart: "يحتاج هذا النوع من الرسوم إلى المحرك التفاعلي الذي تعذّر تحميله. يحتوي جدول البيانات أدناه على المعلومات نفسها.",
    makeInteractive: "تفعيل التفاعل", backToStatic: "العودة إلى العرض الثابت", loadingInteractive: "جارٍ تحميل العرض التفاعلي…",
    interactiveFailed: "تعذّر تحميل العرض التفاعلي. يعرض المخطط الثابت المعلومات نفسها.",
    nodeHint: "اختر عقدة لترى ما ترتبط به.", clearSelection: "إلغاء التحديد", leadsTo: "تقود إلى", comesFrom: "تأتي من", none: "لا شيء",
    selected: "المحدّد", details: "التفاصيل", legend: "المجموعات", marker: "علامة", region: "تصور", mermaidSource: "مصدر المخطط",
    tabs: "الأقسام", progress: "التقدم", current: "المرحلة الحالية", status: "الحالة", from: "من", to: "إلى",
    zoomIn: "تكبير", zoomOut: "تصغير", fitView: "ملاءمة العرض", fullscreen: "ملء الشاشة", exitFullscreen: "الخروج من ملء الشاشة", fullscreenUnavailable: "لم يسمح المتصفح بتفعيل ملء الشاشة.", controls: "أدوات التحكم بالمخطط",
  },
  ru: {
    step: "Шаг", textVersion: "Текстовая версия", sourceLabel: "Источник визуализации", loading: "Загрузка визуализации…",
    failed: "Не удалось показать эту визуализацию. Вместо неё показаны описание и текстовая версия.",
    invalid: "В этой визуализации есть ошибка, показать её нельзя.", invalidAuthor: "Исправьте эти ошибки, чтобы показать визуализацию:",
    chartTable: "Данные диаграммы", mediaMissing: "Изображение недоступно", engineFallback: "Интерактивную диаграмму загрузить не удалось, показана упрощённая версия.",
    unsupportedChart: "Для этого типа диаграммы нужен интерактивный движок, но он не загрузился. Таблица ниже содержит те же данные.",
    makeInteractive: "Включить интерактивность", backToStatic: "Вернуться к статичному виду", loadingInteractive: "Загрузка интерактивного вида…",
    interactiveFailed: "Не удалось загрузить интерактивный вид. Статичная схема показывает ту же информацию.",
    nodeHint: "Выберите узел, чтобы увидеть его связи.", clearSelection: "Снять выбор", leadsTo: "Ведёт к", comesFrom: "Приходит от", none: "ничего",
    selected: "Выбрано", details: "Подробности", legend: "Группы", marker: "Метка", region: "Визуализация", mermaidSource: "Источник схемы",
    tabs: "Разделы", progress: "Прогресс", current: "Текущий этап", status: "Статус", from: "от", to: "к",
    zoomIn: "Увеличить", zoomOut: "Уменьшить", fitView: "Вписать в область", fullscreen: "Полный экран", exitFullscreen: "Выйти из полноэкранного режима", fullscreenUnavailable: "Браузер не разрешил полноэкранный режим.", controls: "Управление схемой",
  },
};

export const languageOf = (value) => { const code = String(value || "en").slice(0, 2).toLowerCase(); return Object.hasOwn(TEXT, code) ? code : "en"; };
export const textFor = (language) => TEXT[languageOf(language)];
export const translator = (language) => { const table = textFor(language); return (key) => table[key] ?? TEXT.en[key] ?? key; };
