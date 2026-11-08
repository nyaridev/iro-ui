// Lab page: Meter calm, warning and full, and one with its tone off.

import { Meter } from "./Meter";

export default function MeterLab() {
  return (
    <div className="lab-stack">
      <Meter label="Memory" value={3.2} max={8} valueText="3.2 / 8 GB" />
      <Meter label="Disk" value={81} valueText="81%" />
      <Meter label="Queue" value={19} max={20} valueText="19 / 20" />
      <Meter label="Upload" value={95} tone={false} />
    </div>
  );
}
