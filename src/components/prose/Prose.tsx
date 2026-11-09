// Prose: styles long-form text an app renders from Markdown or a CMS (headings, paragraphs, lists, links, quotes,
// code, tables, images), so it reads well in every style. It doesn't parse anything: put the rendered HTML inside.

// ── Dependencies ──────────────────────────
import type { ComponentProps } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface ProseProps extends ComponentProps<"div"> {
  /** `md` (default) for articles and docs, `sm` for chat replies and side panels. */
  size?: "sm" | "md";
}

// ── Public API ────────────────────────────
/** A wrapper that styles the rendered text inside it. */
export function Prose({ size = "md", className, ...rest }: ProseProps) {
  return <div data-size={size} className={cx("iro-prose", className)} {...rest} />;
}
