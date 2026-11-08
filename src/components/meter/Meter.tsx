// Meter: how full something is (memory, disk, a quota): a caps label, a short bar and the value. The bar turns the
// warning color past 75% and the danger color past 90%, unless `tone` is off. Base UI's meter.

// ── Dependencies ──────────────────────────
import { Meter as BaseMeter } from "@base-ui/react/meter";
import { cx } from "../shared/cx";

// ── Constants ─────────────────────────────
const WARN_AT = 0.75;
const DANGER_AT = 0.9;

// ── Types ─────────────────────────────────
export interface MeterProps {
  value: number;
  min?: number;
  max?: number;
  label: string;
  /** The value as read out and shown after the bar: "6.1 / 8 GB". Default: the percentage. */
  valueText?: string;
  /** Color the bar by how full it is (default true). */
  tone?: boolean;
  className?: string;
}

// ── Public API ────────────────────────────
/** A labelled meter with a bar that warns as it fills. */
export function Meter({ value, min = 0, max = 100, label, valueText, tone = true, className }: MeterProps) {
  const share = max > min ? Math.min(Math.max((value - min) / (max - min), 0), 1) : 0;
  const text = valueText ?? `${Math.round(share * 100)}%`;
  const level = !tone ? undefined : share > DANGER_AT ? "danger" : share > WARN_AT ? "warning" : undefined;

  return (
    <BaseMeter.Root
      value={value}
      min={min}
      max={max}
      getAriaValueText={() => text}
      data-level={level}
      className={cx("iro-meter", className)}
    >
      <BaseMeter.Label className="iro-meter-label">{label}</BaseMeter.Label>
      <BaseMeter.Track className="iro-meter-track">
        <BaseMeter.Indicator className="iro-meter-fill" />
      </BaseMeter.Track>
      <span className="iro-meter-value">{text}</span>
    </BaseMeter.Root>
  );
}
