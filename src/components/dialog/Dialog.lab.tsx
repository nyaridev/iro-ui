// Lab page: Dialog with a form and footer, every size, and controlled with a Select inside (its list must open above).

import { useState } from "react";
import { Button } from "../button/Button";
import { Field } from "../field/Field";
import { Select } from "../select/Select";
import { TextField } from "../text-field/TextField";
import { Dialog } from "./Dialog";

const SIZES = ["sm", "md", "lg"] as const;

export default function DialogLab() {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<string | null>("lora");

  return (
    <div className="lab-row">
      <Dialog
        trigger={<Button variant="primary">New profile</Button>}
        title="New profile"
        description="A profile keeps its own workflows, models and gallery."
        footer={
          <>
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Create</Button>
          </>
        }
      >
        <Field label="Name">
          <TextField placeholder="My studio" />
        </Field>
      </Dialog>
      {SIZES.map((size) => (
        <Dialog key={size} trigger={<Button>Size {size}</Button>} title={`A ${size} dialog`} size={size}>
          The body scrolls when it's taller than the window.
        </Dialog>
      ))}
      <Button onClick={() => setOpen(true)}>Controlled, with a Select</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Download"
        footer={
          <Button variant="primary" onClick={() => setOpen(false)}>
            Done
          </Button>
        }
      >
        <Field label="Save as">
          <Select
            options={[
              { value: "lora", label: "LoRA" },
              { value: "checkpoint", label: "Checkpoint" },
            ]}
            value={kind}
            onValueChange={setKind}
          />
        </Field>
      </Dialog>
    </div>
  );
}
