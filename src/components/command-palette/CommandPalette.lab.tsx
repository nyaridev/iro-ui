// Lab page: a button (or Ctrl K) opens the CommandPalette over pages, files and actions; the pick shows below.

import { useEffect, useState } from "react";
import { Button } from "../button/Button";
import { Kbd } from "../kbd/Kbd";
import { InfoGlyph, PlusGlyph } from "../shared/glyphs";
import { CommandPalette, type PaletteItem } from "./CommandPalette";

const ITEMS: PaletteItem[] = [
  { id: "home", label: "Home", group: "Pages", keys: ["G"] },
  { id: "files", label: "Files", group: "Pages", keys: ["F"] },
  { id: "projects", label: "Projects", group: "Pages", hint: "Recent and shared" },
  { id: "settings", label: "Settings", group: "Pages", keywords: "preferences options", keys: ["Ctrl", ","] },
  { id: "report", label: "annual-report.pdf", group: "Files", icon: <InfoGlyph />, hint: "Document" },
  { id: "budget", label: "budget.xlsx", group: "Files", icon: <InfoGlyph />, hint: "Spreadsheet" },
  { id: "photo", label: "team-photo.jpg", group: "Files", icon: <InfoGlyph />, hint: "Image" },
  { id: "new", label: "New project", group: "Actions", icon: <PlusGlyph />, keys: ["Ctrl", "N"] },
  { id: "theme", label: "Switch theme", group: "Actions", keywords: "dark light" },
];

export default function CommandPaletteLab() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      // The Lab can show this page in several columns: the first palette takes the shortcut.
      if (event.defaultPrevented) return;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="lab-stack">
      <Button onClick={() => setOpen(true)} data-lab-state="click">
        Open the palette <Kbd>Ctrl K</Kbd>
      </Button>
      <p className="lab-hint">Picked: {picked ?? "nothing yet"}. Try typing "set" or "budget sheet".</p>
      <CommandPalette open={open} onOpenChange={setOpen} items={ITEMS} onPick={(item) => setPicked(item.label)} />
    </div>
  );
}
