// ListItem: one row of a list (a setting, a member, a file), with an icon or avatar, a title and a line under it, a
// detail at the end and its buttons. With `onClick` the row is a button; its own buttons stay outside it.

// ── Dependencies ──────────────────────────
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface ListItemProps extends Omit<HTMLAttributes<HTMLElement>, "title" | "onClick"> {
  title: ReactNode;
  /** A line under the title. */
  description?: ReactNode;
  /** Before the text: an icon, an avatar. */
  start?: ReactNode;
  /** After the text: a time, a badge, a count. */
  meta?: ReactNode;
  /** At the end of the row, outside the row's button: a switch, a menu. */
  actions?: ReactNode;
  /** Makes the row a button. */
  onClick?: () => void;
  /** Marks the row picked (`aria-pressed` when it's a button). */
  selected?: boolean;
  disabled?: boolean;
  /** `li` when it sits in a `ul` (default `div`). */
  as?: "div" | "li";
}

// ── Public API ────────────────────────────
/** A list row with an icon, text, a detail and actions. */
export function ListItem({
  title,
  description,
  start,
  meta,
  actions,
  onClick,
  selected,
  disabled,
  as: Element = "div",
  className,
  ...rest
}: ListItemProps) {
  const main = (
    <>
      {start ? <span className="iro-list-item-start">{start}</span> : null}
      <span className="iro-list-item-text">
        <span className="iro-list-item-title">{title}</span>
        {description ? <span className="iro-list-item-description">{description}</span> : null}
      </span>
      {meta ? <span className="iro-list-item-meta">{meta}</span> : null}
    </>
  );
  return (
    <Element
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      className={cx("iro-list-item", className)}
      {...rest}
    >
      {onClick ? (
        <button
          type="button"
          className="iro-list-item-main"
          aria-pressed={selected}
          disabled={disabled}
          onClick={onClick}
        >
          {main}
        </button>
      ) : (
        <div className="iro-list-item-main">{main}</div>
      )}
      {actions ? <div className="iro-list-item-actions">{actions}</div> : null}
    </Element>
  );
}
