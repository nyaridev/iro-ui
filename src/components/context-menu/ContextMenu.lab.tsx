// Lab page: ContextMenu on a card-like area.

import { useState } from "react";
import { CloseGlyph, PlusGlyph } from "../shared/glyphs";
import { ContextMenu } from "./ContextMenu";

export default function ContextMenuLab() {
  const [last, setLast] = useState("nothing yet");

  return (
    <div className="lab-stack">
      <ContextMenu
        items={[
          { label: "Open", onSelect: () => setLast("Open") },
          { label: "Duplicate", icon: <PlusGlyph />, shortcut: "Ctrl D", onSelect: () => setLast("Duplicate") },
          "separator",
          { label: "Delete", icon: <CloseGlyph />, danger: true, onSelect: () => setLast("Delete") },
        ]}
      >
        <div className="lab-card" data-lab-state="contextmenu">
          Right-click here (or focus it and press Shift+F10)
        </div>
      </ContextMenu>
      <p className="lab-hint">Last picked: {last}</p>
    </div>
  );
}
