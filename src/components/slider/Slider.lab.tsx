// Lab page: Slider with a label and typeable value, with marks and a reset, uncontrolled, and disabled.

import { useState } from "react";
import { Slider } from "./Slider";

export default function SliderLab() {
  const [volume, setVolume] = useState(70);
  const [committed, setCommitted] = useState(70);

  return (
    <div className="lab-stack" style={{ maxWidth: 360 }}>
      <Slider
        label="Volume"
        value={volume}
        onValueChange={setVolume}
        onValueCommit={setCommitted}
        min={0}
        max={100}
        step={1}
        resetValue={70}
        marks={[50, 70]}
      />
      <p className="lab-hint">
        Saved: {committed}. Click the value to type one; double-click the track to reset to 70.
      </p>
      <Slider
        label="Opacity"
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
