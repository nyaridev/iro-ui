export type Rgb = [number, number, number];
/** [r, g, b, a] of any CSS color the browser can paint: 0–255, alpha 0–1. */
export declare function rgba(color: string): [number, number, number, number];
/** A color expression (`var(--iro-accent)`, `color-mix(…)`) as RGB, resolved inside `element`. */
export declare function shade(element: Element, expression: string): Rgb;
/** An RGB triple as a CSS color, with optional alpha. */
export declare const css: ([r, g, b]: Rgb, alpha?: number) => string;
