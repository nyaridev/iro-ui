// TimeField: a time of day, "14:30", typed into the browser's own time input inside the TextField look. It follows
// the reader's 12- or 24-hour clock, steps each part with the arrow keys and gives screen readers each part, which a
// hand-built field would have to redo.

// ── Dependencies ──────────────────────────
import { cx } from "../shared/cx";
import { TextField, type TextFieldProps } from "../text-field/TextField";

// ── Types ─────────────────────────────────
export interface TimeFieldProps
  extends Omit<TextFieldProps, "type" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step"> {
  /** "HH:MM", or "HH:MM:SS" with `seconds`; "" for none. */
  value: string;
  onValueChange: (value: string) => void;
  /** Asks for seconds too. */
  seconds?: boolean;
  /** The earliest and latest times, "HH:MM". */
  min?: string;
  max?: string;
}

// ── Public API ────────────────────────────
/** A field for a time of day. */
export function TimeField({ value, onValueChange, seconds = false, className, ...rest }: TimeFieldProps) {
  return (
    <TextField
      type="time"
      value={value}
      step={seconds ? 1 : 60}
      onChange={(event) => onValueChange(event.currentTarget.value)}
      className={cx("iro-time-field", className)}
      {...rest}
    />
  );
}
