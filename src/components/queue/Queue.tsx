// Queue: messages typed while an answer was still coming, waiting to be sent in order. Each can be sent now or taken
// out; the heading counts them.

// ── Dependencies ──────────────────────────
import { ArrowUpIcon } from "../../icons/set/arrows";
import { Icon } from "../icon/Icon";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { CloseGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface QueueItem {
  id: string;
  text: string;
}

export interface QueueProps {
  items: QueueItem[];
  onRemove: (id: string) => void;
  /** Adds a "send now" button to each. */
  onSendNow?: (id: string) => void;
  /** The heading's words (default "2 queued"). */
  label?: (count: number) => string;
  className?: string;
}

// ── Public API ────────────────────────────
/** A list of messages waiting to be sent. */
export function Queue({ items, onRemove, onSendNow, label = (count) => `${count} queued`, className }: QueueProps) {
  if (items.length === 0) return null;
  return (
    <section className={cx("iro-queue", className)} aria-label={label(items.length)}>
      <span className="iro-queue-title" aria-hidden="true">
        {label(items.length)}
      </span>
      <ol className="iro-queue-list">
        {items.map((item) => (
          <li key={item.id}>
            <span className="iro-queue-text" title={item.text}>
              {item.text}
            </span>
            {onSendNow ? (
              <IconButton
                size="sm"
                icon={<Icon icon={ArrowUpIcon} />}
                label={`Send now: ${item.text}`}
                tooltip={false}
                onClick={() => onSendNow(item.id)}
              />
            ) : null}
            <IconButton
              size="sm"
              icon={<CloseGlyph />}
              label={`Remove: ${item.text}`}
              tooltip={false}
              onClick={() => onRemove(item.id)}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
