import type { ComponentProps } from "react";
export interface ButtonGroupProps extends ComponentProps<"div"> {
    /** `horizontal` (default) or `vertical`. */
    orientation?: "horizontal" | "vertical";
}
/** Joins its buttons into one row or column. */
export declare function ButtonGroup({ orientation, className, ...rest }: ButtonGroupProps): import("react").JSX.Element;
