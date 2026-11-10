/** Gridlines from `gutter` to `width`, at `y(tick)`, labelled in the gutter. */
export declare function Grid({ ticks, y, gutter, width, format, }: {
    ticks: number[];
    y: (value: number) => number;
    gutter: number;
    width: number;
    format: (value: number) => string;
}): import("react").JSX.Element[];
