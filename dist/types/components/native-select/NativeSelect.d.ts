import type { ComponentProps } from "react";
export interface NativeSelectProps extends Omit<ComponentProps<"select">, "size" | "multiple"> {
    size?: "sm" | "md" | "lg";
    /** Marks it wrong; inside a Field, `error` does this already. */
    invalid?: boolean;
}
/** The browser's select, styled like Select. */
export declare function NativeSelect({ size, invalid, className, style, children, ...rest }: NativeSelectProps): import("react").JSX.Element;
