// Tabs: a row of tabs with an indicator that slides to the picked one. ← → move between tabs. Give tabs `content` to
// render their panels here, or leave it out and show the panel yourself from `value`. Looks: `line` over a panel,
// `pill` in a tray (PrepKit's header), `nav` without one (BlomboUI's header), `chip` as separate chips that wrap, and
// `folder` as book tabs joined to the panel under them.

// ── Dependencies ──────────────────────────
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ReactNode } from "react";
import { Checkbox } from "../checkbox/Checkbox";
import { Menu } from "../menu/Menu";
import type { MenuEntry } from "../menu/MenuEntries";
import { cx } from "../shared/cx";
import { ChevronDownGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface TabItem<T extends string> {
  value: T;
  label: ReactNode;
  icon?: ReactNode;
  /** After the label: a count or a status (`<Badge>`). */
  badge?: ReactNode;
  disabled?: boolean;
  /** The tab's panel; rendered under the list while the tab is picked. */
  content?: ReactNode;
  /** A checkbox before the label that turns what the tab shows on or off (a pass, a layer). */
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** The checkbox's name; "Use <label>" when the label is text. */
  checkLabel?: string;
  /** A chevron after the label that opens these entries; the tab itself still switches with one click. */
  menu?: MenuEntry[];
  /** The chevron's name (default "More"). */
  menuLabel?: string;
}

export interface TabsProps<T extends string> {
  tabs: TabItem<T>[];
  value: T;
  onValueChange: (value: T) => void;
  /** `line` (default) over a panel, `pill` in a tray, `nav` for app headers, `chip` that wrap, `folder` book tabs. */
  variant?: "line" | "pill" | "nav" | "chip" | "folder";
  className?: string;
  /** What the tabs switch between, for screen readers. */
  "aria-label"?: string;
}

// ── Private helpers ───────────────────────
/** The attributes that make room in a tab's padding for its checkbox and menu chevron. */
function extraSpace<T extends string>(tab: TabItem<T>) {
  return {
    "data-checkable": tab.checked !== undefined || undefined,
    "data-menu": tab.menu?.length ? true : undefined,
  };
}

/** A tab's place in the extras layer: a hidden copy of the tab, so it lines up with it, and the tab's checkbox and
 *  menu chevron over its padding. They sit outside the tablist, which may hold only tabs. */
function TabExtras<T extends string>({ tab, active }: { tab: TabItem<T>; active: boolean }) {
  const space = extraSpace(tab);
  const copy = (
    <span className="iro-tab" data-active={active || undefined} {...space}>
      {tab.icon}
      {tab.label}
      {tab.badge}
    </span>
  );
  if (!space["data-checkable"] && !space["data-menu"]) return copy;
  return (
    <span className="iro-tab-wrap">
      {space["data-checkable"] ? (
        <span className="iro-tab-check">
          <Checkbox
            checked={Boolean(tab.checked)}
            onCheckedChange={(checked) => tab.onCheckedChange?.(checked)}
            aria-label={tab.checkLabel ?? (typeof tab.label === "string" ? `Use ${tab.label}` : "Use")}
          />
        </span>
      ) : null}
      {copy}
      {tab.menu?.length ? (
        <Menu
          items={tab.menu}
          trigger={
            <button type="button" className="iro-tab-menu" aria-label={tab.menuLabel ?? "More"}>
              <ChevronDownGlyph />
            </button>
          }
        />
      ) : null}
    </span>
  );
}

// ── Public API ────────────────────────────
/** Tabs with a sliding indicator, and their panels when given. */
export function Tabs<T extends string>({
  tabs,
  value,
  onValueChange,
  variant = "line",
  className,
  "aria-label": ariaLabel,
}: TabsProps<T>) {
  const extras = tabs.some((tab) => tab.checked !== undefined || tab.menu?.length);
  return (
    <BaseTabs.Root
      value={value}
      onValueChange={(next) => onValueChange(next as T)}
      data-variant={variant}
      className={cx("iro-tabs", className)}
    >
      <div className="iro-tabs-bar">
        <BaseTabs.List className="iro-tabs-list" aria-label={ariaLabel}>
          {tabs.map((tab) => (
            <BaseTabs.Tab
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              className="iro-tab"
              {...extraSpace(tab)}
            >
              {tab.icon}
              {tab.label}
              {tab.badge}
            </BaseTabs.Tab>
          ))}
          {/* Folder tabs show the pick by joining the panel, not with an indicator. */}
          {variant === "folder" ? null : <BaseTabs.Indicator className="iro-tabs-indicator" />}
        </BaseTabs.List>
        {extras ? (
          <div className="iro-tabs-list iro-tabs-extras">
            {tabs.map((tab) => (
              <TabExtras key={tab.value} tab={tab} active={tab.value === value} />
            ))}
          </div>
        ) : null}
      </div>
      {tabs.map((tab) =>
        tab.content === undefined ? null : (
          <BaseTabs.Panel key={tab.value} value={tab.value} className="iro-tabs-panel">
            {tab.content}
          </BaseTabs.Panel>
        ),
      )}
    </BaseTabs.Root>
  );
}
