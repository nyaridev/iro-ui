import type { ComponentProps, ReactNode } from "react";
export interface SectionTitleProps extends Omit<ComponentProps<"div">, "title"> {
    icon?: ReactNode;
    /** Buttons at the end of the row: "Reset", a ⋯ menu. */
    actions?: ReactNode;
    /** The heading level (default 3). */
    level?: 2 | 3 | 4;
}
/** An uppercase section heading with an icon and actions. */
export declare function SectionTitle({ icon, actions, level, className, children, ...rest }: SectionTitleProps): import("react").JSX.Element;
