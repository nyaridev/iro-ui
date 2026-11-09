// Stat: one number that matters, with its label, how it changed, a line of context and an optional small chart. On a
// card by default, or plain for a row of stats inside one.

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { Panel } from "../panel/Panel";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface StatProps extends Omit<ComponentProps<"div">, "children"> {
  label: ReactNode;
  /** The number, formatted: "1.28M", or a Counter. */
  value: ReactNode;
  /** Beside the value: a Trend, a Badge. */
  change?: ReactNode;
  /** Before the label. */
  icon?: ReactNode;
  /** A line under the value: "36 of 50 GB". */
  hint?: ReactNode;
  /** Under everything, full width: a Sparkline, a ProgressBar. */
  chart?: ReactNode;
  /** `card` (default): on a panel. `plain`: no box. */
  variant?: "card" | "plain";
}

// ── Public API ────────────────────────────
/** A labelled number with its change and an optional chart. */
export function Stat({ label, value, change, icon, hint, chart, variant = "card", className, ...rest }: StatProps) {
  const body = (
    <>
      <span className="iro-stat-label">
        {icon}
        {label}
      </span>
      <span className="iro-stat-value">{value}</span>
      {change ? <span className="iro-stat-change">{change}</span> : null}
      {hint ? <span className="iro-stat-hint">{hint}</span> : null}
      {chart ? <div className="iro-stat-chart">{chart}</div> : null}
    </>
  );
  return variant === "card" ? (
    <Panel data-variant={variant} className={cx("iro-stat", className)} {...rest}>
      {body}
    </Panel>
  ) : (
    <div data-variant={variant} className={cx("iro-stat", className)} {...rest}>
      {body}
    </div>
  );
}
