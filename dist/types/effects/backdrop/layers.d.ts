import type { BackdropOptions } from "../options";
import type { Layer, Setting } from "./glsl/layer";
import type { PointerTrack } from "./pointer";
/** Each layer, in drawing order. */
declare const LAYERS: {
    mesh: Layer;
    ink: Layer;
    paper: Layer;
    contours: Layer;
    aurora: Layer;
    dust: Layer;
    grid: Layer;
    spotlight: Layer;
};
export type LayerName = keyof typeof LAYERS;
export interface LayersHandle {
    stop: () => void;
    /** Applies new settings and colors to the same layers, without recompiling. */
    update: (options: BackdropOptions) => void;
}
/** Every layer's name, in drawing order. */
export declare const LAYER_NAMES: LayerName[];
/** Each layer's settings with their defaults and ranges, for building controls (the Lab's tuner). */
export declare const LAYER_SETTINGS: Record<LayerName, Record<string, Setting>>;
/** Starts the layers `options` turns on, on `canvas` (already in the document). Returns its handle, or null without
 *  WebGL2. */
export declare function startLayers(canvas: HTMLCanvasElement, options: BackdropOptions, pointer?: PointerTrack): LayersHandle | null;
export {};
