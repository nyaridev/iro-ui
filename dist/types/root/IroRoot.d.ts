import { type ComponentProps } from "react";
export interface IroRootProps extends ComponentProps<"div"> {
    /** The style: `kon`, `sumi`… (its CSS must be imported). */
    styleName: string;
    /** One of the style's themes; leave it out for the style's default. */
    theme?: string;
    /** One of the style's accents; leave it out for the style's default. */
    accent?: string;
}
/** The element floating layers portal into: the nearest IroRoot's layer, or null outside any root. */
export declare function useIroLayer(): HTMLElement | null;
/** Sets `data-iro-style`, `-theme` and `-accent` on a div, paints the style's background, and keeps popups inside. */
export declare function IroRoot({ styleName, theme, accent, className, children, ...rest }: IroRootProps): import("react").JSX.Element;
