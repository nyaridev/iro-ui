// ShareBar: one bar split into the parts of a whole (certificates by type, spend by provider), each part its own
// rounded pill, with a legend that gives each part's value and share, so nothing has to be pointed at to be read
// (ADR-0011).

// ── Dependencies ──────────────────────────
import type { ComponentProps } from "react";
import { ChartFrame } from "../chart/ChartFrame";
import { formatPlain, percent, seriesColor } from "../chart/scale";
import type { ChartPart } from "../chart/types";

// ── Types ─────────────────────────────────
export interface ShareBarProps extends Omit<ComponentProps<"figure">, "children"> {
  /** What the bar shows, for screen readers and the data table's caption. */
  label: string;
  parts: ChartPart[];
  /** The legend under the bar, with each part's value and share (default true). */
  legend?: boolean;
  /** `sm` is 4 px tall for dense rows, `md` 8 px (default). */
  size?: "sm" | "md";
  /** How values read (default: in full). */
  format?: (value: number) => string;
}

// ── Public API ────────────────────────────
/** A bar split into parts, widths in proportion to their values. */
export function ShareBar({ label, parts, legend = true, size = "md", format = formatPlain, ...rest }: ShareBarProps) {
  const total = parts.reduce((sum, part) => sum + Math.max(part.value, 0), 0);
  const shares = parts.map((part) => (total > 0 ? Math.max(part.value, 0) / total : 0));
  const colors = parts.map((part, index) => seriesColor(index, part.color));
  const spoken = parts.map((part, index) => `${part.name} ${percent(shares[index])}`).join(", ");

  return (
    <ChartFrame
      name="share-bar"
      label={label}
      legend={
        legend
          ? parts.map((part, index) => ({
              name: part.name,
              color: colors[index],
              kind: "box" as const,
              value: format(part.value),
              share: percent(shares[index]),
            }))
          : undefined
      }
      table={{
        columns: ["", "Value", "Share"],
        rows: parts.map((part, index) => [part.name, format(part.value), percent(shares[index])]),
      }}
      {...rest}
    >
      <div
        className="iro-share-bar-track iro-chart-series"
        data-size={size}
        role="img"
        aria-label={`${label}: ${spoken}`}
      >
        {parts.map((part, index) =>
          shares[index] > 0 ? (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: parts keep their order; names may repeat.
              key={index}
              className="iro-share-bar-part"
              style={{ flexGrow: Math.max(part.value, 0), background: colors[index] }}
            />
          ) : null,
        )}
      </div>
    </ChartFrame>
  );
}
