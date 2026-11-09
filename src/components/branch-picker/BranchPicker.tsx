// BranchPicker: "‹ 2 / 3 ›" under an answer that has several versions (tried again, or edited), to step between them.
// It goes first in Message's `actions`, where it stays visible while the other actions wait for hover; the app keeps
// the versions and shows the one picked. With one version it shows nothing.

// ── Dependencies ──────────────────────────
import { useState } from "react";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { ChevronLeftGlyph, ChevronRightGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface BranchPickerProps {
  /** How many versions there are. */
  count: number;
  /** The version shown, from 0, when the app keeps it. */
  index?: number;
  /** The version shown first, when the picker keeps it (default the last). */
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** The group's name for screen readers (default "Versions"). */
  label?: string;
  previousLabel?: string;
  nextLabel?: string;
  className?: string;
}

// ── Public API ────────────────────────────
/** Previous and next buttons around "n / count". */
export function BranchPicker({
  count,
  index,
  defaultIndex,
  onIndexChange,
  label = "Versions",
  previousLabel = "Previous version",
  nextLabel = "Next version",
  className,
}: BranchPickerProps) {
  const [own, setOwn] = useState(defaultIndex ?? count - 1);
  const current = Math.max(0, Math.min(index ?? own, count - 1));
  if (count < 2) return null;
  const go = (next: number) => {
    setOwn(next);
    onIndexChange?.(next);
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: a fieldset would bring a form's border and legend to two buttons.
    <div role="group" aria-label={label} className={cx("iro-branch-picker", className)}>
      <IconButton
        size="sm"
        icon={<ChevronLeftGlyph />}
        label={previousLabel}
        disabled={current === 0}
        onClick={() => go(current - 1)}
      />
      <span className="iro-branch-picker-count" aria-live="polite">
        {current + 1} / {count}
      </span>
      <IconButton
        size="sm"
        icon={<ChevronRightGlyph />}
        label={nextLabel}
        disabled={current === count - 1}
        onClick={() => go(current + 1)}
      />
    </div>
  );
}
