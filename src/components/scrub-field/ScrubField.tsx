// ScrubField: a number as a compact field with a fill: drag sideways to change it (the field's width is the whole
// range; Shift for fine steps), click to type it, double-click to reset. Arrow keys step it (Shift: ten steps), Home
// and End jump to the ends, Enter types. Base UI's NumberField scrub area locks the pointer and has no click-to-type,
// so this one is hand-built, like the Splitter.

// ── Dependencies ──────────────────────────
import { type KeyboardEvent, type PointerEvent, type ReactNode, useRef, useState } from "react";
import { cx } from "../shared/cx";
import { parseTyped, snapToStep } from "../shared/number";

// ── Constants ─────────────────────────────
/** Pixels the pointer moves before a press counts as a drag, not a click. */
const DRAG_START = 3;
const FINE = 0.1;
const LARGE_STEPS = 10;

// ── Types ─────────────────────────────────
export interface ScrubFieldProps {
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  /** Shown at the start of the field. */
  label?: ReactNode;
  /** The accessible name when `label` isn't text. */
  "aria-label"?: string;
  /** After the value: "px", "%". */
  unit?: string;
  /** Double-click goes back to it. */
  defaultValue?: number;
  /** How the value reads; the step's decimals by default. */
  format?: (value: number) => string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

// ── Public API ────────────────────────────
/** A draggable, typeable number field with a fill showing where the value sits in its range. */
export function ScrubField({
  value,
  onValueChange,
  min,
  max,
  step = 1,
  label,
  "aria-label": ariaLabel,
  unit,
  defaultValue,
  format,
  size = "md",
  disabled,
  className,
}: ScrubFieldProps) {
  const field = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(null);
  const [typing, setTyping] = useState(false);
  const range = { min, max, step };
  const decimals = (String(step).split(".")[1] ?? "").length;
  const shown = format ? format(value) : value.toFixed(decimals);
  const share = max > min ? (Math.min(Math.max(value, min), max) - min) / (max - min) : 0;
  const set = (next: number) => onValueChange(snapToStep(next, range));

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || typing || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, start: value, moved: false };
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    if (!start) return;
    const dx = event.clientX - start.x;
    if (!start.moved && Math.abs(dx) < DRAG_START) return;
    start.moved = true;
    const width = field.current?.getBoundingClientRect().width || 1;
    set(start.start + (dx / width) * (max - min) * (event.shiftKey ? FINE : 1));
  };
  const onPointerUp = () => {
    const start = drag.current;
    drag.current = null;
    if (start && !start.moved) setTyping(true);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (typing || disabled) return;
    const steps = event.shiftKey ? LARGE_STEPS : 1;
    const moves: Record<string, number> = {
      ArrowRight: step * steps,
      ArrowUp: step * steps,
      ArrowLeft: -step * steps,
      ArrowDown: -step * steps,
      PageUp: step * LARGE_STEPS,
      PageDown: -step * LARGE_STEPS,
    };
    if (event.key === "Enter") {
      event.preventDefault();
      setTyping(true);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      set(event.key === "Home" ? min : max);
    } else if (moves[event.key] !== undefined) {
      event.preventDefault();
      set(value + (moves[event.key] ?? 0));
    }
  };

  return (
    <div
      ref={field}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel ?? (typeof label === "string" ? label : undefined)}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={unit ? `${shown} ${unit}` : shown}
      aria-disabled={disabled || undefined}
      data-size={size}
      data-typing={typing || undefined}
      className={cx("iro-scrub", className)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        drag.current = null;
      }}
      onKeyDown={onKeyDown}
      onDoubleClick={() => defaultValue !== undefined && !typing && set(defaultValue)}
    >
      <span className="iro-scrub-fill" style={{ width: `${share * 100}%` }} />
      {typing ? (
        <input
          // biome-ignore lint/a11y/noAutofocus: typing starts from a click or Enter on the field itself
          autoFocus
          aria-label={ariaLabel ?? (typeof label === "string" ? label : "Value")}
          defaultValue={value.toFixed(decimals)}
          className="iro-scrub-input"
          onFocus={(event) => event.currentTarget.select()}
          onBlur={(event) => {
            const typed = parseTyped(event.currentTarget.value, range);
            if (typed !== null) onValueChange(typed);
            setTyping(false);
            field.current?.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.currentTarget.blur();
            if (event.key === "Escape") {
              // Leave without the typed text: blur reads the input, so put the value back first.
              event.currentTarget.value = value.toFixed(decimals);
              event.currentTarget.blur();
            }
          }}
        />
      ) : (
        <>
          <span className="iro-scrub-label">{label}</span>
          <span className="iro-scrub-value">
            {shown}
            {unit ? <span className="iro-scrub-unit">{unit}</span> : null}
          </span>
        </>
      )}
    </div>
  );
}
