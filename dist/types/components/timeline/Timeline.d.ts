import type { ComponentProps, ReactNode } from "react";
export interface TimelineItem {
    id: string;
    title: ReactNode;
    /** At the end of the title row: "2 min ago", or a `<time>`. */
    time?: ReactNode;
    /** A line under the title. */
    description?: ReactNode;
    /** Under the description: a quote, a code block, a card. */
    content?: ReactNode;
    /** In place of the dot: an icon or an avatar. */
    icon?: ReactNode;
    /** Colors the dot or icon (default neutral). */
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | "info";
}
export interface TimelineProps extends Omit<ComponentProps<"ol">, "children"> {
    items: TimelineItem[];
}
/** A list of events on a line. */
export declare function Timeline({ items, className, ...rest }: TimelineProps): import("react").JSX.Element;
