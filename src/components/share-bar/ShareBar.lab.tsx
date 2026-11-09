// Lab page: ShareBar with its legend, and the small size without one, for a dense row.

import { ShareBar } from "./ShareBar";

export default function ShareBarLab() {
  return (
    <div className="lab-stack">
      <h3>With a legend</h3>
      <ShareBar
        label="Certificates by type"
        parts={[
          { name: "Internal", value: 190 },
          { name: "Public", value: 94 },
          { name: "Mutual TLS", value: 28 },
        ]}
      />
      <h3>Small, no legend</h3>
      <ShareBar
        label="Storage by kind"
        size="sm"
        legend={false}
        parts={[
          { name: "Images", value: 41 },
          { name: "Video", value: 33 },
          { name: "Documents", value: 14 },
          { name: "Other", value: 12 },
        ]}
      />
    </div>
  );
}
