// Lab page: ColorPicker with presets, in a Field, small, and turned off.

import { useState } from "react";
import { Field } from "../field/Field";
import { ColorPicker } from "./ColorPicker";

const PRESETS = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300", "#6250d6", "#e34948"];

export default function ColorPickerLab() {
  const [label, setLabel] = useState("#2a78d6");
  const [accent, setAccent] = useState("#6250d6");
  return (
    <div className="lab-stack">
      <h3>With presets (click to open)</h3>
      <div className="lab-row">
        <ColorPicker aria-label="Label color" value={label} onValueChange={setLabel} swatches={PRESETS} />
        <span className="lab-chip" style={{ borderColor: label }}>
          Label
        </span>
      </div>
      <h3>In a Field, small</h3>
      <Field label="Accent">
        <ColorPicker size="sm" value={accent} onValueChange={setAccent} />
      </Field>
      <h3>Turned off</h3>
      <ColorPicker aria-label="Locked color" value="#1baf7a" onValueChange={() => undefined} disabled />
    </div>
  );
}
