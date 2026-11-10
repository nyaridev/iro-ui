import { type TextFieldProps } from "../text-field/TextField";
export interface TimeFieldProps extends Omit<TextFieldProps, "type" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step"> {
    /** "HH:MM", or "HH:MM:SS" with `seconds`; "" for none. */
    value: string;
    onValueChange: (value: string) => void;
    /** Asks for seconds too. */
    seconds?: boolean;
    /** The earliest and latest times, "HH:MM". */
    min?: string;
    max?: string;
}
/** A field for a time of day. */
export declare function TimeField({ value, onValueChange, seconds, className, ...rest }: TimeFieldProps): import("react").JSX.Element;
