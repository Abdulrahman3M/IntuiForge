import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { validateArticle } from "@intuiforge/engine/article";

const here = dirname(fileURLToPath(import.meta.url));

function articleWithP04Actions() {
  const article = JSON.parse(readFileSync(resolve(here, "fixtures", "p02", "valid", "minimal-article.json"), "utf8"));
  article.sections[0].blocks[0].events = {
    reveal: { action: "expand", targetId: "overview-paragraph" },
    jump: { action: "scroll", targetId: "overview-paragraph" },
  };
  return article;
}

test("INT-02 accepts declarative scroll and expand actions without executable payloads", () => {
  const result = validateArticle(articleWithP04Actions());

  assert.equal(result.ok, true, JSON.stringify(result.errors));
  assert.deepEqual(result.value.sections[0].blocks[0].events, {
    reveal: { action: "expand", targetId: "overview-paragraph" },
    jump: { action: "scroll", targetId: "overview-paragraph" },
  });
});

function reactiveArticle() {
  const article = JSON.parse(readFileSync(resolve(here, "fixtures", "p02", "valid", "minimal-article.json"), "utf8"));
  article.initialState = {
    tempC: { type: "number", value: 25, min: -20, max: 120, step: 5 },
    stepIndex: { type: "integer", value: 0, min: 0, max: 3 },
    enabled: { type: "boolean", value: false },
    phaseChoice: { type: "enum", value: "solid", values: ["solid", "liquid", "gas"] },
    unrelated: { type: "number", value: 7 },
  };
  article.derived = {
    phase: {
      op: "if",
      condition: { op: "lt", a: { ref: "tempC" }, b: 0 },
      then: "ice",
      else: { op: "if", condition: { op: "lt", a: { ref: "tempC" }, b: 100 }, then: "liquid", else: "steam" },
    },
    tempF: { op: "add", a: { op: "multiply", a: { ref: "tempC" }, b: 1.8 }, b: 32 },
  };
  article.assets = [{
    id: "sample-audio", url: "media/sample.mp3", type: "audio/mpeg", alt: "Sample audio",
    license: "CC0", provenance: "author-supplied",
  }];
  article.sections[0].blocks = [
    {
      id: "temp-slider", type: "slider", content: "درجة الحرارة",
      props: { min: -20, max: 120, step: 5 },
      bindings: { value: "tempC" },
      events: {
        change: { action: "setState", variable: "tempC", valueFrom: "event.value" },
        next: { action: "nextStep", variable: "stepIndex" },
        choose: { action: "selectOption", variable: "phaseChoice", valueFrom: "event.optionId" },
        toggle: { action: "toggle", variable: "enabled" },
        filter: { action: "setFilter", filterId: "phase-filter", valueFrom: "event.value" },
        submit: { action: "submitQuiz", quizId: "quiz-one" },
        navigate: { action: "navigate", route: "next-lesson" },
        scroll: { action: "scroll", targetId: "overview-paragraph" },
        expand: { action: "expand", targetId: "details-panel" },
        play: { action: "playMedia", assetId: "sample-audio", gestureRequired: true },
        seek: { action: "seekMedia", assetId: "sample-audio", valueFrom: "event.value" },
      },
    },
    { id: "temp-text", type: "text", content: "25°C", props: {}, bindings: { text: "tempC" } },
    { id: "temp-metric", type: "metric", content: "25°C", props: { label: "الحرارة" }, bindings: { value: "tempC" } },
    {
      id: "temp-plot", type: "legacyViz", props: { vizType: "bar-chart", description: "تغير درجة الحرارة" },
      bindings: { highlightValue: "tempC" },
    },
    { id: "overview-paragraph", type: "paragraph", content: "Temperature changes the related reading." },
    { id: "details-panel", type: "accordion", content: "Additional details", props: {} },
  ];
  const result = validateArticle(article);
  assert.equal(result.ok, true, JSON.stringify(result.errors));
  return result.value;
}

async function loadStateApi() {
  try {
    return await import("@intuiforge/engine/state");
  } catch (error) {
    assert.fail(`P04 reactive state API is not implemented yet: ${error.message}`);
  }
}

