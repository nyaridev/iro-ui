// Lab page: SectionTitle plain, with an icon, and with actions.

import { Button } from "../button/Button";
import { InfoGlyph } from "../shared/glyphs";
import { SectionTitle } from "./SectionTitle";

export default function SectionTitleLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 360, alignItems: "stretch" }}>
      <SectionTitle>Recent</SectionTitle>
      <SectionTitle icon={<InfoGlyph />}>File details</SectionTitle>
      <SectionTitle
        actions={
          <Button size="sm" variant="ghost">
            Clear
          </Button>
        }
      >
        History
      </SectionTitle>
    </div>
  );
}
