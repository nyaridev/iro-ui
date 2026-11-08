// Lab page: Sheet from the right and from the left.

import { Button } from "../button/Button";
import { Checkbox } from "../checkbox/Checkbox";
import { Sheet } from "./Sheet";

export default function SheetLab() {
  return (
    <div className="lab-row">
      <Sheet trigger={<Button>Model details</Button>} title="SDXL 1.0">
        <p>6.9 GB · trained at 1024 px · from Civitai.</p>
      </Sheet>
      <Sheet trigger={<Button>Libraries</Button>} title="Libraries" side="left">
        <div className="lab-stack">
          <Checkbox label="Outputs" defaultChecked />
          <Checkbox label="Favorites" />
          <Checkbox label="Imported" />
        </div>
      </Sheet>
    </div>
  );
}
