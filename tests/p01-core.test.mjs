import test from "node:test";
import assert from "node:assert/strict";
import { createIntuiEngine, ENGINE_API_VERSION, EngineError, renderErrorFallback } from "@intuiforge/engine/v1";
import { mountReactIsland } from "@intuiforge/engine/react-island";
import { registerRichVizAdapter, RICHVIZ_VERSION, RichViz } from "@intuiforge/engine/richviz";

class FakeNode {
  constructor(tagName = "div") {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.attributes = new Map();
    this.dataset = {};
    this.listeners = new Map();
    this.textContent = "";
    this.classNames = new Set();
    this.classList = { add: (name) => this.classNames.add(name), contains: (name) => this.classNames.has(name) };
  }

  append(...nodes) {
    for (const node of nodes) {
      node.parentNode?.removeChild(node);
      node.parentNode = this;
      this.children.push(node);
    }
  }

  appendChild(node) { this.append(node); return node; }

  removeChild(node) {
    const index = this.children.indexOf(node);
    if (index >= 0) this.children.splice(index, 1);
    node.parentNode = null;
    return node;
  }

  replaceChildren(...nodes) {
    for (const child of [...this.children]) this.removeChild(child);
    this.append(...nodes);
  }

  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  removeAttribute(name) { this.attributes.delete(name); }

  addEventListener(type, listener, options = {}) {
    if (options.signal?.aborted) return;
    const listeners = this.listeners.get(type) ?? new Set();
    listeners.add(listener);
    this.listeners.set(type, listeners);
    options.signal?.addEventListener("abort", () => this.removeEventListener(type, listener), { once: true });
  }

  removeEventListener(type, listener) { this.listeners.get(type)?.delete(listener); }
  listenerCount(type) { return this.listeners.get(type)?.size ?? 0; }
  dispatchEvent(event) { for (const listener of this.listeners.get(event.type) ?? []) listener.call(this, event); }
  remove() { this.parentNode?.removeChild(this); }

  attachShadow() {
    this.shadowRoot = new FakeNode("#shadow-root");
    return this.shadowRoot;
  }
}

class FakeDocument {
  createElement(tagName) { return new FakeNode(tagName); }
}

const validArticle = (input) => ({ ok: true, value: input });

function addDefaultRenderer(engine, render, id = "test.renderer") {
  return engine.registerRenderer({
    id,
    version: "1.0.0",
    capabilities: ["article", "test"],
    default: true,
    render,
  });
}

test("CORE-05 exports a versioned, dependency-injected public contract", async () => {
  assert.equal(ENGINE_API_VERSION, 1);
  const engine = createIntuiEngine({ validateArticle: validArticle });
  assert.equal(typeof engine.mount, "function");
  assert.equal(typeof engine.registerComponent, "function");
  assert.equal(typeof engine.registerRenderer, "function");
  assert.equal(typeof engine.registerAdapter, "function");
  assert.deepEqual(engine.validateArticle({ title: "smoke" }), { ok: true, value: { title: "smoke" } });
  await engine.dispose();
});

test("CORE-01 mount, update, refresh, and dispose abort listeners and dispose each renderer", async () => {
  const engine = createIntuiEngine({ validateArticle: validArticle });
  const mountedButtons = [];
  const renderValues = [];
  let disposeCount = 0;
  addDefaultRenderer(engine, (container, article, context) => {
    const button = new FakeNode("button");
    button.addEventListener("click", () => {}, { signal: context.signal });
    mountedButtons.push(button);
    renderValues.push(article.value);
    container.append(button);
    return { dispose() { disposeCount += 1; } };
  });

  const container = new FakeNode("main");
  const handle = engine.mount(container, { value: "first" }, { document: new FakeDocument(), lang: "en" });
  assert.equal((await handle.ready).status, "ready");
  assert.equal(mountedButtons[0].listenerCount("click"), 1);

  assert.equal((await handle.refresh()).status, "ready");
  assert.equal(mountedButtons[0].listenerCount("click"), 0);
  assert.equal(disposeCount, 1);
  assert.equal((await handle.update({ value: "second" })).status, "ready");
  assert.deepEqual(renderValues, ["first", "first", "second"]);
  assert.equal(mountedButtons[1].listenerCount("click"), 0);
  assert.equal(disposeCount, 2);

  await handle.dispose();
  assert.equal(disposeCount, 3);
  assert.equal(container.children.length, 0);
  assert.equal(handle.state, "disposed");
  await engine.dispose();
});

test("CORE-02 validates stable extension metadata, rejects duplicates, and unregisters idempotently", async () => {
  const engine = createIntuiEngine({ validateArticle: validArticle });
  const registration = {
    id: "org.example.cards",
    version: "1.2.3",
    capabilities: ["cards", "rtl"],
    render(container, props) { container.textContent = props.label; },
  };
  const unregister = engine.registerComponent(registration);
  assert.deepEqual(engine.getCapabilities().components, [{ id: registration.id, version: registration.version, capabilities: ["cards", "rtl"] }]);
  assert.throws(() => engine.registerComponent(registration), (error) => error instanceof EngineError && error.code === "DUPLICATE_REGISTRATION");
  assert.throws(() => engine.registerComponent({ ...registration, id: "Bad ID" }), (error) => error.code === "INVALID_REGISTRATION");
  assert.throws(() => engine.registerComponent({ ...registration, id: "org.example.bad-prerelease", version: "1.2.3-01" }), (error) => error.code === "INVALID_REGISTRATION");
  const prereleaseUnregister = engine.registerComponent({ ...registration, id: "org.example.valid-prerelease", version: "1.2.3-alpha.1+build.5" });
  assert.equal(prereleaseUnregister(), true);
  engine.registerRenderer({
    id: "org.example.component-host",
    version: "1.0.0",
    capabilities: ["component-dispatch"],
    default: true,
    render(container, props, context) { return context.getComponent(registration.id).render(container, props); },
  });
  const container = new FakeNode("div");
  const handle = engine.mount(container, { label: "registered extension rendered" }, { document: new FakeDocument() });
  assert.equal((await handle.ready).status, "ready");
  assert.equal(container.textContent, "registered extension rendered");
  await handle.dispose();
  assert.equal(unregister(), true);
  assert.equal(unregister(), false);
  assert.deepEqual(engine.getCapabilities().components, []);
  await engine.dispose();
});

