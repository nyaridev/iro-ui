import { type EffectOptions } from "../options";
/** An effect in full or smooth motion: resolves true once it played to the end, false if another took over. */
export type Play = (full: boolean, speed: number) => Promise<boolean>;
/** Hidden: a circle of radius 0, ready to open, with no other effect style. */
export declare function collapse(node: HTMLElement): void;
/** Fully shown, with every effect style and part removed. */
export declare function settle(node: HTMLElement): void;
/** Runs `draw` every frame for `duration` ms. If frames stall (a hidden or throttled page), it finishes on a timer,
 * so an element never stays invisible. Resolves `false` if another effect took over meanwhile. */
export declare function frames(node: HTMLElement, duration: number, draw: (t: number) => void): Promise<boolean>;
/** Opens or closes `node` with `play`, the way every window effect does: it claims `node` (and does nothing if it's
 *  already open or closed that way), clears what an interrupted effect left, jumps to the end under off motion,
 *  fades under reduced motion, and leaves it shown or hidden once `play` ends. `skipped` runs when `play` doesn't. An
 *  opening `node` starts hidden (`opacity: 0`): `play` shows it. */
export declare function transition(node: HTMLElement, direction: "open" | "close", options: EffectOptions, play: Play, skipped?: () => void): Promise<void>;
/** Hides `node` at once, ready for any open effect (an element that should open with an effect starts hidden). */
export declare function hideWindow(node: HTMLElement): void;
