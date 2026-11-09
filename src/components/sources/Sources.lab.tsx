// Lab page: Sources folded and open, with Citation markers in an answer's text.

import { Citation } from "../citation/Citation";
import { Prose } from "../prose/Prose";
import { type ChatSource, Sources } from "./Sources";

const SOURCES: ChatSource[] = [
  {
    title: "Exporting your data",
    href: "#help-export",
    site: "help.example.com",
    description: "CSV and JSON exports.",
  },
  { title: "Release notes 2.4", href: "#notes", site: "example.com", description: "Shared folders and search." },
  { title: "Plans and limits", href: "#plans", site: "example.com" },
];

export default function SourcesLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <Prose size="sm">
        <p>
          Every plan can export to CSV and JSON <Citation index={1} source={SOURCES[0]} />, and large exports run in the
          background since version 2.4 <Citation index={2} source={SOURCES[1]} />.
        </p>
      </Prose>
      <Sources sources={SOURCES} />
      <h3>Open</h3>
      <Sources sources={SOURCES} defaultOpen />
    </div>
  );
}
