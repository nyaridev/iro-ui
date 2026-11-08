// Segmented: pick one of a few options shown side by side. A thumb slides to the picked one; arrow keys move the
// pick (Base UI's radio group).

// ── Dependencies ──────────────────────────
import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface SegmentedOption<T extends string> {
  value: T;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SegmentedProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  size?: "sm" | "md";
  /** Fill the row, splitting it evenly. */
  full?: boolean;
  disabled?: boolean;
  className?: string;
  /** What the choice is about, for screen readers. */
  "aria-label"?: string;
}

/** Where the thumb sits: the picked option's offset and width inside the control. */
interface ThumbPlace {
  x: number;
  width: number;
}

// ── Public API ────────────────────────────
/** A row of options where exactly one is picked. */
export function Segmented<T extends string>({
  options,
  value,
  onValueChange,
  size = "md",
  full = false,
  disabled,
  className,
  "aria-label": ariaLabel,
}: SegmentedProps<T>) {
  const groupRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState<ThumbPlace | null>(null);

  // Measured after render, and again when the control resizes (a font loading, a narrower window).
  // biome-ignore lint/correctness/useExhaustiveDependencies: `value` moves the picked option, so it re-measures
  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const place = () => {
      const picked = group.querySelector<HTMLElement>(".iro-segmented-option[data-checked]");
      setThumb(picked ? { x: picked.offsetLeft, width: picked.offsetWidth } : null);
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(group);
    return () => observer.disconnect();
  }, [value]);

  return (
    <RadioGroup
      ref={groupRef}
      value={value}
      onValueChange={(next) => onValueChange(next as T)}
      disabled={disabled}
      aria-label={ariaLabel}
      data-size={size}
      data-full={full || undefined}
      className={cx("iro-segmented", className)}
    >
      {thumb ? (
        <span
          className="iro-segmented-thumb"
          style={{ width: thumb.width, transform: `translateX(${thumb.x}px)` }}
          aria-hidden="true"
        />
      ) : null}
      {options.map((option) => (
        <Radio.Root key={option.value} value={option.value} disabled={option.disabled} className="iro-segmented-option">
          {option.icon}
          {option.label}
        </Radio.Root>
      ))}
    </RadioGroup>
  );
}
