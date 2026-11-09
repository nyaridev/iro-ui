// Sparkline: a small trend line for a stat tile, with a dot on the latest value. No axes and no readout: the tile's
// number is the value, and screen readers hear where the trend started and ended.

// ── Dependencies ──────────────────────────
import type { ComponentProps } from "react";
import { areaPath, linePath, type Point } from "../chart/paths";
import { formatPlain } from "../chart/scale";
import { useWidth } from "../chart/useWidth";
import { cx } from "../shared/cx";

// ── Constants ─────────────────────────────
/** Room for the end dot and its ring. */
const INSET = 5;

// ── Types ─────────────────────────────────
export interface SparklineProps extends Omit<ComponentProps<"div">, "children"> {
  values: number[];
  /** What the trend is, for screen readers: "Requests, last 14 days". */
  label: string;
  /** Any CSS color (default the first chart color). */
  color?: string;
  /** A soft wash under the line. */
  area?: boolean;
  /** Height in pixels (default 32); the width follows the container. */
  height?: number;
  /** How the first and last values read to screen readers (default: in full). */
  format?: (value: number) => string;
}

// ── Public API ────────────────────────────
/** A small trend line that fills its container's width. */
export function Sparkline({
  values,
  label,
  color = "var(--iro-chart-1)",
  area = false,
  height = 32,
  format = formatPlain,
  className,
  style,
  ...rest
}: SparklineProps) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const low = Math.min(...values);
  const high = Math.max(...values);
  const span = high - low || 1;
  const points = values.map(
    (value, index): Point => [
      INSET + (index / Math.max(values.length - 1, 1)) * (width - INSET * 2),
      INSET + (1 - (value - low) / span) * (height - INSET * 2),
    ],
  );
  const last = points.at(-1);
  const spoken =
    values.length > 0 ? `${label}: from ${format(values[0])} to ${format(values[values.length - 1])}` : label;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={spoken}
      className={cx("iro-sparkline", className)}
      style={{ height, color, ...style }}
      {...rest}
    >
      {width > 0 && last ? (
        <svg width={width} height={height} aria-hidden="true">
          <g className="iro-chart-series">
            {area ? <path className="iro-chart-area" d={areaPath(points, height, true)} /> : null}
            <path className="iro-chart-line" d={linePath(points, true)} />
            <circle className="iro-chart-dot" cx={last[0]} cy={last[1]} r={3} />
          </g>
        </svg>
      ) : null}
    </div>
  );
}
