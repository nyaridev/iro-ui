import type { ComponentProps, ReactNode } from "react";
export interface NoticeProps extends Omit<ComponentProps<"div">, "title"> {
    /** `info`: something to know or pick. `warning`: something missing. `danger`: something broken. */
    tone?: "info" | "success" | "warning" | "danger";
    title?: ReactNode;
    /** Replaces the tone's icon. */
    icon?: ReactNode;
    /** The buttons that fix it. */
    actions?: ReactNode;
}
/** An inline message with an icon, text and optional actions. */
export declare function Notice({ tone, title, icon, actions, className, children, ...rest }: NoticeProps): import("react").JSX.Element;
