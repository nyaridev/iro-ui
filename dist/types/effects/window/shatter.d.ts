import { type ShatterOptions } from "../options";
/** Shatters `node` like glass struck at `options.from` (its center by default); it stays hidden (`opacity: 0`)
 *  until an open effect. */
export declare function closeShatter(node: HTMLElement, options?: ShatterOptions): Promise<void>;
/** Brings a hidden `node` back: its shards rise and fit together, and the cracks close into the point. Shown
 *  elements are left as they are. */
export declare function openShatter(node: HTMLElement, options?: ShatterOptions): Promise<void>;
