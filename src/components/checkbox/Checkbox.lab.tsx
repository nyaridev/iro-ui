// Lab page: Checkbox on, off and indeterminate, with label and description, and disabled.

import { useState } from "react";
import { Checkbox } from "./Checkbox";

const ITEMS = ["Documents", "Images", "Videos"];

export default function CheckboxLab() {
  const [picked, setPicked] = useState(["Documents"]);
  const all = picked.length === ITEMS.length;

  return (
    <div className="lab-stack">
      <div className="lab-row">
        <Checkbox defaultChecked aria-label="On" />
        <Checkbox aria-label="Off" />
        <Checkbox indeterminate aria-label="Some" />
        <Checkbox defaultChecked disabled aria-label="Disabled on" />
        <Checkbox disabled aria-label="Disabled off" />
      </div>
      <Checkbox
        label="All file types"
        checked={all}
        indeterminate={!all && picked.length > 0}
        onCheckedChange={(checked) => setPicked(checked ? ITEMS : [])}
      />
      {ITEMS.map((item) => (
        <Checkbox
          key={item}
          label={item}
          checked={picked.includes(item)}
          onCheckedChange={(checked) =>
            setPicked(checked ? [...picked, item] : picked.filter((other) => other !== item))
          }
        />
      ))}
      <Checkbox label="Keep a backup copy" description="Saved next to the original." defaultChecked />
    </div>
  );
}
