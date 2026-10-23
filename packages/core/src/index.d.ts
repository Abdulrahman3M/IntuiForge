export type EngineIssue = { code: string; message: string; path?: string };
export type ValidationResult<T> = { ok: true; value: T } | { ok: false; errors: EngineIssue[] };
export type Registration = {
  id: string;
  version: string;
  capabilities: string[];
  render(container: Element, input: unknown, context: RenderContext): unknown;
  default?: boolean;
};
export type RenderContext = {
  apiVersion: number;
  lang: string;
  dir: "ltr" | "rtl";
  signal: AbortSignal;
  environment: Readonly<Record<string, unknown>>;
  getComponent(id: string): Registration | undefined;
  getAdapter(id: string): Registration | undefined;
};
export type MountResult = { status: "ready" | "error" | "disposed" | "superseded"; code?: string };
export type HostProgressLoadRequest = { articleId: string; activityIds: readonly string[]; signal?: AbortSignal };
export type HostProgressSaveRequest = {
  articleId: string;
  action: Readonly<Record<string, unknown>>;
  progress: Readonly<Record<string, unknown>>;
  store?: unknown;
  context?: Readonly<Record<string, unknown>>;
  signal?: AbortSignal;
};
export type HostProgressCapability = {
  load?: (request: HostProgressLoadRequest) => { activities: Readonly<Record<string, unknown>> } | Promise<{ activities: Readonly<Record<string, unknown>> }>;
  save?: (request: HostProgressSaveRequest) => unknown | Promise<unknown>;
};
export type HostEnvironment = {
  lang?: string;
  dir?: "ltr" | "rtl";
  /** Host-supplied CSP nonce applied to runtime-created style elements. */
  cspNonce?: string;
  theme?: "light" | "dark" | "system";
  themeTokens?: Record<string, string>;
  rendererId?: string;
  onNavigate?: (route: string, context: Readonly<Record<string, unknown>>) => unknown;
  resolveAsset?: (assetId: string, asset: Readonly<Record<string, unknown>>) => string | undefined;
  onFilter?: (action: Readonly<Record<string, unknown>>, context: Readonly<Record<string, unknown>>) => unknown;
  onSubmitQuiz?: (action: Readonly<Record<string, unknown>>, context: Readonly<Record<string, unknown>>) => unknown;
  onMedia?: (action: Readonly<Record<string, unknown>>, context: Readonly<Record<string, unknown>>) => unknown;
  onDialog?: (action: Readonly<Record<string, unknown>>, context: Readonly<Record<string, unknown>>) => unknown;
  onActivity?: (action: Readonly<Record<string, unknown>>, context: Readonly<Record<string, unknown>>) => unknown;
  onProgress?: (action: Readonly<Record<string, unknown>>, context: Readonly<Record<string, unknown>>) => unknown;
  /** Explicit host-owned user progress storage; never backed by ambient browser storage. */
  progress?: HostProgressCapability;
  onError?: (error: EngineError, phase: string) => void;
};
export type IntuiHandle = {
  readonly ready: Promise<MountResult>;
  readonly state: string;
  update(input: unknown): Promise<MountResult>;
  refresh(): Promise<MountResult>;
  dispose(): Promise<void>;
};
export declare const ENGINE_API_VERSION: 1;
export declare class EngineError extends Error { code: string; issues: EngineIssue[]; }
export declare function createIntuiEngine(options?: { validateArticle?: (input: unknown) => ValidationResult<unknown> | Promise<ValidationResult<unknown>> }): {
  validateArticle(input: unknown): ValidationResult<unknown> | Promise<ValidationResult<unknown>>;
  mount(container: Element, input: unknown, environment?: HostEnvironment): IntuiHandle;
  registerComponent(registration: Registration): () => boolean;
  registerRenderer(registration: Registration): () => boolean;
  registerAdapter(registration: Registration): () => boolean;
  getCapabilities(): { apiVersion: number; components: unknown[]; renderers: unknown[]; adapters: unknown[] };
  dispose(): Promise<void>;
};
export declare function renderErrorFallback(container: Element, error: unknown, options?: { lang?: string; dir?: "ltr"; cspNonce?: string }): Element;
