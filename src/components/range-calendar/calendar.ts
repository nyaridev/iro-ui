// Day math for RangeCalendar and Calendar. Days are "YYYY-MM-DD" strings (UTC), the form date filters take, so
// comparing two days is comparing text. Weeks start on Monday.

// ── Constants ─────────────────────────────
const DAY_MS = 24 * 3600_000;

/** The short weekday names, Monday first, in the reader's language. 1 January 2024 was a Monday. */
export const WEEKDAYS = Array.from({ length: 7 }, (_, index) =>
  new Date(Date.UTC(2024, 0, 1 + index)).toLocaleDateString(undefined, { weekday: "short", timeZone: "UTC" }),
);

// ── Types ─────────────────────────────────
/** A range of days; `to` is "" while only the first day is picked. */
export interface DayRange {
  from: string;
  to: string;
}

export interface Month {
  year: number;
  /** 0–11 */
  month: number;
}

// ── Public API ────────────────────────────
export const dayMs = (day: string) => Date.parse(`${day}T00:00:00Z`);
export const dayOf = (ms: number) => new Date(ms).toISOString().slice(0, 10);
export const addDays = (day: string, count: number) => dayOf(dayMs(day) + count * DAY_MS);
/** Days from `a` to `b`, negative when `b` comes first. */
export const daysBetween = (a: string, b: string) => Math.round((dayMs(b) - dayMs(a)) / DAY_MS);

/** Today on this computer's clock, as a day. */
export function todayOf(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export const monthOf = (day: string): Month => ({ year: Number(day.slice(0, 4)), month: Number(day.slice(5, 7)) - 1 });
export const sameMonth = (a: Month, b: Month) => a.year === b.year && a.month === b.month;

/** The month `by` months away. */
export function shiftMonth(month: Month, by: number): Month {
  const date = new Date(Date.UTC(month.year, month.month + by, 1));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() };
}

/** The same day of the month `by` months away, or that month's last day when it's shorter. */
export function shiftDay(day: string, by: number): string {
  const month = shiftMonth(monthOf(day), by);
  const last = new Date(Date.UTC(month.year, month.month + 1, 0)).getUTCDate();
  return dayOf(Date.UTC(month.year, month.month, Math.min(Number(day.slice(8)), last)));
}

/** The six weeks a month shows, Monday first, with the neighbouring months' days around it. */
export function monthGrid(month: Month): string[] {
  const first = Date.UTC(month.year, month.month, 1);
  const lead = (new Date(first).getUTCDay() + 6) % 7;
  return Array.from({ length: 42 }, (_, index) => dayOf(first + (index - lead) * DAY_MS));
}

/** A day in the reader's language. */
export const dateText = (day: string, options: Intl.DateTimeFormatOptions) =>
  new Date(`${day}T00:00:00Z`).toLocaleDateString(undefined, { ...options, timeZone: "UTC" });

/** "Monday, 9 November 2026", what a day button is called. */
export const longDay = (day: string) =>
  dateText(day, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

/** "November 2026". */
export const monthTitle = (month: Month) =>
  dateText(`${month.year}-${String(month.month + 1).padStart(2, "0")}-01`, { month: "long", year: "numeric" });

/** The day a key moves the focus to from `day`, or null for other keys: arrows by a day or a week, Home and End to
 *  the week's ends, Page Up and Down by a month. */
export function dayAfterKey(key: string, day: string): string | null {
  const weekday = (new Date(`${day}T00:00:00Z`).getUTCDay() + 6) % 7;
  if (key === "ArrowLeft") return addDays(day, -1);
  if (key === "ArrowRight") return addDays(day, 1);
  if (key === "ArrowUp") return addDays(day, -7);
  if (key === "ArrowDown") return addDays(day, 7);
  if (key === "Home") return addDays(day, -weekday);
  if (key === "End") return addDays(day, 6 - weekday);
  if (key === "PageUp" || key === "PageDown") return shiftDay(day, key === "PageUp" ? -1 : 1);
  return null;
}

/** The range after a click on `day`: the first click starts it, the second ends it (in either order), and a click
 *  after a whole range starts a new one. */
export function pickDay(range: DayRange, day: string): DayRange {
  if (!range.from || range.to) return { from: day, to: "" };
  return day < range.from ? { from: day, to: range.from } : { from: range.from, to: day };
}
