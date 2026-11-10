import { type ComponentProps, type ReactNode } from "react";
export interface ImageProps extends Omit<ComponentProps<"img">, "children"> {
    /** Required: it's read out, and shown if the image fails. */
    alt: string;
    /** Width over height, as a number (16 / 9) or CSS ("4 / 3"); keeps the space while it loads. */
    ratio?: number | string;
    /** How it fills a `ratio` box (default "cover"). */
    fit?: "cover" | "contain";
    caption?: ReactNode;
    /** In place of the icon and alt text when it fails. */
    fallback?: ReactNode;
}
/** An img with loading and failed states. */
export declare function Image({ src, alt, ratio, fit, caption, fallback, onLoad, onError, className, style, ...rest }: ImageProps): import("react").JSX.Element;
