export interface TagInputProps {
    value: string[];
    onValueChange: (tags: string[]) => void;
    placeholder?: string;
    /** The most tags; the field stops taking more. */
    max?: number;
    size?: "sm" | "md";
    disabled?: boolean;
    /** Marks it wrong; inside a Field, `error` does this already. */
    invalid?: boolean;
    id?: string;
    className?: string;
    /** The accessible name when it isn't inside a Field. */
    "aria-label"?: string;
    /** Names a tag's × button (default "Remove <tag>"). */
    removeLabel?: (tag: string) => string;
}
/** A field of removable tags. */
export declare function TagInput({ value, onValueChange, placeholder, max, size, disabled, invalid, id, className, "aria-label": ariaLabel, removeLabel, }: TagInputProps): import("react").JSX.Element;
