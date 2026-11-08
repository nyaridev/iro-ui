// Lab page: Notice in every tone, with a title, actions and a custom icon.

import { Button } from "../button/Button";
import { CheckGlyph } from "../shared/glyphs";
import { Notice } from "./Notice";

export default function NoticeLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 520 }}>
      <Notice>Pick a checkpoint to see which LoRAs fit it.</Notice>
      <Notice tone="success" title="Installed">
        The custom nodes are ready; restart ComfyUI to load them.
      </Notice>
      <Notice
        tone="warning"
        title="2 nodes missing"
        actions={
          <>
            <Button size="sm" variant="primary">
              Install
            </Button>
            <Button size="sm" variant="ghost">
              Details
            </Button>
          </>
        }
      >
        This workflow needs Impact Pack and controlnet_aux.
      </Notice>
      <Notice tone="danger" title="ComfyUI stopped">
        It exited with code 1. The log has the reason.
      </Notice>
      <Notice tone="info" icon={<CheckGlyph />}>
        A custom icon replaces the tone's.
      </Notice>
    </div>
  );
}
