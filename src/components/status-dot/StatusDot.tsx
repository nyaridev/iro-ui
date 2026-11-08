// StatusDot: a small colored dot for a state (running, stopped, syncing). With `pulse`, rings ripple out of it like a
// heartbeat: slowly when idle, steadily when working, fast when something's wrong (UmeSync's hub dot).

// ── Dependencies ──────────────────────────
import type { ComponentProps } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface StatusDotProps extends ComponentProps<"span"> {
  tone?: "neutral" | "accent" | "success" | "warning" | "danger" | "info";
  /** Rings ripple out at this pace; leave it out for a still dot. */
  pulse?: "slow" | "steady" | "fast";
  /** What the state is, for screen readers ("Hub running"). Without it the dot is decoration. */
  label?: string;
}

// ── Public API ────────────────────────────
/** A colored status dot, optionally pulsing. */
export function StatusDot({ tone = "neutral", pulse, label, className, ...rest }: StatusDotProps) {
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
  return (
    <span {...a11y} data-tone={tone} data-pulse={pulse} className={cx("iro-status-dot", className)} {...rest}>
      {pulse ? (
        <>
          <span className="iro-status-dot-ring" />
          <span className="iro-status-dot-ring" data-late="" />
        </>
      ) : null}
      <span className="iro-status-dot-core" />
    </span>
  );
}
