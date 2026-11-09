// Lab page: WindowDrop listening while this page is open; the button shows the overlay without a drag.

import { useState } from "react";
import { Button } from "../button/Button";
import { WindowDrop } from "./WindowDrop";

export default function WindowDropLab() {
  const [files, setFiles] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  return (
    <div className="lab-stack">
      <p>Drag files from your desktop anywhere over this window, then drop them.</p>
      <Button onClick={() => setOpen(!open)} data-lab-state="click">
        {open ? "Hide the overlay" : "Show the overlay"}
      </Button>
      <p className="lab-hint">Dropped: {files.length ? files.join(", ") : "nothing yet"}</p>
      <WindowDrop
        onFiles={(dropped) => setFiles(dropped.map((file) => file.name))}
        open={open || undefined}
        hint="Files and folders go to the open tab"
      />
    </div>
  );
}
