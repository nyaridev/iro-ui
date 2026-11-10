import type { HTMLAttributes, ReactNode } from "react";
export interface ListItemProps extends Omit<HTMLAttributes<HTMLElement>, "title" | "onClick"> {
    title: ReactNode;
    /** A line under the title. */
    description?: ReactNode;
    /** Before the text: an icon, an avatar. */
    start?: ReactNode;
    /** After the text: a time, a badge, a count. */
    meta?: ReactNode;
    /** At the end of the row, outside the row's button: a switch, a menu. */
    actions?: ReactNode;
    /** Makes the row a button. */
    onClick?: () => void;
    /** Marks the row picked (`aria-pressed` when it's a button). */
    selected?: boolean;
    disabled?: boolean;
    /** `li` when it sits in a `ul` (default `div`). */
    as?: "div" | "li";
}
/** A list row with an icon, text, a detail and actions. */
export declare function ListItem({ title, description, start, meta, actions, onClick, selected, disabled, as: Element, className, ...rest }: ListItemProps): import("react").JSX.Element;
