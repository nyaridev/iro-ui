import type { ComponentProps, ReactNode } from "react";
export interface AppSidebarItem {
    /** Names the page; `current` matches it. */
    id: string;
    label: string;
    icon: ReactNode;
    href?: string;
    onClick?: () => void;
    /** At the row's end: a count, a badge. */
    badge?: ReactNode;
}
export interface AppSidebarSection {
    /** A small heading above the items; hidden while folded. */
    title?: string;
    items: AppSidebarItem[];
}
export interface AppSidebarProps extends Omit<ComponentProps<"nav">, "children"> {
    sections: AppSidebarSection[];
    /** The id of the page showing. */
    current?: string;
    header?: ReactNode;
    footer?: ReactNode;
    /** Folds it to its icons. */
    collapsed?: boolean;
    /** Adds a fold button at the bottom that calls this. */
    onCollapsedChange?: (collapsed: boolean) => void;
    /** Accessible name of the fold button. */
    collapseLabel?: string;
}
/** An app's side navigation that can fold to icons. */
export declare function AppSidebar({ sections, current, header, footer, collapsed, onCollapsedChange, collapseLabel, className, "aria-label": ariaLabel, ...rest }: AppSidebarProps): import("react").JSX.Element;
