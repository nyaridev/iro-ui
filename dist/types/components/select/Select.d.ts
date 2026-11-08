import { type SelectOption } from "./options";
export interface SelectProps<T extends string> {
    options: SelectOption<T>[];
    value: T | null;
    onValueChange: (value: T | null) => void;
    placeholder?: string;
    /** Shown when typing matches nothing. */
    emptyText?: string;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    /** Marks it wrong; inside a Field, `error` does this already. */
    invalid?: boolean;
    id?: string;
    className?: string;
    /** The accessible name when it isn't inside a Field. */
    "aria-label"?: string;
    /** Accessible name of the arrow button. */
    openLabel?: string;
}
/** A searchable dropdown that picks one option. */
export declare function Select<T extends string>({ options, value, onValueChange, placeholder, emptyText, size, disabled, invalid, id, className, "aria-label": ariaLabel, openLabel, }: SelectProps<T>): import("react").JSX.Element;
