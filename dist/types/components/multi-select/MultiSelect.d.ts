import { type SelectOption } from "../select/options";
export interface MultiSelectProps<T extends string> {
    options: SelectOption<T>[];
    value: T[];
    onValueChange: (value: T[]) => void;
    /** Shown while nothing is picked. */
    placeholder?: string;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    id?: string;
    className?: string;
    /** The accessible name when it isn't inside a Field. */
    "aria-label"?: string;
}
/** A dropdown that picks several options. */
export declare function MultiSelect<T extends string>({ options, value, onValueChange, placeholder, size, disabled, id, className, "aria-label": ariaLabel, }: MultiSelectProps<T>): import("react").JSX.Element;
