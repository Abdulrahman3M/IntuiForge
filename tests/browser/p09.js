import { createIntuiEngine } from "/packages/core/src/index.js";
import { validateArticle } from "/packages/article/src/index.js";
import { registerArticleRenderer } from "/packages/article-renderer/src/index.js";
import { registerScientificPlugins } from "/packages/scientific-plugins/src/index.js";

const status = document.getElementById("audit-status");
const log = document.getElementById("audit-log");
const host = document.getElementById("article-host");
const errors = [];
const calls = { model: 0, map: 0 };
const article = {
  kind: "intui.article", schemaVersion: "1.0.0", id: "p09-scientific-lab", locale: "ar", dir: "rtl",
  title: "مختبر تفاعلي للعلوم", summary: "تجارب ونماذج محلية قابلة للفهم والوصول، مع وصف نصي واضح لكل رسم تفاعلي.",
  metadata: { status: "draft", contentType: "article", sources: [], canonicalReferences: [], supportedLocales: ["ar"], provenance: [] },
  assets: [], initialState: {}, derived: {}, sections: [{ id: "science", heading: "التجارب والنماذج", blocks: [
    { id: "projectile", type: "simulator2d", props: { label: "حركة المقذوف", description: "محاكاة ثنائية الأبعاد لمسار مقذوف في مجال جاذبية ثابت.", kind: "projectile", speed: 24, angleDeg: 42, gravity: 9.81, durationSeconds: 8 } },
    { id: "mesh", type: "model3d", props: { label: "نموذج شبكي ثلاثي الأبعاد", description: "نموذج محلي محدود بصيغة شبكة مثلثية آمنة.", modelId: "demo-model" } },
    { id: "map", type: "map", props: { label: "خريطة محلية", description: "طبقة ساحلية وموقع محدد ضمن حدود جغرافية محلية.", mapId: "demo-map", bounds: { west: 34, south: 20, east: 58, north: 34 }, layers: [{ id: "coast", label: "الساحل", visible: true, features: [{ type: "LineString", coordinates: [[35, 22], [44, 28], [56, 24]] }] }], markers: [{ id: "dubai", label: "دبي", coordinates: [55.27, 25.2], description: "موقع تجريبي محلي." }] } },
    { id: "graph", type: "mathGraph", props: { label: "منحنى جيب التمام", description: "رسم دالة رياضية آمنة مع وحدات للمحورين.", formula: "sin(x)", xMin: -3.14, xMax: 3.14, xUnit: "راديان", yUnit: "قيمة" } },
    { id: "physics", type: "physicsExperiment", props: { label: "تجربة مدى المقذوف", description: "عدّل السرعة والزاوية والجاذبية لملاحظة أثرها على النتائج.", kind: "projectile", speed: 20, angleDeg: 45, gravity: 9.81 } },
    { id: "molecule", type: "chemistry", props: { label: "جزيء الماء", description: "ذرتا هيدروجين مرتبطتان بذرة أكسجين واحدة.", formula: "H₂O", atoms: [{ id: "oxygen", element: "O", label: "أكسجين", x: 0, y: 0 }, { id: "hydrogen-a", element: "H", label: "هيدروجين أول", x: -1, y: 1 }, { id: "hydrogen-b", element: "H", label: "هيدروجين ثانٍ", x: 1, y: 1 }], bonds: [{ source: "oxygen", target: "hydrogen-a" }, { source: "oxygen", target: "hydrogen-b" }] } },
    { id: "anatomy", type: "anatomy", props: { label: "مخطط تشريحي مبسط", description: "اختر منطقة لعرض وصفها، أو استخدم قائمة البديل النصي.", viewBox: { width: 100, height: 140 }, parts: [{ id: "body", label: "الجذع", description: "المنطقة المركزية من الجسم.", shape: { type: "ellipse", cx: 50, cy: 78, rx: 25, ry: 45 } }, { id: "head", label: "الرأس", description: "المنطقة العلوية من المخطط.", parentId: "body", shape: { type: "circle", cx: 50, cy: 23, r: 13 } }] } },
    { id: "timeline", type: "animationTimeline", props: { label: "خط زمني للحركة", description: "شغّل الحركة أو أوقفها مؤقتًا أو انتقل إلى إطار محدد.", durationMs: 2400, frames: [{ id: "start", label: "البداية", timeMs: 0, value: 0 }, { id: "middle", label: "المنتصف", timeMs: 1200, value: 50 }, { id: "finish", label: "النهاية", timeMs: 2400, value: 100 }] } },
  ] }],
};

