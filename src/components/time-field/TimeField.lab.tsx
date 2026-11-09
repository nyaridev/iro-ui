// Lab page: TimeField in a Field, with seconds, with limits, and small.

import { useState } from "react";
import { Field } from "../field/Field";
import { TimeField } from "./TimeField";

export default function TimeFieldLab() {
  const [time, setTime] = useState("09:30");
  const [precise, setPrecise] = useState("14:05:30");
  return (
    <div className="lab-stack" style={{ maxWidth: 260 }}>
      <h3>In a Field</h3>
      <Field label="Starts at" hint="Office hours: 08:00 to 18:00." className="lab-fill">
        <TimeField value={time} onValueChange={setTime} min="08:00" max="18:00" />
      </Field>
      <h3>With seconds, small</h3>
      <TimeField aria-label="Exact time" size="sm" seconds value={precise} onValueChange={setPrecise} />
    </div>
  );
}
