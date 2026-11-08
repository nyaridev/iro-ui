// Lab page: Popover with a small form, on different sides, and controlled.

import { useState } from "react";
import { Button } from "../button/Button";
import { Field } from "../field/Field";
import { IconButton } from "../icon-button/IconButton";
import { InfoGlyph } from "../shared/glyphs";
import { Switch } from "../switch/Switch";
import { TextField } from "../text-field/TextField";
import { Popover } from "./Popover";

export default function PopoverLab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lab-row">
      <Popover trigger={<Button>Rename</Button>} title="Rename profile">
        <Field label="Name">
          <TextField defaultValue="My studio" />
        </Field>
        <Switch label="Keep the old name as an alias" />
      </Popover>
      <Popover trigger={<IconButton icon={<InfoGlyph />} label="About this model" />} side="right" align="start">
        SDXL checkpoint, 6.9 GB, trained at 1024 px.
      </Popover>
      <Popover
        trigger={<Button variant="primary">Controlled ({open ? "open" : "closed"})</Button>}
        open={open}
        onOpenChange={setOpen}
        title="Controlled"
      >
        <Button size="sm" onClick={() => setOpen(false)}>
          Close from inside
        </Button>
      </Popover>
    </div>
  );
}
