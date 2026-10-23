const MAX_FORMULA_LENGTH = 256;
const MAX_TOKENS = 128;
const MAX_DEPTH = 24;
const MAX_SAMPLES = 512;

const UNARY_FUNCTIONS = new Set(["sin", "cos", "tan", "asin", "acos", "atan", "sqrt", "abs", "exp", "ln", "log"]);
const BINARY_FUNCTIONS = new Set(["min", "max"]);

function freezeTree(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const child of Object.values(value)) freezeTree(child);
  return Object.freeze(value);
}

function tokenize(source) {
  if (typeof source !== "string" || source.length < 1 || source.length > MAX_FORMULA_LENGTH) throw new TypeError("Formula must be non-empty text no longer than 256 characters.");
  const tokens = [];
  let offset = 0;
  while (offset < source.length) {
    const tail = source.slice(offset);
    const whitespace = /^\s+/.exec(tail);
    if (whitespace) { offset += whitespace[0].length; continue; }
    const number = /^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/.exec(tail);
    if (number) {
      const value = Number(number[0]);
      if (!Number.isFinite(value)) throw new TypeError("Formula contains a non-finite number.");
      tokens.push({ type: "number", value }); offset += number[0].length;
    } else {
      const identifier = /^[A-Za-z]+/.exec(tail);
      if (identifier) { tokens.push({ type: "identifier", value: identifier[0].toLowerCase() }); offset += identifier[0].length; }
      else if ("+-*/^(),".includes(source[offset])) { tokens.push({ type: source[offset], value: source[offset] }); offset += 1; }
      else throw new TypeError("Formula contains an unsupported token.");
    }
    if (tokens.length > MAX_TOKENS) throw new TypeError("Formula exceeds the 128-token limit.");
  }
  tokens.push({ type: "eof", value: "" });
  return tokens;
}

/** Parse a bounded arithmetic expression; no JavaScript, property access, or dynamic calls are accepted. */
export function parseScientificFormula(source) {
  const tokens = tokenize(source);
  let position = 0;
  let depth = 0;
  const peek = () => tokens[position];
  const take = (type) => {
    if (peek().type !== type) throw new TypeError("Formula syntax is invalid.");
    return tokens[position++];
  };

  function primary() {
    depth += 1;
    if (depth > MAX_DEPTH) throw new TypeError("Formula nesting exceeds the 24-level limit.");
    let node;
    const token = peek();
    if (token.type === "number") { position += 1; node = { type: "number", value: token.value }; }
    else if (token.type === "+" || token.type === "-") { position += 1; node = { type: "unary", op: token.type, value: primary() }; }
    else if (token.type === "(") { position += 1; node = expression(0); take(")"); }
    else if (token.type === "identifier") {
      position += 1;
      if (token.value === "x" || token.value === "pi" || token.value === "e") node = { type: "variable", name: token.value };
      else if (UNARY_FUNCTIONS.has(token.value) || BINARY_FUNCTIONS.has(token.value)) {
        take("(");
        const args = [expression(0)];
        if (peek().type === ",") { position += 1; args.push(expression(0)); }
        take(")");
        const expected = BINARY_FUNCTIONS.has(token.value) ? 2 : 1;
        if (args.length !== expected) throw new TypeError("Formula function has the wrong number of arguments.");
        node = { type: "call", name: token.value, args };
      } else throw new TypeError("Formula uses a function or identifier that is not allowed.");
    } else throw new TypeError("Formula is missing a value.");
    depth -= 1;
    return node;
  }

  function expression(minimumPrecedence) {
    let left = primary();
    while (true) {
      const operator = peek().type;
      const precedence = operator === "+" || operator === "-" ? 1 : operator === "*" || operator === "/" ? 2 : operator === "^" ? 3 : -1;
      if (precedence < minimumPrecedence) break;
      position += 1;
      const right = expression(operator === "^" ? precedence : precedence + 1);
      left = { type: "binary", op: operator, left, right };
    }
    return left;
  }

  const ast = expression(0);
  if (peek().type !== "eof") throw new TypeError("Formula has unexpected trailing input.");
  return freezeTree(ast);
}

