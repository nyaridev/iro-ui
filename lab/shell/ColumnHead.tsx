// A Lab column's header: the Style, Theme, Accent and Motion pickers for that column, and the buttons that remove it
// or add another one beside it. Drawn in the Lab's own look; the column below it shows the picked one.

// ── Dependencies ──────────────────────────
import { Icon, IconButton, Select } from "../../src";
import { CloseIcon, PlusIcon } from "../../src/icons";
import { styles } from "./discover";
import { type Look, MOTIONS, STYLE_NAMES } from "./looks";

// ── Types ─────────────────────────────────
interface ColumnHeadProps {
  look: Look;
  onChange: (look: Look) => void;
  /** Left out when it's the only column. */
  onRemove?: () => void;
  /** Left out except on the last column, while there's room for another. */
  onAdd?: () => void;
}

// ── Private helpers ───────────────────────
/** A labelled Select for one of the column's pickers. */
function Picker({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="lab-picker">
      <span aria-hidden="true">{label}</span>
      <Select
        size="sm"
        aria-label={label}
        openLabel={`Show ${label.toLowerCase()}s`}
        value={value}
        options={options.map((option) => ({ value: option, label: option }))}
        onValueChange={(next) => next && onChange(next)}
      />
    </div>
  );
}

// ── Public API ────────────────────────────
/** The pickers and buttons above one column. */
export function ColumnHead({ look, onChange, onRemove, onAdd }: ColumnHeadProps) {
  const style = styles.find(({ name }) => name === look.style);
  return (
    <div className="lab-column-head">
      <div className="lab-pickers">
        <Picker
          label="Style"
          value={look.style}
          options={STYLE_NAMES}
          onChange={(name) => {
            // A new style starts in its own default theme and accent.
            const next = styles.find((each) => each.name === name);
            onChange({ ...look, style: name, theme: next?.themes[0] ?? "", accent: next?.accents[0] ?? "" });
          }}
        />
        <Picker
          label="Theme"
          value={look.theme}
          options={style?.themes ?? []}
          onChange={(theme) => onChange({ ...look, theme })}
        />
        <Picker
          label="Accent"
          value={look.accent}
          options={style?.accents ?? []}
          onChange={(accent) => onChange({ ...look, accent })}
        />
        <Picker
          label="Motion"
          value={look.motion}
          options={MOTIONS}
          onChange={(motion) => onChange({ ...look, motion })}
        />
      </div>
      <div className="lab-column-actions">
        {onRemove && (
          <IconButton size="sm" icon={<Icon icon={CloseIcon} />} label="Remove this column" onClick={onRemove} />
        )}
        {onAdd && (
          <IconButton size="sm" icon={<Icon icon={PlusIcon} />} label="Add a column to compare" onClick={onAdd} />
        )}
      </div>
    </div>
  );
}
