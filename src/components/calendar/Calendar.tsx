// Calendar: pick one day on a month grid. Same keys and look as RangeCalendar (its styles and day math are shared):
// arrows move a day or a week, Page Up / Down a month, Home / End the week, Enter or Space picks.

// ── Dependencies ──────────────────────────
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { IconButton } from "../icon-button/IconButton";
import {
  dayAfterKey,
  longDay,
  monthGrid,
  monthOf,
  monthTitle,
  sameMonth,
  shiftMonth,
  todayOf,
  WEEKDAYS,
} from "../range-calendar/calendar";
import { cx } from "../shared/cx";
import { ChevronLeftGlyph, ChevronRightGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface CalendarProps {
  /** The picked day, "YYYY-MM-DD"; "" for none. */
  value: string;
  onValueChange: (day: string) => void;
  /** The first and last days that can be picked ("" for no limit). */
  earliest?: string;
  latest?: string;
  /** Days that can't be picked inside the limits: weekends, booked days. */
  isDayDisabled?: (day: string) => boolean;
  /** Today's date, marked with a dot; default this computer's. Fixed values keep screenshots stable. */
  today?: string;
  className?: string;
}

// ── Public API ────────────────────────────
/** A month grid for picking one day. */
export function Calendar({
  value,
  onValueChange,
  earliest = "",
  latest = "",
  isDayDisabled,
  today = todayOf(),
  className,
}: CalendarProps) {
  const [view, setView] = useState(() => monthOf(value || today));
  const [focusDay, setFocusDay] = useState(value || today);
  const grid = useRef<HTMLDivElement>(null);
  const keyed = useRef(false);

  // A day set from outside shows its month.
  useEffect(() => {
    if (!value) return;
    setView(monthOf(value));
    setFocusDay(value);
  }, [value]);

  // After a key moved the focus, put it on that day's button.
  useEffect(() => {
    if (!keyed.current) return;
    keyed.current = false;
    grid.current?.querySelector<HTMLElement>(`[data-day="${focusDay}"]`)?.focus();
  });

  const disabled = (day: string) =>
    Boolean((earliest && day < earliest) || (latest && day > latest) || isDayDisabled?.(day));

  const onKeyDown = (event: KeyboardEvent, day: string) => {
    const target = dayAfterKey(event.key, day);
    if (!target) return;
    event.preventDefault();
    const bounded = earliest && target < earliest ? earliest : latest && target > latest ? latest : target;
    keyed.current = true;
    setFocusDay(bounded);
    if (!sameMonth(monthOf(bounded), view)) setView(monthOf(bounded));
  };

  const title = monthTitle(view);
  const firstMonth = earliest ? monthOf(earliest) : null;
  const lastMonth = latest ? monthOf(latest) : null;

  return (
    <div className={cx("iro-calendar", className)}>
      <div className="iro-calendar-head">
        <IconButton
          icon={<ChevronLeftGlyph />}
          size="sm"
          label="Previous month"
          tooltip={false}
          disabled={Boolean(firstMonth && sameMonth(view, firstMonth))}
          onClick={() => setView(shiftMonth(view, -1))}
        />
        <span className="iro-calendar-title" aria-live="polite">
          {title}
        </span>
        <IconButton
          icon={<ChevronRightGlyph />}
          size="sm"
          label="Next month"
          tooltip={false}
          disabled={Boolean(lastMonth && sameMonth(view, lastMonth))}
          onClick={() => setView(shiftMonth(view, 1))}
        />
      </div>
      {/* biome-ignore lint/a11y/useSemanticElements: a fieldset can't be a grid container in every browser */}
      <div ref={grid} role="group" aria-label={title} className="iro-calendar-grid">
        {WEEKDAYS.map((weekday) => (
          <span key={weekday} aria-hidden="true" className="iro-calendar-weekday">
            {weekday}
          </span>
        ))}
        {monthGrid(view).map((day) => (
          <div key={day} className="iro-calendar-cell">
            <button
              type="button"
              data-day={day}
              data-edge={day === value || undefined}
              data-outside={!sameMonth(monthOf(day), view) || undefined}
              data-today={day === today || undefined}
              tabIndex={day === focusDay ? 0 : -1}
              disabled={disabled(day)}
              aria-label={longDay(day)}
              aria-pressed={day === value}
              aria-current={day === today ? "date" : undefined}
              className="iro-calendar-day"
              onClick={() => onValueChange(day)}
              onFocus={() => setFocusDay(day)}
              onKeyDown={(event) => onKeyDown(event, day)}
            >
              {Number(day.slice(8))}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
