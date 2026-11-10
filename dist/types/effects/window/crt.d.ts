import type { CrtOptions } from "../options";
/** Switches `node` off into a line and a dot; it stays hidden (`opacity: 0`) until an open effect. */
export declare function closeCrt(node: HTMLElement, options?: CrtOptions): Promise<void>;
/** Switches a hidden `node` back on: a dot, a line, then the picture rolling open. Shown elements are left as they
 *  are. */
export declare function openCrt(node: HTMLElement, options?: CrtOptions): Promise<void>;
