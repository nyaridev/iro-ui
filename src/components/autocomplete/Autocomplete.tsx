// Autocomplete: a text field that suggests as you type (a city, a tag, a command) but takes any text. To limit the
// value to the list, use Select, which also filters as you type. ↑ ↓ move, Enter takes the marked suggestion.

// ── Dependencies ──────────────────────────
import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { ReactNode } from "react";
import { useIroLayer } from "../../root/IroRoot";
import { matchesAllWords } from "../select/options";
import { cx } from "../shared/cx";

// ── Constants ─────────────────────────────
const OFFSET = 4;

// ── Types ─────────────────────────────────
export interface AutocompleteProps {
  /** What's typed. */
  value: string;
  onValueChange: (value: string) => void;
  /** The suggestions; the ones with every typed word show. */
  suggestions: string[];
  placeholder?: string;
  /** Before the text: a search icon. */
  start?: ReactNode;
  /** Shown when typing matches no suggestion; left out, the list just closes. */
  emptyText?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Marks it wrong; inside a Field, `error` does this already. */
  invalid?: boolean;
  id?: string;
  className?: string;
  /** The accessible name when it isn't inside a Field. */
  "aria-label"?: string;
}

// ── Public API ────────────────────────────
/** A text field with suggestions. */
export function Autocomplete({
  value,
  onValueChange,
  suggestions,
  placeholder,
  start,
  emptyText,
  size = "md",
  disabled,
  invalid,
  id,
  className,
  "aria-label": ariaLabel,
}: AutocompleteProps) {
  const layer = useIroLayer();
  return (
    <BaseAutocomplete.Root
      items={suggestions}
      value={value}
      onValueChange={(next) => onValueChange(next)}
      filter={(item: string, query: string) => matchesAllWords(item, query)}
      disabled={disabled}
    >
      <BaseAutocomplete.InputGroup
        className={cx("iro-text-field", "iro-autocomplete", className)}
        data-size={size}
        data-invalid={invalid || undefined}
      >
        {start ? <span className="iro-text-field-slot">{start}</span> : null}
        <BaseAutocomplete.Input
          className="iro-text-field-input"
          placeholder={placeholder}
          id={id}
          aria-label={ariaLabel}
          aria-invalid={invalid || undefined}
        />
      </BaseAutocomplete.InputGroup>
      <BaseAutocomplete.Portal container={layer}>
        <BaseAutocomplete.Positioner sideOffset={OFFSET} className="iro-positioner">
          <BaseAutocomplete.Popup className="iro-popup iro-autocomplete-popup">
            {emptyText ? (
              <BaseAutocomplete.Empty>
                <div className="iro-popup-empty">{emptyText}</div>
              </BaseAutocomplete.Empty>
            ) : null}
            <BaseAutocomplete.List className="iro-popup-list">
              {(item: string) => (
                <BaseAutocomplete.Item key={item} value={item} className="iro-option">
                  <span className="iro-option-label">{item}</span>
                </BaseAutocomplete.Item>
              )}
            </BaseAutocomplete.List>
          </BaseAutocomplete.Popup>
        </BaseAutocomplete.Positioner>
      </BaseAutocomplete.Portal>
    </BaseAutocomplete.Root>
  );
}
