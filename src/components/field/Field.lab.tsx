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
        label="Project name"
        hint="Shown on the project card."
        error={name.trim() ? undefined : "A name is needed."}
      >
        <TextField value={name} onChange={(event) => setName(event.target.value)} placeholder="My project" />
      </Field>
      <Field label="Notes" hint="Only you see these.">
        <TextArea placeholder="Anything to remember…" />
      </Field>
      <Field label="Rows per page" layout="left" hint="How many rows a table shows.">
        <NumberField defaultValue={25} min={5} max={100} />
      </Field>
      <Field label="Export folder" layout="left">
        <TextField defaultValue="Documents/Exports" />
      </Field>
      <Field label="Locked" layout="left" disabled hint="Disabled fields dim their label.">
        <TextField defaultValue="Can't change this" disabled />
      </Field>
    </div>
  );
}
