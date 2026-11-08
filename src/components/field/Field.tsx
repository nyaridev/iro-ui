// Field: a label, one control, and a hint or an error under it. Base UI links the label and messages to the control.

// ── Dependencies ──────────────────────────
import { Field as BaseField } from "@base-ui/react/field";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../shared/cx";
import { DangerGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface FieldProps extends Omit<ComponentProps<"div">, "children"> {
  label: ReactNode;
  /** A line under the control on what to enter. Hidden while there's an error. */
  hint?: ReactNode;
  /** What's wrong; shows in the danger color and marks the control invalid. */
  error?: ReactNode;
  /** `top` (default): label above. `left`: a settings row, label beside the control. */
  layout?: "top" | "left";
  disabled?: boolean;
  /** The control: a TextField, TextArea, NumberField… */
  children: ReactNode;
}

// ── Public API ────────────────────────────
/** A labelled control with an optional hint or error. */
export function Field({ label, hint, error, layout = "top", disabled, className, children, ...rest }: FieldProps) {
  return (
    <BaseField.Root
      disabled={disabled}
      invalid={error ? true : undefined}
      data-layout={layout}
      className={cx("iro-field", className)}
      {...rest}
    >
      <BaseField.Label className="iro-field-label">{label}</BaseField.Label>
      <div className="iro-field-body">
        {children}
        {error ? (
          <BaseField.Error match className="iro-field-error">
            <DangerGlyph />
            {error}
          </BaseField.Error>
        ) : hint ? (
          <BaseField.Description className="iro-field-hint">{hint}</BaseField.Description>
        ) : null}
      </div>
    </BaseField.Root>
  );
}
