// Lab page: Chip plain, as filter toggles with counts, removable, and at every size.

import { useState } from "react";
import { InfoGlyph } from "../shared/glyphs";
import { Chip } from "./Chip";

const KINDS = [
  { name: "LoRA", count: 128 },
  { name: "Checkpoint", count: 12 },
  { name: "VAE", count: 3 },
];

export default function ChipLab() {
  const [filters, setFilters] = useState(["LoRA"]);
  const [tags, setTags] = useState(["portrait", "studio light", "film grain"]);

  return (
    <div className="lab-stack">
      <div className="lab-row">
        <Chip size="sm">small</Chip>
        <Chip>medium</Chip>
        <Chip size="lg" icon={<InfoGlyph />}>
          large
        </Chip>
      </div>
      <div className="lab-row">
        {KINDS.map(({ name, count }) => (
          <Chip
            key={name}
            count={count}
            selected={filters.includes(name)}
            onClick={() =>
              setFilters(filters.includes(name) ? filters.filter((other) => other !== name) : [...filters, name])
            }
          >
            {name}
          </Chip>
        ))}
      </div>
      <div className="lab-row">
        {tags.map((tag) => (
          <Chip key={tag} onRemove={() => setTags(tags.filter((other) => other !== tag))} removeLabel={`Remove ${tag}`}>
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
}
