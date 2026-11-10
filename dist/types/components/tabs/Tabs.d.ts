import type { ReactNode } from "react";
import type { MenuEntry } from "../menu/MenuEntries";
export interface TabItem<T extends string> {
    value: T;
    label: ReactNode;
    icon?: ReactNode;
    /** After the label: a count or a status (`<Badge>`). */
    badge?: ReactNode;
    disabled?: boolean;
    /** The tab's panel; rendered under the list while the tab is picked. */
    content?: ReactNode;
    /** A checkbox before the label that turns what the tab shows on or off (a pass, a layer). */
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    /** The checkbox's name; "Use <label>" when the label is text. */
    checkLabel?: string;
    /** A chevron after the label that opens these entries; the tab itself still switches with one click. */
    menu?: MenuEntry[];
    /** The chevron's name (default "More"). */
    menuLabel?: string;
}
export interface TabsProps<T extends string> {
    tabs: TabItem<T>[];
    value: T;
    onValueChange: (value: T) => void;
    /** `line` (default) over a panel, `pill` in a tray, `nav` for app headers, `chip` that wrap, `folder` book tabs. */
    variant?: "line" | "pill" | "nav" | "chip" | "folder";
    className?: string;
    /** What the tabs switch between, for screen readers. */
    "aria-label"?: string;
}
/** Tabs with a sliding indicator, and their panels when given. */
export declare function Tabs<T extends string>({ tabs, value, onValueChange, variant, className, "aria-label": ariaLabel, }: TabsProps<T>): import("react").JSX.Element;
