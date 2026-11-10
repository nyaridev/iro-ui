import type { ComponentProps } from "react";
export interface InlineInputProps extends Omit<ComponentProps<"input">, "size"> {
    /** Dimmed and italic: comments, disabled lines. */
    muted?: boolean;
    /** Monospace: lines of a list, paths. */
    mono?: boolean;
    /** `lg`: a title edited in place. */
    size?: "md" | "lg";
}
/** A text input that looks like plain text until it's pointed at or focused. */
export declare function InlineInput({ muted, mono, size, className, ...rest }: InlineInputProps): import("react").JSX.Element;
