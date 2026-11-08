// ContextMenu: the right-click menu (or Shift+F10, or a long press) for an area or an object, with the same items as
// a Menu. Anything with a ⋯ menu should open the same items on right-click.

// ── Dependencies ──────────────────────────
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type { ReactElement } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { MenuEntries, type MenuEntry } from "../menu/MenuEntries";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface ContextMenuProps {
  items: MenuEntry[];
  /** The area that opens the menu: one element that takes a ref and passes props to the DOM. */
  children: ReactElement;
  /** Goes on the popup. */
  className?: string;
}

// ── Public API ────────────────────────────
/** Opens `items` at the pointer when its child is right-clicked. */
export function ContextMenu({ items, children, className }: ContextMenuProps) {
  const layer = useIroLayer();
  return (
    <BaseContextMenu.Root>
      <BaseContextMenu.Trigger render={children} />
      <BaseContextMenu.Portal container={layer}>
        <BaseContextMenu.Positioner className="iro-positioner">
          <BaseContextMenu.Popup className={cx("iro-popup", "iro-popup-list", className)}>
            <MenuEntries items={items} />
          </BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  );
}
