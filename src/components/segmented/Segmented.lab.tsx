// Lab page: Segmented at both sizes, with icons, filling the row, and with a disabled option.

import { useState } from "react";
import { CheckGlyph, InfoGlyph } from "../shared/glyphs";
import { Segmented } from "./Segmented";

export default function SegmentedLab() {
  const [view, setView] = useState<"grid" | "list" | "compact">("grid");
  const [mode, setMode] = useState<"brush" | "eraser">("brush");

  return (
    <div className="lab-stack">
      <Segmented
        aria-label="View"
        value={view}
        onValueChange={setView}
        options={[
          { value: "grid", label: "Grid" },
          { value: "list", label: "List" },
          { value: "compact", label: "Compact list" },
        ]}
      />
      <Segmented
        aria-label="Tool"
        size="sm"
        value={mode}
        onValueChange={setMode}
        options={[
          { value: "brush", label: "Brush", icon: <CheckGlyph /> },
          { value: "eraser", label: "Eraser", icon: <InfoGlyph /> },
        ]}
      />
      <div style={{ maxWidth: 420 }}>
        <Segmented
          aria-label="View, full width"
          full
          value={view}
          onValueChange={setView}
          options={[
            { value: "grid", label: "Grid" },
            { value: "list", label: "List" },
            { value: "compact", label: "Compact", disabled: true },
          ]}
        />
      </div>
    </div>
  );
}
