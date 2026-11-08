// Switch: an on/off toggle for settings that apply at once. With `label`, the text is part of the click target.

// ── Dependencies ──────────────────────────
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ReactNode } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Text beside the switch; clicking it toggles too. */
  label?: ReactNode;
  size?: "sm" | "md";
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  /** The accessible name when there's no `label`. */
  "aria-label"?: string;
}

// ── Public API ────────────────────────────
/** An on/off switch, optionally with a label. */
export function Switch({
  checked,
  defaultChecked,
  onCheckedChange,
  label,
  size = "md",
  disabled,
  name,
  id,
  className,
  "aria-label": ariaLabel,
}: SwitchProps) {
  const control = (
    <BaseSwitch.Root
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange ? (next) => onCheckedChange(next) : undefined}
      disabled={disabled}
      name={name}
      id={id}
      aria-label={ariaLabel}
      data-size={size}
      className={cx("iro-switch", !label && className)}
    >
      <BaseSwitch.Thumb className="iro-switch-thumb" />
    </BaseSwitch.Root>
  );
  if (!label) return control;
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Base UI's switch inside is the control
    <label className={cx("iro-switch-label", className)} data-disabled={disabled || undefined}>
      {control}
      <span>{label}</span>
    </label>
  );
}
