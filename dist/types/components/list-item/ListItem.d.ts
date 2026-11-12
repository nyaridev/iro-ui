import { type HTMLAttributes, type ReactNode } from "react";
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
    /** With `onClick`, the row's button lies under the content instead of around it, so buttons, chips and links in the
     *  title and description stay clickable. The button is named by the title. */
    stretched?: boolean;
    /** For a row that opens more under it: a chevron in front that turns when open, and `aria-expanded` on its button. */
    expanded?: boolean;
    /** Lets the title and description wrap instead of cutting them off; each child of `description` starts a line. */
    wrap?: boolean;
    disabled?: boolean;
    /** `li` when it sits in a `ul` (default `div`). */
    as?: "div" | "li";
}
/** A list row with an icon, text, a detail and actions. */
export declare function ListItem({ title, description, start, meta, actions, onClick, selected, stretched, expanded, wrap, disabled, as: Element, className, ...rest }: ListItemProps): import("react").JSX.Element;
