// Slider: pick a number by dragging along a track, or with the arrow keys (Shift for larger steps). The value in the
// label row can be clicked and typed; double-clicking the track resets to `resetValue`.

// ── Dependencies ──────────────────────────
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { type KeyboardEvent, type ReactNode, useState } from "react";
import { cx } from "../shared/cx";
import { parseTyped } from "../shared/number";

// ── Types ─────────────────────────────────
export interface SliderProps {
  value?: number;
  defaultValue?: number;
  /** Every change while dragging or typing. */
  onValueChange?: (value: number) => void;
  /** Once a drag or a typed value is done: for saving. */
  onValueCommit?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** The step with Shift held or Page Up / Down. */
  largeStep?: number;
  /** A label above the track, with the value on the right. */
  label?: ReactNode;
  /** How the value shows in the label row: `(v) => \`${v}%\``. */
  format?: (value: number) => string;
  /** Double-clicking the track goes back to this value. */
  resetValue?: number;
  /** Small ticks on the track at these values. */
  marks?: number[];
  disabled?: boolean;
  className?: string;
  /** The accessible name when there's no `label`. */
  "aria-label"?: string;
}

// ── Public API ────────────────────────────
/** A one-thumb slider with an optional label row whose value can be typed. */
export function Slider({
  value,
  defaultValue,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  largeStep,
  label,
  format = String,
  resetValue,
  marks,
  disabled,
  className,
  "aria-label": ariaLabel,
}: SliderProps) {
  const [inner, setInner] = useState(defaultValue ?? min);
  const [editing, setEditing] = useState(false);
  const current = value ?? inner;

  const change = (next: number) => {
    if (value === undefined) setInner(next);
    onValueChange?.(next);
  };
  const commit = (next: number) => {
    change(next);
    onValueCommit?.(next);
  };
  const finishTyping = (text: string) => {
    setEditing(false);
    const typed = parseTyped(text, { min, max, step });
    if (typed !== null) commit(typed);
  };
  const onTypedKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") finishTyping(event.currentTarget.value);
    if (event.key === "Escape") setEditing(false);
  };
  const percent = (mark: number) => ((mark - min) / (max - min)) * 100;

  return (
    <BaseSlider.Root
      value={current}
      onValueChange={(next) => change(next as number)}
      onValueCommitted={(next) => onValueCommit?.(next as number)}
      min={min}
      max={max}
      step={step}
      largeStep={largeStep}
      disabled={disabled}
      className={cx("iro-slider", className)}
    >
      {label ? (
        <div className="iro-slider-header">
          <BaseSlider.Label className="iro-slider-label">{label}</BaseSlider.Label>
          {editing ? (
            <input
              ref={(input) => {
                input?.focus();
                input?.select();
              }}
              className="iro-slider-input"
              defaultValue={String(current)}
              inputMode="decimal"
              aria-label="Type a value"
              onBlur={(event) => finishTyping(event.currentTarget.value)}
              onKeyDown={onTypedKey}
            />
          ) : (
            <button
              type="button"
              className="iro-slider-value"
              disabled={disabled}
              onClick={() => setEditing(true)}
              aria-label={`${format(current)}, click to type a value`}
            >
              {format(current)}
            </button>
          )}
        </div>
      ) : null}
      <BaseSlider.Control
        className="iro-slider-control"
        onDoubleClick={resetValue === undefined || disabled ? undefined : () => commit(resetValue)}
      >
        <BaseSlider.Track className="iro-slider-track">
          {marks?.map((mark) => (
            <span key={mark} className="iro-slider-mark" style={{ left: `${percent(mark)}%` }} aria-hidden="true" />
          ))}
          <BaseSlider.Indicator className="iro-slider-indicator" />
          <BaseSlider.Thumb className="iro-slider-thumb" aria-label={label ? undefined : ariaLabel} />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
