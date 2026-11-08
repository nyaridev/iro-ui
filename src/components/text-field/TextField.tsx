// TextField: a one-line text input, with optional content before and after the text (an icon, a unit, a button).

// ── Dependencies ──────────────────────────
import { Input } from "@base-ui/react/input";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface TextFieldProps extends Omit<ComponentProps<"input">, "size"> {
  size?: "sm" | "md" | "lg";
  /** Before the text: a search icon, a prefix. */
  start?: ReactNode;
  /** After the text: a unit, a clear button. */
  end?: ReactNode;
  /** Marks it wrong; inside a Field, `error` does this already. */
  invalid?: boolean;
}

// ── Public API ────────────────────────────
/** A text input in the style's field look. `className` and `style` go on the outer box; the rest on the input. */
export function TextField({ size = "md", start, end, invalid, className, style, ...rest }: TextFieldProps) {
  return (
    <span
      className={cx("iro-text-field", className)}
      style={style}
      data-size={size}
      data-invalid={invalid || undefined}
    >
      {start ? <span className="iro-text-field-slot">{start}</span> : null}
      <Input className="iro-text-field-input" aria-invalid={invalid || undefined} {...rest} />
      {end ? <span className="iro-text-field-slot">{end}</span> : null}
    </span>
  );
}
