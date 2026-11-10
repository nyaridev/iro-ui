/** Measures `node` once, for an effect about to play on it. The function it returns gives the largest scale (at
 * most 1) that keeps `node` inside the viewport with `margin` to spare, clipped to a circle of `radius` around its
 * center (in its own, unscaled pixels) and turned by `angle` radians about its center. */
export declare function fitter(node: HTMLElement): (angle: number, radius: number, margin: number) => number;
