import type { ComponentProps, ReactNode } from "react";
export interface BreadcrumbItem {
    /** The step's name; unique within the path. */
    label: string;
    href?: string;
    /** For app routing: called on click (and from the ⋯ menu) instead of following `href`. */
    onClick?: () => void;
    icon?: ReactNode;
}
export interface BreadcrumbsProps extends Omit<ComponentProps<"nav">, "children"> {
    /** From the top down; the last is the page showing. */
    items: BreadcrumbItem[];
    /** How many steps show before the middle folds into a menu (default 4). */
    max?: number;
    /** Accessible name of the ⋯ button. */
    moreLabel?: string;
}
/** The path to the current page, with the middle folded when it's long. */
export declare function Breadcrumbs({ items, max, moreLabel, className, "aria-label": ariaLabel, ...rest }: BreadcrumbsProps): import("react").JSX.Element;
