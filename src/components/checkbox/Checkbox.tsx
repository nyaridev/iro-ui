// Checkbox: a box for choices that are saved together. With `label` (and `description`), the text is clickable too.

// ── Dependencies ──────────────────────────
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import type { ReactNode } from "react";
import { cx } from "../shared/cx";
import { CheckGlyph, MinusGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Some but not all of a group: shows a dash. */
  indeterminate?: boolean;
  label?: ReactNode;
  /** A muted line under the label. */
  description?: ReactNode;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  /** The accessible name when there's no `label`. */
  "aria-label"?: string;
}

// ── Public API ────────────────────────────
/** A checkbox, optionally with a label and description. */
export function Checkbox({
  checked,
  defaultChecked,
  onCheckedChange,
  indeterminate,
  label,
  description,
  disabled,
  name,
  id,
  className,
  "aria-label": ariaLabel,
}: CheckboxProps) {
  const box = (
    <BaseCheckbox.Root
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange ? (next) => onCheckedChange(next) : undefined}
      indeterminate={indeterminate}
      disabled={disabled}
      name={name}
      id={id}
      aria-label={ariaLabel}
      className={cx("iro-checkbox", !label && className)}
    >
      <BaseCheckbox.Indicator className="iro-checkbox-indicator">
        {indeterminate ? <MinusGlyph /> : <CheckGlyph />}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
  if (!label) return box;
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Base UI's checkbox inside is the control
    <label className={cx("iro-checkbox-label", className)} data-disabled={disabled || undefined}>
      {box}
      <span className="iro-checkbox-text">
        <span>{label}</span>
        {description ? <span className="iro-checkbox-description">{description}</span> : null}
      </span>
    </label>
  );
}
