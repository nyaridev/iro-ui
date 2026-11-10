import type { ComponentProps } from "react";
import type { ChartPart } from "../chart/types";
export interface ShareBarProps extends Omit<ComponentProps<"figure">, "children"> {
    /** What the bar shows, for screen readers and the data table's caption. */
    label: string;
    parts: ChartPart[];
    /** The legend under the bar, with each part's value and share (default true). */
    legend?: boolean;
    /** `sm` is 4 px tall for dense rows, `md` 8 px (default). */
    size?: "sm" | "md";
    /** How values read (default: in full). */
    format?: (value: number) => string;
}
/** A bar split into parts, widths in proportion to their values. */
export declare function ShareBar({ label, parts, legend, size, format, ...rest }: ShareBarProps): import("react").JSX.Element;
