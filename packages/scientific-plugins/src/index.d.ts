import type { Registration } from "../../core/src/index.js";

export type ScientificIssue = { code: string; path: string; message: string; fixHint: string };
export type ScientificBlock = { type: string; content?: string; props?: Record<string, unknown> };
export type ProjectileParameters = { speed: number; angleDeg: number; gravity: number; durationSeconds: number; samples?: number };
export type ScientificMesh = { format: "intuiforge.mesh.v1"; vertices: number[][]; faces: number[][] };
export type GeographicBounds = { west: number; south: number; east: number; north: number };
export declare const SCIENTIFIC_COMPONENT_IDS: readonly string[];
export declare function registerScientificPlugins(engine: { registerComponent(component: Registration): () => boolean }): () => boolean;
export declare function validateScientificBlock(block: ScientificBlock): ScientificIssue[];
export declare function parseScientificFormula(source: string): Readonly<Record<string, unknown>>;
export declare function evaluateScientificFormula(astOrSource: string | Record<string, unknown>, x: number): number;
export declare function sampleScientificFunction(source: string, minimum: number, maximum: number, sampleCount?: number): Array<{ x: number; y: number | null }>;
export declare function simulateProjectile(parameters: ProjectileParameters): Array<{ time: number; x: number; y: number }>;
export declare function interpolateTimeline(frames: Array<{ timeMs: number; value: unknown }>, timeMs: number): unknown;
export declare function projectMesh(model: ScientificMesh, camera?: { yaw?: number; pitch?: number; scale?: number; width?: number; height?: number }): Array<Array<{ x: number; y: number; depth: number }>>;
export declare function projectGeoPoint(coordinates: [number, number], bounds: GeographicBounds): Readonly<{ x: number; y: number }>;
export declare function flattenAnatomy(parts: Array<Record<string, unknown>>): Array<{ id: string; label: string; description: string; depth: number }>;
