// Template part: Files' rename dialog. A name field; Enter or Rename saves it. Give it a new `key` per file.

// ── Dependencies ──────────────────────────
import { useId, useState } from "react";
import { Button, Dialog, Field, TextField } from "../../../src";

// ── Types ─────────────────────────────────
interface RenameDialogProps {
  /** The file's name; null keeps the dialog closed. */
  name: string | null;
  onRename: (name: string) => void;
  onClose: () => void;
}

// ── Public API ────────────────────────────
/** Asks for a file's new name. */
export function RenameDialog({ name, onRename, onClose }: RenameDialogProps) {
  const form = useId();
  const [draft, setDraft] = useState(name ?? "");
  const value = draft.trim();
  return (
    <Dialog
      title="Rename"
      size="sm"
      open={name !== null}
      onOpenChange={(open) => (open ? undefined : onClose())}
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" form={form} disabled={!value}>
            Rename
          </Button>
        </>
      }
    >
      <form
        id={form}
        onSubmit={(event) => {
          event.preventDefault();
          if (value) onRename(value);
        }}
      >
        <Field label="Name">
          <TextField autoFocus value={draft} onChange={(event) => setDraft(event.target.value)} />
        </Field>
      </form>
    </Dialog>
  );
}
