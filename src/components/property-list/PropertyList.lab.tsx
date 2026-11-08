// Lab page: PropertyList with mono and copyable values; the empty row is skipped.

import { PropertyList } from "./PropertyList";

export default function PropertyListLab() {
  return (
    <div style={{ maxWidth: 440 }}>
      <PropertyList
        properties={[
          { label: "Name", value: "sdxl_base_1.0.safetensors" },
          { label: "Size", value: "6.94 GB", mono: true },
          {
            label: "SHA-256",
            value: "31e35c80fc…a7b6c8",
            mono: true,
            copy: "31e35c80fc4829d14f90153f4c74cd59c90b779f6afe05a74cd6ffb4ff7ea7b6c8",
          },
          { label: "Seed", value: 1234567890, mono: true, copy: "1234567890" },
          { label: "Notes", value: "" },
          { label: "Folder", value: "D:/Models/checkpoints", mono: true },
        ]}
      />
    </div>
  );
}
