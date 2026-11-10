import { type FeedbackOptions } from "../options";
/** Washes `node` in a highlight that fades; resolves when it's gone. */
export declare function flash(node: HTMLElement, options?: FeedbackOptions): Promise<void>;
