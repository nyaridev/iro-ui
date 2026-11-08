// Lab page: Collapsible plain, with a summary and an on/off switch, and inset.

import { useState } from "react";
import { Field } from "../field/Field";
import { NumberField } from "../number-field/NumberField";
import { Collapsible } from "./Collapsible";

export default function CollapsibleLab() {
  const [enabled, setEnabled] = useState(true);
  const [steps, setSteps] = useState<number | null>(12);

  return (
    <div className="lab-stack" style={{ alignItems: "stretch", maxWidth: 480 }}>
      <Collapsible title="Advanced" defaultOpen>
        Anything that most people never need to touch.
      </Collapsible>
      <Collapsible
        title="Hires fix"
        summary={enabled ? `${steps ?? "?"} steps · 0.35 denoise` : "off"}
        enabled={enabled}
        onEnabledChange={setEnabled}
        enabledLabel="Use hires fix"
      >
        <Field label="Steps" layout="left">
          <NumberField value={steps} onValueChange={setSteps} min={1} max={60} />
        </Field>
      </Collapsible>
      <Collapsible title="Inset section" tone="inset">
        Sits inside a card without stacking a second raised surface.
      </Collapsible>
    </div>
  );
}
