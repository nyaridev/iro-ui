import type { ComponentProps } from "react";
export interface PanelProps extends ComponentProps<"div"> {
    /** The element: a `section` or `aside` when the panel is a landmark. */
    as?: "div" | "section" | "aside";
    /** Inner padding (default true). */
    padded?: boolean;
}
/** A card-like surface with a border and the style's card shadow. */
export declare function Panel({ as: Element, padded, className, ...rest }: PanelProps): import("react").JSX.Element;
