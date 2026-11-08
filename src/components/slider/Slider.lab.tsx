// Lab page: Slider with a label and typeable value, with marks and a reset, uncontrolled, and disabled.

import { useState } from "react";
import { Slider } from "./Slider";

export default function SliderLab() {
  const [cfg, setCfg] = useState(7);
  const [committed, setCommitted] = useState(7);

  return (
    <div className="lab-stack" style={{ maxWidth: 360 }}>
      <Slider
        label="CFG scale"
        value={cfg}
        onValueChange={setCfg}
        onValueCommit={setCommitted}
        min={1}
        max={30}
        step={0.5}
        resetValue={7}
        marks={[7, 15]}
      />
      <p className="lab-hint">Saved: {committed}. Click the value to type one; double-click the track to reset to 7.</p>
      <Slider
        label="Denoise"
        defaultValue={0.35}
        min={0}
        max={1}
        step={0.05}
        format={(v) => `${Math.round(v * 100)}%`}
      />
      <Slider defaultValue={40} aria-label="No label" />
      <Slider label="Disabled" defaultValue={60} disabled />
    </div>
  );
}
