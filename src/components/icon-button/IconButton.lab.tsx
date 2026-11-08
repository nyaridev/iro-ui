// Lab page: every IconButton variant at every size, active, loading and disabled.

import { useState } from "react";
import { CheckGlyph, CloseGlyph, PlusGlyph } from "../shared/glyphs";
import { IconButton } from "./IconButton";

const VARIANTS = ["ghost", "secondary", "primary", "danger"] as const;
const SIZES = ["sm", "md", "lg"] as const;

export default function IconButtonLab() {
  const [active, setActive] = useState(false);

  return (
    <div className="lab-stack">
      {SIZES.map((size) => (
        <div key={size} className="lab-row">
          {VARIANTS.map((variant) => (
            <IconButton key={variant} variant={variant} size={size} icon={<PlusGlyph />} label={`Add (${variant})`} />
          ))}
        </div>
      ))}
      <div className="lab-row">
        <IconButton icon={<CheckGlyph />} label="Pin" active={active} onClick={() => setActive(!active)} />
        <IconButton icon={<PlusGlyph />} label="Adding" variant="secondary" loading />
        <IconButton icon={<CloseGlyph />} label="Remove" variant="danger" />
        <IconButton icon={<PlusGlyph />} label="Add" variant="primary" disabled />
        <IconButton icon={<PlusGlyph />} label="Add" variant="secondary" disabled />
      </div>
    </div>
  );
}
