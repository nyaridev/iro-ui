// Lab page: Toolbar with toggles, separators and a text button, and one standing up.

import { useState } from "react";
import { FontIcon, TypeIcon } from "../../icons/set/code";
import { CursorIcon } from "../../icons/set/devices";
import { CopyIcon, LinkIcon, PencilIcon, TrashIcon } from "../../icons/set/editing";
import { ImageIcon } from "../../icons/set/media";
import { Icon } from "../icon/Icon";
import { Toolbar, ToolbarButton, ToolbarSeparator } from "./Toolbar";

export default function ToolbarLab() {
  const [marks, setMarks] = useState<string[]>(["bold"]);
  const [tool, setTool] = useState("select");
  const toggle = (mark: string) =>
    setMarks(marks.includes(mark) ? marks.filter((other) => other !== mark) : [...marks, mark]);
  return (
    <div className="lab-stack">
      <h3>Text formatting (Tab in, arrows between)</h3>
      <Toolbar aria-label="Text formatting">
        <ToolbarButton
          icon={<Icon icon={TypeIcon} />}
          label="Bold"
          shortcut="Ctrl B"
          active={marks.includes("bold")}
          onClick={() => toggle("bold")}
        />
        <ToolbarButton
          icon={<Icon icon={FontIcon} />}
          label="Italic"
          shortcut="Ctrl I"
          active={marks.includes("italic")}
          onClick={() => toggle("italic")}
        />
        <ToolbarButton icon={<Icon icon={LinkIcon} />} label="Link" shortcut="Ctrl K" />
        <ToolbarSeparator />
        <ToolbarButton icon={<Icon icon={ImageIcon} />} label="Insert image">
          Image
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton icon={<Icon icon={CopyIcon} />} label="Copy" />
        <ToolbarButton icon={<Icon icon={TrashIcon} />} label="Delete" disabled />
      </Toolbar>
      <h3>Standing up</h3>
      <Toolbar aria-label="Tools" orientation="vertical">
        <ToolbarButton
          icon={<Icon icon={CursorIcon} />}
          label="Select"
          active={tool === "select"}
          onClick={() => setTool("select")}
        />
        <ToolbarButton
          icon={<Icon icon={PencilIcon} />}
          label="Draw"
          active={tool === "draw"}
          onClick={() => setTool("draw")}
        />
        <ToolbarButton
          icon={<Icon icon={TypeIcon} />}
          label="Text"
          active={tool === "text"}
          onClick={() => setTool("text")}
        />
      </Toolbar>
    </div>
  );
}
