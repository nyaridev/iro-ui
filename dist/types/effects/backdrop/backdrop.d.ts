import type { BackdropOptions } from "../options";
/** Fills `host`, an empty element behind the content, with the backdrop's layers. Returns the cleanup. */
export declare function mountBackdrop(host: HTMLElement, options?: BackdropOptions): () => void;
/** Changes a running backdrop to `options`: new settings and colors apply at once, without restarting; turning a
 *  layer on or off rebuilds it. On a `host` with nothing running yet, it mounts one. Returns the cleanup. */
export declare function updateBackdrop(host: HTMLElement, options: BackdropOptions): () => void;
