// NumberField: a number input with − and + steppers. Click to type, wheel while hovered and focused, arrow keys to
// step (Shift for larger steps). Base UI clamps to min and max.

// ── Dependencies ──────────────────────────
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { cx } from "../shared/cx";
import { MinusGlyph, PlusGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface NumberFieldProps {
  value?: number | null;
  defaultValue?: number;
  /** Called with the new number, or null when the input is emptied. */
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  /** The step with Shift held or Page Up / Down. */
  largeStep?: number;
  /** How the number shows: `{ style: "percent" }`, `{ maximumFractionDigits: 2 }`… */
  format?: Intl.NumberFormatOptions;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  required?: boolean;
  /** Marks it wrong; inside a Field, `error` does this already. */
  invalid?: boolean;
  name?: string;
  id?: string;
  className?: string;
  /** The accessible name when it isn't inside a Field. */
  "aria-label"?: string;
  /** Accessible names of the steppers. */
  decrementLabel?: string;
  incrementLabel?: string;
}

// ── Public API ────────────────────────────
/** A number input with steppers. */
export function NumberField({
  value,
  defaultValue,
  onValueChange,
  min,
  max,
  step,
  largeStep,
  format,
  size = "md",
  disabled,
  required,
  invalid,
  name,
  id,
  className,
  "aria-label": ariaLabel,
  decrementLabel = "Decrease",
  incrementLabel = "Increase",
}: NumberFieldProps) {
  return (
    <BaseNumberField.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange ? (next) => onValueChange(next) : undefined}
      min={min}
      max={max}
      step={step}
      largeStep={largeStep}
      format={format}
      disabled={disabled}
      required={required}
      name={name}
      id={id}
      allowWheelScrub
      data-size={size}
      data-invalid={invalid || undefined}
      className={cx("iro-number-field", className)}
    >
      <BaseNumberField.Group className="iro-number-field-group">
        <BaseNumberField.Decrement className="iro-number-field-step" aria-label={decrementLabel}>
          <MinusGlyph />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input
          className="iro-number-field-input"
          aria-label={ariaLabel}
          aria-invalid={invalid || undefined}
        />
        <BaseNumberField.Increment className="iro-number-field-step" aria-label={incrementLabel}>
          <PlusGlyph />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
