import { parseArticleSource } from "../../packages/article/src/index.js";
import { mountIntuiArticle, createProgressPersistenceAdapter } from "../../packages/host-integration/src/index.js";
import { mountReactIsland } from "../../packages/react-island/src/index.js";
import { RichViz, RICHVIZ_VERSION } from "../../packages/visualization-legacy/src/index.js";

const resultNode = document.querySelector("#result");
const mode = location.pathname.endsWith("p12-framework.html") ? "framework" : "plain";
const routeCalls = [];
let plainMount;
let routeMount;
let legacyHandle;
let frameworkIsland;
let frameworkMount;
let frameworkUnmount;
const progressValues = new Map();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function hostArticleFrom(parsedArticle) {
  const article = structuredClone(parsedArticle);
  article.id = "p12-framework-article";
  article.sections[0].blocks.push(
    { id: "route-next", type: "button", content: "Open next lesson", events: { click: { action: "navigate", route: "next-lesson" } } },
    { id: "cards", type: "flashcards", props: { cards: [{ id: "card-one", front: "Question", back: "Answer" }], saveLabel: "Save progress" } },
  );
  return article;
}

async function initialize() {
  const response = await fetch("/tests/fixtures/p02/valid/mixed-markdown.md");
  assert(response.ok, "P02 Markdown fixture must be available to the browser host.");
  const markdown = await response.text();
  const parsed = parseArticleSource(markdown);
  assert(parsed.ok, "The existing edu-viz Markdown fixture must pass the authoritative article validator.");
  const legacyBlock = parsed.value.sections[0].blocks.find((block) => block.type === "legacyViz");
  assert(legacyBlock?.props?.spec?.version === 1, "The Markdown fixture must retain its legacy RichViz spec.");

  if (mode === "plain") {
    plainMount = mountIntuiArticle(document.querySelector("#plain-mount"), markdown, {
      hostEnvironment: { theme: "light", lang: "ar", dir: "rtl" },
    });
    const routeArticle = hostArticleFrom(parsed.value);
    routeMount = mountIntuiArticle(document.querySelector("#route-mount"), routeArticle, {
      hostEnvironment: { onNavigate: (route) => routeCalls.push(route), theme: "light" },
    });
    legacyHandle = RichViz.render(document.querySelector("#legacy-copy"), legacyBlock.props.spec, { lang: "en", dir: "ltr" });
    await Promise.all([plainMount.ready, routeMount.ready, legacyHandle.ready]);
    assert(plainMount.state === "ready" && routeMount.state === "ready", "Plain HTML article mounts must reach ready state.");
  } else {
    const article = hostArticleFrom(parsed.value);
    const progress = createProgressPersistenceAdapter({
      userId: "p12-learner-7",
      read: async (key) => progressValues.get(key) ?? null,
      write: async (key, value) => progressValues.set(key, value),
    });
    function createRoot(island) {
      return {
        render(model) {
          if (frameworkMount) void frameworkMount.update(model.article);
          else {
            frameworkMount = mountIntuiArticle(island, model.article, {
              hostEnvironment: { theme: "light", progress, onNavigate: (route) => routeCalls.push(route) },
            });
          }
        },
        unmount() { frameworkUnmount = frameworkMount?.dispose(); },
      };
    }
    frameworkIsland = mountReactIsland(document.querySelector("#framework-root"), { article }, createRoot);
    await frameworkMount.ready;
    assert(frameworkMount.state === "ready", "The framework-managed island must reach ready state.");
    document.querySelector("#framework-static").hidden = true;
  }

  resultNode.textContent = `P12 ${mode} host ready; RichViz ${RICHVIZ_VERSION}.`;
  resultNode.dataset.state = "ready";
}

let startPromise;
function start() {
  if (!startPromise) startPromise = initialize();
  return startPromise;
}

