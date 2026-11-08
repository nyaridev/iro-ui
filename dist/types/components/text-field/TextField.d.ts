import type { ComponentProps, ReactNode } from "react";
export interface TextFieldProps extends Omit<ComponentProps<"input">, "size"> {
    size?: "sm" | "md" | "lg";
    /** Before the text: a search icon, a prefix. */
    start?: ReactNode;
    /** After the text: a unit, a clear button. */
    end?: ReactNode;
    /** Marks it wrong; inside a Field, `error` does this already. */
    invalid?: boolean;
}
/** A text input in the style's field look. `className` and `style` go on the outer box; the rest on the input. */
export declare function TextField({ size, start, end, invalid, className, style, ...rest }: TextFieldProps): import("react").JSX.Element;
