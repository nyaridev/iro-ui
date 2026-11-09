// Lab page: Select flat and grouped, with icons and hints, at every size, inside a Field, invalid and disabled.

import { useState } from "react";
import { Field } from "../field/Field";
import { InfoGlyph, SuccessGlyph } from "../shared/glyphs";
import type { SelectOption } from "./options";
import { Select } from "./Select";

const FONTS: SelectOption<string>[] = [
  { value: "sans", label: "Sans serif" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Monospace" },
  { value: "rounded", label: "Rounded" },
  { value: "script", label: "Handwriting", disabled: true },
];

const PLACES: SelectOption<string>[] = [
  { value: "computer", label: "This computer", group: "Local", icon: <SuccessGlyph />, hint: "120 GB free" },
  { value: "external", label: "External drive", group: "Local", icon: <SuccessGlyph />, hint: "1.8 TB free" },
  { value: "cloud", label: "Cloud drive", group: "Online", icon: <InfoGlyph />, hint: "Not connected" },
  { value: "team", label: "Team drive", group: "Online", icon: <InfoGlyph />, hint: "Not connected" },
];

export default function SelectLab() {
  const [font, setFont] = useState<string | null>("sans");
  const [place, setPlace] = useState<string | null>("computer");

  return (
    <div className="lab-stack" style={{ maxWidth: 360 }}>
      <Field label="Font" data-lab-state="click">
        <Select options={FONTS} value={font} onValueChange={setFont} />
      </Field>
      <Field label="Save to" hint='Type "drive" to filter.'>
        <Select options={PLACES} value={place} onValueChange={setPlace} placeholder="Pick a place" />
      </Field>
      <Select size="sm" options={FONTS} value={font} onValueChange={setFont} aria-label="Small" />
      <Select size="lg" options={FONTS} value={font} onValueChange={setFont} aria-label="Large" />
      <Select
        options={FONTS}
        value={null}
        onValueChange={() => {}}
        invalid
        placeholder="Invalid"
        aria-label="Invalid"
      />
      <Select options={FONTS} value="sans" onValueChange={() => {}} disabled aria-label="Disabled" />
    </div>
  );
}
