// Lab page: Menu from a ⋯ button and a text button, with icons, shortcuts, a separator, a danger and a disabled item.

import { useState } from "react";
import { Button } from "../button/Button";
import { IconButton } from "../icon-button/IconButton";
import { CheckGlyph, CloseGlyph, InfoGlyph, PlusGlyph } from "../shared/glyphs";
import { Menu } from "./Menu";
import type { MenuEntry } from "./MenuEntries";

export default function MenuLab() {
  const [last, setLast] = useState("nothing yet");
  const pick = (name: string) => () => setLast(name);

  const items: MenuEntry[] = [
    { label: "Duplicate", icon: <PlusGlyph />, shortcut: "Ctrl D", onSelect: pick("Duplicate") },
    { label: "Rename", icon: <CheckGlyph />, shortcut: "F2", onSelect: pick("Rename") },
    { label: "Show in folder", icon: <InfoGlyph />, onSelect: pick("Show in folder") },
    { label: "Export (soon)", onSelect: pick("Export"), disabled: true },
    "separator",
    { label: "Delete", icon: <CloseGlyph />, danger: true, onSelect: pick("Delete") },
  ];

  return (
    <div className="lab-stack">
      <div className="lab-row">
        <Menu
          trigger={<IconButton icon={<InfoGlyph />} label="More actions" variant="secondary" data-lab-state="click" />}
          items={items}
        />
        <Menu
          trigger={<Button>Sort by</Button>}
          items={[
            { label: "Newest", onSelect: pick("Newest") },
            { label: "Oldest", onSelect: pick("Oldest") },
            { label: "Name", onSelect: pick("Name") },
          ]}
        />
      </div>
      <p className="lab-hint">Last picked: {last}</p>
    </div>
  );
}
