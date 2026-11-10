import type { EffectOptions } from "../options";
/** Folds `node` up like a letter that lifts away; it stays hidden (`opacity: 0`) until an open effect. */
export declare function closeFold(node: HTMLElement, options?: EffectOptions): Promise<void>;
/** Unfolds a hidden `node` from a folded letter. Shown elements are left as they are. */
export declare function openFold(node: HTMLElement, options?: EffectOptions): Promise<void>;
