// Lab page: Field on top and as a settings row, with a hint, an error and disabled.

import { useState } from "react";
import { NumberField } from "../number-field/NumberField";
import { TextArea } from "../text-area/TextArea";
import { TextField } from "../text-field/TextField";
import { Field } from "./Field";

export default function FieldLab() {
  const [name, setName] = useState("");

  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <Field
        label="Profile name"
        hint="Shown on the profile card."
        error={name.trim() ? undefined : "A name is needed."}
      >
        <TextField value={name} onChange={(event) => setName(event.target.value)} placeholder="My studio" />
      </Field>
      <Field label="Notes" hint="Only you see these.">
        <TextArea placeholder="Anything to remember…" />
      </Field>
      <Field label="Batch size" layout="left" hint="How many images per run.">
        <NumberField defaultValue={4} min={1} max={64} />
      </Field>
      <Field label="Output folder" layout="left">
        <TextField defaultValue="D:/Images/out" />
      </Field>
      <Field label="Locked" layout="left" disabled hint="Disabled fields dim their label.">
        <TextField defaultValue="Can't change this" disabled />
      </Field>
    </div>
  );
}
