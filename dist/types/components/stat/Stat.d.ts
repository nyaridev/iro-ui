import type { ComponentProps, ReactNode } from "react";
export interface StatProps extends Omit<ComponentProps<"div">, "children"> {
    label: ReactNode;
    /** The number, formatted: "1.28M", or a Counter. */
    value: ReactNode;
    /** Beside the value: a Trend, a Badge. */
    change?: ReactNode;
    /** Before the label. */
    icon?: ReactNode;
    /** A line under the value: "36 of 50 GB". */
    hint?: ReactNode;
    /** Under everything, full width: a Sparkline, a ProgressBar. */
    chart?: ReactNode;
    /** `card` (default): on a panel. `plain`: no box. */
    variant?: "card" | "plain";
}
/** A labelled number with its change and an optional chart. */
export declare function Stat({ label, value, change, icon, hint, chart, variant, className, ...rest }: StatProps): import("react").JSX.Element;
