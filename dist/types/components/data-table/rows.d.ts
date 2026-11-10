export type SortDirection = "asc" | "desc";
/** Which column the table is sorted by, and which way. */
export interface DataTableSort {
    column: string;
    direction: SortDirection;
}
/** A row as drawn: its data, key, how deep it's nested, and whether it has rows under it and they're showing. */
export interface ShownRow<Row> {
    row: Row;
    key: string;
    depth: number;
    hasChildren: boolean;
    open: boolean;
}
/** The rows sorted by `value`; rows that tie keep their order. */
export declare function sortRows<Row>(rows: Row[], value: (row: Row) => string | number, direction: SortDirection): Row[];
/** The next sort when a column's header is clicked: ascending, then descending, then none. */
export declare function nextSort(current: DataTableSort | null, column: string): DataTableSort | null;
/** Every row to draw, depth-first: each row, then its sub-rows when it's open. `order` sorts each level. */
export declare function shownRows<Row>(rows: Row[], keyOf: (row: Row) => string, open: ReadonlySet<string>, subRows?: (row: Row) => Row[] | undefined, order?: (rows: Row[]) => Row[]): ShownRow<Row>[];
