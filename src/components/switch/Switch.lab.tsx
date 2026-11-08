// Lab page: Switch at both sizes, with and without a label, and disabled.

import { useState } from "react";
import { Switch } from "./Switch";

export default function SwitchLab() {
  const [on, setOn] = useState(true);

  return (
    <div className="lab-stack">
      <div className="lab-row">
        <Switch size="sm" defaultChecked aria-label="Small on" />
        <Switch size="sm" aria-label="Small off" />
        <Switch checked={on} onCheckedChange={setOn} aria-label="Medium" />
        <Switch aria-label="Medium off" />
      </div>
      <Switch label={`Show notifications (${on ? "on" : "off"})`} checked={on} onCheckedChange={setOn} />
      <div className="lab-row">
        <Switch label="Disabled on" defaultChecked disabled />
        <Switch label="Disabled off" disabled />
      </div>
    </div>
  );
}
