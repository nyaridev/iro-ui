// Lab page: EmptyState plain, with an action, and in the warning tone.

import { Button } from "../button/Button";
import { InfoGlyph, PlusGlyph, WarningGlyph } from "../shared/glyphs";
import { EmptyState } from "./EmptyState";

export default function EmptyStateLab() {
  return (
    <div className="lab-row" style={{ alignItems: "stretch" }}>
      <EmptyState icon={<InfoGlyph />} title="No files yet">
        Files you add land here, newest first.
      </EmptyState>
      <EmptyState
        icon={<PlusGlyph />}
        title="No templates"
        action={
          <Button variant="primary" icon={<PlusGlyph />}>
            New template
          </Button>
        }
      >
        Templates are starting points for new documents.
      </EmptyState>
      <EmptyState
        tone="warning"
        icon={<WarningGlyph />}
        title="Folder not found"
        action={<Button>Choose folder</Button>}
      >
        The archive folder was moved or deleted.
      </EmptyState>
    </div>
  );
}
