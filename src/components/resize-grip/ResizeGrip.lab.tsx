// Lab page: grips on a panel's right edge, its left edge and its corner; double-click goes back to the default size.

import { useRef } from "react";
import { ResizeGrip } from "./ResizeGrip";

export default function ResizeGripLab() {
  const wide = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const both = useRef<HTMLDivElement>(null);

  return (
    <div className="lab-row" style={{ alignItems: "flex-start" }}>
      <div ref={wide} className="lab-card" style={{ position: "relative", width: 220 }}>
        Drag the right edge
        <ResizeGrip target={wide} axis="x" label="Panel width" />
      </div>
      <div ref={left} className="lab-card" style={{ position: "relative", width: 220, marginLeft: "auto" }}>
        Drag the left edge
        <ResizeGrip target={left} axis="x" side="start" label="Side panel width" />
      </div>
      <div ref={both} className="lab-card" style={{ position: "relative", width: 220, height: 120 }}>
        Drag the corner; double-click it to reset
        <ResizeGrip target={both} axis="both" label="Panel size" />
      </div>
    </div>
  );
}
