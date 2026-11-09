// PromptInput: the box to ask in. The text grows with what's typed; Enter sends and Shift+Enter starts a new line
// (not while an input method is composing). Attachments sit above the text, the app's tools (attach, a mode picker)
// in the bar under it, and the send button turns into a stop button while an answer streams.

// ── Dependencies ──────────────────────────
import type { FormEvent, KeyboardEvent, ReactNode } from "react";
import { ArrowUpIcon } from "../../icons/set/arrows";
import { StopIcon } from "../../icons/set/media";
import { Icon } from "../icon/Icon";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { TextArea } from "../text-area/TextArea";

// ── Types ─────────────────────────────────
export interface PromptInputProps {
  value: string;
  onValueChange: (value: string) => void;
  /** Called with the text on Enter or the send button; clearing it is up to the app. */
  onSubmit: (value: string) => void;
  placeholder?: string;
  /** An answer is streaming: the send button becomes a stop button. */
  streaming?: boolean;
  onStop?: () => void;
  /** Above the text: Attachment chips. */
  attachments?: ReactNode;
  /** At the start of the bar: an attach button, a mode picker. */
  tools?: ReactNode;
  /** The most rows the text grows to before it scrolls (default 8). */
  maxRows?: number;
  disabled?: boolean;
  sendLabel?: string;
  stopLabel?: string;
  className?: string;
  /** Names the text box (default "Message"). */
  "aria-label"?: string;
}

// ── Public API ────────────────────────────
/** A message box with attachments, tools and a send button. */
export function PromptInput({
  value,
  onValueChange,
  onSubmit,
  placeholder = "Ask anything",
  streaming = false,
  onStop,
  attachments,
  tools,
  maxRows = 8,
  disabled,
  sendLabel = "Send",
  stopLabel = "Stop",
  className,
  "aria-label": ariaLabel = "Message",
}: PromptInputProps) {
  const ready = value.trim() !== "" && !disabled && !streaming;
  const send = (event?: FormEvent) => {
    event?.preventDefault();
    if (ready) onSubmit(value);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      send();
    }
  };

  return (
    <form className={cx("iro-prompt-input", className)} data-disabled={disabled || undefined} onSubmit={send}>
      {attachments ? <div className="iro-prompt-input-attachments">{attachments}</div> : null}
      <TextArea
        className="iro-prompt-input-text"
        aria-label={ariaLabel}
        placeholder={placeholder}
        value={value}
        rows={1}
        maxRows={maxRows}
        resizable={false}
        disabled={disabled}
        onChange={(event) => onValueChange(event.currentTarget.value)}
        onKeyDown={onKeyDown}
      />
      <div className="iro-prompt-input-bar">
        <div className="iro-prompt-input-tools">{tools}</div>
        {streaming ? (
          <IconButton variant="secondary" icon={<Icon icon={StopIcon} />} label={stopLabel} onClick={onStop} />
        ) : (
          <IconButton
            type="submit"
            variant="primary"
            icon={<Icon icon={ArrowUpIcon} />}
            label={sendLabel}
            disabled={!ready}
          />
        )}
      </div>
    </form>
  );
}
