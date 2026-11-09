// Lab page: Reasoning while thinking (open, shimmering) and done (folded, with how long it took); a button flips one.

import { useState } from "react";
import { Button } from "../button/Button";
import { Reasoning } from "./Reasoning";

const THOUGHT =
  "The question asks for the total across regions. The table splits it by quarter, so I'll add the four quarters for each region first, then compare the totals.";

export default function ReasoningLab() {
  const [thinking, setThinking] = useState(true);
  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <h3>Thinking, then done</h3>
      <Reasoning streaming={thinking} duration={8}>
        {THOUGHT}
      </Reasoning>
      <Button size="sm" onClick={() => setThinking(!thinking)}>
        {thinking ? "Finish thinking" : "Think again"}
      </Button>
      <h3>Done</h3>
      <Reasoning duration={14}>{THOUGHT}</Reasoning>
    </div>
  );
}
