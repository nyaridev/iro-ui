// Lab page: PropertyList with mono and copyable values; the empty row is skipped.

import { PropertyList } from "./PropertyList";

export default function PropertyListLab() {
  return (
    <div style={{ maxWidth: 440 }}>
      <PropertyList
        properties={[
          { label: "Name", value: "annual-report.pdf" },
          { label: "Size", value: "2.4 MB", mono: true },
          {
            label: "SHA-256",
            value: "31e35c80fc…a7b6c8",
            mono: true,
            copy: "31e35c80fc4829d14f90153f4c74cd59c90b779f6afe05a74cd6ffb4ff7ea7b6c8",
          },
          { label: "ID", value: 1234567890, mono: true, copy: "1234567890" },
          { label: "Notes", value: "" },
          { label: "Folder", value: "Documents/Reports", mono: true },
        ]}
      />
    </div>
  );
}
