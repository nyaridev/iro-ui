/** One legend entry. */
export interface LegendItem {
    name: string;
    color: string;
    /** The key's shape: `line` for lines, `dash` for dashed lines, `box` for bars, areas and parts. */
    kind: "line" | "dash" | "box";
    value?: string;
    share?: string;
}
/** The chart's legend; `rows` lists one entry per line with its numbers at the end. */
export declare function Legend({ items, layout }: {
    items: LegendItem[];
    layout?: "inline" | "rows";
}): import("react").JSX.Element;