const engine = createIntuiEngine({ validateArticle });
registerScientificPlugins(engine);
registerArticleRenderer(engine, { theme: "light" });
const handle = engine.mount(host, article, {
  document,
  loadScientificModel: async (id) => {
    calls.model += 1;
    if (id !== "demo-model") throw new Error("unexpected model");
    return { format: "intuiforge.mesh.v1", vertices: [[-1, -1, 0], [1, -1, 0], [0, 1, 0], [0, 0, 1]], faces: [[0, 1, 2], [0, 3, 1], [1, 3, 2], [2, 3, 0]] };
  },
  loadMapData: async (id) => {
    calls.map += 1;
    if (id !== "demo-map") throw new Error("unexpected map");
    return { layers: [{ id: "local-river", label: "نهر محلي", visible: true, features: [{ type: "LineString", coordinates: [[37, 22], [45, 31]] }] }], markers: [{ id: "site-a", label: "موقع أ", coordinates: [45, 31], description: "بيانات استرجعها المضيف بعد طلب صريح." }] };
  },
  onError(error, phase) { errors.push({ message: error?.message ?? String(error), phase }); },
});

const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));
const component = (id) => host.shadowRoot?.querySelector(`#${id}`);
const click = (node) => node?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
const report = { validation: validateArticle(article), articleStatus: null, components: {}, interactions: {}, hostCallsBeforeInteraction: null, errors };

