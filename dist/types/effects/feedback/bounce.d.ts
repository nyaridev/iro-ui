import { type BounceOptions } from "../options";
/** Bounces `node` to call attention to it; resolves when it has landed. */
export declare function bounce(node: HTMLElement, options?: BounceOptions): Promise<void>;
