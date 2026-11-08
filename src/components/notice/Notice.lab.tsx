// Lab page: Notice in every tone, with a title, actions and a custom icon.

import { Button } from "../button/Button";
import { CheckGlyph } from "../shared/glyphs";
import { Notice } from "./Notice";

export default function NoticeLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 520 }}>
      <Notice>Pick a folder to see the files in it.</Notice>
      <Notice tone="success" title="Update installed">
        Restart the app to finish.
      </Notice>
      <Notice
        tone="warning"
        title="2 files missing"
        actions={
          <>
            <Button size="sm" variant="primary">
              Find them
            </Button>
            <Button size="sm" variant="ghost">
              Details
            </Button>
          </>
        }
      >
        This project links to cover.png and logo.svg.
      </Notice>
      <Notice tone="danger" title="Sync stopped">
        The server answered with an error. The log has the reason.
      </Notice>
      <Notice tone="info" icon={<CheckGlyph />}>
        A custom icon replaces the tone's.
      </Notice>
    </div>
  );
}
