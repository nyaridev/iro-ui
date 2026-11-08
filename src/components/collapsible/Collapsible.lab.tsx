// Lab page: Collapsible plain, with a summary and an on/off switch, and inset.

import { useState } from "react";
import { Field } from "../field/Field";
import { NumberField } from "../number-field/NumberField";
import { Collapsible } from "./Collapsible";

export default function CollapsibleLab() {
  const [enabled, setEnabled] = useState(true);
  const [minutes, setMinutes] = useState<number | null>(5);

  return (
    <div className="lab-stack" style={{ alignItems: "stretch", maxWidth: 480 }}>
      <Collapsible title="Advanced" defaultOpen>
        Anything that most people never need to touch.
      </Collapsible>
      <Collapsible
        title="Auto-save"
        summary={enabled ? `every ${minutes ?? "?"} min · 10 versions` : "off"}
        enabled={enabled}
        onEnabledChange={setEnabled}
        enabledLabel="Save automatically"
      >
        <Field label="Minutes" layout="left">
          <NumberField value={minutes} onValueChange={setMinutes} min={1} max={60} />
        </Field>
      </Collapsible>
      <Collapsible title="Inset section" tone="inset">
        Sits inside a card without stacking a second raised surface.
      </Collapsible>
    </div>
  );
}
