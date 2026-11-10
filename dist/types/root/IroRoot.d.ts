import { type ComponentProps } from "react";
export interface IroRootProps extends ComponentProps<"div"> {
    /** The style: `kon`, `sumi`… (its CSS must be imported). */
    styleName: string;
    /** One of the style's themes; leave it out, or name the default (`light` in kami, `dark` in sumi and kon). */
    theme?: string;
    /** One of the style's accents; leave it out for the style's default (the first in its `accents.css`). */
    accent?: string;
    /** How much things move: `full`, `smooth` (no overshoot), `reduced` (fades only) or `off`. Leave it out to follow
     *  the system's reduced-motion setting. */
    motion?: "full" | "smooth" | "reduced" | "off";
}
/** The element floating layers portal into: the nearest IroRoot's layer, or null outside any root. */
export declare function useIroLayer(): HTMLElement | null;
/** Sets `data-iro-style`, `-theme`, `-accent` and `-motion` on a div, paints the style's background, and keeps popups
 *  inside. */
export declare function IroRoot({ styleName, theme, accent, motion, className, children, ...rest }: IroRootProps): import("react").JSX.Element;
