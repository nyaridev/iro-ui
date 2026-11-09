// RangeCalendar: pick a range of days on a month grid. Click the first day, then the last (in either order); while the
// end is open, the range follows the pointer. `maxDays` greys out days that would make it longer, `latest` the days
// after it. A line under the grid says what to do next or how many days are picked; only a whole range reaches
// `onRangeChange`. Keys: arrows move a day or a week, Page Up / Down a month, Home / End the week, Enter or Space
// picks, Escape drops a started range. Base UI has no calendar, so this one is hand-built.

// ── Dependencies ──────────────────────────
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { ChevronLeftGlyph, ChevronRightGlyph } from "../shared/glyphs";
import {
  type DayRange,
  dateText,
  dayAfterKey,
  daysBetween,
  longDay,
  monthGrid,
  monthOf,
  monthTitle,
  pickDay,
  sameMonth,
  shiftMonth,
  todayOf,
  WEEKDAYS,
} from "./calendar";

// ── Types ─────────────────────────────────
export interface RangeCalendarProps {
  /** The picked range; "" for none. */
  from: string;
  to: string;
  onRangeChange: (range: DayRange) => void;
  /** The longest range, counting both ends. */
  maxDays?: number;
  /** The last day that can be picked ("" for none); default today. */
  latest?: string;
  /** Today's date, marked with a dot; default this computer's. Fixed values keep screenshots stable. */
  today?: string;
  className?: string;
}

// ── Private helpers ───────────────────────
const shortDay = (day: string) => dateText(day, { day: "numeric", month: "short" });

// ── Public API ────────────────────────────
/** A month grid for picking a range of days. */
export function RangeCalendar({
  from,
  to,
  onRangeChange,
  maxDays,
  today = todayOf(),
  latest = today,
  className,
}: RangeCalendarProps) {
  // A range whose last day isn't picked yet.
  const [draft, setDraft] = useState<DayRange | null>(null);
  const shown = draft ?? { from, to };
  const [view, setView] = useState(() => monthOf(to || from || today));
  const [hover, setHover] = useState<string | null>(null);
  const [focusDay, setFocusDay] = useState(to || from || today);
  const grid = useRef<HTMLDivElement>(null);
  const keyed = useRef(false);

  // A range set from outside (a quick pick, Clear) shows its month and drops a started one.
  useEffect(() => {
    setDraft(null);
    if (to || from) {
      setView(monthOf(to || from));
      setFocusDay(to || from);
    }
  }, [from, to]);

  // After a key moved the focus, put it on that day's button.
  useEffect(() => {
    if (!keyed.current) return;
    keyed.current = false;
    grid.current?.querySelector<HTMLElement>(`[data-day="${focusDay}"]`)?.focus();
  });

  const tooFar = (day: string) => Boolean(draft && maxDays && Math.abs(daysBetween(draft.from, day)) > maxDays - 1);
  const disabled = (day: string) => Boolean(latest && day > latest) || tooFar(day);

  const pick = (day: string) => {
    if (disabled(day)) return;
    const next = pickDay(shown, day);
    if (next.to) {
      setDraft(null);
      onRangeChange(next);
    } else setDraft(next);
  };

  // The band to paint: the range, or the started one up to the hovered day.
  const end = shown.to || (draft && hover && !disabled(hover) ? hover : "");
  const low = end && end < shown.from ? end : shown.from;
  const high = end && end < shown.from ? shown.from : end || shown.from;

  const moveTo = (day: string) => {
    const target = latest && day > latest ? latest : day;
    keyed.current = true;
    setFocusDay(target);
    if (!sameMonth(monthOf(target), view)) setView(monthOf(target));
  };
  const onKeyDown = (event: KeyboardEvent, day: string) => {
    const target = dayAfterKey(event.key, day);
    if (target) {
      event.preventDefault();
      moveTo(target);
    } else if (event.key === "Escape" && draft) {
      // Drops the started range; a second Escape closes whatever the calendar sits in.
      event.preventDefault();
      event.stopPropagation();
      setDraft(null);
    }
  };

  const span = shown.from && shown.to ? daysBetween(shown.from, shown.to) + 1 : 0;
  const lastMonth = latest ? monthOf(latest) : null;
  const title = monthTitle(view);

  return (
    <div className={cx("iro-calendar", className)}>
      <div className="iro-calendar-head">
        <IconButton
          icon={<ChevronLeftGlyph />}
          size="sm"
          label="Previous month"
          tooltip={false}
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
      <div
        ref={grid}
        role="group"
        aria-label={title}
        className="iro-calendar-grid"
        onPointerLeave={() => setHover(null)}
      >
        {WEEKDAYS.map((weekday) => (
          <span key={weekday} aria-hidden="true" className="iro-calendar-weekday">
            {weekday}
          </span>
        ))}
        {monthGrid(view).map((day) => {
          const isLow = low !== "" && day === low;
          const isHigh = high !== "" && day === high;
          const inside = low !== "" && day > low && day < high;
          return (
            <div
              key={day}
              className="iro-calendar-cell"
              data-band={inside || ((isLow || isHigh) && high !== low) || undefined}
              data-start={(isLow && high !== low) || undefined}
              data-end={(isHigh && high !== low) || undefined}
            >
              <button
                type="button"
                data-day={day}
                data-edge={isLow || isHigh || undefined}
                data-inside={inside || undefined}
                data-outside={!sameMonth(monthOf(day), view) || undefined}
                data-today={day === today || undefined}
                tabIndex={day === focusDay ? 0 : -1}
                disabled={disabled(day)}
                aria-label={longDay(day)}
                aria-pressed={isLow || isHigh || inside}
                aria-current={day === today ? "date" : undefined}
                className="iro-calendar-day"
                onClick={() => pick(day)}
                onPointerEnter={() => setHover(day)}
                onFocus={() => setFocusDay(day)}
                onKeyDown={(event) => onKeyDown(event, day)}
              >
                {Number(day.slice(8))}
              </button>
            </div>
          );
        })}
      </div>
      <p className="iro-calendar-status" aria-live="polite">
        {draft
          ? `From ${shortDay(draft.from)}: now pick the last day${maxDays ? ` (${maxDays} days at most)` : ""}.`
          : span
            ? `${shortDay(shown.from)} – ${shortDay(shown.to)} · ${span} ${span === 1 ? "day" : "days"}`
            : "Pick the first day, then the last."}
      </p>
    </div>
  );
}
