// Trend: a change with its direction, "↑ +8.4%", in green when it went the good way and red when it didn't. The
// sign stays in the text, so the color and the arrow are never the only cue.

// ── Dependencies ──────────────────────────
import type { ComponentProps } from "react";
import { cx } from "../shared/cx";
import { ArrowDownGlyph, ArrowUpGlyph, MinusGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface TrendProps extends Omit<ComponentProps<"span">, "children"> {
  /** The change, signed: `8.4`, `-0.3`. */
  value: number;
  /** Which way is good (default `up`); `down` for errors and latency, `none` to show no judgment. */
  good?: "up" | "down" | "none";
  /** How the number reads, given the signed value (default `+8.4%`). */
  format?: (value: number) => string;
  /** Words after the number: "vs yesterday". */
  context?: string;
  /** `badge` (default): on a soft tint. `text`: just colored text, for tight rows. */
  variant?: "badge" | "text";
}

// ── Private helpers ───────────────────────
/** "+8.4%", "−0.3%", "0%". */
function signedPercent(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${Math.abs(value)}%`;
}

// ── Public API ────────────────────────────
/** A change with an arrow, colored by whether it went the good way. */
export function Trend({
  value,
  good = "up",
  format = signedPercent,
  context,
  variant = "badge",
  className,
  ...rest
}: TrendProps) {
  const direction = value > 0 ? "up" : value < 0 ? "down" : "flat";
  const tone = good === "none" || direction === "flat" ? "neutral" : direction === good ? "success" : "danger";
  const Arrow = direction === "up" ? ArrowUpGlyph : direction === "down" ? ArrowDownGlyph : MinusGlyph;

  return (
    <span data-tone={tone} data-variant={variant} className={cx("iro-trend", className)} {...rest}>
      <Arrow />
      <span className="iro-trend-value">{format(value)}</span>
      {context ? <span className="iro-trend-context">{context}</span> : null}
    </span>
  );
}
