import type { ReactNode } from "react";
export interface SuggestionItem {
    text: string;
    icon?: ReactNode;
}
export interface SuggestionsProps {
    suggestions: (string | SuggestionItem)[];
    onPick: (text: string) => void;
    className?: string;
    /** Names the group for screen readers (default "Suggestions"). */
    "aria-label"?: string;
}
/** A row of prompt suggestions. */
export declare function Suggestions({ suggestions, onPick, className, "aria-label": ariaLabel, }: SuggestionsProps): import("react").JSX.Element;
