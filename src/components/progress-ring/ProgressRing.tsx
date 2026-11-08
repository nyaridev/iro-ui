// ProgressRing: a small circular progress (0–1) in the current text color, for header chips and buttons. With a
// `label` it's a progress bar for screen readers; without one it's decoration next to text that says the same.

// ── Dependencies ──────────────────────────
import type { CSSProperties } from "react";
import { cx } from "../shared/cx";

// ── Constants ─────────────────────────────
const RADIUS = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// ── Types ─────────────────────────────────
export interface ProgressRingProps {
  /** Done so far, 0–1. */
  value: number;
  /** Width and height in px (default 20). */
  size?: number;
  /** What's in progress, for screen readers. */
  label?: string;
  className?: string;
}

// ── Public API ────────────────────────────
/** A ring that fills clockwise from the top. */
export function ProgressRing({ value, size = 20, label, className }: ProgressRingProps) {
  const done = Math.min(Math.max(value, 0), 1);
  const a11y = label
    ? {
        role: "progressbar",
        "aria-label": label,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": Math.round(done * 100),
      }
    : { "aria-hidden": true };
  return (
    <span
      {...a11y}
      className={cx("iro-progress-ring", className)}
      style={{ "--ring-gap": CIRCUMFERENCE * (1 - done) } as CSSProperties}
    >
      <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden="true">
        <circle className="iro-progress-ring-track" cx="10" cy="10" r={RADIUS} />
        <circle className="iro-progress-ring-fill" cx="10" cy="10" r={RADIUS} strokeDasharray={CIRCUMFERENCE} />
      </svg>
    </span>
  );
}
