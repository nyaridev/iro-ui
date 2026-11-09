// Suggestions: prompts to start from, as pills: picking one hands its text to the app (to send, or to put in the
// box). They wrap onto more lines when the row is full.

// ── Dependencies ──────────────────────────
import type { ReactNode } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
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

// ── Public API ────────────────────────────
/** A row of prompt suggestions. */
export function Suggestions({
  suggestions,
  onPick,
  className,
  "aria-label": ariaLabel = "Suggestions",
}: SuggestionsProps) {
  const items = suggestions.map((item) => (typeof item === "string" ? { text: item } : item));
  return (
    <ul aria-label={ariaLabel} className={cx("iro-suggestions", className)}>
      {items.map(({ text, icon }) => (
        <li key={text}>
          <button type="button" className="iro-suggestion" onClick={() => onPick(text)}>
            {icon}
            {text}
          </button>
        </li>
      ))}
    </ul>
  );
}
