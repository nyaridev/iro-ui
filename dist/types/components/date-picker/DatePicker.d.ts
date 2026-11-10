import { type CalendarProps } from "../calendar/Calendar";
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
/** A field that opens a calendar to pick a day. */
export declare function DatePicker({ value, onValueChange, placeholder, format, size, disabled, invalid, id, className, "aria-label": ariaLabel, ...calendar }: DatePickerProps): import("react").JSX.Element;
