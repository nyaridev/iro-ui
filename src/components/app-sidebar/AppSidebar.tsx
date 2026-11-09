// AppSidebar: an app's main navigation down the side: a header (the brand, a workspace switcher), sections of pages
// with icons and counts, and a footer (the account, a usage meter). It can fold to its icons, each then showing its
// name as a tooltip. On a phone, put it in a Sheet.

// ── Dependencies ──────────────────────────
import type { ComponentProps, ReactNode } from "react";
import { SidebarIcon } from "../../icons/set/layout";
import { Icon } from "../icon/Icon";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { Tooltip } from "../tooltip/Tooltip";

// ── Types ─────────────────────────────────
export interface AppSidebarItem {
  /** Names the page; `current` matches it. */
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  /** At the row's end: a count, a badge. */
  badge?: ReactNode;
}

export interface AppSidebarSection {
  /** A small heading above the items; hidden while folded. */
  title?: string;
  items: AppSidebarItem[];
}

export interface AppSidebarProps extends Omit<ComponentProps<"nav">, "children"> {
  sections: AppSidebarSection[];
  /** The id of the page showing. */
  current?: string;
  header?: ReactNode;
  footer?: ReactNode;
  /** Folds it to its icons. */
  collapsed?: boolean;
  /** Adds a fold button at the bottom that calls this. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Accessible name of the fold button. */
  collapseLabel?: string;
}

// ── Private helpers ───────────────────────
function Row({ item, current, collapsed }: { item: AppSidebarItem; current: boolean; collapsed: boolean }) {
  const content = (
    <>
      <span className="iro-app-sidebar-icon">{item.icon}</span>
      <span className="iro-app-sidebar-label">{item.label}</span>
      {item.badge !== undefined ? <span className="iro-app-sidebar-badge">{item.badge}</span> : null}
    </>
  );
  const shared = { className: "iro-app-sidebar-item", "aria-current": current ? ("page" as const) : undefined };
  const row = item.href ? (
    <a
      {...shared}
      href={item.href}
      onClick={
        item.onClick
          ? (event) => {
              event.preventDefault();
              item.onClick?.();
            }
          : undefined
      }
    >
      {content}
    </a>
  ) : (
    <button type="button" {...shared} onClick={item.onClick}>
      {content}
    </button>
  );
  return collapsed ? (
    <Tooltip content={item.label} side="right" delay={0}>
      {row}
    </Tooltip>
  ) : (
    row
  );
}

// ── Public API ────────────────────────────
/** An app's side navigation that can fold to icons. */
export function AppSidebar({
  sections,
  current,
  header,
  footer,
  collapsed = false,
  onCollapsedChange,
  collapseLabel = "Fold the sidebar",
  className,
  "aria-label": ariaLabel = "Main",
  ...rest
}: AppSidebarProps) {
  return (
    <nav
      aria-label={ariaLabel}
      data-collapsed={collapsed || undefined}
      className={cx("iro-app-sidebar", className)}
      {...rest}
    >
      {header ? <div className="iro-app-sidebar-header">{header}</div> : null}
      <div className="iro-app-sidebar-sections">
        {sections.map((section, index) => (
          <div key={section.title ?? index} className="iro-app-sidebar-section">
            {section.title ? <span className="iro-app-sidebar-title">{section.title}</span> : null}
            <ul>
              {section.items.map((item) => (
                <li key={item.id}>
                  <Row item={item} current={item.id === current} collapsed={collapsed} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {footer || onCollapsedChange ? (
        <div className="iro-app-sidebar-footer">
          {footer}
          {onCollapsedChange ? (
            <IconButton
              size="sm"
              icon={<Icon icon={SidebarIcon} />}
              label={collapseLabel}
              active={collapsed}
              onClick={() => onCollapsedChange(!collapsed)}
              className="iro-app-sidebar-fold"
            />
          ) : null}
        </div>
      ) : null}
    </nav>
  );
}
