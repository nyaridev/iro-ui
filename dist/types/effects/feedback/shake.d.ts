import { type ShakeOptions } from "../options";
/** Shakes `node` side to side; resolves when it has settled. */
export declare function shake(node: HTMLElement, options?: ShakeOptions): Promise<void>;
