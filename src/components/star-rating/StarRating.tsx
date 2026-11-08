// StarRating: 0–5 stars. Click a star to set it, the same star again to clear; ← → move one star (Base UI's radio
// group), 0–5 set it, Delete clears. `readOnly` shows the stars only (gallery tiles).

// ── Dependencies ──────────────────────────
import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { type KeyboardEvent, useState } from "react";
import { cx } from "../shared/cx";
import { StarGlyph } from "../shared/glyphs";

// ── Constants ─────────────────────────────
const STARS = [1, 2, 3, 4, 5];

// ── Types ─────────────────────────────────
export interface StarRatingProps {
  value: number;
  onValueChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md";
  /** What's rated, for screen readers (default "Rating"). */
  label?: string;
  className?: string;
}

// ── Public API ────────────────────────────
/** Five stars to rate with, or to show a rating. */
export function StarRating({
  value,
  onValueChange,
  readOnly,
  size = "md",
  label = "Rating",
  className,
}: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const set = (stars: number) => onValueChange?.(Math.max(0, Math.min(5, stars)));
  const shown = hover ?? value;

  if (readOnly) {
    return (
      <span role="img" aria-label={`${value} of 5 stars`} data-size={size} className={cx("iro-stars", className)}>
        {STARS.map((stars) => (
          <span key={stars} className="iro-star" data-on={stars <= value || undefined}>
            <StarGlyph />
          </span>
        ))}
      </span>
    );
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (/^[0-5]$/.test(event.key)) set(Number(event.key));
    else if (event.key === "Delete" || event.key === "Backspace") set(0);
    else return;
    event.preventDefault();
  };

  return (
    <RadioGroup
      aria-label={label}
      value={value ? String(value) : ""}
      onValueChange={(next) => set(Number(next))}
      onKeyDown={onKeyDown}
      onMouseLeave={() => setHover(null)}
      data-size={size}
      className={cx("iro-stars", className)}
    >
      {STARS.map((stars) => (
        <Radio.Root
          key={stars}
          value={String(stars)}
          aria-label={`${stars} star${stars === 1 ? "" : "s"}`}
          data-on={stars <= shown || undefined}
          data-preview={hover !== null || undefined}
          className="iro-star"
          onMouseEnter={() => setHover(stars)}
          onClick={() => {
            // A click on the picked star clears it; the radio group doesn't report it.
            if (value === stars) set(0);
          }}
        >
          <StarGlyph />
        </Radio.Root>
      ))}
    </RadioGroup>
  );
}
