import type { ComponentProps } from "react";
import type { ChartSeries } from "../chart/types";
export interface BarChartProps extends Omit<ComponentProps<"figure">, "children"> {
    /** What the chart shows, for screen readers and the data table's caption. */
    label: string;
    /** One label per value: the x axis for columns, the rows for `horizontal`. */
    labels: string[];
    series: ChartSeries[];
    /** Stack each label's series into one bar (negative values count as 0). */
    stacked?: boolean;
    /** Bars lying down, one row per label, with the total at each tip. */
    horizontal?: boolean;
    /** Height in pixels for columns, x labels included (default 200); rows size themselves. */
    height?: number;
    /** How values read in the tips, readout and data table (default: in full). */
    format?: (value: number) => string;
}
/** A bar chart over shared labels. */
export declare function BarChart({ label, labels, series, stacked, horizontal, height, format, ...rest }: BarChartProps): import("react").JSX.Element;
