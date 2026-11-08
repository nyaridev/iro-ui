// InlineInput: a borderless text input for dense lists and titles edited in place. It reads like text and shows a
// field only on hover and focus. `size="lg"` is a heading as wide as its text.

// ── Dependencies ──────────────────────────
import type { ComponentProps } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface InlineInputProps extends Omit<ComponentProps<"input">, "size"> {
  /** Dimmed and italic: comments, disabled lines. */
  muted?: boolean;
  /** Monospace: lines of a list, paths. */
  mono?: boolean;
  /** `lg`: a title edited in place. */
  size?: "md" | "lg";
}

// ── Public API ────────────────────────────
/** A text input that looks like plain text until it's pointed at or focused. */
export function InlineInput({ muted, mono, size = "md", className, ...rest }: InlineInputProps) {
  return (
    <input
      spellCheck={false}
      data-muted={muted || undefined}
      data-mono={mono || undefined}
      data-size={size}
      className={cx("iro-inline-input", className)}
      {...rest}
    />
  );
}
