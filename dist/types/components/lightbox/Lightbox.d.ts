import { type ReactElement, type ReactNode } from "react";
export interface LightboxImage {
    src: string;
    alt: string;
    caption?: ReactNode;
}
export interface LightboxProps {
    images: LightboxImage[];
    /** The element that opens it; leave it out and control `open` instead. */
    trigger?: ReactElement;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** The picture shown, when the app keeps it (a gallery opens at the one clicked). */
    index?: number;
    onIndexChange?: (index: number) => void;
    /** The picture shown first, when the lightbox keeps it. */
    defaultIndex?: number;
    closeLabel?: string;
    previousLabel?: string;
    nextLabel?: string;
    className?: string;
}
/** A full-window viewer for a set of pictures. */
export declare function Lightbox({ images, trigger, open, onOpenChange, index, onIndexChange, defaultIndex, closeLabel, previousLabel, nextLabel, className, }: LightboxProps): import("react").JSX.Element;
