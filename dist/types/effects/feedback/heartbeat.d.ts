import { type FeedbackOptions } from "../options";
/** Beats `node` twice with a glow, for a like or a favorite; resolves when it's still. */
export declare function heartbeat(node: HTMLElement, options?: FeedbackOptions): Promise<void>;
