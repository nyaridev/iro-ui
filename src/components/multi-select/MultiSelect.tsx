// MultiSelect: pick any number of options. The list stays open while picking; the button shows the picks joined with
// commas.

// ── Dependencies ──────────────────────────
import { Select as BaseSelect } from "@base-ui/react/select";
import { useIroLayer } from "../../root/IroRoot";
import { groupOptions, type SelectOption } from "../select/options";
import { cx } from "../shared/cx";
import { CheckGlyph, ChevronDownGlyph } from "../shared/glyphs";

// ── Constants ─────────────────────────────
const OFFSET = 4;

// ── Types ─────────────────────────────────
export interface MultiSelectProps<T extends string> {
  options: SelectOption<T>[];
  value: T[];
  onValueChange: (value: T[]) => void;
  /** Shown while nothing is picked. */
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  id?: string;
  className?: string;
  /** The accessible name when it isn't inside a Field. */
  "aria-label"?: string;
}

// ── Private helpers ───────────────────────
/** One row: a check slot, then the label. */
function OptionRow<T extends string>({ option }: { option: SelectOption<T> }) {
  return (
    <BaseSelect.Item value={option.value} disabled={option.disabled} className="iro-option">
      <span className="iro-option-slot">
        <BaseSelect.ItemIndicator className="iro-option-check">
          <CheckGlyph />
        </BaseSelect.ItemIndicator>
      </span>
      <BaseSelect.ItemText className="iro-option-label">{option.label}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

// ── Public API ────────────────────────────
/** A dropdown that picks several options. */
export function MultiSelect<T extends string>({
  options,
  value,
  onValueChange,
  placeholder = "None",
  size = "md",
  disabled,
  id,
  className,
  "aria-label": ariaLabel,
}: MultiSelectProps<T>) {
  const layer = useIroLayer();
  const groups = groupOptions(options);
  const labelOf = (picked: T) => options.find((option) => option.value === picked)?.label ?? picked;

  return (
    <BaseSelect.Root multiple value={value} onValueChange={(next) => onValueChange(next as T[])} disabled={disabled}>
      <BaseSelect.Trigger id={id} aria-label={ariaLabel} data-size={size} className={cx("iro-select", className)}>
        <BaseSelect.Value className="iro-select-value">
          {(picked: T[]) =>
            picked.length ? (
              picked.map(labelOf).join(", ")
            ) : (
              <span className="iro-select-placeholder">{placeholder}</span>
            )
          }
        </BaseSelect.Value>
        <BaseSelect.Icon className="iro-select-icon">
          <ChevronDownGlyph />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal container={layer}>
        <BaseSelect.Positioner sideOffset={OFFSET} alignItemWithTrigger={false} className="iro-positioner">
          <BaseSelect.Popup className="iro-popup iro-popup-list">
            {groups
              ? groups.map((group) => (
                  <BaseSelect.Group key={group.value}>
                    {group.value ? (
                      <BaseSelect.GroupLabel className="iro-popup-label">{group.value}</BaseSelect.GroupLabel>
                    ) : null}
                    {group.items.map((option) => (
                      <OptionRow key={option.value} option={option} />
                    ))}
                  </BaseSelect.Group>
                ))
              : options.map((option) => <OptionRow key={option.value} option={option} />)}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
