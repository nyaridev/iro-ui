import type { ComponentProps, ReactNode } from "react";
export interface BadgeProps extends ComponentProps<"span"> {
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | "info";
    icon?: ReactNode;
}
/** A small tinted label. */
export declare function Badge({ tone, icon, className, children, ...rest }: BadgeProps): import("react").JSX.Element;
