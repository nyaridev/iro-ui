// Sources: the pages an answer drew on, folded under "Used 4 sources" and numbered so Citation markers in the text
// match them. Base UI's collapsible does the folding.

// ── Dependencies ──────────────────────────
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { cx } from "../shared/cx";
import { ChevronDownGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
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

// ── Public API ────────────────────────────
/** A folding, numbered list of an answer's sources. */
export function Sources({
  sources,
  label = (count) => `Used ${count} ${count === 1 ? "source" : "sources"}`,
  defaultOpen = false,
  className,
}: SourcesProps) {
  return (
    <BaseCollapsible.Root defaultOpen={defaultOpen} className={cx("iro-sources", className)}>
      <BaseCollapsible.Trigger className="iro-sources-trigger">
        {label(sources.length)}
        <ChevronDownGlyph />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="iro-sources-panel">
        <ol className="iro-sources-list">
          {sources.map((source, index) => (
            <li key={source.href}>
              <span className="iro-sources-number">{index + 1}</span>
              <a href={source.href} target="_blank" rel="noreferrer" className="iro-sources-link">
                <span className="iro-sources-title">{source.title}</span>
                {source.site ? <span className="iro-sources-site">{source.site}</span> : null}
              </a>
            </li>
          ))}
        </ol>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
