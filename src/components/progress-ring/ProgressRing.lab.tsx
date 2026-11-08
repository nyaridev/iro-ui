// Lab page: ProgressRing at a few values and sizes, inside a header chip, in the accent and text colors.

import { ProgressRing } from "./ProgressRing";

export default function ProgressRingLab() {
  return (
    <div className="lab-row" style={{ gap: 20 }}>
      <ProgressRing value={0.1} />
      <ProgressRing value={0.45} />
      <ProgressRing value={1} />
      <span style={{ color: "var(--iro-accent-ink)" }}>
        <ProgressRing value={0.7} size={28} label="Downloading" />
      </span>
      <span className="lab-chip lab-row" style={{ gap: 6 }}>
        <ProgressRing value={0.6} size={16} /> 3 downloads
      </span>
    </div>
  );
}
