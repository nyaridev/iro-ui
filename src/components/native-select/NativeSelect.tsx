// NativeSelect: the browser's own select in the Select field look, for long forms and phones, where the system's
// list (a wheel on phones) is what people expect. Options are plain `<option>` and `<optgroup>` children. Inside a
// Field, the label names it.

// ── Dependencies ──────────────────────────
import { Field as BaseField } from "@base-ui/react/field";
import type { ComponentProps } from "react";
import { cx } from "../shared/cx";
import { ChevronDownGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface NativeSelectProps extends Omit<ComponentProps<"select">, "size" | "multiple"> {
  size?: "sm" | "md" | "lg";
  /** Marks it wrong; inside a Field, `error` does this already. */
  invalid?: boolean;
}

// ── Public API ────────────────────────────
/** The browser's select, styled like Select. */
export function NativeSelect({ size = "md", invalid, className, style, children, ...rest }: NativeSelectProps) {
  return (
    <span
      data-size={size}
      data-invalid={invalid || undefined}
      className={cx("iro-select", "iro-native-select", className)}
      style={style}
    >
      <BaseField.Control
        render={<select />}
        className="iro-native-select-input"
        aria-invalid={invalid || undefined}
        {...(rest as ComponentProps<typeof BaseField.Control>)}
      >
        {children}
      </BaseField.Control>
      <span className="iro-select-icon" aria-hidden="true">
        <ChevronDownGlyph />
      </span>
    </span>
  );
}
