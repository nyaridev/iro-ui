// Lab page: Badge in every tone, with and without an icon.

import { SuccessGlyph, WarningGlyph } from "../shared/glyphs";
import { Badge } from "./Badge";

export default function BadgeLab() {
  return (
    <div className="lab-stack">
      <div className="lab-row">
        <Badge>Draft</Badge>
        <Badge tone="accent">New</Badge>
        <Badge tone="success">Ready</Badge>
        <Badge tone="warning">Needs review</Badge>
        <Badge tone="danger">Failed</Badge>
        <Badge tone="info">Beta</Badge>
      </div>
      <div className="lab-row">
        <Badge tone="success" icon={<SuccessGlyph />}>
          Installed
        </Badge>
        <Badge tone="warning" icon={<WarningGlyph />}>
          Update available
        </Badge>
      </div>
    </div>
  );
}
