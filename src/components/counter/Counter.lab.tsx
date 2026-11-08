// Lab page: Counter counting to new values, with a custom format; the header's Motion picker turns the count off.

import { useState } from "react";
import { Button } from "../button/Button";
import { Counter } from "./Counter";

export default function CounterLab() {
  const [lines, setLines] = useState(1240);

  return (
    <div className="lab-stack">
      <div className="lab-row" style={{ gap: 24, fontSize: "var(--iro-text-2xl)" }}>
        <span style={{ color: "var(--iro-green-ink)" }}>
          +<Counter value={lines} />
        </span>
        <Counter value={lines * 3.5} format={(n) => `${(n / 1000).toFixed(1)}k`} />
      </div>
      <div className="lab-row">
        <Button size="sm" onClick={() => setLines(lines + 137)}>
          Add 137
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setLines(Math.max(0, lines - 500))}>
          Remove 500
        </Button>
      </div>
    </div>
  );
}
