import type { ComponentProps } from "react";
import type { ChartPart } from "../chart/types";
export interface DonutChartProps extends Omit<ComponentProps<"figure">, "children"> {
    /** What the chart shows, for screen readers and the data table's caption. */
    label: string;
    parts: ChartPart[];
    /** Small words under the middle number: "Requests". */
    centerLabel?: string;
    /** The middle number (default: the total). */
    centerValue?: string;
    /** The ring's width and height in pixels (default 160). */
    size?: number;
    /** The legend beside the ring, with each part's value and share (default true). */
    legend?: boolean;
    /** How values read (default: in full). */
    format?: (value: number) => string;
}
/** A ring of parts with the total in the middle. */
export declare function DonutChart({ label, parts, centerLabel, centerValue, size, legend, format, ...rest }: DonutChartProps): import("react").JSX.Element;
