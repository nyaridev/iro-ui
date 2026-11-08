// Lab page: a small tree of TreeRows: folders open and closed, a selected file with unsaved changes, meta, actions,
// and the larger sidebar size.

import { useState } from "react";
import { IconButton } from "../icon-button/IconButton";
import { CloseGlyph, InfoGlyph, PlusGlyph } from "../shared/glyphs";
import { TreeRow } from "./TreeRow";

export default function TreeRowLab() {
  const [open, setOpen] = useState({ characters: true, places: false });
  const [selected, setSelected] = useState("hero.txt");
  const remove = <IconButton icon={<CloseGlyph />} label="Remove" size="sm" tooltip={false} />;

  return (
    <div className="lab-stack" style={{ width: 300, gap: 0, alignItems: "stretch" }}>
      <TreeRow
        label="characters"
        icon={<PlusGlyph />}
        open={open.characters}
        meta="3"
        onClick={() => setOpen({ ...open, characters: !open.characters })}
      />
      {open.characters
        ? ["hero.txt", "villain.txt", "sidekick.txt"].map((name) => (
            <TreeRow
              key={name}
              depth={1}
              label={name}
              icon={<InfoGlyph />}
              selected={selected === name}
              dirty={name === "hero.txt"}
              actions={remove}
              onClick={() => setSelected(name)}
            />
          ))
        : null}
      <TreeRow
        label="places"
        icon={<PlusGlyph />}
        open={open.places}
        meta="12"
        onClick={() => setOpen({ ...open, places: !open.places })}
      />
      <TreeRow size="lg" label="A roomier sidebar row" icon={<InfoGlyph />} meta="lg" onClick={() => {}} />
    </div>
  );
}
