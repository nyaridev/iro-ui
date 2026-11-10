import { type ReactNode } from "react";
export interface VeilProps {
    /** Blur the content (until it's revealed). */
    active: boolean;
    children: ReactNode;
    /** The tag on the veil (default "NSFW"). */
    label?: string;
    /** Only the tag, without "Click to reveal": for small tiles. */
    compact?: boolean;
    /** When it's clicked open: a carousel can remember which images were revealed. */
    onReveal?: () => void;
    className?: string;
}
/** Content that stays blurred until clicked. */
export declare function Veil({ active, children, label, compact, onReveal, className }: VeilProps): import("react").JSX.Element;
