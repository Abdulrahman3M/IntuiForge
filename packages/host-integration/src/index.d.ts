import type { HostEnvironment, MountResult, Registration, ValidationResult } from "../../core/src/index.js";
import type { PortableArticle } from "../../article/src/index.js";

export type HostMountHandle = {
  readonly ready: Promise<MountResult>;
  readonly state: string;
  update(input: string | PortableArticle | unknown): Promise<MountResult>;
  refresh(): Promise<MountResult>;
  updateEnvironment(patch: Partial<HostEnvironment>): Promise<MountResult>;
  dispose(): Promise<void>;
};
export type ProgressActivityRecord = Readonly<{
  status: "not-started" | "in-progress" | "complete";
  selectedId: string | null;
  score: number | null;
  maximumScore: number | null;
  reviewedCardIds: readonly string[];
}>;
export type ProgressStorageOptions = {
  /** Stable host-owned identifier. Prefer an opaque ID over a name or email address. */
  userId: string;
  read(key: string, options?: { signal?: AbortSignal }): string | null | undefined | Promise<string | null | undefined>;
  write(key: string, value: string, options?: { signal?: AbortSignal }): unknown | Promise<unknown>;
};
export type ProgressPersistenceAdapter = {
  load(input: { articleId: string; activityIds: readonly string[]; signal?: AbortSignal }): Promise<{ activities: Readonly<Record<string, ProgressActivityRecord>> }>;
  save(input: { articleId: string; action: Readonly<Record<string, unknown>>; progress: Readonly<Record<string, unknown>>; signal?: AbortSignal }): Promise<{ status: "saved"; scope: "activity" | "article"; activityCount: number }>;
};
export type IntuiHostOptions = {
  validateArticle?: (input: unknown) => ValidationResult<unknown> | Promise<ValidationResult<unknown>>;
  hostEnvironment?: HostEnvironment;
  rendererOptions?: { theme?: "light" | "dark" | "system"; themeTokens?: Record<string, string> };
};
export declare function createProgressPersistenceAdapter(options: ProgressStorageOptions): ProgressPersistenceAdapter;
export declare function createIntuiHost(options?: IntuiHostOptions): {
  validateArticle(input: unknown): ValidationResult<unknown> | Promise<ValidationResult<unknown>>;
  mount(container: Element, input: string | PortableArticle | unknown, environment?: HostEnvironment): HostMountHandle;
  registerComponent(registration: Registration): () => boolean;
  registerRenderer(registration: Registration): () => boolean;
  registerAdapter(registration: Registration): () => boolean;
  getCapabilities(): { apiVersion: number; components: unknown[]; renderers: unknown[]; adapters: unknown[] };
  dispose(): Promise<void>;
};
export declare function mountIntuiArticle(container: Element, input: string | PortableArticle | unknown, options?: IntuiHostOptions & { environment?: HostEnvironment }): HostMountHandle;
