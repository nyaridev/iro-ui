// Lab page: Sheet from the right (with header actions, resizable, keeping its width between openings) and from the
// left.

import { useState } from "react";
import { DownloadIcon, ExternalLinkIcon } from "../../icons/set/arrows";
import { Button } from "../button/Button";
import { Checkbox } from "../checkbox/Checkbox";
import { Icon } from "../icon/Icon";
import { IconButton } from "../icon-button/IconButton";
import { Sheet } from "./Sheet";

export default function SheetLab() {
  const [width, setWidth] = useState<number | null>(null);
  return (
    <div className="lab-row">
      <Sheet
        trigger={<Button data-lab-state="click">File details</Button>}
        title="annual-report.pdf"
        resizable
        defaultWidth={width ?? undefined}
        onWidthChange={setWidth}
        actions={
          <>
            <IconButton size="sm" icon={<Icon icon={DownloadIcon} />} label="Download" />
            <IconButton size="sm" icon={<Icon icon={ExternalLinkIcon} />} label="Open in a new tab" />
          </>
        }
      >
        <p>2.4 MB · 12 pages · edited yesterday.</p>
      </Sheet>
      <Sheet trigger={<Button>Libraries</Button>} title="Libraries" side="left">
        <div className="lab-stack">
          <Checkbox label="Documents" defaultChecked />
          <Checkbox label="Favorites" />
          <Checkbox label="Shared with me" />
        </div>
      </Sheet>
    </div>
  );
}
