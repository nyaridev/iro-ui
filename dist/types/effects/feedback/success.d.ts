import { type FeedbackOptions } from "../options";
/** Pops `node` with a ring of success; resolves when it has faded. */
export declare function success(node: HTMLElement, options?: FeedbackOptions): Promise<void>;
