// Citation: a small numbered marker in an answer's text that links to its source and previews it on hover and
// focus, matching the numbers in Sources.

// ── Dependencies ──────────────────────────
import { HoverCard } from "../hover-card/HoverCard";
import { cx } from "../shared/cx";
import type { ChatSource } from "../sources/Sources";

// ── Types ─────────────────────────────────
export interface CitationProps {
  /** Its number, from 1, as in Sources. */
  index: number;
  source: ChatSource;
  className?: string;
}

// ── Public API ────────────────────────────
/** A numbered source marker with a preview. */
export function Citation({ index, source, className }: CitationProps) {
  return (
    <HoverCard
      delay={300}
      className="iro-citation-card"
      trigger={
        <a
          href={source.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Source ${index}: ${source.title}`}
          className={cx("iro-citation", className)}
        >
          {index}
        </a>
      }
    >
      {source.site ? <span className="iro-citation-site">{source.site}</span> : null}
      <strong className="iro-citation-title">{source.title}</strong>
      {source.description ? <span className="iro-citation-description">{source.description}</span> : null}
    </HoverCard>
  );
}
