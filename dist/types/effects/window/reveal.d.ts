import type { EffectOptions } from "../options";
/** The SVG filter that warps the content like liquid: its id, and the displacement whose `scale` sets how much. */
export declare function liquidWarp(): {
    id: string;
    displacement: SVGFEDisplacementMapElement | null;
};
/** Adds the glowing rim inside `node`'s opening circle (`--reveal-r` and `--reveal-glow` set it). */
export declare function ring(node: HTMLElement): void;
/** Opens a hidden `node` from its center. Shown elements are left as they are; `node` needs a position for the
 *  rim. */
export declare function openReveal(node: HTMLElement, options?: EffectOptions): Promise<void>;
/** Closes `node` into its center; it stays hidden (`opacity: 0`) until an open effect. */
export declare function closeReveal(node: HTMLElement, options?: EffectOptions): Promise<void>;
