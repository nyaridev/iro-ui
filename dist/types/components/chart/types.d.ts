/** One series: its name, a value per label (null for a gap), and optionally its own color or a dashed line. */
export interface ChartSeries {
    name: string;
    values: (number | null)[];
    /** Any CSS color; left out, the series takes the next chart color in order. */
    color?: string;
    /** A dashed line, for a target, budget or forecast (line charts). */
    dashed?: boolean;
}
/** One part of a whole: its name, amount and optionally its own color. */
export interface ChartPart {
    name: string;
    value: number;
    /** Any CSS color; left out, the part takes the next chart color in order. */
    color?: string;
}
