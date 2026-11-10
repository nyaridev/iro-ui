/** A y range rounded out to clean numbers, and the ticks inside it. */
export interface Scale {
    min: number;
    max: number;
    ticks: number[];
}
/** The range from `low` to `high` widened to clean ticks, about `count` steps apart. */
export declare function niceScale(low: number, high: number, count?: number): Scale;
/** How an axis writes its ticks: in full, or compact (10K, 2.5M) once the axis reaches 10,000. */
export declare function tickFormat(scale: Scale): (value: number) => string;
/** The width of the y axis's gutter: room for its longest tick label. */
export declare const gutterFor: (ticks: string[]) => number;
/** Show every nth x label, so labels `step` pixels apart don't touch. */
export declare const labelEvery: (labels: string[], step: number) => number;
/** A value written in full, the default for readouts and legends. */
export declare const formatPlain: (value: number) => string;
/** A series' color: its own, else its slot's chart token in order. */
export declare const seriesColor: (index: number, own?: string) => string;
/** `share` of a whole as a rounded percentage: 0.234 → "23%"; a sliver that would round to 0 reads "<1%". */
export declare const percent: (share: number) => string;
