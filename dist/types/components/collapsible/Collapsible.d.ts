import type { ReactNode } from "react";
export interface CollapsibleProps {
    title: ReactNode;
    /** A short line after the title: what's set inside ("4 steps · 0.35"). */
    summary?: ReactNode;
    children: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Adds an on/off switch to the header; while off, the section dims. */
    enabled?: boolean;
    onEnabledChange?: (enabled: boolean) => void;
    /** Accessible name of the switch. */
    enabledLabel?: string;
    /** `surface` (default): a raised card. `inset`: a sunken well, for sections inside cards. */
    tone?: "surface" | "inset";
    className?: string;
}
/** An openable section with a header, an optional summary and an optional on/off switch. */
export declare function Collapsible({ title, summary, children, open, defaultOpen, onOpenChange, enabled, onEnabledChange, enabledLabel, tone, className, }: CollapsibleProps): import("react").JSX.Element;
