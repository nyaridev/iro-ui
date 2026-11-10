import type { ComponentProps, ReactNode } from "react";
import { type LegendItem } from "./Legend";
/** The chart's numbers as a table: column headings, then one row per label (its first cell names the row). */
export interface ChartTable {
    columns: string[];
    rows: string[][];
}
interface ChartFrameProps extends Omit<ComponentProps<"figure">, "children"> {
    /** The chart's kebab name: `line-chart` gives the figure `iro-line-chart`. */
    name: string;
    label: string;
    legend?: LegendItem[];
    legendLayout?: "inline" | "rows";
    table: ChartTable;
    children: ReactNode;
}
/** A chart's figure: its plot (children), legend and hidden data table. */
export declare function ChartFrame({ name, label, legend, legendLayout, table, className, children, ...rest }: ChartFrameProps): import("react").JSX.Element;
export {};
