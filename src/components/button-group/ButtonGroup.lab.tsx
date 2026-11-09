// Lab page: ButtonGroup as a split button, a set of actions, icon toggles, a field with a button, and down.

import { useState } from "react";
import { CopyIcon, PencilIcon, TrashIcon } from "../../icons/set/editing";
import { GridIcon, ListIcon } from "../../icons/set/layout";
import { Button } from "../button/Button";
import { Icon } from "../icon/Icon";
import { IconButton } from "../icon-button/IconButton";
import { Menu } from "../menu/Menu";
import { ChevronDownGlyph } from "../shared/glyphs";
import { TextField } from "../text-field/TextField";
import { ButtonGroup } from "./ButtonGroup";

export default function ButtonGroupLab() {
  const [view, setView] = useState("list");
  return (
    <div className="lab-stack">
      <h3>Split button</h3>
      <ButtonGroup>
        <Button variant="primary">Publish</Button>
        <Menu
          align="end"
          trigger={
            <IconButton
              variant="primary"
              icon={<ChevronDownGlyph />}
              label="More ways to publish"
              data-lab-state="click"
            />
          }
          items={[
            { label: "Publish later", onSelect: () => undefined },
            { label: "Publish to staging", onSelect: () => undefined },
          ]}
        />
      </ButtonGroup>
      <h3>Actions</h3>
      <ButtonGroup>
        <Button icon={<Icon icon={PencilIcon} />}>Edit</Button>
        <Button icon={<Icon icon={CopyIcon} />}>Duplicate</Button>
        <Button icon={<Icon icon={TrashIcon} />}>Delete</Button>
      </ButtonGroup>
      <h3>Toggles (IconButton active)</h3>
      <ButtonGroup aria-label="View">
        <IconButton
          variant="secondary"
          icon={<Icon icon={ListIcon} />}
          label="List"
          active={view === "list"}
          onClick={() => setView("list")}
        />
        <IconButton
          variant="secondary"
          icon={<Icon icon={GridIcon} />}
          label="Grid"
          active={view === "grid"}
          onClick={() => setView("grid")}
        />
      </ButtonGroup>
      <h3>A field with a button</h3>
      <ButtonGroup>
        <TextField aria-label="Invite link" readOnly value="https://example.com/invite/7f3k" />
        <Button>Copy</Button>
      </ButtonGroup>
      <h3>Down</h3>
      <ButtonGroup orientation="vertical">
        <Button>Top</Button>
        <Button>Middle</Button>
        <Button>Bottom</Button>
      </ButtonGroup>
    </div>
  );
}
