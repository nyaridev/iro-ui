// TextArea: a multi-line text input in the field look. Inside a Field, Base UI links its label and messages.

// ── Dependencies ──────────────────────────
import { Field as BaseField } from "@base-ui/react/field";
import type { ComponentProps } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface TextAreaProps extends ComponentProps<"textarea"> {
  /** Marks it wrong; inside a Field, `error` does this already. */
  invalid?: boolean;
}

// ── Public API ────────────────────────────
/** A multi-line text input that resizes vertically. */
export function TextArea({ invalid, className, ...rest }: TextAreaProps) {
  return (
    <BaseField.Control
      render={
        <textarea
          className={cx("iro-text-area", className)}
          aria-invalid={invalid || undefined}
          data-invalid={invalid || undefined}
          {...rest}
        />
      }
    />
  );
}
