export type ReactRoot = { render(element: unknown): void; unmount(): void };
export declare function mountReactIsland<T>(container: Element, element: T, createRoot: (island: Element) => ReactRoot, options?: { document?: Document }): {
  readonly island: Element;
  readonly currentElement: T;
  update(nextElement: T): void;
  dispose(): void;
};
