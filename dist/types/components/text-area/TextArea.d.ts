import type { ComponentProps } from "react";
export interface TextAreaProps extends ComponentProps<"textarea"> {
    /** Marks it wrong; inside a Field, `error` does this already. */
    invalid?: boolean;
}
/** A multi-line text input that resizes vertically. */
export declare function TextArea({ invalid, className, ...rest }: TextAreaProps): import("react").JSX.Element;
