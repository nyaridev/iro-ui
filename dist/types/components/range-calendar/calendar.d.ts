/** The short weekday names, Monday first, in the reader's language. 1 January 2024 was a Monday. */
export declare const WEEKDAYS: string[];
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
export declare const dayMs: (day: string) => number;
export declare const dayOf: (ms: number) => string;
export declare const addDays: (day: string, count: number) => string;
/** Days from `a` to `b`, negative when `b` comes first. */
export declare const daysBetween: (a: string, b: string) => number;
/** Today on this computer's clock, as a day. */
export declare function todayOf(now?: Date): string;
export declare const monthOf: (day: string) => Month;
export declare const sameMonth: (a: Month, b: Month) => boolean;
/** The month `by` months away. */
export declare function shiftMonth(month: Month, by: number): Month;
/** The same day of the month `by` months away, or that month's last day when it's shorter. */
export declare function shiftDay(day: string, by: number): string;
/** The six weeks a month shows, Monday first, with the neighbouring months' days around it. */
export declare function monthGrid(month: Month): string[];
/** A day in the reader's language. */
export declare const dateText: (day: string, options: Intl.DateTimeFormatOptions) => string;
/** "Monday, 9 November 2026", what a day button is called. */
export declare const longDay: (day: string) => string;
/** "November 2026". */
export declare const monthTitle: (month: Month) => string;
/** The day a key moves the focus to from `day`, or null for other keys: arrows by a day or a week, Home and End to
 *  the week's ends, Page Up and Down by a month. */
export declare function dayAfterKey(key: string, day: string): string | null;
/** The range after a click on `day`: the first click starts it, the second ends it (in either order), and a click
 *  after a whole range starts a new one. */
export declare function pickDay(range: DayRange, day: string): DayRange;
