// UsageMeter: how much of a limit is used (an assistant's context, a plan's quota), as a small ring and a percent
// that opens the details: used of total, and what it's made of.

// ── Dependencies ──────────────────────────
import type { ChartPart } from "../chart/types";
import { Popover } from "../popover/Popover";
import { ProgressBar } from "../progress-bar/ProgressBar";
import { ProgressRing } from "../progress-ring/ProgressRing";
import { ShareBar } from "../share-bar/ShareBar";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface UsageMeterProps {
  used: number;
  total: number;
  /** What's measured (default "Context"); the popup's title and the button's name. */
  label?: string;
  /** After the numbers: "tokens". */
  unit?: string;
  /** What the used part is made of, drawn as a split bar. */
  parts?: ChartPart[];
  /** How numbers read (default compact: "84K"). */
  format?: (value: number) => string;
  className?: string;
}

// ── Private helpers ───────────────────────
const compact = new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 });

// ── Public API ────────────────────────────
/** A usage ring that opens its breakdown. */
export function UsageMeter({
  used,
  total,
  label = "Context",
  unit = "",
  parts,
  format = (value) => compact.format(value),
  className,
}: UsageMeterProps) {
  const share = total > 0 ? Math.min(used / total, 1) : 0;
  const percent = `${Math.round(share * 100)}%`;
  const amount = `${format(used)} of ${format(total)}${unit ? ` ${unit}` : ""}`;
  return (
    <Popover
      title={label}
      side="top"
      align="end"
      className="iro-usage-meter-popup"
      trigger={
        <button
          type="button"
          aria-label={`${label}: ${percent} used`}
          data-level={share >= 0.9 ? "high" : undefined}
          className={cx("iro-usage-meter", className)}
        >
          <ProgressRing value={share} size={16} />
          <span>{percent}</span>
        </button>
      }
    >
      <div className="iro-usage-meter-details">
        <span className="iro-usage-meter-amount">{amount}</span>
        <ProgressBar value={share} size="sm" tone={share >= 0.9 ? "danger" : "accent"} label={`${label} used`} />
        {parts && parts.length > 0 ? <ShareBar label={`${label} by part`} parts={parts} format={format} /> : null}
      </div>
    </Popover>
  );
}
