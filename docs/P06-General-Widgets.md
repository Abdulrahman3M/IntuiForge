# P06 — General Widgets

P06 extends the central, host-independent P05 article renderer with safe declarative widgets. All examples remain ordinary `intui.article` v1 blocks: they do not require a CMS, framework, network data service, or article-authored JavaScript. Values are rendered as text, and interactions use the existing bounded state, expression, and action contracts.

## Data tables

`smartTable` accepts 1–100 columns, up to 10,000 record rows, a `pageSize` from 1–100, and up to 32 declared filters. New articles may use `{ "id": "score", "label": "Score", "type": "number" }`. The frozen v1 example spelling `{ "key": "score", "label": "Score", "type": "number" }` remains accepted and is normalized internally. `type` may be `string`, `number`, or `date`. Rows are records whose property names match column IDs/keys.

```json
{
  "type": "smartTable",
  "props": {
    "caption": "Results",
    "columns": [{ "key": "name", "label": "Name" }, { "key": "score", "label": "Score", "type": "number" }],
    "rows": [{ "name": "Sample A", "score": 40 }, { "name": "Sample B", "score": 75 }],
    "pageSize": 10,
    "filters": [{ "columnId": "score", "label": "Score", "options": [{ "value": 40, "label": "40" }] }]
  }
}
```

Tables provide text search across declared columns, sortable header buttons, declared-value filters, bounded pagination and CSV export. Export is offered as `text/csv;charset=utf-8`, has a host callback option (`onExport`) or browser download fallback, and prefixes formula-like string cells to reduce spreadsheet formula injection risk. Static output shows the complete escaped table without interactive controls.

## Inputs, filters, calculations, comparisons

- `input`, `select`, and `slider` bind through `bindings.value`. `input` uses `props.inputType` (`text`, `number`, `date`, or `email`) and declarative constraints such as `required`, `min`, `max`, `minLength`, `maxLength`, or a `props.validation` object containing only the same supported constraint fields. Select options are primitive values or `{value,label}` records. Runtime controls receive unique stable HTML `id` and `name` attributes; validation errors are connected to the control and announced with `role="alert"`; invalid input does not change state.
- `calculator` declares 1–20 numeric `props.inputs` that reference numeric/integer `initialState`, a safe expression AST in `props.expression`, optional result bounds, and optional `resultLabel`/`unit`. It uses P04's deterministic expression interpreter; no expression strings, functions, or `eval` are accepted.
- `comparison` uses `props.mode: "side-by-side" | "overlay"`, labeled `props.left` and `props.right` records, and optional `bindings.left`, `bindings.right`, and `bindings.position`. Overlay position is bounded to 0–100 and has an accessible range control. Side-by-side panels stack on narrow screens.
- `filter` binds `bindings.value` to a declared state variable and lists scalar `{value,label}` options. Any metrics, derived expressions, conditionals, or visualization-adapter bindings that reference that same state update together through P04. This is in-article state, not a host callback or remote filtering service.

Example calculator expression:

```json
{
  "type": "calculator",
  "props": {
    "label": "Cost",
    "inputs": [{ "variable": "quantity", "label": "Quantity", "min": 0, "max": 100 }],
    "expression": { "op": "multiply", "a": { "ref": "quantity" }, "b": 4 },
    "resultMin": 0,
    "unit": "USD"
  }
}
```

## Interaction and stateful content

- Buttons continue to use only the P04 action allowlist. `openDialog`/`closeDialog` target the stable ID of a declared `dialog` block. The renderer uses the native modal `<dialog>` element, including native Escape behavior, and gives it an accessible title.
- `menu` uses native `<details>/<summary>` disclosure semantics and supports keyboard activation. `tooltip` uses a focusable button, `aria-describedby`, and a `role="tooltip"` description that is shown on hover or keyboard focus.
- `card` is a semantic group. If `bindings.selected` is supplied, it points to declared article state; the card's stable block ID becomes the selected value and a button exposes `aria-pressed`.
- `tabs` remain a `tablist` with arrow/Home/End keyboard navigation and `bindings.selected` may point to an enum whose values are panel IDs. `accordion` uses native disclosure semantics and may bind `open` to a declared boolean.
- Static output includes meaningful tables, current initial/derived values, calculator results, comparison panels, filter labels, menu/card/dialog content, and open disclosures. It is readable without JavaScript; it does not claim to hydrate into interactive controls.

All widgets inherit the article renderer's Shadow DOM/style isolation, P03 tokens, text escaping, RTL/LTR direction, dark/light themes, reduced-motion support, and print styling. Run `npm run test:p06` for focused automated checks. The matching browser fixture is `tests/browser/p06.html`; actual responsive/theme/keyboard checks require the verified dedicated AI Edge session.
