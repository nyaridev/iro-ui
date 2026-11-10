import type { ComponentProps } from "react";
export interface SparklineProps extends Omit<ComponentProps<"div">, "children"> {
    values: number[];
    /** What the trend is, for screen readers: "Requests, last 14 days". */
    label: string;
    /** Any CSS color (default the first chart color). */
    color?: string;
    /** A soft wash under the line. */
    area?: boolean;
    /** Height in pixels (default 32); the width follows the container. */
    height?: number;
    /** How the first and last values read to screen readers (default: in full). */
    format?: (value: number) => string;
}
/** A small trend line that fills its container's width. */
export declare function Sparkline({ values, label, color, area, height, format, className, style, ...rest }: SparklineProps): import("react").JSX.Element;
