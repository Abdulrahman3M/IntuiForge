import type { EngineError } from "../../core/src/index.js";

export type RichVizValidationResult = {
  ok: boolean;
  spec: unknown | null;
  errors: Array<{ path?: string; message: string }>;
  warnings: Array<{ path?: string; message: string }>;
};
export type RichVizHandle = {
  readonly ready: Promise<void>;
  refresh(): Promise<void>;
  dispose(): void;
};
export declare const RICHVIZ_VERSION: "0.5.0";
export declare const RichViz: Readonly<{
  validate(source: string): RichVizValidationResult;
  render(container: string | Element, spec: string | unknown, options?: Record<string, unknown>): RichVizHandle;
  types: readonly string[];
}>;
export declare function registerRichVizAdapter(engine: {
  registerAdapter(registration: {
    id: string;
    version: string;
    capabilities: string[];
    render(container: Element, spec: unknown, options?: Record<string, unknown>): RichVizHandle;
  }): () => boolean;
}): () => boolean;
