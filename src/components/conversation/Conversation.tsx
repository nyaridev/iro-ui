// Conversation: the scrolling column of messages. It stays at the bottom while messages arrive or an answer grows,
// unless the reader has scrolled up to read; then a "Latest" button takes them back down. Base UI has no
// scroll-follow, so it's hand-built: a ResizeObserver on the content, and the scroll position as the reader's intent.

// ── Dependencies ──────────────────────────
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { motionOf } from "../../effects/motion";
import { Button } from "../button/Button";
import { cx } from "../shared/cx";
import { ArrowDownGlyph } from "../shared/glyphs";

// ── Constants ─────────────────────────────
/** How close to the bottom still counts as at it, in px. */
const SLACK = 48;

// ── Types ─────────────────────────────────
export interface ConversationProps extends ComponentProps<"div"> {
  /** An answer is streaming: screen readers wait for it to finish before reading it. */
  busy?: boolean;
  /** The text of the button back to the newest message. */
  latestLabel?: string;
}

// ── Private helpers ───────────────────────
function scrollToBottom(node: HTMLElement | null, smooth: boolean) {
  node?.scrollTo({ top: node.scrollHeight, behavior: smooth ? "smooth" : "auto" });
}

// ── Public API ────────────────────────────
/** A scrolling list of messages that follows the newest one. */
export function Conversation({
  busy = false,
  latestLabel = "Latest",
  className,
  children,
  "aria-label": ariaLabel = "Conversation",
  ...rest
}: ConversationProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const following = useRef(true);
  const [away, setAway] = useState(false);

  // When the content grows and the reader was at the bottom, keep them there.
  useEffect(() => {
    const node = content.current;
    if (!node) return;
    const observer = new ResizeObserver(() => {
      if (following.current) scrollToBottom(scroller.current, false);
    });
    observer.observe(node);
    scrollToBottom(scroller.current, false);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cx("iro-conversation", className)}>
      <div
        ref={scroller}
        role="log"
        aria-label={ariaLabel}
        aria-busy={busy || undefined}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrolling region must be reachable by keyboard.
        tabIndex={0}
        className="iro-conversation-scroller"
        onScroll={(event) => {
          const node = event.currentTarget;
          const atBottom = node.scrollHeight - node.scrollTop - node.clientHeight <= SLACK;
          following.current = atBottom;
          setAway(!atBottom);
        }}
        {...rest}
      >
        <div ref={content} className="iro-conversation-content">
          {children}
        </div>
      </div>
      {away ? (
        <Button
          size="sm"
          icon={<ArrowDownGlyph />}
          className="iro-conversation-latest"
          onClick={() => {
            following.current = true;
            scrollToBottom(scroller.current, ["full", "smooth"].includes(motionOf(scroller.current)));
          }}
        >
          {latestLabel}
        </Button>
      ) : null}
    </div>
  );
}
