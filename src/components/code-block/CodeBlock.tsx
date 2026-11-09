// CodeBlock: code to read and copy, in the mono font on a sunken well, with optional line numbers, highlighted lines
// and a title bar with the file name and language. It colors nothing itself: an app with a highlighter passes its
// colored lines, and `code` stays what the copy button copies.

// ── Dependencies ──────────────────────────
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { CopyButton } from "../copy-button/CopyButton";
import { cx } from "../shared/cx";
import { linesOf } from "./lines";

// ── Types ─────────────────────────────────
export interface CodeBlockProps extends Omit<ComponentProps<"figure">, "children" | "title"> {
  code: string;
  /** Shown in the title bar: "tsx", "bash". */
  language?: string;
  /** A file name or title for the title bar. */
  title?: ReactNode;
  lineNumbers?: boolean;
  /** Lines to mark, counted from 1. */
  highlight?: number[];
  /** Colored lines from the app's own highlighter, one per line of `code`. */
  lines?: ReactNode[];
  /** Height in px past which it scrolls. */
  maxHeight?: number;
  /** Wraps long lines instead of scrolling sideways. */
  wrap?: boolean;
  /** Name and tooltip of the copy button (default "Copy code"). */
  copyLabel?: string;
}

// ── Public API ────────────────────────────
/** A block of code with a copy button. */
export function CodeBlock({
  code,
  language,
  title,
  lineNumbers = false,
  highlight = [],
  lines,
  maxHeight,
  wrap = false,
  copyLabel = "Copy code",
  className,
  style,
  ...rest
}: CodeBlockProps) {
  const shown = lines ?? linesOf(code);
  const marked = new Set(highlight);
  const head = title || language;

  return (
    <figure
      data-numbers={lineNumbers || undefined}
      data-wrap={wrap || undefined}
      className={cx("iro-code-block", className)}
      style={{ "--code-digits": String(shown.length).length, ...style } as CSSProperties}
      {...rest}
    >
      {head ? (
        <figcaption className="iro-code-block-head">
          {title ? <span className="iro-code-block-title">{title}</span> : null}
          {language ? <span className="iro-code-block-language">{language}</span> : null}
          <CopyButton text={code} label={copyLabel} />
        </figcaption>
      ) : (
        <CopyButton className="iro-code-block-copy" text={code} label={copyLabel} />
      )}
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: a block that scrolls must be reachable by keyboard. */}
      <pre className="iro-code-block-pre" style={{ maxHeight }} tabIndex={0}>
        <code>
          {shown.map((line, index) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: a line is its place in the code.
              key={index}
              className="iro-code-block-line"
              data-line={index + 1}
              data-marked={marked.has(index + 1) || undefined}
            >
              {line === "" ? "​" : line}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
