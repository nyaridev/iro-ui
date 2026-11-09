// Message: one turn of a conversation. The reader's sit at the end on a tinted bubble; the assistant's span the
// column beside its avatar, so long answers read like a page; system notes are centered and muted. While an answer
// streams, a caret blinks at its end. Actions (copy, retry) show under it on hover and focus.

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface MessageProps extends Omit<ComponentProps<"article">, "children"> {
  /** Who it's from (default `assistant`). */
  from?: "user" | "assistant" | "system";
  /** The words: text, or rendered Markdown in a `Prose`. */
  children: ReactNode;
  /** Beside an assistant's message: an Avatar or an icon. */
  avatar?: ReactNode;
  /** Above the words: a name. */
  name?: ReactNode;
  /** Beside the name: "2 min ago". */
  time?: ReactNode;
  /** Above the words: Attachment chips. */
  attachments?: ReactNode;
  /** Under the words, shown on hover and focus: copy, retry, rate. */
  actions?: ReactNode;
  /** Shows a blinking caret after the words. */
  streaming?: boolean;
}

// ── Public API ────────────────────────────
/** A chat message from the reader, the assistant or the system. */
export function Message({
  from = "assistant",
  children,
  avatar,
  name,
  time,
  attachments,
  actions,
  streaming = false,
  className,
  ...rest
}: MessageProps) {
  return (
    <article
      data-from={from}
      data-streaming={streaming || undefined}
      className={cx("iro-message", className)}
      {...rest}
    >
      {avatar && from === "assistant" ? <div className="iro-message-avatar">{avatar}</div> : null}
      <div className="iro-message-main">
        {name || time ? (
          <header className="iro-message-head">
            {name ? <span className="iro-message-name">{name}</span> : null}
            {time ? <span className="iro-message-time">{time}</span> : null}
          </header>
        ) : null}
        {attachments ? <div className="iro-message-attachments">{attachments}</div> : null}
        <div className="iro-message-content">{children}</div>
        {actions ? <div className="iro-message-actions">{actions}</div> : null}
      </div>
    </article>
  );
}
