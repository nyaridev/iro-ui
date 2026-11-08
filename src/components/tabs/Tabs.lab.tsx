// Lab page: Tabs in both looks, with panels, icons and a disabled tab.

import { useState } from "react";
import { InfoGlyph, PlusGlyph } from "../shared/glyphs";
import { Tabs } from "./Tabs";

export default function TabsLab() {
  const [panel, setPanel] = useState<"generate" | "upscale" | "inpaint">("generate");
  const [page, setPage] = useState<"gallery" | "models" | "wildcards">("gallery");

  return (
    <div className="lab-stack" style={{ maxWidth: 520 }}>
      <Tabs
        aria-label="Pass"
        value={panel}
        onValueChange={setPanel}
        tabs={[
          { value: "generate", label: "Generate", content: <p>Prompt, size and steps go here.</p> },
          { value: "upscale", label: "Upscale", content: <p>Upscale model and factor.</p> },
          { value: "inpaint", label: "Inpaint", disabled: true, content: <p>Not ready yet.</p> },
        ]}
      />
      <Tabs
        aria-label="Section"
        variant="pill"
        value={page}
        onValueChange={setPage}
        tabs={[
          { value: "gallery", label: "Gallery", icon: <InfoGlyph /> },
          { value: "models", label: "Models", icon: <PlusGlyph /> },
          { value: "wildcards", label: "Wildcards" },
        ]}
      />
      <p className="lab-hint">Section: {page} (no panels given; the app shows them from the value)</p>
    </div>
  );
}
