// Lab page: UsageMeter part used with a breakdown, and nearly full.

import { UsageMeter } from "./UsageMeter";

export default function UsageMeterLab() {
  return (
    <div className="lab-stack">
      <h3>Click to see the breakdown</h3>
      <UsageMeter
        used={84_000}
        total={200_000}
        unit="tokens"
        parts={[
          { name: "Messages", value: 52_000 },
          { name: "Files", value: 24_000 },
          { name: "Tools", value: 8_000 },
        ]}
      />
      <h3>Nearly full</h3>
      <UsageMeter label="Storage" used={47.2} total={50} format={(value) => `${value} GB`} />
    </div>
  );
}
