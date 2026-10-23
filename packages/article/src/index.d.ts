export type ArticleSeverity = "error" | "warning";
export type ArticleIssue = {
  code: string;
  path: string;
  severity: ArticleSeverity;
  message: string;
  fixHint: string;
  location?: { line: number; column: number };
};
export type ArticleSourceLocation = { line: number; column: number };
export type ArticleValidationResult<T> =
  | { ok: true; value: T; sourceMap?: Record<string, ArticleSourceLocation> }
  | { ok: false; errors: ArticleIssue[]; sourceMap?: Record<string, ArticleSourceLocation> };
export type ArticleValidationOptions = {
  /** Exact HTTPS origins explicitly approved by the embedding host. External assets also require SRI metadata. */
  allowedAssetOrigins?: string[];
};
export type ArticleCaptionTrack = { assetId: string; locale: string; label: string; kind?: "captions" | "subtitles" };
export type ArticleAsset = {
  id: string; url: string; type: string; alt: string; license: string; provenance: string;
  decorative?: boolean; integrity?: string; captions?: Record<string, string>; captionTracks?: ArticleCaptionTrack[];
  durationSeconds?: number; width?: number; height?: number;
};
export type ArticleSource = {
  id: string; title: string; author?: string; publisher?: string; url?: string; license?: string;
  publishedAt?: string; accessedAt?: string;
};
export type ArticleHotspot = { id: string; label: string; description: string; x: number; y: number };
export type ArticleFigureProps = { assetId: string; caption?: string; transcript?: string; hotspots?: ArticleHotspot[] };
export type ArticleMediaProps = { assetId: string; caption?: string; transcript?: string };
export type ArticleCitationProps = { sourceId?: string; note?: string; title?: string; url?: string };
export type ArticleMathProps = { display?: "block" | "inline" };
export type ArticleCodeProps = { language?: string };
export type ArticleWidgetScalar = string | number | boolean | null;
export type ArticleWidgetOptionValue = string | number | boolean;
export type SmartTableColumn = { id?: string; key?: string; label: string; type?: "string" | "number" | "date" };
export type SmartTableFilter = { columnId: string; label?: string; options: Array<{ value: ArticleWidgetOptionValue; label?: string }> };
export type SmartTableProps = {
  caption?: string; columns: SmartTableColumn[]; rows: Array<Record<string, ArticleWidgetScalar>>;
  pageSize?: number; filters?: SmartTableFilter[]; searchLabel?: string; exportLabel?: string; filename?: string;
};
export type WidgetValidation = {
  required?: boolean; type?: "string" | "text" | "number" | "integer" | "enum" | "boolean" | "date" | "email";
  min?: number; max?: number; minLength?: number; maxLength?: number; values?: ArticleWidgetOptionValue[];
};
export type CalculatorInput = { variable: string; label: string; min?: number; max?: number; step?: number };
export type CalculatorProps = {
  label?: string; resultLabel?: string; unit?: string; inputs: CalculatorInput[]; expression: Record<string, unknown>;
  resultMin?: number; resultMax?: number;
};
export type ComparisonPanel = { label: string; value?: ArticleWidgetScalar; unit?: string };
export type ComparisonProps = {
  label?: string; mode?: "side-by-side" | "overlay"; left: ComparisonPanel; right: ComparisonPanel;
  position?: number; positionLabel?: string;
};
export type DataFilterProps = { label?: string; options: Array<{ value: ArticleWidgetOptionValue; label: string }> };
export type KnowledgeMapNode = {
  id: string; label: string; summary?: string; articleRef?: string; openLabel?: string; x?: number; y?: number;
};
export type KnowledgeMapEdge = { id?: string; source: string; target: string; label?: string };
export type KnowledgeMapProps = {
  title?: string; description?: string; layout?: "auto" | "layered" | "grid" | "radial";
  nodes: KnowledgeMapNode[]; edges?: KnowledgeMapEdge[]; pan?: boolean; zoom?: boolean; pinchZoom?: boolean;
  minimap?: boolean; interactive?: boolean; controlsLabel?: string; fitLabel?: string;
};
export type ScientificBlockType = "simulator2d" | "model3d" | "map" | "mathGraph" | "physicsExperiment" | "chemistry" | "anatomy" | "animationTimeline";
export type ProjectileScienceProps = { label?: string; description: string; kind: "projectile"; speed: number; angleDeg: number; gravity: number; durationSeconds?: number };
export type ScientificMesh = { format: "intuiforge.mesh.v1"; vertices: Array<[number, number, number]>; faces: Array<[number, number, number]> };
export type Model3DProps = { label?: string; description: string; model?: ScientificMesh; modelId?: string };
export type GeographicPoint = [longitude: number, latitude: number];
export type ScientificMapProps = { label?: string; description: string; mapId?: string; bounds: { west: number; south: number; east: number; north: number }; layers: Array<{ id: string; label: string; visible?: boolean; features: Array<{ type: "Point" | "LineString" | "Polygon"; coordinates: unknown }> }>; markers: Array<{ id: string; label: string; coordinates: GeographicPoint; description?: string }> };
export type MathGraphProps = { label?: string; description: string; formula: string; xMin: number; xMax: number; xUnit: string; yUnit: string; samples?: number };
export type ChemistryProps = { label?: string; description: string; formula: string; atoms: Array<{ id: string; element: string; label?: string; x: number; y: number }>; bonds: Array<{ source: string; target: string; order?: 1 | 2 | 3 }> };
export type AnatomyShape = { type: "circle"; cx: number; cy: number; r: number } | { type: "ellipse"; cx: number; cy: number; rx: number; ry: number } | { type: "rect"; x: number; y: number; width: number; height: number } | { type: "polygon"; points: Array<[number, number]> };
export type AnatomyProps = { label?: string; description: string; viewBox: { width: number; height: number }; parts: Array<{ id: string; label: string; description: string; parentId?: string; shape: AnatomyShape }> };
export type AnimationTimelineProps = { label?: string; description: string; durationMs: number; frames: Array<{ id: string; label: string; timeMs: number; value: string | number | boolean | null }> };
export type ArticleBlock = {
  id: string;
  type: string;
  content?: string;
  props?: Record<string, unknown>;
  /** RichViz data paths may bind as data.series.0.values.0; engine/schema paths stay immutable. */
  bindings?: Record<string, string>;
  events?: Record<string, unknown>;
  children?: ArticleBlock[];
};
export type PortableArticle = {
  kind: "intui.article";
  schemaVersion: "1.0.0";
  id: string;
  locale: string;
  dir: "ltr" | "rtl";
  title: string;
  summary: string;
  metadata: {
    status: "draft" | "published";
    contentType: string;
    sources: ArticleSource[];
    canonicalReferences: string[];
    supportedLocales: string[];
    provenance: Array<Record<string, unknown>>;
  };
  assets: ArticleAsset[];
  initialState: Record<string, unknown>;
  derived: Record<string, unknown>;
  sections: Array<{ id: string; heading: string; blocks: ArticleBlock[] }>;
};
export declare const ARTICLE_KIND: "intui.article";
export declare const ARTICLE_SCHEMA_VERSION: "1.0.0";
export declare const ARTICLE_BLOCK_TYPES: readonly string[];
export declare const ARTICLE_V1_SCHEMA: Record<string, unknown>;
export declare const ARTICLE_JSON_VALUE_SCHEMA: Record<string, unknown>;
export declare function validateArticle(input: string | unknown, options?: ArticleValidationOptions): ArticleValidationResult<PortableArticle>;
export declare function parseArticleSource(input: string | unknown, options?: ArticleValidationOptions): ArticleValidationResult<PortableArticle>;
export declare function migrateArticle(input: string | unknown, options?: ArticleValidationOptions): ArticleValidationResult<PortableArticle>;
