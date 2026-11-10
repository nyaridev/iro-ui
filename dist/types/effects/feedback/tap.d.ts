import { type TapOptions } from "../options";
/** Spreads a press circle across `node` from `options.from` (a pointer event's point, say); resolves when faded. */
export declare function tap(node: HTMLElement, options?: TapOptions): Promise<void>;
