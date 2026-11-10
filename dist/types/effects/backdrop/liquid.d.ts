import { type LiquidOptions } from "../options";
export interface LiquidHandle {
    stop: () => void;
    /** Applies new settings and colors. */
    update: (options: LiquidOptions) => void;
}
/** Starts the liquid on `canvas` (already in the document). Returns its handle, or null without WebGL2. */
export declare function startLiquid(canvas: HTMLCanvasElement, options?: LiquidOptions): LiquidHandle | null;
