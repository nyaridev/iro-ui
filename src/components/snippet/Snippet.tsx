// Snippet: a one-line command to copy ("pnpm add iro-ui"), after a "$" prompt, with a copy button at the end. For
// more than a line, use CodeBlock.

// ── Dependencies ──────────────────────────
import { CopyButton } from "../copy-button/CopyButton";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface SnippetProps {
  code: string;
  /** The "$" before it (default true); off for things that aren't commands. */
  prompt?: boolean;
  /** Name and tooltip of the copy button (default "Copy command"). */
  copyLabel?: string;
  className?: string;
}

// ── Public API ────────────────────────────
/** A one-line command with a copy button. */
export function Snippet({ code, prompt = true, copyLabel = "Copy command", className }: SnippetProps) {
  return (
    <div data-prompt={prompt || undefined} className={cx("iro-snippet", className)}>
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: a line that scrolls must be reachable by keyboard. */}
      <code className="iro-snippet-code" tabIndex={0}>
        {code}
      </code>
      <CopyButton text={code} label={copyLabel} />
    </div>
  );
}