test("INT-01 publishes scoped selector updates synchronously and isolates unrelated selectors", async () => {
  const { createReactiveStore } = await loadStateApi();
  const store = createReactiveStore(reactiveArticle());
  const temperature = [];
  const unrelated = [];
  store.subscribe("tempC", (value) => temperature.push(value));
  store.subscribe("unrelated", (value) => unrelated.push(value));
  temperature.length = 0;
  unrelated.length = 0;

  const result = store.set("tempC", 30);

  assert.equal(result, 30);
  assert.equal(store.get("tempC"), 30);
  assert.equal(temperature.length, 1);
  assert.equal(temperature[0], 30);
  assert.deepEqual(unrelated, []);
});

test("INT-02 dispatches allowlisted state and host-capability actions, rejecting unsafe effects", async () => {
  const { createActionDispatcher, createReactiveStore } = await loadStateApi();
  const article = reactiveArticle();
  const store = createReactiveStore(article);
  const calls = [];
  const handlers = Object.fromEntries(["filter", "submit", "navigate", "scroll", "expand", "media"].map((name) => [
    name,
    (action, context) => calls.push({ name, action: structuredClone(action), event: context.event }),
  ]));
  const dispatcher = createActionDispatcher({ article, store, handlers });

  dispatcher.dispatchEvent("temp-slider", "next", {});
  dispatcher.dispatchEvent("temp-slider", "choose", { optionId: "liquid" });
  dispatcher.dispatchEvent("temp-slider", "toggle", {});
  dispatcher.dispatchEvent("temp-slider", "filter", { value: "liquid" });
  dispatcher.dispatchEvent("temp-slider", "submit", {});
  dispatcher.dispatchEvent("temp-slider", "navigate", {});
  dispatcher.dispatchEvent("temp-slider", "scroll", {});
  dispatcher.dispatchEvent("temp-slider", "expand", {});
  dispatcher.dispatchEvent("temp-slider", "play", {});
  dispatcher.dispatchEvent("temp-slider", "seek", { value: 12 });

  assert.equal(store.get("stepIndex"), 1);
  assert.equal(store.get("phaseChoice"), "liquid");
  assert.equal(store.get("enabled"), true);
  assert.deepEqual(calls.map((call) => call.name), ["filter", "submit", "navigate", "scroll", "expand", "media", "media"]);
  assert.equal(calls[0].event.value, "liquid");
  assert.equal(calls[6].action.action, "seekMedia");

  assert.throws(() => dispatcher.dispatch({ action: "runScript", source: "globalThis.compromised = true" }), { code: "UNSUPPORTED_ACTION" });
  assert.throws(() => createActionDispatcher({ article, store }).dispatch(article.sections[0].blocks[0].events.navigate), { code: "ACTION_CAPABILITY_UNAVAILABLE" });
  let actionNameCoerced = false;
  assert.throws(() => dispatcher.dispatch({ action: { toString() { actionNameCoerced = true; return "setState"; } } }), { code: "UNSUPPORTED_ACTION" });
  assert.equal(actionNameCoerced, false);
  let eventGetterCalled = false;
  const hostileEvent = Object.defineProperty({}, "value", { get() { eventGetterCalled = true; return 99; } });
  assert.throws(() => dispatcher.dispatchEvent("temp-slider", "change", hostileEvent), { code: "UNSAFE_ACTION" });
  assert.equal(eventGetterCalled, false);
  assert.equal(store.get("tempC"), 25);
  assert.equal(globalThis.compromised, undefined);
});

