// RadioGroup: pick one of a few options, each a round button with a label and an optional line under it. For a
// compact row of short choices, use Segmented. Base UI's radio group moves the pick with the arrow keys.

// ── Dependencies ──────────────────────────
import { Radio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import type { ReactNode } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface RadioOption<T extends string> {
  value: T;
  label: ReactNode;
  /** A muted line under the label. */
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps<T extends string> {
  options: RadioOption<T>[];
  /** The picked value; leave it out and use `defaultValue` to let the group manage it. */
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  /** `vertical` (default) or `horizontal`. */
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  name?: string;
  className?: string;
  /** What the choice is about, for screen readers, when no Field names it. */
  "aria-label"?: string;
}

// ── Public API ────────────────────────────
/** Round buttons for picking one option. */
export function RadioGroup<T extends string>({
  options,
  value,
  defaultValue,
  onValueChange,
  orientation = "vertical",
  disabled,
  name,
  className,
  "aria-label": ariaLabel,
}: RadioGroupProps<T>) {
  return (
    <BaseRadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange ? (next) => onValueChange(next as T) : undefined}
      disabled={disabled}
      name={name}
      aria-label={ariaLabel}
      data-orientation={orientation}
      className={cx("iro-radio-group", className)}
    >
      {options.map((option) => (
        // biome-ignore lint/a11y/noLabelWithoutControl: Base UI's radio inside is the control
        <label key={option.value} className="iro-radio-label" data-disabled={disabled || option.disabled || undefined}>
          <Radio.Root value={option.value} disabled={option.disabled} className="iro-radio">
            <Radio.Indicator className="iro-radio-indicator" />
          </Radio.Root>
          <span className="iro-radio-text">
            <span>{option.label}</span>
            {option.description ? <span className="iro-radio-description">{option.description}</span> : null}
          </span>
        </label>
      ))}
    </BaseRadioGroup>
  );
}
