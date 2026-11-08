// Lab page: a Panel with a SectionTitle and a Divider inside, and a vertical Divider in a row.

import { Button } from "../button/Button";
import { Divider } from "../divider/Divider";
import { SectionTitle } from "../section-title/SectionTitle";
import { InfoGlyph } from "../shared/glyphs";
import { Panel } from "./Panel";

export default function PanelLab() {
  return (
    <Panel as="section" style={{ maxWidth: 420 }}>
      <div className="lab-stack" style={{ alignItems: "stretch" }}>
        <SectionTitle
          icon={<InfoGlyph />}
          actions={
            <Button size="sm" variant="ghost">
              Reset
            </Button>
          }
        >
          Export
        </SectionTitle>
        <p style={{ margin: 0 }}>Files are saved next to the project.</p>
        <Divider />
        <div className="lab-row">
          <span>Left</span>
          <Divider orientation="vertical" />
          <span>Right</span>
        </div>
      </div>
    </Panel>
  );
}
