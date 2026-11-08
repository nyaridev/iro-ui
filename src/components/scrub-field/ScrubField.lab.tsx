// Lab page: ScrubField at each size, with units, decimals, a reset value and disabled.

import { useState } from "react";
import { ScrubField } from "./ScrubField";

export default function ScrubFieldLab() {
  const [zoom, setZoom] = useState(100);
  const [opacity, setOpacity] = useState(0.35);
  const [width, setWidth] = useState(1024);

  return (
    <div className="lab-stack" style={{ maxWidth: 280 }}>
      <ScrubField
        label="Zoom"
        unit="%"
        value={zoom}
        onValueChange={setZoom}
        min={25}
        max={400}
        step={5}
        defaultValue={100}
      />
      <ScrubField label="Opacity" value={opacity} onValueChange={setOpacity} min={0} max={1} step={0.05} size="sm" />
      <ScrubField
        label="Width"
        unit="px"
        value={width}
        onValueChange={setWidth}
        min={256}
        max={2048}
        step={64}
        size="lg"
      />
      <ScrubField label="Locked" value={20} onValueChange={() => {}} min={1} max={50} disabled />
      <p className="lab-hint">
        Drag sideways (Shift: fine), click to type, double-click Zoom to reset it to 100, or use the arrow keys.
      </p>
    </div>
  );
}
