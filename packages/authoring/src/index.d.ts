import type { ArticleIssue, ArticleValidationOptions, ArticleValidationResult, PortableArticle } from "../../article/src/index.js";

export type ArticleTemplateKind = "article" | "quiz" | "map" | "science";
export type ArticleTemplate = Readonly<{ id: string; kind: ArticleTemplateKind; label: string; article: PortableArticle }>;
export type ArticlePackageFormat = "json" | "markdown";
export type ExportedArticlePackage = Readonly<{
  format: ArticlePackageFormat;
  filename: string;
  mimeType: "application/json;charset=utf-8" | "text/markdown;charset=utf-8";
  content: string;
  article: PortableArticle;
}>;
export type ArticlePackageExportResult = { ok: true; value: ExportedArticlePackage } | { ok: false; errors: ArticleIssue[] };
export type ArticleAuthoringSession = Readonly<{
  getDraft(): PortableArticle;
  getPublished(): PortableArticle | null;
  readonly canUndo: boolean;
  readonly canRedo: boolean;
  validate(): ArticleValidationResult<PortableArticle>;
  update(next: unknown): ArticleValidationResult<PortableArticle>;
  undo(): boolean;
  redo(): boolean;
  publish(): ArticleValidationResult<PortableArticle>;
}>;
export type ArticleStudioOptions = {
  article: unknown;
  document?: Document;
  theme?: "light" | "dark" | "system";
  cspNonce?: string;
  onExport?: (bundle: ExportedArticlePackage) => void | Promise<void>;
};
export type ArticleStudioHandle = Readonly<{
  ready: Promise<boolean>;
  readonly draft: PortableArticle;
  readonly published: PortableArticle | null;
  readonly validation: ArticleValidationResult<PortableArticle>;
  readonly rendererId: "org.intuiforge.article";
  dispose(): Promise<void>;
}>;

export declare const ARTICLE_TEMPLATES: readonly ArticleTemplate[];
export declare const ARTICLE_BLOCK_TYPES: readonly string[];
export declare class ArticleAuthoringError extends Error {
  readonly code: string;
  readonly issues: ArticleIssue[];
}
export declare function createArticlePrompt(options?: { request?: string; locale?: string }): string;
export declare function importArticlePackage(source: string | unknown, options?: ArticleValidationOptions): ArticleValidationResult<PortableArticle>;
export declare function exportArticlePackage(input: string | unknown, options?: { format?: ArticlePackageFormat }): ArticlePackageExportResult;
export declare function createArticleFromTemplate(templateId: string, options?: { articleId?: string; title?: string; locale?: string; dir?: "ltr" | "rtl" }): ArticleValidationResult<PortableArticle>;
export declare function createAuthoringSession(input: string | unknown, options?: { maxHistory?: number }): ArticleAuthoringSession;
export declare function mountArticleAuthoringStudio(container: HTMLElement, options: ArticleStudioOptions): ArticleStudioHandle;
