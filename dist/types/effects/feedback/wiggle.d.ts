import { type EffectOptions } from "../options";
/** Wiggles `node` as a hint; resolves when it has settled. */
export declare function wiggle(node: HTMLElement, options?: EffectOptions): Promise<void>;
