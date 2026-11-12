import { type SelectOption } from "../select/options";
export interface SingleSelectProps<T extends string> {
    options: SelectOption<T>[];
    value: T | null;
    onValueChange: (value: T | null) => void;
    /** Shown while nothing is picked. */
    placeholder?: string;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    id?: string;
    className?: string;
    /** The accessible name when it isn't inside a Field. */
    "aria-label"?: string;
}
/** A dropdown that picks one option, with no text to type. */
export declare function SingleSelect<T extends string>({ options, value, onValueChange, placeholder, size, disabled, id, className, "aria-label": ariaLabel, }: SingleSelectProps<T>): import("react").JSX.Element;
