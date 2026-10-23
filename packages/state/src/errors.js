export class ReactiveStateError extends Error {
  constructor(code, message, { cause } = {}) {
    super(message, cause === undefined ? undefined : { cause });
    this.name = "ReactiveStateError";
    this.code = code;
  }
}

export function stateError(code, message, options) {
  return new ReactiveStateError(code, message, options);
}
