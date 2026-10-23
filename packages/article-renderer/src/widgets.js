import { evaluateExpression } from "../../state/src/index.js";

const MAX_WIDGET_ROWS = 10_000;
const MAX_WIDGET_COLUMNS = 100;
const DEFAULT_PAGE_SIZE = 10;
const FORMULA_PREFIX = /^[\t\r\n ]*[=+\-@]/;
const SAFE_SCALAR = (value) => value === null || typeof value === "string" || typeof value === "boolean" || (typeof value === "number" && Number.isFinite(value));

function compareCell(left, right, type) {
  if (type === "number") {
    const a = Number(left);
    const b = Number(right);
    if (Number.isFinite(a) && Number.isFinite(b)) return a - b;
  }
  return String(left ?? "").localeCompare(String(right ?? ""), "en", { numeric: true, sensitivity: "base" });
}

/** Preserve the frozen v1 `key` column spelling while using one renderer shape. */
export function normalizeSmartTableColumns(columns) {
  if (!Array.isArray(columns)) return [];
  return columns.map((column) => ({
    ...column,
    id: column?.id ?? column?.key,
    label: column?.label ?? column?.title ?? column?.id ?? column?.key,
  }));
}

/** Derive a bounded, stable smart-table view without mutating article data. */
export function deriveSmartTableView({ columns, rows, search = "", filters = {}, sortBy = null, sortDirection = "asc", page = 1, pageSize = DEFAULT_PAGE_SIZE } = {}) {
  if (!Array.isArray(columns) || columns.length === 0 || columns.length > MAX_WIDGET_COLUMNS) throw new TypeError("Smart tables require 1–100 declared columns.");
  if (!Array.isArray(rows) || rows.length > MAX_WIDGET_ROWS) throw new TypeError("Smart tables require at most 10,000 rows.");
  if (!filters || typeof filters !== "object" || Array.isArray(filters)) throw new TypeError("Smart-table filters must be a plain object.");
  if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) throw new RangeError("Smart-table page size must be between 1 and 100.");
  if (!Number.isInteger(page) || page < 1) page = 1;
  columns = normalizeSmartTableColumns(columns);
  if (!columns.some((column) => column?.id === sortBy) || sortDirection !== "asc" && sortDirection !== "desc") sortBy = null;

  const normalizedSearch = String(search ?? "").trim().toLocaleLowerCase();
  const filterEntries = Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== "" && value !== "all");
  let indexed = rows.map((row, index) => ({ row, index })).filter(({ row }) => row && typeof row === "object" && !Array.isArray(row));
  if (normalizedSearch) {
    indexed = indexed.filter(({ row }) => columns.some((column) => String(row[column.id] ?? "").toLocaleLowerCase().includes(normalizedSearch)));
  }
  for (const [columnId, selected] of filterEntries) {
    if (!columns.some((column) => column.id === columnId)) continue;
    indexed = indexed.filter(({ row }) => Object.is(row[columnId], selected) || String(row[columnId] ?? "") === String(selected));
  }
  if (sortBy) {
    const column = columns.find((candidate) => candidate.id === sortBy);
    const direction = sortDirection === "desc" ? -1 : 1;
    indexed.sort((left, right) => direction * compareCell(left.row[sortBy], right.row[sortBy], column.type) || left.index - right.index);
  }
  const totalRows = indexed.length;
  const pageCount = Math.max(1, Math.ceil(totalRows / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;
  return Object.freeze({
    rows: Object.freeze(indexed.slice(start, start + pageSize).map(({ row }) => row)),
    totalRows,
    page: currentPage,
    pageCount,
    pageSize,
    sortBy,
    sortDirection,
  });
}

function csvCell(value) {
  let cell = value === null || value === undefined ? "" : String(value);
  if (typeof value === "string" && FORMULA_PREFIX.test(cell)) cell = `'${cell}`;
  return /[",\r\n]/.test(cell) ? `"${cell.replace(/"/g, '""')}"` : cell;
}

/** Create deterministic CSV with Excel formula injection protection. */
export function encodeCsv(columns, rows) {
  if (!Array.isArray(columns) || columns.length === 0 || columns.length > MAX_WIDGET_COLUMNS || !Array.isArray(rows) || rows.length > MAX_WIDGET_ROWS) throw new TypeError("CSV export requires 1–100 columns and at most 10,000 rows.");
  columns = normalizeSmartTableColumns(columns);
  if (rows.some((row) => !row || typeof row !== "object" || Array.isArray(row) || columns.some((column) => row[column.id] !== undefined && !SAFE_SCALAR(row[column.id])))) throw new TypeError("CSV export requires record rows with scalar cells.");
  const header = columns.map((column) => csvCell(column?.label ?? column?.id ?? "")).join(",");
  const body = rows.map((row) => columns.map((column) => csvCell(row?.[column.id])).join(","));
  return [header, ...body].join("\r\n");
}

/** Validate/normalize a control value using declarative constraints only. */
export function validateWidgetValue(rawValue, rules = {}) {
  const type = rules.type ?? "string";
  const blank = rawValue === undefined || rawValue === null || typeof rawValue === "string" && rawValue.trim() === "";
  if (rules.required === true && blank) return { valid: false, value: null, error: "required" };
  if (blank) return { valid: true, value: null, error: null };

  let value = rawValue;
  if (type === "number" || type === "integer") {
    value = typeof rawValue === "number" ? rawValue : Number(rawValue);
    if (!Number.isFinite(value)) return { valid: false, value: null, error: "type" };
    if (type === "integer" && !Number.isInteger(value)) return { valid: false, value, error: "integer" };
    if (rules.min !== undefined && value < rules.min) return { valid: false, value, error: "min" };
    if (rules.max !== undefined && value > rules.max) return { valid: false, value, error: "max" };
    return { valid: true, value, error: null };
  }
  if (type === "boolean") {
    if (typeof rawValue === "boolean") return { valid: true, value: rawValue, error: null };
    if (rawValue === "true") return { valid: true, value: true, error: null };
    if (rawValue === "false") return { valid: true, value: false, error: null };
    return { valid: false, value: null, error: "type" };
  }
  if (type === "enum") {
    const values = Array.isArray(rules.values) ? rules.values : [];
    const selected = values.find((candidate) => Object.is(candidate, rawValue) || String(candidate) === String(rawValue));
    return selected === undefined ? { valid: false, value: null, error: "enum" } : { valid: true, value: selected, error: null };
  }
  if (!new Set(["string", "text", "email", "date"]).has(type)) return { valid: false, value: null, error: "type" };
  value = String(rawValue);
  if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return { valid: false, value, error: "type" };
  if (type === "date") {
    const parsed = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00.000Z`) : null;
    if (!parsed || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) return { valid: false, value, error: "type" };
  }
  if (rules.minLength !== undefined && value.length < rules.minLength) return { valid: false, value, error: "minLength" };
  if (rules.maxLength !== undefined && value.length > rules.maxLength) return { valid: false, value, error: "maxLength" };
  return { valid: true, value, error: null };
}

/** Evaluate a calculator AST through the existing bounded P04 interpreter. */
export function evaluateCalculator(expression, scope = {}, { min, max } = {}) {
  try {
    const value = evaluateExpression(expression, scope);
    if (typeof value !== "number" || !Number.isFinite(value)) return { valid: false, value: null, error: "result-type" };
    if (min !== undefined && value < min) return { valid: false, value, error: "result-min" };
    if (max !== undefined && value > max) return { valid: false, value, error: "result-max" };
    return { valid: true, value, error: null };
  } catch (error) {
    return { valid: false, value: null, error: typeof error?.code === "string" ? error.code : "expression" };
  }
}

/** Apply an explicit data filter; `all` and an empty selection preserve every row. */
export function matchesWidgetFilter(value, selected) {
  if (selected === undefined || selected === null || selected === "" || selected === "all") return true;
  return Object.is(value, selected) || String(value ?? "") === String(selected);
}

/** Normalize comparison presentation and bound overlay position to 0..100. */
export function buildComparisonModel({ mode = "side-by-side", left, right, position = 50 } = {}) {
  if (!["side-by-side", "overlay"].includes(mode)) return { valid: false, mode, left, right, position: null, error: "mode" };
  const validPanel = (panel) => panel && typeof panel === "object" && typeof panel.label === "string" && panel.label.trim() && SAFE_SCALAR(panel.value);
  if (!validPanel(left) || !validPanel(right)) return { valid: false, mode, left, right, position: null, error: "panel" };
  if (typeof position !== "number" || !Number.isFinite(position)) return { valid: false, mode, left, right, position: null, error: "position" };
  return { valid: true, mode, left: { label: left.label, value: left.value }, right: { label: right.label, value: right.value }, position: Math.max(0, Math.min(100, position)), error: null };
}
