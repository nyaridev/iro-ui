import type { EffectOptions } from "../options";
/** Burns `node` away from its bottom edge, into embers and ash; it stays hidden (`opacity: 0`) until an open
 *  effect. */
export declare function closeBurn(node: HTMLElement, options?: EffectOptions): Promise<void>;
/** Brings a hidden `node` back out of the flame, embers settling into place. Shown elements are left as they are. */
export declare function openBurn(node: HTMLElement, options?: EffectOptions): Promise<void>;
