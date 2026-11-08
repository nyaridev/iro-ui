// Lab page: ProgressBar at a few values, in every tone, both sizes, and unknown.

import { useState } from "react";
import { ProgressBar } from "./ProgressBar";

export default function ProgressBarLab() {
  const [value, setValue] = useState(0.42);

  return (
    <div className="lab-stack" style={{ maxWidth: 420 }}>
      <ProgressBar value={value} label="Download" />
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        aria-label="Lab: set the progress"
      />
      <ProgressBar value={1} tone="success" label="Done" />
      <ProgressBar value={0.7} tone="danger" label="Stopped" />
      <ProgressBar value={0.3} size="sm" label="Small" />
      <ProgressBar value={null} label="Waiting for ComfyUI" />
    </div>
  );
}
