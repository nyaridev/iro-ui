// Lab page: InlineInput as an editable title, as lines of a list (one muted), and disabled.

import { useState } from "react";
import { InlineInput } from "./InlineInput";

export default function InlineInputLab() {
  const [title, setTitle] = useState("My project");

  return (
    <div className="lab-stack">
      <InlineInput size="lg" value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Title" />
      <div className="lab-stack" style={{ gap: 2, width: 320 }}>
        <InlineInput mono defaultValue="Buy groceries" aria-label="Line 1" />
        <InlineInput mono defaultValue="Call the dentist" aria-label="Line 2" />
        <InlineInput mono muted defaultValue="# a comment" aria-label="Line 3" />
        <InlineInput defaultValue="Disabled" disabled aria-label="Disabled" />
      </div>
    </div>
  );
}
