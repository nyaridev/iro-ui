// Lab page: Tooltip on every side, on a text button, and IconButton's built-in tooltip with a shortcut.

import { Button } from "../button/Button";
import { IconButton } from "../icon-button/IconButton";
import { PlusGlyph } from "../shared/glyphs";
import { Tooltip } from "./Tooltip";

const SIDES = ["top", "right", "bottom", "left"] as const;

export default function TooltipLab() {
  return (
    <div className="lab-row">
      {SIDES.map((side) => (
        <Tooltip key={side} side={side} content={`Opens on the ${side}`}>
          <Button>{side}</Button>
        </Tooltip>
      ))}
      <IconButton icon={<PlusGlyph />} label="New profile" shortcut="Ctrl N" variant="secondary" />
      <Tooltip content="Disabled tooltips never open" disabled>
        <Button variant="ghost">No tooltip</Button>
      </Tooltip>
    </div>
  );
}
