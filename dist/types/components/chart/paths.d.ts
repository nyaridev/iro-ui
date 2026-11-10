export type Point = [x: number, y: number];
/** Which end of a bar is rounded: the end away from the baseline. */
export type BarEnd = "top" | "bottom" | "right";
/** A line through the points; `smooth` bends it through them without overshooting. */
export declare function linePath(points: Point[], smooth?: boolean): string;
/** The line closed down to `baseline`: the area under it. */
export declare function areaPath(points: Point[], baseline: number, smooth?: boolean): string;
/** Runs of points without gaps: a null value breaks the line. */
export declare function runs(points: (Point | null)[]): Point[][];
/** A bar from (x, y), `w` wide and `h` tall, with its `end` rounded by `r` and the base square. */
export declare function barPath(x: number, y: number, w: number, h: number, r: number, end: BarEnd): string;
/** An arc of radius `r` around (cx, cy) from `start` to `end`, in turns clockwise from the top (0.25 is 3 o'clock). */
export declare function arcPath(cx: number, cy: number, r: number, start: number, end: number): string;
