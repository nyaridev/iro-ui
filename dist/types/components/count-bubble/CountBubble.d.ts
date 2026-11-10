import type { ComponentProps } from "react";
export interface CountBubbleProps extends Omit<ComponentProps<"span">, "children"> {
    count: number;
    /** The largest number shown before "+" (default 99). */
    max?: number;
    /** `danger` (default) for things that need a look, `accent` for plain counts. */
    tone?: "danger" | "accent";
    /** Sit on the parent's top-right corner. */
    corner?: boolean;
}
/** A count bubble; nothing when the count is zero or less. */
export declare function CountBubble({ count, max, tone, corner, className, ...rest }: CountBubbleProps): import("react").JSX.Element | null;
