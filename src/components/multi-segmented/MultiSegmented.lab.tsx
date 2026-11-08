// Lab page: MultiSegmented with an "Any" segment, small, and disabled.

import { useState } from "react";
import { MultiSegmented } from "./MultiSegmented";

const KINDS = [
  { value: "documents", label: "Documents" },
  { value: "images", label: "Images" },
  { value: "videos", label: "Videos" },
  { value: "audio", label: "Audio" },
] as const;

export default function MultiSegmentedLab() {
  const [kinds, setKinds] = useState<string[]>(["images"]);

  return (
    <div className="lab-stack">
      <MultiSegmented aria-label="Kinds" allLabel="Any" options={[...KINDS]} value={kinds} onValueChange={setKinds} />
      <MultiSegmented
        aria-label="Kinds (small)"
        size="sm"
        options={[...KINDS]}
        value={kinds}
        onValueChange={setKinds}
      />
      <MultiSegmented aria-label="Disabled" disabled options={[...KINDS]} value={["audio"]} onValueChange={() => {}} />
      <p className="lab-hint">Picked: {kinds.length ? kinds.join(", ") : "any"}</p>
    </div>
  );
}
