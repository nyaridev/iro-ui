// Lab page: EmptyState plain, with an action, and in the warning tone.

import { Button } from "../button/Button";
import { InfoGlyph, PlusGlyph, WarningGlyph } from "../shared/glyphs";
import { EmptyState } from "./EmptyState";

export default function EmptyStateLab() {
  return (
    <div className="lab-row" style={{ alignItems: "stretch" }}>
      <EmptyState icon={<InfoGlyph />} title="No images yet">
        Images you generate land here, newest first.
      </EmptyState>
      <EmptyState
        icon={<PlusGlyph />}
        title="No wildcards"
        action={
          <Button variant="primary" icon={<PlusGlyph />}>
            New wildcard
          </Button>
        }
      >
        Wildcards are lists a prompt picks from at random.
      </EmptyState>
      <EmptyState
        tone="warning"
        icon={<WarningGlyph />}
        title="Folder not found"
        action={<Button>Choose folder</Button>}
      >
        D:/Models/loras doesn't exist anymore.
      </EmptyState>
    </div>
  );
}
