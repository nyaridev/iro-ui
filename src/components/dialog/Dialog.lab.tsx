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
  const [kind, setKind] = useState<string | null>("pdf");

  return (
    <div className="lab-row">
      <Dialog
        trigger={<Button variant="primary">New project</Button>}
        title="New project"
        description="A project keeps its own files, settings and history."
        footer={
          <>
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Create</Button>
          </>
        }
      >
        <Field label="Name">
          <TextField placeholder="My project" />
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
        title="Export"
        footer={
          <Button variant="primary" onClick={() => setOpen(false)}>
            Done
          </Button>
        }
      >
        <Field label="Save as">
          <Select
            options={[
              { value: "pdf", label: "PDF" },
              { value: "docx", label: "Word document" },
            ]}
            value={kind}
            onValueChange={setKind}
          />
        </Field>
      </Dialog>
    </div>
  );
}
