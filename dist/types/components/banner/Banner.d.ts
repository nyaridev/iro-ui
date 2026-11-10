import type { ComponentProps, ReactNode } from "react";
export interface BannerProps extends ComponentProps<"div"> {
    /** `accent` (default) for news, the status tones for the state of things. */
    tone?: "accent" | "info" | "success" | "warning" | "danger";
    /** Replaces the tone's icon (the accent tone has none). */
    icon?: ReactNode;
    /** After the text: a link or a small button. */
    actions?: ReactNode;
    /** Adds a × button that calls this. */
    onDismiss?: () => void;
    /** Accessible name of the × button. */
    dismissLabel?: string;
}
/** A full-width message with an optional action and close button. */
export declare function Banner({ tone, icon, actions, onDismiss, dismissLabel, className, children, ...rest }: BannerProps): import("react").JSX.Element;
