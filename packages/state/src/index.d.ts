export type StateScalar = string | number | boolean;
export type StateDefinition = {
  type: "number" | "integer" | "string" | "boolean" | "enum";
  value: StateScalar;
  min?: number;
  max?: number;
  step?: number;
  minLength?: number;
  maxLength?: number;
  values?: readonly (string | number)[];
  persistence?: "none" | "session" | "host";
};
export type ArticleStateSource = {
  initialState: Record<string, StateDefinition>;
  derived?: Record<string, unknown>;
  sections?: Array<{ blocks: Array<Record<string, unknown>> }>;
};
export type ReactiveSnapshot = Readonly<Record<string, StateScalar>>;
export type ReactiveStore = {
  get(name: string): StateScalar;
  getState(): Readonly<Record<string, StateScalar>>;
  getSnapshot(): ReactiveSnapshot;
  getDefinition(name: string): Readonly<StateDefinition> | undefined;
  set(name: string, value: StateScalar): StateScalar;
  transaction<T>(mutator: (draft: { get(name: string): StateScalar; set(name: string, value: StateScalar): StateScalar }) => T): T;
  subscribe<T = StateScalar>(selector: string | ((snapshot: ReactiveSnapshot) => T), listener: (value: T, previous: T | undefined) => void, equals?: (previous: T, next: T) => boolean): () => boolean;
  dispose(): void;
};
export declare class ReactiveStateError extends Error { code: string; }
export declare function evaluateExpression(expression: unknown, scope?: Readonly<Record<string, unknown>> | Map<string, unknown>): unknown;
export declare function createReactiveStore(article: ArticleStateSource, options?: { onSubscriberError?: (error: AggregateError) => void }): ReactiveStore;
export type DeclarativeAction = { action: string; [key: string]: unknown };
export type ActionContext = { event: Readonly<Record<string, unknown>>; store: ReactiveStore };
export declare function createActionDispatcher(options: {
  store: ReactiveStore;
  article?: ArticleStateSource;
  handlers?: Partial<Record<"filter" | "submit" | "navigate" | "scroll" | "expand" | "media" | "dialog" | "activity" | "progress", (action: Readonly<DeclarativeAction>, context: ActionContext) => unknown>>;
}): {
  dispatch(action: DeclarativeAction, event?: Readonly<Record<string, unknown>>): unknown;
  dispatchEvent(blockId: string, eventName: string, event?: Readonly<Record<string, unknown>>): unknown;
};
export declare function bindArticleBlocks(article: ArticleStateSource, store: ReactiveStore, onUpdate: (update: Readonly<{ blockId: string; blockType: string; property: string; value: StateScalar }>) => void): { dispose(): boolean };
export type ResourceSnapshot<T> = Readonly<{ status: "idle" | "loading" | "ready" | "empty" | "error"; data: T | null; error: Readonly<{ code: string }> | null; attempt: number }>;
export declare function createAsyncResource<T>(options: {
  loader: (context: Readonly<{ signal: AbortSignal; attempt: number }>) => Promise<T> | T;
  requiresConsent?: boolean;
  isEmpty?: (data: T) => boolean;
  onSubscriberError?: (error: AggregateError) => void;
}): {
  getSnapshot(): ResourceSnapshot<T>;
  load(options?: { consent?: boolean }): Promise<ResourceSnapshot<T>>;
  retry(options?: { consent?: boolean }): Promise<ResourceSnapshot<T>>;
  subscribe(listener: (snapshot: ResourceSnapshot<T>) => void): () => boolean;
  dispose(): void;
};
export type LearningActivityProgress = Readonly<{
  status: "not-started" | "in-progress" | "complete";
  selectedId: string | null;
  score: number | null;
  maximumScore: number | null;
  reviewedCardIds: readonly string[];
}>;
export type LearningProgressSnapshot = Readonly<{
  sessionOnly: true;
  completedCount: number;
  totalCount: number;
  activities: Readonly<Record<string, LearningActivityProgress>>;
}>;
export type LearningProgressInitialState = Readonly<Record<string, Partial<LearningActivityProgress>>>;
export declare function createLearningProgress(activityIds?: readonly string[], options?: { initialState?: LearningProgressInitialState }): Readonly<{
  getSnapshot(): LearningProgressSnapshot;
  setSelection(activityId: string, selectedId: string): boolean;
  markCardReviewed(activityId: string, cardId: string): boolean;
  setScore(activityId: string, score: number, maximumScore: number): boolean;
  complete(activityId: string): boolean;
  reset(activityId: string): boolean;
  subscribe(listener: (snapshot: LearningProgressSnapshot) => void): () => boolean;
  dispose(): void;
}>;
