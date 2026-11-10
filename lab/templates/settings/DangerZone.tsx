// Template part: Settings' danger zone. Deleting the account asks first, and only goes ahead once the email is typed.

// ── Dependencies ──────────────────────────
import { useState } from "react";
import { Button, Dialog, Field, Panel, SectionTitle, TextField, toast } from "../../../src";

// ── Public API ────────────────────────────
/** The danger zone panel; `email` is what the dialog asks to type. */
export function DangerZone({ id, email }: { id: string; email: string }) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const close = (next: boolean) => {
    setOpen(next);
    if (!next) setTyped("");
  };

  return (
    <Panel as="section" padded id={id} className="tpl-settings-panel tpl-settings-danger">
      <SectionTitle level={2}>Danger zone</SectionTitle>
      <div className="tpl-settings-toggle tpl-settings-delete">
        <div>
          <strong>Delete account</strong>
          <span>Removes your projects and files for good.</span>
        </div>
        <Dialog
          title="Delete your account?"
          description="Your projects, files and history are removed, and this can't be undone."
          size="sm"
          open={open}
          onOpenChange={close}
          trigger={
            <Button variant="danger" data-lab-state="click">
              Delete account
            </Button>
          }
          footer={
            <>
              <Button onClick={() => close(false)}>Cancel</Button>
              <Button
                variant="danger"
                disabled={typed.trim() !== email}
                onClick={() => {
                  close(false);
                  toast({ title: "Account deletion scheduled", description: "You have 14 days to change your mind." });
                }}
              >
                Delete account
              </Button>
            </>
          }
        >
          <Field label={`Type ${email} to confirm`}>
            <TextField value={typed} onChange={(event) => setTyped(event.target.value)} autoComplete="off" />
          </Field>
        </Dialog>
      </div>
    </Panel>
  );
}