test("INT-03 evaluates only bounded allowlisted expression nodes and rejects hostile operators", async () => {
  const { evaluateExpression } = await loadStateApi();
  assert.equal(evaluateExpression({ op: "add", a: { ref: "tempC" }, b: 5 }, { tempC: 25 }), 30);
  const inertSource = "globalThis.compromised = true";
  assert.equal(evaluateExpression(inertSource, {}), inertSource);
  assert.equal(globalThis.compromised, undefined);
  assert.throws(() => evaluateExpression({ op: "call", fn: "alert" }, {}), { code: "UNSUPPORTED_OPERATOR" });
  assert.throws(() => evaluateExpression({ op: "add", a: 1, b: "2" }, {}), { code: "EXPRESSION_TYPE_ERROR" });
  assert.throws(() => evaluateExpression({ op: "divide", a: 1, b: 0 }, {}), { code: "EXPRESSION_DIVIDE_BY_ZERO" });
  assert.throws(() => evaluateExpression({ op: "lookup", object: { ref: "data" }, key: "constructor" }, { data: {} }), { code: "UNSAFE_LOOKUP_KEY" });
  let getterCalled = false;
  const accessorExpression = Object.defineProperty({}, "op", { get() { getterCalled = true; return "add"; } });
  assert.throws(() => evaluateExpression(accessorExpression, {}), { code: "UNSAFE_EXPRESSION" });
  assert.equal(getterCalled, false);
  let coerced = false;
  const hostileOperator = { toString() { coerced = true; return "add"; } };
  assert.throws(() => evaluateExpression({ op: hostileOperator, a: 1, b: 2 }, {}), { code: "UNSUPPORTED_OPERATOR" });
  assert.equal(coerced, false);
  let deep = 1;
  for (let index = 0; index < 34; index += 1) deep = { op: "add", a: deep, b: 1 };
  assert.throws(() => evaluateExpression(deep, {}), { code: "EXPRESSION_LIMIT_EXCEEDED" });
});

test("INT-04 computes derived dependencies topologically and rolls back cycles or failed transactions", async () => {
  const { createReactiveStore } = await loadStateApi();
  const store = createReactiveStore({
    initialState: {
      first: { type: "number", value: 2, min: 0, max: 10 },
      second: { type: "number", value: 3, min: 0, max: 10 },
    },
    derived: {
      doubled: { op: "multiply", a: { ref: "sum" }, b: 2 },
      sum: { op: "add", a: { ref: "first" }, b: { ref: "second" } },
    },
  });
  assert.equal(store.get("doubled"), 10);
  const notifications = [];
  store.subscribe("doubled", (value) => notifications.push(value));
  notifications.length = 0;
  store.set("first", 4);
  assert.deepEqual(notifications, [14]);

  store.transaction((draft) => {
    draft.set("first", 5);
    assert.equal(draft.get("doubled"), 16);
    draft.set("second", 6);
    assert.equal(draft.get("doubled"), 22);
  });
  assert.equal(store.get("doubled"), 22);
  assert.deepEqual(notifications, [14, 22]);

  assert.throws(() => store.transaction((draft) => {
    draft.set("first", 7);
    draft.set("second", 20);
  }), { code: "STATE_VALUE_OUT_OF_RANGE" });
  assert.equal(store.get("first"), 5);
  assert.equal(store.get("second"), 6);
  assert.equal(store.get("doubled"), 22);
  assert.deepEqual(notifications, [14, 22]);

  assert.throws(() => createReactiveStore({
    initialState: { seed: { type: "number", value: 1 } },
    derived: { left: { ref: "right" }, right: { ref: "left" } },
  }), { code: "DERIVED_CYCLE" });

  const isolated = createReactiveStore({
    initialState: {
      numerator: { type: "number", value: 10 },
      divisor: { type: "number", value: 2 },
      unrelated: { type: "number", value: 0 },
    },
    derived: { ratio: { op: "divide", a: { ref: "numerator" }, b: { ref: "divisor" } } },
  });
  isolated.set("unrelated", 1);
  assert.equal(isolated.get("ratio"), 5);
  assert.throws(() => isolated.set("divisor", 0), { code: "EXPRESSION_DIVIDE_BY_ZERO" });
  assert.equal(isolated.get("divisor"), 2);
  assert.equal(isolated.get("ratio"), 5);
});

test("INT-05 synchronously binds one slider value to text, metric and visualization consumers", async () => {
  const { bindArticleBlocks, createActionDispatcher, createReactiveStore } = await loadStateApi();
  const article = reactiveArticle();
  const store = createReactiveStore(article);
  const updates = [];
  const binding = bindArticleBlocks(article, store, (update) => updates.push(update));
  const initialBindings = updates.filter((update) => ["temp-text", "temp-metric", "temp-plot"].includes(update.blockId));
  assert.deepEqual(initialBindings.map(({ blockId, property, value }) => [blockId, property, value]), [
    ["temp-text", "text", 25],
    ["temp-metric", "value", 25],
    ["temp-plot", "highlightValue", 25],
  ]);

  const before = updates.length;
  const dispatcher = createActionDispatcher({ article, store });
  dispatcher.dispatchEvent("temp-slider", "change", { value: 55 });
  const changedBindings = updates.slice(before).map(({ blockId, property, value }) => [blockId, property, value]);

  assert.deepEqual(changedBindings, [
    ["temp-slider", "value", 55],
    ["temp-text", "text", 55],
    ["temp-metric", "value", 55],
    ["temp-plot", "highlightValue", 55],
  ]);
  assert.equal(store.get("phase"), "liquid");
  binding.dispose();
});