function validateAst(root) {
  let count = 0;
  const seen = new WeakSet();
  function visit(node, depth) {
    if (!node || typeof node !== "object" || Array.isArray(node) || Object.getPrototypeOf(node) !== Object.prototype || seen.has(node)) throw new TypeError("Formula AST is invalid.");
    if (depth > MAX_DEPTH || ++count > MAX_TOKENS) throw new TypeError("Formula AST exceeds its resource limit.");
    seen.add(node);
    if (node.type === "number" && Number.isFinite(node.value)) return;
    if (node.type === "variable" && ["x", "pi", "e"].includes(node.name)) return;
    if (node.type === "unary" && ["+", "-"].includes(node.op)) { visit(node.value, depth + 1); return; }
    if (node.type === "binary" && ["+", "-", "*", "/", "^"].includes(node.op)) { visit(node.left, depth + 1); visit(node.right, depth + 1); return; }
    if (node.type === "call" && (UNARY_FUNCTIONS.has(node.name) || BINARY_FUNCTIONS.has(node.name)) && Array.isArray(node.args) && node.args.length === (BINARY_FUNCTIONS.has(node.name) ? 2 : 1)) { node.args.forEach((arg) => visit(arg, depth + 1)); return; }
    throw new TypeError("Formula AST contains an unsupported operation.");
  }
  visit(root, 0);
}

/** Evaluate only an AST produced by the allowlisted parser and reject non-finite results. */
export function evaluateScientificFormula(astOrSource, x) {
  const ast = typeof astOrSource === "string" ? parseScientificFormula(astOrSource) : astOrSource;
  if (!Number.isFinite(x)) throw new TypeError("Formula input must be finite.");
  validateAst(ast);
  function evaluate(node) {
    if (node.type === "number") return node.value;
    if (node.type === "variable") return node.name === "x" ? x : node.name === "pi" ? Math.PI : Math.E;
    if (node.type === "unary") return node.op === "-" ? -evaluate(node.value) : evaluate(node.value);
    if (node.type === "binary") {
      const left = evaluate(node.left); const right = evaluate(node.right);
      if (node.op === "+") return left + right;
      if (node.op === "-") return left - right;
      if (node.op === "*") return left * right;
      if (node.op === "/") { if (right === 0) throw new RangeError("Formula result must be finite."); return left / right; }
      return left ** right;
    }
    const values = node.args.map(evaluate);
    const functions = { sin: Math.sin, cos: Math.cos, tan: Math.tan, asin: Math.asin, acos: Math.acos, atan: Math.atan, sqrt: Math.sqrt, abs: Math.abs, exp: Math.exp, ln: Math.log, log: Math.log, min: Math.min, max: Math.max };
    return functions[node.name](...values);
  }
  const result = evaluate(ast);
  if (!Number.isFinite(result)) throw new RangeError("Formula result must be finite.");
  return result;
}

/** Produce stable inclusive graph samples with a hard maximum; undefined points are explicit gaps. */
export function sampleScientificFunction(source, minimum, maximum, sampleCount = 128) {
  if (!Number.isFinite(minimum) || !Number.isFinite(maximum) || minimum >= maximum) throw new RangeError("Graph bounds must be finite and increasing.");
  if (!Number.isInteger(sampleCount) || sampleCount < 2 || sampleCount > MAX_SAMPLES) throw new RangeError("Graph sample count must be between 2 and 512.");
  const ast = parseScientificFormula(source);
  return Array.from({ length: sampleCount }, (_, index) => {
    const x = minimum + (maximum - minimum) * index / (sampleCount - 1);
    let y = null;
    try { y = evaluateScientificFormula(ast, x); } catch { /* Domain errors are graph gaps, never rendering failures. */ }
    return Object.freeze({ x, y });
  });
}
