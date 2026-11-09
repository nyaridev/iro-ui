// DatePicker: a field that shows the picked day and opens a Calendar under it. Picking a day closes it; the value
// stays a "YYYY-MM-DD" string, shown in the reader's language.

// ── Dependencies ──────────────────────────
import { useState } from "react";
import { CalendarIcon } from "../../icons/set/places";
import { Calendar, type CalendarProps } from "../calendar/Calendar";
import { Icon } from "../icon/Icon";
import { Popover } from "../popover/Popover";
import { dateText } from "../range-calendar/calendar";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface DatePickerProps extends Omit<CalendarProps, "className"> {
  /** Shown while no day is picked (default "Pick a day"). */
  placeholder?: string;
  /** How the day reads in the field (default "9 Nov 2026" in the reader's language). */
  format?: (day: string) => string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Marks it wrong; inside a Field, `error` does this already. */
  invalid?: boolean;
  id?: string;
  className?: string;
  /** The accessible name when it isn't inside a Field. */
  "aria-label"?: string;
}

// ── Private helpers ───────────────────────
const mediumDay = (day: string) => dateText(day, { day: "numeric", month: "short", year: "numeric" });

// ── Public API ────────────────────────────
/** A field that opens a calendar to pick a day. */
export function DatePicker({
  value,
  onValueChange,
  placeholder = "Pick a day",
  format = mediumDay,
  size = "md",
  disabled,
  invalid,
  id,
  className,
  "aria-label": ariaLabel,
  ...calendar
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      align="start"
      className="iro-date-picker-popup"
      trigger={
        <button
          type="button"
          id={id}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-invalid={invalid || undefined}
          data-size={size}
          data-invalid={invalid || undefined}
          className={cx("iro-select", "iro-date-picker", className)}
        >
          <span className="iro-select-lead">
            <Icon icon={CalendarIcon} />
          </span>
          <span className={value ? "iro-select-value" : "iro-select-value iro-select-placeholder"}>
            {value ? format(value) : placeholder}
          </span>
        </button>
      }
    >
      <Calendar
        {...calendar}
        value={value}
        onValueChange={(day) => {
          onValueChange(day);
          setOpen(false);
        }}
      />
    </Popover>
  );
}
