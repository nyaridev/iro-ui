import type { ReactNode } from "react";
export interface AutocompleteProps {
    /** What's typed. */
    value: string;
    onValueChange: (value: string) => void;
    /** The suggestions; the ones with every typed word show. */
    suggestions: string[];
    placeholder?: string;
    /** Before the text: a search icon. */
    start?: ReactNode;
    /** Shown when typing matches no suggestion; left out, the list just closes. */
    emptyText?: string;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    /** Marks it wrong; inside a Field, `error` does this already. */
    invalid?: boolean;
    id?: string;
    className?: string;
    /** The accessible name when it isn't inside a Field. */
    "aria-label"?: string;
}
/** A text field with suggestions. */
export declare function Autocomplete({ value, onValueChange, suggestions, placeholder, start, emptyText, size, disabled, invalid, id, className, "aria-label": ariaLabel, }: AutocompleteProps): import("react").JSX.Element;
