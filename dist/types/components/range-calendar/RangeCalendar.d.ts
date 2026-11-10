import { type DayRange } from "./calendar";
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
/** A month grid for picking a range of days. */
export declare function RangeCalendar({ from, to, onRangeChange, maxDays, today, latest, className, }: RangeCalendarProps): import("react").JSX.Element;
