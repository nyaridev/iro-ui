// Lab page: Sheet from the right and from the left.

import { Button } from "../button/Button";
import { Checkbox } from "../checkbox/Checkbox";
import { Sheet } from "./Sheet";

export default function SheetLab() {
  return (
    <div className="lab-row">
      <Sheet trigger={<Button data-lab-state="click">File details</Button>} title="annual-report.pdf">
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
