import assert from "node:assert/strict";
import test from "node:test";
import { createIntuiEngine } from "../packages/core/src/index.js";
import { validateArticle } from "../packages/article/src/index.js";
import { registerArticleRenderer, renderArticleStatic } from "../packages/article-renderer/src/index.js";

class FakeNode {
  constructor(tagName = "div") { this.tagName = tagName.toUpperCase(); this.children = []; this.parentNode = null; this.attributes = new Map(); this.listeners = new Map(); this.hidden = false; this.open = false; this.value = ""; }
  set textContent(value) { this._text = String(value ?? ""); this.replaceChildren(); }
  get textContent() { return `${this._text ?? ""}${this.children.map((child) => child.textContent).join("")}`; }
  append(...nodes) { for (const node of nodes) { node.parentNode?.removeChild(node); node.parentNode = this; this.children.push(node); } }
  appendChild(node) { this.append(node); return node; }
  prepend(...nodes) { for (const node of [...nodes].reverse()) { node.parentNode?.removeChild(node); node.parentNode = this; this.children.unshift(node); } }
  removeChild(node) { const index = this.children.indexOf(node); if (index >= 0) this.children.splice(index, 1); node.parentNode = null; return node; }
  replaceChildren(...nodes) { for (const child of [...this.children]) this.removeChild(child); this.append(...nodes); }
  setAttribute(name, value) { this.attributes.set(name, String(value)); if (name === "id") this.id = String(value); if (name === "type") this.type = String(value); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  removeAttribute(name) { this.attributes.delete(name); }
  addEventListener(type, listener) { const listeners = this.listeners.get(type) ?? new Set(); listeners.add(listener); this.listeners.set(type, listeners); }
  removeEventListener(type, listener) { this.listeners.get(type)?.delete(listener); }
  dispatch(type, event = {}) { for (const listener of this.listeners.get(type) ?? []) listener({ type, target: this, preventDefault() {}, ...event }); }
  click() { this.dispatch("click"); }
  focus() { this.focused = true; }
  attachShadow() { this.shadowRoot = new FakeNode("#shadow-root"); return this.shadowRoot; }
}

class FakeDocument { createElement(name) { const node = new FakeNode(name); node.ownerDocument = this; return node; } }

function find(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.children ?? []) { const result = find(child, predicate); if (result) return result; }
  return undefined;
}

function educationArticle() {
  return {
    kind: "intui.article", schemaVersion: "1.0.0", id: "p07-education", locale: "en", dir: "ltr",
    title: "Learning interactions", summary: "A validated fixture for educational interaction behavior.",
    metadata: { status: "draft", contentType: "article", sources: [], canonicalReferences: [], supportedLocales: ["en"], provenance: [] },
    assets: [{ id: "learning-figure", url: "./learning.svg", type: "image/svg+xml", alt: "Learning progression graphic.", license: "CC0-1.0", provenance: "P07 renderer fixture", width: 640, height: 320 }], derived: {}, initialState: {
      activeStep: { type: "enum", value: "step-one", values: ["step-one", "step-two"] },
      activeDate: { type: "enum", value: "event-one", values: ["event-one", "event-two"] },
      activeScenario: { type: "enum", value: "scenario-one", values: ["scenario-one", "scenario-two"] },
      doneCount: { type: "integer", value: 2, min: 0, max: 5 },
    },
    sections: [{ id: "lesson", heading: "Lesson", blocks: [
      { id: "stepper", type: "stepper", props: { label: "Lesson steps" }, bindings: { selected: "activeStep" }, children: [
        { id: "step-one", type: "group", props: { label: "First" }, children: [{ id: "step-one-copy", type: "paragraph", content: "Read the first explanation." }, { id: "step-one-figure", type: "figure", props: { assetId: "learning-figure" } }] },
        { id: "step-two", type: "group", props: { label: "Second" }, children: [{ id: "step-two-copy", type: "paragraph", content: "Review the second graph." }, { id: "step-two-visual", type: "metric", props: { label: "Graph value", value: 42 } }] },
      ] },
      { id: "timeline", type: "timeline", props: { label: "Course timeline" }, bindings: { selected: "activeDate" }, children: [
        { id: "event-one", type: "group", props: { label: "Launch", date: "2026-01-01" }, children: [{ id: "event-one-copy", type: "paragraph", content: "The course begins." }] },
        { id: "event-two", type: "group", props: { label: "Review", date: "2026-06-01" }, children: [{ id: "event-two-copy", type: "paragraph", content: "Learners review progress." }] },
      ] },
      { id: "quiz", type: "quiz", props: { label: "Knowledge check", questions: [
        { id: "question-one", type: "single-choice", prompt: "Which answer is correct?", options: [{ id: "option-a", label: "Not this one" }, { id: "option-b", label: "This one" }], answer: "option-b", explanation: "The second choice matches the lesson." },
      ] } },
      { id: "cards", type: "flashcards", props: { label: "Key ideas", cards: [
        { id: "card-one", front: "Prompt one", back: "Answer one" }, { id: "card-two", front: "Prompt two", back: "Answer two" },
      ] } },
      { id: "guided", type: "guidedComparison", props: { label: "Compare approaches", scenarios: [
        { id: "scenario-one", label: "Careful approach", left: { label: "Method", value: "Measure first" }, right: { label: "Outcome", value: "Lower risk" }, rationale: "Measurement reduces uncertainty." },
        { id: "scenario-two", label: "Fast approach", left: { label: "Method", value: "Act now" }, right: { label: "Outcome", value: "Faster result" }, rationale: "Acting early saves time when risk is low." },
      ] }, bindings: { selected: "activeScenario" } },
      { id: "progress-control", type: "input", props: { label: "Completed lessons", inputType: "number", min: 0, max: 5 }, bindings: { value: "doneCount" } },
      { id: "progress", type: "progress", props: { label: "Course completion", max: 5 }, bindings: { value: "doneCount" }, events: { click: { action: "saveProgress", activityId: "quiz", scope: "activity" } } },
    ] }],
  };
}

