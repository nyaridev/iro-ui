import type { ComponentProps, ReactNode } from "react";
export interface EmptyStateProps extends Omit<ComponentProps<"div">, "title"> {
    title: ReactNode;
    icon?: ReactNode;
    /** The button (or two) that fills the area. */
    action?: ReactNode;
    /** `warning` when it's empty because something's wrong (a missing folder). */
    tone?: "neutral" | "warning";
}
/** A centered placeholder for an empty list, gallery or panel. */
export declare function EmptyState({ title, icon, action, tone, className, children, ...rest }: EmptyStateProps): import("react").JSX.Element;
