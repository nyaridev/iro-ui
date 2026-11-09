// Lab page: Shimmer on a status line, at two sizes.

import { Shimmer } from "./Shimmer";

export default function ShimmerLab() {
  return (
    <div className="lab-stack">
      <Shimmer>Thinking…</Shimmer>
      <Shimmer style={{ fontSize: "var(--iro-text-xl)", fontWeight: 600 }}>Searching 24 files</Shimmer>
    </div>
  );
}