async function mount(article, environment = {}) {
  const previousDocument = globalThis.document;
  globalThis.document = new FakeDocument();
  const engine = createIntuiEngine({ validateArticle });
  registerArticleRenderer(engine, { theme: "light" });
  const container = new FakeNode("div");
  const handle = engine.mount(container, article, { document: globalThis.document, ...environment });
  const result = await handle.ready;
  return { container, engine, handle, result, root: container.shadowRoot, restore() { globalThis.document = previousDocument; } };
}

test("EDU-01/03/04/06/07 synchronize accessible education widgets and explicit host progress saves", async () => {
  const saves = [];
  const submitted = [];
  const mounted = await mount(educationArticle(), {
    onProgress: (action, context) => saves.push({ action, learningProgress: context.learningProgress }),
    onSubmitQuiz: (payload) => submitted.push(payload),
  });
  try {
    assert.deepEqual(mounted.result, { status: "ready" });
    const root = mounted.root;
    const illustration = find(root, (node) => node.tagName === "IMG");
    assert.equal(illustration.getAttribute("width"), "640");
    assert.equal(illustration.getAttribute("height"), "320");
    assert.equal(illustration.getAttribute("style"), "aspect-ratio:640 / 320");
    const stepper = find(root, (node) => node.id === "stepper");
    const secondStep = find(stepper, (node) => node.getAttribute("data-step-id") === "step-two");
    secondStep.click();
    assert.equal(find(root, (node) => node.id === "step-one").hidden, true);
    assert.equal(find(root, (node) => node.id === "step-two").hidden, false);
    assert.equal(find(stepper, (node) => node.tagName === "PROGRESS").value, 2);

    const timeline = find(root, (node) => node.id === "timeline");
    find(timeline, (node) => node.getAttribute("data-event-id") === "event-two").click();
    assert.equal(find(root, (node) => node.id === "event-two").hidden, false);
    assert.equal(find(timeline, (node) => node.getAttribute("data-event-id") === "event-two").getAttribute("aria-selected"), "true");

    const quiz = find(root, (node) => node.id === "quiz");
    find(quiz, (node) => node.getAttribute("data-option-id") === "option-b").click();
    find(quiz, (node) => node.getAttribute("data-submit-quiz") === "").click();
    assert.match(find(quiz, (node) => node.getAttribute("data-quiz-feedback") === "").textContent, /1 \/ 1/);
    assert.match(quiz.textContent, /second choice matches/);
    assert.equal(submitted.length, 1);
    assert.equal(submitted[0].score, 1);

    const cards = find(root, (node) => node.id === "cards");
    find(cards, (node) => node.getAttribute("data-flashcard-flip") === "").click();
    assert.match(find(cards, (node) => node.getAttribute("data-flashcard-face") === "").textContent, /Answer one/);
    find(cards, (node) => node.getAttribute("data-card-reviewed") === "").click();
    assert.match(find(cards, (node) => node.getAttribute("class") === "if-article-caption").textContent, /Cards reviewed: 1/);

    const guided = find(root, (node) => node.id === "guided");
    find(guided, (node) => node.getAttribute("data-scenario-id") === "scenario-two").click();
    assert.match(guided.textContent, /Acting early saves time/);
    assert.equal(find(guided, (node) => node.getAttribute("data-scenario-id") === "scenario-two").getAttribute("aria-pressed"), "true");

    const progress = find(root, (node) => node.id === "progress");
    const progressBar = find(progress, (node) => node.tagName === "PROGRESS");
    assert.equal(progressBar.value, 2);
    const progressInput = find(root, (node) => node.id === "progress-control").children[0].children.find((node) => node.tagName === "INPUT");
    progressInput.value = "4"; progressInput.dispatch("input");
    assert.equal(progressBar.value, 4);
    find(progress, (node) => node.getAttribute("data-save-progress") === "").click();
    assert.equal(saves.length, 1);
    assert.equal(saves[0].action.action, "saveProgress");
    assert.equal(saves[0].action.scope, "activity");
    assert.equal(saves[0].learningProgress.activities.quiz.score, 1);
    assert.equal(find(stepper, (node) => node.getAttribute("data-step-id") === "step-two").getAttribute("aria-selected"), "true");
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("EDU-05 supports matching and keyboard-accessible ordering before deterministic scoring", async () => {
  const article = educationArticle();
  const quiz = article.sections[0].blocks.find((block) => block.id === "quiz");
  quiz.props.questions.push(
    { id: "match-question", type: "matching", prompt: "Match each concept", pairs: [{ id: "left-one", label: "First" }, { id: "left-two", label: "Second" }], options: [{ id: "right-one", label: "One" }, { id: "right-two", label: "Two" }], answer: { "left-one": "right-two", "left-two": "right-one" } },
    { id: "order-question", type: "ordering", prompt: "Put these events in order", items: [{ id: "second", label: "Second event" }, { id: "first", label: "First event" }], answer: ["first", "second"] },
  );
  const mounted = await mount(article);
  try {
    assert.deepEqual(mounted.result, { status: "ready" });
    const quizRoot = find(mounted.root, (node) => node.id === "quiz");
    const matching = find(quizRoot, (node) => node.getAttribute("data-question-id") === "match-question");
    const selectors = matching.children.filter((node) => node.tagName === "DIV").flatMap((node) => node.children).map((node) => node.children.find((child) => child.tagName === "SELECT")).filter(Boolean);
    selectors[0].value = "right-two"; selectors[0].dispatch("change");
    selectors[1].value = "right-one"; selectors[1].dispatch("change");

    const ordering = find(quizRoot, (node) => node.getAttribute("data-question-id") === "order-question");
    const orderedList = find(ordering, (node) => node.tagName === "OL");
    const firstRow = find(orderedList, (node) => node.getAttribute("data-order-id") === "first");
    firstRow.children.find((node) => node.tagName === "BUTTON" && node.getAttribute("aria-label").startsWith("Move up")).click();
    assert.equal(orderedList.children[0].getAttribute("data-order-id"), "first");

    find(quizRoot, (node) => node.getAttribute("data-option-id") === "option-b").click();
    find(quizRoot, (node) => node.getAttribute("data-submit-quiz") === "").click();
    assert.match(find(quizRoot, (node) => node.getAttribute("data-quiz-feedback") === "").textContent, /3 \/ 3/);
    assert.equal(find(quizRoot, (node) => node.getAttribute("data-question-id") === "match-question").children.some((node) => node.getAttribute("data-correct") === "true"), true);
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("EDU-01/02/03/04/06/07 static rendering preserves complete safe educational content", () => {
  const article = educationArticle();
  article.sections[0].blocks.find((block) => block.id === "stepper").children[1].children[0].content = "A <b>literal</b> explanation.";
  const html = renderArticleStatic(article);
  assert.match(html, /A &lt;b&gt;literal&lt;\/b&gt; explanation\./);
  assert.match(html, /Which answer is correct\?/);
  assert.match(html, /second choice matches the lesson/);
  assert.match(html, /Prompt two/);
  assert.match(html, /Answer two/);
  assert.match(html, /2026-06-01/);
  assert.match(html, /Acting early saves time when risk is low/);
  assert.match(html, /<progress[^>]+value="2"/);
});
