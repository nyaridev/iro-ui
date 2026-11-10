/** Settings every layer takes. */
export interface LayerOptions {
    /** How fast it moves; 0 holds it still. 1 by default, up to 4. */
    speed?: number;
    /** How strongly it shows, 0 to 2. 1 by default. */
    intensity?: number;
    /** Up to three CSS colors (tokens, `color-mix()`, any color) in place of the layer's own, first to third. Most
     *  layers use the style's glows, `var(--iro-glow-1)` (the accent) to `var(--iro-glow-3)`. */
    colors?: string[];
}
export interface LiquidOptions extends LayerOptions {
}
export interface AuroraOptions extends LayerOptions {
    /** How far down the curtains hang, 0.3 to 2.5. 1 by default. */
    height?: number;
    /** How streaked the curtains are, 0 (smooth) to 1 (the default). */
    rays?: number;
    /** How many curtains, 1 to 3 (the default). */
    curtains?: number;
}
export interface MeshOptions extends LayerOptions {
    /** How large the color fields are, 0.4 to 3. 1 by default. */
    scale?: number;
}
export interface SpotlightOptions extends LayerOptions {
    /** How wide the light is, 0.3 to 3. 1 by default. */
    size?: number;
    /** How much dust glints in it, 0 to 3. 1 by default. */
    specks?: number;
}
export interface GridOptions extends LayerOptions {
    /** Pixels between dots, 8 to 80. 22 by default. */
    gap?: number;
    /** How big the dots are, 0.3 to 3. 1 by default. */
    size?: number;
    /** How far the lens reaches around the mouse, in pixels, 40 to 600. 150 by default. */
    reach?: number;
    /** How much the lens swells, 0 to 2. 1 by default. */
    lens?: number;
}
export interface PaperOptions extends LayerOptions {
    /** Lets the light sway slowly over the sheet, so its fibers' shadows turn. Off by default: the paper is still. */
    animated?: boolean;
    /** How many fibers show, 0 to 3. 1 by default. */
    fibers?: number;
    /** How warm the sheet is on light backgrounds, 0 to 3. 1 by default. The first color is the warm tint. */
    warmth?: number;
}
export interface DustOptions extends LayerOptions {
    /** How many specks, 0 to 3. 1 by default. */
    count?: number;
    /** How big they are, 0.3 to 3. 1 by default. */
    size?: number;
    /** How bright the shafts of window light are, 0 to 3. 1 by default. */
    shafts?: number;
}
export interface ContoursOptions extends LayerOptions {
    /** How many lines, 0.3 to 3. 1 by default. */
    density?: number;
    /** How large the hills are, 0.3 to 4. 1 by default. */
    scale?: number;
    /** How thick the lines are, 0.3 to 4. 1 by default. Their first color is the accent. */
    width?: number;
}
export interface InkOptions extends LayerOptions {
    /** How large the pools are, 0.3 to 3. 1 by default. */
    scale?: number;
    /** How much of the backdrop the ink covers, 0 to 1. 0.5 by default. */
    coverage?: number;
}
export interface BackdropOptions {
    /** The flowing WebGL background over the glows. */
    liquid?: boolean | LiquidOptions;
    /** Curtains of light across the top, with rays rising from their edge. */
    aurora?: boolean | AuroraOptions;
    /** A full background of colors that slowly drift and blend under soft folds of light. Drawn over the liquid when
     *  both are on. */
    mesh?: boolean | MeshOptions;
    /** A soft light that follows the mouse. */
    spotlight?: boolean | SpotlightOptions;
    /** A dot grid that swells like a lens and lights up around the mouse. */
    grid?: boolean | GridOptions;
    /** A paper surface of tooth, fibers and pulp, warm on light backgrounds. It textures the layers under it. */
    paper?: boolean | PaperOptions;
    /** Specks and soft bokeh drifting at three depths through shafts of window light. */
    dust?: boolean | DustOptions;
    /** A slowly shifting elevation map in hairline contours, in the accent. */
    contours?: boolean | ContoursOptions;
    /** Ink bleeding through wet paper in slow pools with darker rims: dark ink on light backgrounds, mist on dark. */
    ink?: boolean | InkOptions;
}
/** Settings every window effect and feedback takes. */
export interface EffectOptions {
    /** How fast it plays, 0.25 to 4. 1 by default. */
    speed?: number;
}
/** A point on screen in CSS pixels from the viewport's top left, or an element whose center is the point. */
export type Spot = Element | {
    x: number;
    y: number;
};
export interface BlackHoleOptions extends EffectOptions {
    /** Runs as the hole starts to collapse (at once without motion), so what replaces the element can rise out of it. */
    almostGone?: () => void;
}
export interface CrtOptions extends EffectOptions {
    /** The CSS color of the bright line and dot. `var(--iro-spark)` by default. */
    color?: string;
}
export interface GenieOptions extends EffectOptions {
    /** Where the window pours into and back out of: an element (a dock button) or a box on screen. A small box at the
     *  bottom center of the viewport by default. */
    target?: Element | DOMRect;
    /** How hard the window bends toward the target, 0 to 2. 1 by default. */
    bend?: number;
}
export interface ShatterOptions extends EffectOptions {
    /** Where the glass breaks from. The window's center by default. */
    from?: Spot;
}
export interface InkBleedOptions extends EffectOptions {
    /** The ink's CSS color. By default dark ink tinted with the accent on light themes, a deep dye of the accent on
     *  dark ones. */
    color?: string;
}
export interface RippleOptions extends EffectOptions {
    /** Where the drop falls: a point (a click) or an element (a button). The window's center by default. */
    from?: Spot;
}
/** Feedback in a color of its own: the heartbeat's glow, the flash's wash, the success ring. */
export interface FeedbackOptions extends EffectOptions {
    /** A CSS color in place of the feedback's own (`var(--iro-pink)`, `var(--iro-yellow)`, `var(--iro-success)`). */
    color?: string;
}
export interface BounceOptions extends EffectOptions {
    /** How high it hops, 0.25 to 3. 1 by default (about 14 px). */
    height?: number;
}
export interface TapOptions extends EffectOptions {
    /** Where it was pressed: a point (a pointer event's) or an element. The element's center by default. */
    from?: Spot;
}
export interface ShakeOptions extends EffectOptions {
    /** How far it shakes, 0.25 to 3. 1 by default (about 10 px). */
    strength?: number;
}
export interface PulseOptions extends EffectOptions {
    /** The glow's CSS color. `var(--iro-spark)` by default. */
    color?: string;
    /** How many pulses, 1 to 3. 1 by default. */
    count?: number;
    /** How far the ring spreads and how bright it is, 0.25 to 3. 1 by default. */
    strength?: number;
}
/** `value` held to `min`–`max`, or `fallback` when it isn't a number. */
export declare function held(value: unknown, fallback: number, min: number, max: number): number;
/** The point `spot` names, or the center of `box` when there's none. */
export declare function spotOf(spot: Spot | undefined, box: DOMRect): {
    x: number;
    y: number;
};
