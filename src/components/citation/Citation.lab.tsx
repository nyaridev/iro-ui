// Lab page: Citation markers in a sentence; rest the pointer on one, or tab to it.

import { Citation } from "./Citation";

export default function CitationLab() {
  return (
    <p style={{ maxWidth: 520, margin: 0, lineHeight: 1.7 }}>
      The export keeps every field{" "}
      <Citation
        index={1}
        source={{
          title: "Exporting your data",
          href: "#export",
          site: "help.example.com",
          description: "CSV and JSON exports, with every field.",
        }}
      />{" "}
      and runs in the background for large projects{" "}
      <Citation index={2} source={{ title: "Release notes 2.4", href: "#notes", site: "example.com" }} />.
    </p>
  );
}
