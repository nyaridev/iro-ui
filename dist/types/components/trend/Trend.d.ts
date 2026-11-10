import type { ComponentProps } from "react";
export interface TrendProps extends Omit<ComponentProps<"span">, "children"> {
    /** The change, signed: `8.4`, `-0.3`. */
    value: number;
    /** Which way is good (default `up`); `down` for errors and latency, `none` to show no judgment. */
    good?: "up" | "down" | "none";
    /** How the number reads, given the signed value (default `+8.4%`). */
    format?: (value: number) => string;
    /** Words after the number: "vs yesterday". */
    context?: string;
    /** `badge` (default): on a soft tint. `text`: just colored text, for tight rows. */
    variant?: "badge" | "text";
}
/** A change with an arrow, colored by whether it went the good way. */
export declare function Trend({ value, good, format, context, variant, className, ...rest }: TrendProps): import("react").JSX.Element;
