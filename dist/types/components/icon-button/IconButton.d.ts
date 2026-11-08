import type { ComponentProps, ReactNode } from "react";
export interface IconButtonProps extends Omit<ComponentProps<"button">, "children"> {
    icon: ReactNode;
    /** What the button does. Required: it's the accessible name and the tooltip. */
    label: string;
    /** A keyboard shortcut shown in the tooltip: `"Ctrl K"`. */
    shortcut?: string;
    /** Show `label` as a tooltip on hover and focus (default true). */
    tooltip?: boolean;
    variant?: "ghost" | "secondary" | "primary" | "danger";
    size?: "sm" | "md" | "lg";
    /** On, for toggles: accent icon on a field fill (`aria-pressed`). */
    active?: boolean;
    /** Working: a spinner in place of the icon, and no clicks until it's done. */
    loading?: boolean;
}
/** A button that shows only an icon, with its label as a tooltip. */
export declare function IconButton({ icon, label, shortcut, tooltip, variant, size, active, loading, disabled, type, className, ...rest }: IconButtonProps): import("react").JSX.Element;
