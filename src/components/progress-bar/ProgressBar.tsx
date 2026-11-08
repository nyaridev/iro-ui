// ProgressBar: how far along something is, from 0 to 1, or `null` while it's unknown (a sliding bar).

// ── Dependencies ──────────────────────────
import { Progress } from "@base-ui/react/progress";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface ProgressBarProps {
  /** 0 to 1, or null when how far along isn't known. */
  value: number | null;
  tone?: "accent" | "success" | "danger";
  size?: "sm" | "md";
  /** What's in progress, for screen readers. */
  label?: string;
  className?: string;
}

// ── Public API ────────────────────────────
/** A thin, rounded progress bar. */
export function ProgressBar({ value, tone = "accent", size = "md", label, className }: ProgressBarProps) {
  const percent = value === null ? null : Math.min(Math.max(value, 0), 1) * 100;
  return (
    <Progress.Root
      value={percent}
      aria-label={label}
      data-tone={tone}
      data-size={size}
      className={cx("iro-progress", className)}
    >
      <Progress.Track className="iro-progress-track">
        <Progress.Indicator className="iro-progress-indicator" />
      </Progress.Track>
    </Progress.Root>
  );
}
