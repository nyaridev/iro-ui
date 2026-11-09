// Breadcrumbs: the path to the page showing, each step a link back up. A long path folds its middle into a ⋯ menu.
// The last step is the current page and isn't a link.

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { IconButton } from "../icon-button/IconButton";
import { Menu } from "../menu/Menu";
import { cx } from "../shared/cx";
import { ChevronRightGlyph, MoreHorizontalGlyph } from "../shared/glyphs";
import { foldItems } from "./fold";

// ── Types ─────────────────────────────────
export interface BreadcrumbItem {
  /** The step's name; unique within the path. */
  label: string;
  href?: string;
  /** For app routing: called on click (and from the ⋯ menu) instead of following `href`. */
  onClick?: () => void;
  icon?: ReactNode;
}

export interface BreadcrumbsProps extends Omit<ComponentProps<"nav">, "children"> {
  /** From the top down; the last is the page showing. */
  items: BreadcrumbItem[];
  /** How many steps show before the middle folds into a menu (default 4). */
  max?: number;
  /** Accessible name of the ⋯ button. */
  moreLabel?: string;
}

// ── Private helpers ───────────────────────
function Step({ item, current }: { item: BreadcrumbItem; current: boolean }) {
  const content = (
    <>
      {item.icon}
      {item.label}
    </>
  );
  if (current) {
    return (
      <span className="iro-breadcrumbs-current" aria-current="page">
        {content}
      </span>
    );
  }
  if (item.href) {
    const { onClick } = item;
    return (
      <a
        className="iro-breadcrumbs-link"
        href={item.href}
        onClick={
          onClick
            ? (event) => {
                event.preventDefault();
                onClick();
              }
            : undefined
        }
      >
        {content}
      </a>
    );
  }
  return item.onClick ? (
    <button type="button" className="iro-breadcrumbs-link" onClick={item.onClick}>
      {content}
    </button>
  ) : (
    <span className="iro-breadcrumbs-text">{content}</span>
  );
}

// ── Public API ────────────────────────────
/** The path to the current page, with the middle folded when it's long. */
export function Breadcrumbs({
  items,
  max = 4,
  moreLabel = "Show the hidden steps",
  className,
  "aria-label": ariaLabel = "Breadcrumbs",
  ...rest
}: BreadcrumbsProps) {
  const { start, folded, end } = foldItems(items, max);
  const last = items.at(-1);
  const steps = [
    ...start.map((item) => ({ key: item.label, node: <Step item={item} current={item === last} /> })),
    ...(folded.length > 0
      ? [
          {
            key: "…",
            node: (
              <Menu
                trigger={<IconButton size="sm" icon={<MoreHorizontalGlyph />} label={moreLabel} tooltip={false} />}
                items={folded.map((item) => ({
                  label: item.label,
                  icon: item.icon,
                  // Without an app router, a folded link navigates like a normal one.
                  onSelect: () => (item.onClick ? item.onClick() : item.href && window.location.assign(item.href)),
                }))}
              />
            ),
          },
        ]
      : []),
    ...end.map((item) => ({ key: item.label, node: <Step item={item} current={item === last} /> })),
  ];

  return (
    <nav className={cx("iro-breadcrumbs", className)} aria-label={ariaLabel} {...rest}>
      <ol>
        {steps.map(({ key, node }, index) => (
          <li key={key}>
            {index > 0 ? (
              <span className="iro-breadcrumbs-separator" aria-hidden="true">
                <ChevronRightGlyph />
              </span>
            ) : null}
            {node}
          </li>
        ))}
      </ol>
    </nav>
  );
}
