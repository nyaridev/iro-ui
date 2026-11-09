// Lab page: Menubar of a desktop app, with shortcuts, separators and a turned-off item.

import { useState } from "react";
import { Menubar } from "./Menubar";

export default function MenubarLab() {
  const [last, setLast] = useState("Nothing yet.");
  const item = (label: string, shortcut?: string, disabled?: boolean) => ({
    label,
    shortcut,
    disabled,
    onSelect: () => setLast(label),
  });
  return (
    <div className="lab-stack">
      <Menubar
        menus={[
          {
            label: "File",
            items: [
              item("New file", "Ctrl N"),
              item("Open…", "Ctrl O"),
              "separator",
              item("Save", "Ctrl S"),
              item("Save as…"),
            ],
          },
          {
            label: "Edit",
            items: [
              item("Undo", "Ctrl Z"),
              item("Redo", "Ctrl Y", true),
              "separator",
              item("Cut", "Ctrl X"),
              item("Copy", "Ctrl C"),
              item("Paste", "Ctrl V"),
            ],
          },
          { label: "View", items: [item("Zoom in", "Ctrl +"), item("Zoom out", "Ctrl -"), item("Full screen", "F11")] },
          { label: "Help", items: [item("Shortcuts", "?"), item("About")] },
        ]}
      />
      <span className="lab-hint">Last picked: {last}</span>
    </div>
  );
}
