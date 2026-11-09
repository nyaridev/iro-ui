// DataTable's row logic: sorting by a column's value, and the rows to draw once nested rows are opened.

// ── Types ─────────────────────────────────
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

// ── Constants ─────────────────────────────
// Numbers inside text sort as numbers ("Run 9" before "Run 10"), and case doesn't matter.
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

// ── Private helpers ───────────────────────
const compare = (a: string | number, b: string | number) =>
  typeof a === "number" && typeof b === "number" ? a - b : collator.compare(String(a), String(b));

// ── Public API ────────────────────────────
/** The rows sorted by `value`; rows that tie keep their order. */
export function sortRows<Row>(rows: Row[], value: (row: Row) => string | number, direction: SortDirection): Row[] {
  const sign = direction === "asc" ? 1 : -1;
  return rows
    .map((row, index) => ({ row, index, key: value(row) }))
    .sort((a, b) => compare(a.key, b.key) * sign || a.index - b.index)
    .map(({ row }) => row);
}

/** The next sort when a column's header is clicked: ascending, then descending, then none. */
export function nextSort(current: DataTableSort | null, column: string): DataTableSort | null {
  if (current?.column !== column) return { column, direction: "asc" };
  return current.direction === "asc" ? { column, direction: "desc" } : null;
}

/** Every row to draw, depth-first: each row, then its sub-rows when it's open. `order` sorts each level. */
export function shownRows<Row>(
  rows: Row[],
  keyOf: (row: Row) => string,
  open: ReadonlySet<string>,
  subRows?: (row: Row) => Row[] | undefined,
  order: (rows: Row[]) => Row[] = (list) => list,
): ShownRow<Row>[] {
  const walk = (list: Row[], depth: number): ShownRow<Row>[] =>
    order(list).flatMap((row) => {
      const key = keyOf(row);
      const children = subRows?.(row) ?? [];
      const isOpen = children.length > 0 && open.has(key);
      return [
        { row, key, depth, hasChildren: children.length > 0, open: isOpen },
        ...(isOpen ? walk(children, depth + 1) : []),
      ];
    });
  return walk(rows, 0);
}
