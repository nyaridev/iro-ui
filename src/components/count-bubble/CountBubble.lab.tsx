// Lab page: CountBubble on an IconButton's corner, inline, accent, and past its max.

import { useState } from "react";
import { Button } from "../button/Button";
import { IconButton } from "../icon-button/IconButton";
import { InfoGlyph } from "../shared/glyphs";
import { CountBubble } from "./CountBubble";

export default function CountBubbleLab() {
  const [count, setCount] = useState(3);

  return (
    <div className="lab-row" style={{ gap: 24 }}>
      <span style={{ position: "relative", display: "inline-flex" }}>
        <IconButton icon={<InfoGlyph />} label="Errors" />
        <CountBubble count={count} corner />
      </span>
      <span className="lab-row" style={{ gap: 6 }}>
        Queue <CountBubble count={12} tone="accent" />
      </span>
      <CountBubble count={250} />
      <Button size="sm" onClick={() => setCount(count + 1)}>
        Add one
      </Button>
    </div>
  );
}
