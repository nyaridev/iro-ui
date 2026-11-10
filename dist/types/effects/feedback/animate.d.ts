/** Plays `keyframes` on `node` as its `kind` of feedback, stopping the last one of that kind; resolves when done. */
export declare function animate(node: HTMLElement, kind: string, keyframes: Keyframe[], timing: KeyframeAnimationOptions): Promise<void>;
/**
 * Adds a hidden `<span class={className}>` inside `node` and returns it with the function that takes it out. While
 * any are in, the node is positioned and isolated, so a part can sit over its content, or at `z-index: -1` between
 * its backdrop and its content.
 */
export declare function addPart(node: HTMLElement, className: string): [HTMLSpanElement, () => void];
/** `ratio` of `node`'s size, cut to at most `px` on its longer side, so a window moves as much as an icon, not more. */
export declare function within(node: HTMLElement, ratio: number, px: number): number;
/** The stand-in for moving feedback under reduced motion: an outline in `color` flashing `times` times. */
export declare function outlineFlash(node: HTMLElement, kind: string, color: string, times: number, duration: number): Promise<void>;
