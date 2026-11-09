// Timeline: events in order (an activity feed, a deploy's history), each a dot or icon on a line, with its title,
// time and an optional line or block of detail.

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface TimelineItem {
  id: string;
  title: ReactNode;
  /** At the end of the title row: "2 min ago", or a `<time>`. */
  time?: ReactNode;
  /** A line under the title. */
  description?: ReactNode;
  /** Under the description: a quote, a code block, a card. */
  content?: ReactNode;
  /** In place of the dot: an icon or an avatar. */
  icon?: ReactNode;
  /** Colors the dot or icon (default neutral). */
  tone?: "neutral" | "accent" | "success" | "warning" | "danger" | "info";
}

export interface TimelineProps extends Omit<ComponentProps<"ol">, "children"> {
  items: TimelineItem[];
}

// ── Public API ────────────────────────────
/** A list of events on a line. */
export function Timeline({ items, className, ...rest }: TimelineProps) {
  return (
    <ol className={cx("iro-timeline", className)} {...rest}>
      {items.map(({ id, title, time, description, content, icon, tone = "neutral" }) => (
        <li key={id} data-tone={tone}>
          <span className="iro-timeline-marker" data-icon={icon ? "" : undefined} aria-hidden="true">
            {icon}
          </span>
          <div className="iro-timeline-body">
            <div className="iro-timeline-head">
              <span className="iro-timeline-title">{title}</span>
              {time ? <span className="iro-timeline-time">{time}</span> : null}
            </div>
            {description ? <div className="iro-timeline-description">{description}</div> : null}
            {content ? <div className="iro-timeline-content">{content}</div> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