window.P09Ready = (async () => {
  report.articleStatus = (await handle.ready).status;
  for (const id of ["projectile", "mesh", "map", "graph", "physics", "molecule", "anatomy", "timeline"]) report.components[id] = Boolean(component(id)?.matches(".if-science-widget"));
  report.hostCallsBeforeInteraction = { ...calls };
  report.interactiveComponentCount = Object.values(report.components).filter(Boolean).length;
  if (new URLSearchParams(location.search).get("audit") !== "1") {
    log.textContent = JSON.stringify({ articleStatus: report.articleStatus, interactiveComponentCount: report.interactiveComponentCount, components: report.components, hostCallsBeforeInteraction: report.hostCallsBeforeInteraction, validation: report.validation.ok ? "valid" : report.validation.errors }, null, 2);
    status.textContent = `تم تحميل ${report.interactiveComponentCount} مكونات علمية تفاعلية.`;
    document.documentElement.dataset.p09Audit = "ready";
    window.P09Harness = { article, handle, report, host, engine, calls, errors, async dispose() { await handle.dispose(); await engine.dispose(); } };
    return report;
  }
  report.interactions.hostCapabilitiesAreExplicit = calls.model === 0 && calls.map === 0;
  const simulation = component("projectile");
  const simulationButton = [...simulation.querySelectorAll("button")].find((node) => node.textContent === "تشغيل");
  click(simulationButton); await delay(80); report.interactions.simulationRuns = simulationButton?.getAttribute("aria-pressed") === "true";
  click(simulationButton); report.interactions.simulationPauses = simulationButton?.getAttribute("aria-pressed") === "false";
  click([...simulation.querySelectorAll("button")].find((node) => node.textContent === "إعادة ضبط"));
  report.interactions.simulationResets = simulation.querySelector(".if-science-projectile")?.getAttribute("cx") === "32";

  const model = component("mesh");
  const oldPoints = model.querySelector("polygon")?.getAttribute("points");
  click([...model.querySelectorAll("button")].find((node) => node.textContent === "تحميل النموذج")); await delay(100);
  report.interactions.modelLoadsOnRequest = calls.model === 1 && Boolean(model.querySelector("polygon"));
  const loadedPoints = model.querySelector("polygon")?.getAttribute("points");
  click([...model.querySelectorAll("button")].find((node) => node.textContent === "تدوير النموذج"));
  report.interactions.modelOrbits = loadedPoints !== model.querySelector("polygon")?.getAttribute("points");
  const pointsAfterOrbit = model.querySelector("polygon")?.getAttribute("points");
  click([...model.querySelectorAll("button")].find((node) => node.textContent === "تحريك النموذج لليسار"));
  report.interactions.modelPans = pointsAfterOrbit !== model.querySelector("polygon")?.getAttribute("points");
  const pointsAfterPan = model.querySelector("polygon")?.getAttribute("points");
  click([...model.querySelectorAll("button")].find((node) => node.textContent === "تكبير"));
  report.interactions.modelZooms = pointsAfterPan !== model.querySelector("polygon")?.getAttribute("points");
  report.interactions.modelFallbackWasDescribed = Boolean(oldPoints === undefined && model.textContent.includes("نموذج محلي محدود"));
  const modelBlock = article.sections[0].blocks.find((block) => block.type === "model3d");
  const modelFailureArticle = { ...article, id: "p09-model-failure", sections: [{ id: "model-failure-section", heading: "نموذج بديل", blocks: [{ ...modelBlock, props: { ...modelBlock.props, modelId: "missing-model" } }] }] };
  await handle.update(modelFailureArticle);
  const missingModel = component("mesh");
  click([...missingModel.querySelectorAll("button")].find((node) => node.textContent === "تحميل النموذج")); await delay(50);
  report.interactions.modelLoaderFailureFallback = calls.model === 2 && missingModel.textContent.includes("تعذر تحميل النموذج") && Boolean(missingModel.querySelector(".if-science-fallback"));
  await handle.update(article);

  const map = component("map");
  report.interactions.mapInitiallyOffline = map.textContent.includes("تُعرض البيانات المحلية دون اتصال");
  const lineCount = map.querySelectorAll("polyline").length;
  let layerCheckbox = map.querySelector("input[type=checkbox]"); layerCheckbox.checked = false; layerCheckbox.dispatchEvent(new Event("change", { bubbles: true }));
  report.interactions.mapLayerToggle = map.querySelectorAll("polyline").length < lineCount;
  layerCheckbox = map.querySelector("input[type=checkbox]"); layerCheckbox.checked = true; layerCheckbox.dispatchEvent(new Event("change", { bubbles: true }));
  const marker = map.querySelector("[aria-label='دبي']"); click(marker); report.interactions.mapMarkerSelects = map.textContent.includes("موقع تجريبي محلي");
  marker?.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
  report.interactions.mapMarkerKeyboard = Boolean(map.querySelector(".if-science-map-selection")?.textContent.includes("دبي"));
  click([...map.querySelectorAll("button")].find((node) => node.textContent === "تحميل بيانات الخريطة")); await delay(80);
  report.interactions.mapLoadsOnRequest = calls.map === 1 && map.textContent.includes("نهر محلي");

  const graph = component("graph"); const formula = graph.querySelector("input");
  formula.value = "x^2"; formula.dispatchEvent(new Event("input", { bubbles: true }));
  report.interactions.graphUpdates = graph.querySelectorAll(".if-science-graph-line").length > 0 && graph.querySelector("svg")?.getAttribute("aria-label").includes("x^2");
  const graphPoint = graph.querySelector(".if-science-graph-point[tabindex='0']");
  graphPoint?.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
  report.interactions.graphKeyboardInspection = Boolean(graph.querySelector(".if-science-map-selection")?.textContent.includes("x ="));
  formula.value = "x.constructor"; formula.dispatchEvent(new Event("input", { bubbles: true }));
  report.interactions.graphRejectsUnsafeFormula = graph.querySelector("[role='status']")?.textContent.includes("غير مدعومة");

  const experiment = component("physics");
  const physicsInput = experiment.querySelector("input[type=range]"); const oldRange = experiment.querySelector("dd")?.textContent;
  physicsInput.value = "35"; physicsInput.dispatchEvent(new Event("input", { bubbles: true }));
  report.interactions.physicsParametersUpdate = oldRange !== experiment.querySelector("dd")?.textContent;

  const molecule = component("molecule"); click([...molecule.querySelectorAll("button")].find((node) => node.textContent.includes("أكسجين")));
  report.interactions.moleculeSelection = molecule.textContent.includes("أكسجين (O)");

  const anatomy = component("anatomy"); click([...anatomy.querySelectorAll("button")].find((node) => node.textContent === "الرأس"));
  report.interactions.anatomyTextAlternative = anatomy.textContent.includes("الرأس: المنطقة العلوية") && anatomy.querySelector("[data-part-id='head']")?.getAttribute("aria-pressed") === "true";
  anatomy.querySelector("[data-part-id='body']")?.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
  report.interactions.anatomyKeyboardHighlight = anatomy.querySelector("[data-part-id='body']")?.getAttribute("aria-pressed") === "true";

  const timeline = component("timeline"); const seek = timeline.querySelector("input[type=range]");
  seek.value = "1200"; seek.dispatchEvent(new Event("input", { bubbles: true }));
  report.interactions.timelineSeek = timeline.querySelector("output")?.textContent.includes("1200 ms");
  click([...timeline.querySelectorAll("button")].find((node) => node.textContent === "إعادة ضبط"));
  report.interactions.timelineReset = timeline.querySelector("input[type=range]").value === "0";
  seek.value = "1200"; seek.dispatchEvent(new Event("input", { bubbles: true }));
  const speedSelect = timeline.querySelector("select"); speedSelect.value = "2"; speedSelect.dispatchEvent(new Event("change", { bubbles: true }));
  report.interactions.timelineSpeedControl = speedSelect.value === "2";
  const timelinePlay = [...timeline.querySelectorAll("button")].find((node) => node.textContent === "تشغيل");
  click(timelinePlay); await delay(90); const advanced = Number(timeline.querySelector("input[type=range]").value) > 1200;
  click(timelinePlay); report.interactions.timelinePlaysAndPauses = advanced && timelinePlay.getAttribute("aria-pressed") === "false";

  const mapBlock = article.sections[0].blocks.find((block) => block.type === "map");
  const mapFailureArticle = { ...article, id: "p09-map-failure", sections: [{ id: "map-failure-section", heading: "خريطة محلية", blocks: [{ ...mapBlock, props: { ...mapBlock.props, mapId: "missing-map" } }] }] };
  await handle.update(mapFailureArticle);
  const fallbackMap = component("map");
  click([...fallbackMap.querySelectorAll("button")].find((node) => node.textContent === "تحميل بيانات الخريطة")); await delay(50);
  report.interactions.mapLoaderFailurePreservesLocal = calls.map === 2 && fallbackMap.textContent.includes("تعذر تحميل البيانات") && fallbackMap.querySelectorAll(".if-science-map-marker").length === 1;

  const ltrArticle = { ...article, id: "p09-ltr-audit", locale: "en", dir: "ltr", metadata: { ...article.metadata, supportedLocales: ["ar", "en"] } };
  const ltrResult = await handle.update(ltrArticle);
  const ltrRoot = host.shadowRoot?.querySelector(".if-article-root");
  report.interactions.rtlAndLtr = article.dir === "rtl" && ltrResult.status === "ready" && ltrRoot?.getAttribute("dir") === "ltr" && ltrRoot.querySelectorAll(".if-science-widget").length === 8;
  await handle.dispose();
  report.interactions.extensionLifecycleDisposes = handle.state === "disposed" && !host.shadowRoot?.querySelector(".if-article-root");

  report.interactiveComponentCount = Object.values(report.components).filter(Boolean).length;
  report.allInteractionsPass = Object.values(report.interactions).every(Boolean);
  log.textContent = JSON.stringify({ ...report, validation: report.validation.ok ? "valid" : report.validation.errors }, null, 2);
  status.textContent = report.interactiveComponentCount === 8 && report.allInteractionsPass && !errors.length ? "اجتاز فحص P09 التفاعلي المكونات الثمانية." : "فشل بعض فحوص P09؛ راجع سجل الفحص.";
  document.documentElement.dataset.p09Audit = report.interactiveComponentCount === 8 && report.allInteractionsPass && !errors.length ? "pass" : "fail";
  window.P09Harness = { article, handle, report, host, engine, calls, errors, async dispose() { await handle.dispose(); await engine.dispose(); } };
  return report;
})();
