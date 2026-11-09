// ProgressBar: how far along something is, from 0 to 1, or `null` while it's unknown (a sliding bar). With
// `segments` it's a row of ticks instead, filled up to the value (coverage, steps done).

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
  /** Draw this many ticks, filled up to the value, instead of one bar. */
  segments?: number;
  className?: string;
}

// ── Public API ────────────────────────────
/** A thin, rounded progress bar, or a row of ticks. */
export function ProgressBar({ value, tone = "accent", size = "md", label, segments, className }: ProgressBarProps) {
  const percent = value === null ? null : Math.min(Math.max(value, 0), 1) * 100;
  const filled = segments ? Math.round(((percent ?? 0) / 100) * segments) : 0;
  return (
    <Progress.Root
      value={percent}
      aria-label={label}
      data-tone={tone}
      data-size={size}
      data-segments={segments ? true : undefined}
      className={cx("iro-progress", className)}
    >
      <Progress.Track className="iro-progress-track">
        {segments ? (
          Array.from({ length: segments }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: ticks are identical; their place is their identity.
            <span key={index} className="iro-progress-segment" data-filled={index < filled || undefined} />
          ))
        ) : (
          <Progress.Indicator className="iro-progress-indicator" />
        )}
      </Progress.Track>
    </Progress.Root>
  );
}
