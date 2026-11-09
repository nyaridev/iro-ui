// Lab page: DatePicker empty and with a day, in a Field with limits, small, and turned off.

import { useState } from "react";
import { Field } from "../field/Field";
import { DatePicker } from "./DatePicker";

const TODAY = "2026-11-09";

export default function DatePickerLab() {
  const [due, setDue] = useState("");
  const [start, setStart] = useState("2026-11-16");
  return (
    <div className="lab-stack" style={{ maxWidth: 320 }}>
      <h3>In a Field</h3>
      <Field label="Due date" hint="From today on." className="lab-fill" data-lab-state="click">
        <DatePicker value={due} onValueChange={setDue} today={TODAY} earliest={TODAY} />
      </Field>
      <h3>With a day, small</h3>
      <DatePicker aria-label="Start" size="sm" value={start} onValueChange={setStart} today={TODAY} />
      <h3>Turned off</h3>
      <DatePicker aria-label="End" value="2026-12-01" onValueChange={() => undefined} today={TODAY} disabled />
    </div>
  );
}
