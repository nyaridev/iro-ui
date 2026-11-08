import type { ReactNode } from "react";
export interface TabItem<T extends string> {
    value: T;
    label: ReactNode;
    icon?: ReactNode;
    disabled?: boolean;
    /** The tab's panel; rendered under the list while the tab is picked. */
    content?: ReactNode;
}
export interface TabsProps<T extends string> {
    tabs: TabItem<T>[];
    value: T;
    onValueChange: (value: T) => void;
    /** `line` (default): an underline, for switching panels. `pill`: a raised pill, for page headers. */
    variant?: "line" | "pill";
    className?: string;
    /** What the tabs switch between, for screen readers. */
    "aria-label"?: string;
}
/** Tabs with a sliding indicator, and their panels when given. */
export declare function Tabs<T extends string>({ tabs, value, onValueChange, variant, className, "aria-label": ariaLabel, }: TabsProps<T>): import("react").JSX.Element;
