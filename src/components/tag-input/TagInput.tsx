// TagInput: a field that turns what's typed into tags. Enter or a comma adds one (a pasted list adds them all),
// Backspace in the empty field removes the last, and each tag has a × of its own.

// ── Dependencies ──────────────────────────
import { type KeyboardEvent, useRef, useState } from "react";
import { Chip } from "../chip/Chip";
import { cx } from "../shared/cx";
import { addTags } from "./tags";

// ── Types ─────────────────────────────────
export interface TagInputProps {
  value: string[];
  onValueChange: (tags: string[]) => void;
  placeholder?: string;
  /** The most tags; the field stops taking more. */
  max?: number;
  size?: "sm" | "md";
  disabled?: boolean;
  /** Marks it wrong; inside a Field, `error` does this already. */
  invalid?: boolean;
  id?: string;
  className?: string;
  /** The accessible name when it isn't inside a Field. */
  "aria-label"?: string;
  /** Names a tag's × button (default "Remove <tag>"). */
  removeLabel?: (tag: string) => string;
}

// ── Public API ────────────────────────────
/** A field of removable tags. */
export function TagInput({
  value,
  onValueChange,
  placeholder,
  max,
  size = "md",
  disabled,
  invalid,
  id,
  className,
  "aria-label": ariaLabel,
  removeLabel = (tag) => `Remove ${tag}`,
}: TagInputProps) {
  const [text, setText] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const commit = (typed: string) => {
    const next = addTags(value, typed, max);
    if (next.length !== value.length) onValueChange(next);
    setText("");
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === "Enter" || event.key === ",") && text.trim()) {
      event.preventDefault();
      commit(text);
    } else if (event.key === "Backspace" && !text && value.length > 0) {
      onValueChange(value.slice(0, -1));
    }
  };

  return (
    // The field's padding is part of the input's target: a click anywhere in it types.
    // biome-ignore lint/a11y/useKeyWithClickEvents lint/a11y/noStaticElementInteractions: the input inside takes the keys.
    <div
      className={cx("iro-text-field", "iro-tag-input", className)}
      data-size={size}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      onClick={() => input.current?.focus()}
    >
      {value.map((tag) => (
        <Chip
          key={tag}
          size="sm"
          removeLabel={removeLabel(tag)}
          onRemove={disabled ? undefined : () => onValueChange(value.filter((other) => other !== tag))}
        >
          {tag}
        </Chip>
      ))}
      <input
        ref={input}
        id={id}
        value={text}
        disabled={disabled}
        placeholder={value.length === 0 ? placeholder : undefined}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        className="iro-text-field-input iro-tag-input-input"
        onChange={(event) => {
          const typed = event.currentTarget.value;
          // A pasted list, or a comma typed at the end, adds what's before it.
          if (typed.includes(",")) commit(typed);
          else setText(typed);
        }}
        onKeyDown={onKeyDown}
        onBlur={() => text.trim() && commit(text)}
      />
    </div>
  );
}
