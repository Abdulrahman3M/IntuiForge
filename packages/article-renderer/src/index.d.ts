import type { PortableArticle } from "../../article/src/index.js";
import type { Registration } from "../../core/src/index.js";

export type ArticleRendererOptions = {
  theme?: "light" | "dark" | "system";
  default?: boolean;
  themeTokens?: Record<string, string>;
  cspNonce?: string;
  onExport?: (payload: ArticleCsvExport) => void;
  handlers?: Record<string, (action: Readonly<Record<string, unknown>>, context: Readonly<Record<string, unknown>>) => unknown>;
};
export type ArticleCsvExport = Readonly<{
  blockId: string;
  filename: string;
  mimeType: "text/csv;charset=utf-8";
  content: string;
}>;
export declare function createArticleRenderer(options?: ArticleRendererOptions): Registration;
export declare function registerArticleRenderer(engine: { registerRenderer(registration: Registration): () => boolean }, options?: ArticleRendererOptions): () => boolean;
export declare function renderArticleStatic(article: PortableArticle | string | unknown, options?: Pick<ArticleRendererOptions, "theme">): string;
export type QuizGrade = Readonly<{
  score: number;
  maximumScore: number;
  correctCount: number;
  results: readonly Readonly<{ id: string; correct: boolean; earnedPoints: number; maximumPoints: number; explanation: string }>[];
}>;
export declare function gradeQuiz(questions: readonly Record<string, unknown>[], answers: Readonly<Record<string, unknown>>): QuizGrade;
