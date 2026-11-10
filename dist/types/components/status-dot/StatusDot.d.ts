import type { ComponentProps } from "react";
export interface StatusDotProps extends ComponentProps<"span"> {
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | "info";
    /** Rings ripple out at this pace; leave it out for a still dot. */
    pulse?: "slow" | "steady" | "fast";
    /** What the state is, for screen readers ("Hub running"). Without it the dot is decoration. */
    label?: string;
}
/** A colored status dot, optionally pulsing. */
export declare function StatusDot({ tone, pulse, label, className, ...rest }: StatusDotProps): import("react").JSX.Element;
