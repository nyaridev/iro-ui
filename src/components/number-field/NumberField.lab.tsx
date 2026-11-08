// Lab page: NumberField at every size, with limits, a percent format, invalid and disabled.

import { useState } from "react";
import { NumberField } from "./NumberField";

export default function NumberFieldLab() {
  const [steps, setSteps] = useState<number | null>(28);

  return (
    <div className="lab-stack">
      <div className="lab-row">
        <NumberField size="sm" defaultValue={1} aria-label="Small" />
        <NumberField value={steps} onValueChange={setSteps} min={1} max={150} aria-label="Steps" />
        <NumberField size="lg" defaultValue={7.5} step={0.5} aria-label="Large" />
      </div>
      <div className="lab-row">
        <NumberField defaultValue={0.35} step={0.05} format={{ style: "percent" }} aria-label="Denoise" />
        <NumberField defaultValue={0} invalid aria-label="Invalid" />
        <NumberField defaultValue={8} disabled aria-label="Disabled" />
      </div>
      <p className="lab-hint">Steps: {steps ?? "empty"} (1–150). Hover and use the wheel, or the arrow keys.</p>
    </div>
  );
}
