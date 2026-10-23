export type ThemeMode = "light" | "dark" | "system";
export type DesignColors = Readonly<{
  canvas: string;
  surface: string;
  raised: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  accentText: string;
  focus: string;
  series: readonly [string, string, string, string];
}>;
export type HostThemeTokens = Partial<Pick<DesignColors, "canvas" | "surface" | "raised" | "text" | "muted" | "border" | "accent" | "accentText" | "focus">>;
export type NormalizedHostThemeTokens = Readonly<Partial<Record<
  "--if-host-canvas" | "--if-host-surface" | "--if-host-raised" | "--if-host-text" | "--if-host-muted" | "--if-host-border" | "--if-host-accent" | "--if-host-accent-text" | "--if-host-focus",
  string
>>>;
export type GalleryOptions = {
  theme?: ThemeMode;
  locale?: string;
  lang?: string;
  dir?: "ltr" | "rtl";
  hostTokens?: HostThemeTokens;
  document?: Document;
};
export type DesignReferenceGallery = {
  readonly element: HTMLElement;
  readonly shadowRoot: ShadowRoot;
  readonly theme: ThemeMode;
  readonly locale: "ar" | "en";
  readonly dir: "ltr" | "rtl";
  update(options?: GalleryOptions): void;
  dispose(): void;
};
export declare const DESIGN_TOKENS: Readonly<{
  color: Readonly<{ light: DesignColors; dark: DesignColors }>;
  typography: Readonly<{ minimumArticlePx: 16; fontSans: string; fontDisplay: string; baseSize: string; leadSize: string; displaySize: string; articleLineHeight: number; readingMeasure: string }>;
  spacing: Readonly<Record<1 | 2 | 3 | 4 | 6 | 8 | 12 | 16, string>>;
  radius: Readonly<Record<"control" | "surface" | "feature" | "pill", string>>;
  elevation: Readonly<Record<"surface" | "floating", string>>;
  layout: Readonly<Record<"reading" | "gallery" | "rail", string>>;
  motion: Readonly<Record<"quick" | "standard", string>>;
}>;
export declare const DESIGN_SYSTEM_CSS: string;
export declare function createDesignSystemStyles(options?: { theme?: ThemeMode }): string;
export declare function normalizeHostThemeTokens(tokens?: HostThemeTokens): NormalizedHostThemeTokens;
export declare function resolveTheme(theme?: ThemeMode): ThemeMode;
export declare function createPremiumShowcaseModel(): Readonly<{ version: "1.0"; scenes: readonly Readonly<{ id: string; title: string; locale: string; dir: "ltr" | "rtl"; controls: readonly string[]; }>[]; states: readonly string[]; claims: Readonly<{ proprietaryParity: false; legacyHtmlStyleReference: false; }>; }>;
export declare function mountPremiumShowcase(container: Element, options?: { document?: Document; theme?: ThemeMode; cspNonce?: string }): { readonly element: Element; readonly shadowRoot: ShadowRoot; readonly model: ReturnType<typeof createPremiumShowcaseModel>; update(next?: { theme?: ThemeMode }): void; dispose(): void; };
export declare function mountDesignReferenceGallery(container: HTMLElement, options?: GalleryOptions): DesignReferenceGallery;
