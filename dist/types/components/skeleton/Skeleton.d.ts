import type { ComponentProps, CSSProperties } from "react";
export interface SkeletonProps extends ComponentProps<"span"> {
    /** CSS width: `120`, `"60%"`. Default: the full row. */
    width?: CSSProperties["width"];
    /** CSS height; default one line of text. */
    height?: CSSProperties["height"];
    /** `circle` for avatars. */
    shape?: "block" | "circle";
}
/** A pulsing placeholder the size of what's coming. */
export declare function Skeleton({ width, height, shape, className, style, ...rest }: SkeletonProps): import("react").JSX.Element;
