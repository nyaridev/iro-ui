// MenuEntries: draws a list of menu items and separators. Shared by Menu and ContextMenu; not exported.

// ── Dependencies ──────────────────────────
import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { ReactNode } from "react";

// ── Types ─────────────────────────────────
/** One action in a menu. */
export interface MenuItem {
  /** The text; typing its first letters jumps to it. Unique within one menu. */
  label: string;
  onSelect: () => void;
  icon?: ReactNode;
  /** Shown on the right, as a reminder: `"Ctrl D"`. It doesn't bind the key. */
  shortcut?: string;
  /** Destructive: shown in the danger color. */
  danger?: boolean;
  disabled?: boolean;
}

/** An item, or `"separator"` for a line between groups. */
export type MenuEntry = MenuItem | "separator";

// ── Public API ────────────────────────────
/** The rows of a menu popup. Icons get a column only when some item has one, so labels line up. */
export function MenuEntries({ items }: { items: MenuEntry[] }) {
  const withIcons = items.some((entry) => entry !== "separator" && entry.icon);
  let previous = "";
  // Labels are unique within a menu; a separator is keyed by the item above it.
  return items.map((entry) => {
    if (entry === "separator") {
      return <BaseMenu.Separator key={`separator-after-${previous}`} className="iro-popup-separator" />;
    }
    previous = entry.label;
    return (
      <BaseMenu.Item
        key={entry.label}
        label={entry.label}
        onClick={entry.onSelect}
        disabled={entry.disabled}
        data-danger={entry.danger || undefined}
        className="iro-option"
      >
        {withIcons ? <span className="iro-option-slot">{entry.icon}</span> : null}
        <span className="iro-option-label">{entry.label}</span>
        {entry.shortcut ? <span className="iro-option-end">{entry.shortcut}</span> : null}
      </BaseMenu.Item>
    );
  });
}
