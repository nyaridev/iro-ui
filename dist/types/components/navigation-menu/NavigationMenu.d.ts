import type { ReactNode } from "react";
export interface NavigationMenuLink {
    label: string;
    href: string;
    /** A line under the label. */
    description?: ReactNode;
    icon?: ReactNode;
}
export interface NavigationMenuItem {
    /** The item's name in the bar; unique within it. */
    label: string;
    /** A plain link when the item has no panel. */
    href?: string;
    /** The panel's links, two across when there are more than three. */
    links?: NavigationMenuLink[];
    /** A panel of your own, in place of `links`. */
    content?: ReactNode;
    /** Marks the item of the page showing. */
    current?: boolean;
}
export interface NavigationMenuProps {
    items: NavigationMenuItem[];
    className?: string;
    /** Names the navigation for screen readers (default "Main"). */
    "aria-label"?: string;
}
/** A top navigation bar whose items can open panels of links. */
export declare function NavigationMenu({ items, className, "aria-label": ariaLabel }: NavigationMenuProps): import("react").JSX.Element;
