import type { ChatSource } from "../sources/Sources";
export interface CitationProps {
    /** Its number, from 1, as in Sources. */
    index: number;
    source: ChatSource;
    className?: string;
}
/** A numbered source marker with a preview. */
export declare function Citation({ index, source, className }: CitationProps): import("react").JSX.Element;
