// Lab page: DropZone full and compact, taking several files, and busy.

import { useState } from "react";
import { DropZone } from "./DropZone";

export default function DropZoneLab() {
  const [files, setFiles] = useState<string[]>([]);
  const take = (picked: File[]) => setFiles(picked.map((file) => file.name));

  return (
    <div className="lab-stack" style={{ maxWidth: 420 }}>
      <DropZone title="Drop an image" hint="PNG, JPG or WebP, up to 20 MB" accept="image/*" onFiles={take} />
      <DropZone compact multiple title="Add files" hint="Drop several, or click to pick" onFiles={take} />
      <DropZone compact disabled title="Reading the last files…" onFiles={take} />
      <p className="lab-hint">Last: {files.length ? files.join(", ") : "nothing yet"}</p>
    </div>
  );
}
