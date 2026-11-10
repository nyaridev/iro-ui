import type { InkBleedOptions } from "../options";
/** Lets `node` run like wet ink and dry away in pools; it stays hidden (`opacity: 0`) until an open effect. */
export declare function closeInkBleed(node: HTMLElement, options?: InkBleedOptions): Promise<void>;
/** Brings a hidden `node` back: wet pools spread and join, and the picture draws back up sharp. Shown elements are
 *  left as they are. */
export declare function openInkBleed(node: HTMLElement, options?: InkBleedOptions): Promise<void>;
