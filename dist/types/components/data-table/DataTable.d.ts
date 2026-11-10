import { type ComponentProps, type CSSProperties, type ReactNode } from "react";
import { type DataTableSort } from "./rows";
/** One column: its heading, how a row's cell looks, and optionally how it sorts, aligns, sizes and totals. */
export interface DataTableColumn<Row> {
    /** Unique within the table; sorting names columns by it. */
    id: string;
    header: ReactNode;
    cell: (row: Row) => ReactNode;
    /** The value the column sorts by; left out, the column doesn't sort. */
    sortValue?: (row: Row) => string | number;
    /** `end` for numbers, so their digits line up. */
    align?: "start" | "center" | "end";
    /** CSS width: `"8rem"`, `"30%"`. */
    width?: CSSProperties["width"];
    /** The column's cell in the footer row: a total, a count. */
    footer?: ReactNode;
}
export interface DataTableProps<Row> extends Omit<ComponentProps<"div">, "children"> {
    /** What the table lists, for screen readers. */
    label: string;
    columns: DataTableColumn<Row>[];
    rows: Row[];
    /** A unique key for each row (nested rows included). */
    rowKey: (row: Row) => string;
    /** A row's name for screen readers, on its checkbox and open button (default: its key). */
    rowLabel?: (row: Row) => string;
    /** The sort, for a table you control; `null` is unsorted. */
    sort?: DataTableSort | null;
    defaultSort?: DataTableSort | null;
    onSortChange?: (sort: DataTableSort | null) => void;
    /** Checkboxes on the top-level rows, and one in the header for all of them. */
    selectable?: boolean;
    /** The picked rows' keys, for a table you control. */
    selected?: string[];
    onSelectedChange?: (keys: string[]) => void;
    /** Rows nested under a row; a row with any gets a button that opens it. */
    subRows?: (row: Row) => Row[] | undefined;
    /** Keys of the rows open at first. */
    defaultExpanded?: string[];
    /** What shows when there are no rows (default "Nothing to show."). */
    empty?: ReactNode;
    /** Placeholder rows while the data loads. */
    loading?: boolean;
    /** Past this height the table scrolls and its header stays put. */
    maxHeight?: CSSProperties["maxHeight"];
    /** Row height: `sm` for dense lists, `md` (default). */
    size?: "sm" | "md";
}
/** A table of rows that can sort, be picked, nest and total. */
export declare function DataTable<Row>({ label, columns, rows, rowKey, rowLabel, sort: sortProp, defaultSort, onSortChange, selectable, selected: selectedProp, onSelectedChange, subRows, defaultExpanded, empty, loading, maxHeight, size, className, style, ...rest }: DataTableProps<Row>): import("react").JSX.Element;
