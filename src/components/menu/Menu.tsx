// Menu: a list of actions that opens from a trigger (a ⋯ button, a split button's arrow). Arrow keys move, typing
// jumps to an item, Enter runs it.

// ── Dependencies ──────────────────────────
import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { ReactElement } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { cx } from "../shared/cx";
import { MenuEntries, type MenuEntry } from "./MenuEntries";

// ── Constants ─────────────────────────────
const OFFSET = 4;

// ── Types ─────────────────────────────────
export interface MenuProps {
  /** The element that opens it. */
  trigger: ReactElement;
  items: MenuEntry[];
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  /** Goes on the popup. */
  className?: string;
}

// ── Public API ────────────────────────────
/** A dropdown menu of actions. */
export function Menu({ trigger, items, side = "bottom", align = "start", className }: MenuProps) {
  const layer = useIroLayer();
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger render={trigger} />
      <BaseMenu.Portal container={layer}>
        <BaseMenu.Positioner side={side} align={align} sideOffset={OFFSET} className="iro-positioner">
          <BaseMenu.Popup className={cx("iro-popup", "iro-popup-list", className)}>
            <MenuEntries items={items} />
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
