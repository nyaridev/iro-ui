import type { ComponentProps, ReactNode } from "react";
export interface MarkerProps extends ComponentProps<"div"> {
    /** Before the label. */
    icon?: ReactNode;
    /** After the label: a small ghost button. */
    action?: ReactNode;
}
/** A labelled line across a conversation. */
export declare function Marker({ icon, action, className, children, ...rest }: MarkerProps): import("react").JSX.Element;
