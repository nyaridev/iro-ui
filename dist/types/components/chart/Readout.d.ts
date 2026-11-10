/** One row: a series' value at the shown point. */
export interface ReadoutRow {
    name: string;
    value: string;
    color: string;
    kind: "line" | "dash" | "box";
}
interface ReadoutProps {
    open: boolean;
    /** Where the box sits: beside this x, at this y, inside a plot this wide. */
    x: number;
    y?: number;
    width: number;
    title: string;
    rows: ReadoutRow[];
}
/** The readout box; it flips to the left of `x` past the plot's middle. */
export declare function Readout({ open, x, y, width, title, rows }: ReadoutProps): import("react").JSX.Element;
export {};
