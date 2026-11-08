// Lab page: TextArea growing with its text, mono, without the grip, invalid and disabled.

import { useState } from "react";
import { TextArea } from "./TextArea";

const SETTINGS = JSON.stringify({ theme: "dark", fontSize: 14, autosave: true }, null, 2);
const NOTES = "Meeting notes: agree on the timeline, share the draft by Friday, book a room for next week";

export default function TextAreaLab() {
  const [notes, setNotes] = useState(NOTES);

  return (
    <div className="lab-stack" style={{ maxWidth: 420 }}>
      <TextArea value={notes} onChange={(event) => setNotes(event.target.value)} aria-label="Notes" />
      <p className="lab-hint">
        Type to grow it (up to 12 rows). Drag the grip for a size of your own; double-click it to fit the text again.
      </p>
      <TextArea placeholder="A short summary…" aria-label="Summary" />
      <TextArea mono maxRows={4} defaultValue={SETTINGS} aria-label="Settings JSON" />
      <TextArea resizable={false} autoGrow={false} defaultValue="No grip, fixed height" aria-label="Fixed" />
      <TextArea invalid defaultValue="Something wrong" aria-label="Invalid" />
      <TextArea disabled defaultValue="Disabled" aria-label="Disabled" />
    </div>
  );
}
