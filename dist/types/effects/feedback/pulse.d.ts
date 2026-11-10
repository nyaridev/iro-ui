import { type PulseOptions } from "../options";
/** Keyframe parts for light on `node`'s rim in `color`: a glow (added to its own shadows) and a ring outline. */
export declare function rimLight(node: HTMLElement, color: string, strength?: number): {
    /** The glow around the rim, `blur` px soft and spread `spread` px, at `alpha`. */
    glow: (blur: number, spread: number, alpha: number) => string;
    /** The ring, `width` px thick and `gap` px out from the edge, at `alpha`. */
    ring: (width: number, gap: number, alpha: number) => {
        outline: string;
        outlineOffset: string;
    };
};
/** Pulses a glowing ring out of `node`'s edge; resolves when the last pulse has faded. */
export declare function pulse(node: HTMLElement, options?: PulseOptions): Promise<void>;
