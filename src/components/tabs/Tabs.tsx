// Tabs: a row of tabs with an indicator that slides to the picked one. ← → move between tabs. Give tabs `content` to
// render their panels here, or leave it out and show the panel yourself from `value`.

// ── Dependencies ──────────────────────────
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ReactNode } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface TabItem<T extends string> {
  value: T;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  /** The tab's panel; rendered under the list while the tab is picked. */
  content?: ReactNode;
}

export interface TabsProps<T extends string> {
  tabs: TabItem<T>[];
  value: T;
  onValueChange: (value: T) => void;
  /** `line` (default): an underline, for switching panels. `pill`: a raised pill, for page headers. */
  variant?: "line" | "pill";
  className?: string;
  /** What the tabs switch between, for screen readers. */
  "aria-label"?: string;
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
  return (
    <BaseTabs.Root
      value={value}
      onValueChange={(next) => onValueChange(next as T)}
      data-variant={variant}
      className={cx("iro-tabs", className)}
    >
      <BaseTabs.List className="iro-tabs-list" aria-label={ariaLabel}>
        {tabs.map((tab) => (
          <BaseTabs.Tab key={tab.value} value={tab.value} disabled={tab.disabled} className="iro-tab">
            {tab.icon}
            {tab.label}
          </BaseTabs.Tab>
        ))}
        <BaseTabs.Indicator className="iro-tabs-indicator" />
      </BaseTabs.List>
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
