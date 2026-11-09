// DataTable: rows of records in columns. Headers sort (ascending, descending, off), rows can be picked with checkboxes,
// rows can open to show rows nested under them, and a footer can carry totals. With a `maxHeight` it scrolls and the
// header stays put. Plain table markup with real buttons and checkboxes, so it needs no keyboard handling of its own.

// ── Dependencies ──────────────────────────
import { type ComponentProps, type CSSProperties, type ReactNode, useState } from "react";
import { Checkbox } from "../checkbox/Checkbox";
import { cx } from "../shared/cx";
import { ChevronDownGlyph, ChevronRightGlyph, ChevronsUpDownGlyph, ChevronUpGlyph } from "../shared/glyphs";
import { Skeleton } from "../skeleton/Skeleton";
import { type DataTableSort, nextSort, shownRows, sortRows } from "./rows";

// ── Constants ─────────────────────────────
const LOADING_ROWS = 5;
const ARIA_SORT = { asc: "ascending", desc: "descending" } as const;

// ── Types ─────────────────────────────────
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

// ── Private helpers ───────────────────────
/** A value the caller may control: theirs when given, else our own; changes go to both. */
function useControllable<T>(value: T | undefined, fallback: T, onChange?: (next: T) => void): [T, (next: T) => void] {
  const [own, setOwn] = useState(fallback);
  const current = value === undefined ? own : value;
  return [
    current,
    (next) => {
      setOwn(next);
      onChange?.(next);
    },
  ];
}

// ── Public API ────────────────────────────
/** A table of rows that can sort, be picked, nest and total. */
export function DataTable<Row>({
  label,
  columns,
  rows,
  rowKey,
  rowLabel = rowKey,
  sort: sortProp,
  defaultSort = null,
  onSortChange,
  selectable = false,
  selected: selectedProp,
  onSelectedChange,
  subRows,
  defaultExpanded = [],
  empty = "Nothing to show.",
  loading = false,
  maxHeight,
  size = "md",
  className,
  style,
  ...rest
}: DataTableProps<Row>) {
  const [sort, setSort] = useControllable(sortProp, defaultSort, onSortChange);
  const [selected, setSelected] = useControllable(selectedProp, [] as string[], onSelectedChange);
  const [expanded, setExpanded] = useState(() => new Set(defaultExpanded));
  const sorting = columns.find(({ id }) => id === sort?.column);
  const order = (list: Row[]) =>
    sort && sorting?.sortValue ? sortRows(list, sorting.sortValue, sort.direction) : list;
  const shown = shownRows(rows, rowKey, expanded, subRows, order);
  const topKeys = rows.map(rowKey);
  const picked = new Set(selected);
  const pickedCount = topKeys.filter((key) => picked.has(key)).length;
  const span = columns.length + (selectable ? 1 : 0);
  const hasFooter = columns.some(({ footer }) => footer !== undefined);

  function toggleRow(key: string, on: boolean) {
    setSelected(on ? [...selected, key] : selected.filter((each) => each !== key));
  }

  function toggleAll(on: boolean) {
    const others = selected.filter((key) => !topKeys.includes(key));
    setSelected(on ? [...others, ...topKeys] : others);
  }

  function toggleOpen(key: string) {
    const next = new Set(expanded);
    if (!next.delete(key)) next.add(key);
    setExpanded(next);
  }

  let body: ReactNode;
  if (loading)
    body = Array.from({ length: LOADING_ROWS }, (_, row) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: placeholder rows have nothing else to tell them apart.
      <tr key={row}>
        {selectable ? <td className="iro-data-table-check" /> : null}
        {columns.map((column) => (
          <td key={column.id} data-align={column.align}>
            <Skeleton width={column.align === "end" ? "50%" : "70%"} />
          </td>
        ))}
      </tr>
    ));
  else if (shown.length === 0)
    body = (
      <tr>
        <td className="iro-data-table-empty" colSpan={span}>
          {empty}
        </td>
      </tr>
    );
  else
    body = shown.map(({ row, key, depth, hasChildren, open }) => (
      <tr key={key} data-selected={picked.has(key) || undefined} data-depth={depth || undefined}>
        {selectable ? (
          <td className="iro-data-table-check">
            {depth === 0 ? (
              <Checkbox
                aria-label={`Select ${rowLabel(row)}`}
                checked={picked.has(key)}
                onCheckedChange={(on) => toggleRow(key, on)}
              />
            ) : null}
          </td>
        ) : null}
        {columns.map((column, index) => (
          <td key={column.id} data-align={column.align}>
            {index === 0 && subRows ? (
              <span className="iro-data-table-tree" style={{ "--depth": depth } as CSSProperties}>
                {hasChildren ? (
                  <button
                    type="button"
                    className="iro-data-table-toggle"
                    aria-expanded={open}
                    aria-label={`${open ? "Close" : "Open"} ${rowLabel(row)}`}
                    onClick={() => toggleOpen(key)}
                  >
                    <ChevronRightGlyph />
                  </button>
                ) : (
                  <span className="iro-data-table-toggle" />
                )}
                {column.cell(row)}
              </span>
            ) : (
              column.cell(row)
            )}
          </td>
        ))}
      </tr>
    ));

  return (
    <div
      className={cx("iro-data-table", className)}
      data-size={size}
      data-scroll={maxHeight === undefined ? undefined : true}
      style={{ maxHeight, ...style }}
      {...rest}
    >
      <table aria-label={label} aria-busy={loading || undefined}>
        <thead>
          <tr>
            {selectable ? (
              <th className="iro-data-table-check" scope="col">
                <Checkbox
                  aria-label="Select all rows"
                  checked={topKeys.length > 0 && pickedCount === topKeys.length}
                  indeterminate={pickedCount > 0 && pickedCount < topKeys.length}
                  onCheckedChange={toggleAll}
                />
              </th>
            ) : null}
            {columns.map((column) => {
              const direction = sort?.column === column.id ? sort.direction : null;
              return (
                <th
                  key={column.id}
                  scope="col"
                  data-align={column.align}
                  style={{ width: column.width }}
                  aria-sort={column.sortValue ? (direction ? ARIA_SORT[direction] : "none") : undefined}
                >
                  {column.sortValue ? (
                    <button
                      type="button"
                      className="iro-data-table-sort"
                      data-sorted={direction ?? undefined}
                      onClick={() => setSort(nextSort(sort, column.id))}
                    >
                      {column.header}
                      <span className="iro-data-table-sort-icon">
                        {direction === "asc" ? (
                          <ChevronUpGlyph />
                        ) : direction === "desc" ? (
                          <ChevronDownGlyph />
                        ) : (
                          <ChevronsUpDownGlyph />
                        )}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{body}</tbody>
        {hasFooter && !loading ? (
          <tfoot>
            <tr>
              {selectable ? <td className="iro-data-table-check" /> : null}
              {columns.map((column) => (
                <td key={column.id} data-align={column.align}>
                  {column.footer}
                </td>
              ))}
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}
