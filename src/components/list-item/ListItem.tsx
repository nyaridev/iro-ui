// ListItem: one row of a list (a setting, a member, a file), with an icon or avatar, a title and a line under it, a
// detail at the end and its buttons. With `onClick` the row is a button; its own buttons stay outside it, or, with
// `stretched`, the button lies under the content so chips and links in the title and description stay clickable.

// ── Dependencies ──────────────────────────
import { type HTMLAttributes, type ReactNode, useId } from "react";
import { cx } from "../shared/cx";
import { ChevronRightGlyph } from "../shared/glyphs";

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
  /** With `onClick`, the row's button lies under the content instead of around it, so buttons, chips and links in the
   *  title and description stay clickable. The button is named by the title. */
  stretched?: boolean;
  /** For a row that opens more under it: a chevron in front that turns when open, and `aria-expanded` on its button. */
  expanded?: boolean;
  /** Lets the title and description wrap instead of cutting them off; each child of `description` starts a line. */
  wrap?: boolean;
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
  stretched,
  expanded,
  wrap,
  disabled,
  as: Element = "div",
  className,
  ...rest
}: ListItemProps) {
  const titleId = useId();
  const main = (
    <>
      {expanded === undefined ? null : (
        <span className="iro-list-item-chevron" data-open={expanded || undefined}>
          <ChevronRightGlyph />
        </span>
      )}
      {start ? <span className="iro-list-item-start">{start}</span> : null}
      <span className="iro-list-item-text">
        <span id={titleId} className="iro-list-item-title">
          {title}
        </span>
        {description ? <span className="iro-list-item-description">{description}</span> : null}
      </span>
      {meta ? <span className="iro-list-item-meta">{meta}</span> : null}
    </>
  );
  const under = Boolean(onClick && stretched);
  const button = (className: string, content?: ReactNode) => (
    <button
      type="button"
      className={className}
      aria-pressed={selected}
      aria-expanded={expanded}
      aria-labelledby={content ? undefined : titleId}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
  return (
    <Element
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      data-stretched={under || undefined}
      data-wrap={wrap || undefined}
      className={cx("iro-list-item", className)}
      {...rest}
    >
      {under ? button("iro-list-item-hit") : null}
      {onClick && !under ? button("iro-list-item-main", main) : <div className="iro-list-item-main">{main}</div>}
      {actions ? <div className="iro-list-item-actions">{actions}</div> : null}
    </Element>
  );
}
