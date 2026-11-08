// Select: pick one option from a list you can type into. Typing keeps the options whose label has every word typed;
// ↑ ↓ move, Enter picks, Esc closes. Options can sit under group headings.

// ── Dependencies ──────────────────────────
import { Combobox } from "@base-ui/react/combobox";
import { useIroLayer } from "../../root/IroRoot";
import { cx } from "../shared/cx";
import { CheckGlyph, ChevronDownGlyph } from "../shared/glyphs";
import { groupOptions, matchesAllWords, type OptionGroup, type SelectOption } from "./options";

// ── Constants ─────────────────────────────
const OFFSET = 4;

// ── Types ─────────────────────────────────
export interface SelectProps<T extends string> {
  options: SelectOption<T>[];
  value: T | null;
  onValueChange: (value: T | null) => void;
  placeholder?: string;
  /** Shown when typing matches nothing. */
  emptyText?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Marks it wrong; inside a Field, `error` does this already. */
  invalid?: boolean;
  id?: string;
  className?: string;
  /** The accessible name when it isn't inside a Field. */
  "aria-label"?: string;
  /** Accessible name of the arrow button. */
  openLabel?: string;
}

// ── Private helpers ───────────────────────
/** One row of the list: a check slot for the picked option, then the label. */
function OptionRow<T extends string>({ option }: { option: SelectOption<T> }) {
  return (
    <Combobox.Item value={option} disabled={option.disabled} className="iro-option">
      <span className="iro-option-slot">
        <Combobox.ItemIndicator className="iro-option-check">
          <CheckGlyph />
        </Combobox.ItemIndicator>
      </span>
      {option.icon ? <span className="iro-option-icon">{option.icon}</span> : null}
      <span className="iro-option-label">{option.label}</span>
      {option.hint ? <span className="iro-option-end">{option.hint}</span> : null}
    </Combobox.Item>
  );
}

// ── Public API ────────────────────────────
/** A searchable dropdown that picks one option. */
export function Select<T extends string>({
  options,
  value,
  onValueChange,
  placeholder,
  emptyText = "No matches",
  size = "md",
  disabled,
  invalid,
  id,
  className,
  "aria-label": ariaLabel,
  openLabel = "Show options",
}: SelectProps<T>) {
  const layer = useIroLayer();
  const groups = groupOptions(options);
  const picked = options.find((option) => option.value === value) ?? null;

  return (
    <Combobox.Root
      items={groups ?? options}
      value={picked}
      onValueChange={(next: SelectOption<T> | null) => onValueChange(next ? next.value : null)}
      itemToStringLabel={(option: SelectOption<T>) => option.label}
      isItemEqualToValue={(option: SelectOption<T>, other: SelectOption<T>) => option.value === other.value}
      filter={(option: SelectOption<T>, query: string) => matchesAllWords(option.label, query)}
      // The first match is marked while typing, so Enter picks it.
      autoHighlight
      disabled={disabled}
    >
      <Combobox.InputGroup className={cx("iro-select", className)} data-size={size} data-invalid={invalid || undefined}>
        {picked?.icon ? <span className="iro-select-lead">{picked.icon}</span> : null}
        <Combobox.Input
          className="iro-select-input"
          placeholder={placeholder}
          id={id}
          aria-label={ariaLabel}
          aria-invalid={invalid || undefined}
        />
        <Combobox.Trigger className="iro-select-icon" aria-label={openLabel}>
          <ChevronDownGlyph />
        </Combobox.Trigger>
      </Combobox.InputGroup>
      <Combobox.Portal container={layer}>
        <Combobox.Positioner sideOffset={OFFSET} className="iro-positioner">
          <Combobox.Popup className="iro-popup">
            <Combobox.Empty>
              <div className="iro-popup-empty">{emptyText}</div>
            </Combobox.Empty>
            <Combobox.List className="iro-popup-list">
              {groups
                ? (group: OptionGroup<T>) => (
                    <Combobox.Group key={group.value} items={group.items}>
                      {group.value ? (
                        <Combobox.GroupLabel className="iro-popup-label">{group.value}</Combobox.GroupLabel>
                      ) : null}
                      <Combobox.Collection>
                        {(option: SelectOption<T>) => <OptionRow key={option.value} option={option} />}
                      </Combobox.Collection>
                    </Combobox.Group>
                  )
                : (option: SelectOption<T>) => <OptionRow key={option.value} option={option} />}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}