test("CORE-03 renderers consume adapters only through the isolated adapter registry", async () => {
  const engine = createIntuiEngine({ validateArticle: validArticle });
  let adapterCalls = 0;
  engine.registerAdapter({
    id: "org.example.vendor",
    version: "2.1.0",
    capabilities: ["diagram"],
    render(container, value) { adapterCalls += 1; container.textContent = value.title; return { dispose() {} }; },
  });
  addDefaultRenderer(engine, (container, article, context) => context.getAdapter("org.example.vendor").render(container, article));

  const container = new FakeNode("div");
  const handle = engine.mount(container, { title: "host-neutral" }, { document: new FakeDocument() });
  assert.equal((await handle.ready).status, "ready");
  assert.equal(adapterCalls, 1);
  assert.equal(container.textContent, "host-neutral");
  assert.deepEqual(engine.getCapabilities().adapters, [{ id: "org.example.vendor", version: "2.1.0", capabilities: ["diagram"] }]);
  await handle.dispose();
  await engine.dispose();
});

test("CORE-04 optional React content mounts and unmounts only inside its island", () => {
  const document = new FakeDocument();
  const container = new FakeNode("article");
  const hostContent = new FakeNode("p");
  container.append(hostContent);
  let rootsCreated = 0;
  let unmounts = 0;
  const root = mountReactIsland(container, { component: "ComplexWidget" }, (island) => {
    rootsCreated += 1;
    assert.equal(island.parentNode, container);
    return { render(element) { this.element = element; }, unmount() { unmounts += 1; } };
  }, { document });

  assert.equal(rootsCreated, 1);
  assert.equal(container.children.length, 2);
  assert.equal(container.children[0], hostContent);
  assert.equal(root.island.getAttribute("data-intui-react-island"), "");
  assert.deepEqual(root.currentElement, { component: "ComplexWidget" });
  root.update({ component: "UpdatedWidget" });
  assert.deepEqual(root.currentElement, { component: "UpdatedWidget" });
  root.dispose();
  assert.equal(unmounts, 1);
  assert.equal(container.children.length, 1);
  assert.equal(container.children[0], hostContent);
});

test("CORE-06 renderer and validation failures show safe localized fallbacks without escaping", async () => {
  const engine = createIntuiEngine({
    validateArticle: () => ({ ok: true, value: {} }),
  });
  addDefaultRenderer(engine, () => { throw new Error("sensitive internal detail"); });
  const parent = new FakeNode("body");
  const unrelatedHostContent = new FakeNode("nav");
  const container = new FakeNode("main");
  parent.append(unrelatedHostContent, container);
  let reported;
  const handle = engine.mount(container, {}, {
    document: new FakeDocument(),
    lang: "ar",
    onError(error) { reported = error; throw new Error("observer failure must not escape"); },
  });

  assert.equal((await handle.ready).status, "error");
  assert.equal(parent.children[0], unrelatedHostContent);
  const fallbackHost = container.children[0];
  const panel = fallbackHost.shadowRoot.children.find((node) => node.tagName === "SECTION");
  assert.equal(panel.getAttribute("role"), "alert");
  assert.equal(panel.getAttribute("dir"), "rtl");
  assert.match(panel.children[0].textContent, /تعذّر عرض/);
  assert.doesNotMatch(panel.children.map((node) => node.textContent).join(" "), /sensitive internal detail/);
  assert.equal(reported.code, "RENDERER_FAILED");

  const english = new FakeNode("div");
  const standaloneFallback = renderErrorFallback(english, new Error("secret"), { document: new FakeDocument(), lang: "en" });
  const englishPanel = standaloneFallback.shadowRoot.children.find((node) => node.tagName === "SECTION");
  assert.equal(englishPanel.getAttribute("dir"), "ltr");
  assert.match(englishPanel.children[0].textContent, /interactive content/i);
  assert.doesNotMatch(englishPanel.children.map((node) => node.textContent).join(" "), /secret/);
  await handle.dispose();
  await engine.dispose();
});

test("CORE-05 RichViz compatibility imports the real 0.5.0 package without API loss", async () => {
  const stepGuide = {
    version: 1,
    type: "step-guide",
    title: "Compatibility smoke",
    description: "A small RichViz compatibility fixture.",
    data: { steps: [{ title: "One", text: "First step" }] },
  };
  assert.equal(RICHVIZ_VERSION, "0.5.0");
  assert.equal(RichViz.types.length, 14);
  assert.equal(typeof RichViz.validate, "function");
  assert.equal(typeof RichViz.render, "function");
  assert.equal(RichViz.validate(JSON.stringify(stepGuide)).ok, true);
  assert.throws(() => RichViz.render({}, "{not-json"), (error) => Array.isArray(error.errors) && error.errors.length > 0);
  const engine = createIntuiEngine({ validateArticle: validArticle });
  const unregister = registerRichVizAdapter(engine);
  assert.equal(engine.getCapabilities().adapters.some((adapter) => adapter.id === "org.intuiforge.richviz" && adapter.version === "0.5.0"), true);
  assert.equal(typeof unregister, "function");
  unregister();
  await engine.dispose();
});
