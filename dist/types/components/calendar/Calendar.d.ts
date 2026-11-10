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
/** A month grid for picking one day. */
export declare function Calendar({ value, onValueChange, earliest, latest, isDayDisabled, today, className, }: CalendarProps): import("react").JSX.Element;
