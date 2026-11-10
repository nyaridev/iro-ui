import { type ComponentProps, type ReactNode } from "react";
export interface CarouselProps extends Omit<ComponentProps<"section">, "children"> {
    /** The slides, one child each. */
    children: ReactNode;
    /** What it shows, for screen readers: "Featured projects". */
    label: string;
    /** How many slides show at once (default 1). */
    perView?: number;
    /** Dots under the slides, one per position (default true). */
    dots?: boolean;
    previousLabel?: string;
    nextLabel?: string;
}
/** Slides that scroll sideways, with arrows and dots. */
export declare function Carousel({ children, label, perView, dots, previousLabel, nextLabel, className, style, ...rest }: CarouselProps): import("react").JSX.Element;
