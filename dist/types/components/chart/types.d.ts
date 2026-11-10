/** One series: its name, a value per label (null for a gap), and optionally its own color or a dashed line. */
export interface ChartSeries {
    name: string;
    values: (number | null)[];
    /** Any CSS color; left out, the series takes the next chart color in order. */
    color?: string;
    /** A dashed line, for a target, budget or forecast (line charts). */
    dashed?: boolean;
}
/** How a chart's value axis runs and reads. Every field is optional; left out, the chart fits its data. */
export interface ChartAxis {
    /** The axis's ends; left out, it runs from 0 (or the lowest value below 0) to the highest, rounded out. */
    min?: number;
    max?: number;
    /** `whole`: ticks only on whole numbers, for counts. `decimal`: any clean step (0.25, 0.5…). `auto` (default):
     * whole when every value is a whole number. */
    ticks?: "auto" | "whole" | "decimal";
    /** A fixed distance between ticks (5, 0.5, 3600); replaces the automatic step. */
    step?: number;
    /** About how many steps the axis has (default 4). */
    count?: number;
    /** How tick labels read, such as `(value) => \`${value}%\``. Default: in full, or compact (10K, 2.5M) once the
     * axis reaches 10,000. */
    format?: (value: number) => string;
}
/** One part of a whole: its name, amount and optionally its own color. */
export interface ChartPart {
    name: string;
    value: number;
    /** Any CSS color; left out, the part takes the next chart color in order. */
    color?: string;
}
