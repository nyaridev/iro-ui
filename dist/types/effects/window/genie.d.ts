import { type GenieOptions } from "../options";
/** Pours `node` into its target (`options.target`: a dock button, say); it stays hidden (`opacity: 0`) until an open
 *  effect. */
export declare function closeGenie(node: HTMLElement, options?: GenieOptions): Promise<void>;
/** Pours a hidden `node` back out of its target. Shown elements are left as they are. */
export declare function openGenie(node: HTMLElement, options?: GenieOptions): Promise<void>;
