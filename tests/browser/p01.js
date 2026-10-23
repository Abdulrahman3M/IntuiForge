import { createIntuiEngine } from "../../packages/core/src/index.js";
import { registerRichVizAdapter, RichViz } from "../../packages/visualization-legacy/src/index.js";

const stepGuide = {
  version: 1,
  type: "step-guide",
  title: "تجربة توافق RichViz",
  description: "مخطط حقيقي يُرسم عبر محرك RichViz المحلي داخل نواة IntuiForge.",
  data: {
    steps: [
      { title: "التحقق", text: "يُمرّر المحتوى إلى مدقق موثوق." },
      { title: "العرض", text: "يعزل المحرك واجهة RichViz خلف محول محلي." },
    ],
  },
};

async function run() {
  const validator = (input) => {
    const result = RichViz.validate(JSON.stringify(input));
    return result.ok ? { ok: true, value: result.spec } : { ok: false, errors: result.errors };
  };

  const legacyEngine = createIntuiEngine({ validateArticle: validator });
  registerRichVizAdapter(legacyEngine);
  legacyEngine.registerRenderer({
    id: "org.intuiforge.p01-browser-smoke",
    version: "1.0.0",
    capabilities: ["legacy-visualization"],
    default: true,
    async render(container, spec, context) {
      const adapter = context.getAdapter("org.intuiforge.richviz");
      const handle = adapter.render(container, spec, { lang: context.lang, dir: context.dir });
      await handle.ready;
      return handle;
    },
  });
  const legacyHandle = legacyEngine.mount(document.querySelector("#legacy"), stepGuide, { lang: "ar", dir: "rtl" });

  const fallbackEngine = createIntuiEngine({ validateArticle: (input) => ({ ok: true, value: input }) });
  fallbackEngine.registerRenderer({
    id: "org.intuiforge.p01-error-smoke",
    version: "1.0.0",
    capabilities: ["fallback-test"],
    default: true,
    render() { throw new Error("private adapter detail must not appear in the page"); },
  });
  const fallbackAr = fallbackEngine.mount(document.querySelector("#fallback-ar"), {}, { lang: "ar", dir: "rtl" });
  const fallbackEn = fallbackEngine.mount(document.querySelector("#fallback-en"), {}, { lang: "en", dir: "ltr" });
  const [legacyResult, arabicResult, englishResult] = await Promise.all([legacyHandle.ready, fallbackAr.ready, fallbackEn.ready]);

  const legacyVisible = document.querySelector("#legacy").dataset.revType === "step-guide";
  const arabicAlert = document.querySelector("#fallback-ar [data-intui-error-host]")?.shadowRoot?.querySelector('[role="alert"]');
  const englishAlert = document.querySelector("#fallback-en [data-intui-error-host]")?.shadowRoot?.querySelector('[role="alert"]');
  const result = {
    status: legacyVisible && arabicAlert?.getAttribute("dir") === "rtl" && englishAlert?.getAttribute("dir") === "ltr" ? "PASS" : "FAIL",
    legacy: legacyResult.status,
    richvizType: document.querySelector("#legacy").dataset.revType,
    arabicFallback: { status: arabicResult.status, direction: arabicAlert?.getAttribute("dir"), fontSize: arabicAlert ? getComputedStyle(arabicAlert.querySelector("p")).fontSize : null },
    englishFallback: { status: englishResult.status, direction: englishAlert?.getAttribute("dir") },
    apiTypes: RichViz.types.length,
  };
  document.querySelector("#result").textContent = JSON.stringify(result);
  document.documentElement.dataset.p01Status = result.status;
  window.__INTUIFORGE_P01__ = result;
  await Promise.all([legacyHandle.dispose(), fallbackAr.dispose(), fallbackEn.dispose(), legacyEngine.dispose(), fallbackEngine.dispose()]);
}

run().catch((error) => {
  const result = { status: "FAIL", error: String(error?.message || "Browser smoke failed") };
  document.querySelector("#result").textContent = JSON.stringify(result);
  document.documentElement.dataset.p01Status = "FAIL";
  window.__INTUIFORGE_P01__ = result;
});