test("INT-06 models idle, loading, ready, empty, error and retry without implicit external fetch", async () => {
  const { createAsyncResource } = await loadStateApi();
  let externalCalls = 0;
  const external = createAsyncResource({
    requiresConsent: true,
    loader: async () => { externalCalls += 1; return ["result"]; },
  });
  assert.equal(external.getSnapshot().status, "idle");
  await assert.rejects(external.load(), { code: "EXTERNAL_CONSENT_REQUIRED" });
  assert.equal(externalCalls, 0);
  assert.equal(external.getSnapshot().status, "idle");
  const pending = external.load({ consent: true });
  assert.equal(external.getSnapshot().status, "loading");
  assert.deepEqual(await pending, { status: "ready", data: ["result"], error: null, attempt: 1 });
  assert.equal(externalCalls, 1);

  let defaultCalls = 0;
  const defaultGated = createAsyncResource({ loader: async () => { defaultCalls += 1; return "network"; } });
  await assert.rejects(defaultGated.load(), { code: "EXTERNAL_CONSENT_REQUIRED" });
  assert.equal(defaultCalls, 0);

  let attempts = 0;
  const retryable = createAsyncResource({ requiresConsent: false, loader: async () => {
    attempts += 1;
    if (attempts === 1) throw new Error("offline");
    return [];
  } });
  const statuses = [];
  retryable.subscribe((snapshot) => statuses.push(snapshot.status));
  assert.equal((await retryable.load()).status, "error");
  assert.equal(retryable.getSnapshot().status, "error");
  assert.equal((await retryable.retry()).status, "empty");
  assert.equal(retryable.getSnapshot().attempt, 2);
  assert.deepEqual(statuses, ["idle", "loading", "error", "loading", "empty"]);
  await external.dispose();
  await defaultGated.dispose();
  await retryable.dispose();
});

test("INT-07 disposes binding subscriptions and aborts stale resource work", async () => {
  const { bindArticleBlocks, createAsyncResource, createReactiveStore } = await loadStateApi();
  const article = reactiveArticle();
  const store = createReactiveStore(article);
  let firstUpdates = 0;
  let secondUpdates = 0;
  const first = bindArticleBlocks(article, store, () => { firstUpdates += 1; });
  const second = bindArticleBlocks(article, store, () => { secondUpdates += 1; });
  first.dispose();
  const firstBefore = firstUpdates;
  const secondBefore = secondUpdates;
  store.set("tempC", 35);
  assert.equal(firstUpdates, firstBefore);
  assert.equal(secondUpdates - secondBefore, 4);
  second.dispose();
  const disposedCount = secondUpdates;
  store.set("tempC", 40);
  assert.equal(secondUpdates, disposedCount);

  let finish;
  let receivedSignal;
  const resource = createAsyncResource({ requiresConsent: false, loader: ({ signal }) => {
    receivedSignal = signal;
    return new Promise((resolve) => { finish = resolve; });
  } });
  const statuses = [];
  resource.subscribe((snapshot) => statuses.push(snapshot.status));
  const loading = resource.load();
  assert.equal(receivedSignal.aborted, false);
  await resource.dispose();
  assert.equal(receivedSignal.aborted, true);
  finish(["late"]);
  await loading;
  assert.deepEqual(statuses, ["idle", "loading"]);

  const starts = [];
  let replacement;
  const racing = createAsyncResource({ requiresConsent: false, loader: ({ attempt }) => {
    starts.push(attempt);
    return `attempt-${attempt}`;
  } });
  racing.subscribe((snapshot) => {
    if (snapshot.status === "loading" && snapshot.attempt === 1) replacement = racing.load();
  });
  const superseded = racing.load();
  await Promise.all([superseded, replacement]);
  assert.deepEqual(starts, [2]);
  assert.equal(racing.getSnapshot().data, "attempt-2");
  await racing.dispose();
});
