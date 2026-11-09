// DonutChart: parts of one whole around a ring, the total in the middle, and a legend with each part's value and
// share. Pointing at a part, or the arrow keys, puts that part's numbers in the middle and dims the rest (ADR-0011).

// ── Dependencies ──────────────────────────
import type { ComponentProps, PointerEvent } from "react";
import { ChartFrame } from "../chart/ChartFrame";
import { arcPath } from "../chart/paths";
import { formatPlain, percent, seriesColor } from "../chart/scale";
import type { ChartPart } from "../chart/types";
import { useActive } from "../chart/useActive";

// ── Constants ─────────────────────────────
/** The gap between parts along the ring, in pixels, and the ring's thickness as a share of its size. */
const GAP = 2;
const THICKNESS = 0.12;
/** How far past the ring's edges the pointer still picks a part. */
const SLACK = 6;

// ── Types ─────────────────────────────────
export interface DonutChartProps extends Omit<ComponentProps<"figure">, "children"> {
  /** What the chart shows, for screen readers and the data table's caption. */
  label: string;
  parts: ChartPart[];
  /** Small words under the middle number: "Requests". */
  centerLabel?: string;
  /** The middle number (default: the total). */
  centerValue?: string;
  /** The ring's width and height in pixels (default 160). */
  size?: number;
  /** The legend beside the ring, with each part's value and share (default true). */
  legend?: boolean;
  /** How values read (default: in full). */
  format?: (value: number) => string;
}

// ── Public API ────────────────────────────
/** A ring of parts with the total in the middle. */
export function DonutChart({
  label,
  parts,
  centerLabel,
  centerValue,
  size = 160,
  legend = true,
  format = formatPlain,
  ...rest
}: DonutChartProps) {
  const { active, setActive, keys } = useActive(parts.length);
  const total = parts.reduce((sum, part) => sum + Math.max(part.value, 0), 0);
  const shares = parts.map((part) => (total > 0 ? Math.max(part.value, 0) / total : 0));
  const colors = parts.map((part, index) => seriesColor(index, part.color));
  const thickness = Math.round(size * THICKNESS);
  const center = size / 2;
  const radius = (size - thickness) / 2;
  const gap = shares.filter((share) => share > 0).length > 1 ? GAP / (2 * Math.PI * radius) : 0;
  const starts = shares.map((_, index) => shares.slice(0, index).reduce((sum, share) => sum + share, 0));

  function pick(event: PointerEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - box.left - center;
    const dy = event.clientY - box.top - center;
    const distance = Math.hypot(dx, dy);
    if (Math.abs(distance - radius) > thickness / 2 + SLACK) return setActive(null);
    const turn = (Math.atan2(dx, -dy) / (2 * Math.PI) + 1) % 1;
    const index = starts.findIndex((start, at) => shares[at] > 0 && turn >= start && turn < start + shares[at]);
    setActive(index === -1 ? null : index);
  }

  return (
    <ChartFrame
      name="donut-chart"
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
      legendLayout="rows"
      table={{
        columns: ["", "Value", "Share"],
        rows: parts.map((part, index) => [part.name, format(part.value), percent(shares[index])]),
      }}
      {...rest}
    >
      <div
        className="iro-donut-chart-ring"
        data-active={active === null ? undefined : true}
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} aria-hidden="true">
          <g className="iro-donut-chart-parts">
            {parts.map((_, index) =>
              shares[index] > gap ? (
                <path
                  // biome-ignore lint/suspicious/noArrayIndexKey: parts keep their order; names may repeat.
                  key={index}
                  className="iro-donut-chart-part"
                  data-active={index === active || undefined}
                  style={{ color: colors[index] }}
                  strokeWidth={thickness}
                  d={arcPath(center, center, radius, starts[index] + gap / 2, starts[index] + shares[index] - gap / 2)}
                />
              ) : null,
            )}
          </g>
        </svg>
        <div className="iro-donut-chart-center" role="status">
          <strong>{active === null ? (centerValue ?? format(total)) : format(parts[active].value)}</strong>
          <span>{active === null ? centerLabel : `${parts[active].name} · ${percent(shares[active])}`}</span>
        </div>
        <div
          className="iro-chart-hit"
          role="img"
          aria-label={`${label}. Arrow keys read each part.`}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: the chart is one stop; the arrow keys move between parts.
          tabIndex={0}
          onPointerMove={pick}
          onPointerDown={pick}
          {...keys}
        />
      </div>
    </ChartFrame>
  );
}
