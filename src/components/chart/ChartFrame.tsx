// ChartFrame: the figure every chart sits in. It holds the plot, the legend and a data table that only screen readers
// see, so every value can be read without pointing at the chart (ADR-0011).

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../shared/cx";
import { Legend, type LegendItem } from "./Legend";

// ── Types ─────────────────────────────────
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

// ── Public API ────────────────────────────
/** A chart's figure: its plot (children), legend and hidden data table. */
export function ChartFrame({
  name,
  label,
  legend,
  legendLayout,
  table,
  className,
  children,
  ...rest
}: ChartFrameProps) {
  return (
    <figure className={cx("iro-chart", `iro-${name}`, className)} aria-label={label} {...rest}>
      {children}
      {legend && legend.length > 0 ? <Legend items={legend} layout={legendLayout} /> : null}
      <table className="iro-chart-table">
        <caption>{label}</caption>
        <thead>
          <tr>
            {table.columns.map((column, index) => (
              <th key={column || index} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map(([head, ...cells], row) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: rows follow the chart's labels, which may repeat.
            <tr key={row}>
              <th scope="row">{head}</th>
              {cells.map((cell, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: one cell per series, in series order.
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
