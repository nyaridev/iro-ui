// Lab page: Veil over a colorful tile, full and compact; click to reveal, the button veils them again.

import { useState } from "react";
import { Button } from "../button/Button";
import { Veil } from "./Veil";

const TILE = {
  width: 180,
  height: 120,
  borderRadius: "var(--iro-radius-lg)",
  overflow: "hidden",
};
const ART = {
  width: "100%",
  height: "100%",
  background: "linear-gradient(135deg, var(--iro-pink), var(--iro-orange) 50%, var(--iro-cyan))",
};

export default function VeilLab() {
  const [active, setActive] = useState(true);

  return (
    <div className="lab-stack">
      <div className="lab-row">
        <div style={TILE}>
          <Veil active={active}>
            <div style={ART} />
          </Veil>
        </div>
        <div style={{ ...TILE, width: 90, height: 90 }}>
          <Veil active={active} compact>
            <div style={ART} />
          </Veil>
        </div>
      </div>
      <Button size="sm" onClick={() => setActive(!active)}>
        {active ? "Turn the veil off" : "Turn the veil on"}
      </Button>
    </div>
  );
}
