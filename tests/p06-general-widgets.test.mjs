import assert from "node:assert/strict";
import test from "node:test";
import {
  buildComparisonModel,
  deriveSmartTableView,
  encodeCsv,
  evaluateCalculator,
  matchesWidgetFilter,
  validateWidgetValue,
} from "../packages/article-renderer/src/widgets.js";

const columns = [
  { id: "name", label: "Name", type: "string" },
  { id: "score", label: "Score", type: "number" },
  { id: "group", label: "Group", type: "string" },
];
const rows = [
  { id: "a", name: "Amber", score: 12, group: "active" },
  { id: "b", name: "Basil", score: 8, group: "paused" },
  { id: "c", name: "Cedar", score: 21, group: "active" },
  { id: "d", name: "Dahlia", score: 17, group: "active" },
];

test("WGT-01 derives a stable searchable, filtered, sortable and paged table view without mutating source rows", () => {
  const view = deriveSmartTableView({
    columns, rows, search: "a", filters: { group: "active" },
    sortBy: "score", sortDirection: "desc", page: 2, pageSize: 1,
  });
  assert.deepEqual(view.rows.map((row) => row.id), ["d"]);
  assert.equal(view.totalRows, 3);
  assert.equal(view.page, 2);
  assert.equal(view.pageCount, 3);
  assert.deepEqual(rows.map((row) => row.id), ["a", "b", "c", "d"]);
});

test("WGT-01 exports accessible table data as quoted CSV and neutralizes formula cells", () => {
  const csv = encodeCsv(columns.slice(0, 2), [
    { name: "A, \"B\"", score: 12 },
    { name: "=HYPERLINK(\"https://bad\")", score: -2 },
  ]);
  assert.equal(csv, 'Name,Score\r\n"A, ""B""",12\r\n"\'=HYPERLINK(""https://bad"")",-2');
});

test("WGT-02 validates required, numeric bounds, lengths and declared options", () => {
  assert.deepEqual(validateWidgetValue("18", { type: "number", required: true, min: 10, max: 20 }), { valid: true, value: 18, error: null });
  assert.equal(validateWidgetValue("22", { type: "number", min: 10, max: 20 }).error, "max");
  assert.equal(validateWidgetValue("  ", { type: "string", required: true }).error, "required");
  assert.equal(validateWidgetValue("x", { type: "string", minLength: 2 }).error, "minLength");
  assert.deepEqual(validateWidgetValue("active", { type: "enum", values: ["active", "paused"] }), { valid: true, value: "active", error: null });
  assert.equal(validateWidgetValue("unknown", { type: "enum", values: ["active", "paused"] }).error, "enum");
});

test("WGT-02 validates email and calendar-date formats rather than trusting input types", () => {
  assert.equal(validateWidgetValue("person@example.test", { type: "email", required: true }).valid, true);
  assert.equal(validateWidgetValue("person@invalid", { type: "email" }).error, "type");
  assert.equal(validateWidgetValue("2024-02-29", { type: "date" }).valid, true);
  assert.equal(validateWidgetValue("2025-02-29", { type: "date" }).error, "type");
});

test("WGT-03 evaluates only bounded deterministic expressions and reports invalid math", () => {
  const expression = { op: "add", a: { ref: "quantity" }, b: { op: "multiply", a: { ref: "unitCost" }, b: 2 } };
  assert.deepEqual(evaluateCalculator(expression, { quantity: 3, unitCost: 4 }, { min: 0, max: 20 }), { valid: true, value: 11, error: null });
  assert.equal(evaluateCalculator({ op: "divide", a: 5, b: 0 }, {}).error, "EXPRESSION_DIVIDE_BY_ZERO");
  assert.equal(evaluateCalculator({ op: "multiply", a: 10, b: 10 }, {}, { min: 0, max: 50 }).error, "result-max");
  assert.equal(evaluateCalculator({ op: "exec", source: "1+1" }, {}).valid, false);
});

test("WGT-04 normalizes supported comparison mode and bounds overlay position", () => {
  assert.deepEqual(buildComparisonModel({
    mode: "overlay", left: { label: "Before", value: 2 }, right: { label: "After", value: 4 }, position: 140,
  }), { valid: true, mode: "overlay", left: { label: "Before", value: 2 }, right: { label: "After", value: 4 }, position: 100, error: null });
  assert.equal(buildComparisonModel({ mode: "sideways", left: {}, right: {} }).error, "mode");
});

test("WGT-06 applies all/empty/exact filter states predictably", () => {
  assert.equal(matchesWidgetFilter("active", "all"), true);
  assert.equal(matchesWidgetFilter("active", "active"), true);
  assert.equal(matchesWidgetFilter("active", "paused"), false);
  assert.equal(matchesWidgetFilter(null, null), true);
});
