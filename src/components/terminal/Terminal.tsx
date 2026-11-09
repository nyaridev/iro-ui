// Terminal: a command's output in a dark mono well: commands after a prompt, errors in red, successes in green, notes
// muted. It follows the newest line while output streams, unless the reader has scrolled up, and copies it all.
// It shows text; it doesn't run anything or read color codes.

// ── Dependencies ──────────────────────────
import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import { CopyButton } from "../copy-button/CopyButton";
import { cx } from "../shared/cx";

// ── Constants ─────────────────────────────
/** How close to the bottom still counts as at it, in px. */
const SLACK = 24;

// ── Types ─────────────────────────────────
export type TerminalLine = string | { text: string; kind: "command" | "error" | "success" | "muted" };

export interface TerminalProps {
  lines: TerminalLine[];
  /** In the title bar: "build", a shell name. */
  title?: ReactNode;
  /** Height in px past which it scrolls (default 320). */
  maxHeight?: number;
  /** Shows a blinking cursor after the last line. */
  running?: boolean;
  className?: string;
}

// ── Private helpers ───────────────────────
const textOf = (line: TerminalLine) => (typeof line === "string" ? line : line.text);

// ── Public API ────────────────────────────
/** A scrolling block of command output. */
export function Terminal({ lines, title = "Terminal", maxHeight = 320, running = false, className }: TerminalProps) {
  const body = useRef<HTMLPreElement>(null);
  const following = useRef(true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: follows the bottom whenever lines arrive
  useEffect(() => {
    const node = body.current;
    if (node && following.current) node.scrollTop = node.scrollHeight;
  }, [lines.length]);

  return (
    <figure className={cx("iro-terminal", className)}>
      <figcaption className="iro-terminal-head">
        <span className="iro-terminal-dots" aria-hidden="true" />
        <span className="iro-terminal-title">{title}</span>
        <CopyButton text={lines.map(textOf).join("\n")} label="Copy output" />
      </figcaption>
      <pre
        ref={body}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a block that scrolls must be reachable by keyboard.
        tabIndex={0}
        data-running={running || undefined}
        className="iro-terminal-body"
        style={{ "--terminal-max": `${maxHeight}px` } as CSSProperties}
        onScroll={(event) => {
          const node = event.currentTarget;
          following.current = node.scrollHeight - node.scrollTop - node.clientHeight <= SLACK;
        }}
      >
        {lines.map((line, index) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: output only grows at the end.
            key={index}
            data-kind={typeof line === "string" ? undefined : line.kind}
            className="iro-terminal-line"
          >
            {textOf(line) || "​"}
          </span>
        ))}
      </pre>
    </figure>
  );
}