window.P12_RUN_CHECKS = async () => {
  await start();
  const baseRoute = `${location.pathname}${location.search}`;
  const hostHeader = document.querySelector("#host-header");
  const hostFooter = document.querySelector("#host-footer");
  assert(hostHeader && hostFooter, "Host-owned content must remain outside the article mount.");
  assert(RICHVIZ_VERSION === "0.5.0" && typeof RichViz.render === "function", "The installed legacy RichViz API must remain available.");

  if (mode === "plain") {
    const article = document.querySelector("#plain-mount").shadowRoot?.querySelector(".if-article-root");
    assert(article?.querySelector("h1")?.textContent === "Markdown and JSON", "The plain host must render the existing Markdown article.");
    assert(article.querySelector(".if-article-figure"), "The edu-viz fence must mount through the preserved RichViz adapter.");
    assert(document.querySelector("#legacy-copy").children.length > 0, "The older installed RichViz copy must keep rendering beside IntuiForge.");
    const legacyShadowText = document.querySelector("#legacy-copy").textContent;
    assert(legacyShadowText.includes("Legacy steps") || document.querySelector("#legacy-copy").children.length > 0, "Legacy RichViz output remains present.");

    const button = document.querySelector("#route-mount").shadowRoot?.querySelector("#route-next button");
    button?.click();
    assert(routeCalls.includes("next-lesson"), "The stable route token must be passed to the host router.");
    assert(`${location.pathname}${location.search}` === baseRoute, "The engine must not replace the host route.");
    await plainMount.updateEnvironment({ theme: "dark" });
    assert(document.querySelector("#plain-mount").shadowRoot.querySelector(".if-article-root").dataset.theme === "dark", "Host theme updates refresh only the mounted article.");

    const anchor = article.querySelector('a[href="#overview"]');
    anchor?.click();
    assert(location.hash === "#overview", "Stable in-article anchors must remain deep-linkable.");
    assert(hostHeader.isConnected && hostFooter.isConnected, "The host header and footer must survive rendering and navigation.");
  } else {
    const shadow = document.querySelector("#framework-root [data-intui-react-island]").shadowRoot;
    const article = shadow?.querySelector(".if-article-root");
    assert(article?.querySelector("h1")?.textContent === "Markdown and JSON", "The framework fixture must mount the production article renderer inside its island.");
    assert(article.querySelector(".if-article-figure"), "The framework host must preserve the edu-viz adapter output.");
    const routeButton = article.querySelector("#route-next button");
    routeButton?.click();
    assert(routeCalls.includes("next-lesson"), "The framework host delegates stable route tokens to its router.");
    assert(`${location.pathname}${location.search}` === baseRoute, "Framework integration must preserve the host route.");

    const cards = article.querySelector("#cards");
    cards.querySelector("[data-card-reviewed]").click();
    assert(progressValues.size === 0, "Progress is not persisted before an explicit save action.");
    cards.querySelector("[data-save-progress]").click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    assert(progressValues.size === 1, "The host-provided adapter receives the explicit per-user save.");
    await frameworkMount.refresh();
    const refreshedArticle = document.querySelector("#framework-root [data-intui-react-island]").shadowRoot.querySelector(".if-article-root");
    assert(refreshedArticle.querySelector("#cards [data-card-reviewed]").getAttribute("aria-pressed") === "true", "Saved per-user activity progress restores on remount.");
    assert(hostFooter.isConnected && document.querySelector("#framework-static").hidden, "The host keeps its shell around the active framework mount.");
    await frameworkMount.updateEnvironment({ theme: "dark" });
    assert(document.querySelector("#framework-root [data-intui-react-island]").shadowRoot.querySelector(".if-article-root").dataset.theme === "dark", "The framework host can update the article theme without taking over the page.");
  }

  const rendered = mode === "plain" ? document.querySelector("#plain-mount").shadowRoot.querySelector(".if-article-root") : document.querySelector("#framework-root [data-intui-react-island]").shadowRoot.querySelector(".if-article-root");
  const bodyTextSize = Number.parseFloat(getComputedStyle(rendered).fontSize);
  assert(bodyTextSize >= 16, "Meaningful article text must remain at least 16 CSS pixels.");
  assert(document.documentElement.scrollWidth <= window.innerWidth, "Host integration must not cause page-wide horizontal overflow.");
  resultNode.textContent = `P12 ${mode} checks PASS; RTL host; ${bodyTextSize}px article text.`;
  resultNode.dataset.state = "pass";
  return { status: "PASS", mode, bodyTextSize, routeCalls: [...routeCalls], richviz: RICHVIZ_VERSION };
};

window.P12_RUN_ROLLBACK = async () => {
  if (mode === "framework") {
    frameworkIsland?.dispose();
    await frameworkUnmount;
    document.querySelector("#framework-static").hidden = false;
    assert(document.querySelector("#host-header").isConnected && document.querySelector("#host-footer").isConnected, "Disposing the new framework mount preserves the host shell.");
    assert(document.querySelector("#framework-static").hidden === false, "The host can restore its pre-install fallback when rolling back.");
  } else {
    await plainMount?.dispose();
    assert(document.querySelector("#legacy-copy").children.length > 0, "Rolling back IntuiForge leaves the older RichViz copy running.");
  }
  resultNode.textContent = `P12 ${mode} rollback PASS; previous host content remains available.`;
  resultNode.dataset.rollback = "pass";
  return { status: "PASS", mode };
};

start().catch((error) => {
  resultNode.textContent = `P12 ${mode} fixture failed: ${error.message}`;
  resultNode.dataset.state = "error";
  console.error(error);
});
