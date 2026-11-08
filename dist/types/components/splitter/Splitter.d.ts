import { type RefObject } from "react";
export interface SplitterProps {
    /** The row both panes sit in; shares are fractions of its width. */
    container: RefObject<HTMLElement | null>;
    /** The start pane's share of the row (0–1). */
    share: number;
    onShareChange: (share: number) => void;
    onCommit?: (share: number) => void;
    /** Double-click; usually sets the default share back. */
    onReset?: () => void;
    min?: number;
    max?: number;
    /** Neither pane gets narrower than this many pixels. */
    minStart?: number;
    minEnd?: number;
    /** Accessible name. */
    label?: string;
    className?: string;
}
/** A draggable, keyboard-operable divider between two panes. */
export declare function Splitter({ container, share, onShareChange, onCommit, onReset, min, max, minStart, minEnd, label, className, }: SplitterProps): import("react").JSX.Element;
