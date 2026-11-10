import { type ComponentProps } from "react";
export interface CounterProps extends Omit<ComponentProps<"span">, "children"> {
    value: number;
    /** How the number reads while counting and after (default: rounded, with the locale's separators). */
    format?: (value: number) => string;
}
/** A number that counts up or down to each new value. */
export declare function Counter({ value, format, className, ...rest }: CounterProps): import("react").JSX.Element;
