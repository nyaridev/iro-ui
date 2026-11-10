import type { ComponentProps } from "react";
import type { ChartAxis, ChartSeries } from "../chart/types";
export interface LineChartProps extends Omit<ComponentProps<"figure">, "children"> {
    /** What the chart shows, for screen readers and the data table's caption. */
    label: string;
    /** The x axis, in order: one label per value. */
    labels: string[];
    series: ChartSeries[];
    /** A soft wash under each line (not under dashed ones: a target or the period before isn't an amount). */
    area?: boolean;
    /** Bend the lines through their points (never past them). */
    smooth?: boolean;
    /** A dot on every value; otherwise only the shown point gets dots. */
    points?: boolean;
    /** Height in pixels, x labels included (default 200). */
    height?: number;
    /** The y axis's ends; left out, it runs from 0 (or the lowest value below 0) to the highest, rounded out. The same
     * as `axis.min` and `axis.max`, which win when both are set. */
    min?: number;
    max?: number;
    /** How values read in the readout and the data table (default: in full, 18,240). */
    format?: (value: number) => string;
    /** How the value axis runs and reads: whole or decimal ticks, a fixed step, its ends and its labels. Left out,
     * counts get whole-number ticks and the axis fits the data. */
    axis?: ChartAxis;
}
/** A line or area chart over shared labels. */
export declare function LineChart({ label, labels, series, area, smooth, points, height, min, max, format, axis, ...rest }: LineChartProps): import("react").JSX.Element;
