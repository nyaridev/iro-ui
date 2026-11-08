// Lab page: every Button variant at every size, with icons, and its pressed, loading and disabled states.

import { useState } from "react";
import { CheckGlyph, PlusGlyph } from "../shared/glyphs";
import { Button } from "./Button";

const VARIANTS = ["primary", "secondary", "outline", "ghost", "danger"] as const;
const SIZES = ["sm", "md", "lg"] as const;

export default function ButtonLab() {
  const [pressed, setPressed] = useState(true);

  return (
    <div className="lab-stack">
      {SIZES.map((size) => (
        <div key={size} className="lab-row">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} size={size}>
              {variant}
            </Button>
          ))}
        </div>
      ))}
      <div className="lab-row">
        <Button variant="primary" icon={<PlusGlyph />}>
          New profile
        </Button>
        <Button iconEnd={<CheckGlyph />}>Icon after</Button>
        <Button pressed={pressed} onClick={() => setPressed(!pressed)}>
          Toggle ({pressed ? "on" : "off"})
        </Button>
        <Button variant="primary" loading>
          Saving
        </Button>
      </div>
      <div className="lab-row">
        {VARIANTS.map((variant) => (
          <Button key={variant} variant={variant} disabled>
            {variant}
          </Button>
        ))}
        <Button pressed disabled>
          pressed
        </Button>
      </div>
    </div>
  );
}
