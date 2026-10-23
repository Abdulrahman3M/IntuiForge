export class EngineError extends Error {
  constructor(code, message, { cause, issues = [] } = {}) {
    super(message, cause === undefined ? undefined : { cause });
    this.name = "EngineError";
    this.code = code;
    this.issues = Array.isArray(issues) ? issues : [];
  }
}
