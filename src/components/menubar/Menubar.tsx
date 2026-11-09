// Menubar: a desktop app's row of menus (File, Edit, View). Click one to open it; then the pointer or the arrow keys
// move between the menus. Base UI's menubar joins its menus; the rows are Menu's.

// ── Dependencies ──────────────────────────
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { useIroLayer } from "../../root/IroRoot";
import { MenuEntries, type MenuEntry } from "../menu/MenuEntries";
import { cx } from "../shared/cx";

// ── Constants ─────────────────────────────
const OFFSET = 4;

// ── Types ─────────────────────────────────
export interface MenubarMenu {
  /** The menu's name in the bar; unique within it. */
  label: string;
  items: MenuEntry[];
}

export interface MenubarProps {
  menus: MenubarMenu[];
  className?: string;
  /** Names the bar for screen readers (default "Menu bar"). */
  "aria-label"?: string;
}

// ── Public API ────────────────────────────
/** A row of menus. */
export function Menubar({ menus, className, "aria-label": ariaLabel = "Menu bar" }: MenubarProps) {
  const layer = useIroLayer();
  return (
    <BaseMenubar className={cx("iro-menubar", className)} aria-label={ariaLabel}>
      {menus.map((menu) => (
        <BaseMenu.Root key={menu.label}>
          <BaseMenu.Trigger className="iro-menubar-trigger">{menu.label}</BaseMenu.Trigger>
          <BaseMenu.Portal container={layer}>
            <BaseMenu.Positioner align="start" sideOffset={OFFSET} className="iro-positioner">
              <BaseMenu.Popup className="iro-popup iro-popup-list">
                <MenuEntries items={menu.items} />
              </BaseMenu.Popup>
            </BaseMenu.Positioner>
          </BaseMenu.Portal>
        </BaseMenu.Root>
      ))}
    </BaseMenubar>
  );
}
