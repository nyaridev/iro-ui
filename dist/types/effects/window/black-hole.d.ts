import type { BlackHoleOptions, EffectOptions } from "../options";
/** Breaks `node` into particles that spiral into a black hole at its center; it stays hidden (`opacity: 0`) until an
 *  open effect. */
export declare function closeBlackHole(node: HTMLElement, options?: BlackHoleOptions): Promise<void>;
/** Brings a hidden `node` back out of a black hole: it unfurls out of the spot, turning back from the spin and coming
 *  into focus. Shown elements are left as they are; `node` needs a position for the rim. */
export declare function openBlackHole(node: HTMLElement, options?: EffectOptions): Promise<void>;
