// Readout: the values at the point a chart is showing, in a small box beside it inside the plot. Always mounted, so
// screen readers hear it change as the arrow keys move it; empty and invisible while nothing is shown.

// ── Dependencies ──────────────────────────
import type { CSSProperties } from "react";

// ── Types ─────────────────────────────────
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

// ── Constants ─────────────────────────────
const OFFSET = 12;

// ── Public API ────────────────────────────
/** The readout box; it flips to the left of `x` past the plot's middle. */
export function Readout({ open, x, y = 0, width, title, rows }: ReadoutProps) {
  const left = x <= width / 2;
  const place: CSSProperties = left ? { left: x + OFFSET, top: y } : { right: width - x + OFFSET, top: y };
  return (
    <div className="iro-chart-readout" role="status" data-open={open || undefined} style={place}>
      {open ? (
        <>
          <span className="iro-chart-readout-title">{title}</span>
          {rows.map(({ name, value, color, kind }) => (
            <span key={name} className="iro-chart-readout-row">
              <span className="iro-chart-key" data-kind={kind} style={{ "--key": color } as CSSProperties} />
              <strong>{value}</strong>
              <span>{name}</span>
            </span>
          ))}
        </>
      ) : null}
    </div>
  );
}
