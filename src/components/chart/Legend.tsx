// Legend: what each color in a chart is. A key shaped like the mark (a line, a dash or a box), the name, and for
// split charts the value and share. Inline under a plot, or as rows beside a donut.

import type { CSSProperties } from "react";

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
export function Legend({ items, layout = "inline" }: { items: LegendItem[]; layout?: "inline" | "rows" }) {
  return (
    <ul className="iro-chart-legend" data-layout={layout}>
      {items.map(({ name, color, kind, value, share }) => (
        <li key={name}>
          <span className="iro-chart-key" data-kind={kind} style={{ "--key": color } as CSSProperties} />
          <span className="iro-chart-legend-name">{name}</span>
          {value === undefined ? null : <span className="iro-chart-legend-value">{value}</span>}
          {share === undefined ? null : <span className="iro-chart-legend-share">{share}</span>}
        </li>
      ))}
    </ul>
  );
}
