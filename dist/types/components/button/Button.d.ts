import type { ComponentProps, ReactNode } from "react";
export interface ButtonProps extends ComponentProps<"button"> {
    /** `primary` for the main action, `secondary` (default) for the rest, `danger` for destructive ones. */
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    /** An icon before the text. */
    icon?: ReactNode;
    /** An icon after the text (a chevron, an external-link mark). */
    iconEnd?: ReactNode;
    /** Working: a spinner in place of the icon, and no clicks until it's done. */
    loading?: boolean;
    /** Makes it a toggle (`aria-pressed`): a tinted fill while on. */
    pressed?: boolean;
}
/** A button with text, and optionally icons. */
export declare function Button({ variant, size, icon, iconEnd, loading, pressed, disabled, type, className, children, ...rest }: ButtonProps): import("react").JSX.Element;
