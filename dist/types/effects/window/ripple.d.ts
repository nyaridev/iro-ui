import { type RippleOptions } from "../options";
/** Drops water on `node` at `options.from` (its center by default): ripples spread and wash it away; it stays
 *  hidden (`opacity: 0`) until an open effect. */
export declare function closeRipple(node: HTMLElement, options?: RippleOptions): Promise<void>;
/** Brings a hidden `node` back from a drop at `options.from`: it wells up as the ripples spread. Shown elements are
 *  left as they are. */
export declare function openRipple(node: HTMLElement, options?: RippleOptions): Promise<void>;
