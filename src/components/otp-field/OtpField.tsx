// OtpField: a one-time code, one box per character. Typing moves to the next box, Backspace to the one before, and
// pasting fills them all. Base UI's OTP field handles the keys and the browser's code autofill.

// ── Dependencies ──────────────────────────
import { OTPField } from "@base-ui/react/otp-field";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface OtpFieldProps {
  /** How many characters (default 6). */
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called once every box is filled. */
  onComplete?: (value: string) => void;
  /** `numeric` (default) takes digits only; `alphanumeric` letters too. */
  type?: "numeric" | "alphanumeric";
  /** Puts a gap after this many boxes: 3 for "123 456". */
  groupSize?: number;
  /** Hides what's typed, like a password. */
  mask?: boolean;
  disabled?: boolean;
  /** Marks it wrong; inside a Field, `error` does this already. */
  invalid?: boolean;
  name?: string;
  className?: string;
  /** What the code is, for screen readers ("Verification code"), when no Field names it. */
  "aria-label"?: string;
}

// ── Public API ────────────────────────────
/** Boxes for a one-time code. */
export function OtpField({
  length = 6,
  value,
  defaultValue,
  onValueChange,
  onComplete,
  type = "numeric",
  groupSize,
  mask,
  disabled,
  invalid,
  name,
  className,
  "aria-label": ariaLabel,
}: OtpFieldProps) {
  return (
    <OTPField.Root
      length={length}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange ? (next) => onValueChange(next) : undefined}
      onValueComplete={onComplete ? (next) => onComplete(next) : undefined}
      validationType={type}
      mask={mask}
      disabled={disabled}
      name={name}
      aria-label={ariaLabel}
      data-invalid={invalid || undefined}
      className={cx("iro-otp-field", className)}
    >
      {Array.from({ length }, (_, index) => (
        <OTPField.Input
          // biome-ignore lint/suspicious/noArrayIndexKey: a box is its place in the code.
          key={index}
          aria-invalid={invalid || undefined}
          data-group-end={(groupSize && (index + 1) % groupSize === 0 && index < length - 1) || undefined}
          className="iro-otp-field-box"
        />
      ))}
    </OTPField.Root>
  );
}
