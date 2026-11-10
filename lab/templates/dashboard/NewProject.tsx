// Dashboard's New project dialog: a name (required, unique, lowercase) and a description; Create hands them back.

// ── Dependencies ──────────────────────────
import { type FormEvent, useState } from "react";
import { Button, Dialog, Field, TextArea, TextField } from "../../../src";

// ── Private helpers ───────────────────────
/** What's wrong with a project name, or nothing. */
function problemWith(name: string, taken: string[]): string | undefined {
  if (!name) return "Give the project a name.";
  if (!/^[a-z0-9-]+$/.test(name)) return "Use lowercase letters, numbers and dashes.";
  if (taken.includes(name)) return "A project with this name already exists.";
  return undefined;
}

// ── Public API ────────────────────────────
/** The New project dialog, controlled by `open`. */
export function NewProject({
  open,
  onOpenChange,
  taken,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taken: string[];
  onCreate: (name: string, description: string) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tried, setTried] = useState(false);
  const problem = problemWith(name.trim(), taken);

  const reset = (next: boolean) => {
    if (!next) {
      setName("");
      setDescription("");
      setTried(false);
    }
    onOpenChange(next);
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setTried(true);
    if (problem) return;
    onCreate(name.trim(), description.trim());
    reset(false);
  };

  return (
    <Dialog
      title="New project"
      description="A project holds one app's code, deploys and databases."
      size="sm"
      open={open}
      onOpenChange={reset}
      footer={
        <>
          <Button onClick={() => reset(false)}>Cancel</Button>
          <Button variant="primary" type="submit" form="tpl-dash-new-project">
            Create project
          </Button>
        </>
      }
    >
      <form id="tpl-dash-new-project" className="tpl-dash-form" onSubmit={submit} noValidate>
        <Field label="Name" hint="Lowercase letters, numbers and dashes." error={tried ? problem : undefined}>
          <TextField value={name} onChange={(event) => setName(event.target.value)} placeholder="my-app" autoFocus />
        </Field>
        <Field label="Description">
          <TextArea value={description} onChange={(event) => setDescription(event.target.value)} rows={2} />
        </Field>
      </form>
    </Dialog>
  );
}
