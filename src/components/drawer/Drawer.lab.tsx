// Lab page: Drawer with a form and actions, and one with a long list that scrolls.

import { useState } from "react";
import { Button } from "../button/Button";
import { Field } from "../field/Field";
import { TextField } from "../text-field/TextField";
import { Drawer } from "./Drawer";

export default function DrawerLab() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lab-row">
      <Drawer
        trigger={
          <Button variant="primary" data-lab-state="click">
            Share
          </Button>
        }
        open={open}
        onOpenChange={setOpen}
        title="Share this project"
        description="People you invite can view and comment. Drag the panel down to close it."
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Send invite
            </Button>
          </>
        }
      >
        <Field label="Email">
          <TextField type="email" placeholder="name@example.com" />
        </Field>
      </Drawer>
      <Drawer trigger={<Button>Long list</Button>} title="Recent files">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          {Array.from({ length: 30 }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: a fixed demo list.
            <li key={index}>Report {index + 1}.pdf</li>
          ))}
        </ul>
      </Drawer>
    </div>
  );
}
