// MultiSegmented: Segmented's look for picking several. Each picked option is raised on its own; there's no sliding
// thumb. `allLabel` adds a first segment that clears the picks and reads as picked while none is.

// ── Dependencies ──────────────────────────
import type { SegmentedOption } from "../segmented/Segmented";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface MultiSegmentedProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T[];
  onValueChange: (value: T[]) => void;
  /** A first segment meaning "all" (no picks): "Any", "All". */
  allLabel?: string;
  size?: "sm" | "md";
  disabled?: boolean;
  className?: string;
  /** What the choice is about, for screen readers. */
  "aria-label"?: string;
}

// ── Public API ────────────────────────────
/** A row of toggle segments where any number can be picked. */
export function MultiSegmented<T extends string>({
  options,
  value,
  onValueChange,
  allLabel,
  size = "md",
  disabled,
  className,
  "aria-label": ariaLabel,
}: MultiSegmentedProps<T>) {
  const toggle = (picked: T) =>
    onValueChange(value.includes(picked) ? value.filter((item) => item !== picked) : [...value, picked]);

  return (
    // The well and segments use Segmented's classes, so both read as one family.
    // biome-ignore lint/a11y/useSemanticElements: a fieldset's own border, padding and legend fight the well's look
    <div
      role="group"
      aria-label={ariaLabel}
      data-size={size}
      className={cx("iro-segmented", "iro-multi-segmented", className)}
    >
      {allLabel ? (
        <button
          type="button"
          aria-pressed={value.length === 0}
          disabled={disabled}
          className="iro-segmented-option"
          onClick={() => onValueChange([])}
        >
          {allLabel}
        </button>
      ) : null}
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value.includes(option.value)}
          disabled={disabled || option.disabled}
          className="iro-segmented-option"
          onClick={() => toggle(option.value)}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}
