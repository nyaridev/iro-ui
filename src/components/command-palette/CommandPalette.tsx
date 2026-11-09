// CommandPalette: a search field over a grouped list of things to jump to or do (Ctrl K). With no query each group
// shows its first few entries; typing keeps the entries whose label, keywords, group or text hint contain every word, at most
// MAX_SHOWN. ↑ ↓ move, Enter picks, Escape closes. A Base UI dialog holding an autocomplete with its list inline.

// ── Dependencies ──────────────────────────
import { Autocomplete } from "@base-ui/react/autocomplete";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { Kbd } from "../kbd/Kbd";
import { matchesAllWords } from "../select/options";
import { cx } from "../shared/cx";
import { ChevronRightGlyph, SearchGlyph } from "../shared/glyphs";

// ── Constants ─────────────────────────────
const PER_GROUP_EMPTY = 6;
const MAX_SHOWN = 60;

// ── Types ─────────────────────────────────
export interface PaletteItem {
  /** Unique across the items. */
  id: string;
  label: string;
  /** The heading it's listed under: "Pages", "Files", "Actions". */
  group: string;
  icon?: ReactNode;
  /** Muted text after the label: a folder, "Settings page". */
  hint?: ReactNode;
  /** Its shortcut, shown at the end: `["Ctrl", "G"]`. */
  keys?: string[];
  /** More words that should find it. */
  keywords?: string;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: PaletteItem[];
  /** The picked entry; the palette has closed already. */
  onPick: (item: PaletteItem) => void;
  placeholder?: string;
  emptyText?: string;
  /** The dialog's name for screen readers (default "Command palette"). */
  label?: string;
  className?: string;
}

/** A type, not an interface: Base UI's Group needs an index signature, which only types get implicitly. */
type PaletteGroup = {
  value: string;
  items: PaletteItem[];
};

// ── Private helpers ───────────────────────
/** Everything typing can match: the label, keywords, group, and the hint when it's text. */
function searchText(item: PaletteItem): string {
  return [item.label, item.keywords, item.group, typeof item.hint === "string" ? item.hint : ""].join(" ");
}

/** The entries to show for `query`, grouped in order of first appearance. */
function shownGroups(items: PaletteItem[], query: string): PaletteGroup[] {
  const counts = new Map<string, number>();
  const shown = query.trim()
    ? items.filter((item) => matchesAllWords(searchText(item), query)).slice(0, MAX_SHOWN)
    : items.filter((item) => {
        const count = counts.get(item.group) ?? 0;
        counts.set(item.group, count + 1);
        return count < PER_GROUP_EMPTY;
      });
  const groups = new Map<string, PaletteItem[]>();
  for (const item of shown) groups.set(item.group, [...(groups.get(item.group) ?? []), item]);
  return [...groups].map(([value, entries]) => ({ value, items: entries }));
}

// ── Public API ────────────────────────────
/** A modal search over commands and places, grouped. */
export function CommandPalette({
  open,
  onOpenChange,
  items,
  onPick,
  placeholder = "Type a command or search…",
  emptyText = "Nothing matches. Try fewer letters.",
  label = "Command palette",
  className,
}: CommandPaletteProps) {
  const layer = useIroLayer();
  const [query, setQuery] = useState("");
  const groups = useMemo(() => shownGroups(items, query), [items, query]);
  const count = groups.reduce((total, group) => total + group.items.length, 0);

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const pick = (item: PaletteItem) => {
    onOpenChange(false);
    onPick(item);
  };

  return (
    <BaseDialog.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      <BaseDialog.Portal container={layer}>
        <BaseDialog.Backdrop className="iro-dialog-backdrop" />
        <BaseDialog.Popup aria-label={label} className={cx("iro-palette", className)}>
          <Autocomplete.Root
            inline
            open
            items={groups}
            filteredItems={groups}
            value={query}
            onValueChange={setQuery}
            autoHighlight="always"
            itemToStringValue={(item: PaletteItem) => item.label}
          >
            <div className="iro-palette-search">
              <SearchGlyph />
              <Autocomplete.Input className="iro-palette-input" placeholder={placeholder} />
              <Kbd>Esc</Kbd>
            </div>
            <Autocomplete.Empty>
              <p className="iro-palette-empty">{emptyText}</p>
            </Autocomplete.Empty>
            <Autocomplete.List className="iro-palette-list">
              {(group: PaletteGroup) => (
                <Autocomplete.Group key={group.value} items={group.items} className="iro-palette-group">
                  <Autocomplete.GroupLabel className="iro-palette-label">{group.value}</Autocomplete.GroupLabel>
                  <Autocomplete.Collection>
                    {(item: PaletteItem) => (
                      <Autocomplete.Item
                        key={item.id}
                        value={item}
                        className="iro-palette-item"
                        onClick={() => pick(item)}
                      >
                        <span className="iro-palette-icon">{item.icon ?? <ChevronRightGlyph />}</span>
                        <span className="iro-palette-text">{item.label}</span>
                        {item.hint ? <span className="iro-palette-hint">{item.hint}</span> : null}
                        <span className="iro-palette-keys">
                          {item.keys?.map((key) => (
                            <Kbd key={key}>{key}</Kbd>
                          ))}
                        </span>
                      </Autocomplete.Item>
                    )}
                  </Autocomplete.Collection>
                </Autocomplete.Group>
              )}
            </Autocomplete.List>
            <footer className="iro-palette-footer">
              <span>
                <Kbd>↑</Kbd> <Kbd>↓</Kbd> to move
              </span>
              <span>
                <Kbd>Enter</Kbd> to open
              </span>
              <span className="iro-palette-count">{count ? `${count} shown` : ""}</span>
            </footer>
          </Autocomplete.Root>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
