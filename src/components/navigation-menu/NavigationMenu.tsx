// NavigationMenu: a site's top navigation, where some items open a panel of links (with a line about each) and
// others are plain links. The panel moves and resizes between items instead of closing. Base UI's navigation menu
// handles hover, focus and the keys.

// ── Dependencies ──────────────────────────
import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import type { ReactNode } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { cx } from "../shared/cx";
import { ChevronDownGlyph } from "../shared/glyphs";

// ── Constants ─────────────────────────────
const OFFSET = 8;

// ── Types ─────────────────────────────────
export interface NavigationMenuLink {
  label: string;
  href: string;
  /** A line under the label. */
  description?: ReactNode;
  icon?: ReactNode;
}

export interface NavigationMenuItem {
  /** The item's name in the bar; unique within it. */
  label: string;
  /** A plain link when the item has no panel. */
  href?: string;
  /** The panel's links, two across when there are more than three. */
  links?: NavigationMenuLink[];
  /** A panel of your own, in place of `links`. */
  content?: ReactNode;
  /** Marks the item of the page showing. */
  current?: boolean;
}

export interface NavigationMenuProps {
  items: NavigationMenuItem[];
  className?: string;
  /** Names the navigation for screen readers (default "Main"). */
  "aria-label"?: string;
}

// ── Private helpers ───────────────────────
function LinkList({ links }: { links: NavigationMenuLink[] }) {
  return (
    <ul className="iro-navigation-menu-links" data-columns={links.length > 3 ? 2 : 1}>
      {links.map((link) => (
        <li key={link.href}>
          <BaseNavigationMenu.Link href={link.href} className="iro-navigation-menu-link">
            {link.icon ? <span className="iro-navigation-menu-link-icon">{link.icon}</span> : null}
            <span className="iro-navigation-menu-link-text">
              <span className="iro-navigation-menu-link-label">{link.label}</span>
              {link.description ? (
                <span className="iro-navigation-menu-link-description">{link.description}</span>
              ) : null}
            </span>
          </BaseNavigationMenu.Link>
        </li>
      ))}
    </ul>
  );
}

// ── Public API ────────────────────────────
/** A top navigation bar whose items can open panels of links. */
export function NavigationMenu({ items, className, "aria-label": ariaLabel = "Main" }: NavigationMenuProps) {
  const layer = useIroLayer();
  return (
    <BaseNavigationMenu.Root className={cx("iro-navigation-menu", className)} aria-label={ariaLabel}>
      <BaseNavigationMenu.List className="iro-navigation-menu-list">
        {items.map((item) => (
          <BaseNavigationMenu.Item key={item.label} className="iro-navigation-menu-item">
            {item.links || item.content ? (
              <>
                <BaseNavigationMenu.Trigger
                  className="iro-navigation-menu-trigger"
                  data-current={item.current || undefined}
                >
                  {item.label}
                  <BaseNavigationMenu.Icon className="iro-navigation-menu-icon">
                    <ChevronDownGlyph />
                  </BaseNavigationMenu.Icon>
                </BaseNavigationMenu.Trigger>
                <BaseNavigationMenu.Content className="iro-navigation-menu-content">
                  {item.content ?? <LinkList links={item.links ?? []} />}
                </BaseNavigationMenu.Content>
              </>
            ) : (
              <BaseNavigationMenu.Link
                href={item.href}
                active={item.current}
                className="iro-navigation-menu-trigger"
                aria-current={item.current ? "page" : undefined}
              >
                {item.label}
              </BaseNavigationMenu.Link>
            )}
          </BaseNavigationMenu.Item>
        ))}
      </BaseNavigationMenu.List>
      <BaseNavigationMenu.Portal container={layer}>
        <BaseNavigationMenu.Positioner
          sideOffset={OFFSET}
          collisionPadding={16}
          className="iro-positioner iro-navigation-menu-positioner"
        >
          <BaseNavigationMenu.Popup className="iro-popup iro-navigation-menu-popup">
            <BaseNavigationMenu.Viewport className="iro-navigation-menu-viewport" />
          </BaseNavigationMenu.Popup>
        </BaseNavigationMenu.Positioner>
      </BaseNavigationMenu.Portal>
    </BaseNavigationMenu.Root>
  );
}
