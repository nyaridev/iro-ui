import type { ReactNode } from "react";
/** A page or document an answer used. */
export interface ChatSource {
    title: string;
    href: string;
    /** The site or publisher: "example.com". */
    site?: string;
    /** A line about what's there. */
    description?: ReactNode;
}
export interface SourcesProps {
    sources: ChatSource[];
    /** The line's words (default "Used 4 sources"). */
    label?: (count: number) => string;
    defaultOpen?: boolean;
    className?: string;
}
/** A folding, numbered list of an answer's sources. */
export declare function Sources({ sources, label, defaultOpen, className, }: SourcesProps): import("react").JSX.Element;
