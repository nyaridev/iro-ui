// Lab page: Terminal with a finished build, and a test run still going that gains a line every second.

import { useEffect, useState } from "react";
import { Terminal, type TerminalLine } from "./Terminal";

const BUILD: TerminalLine[] = [
  { kind: "command", text: "pnpm build" },
  "",
  "> website@2.4.0 build",
  "> vite build",
  "",
  { kind: "muted", text: "vite v8.0.0 building for production..." },
  "✓ 412 modules transformed.",
  "dist/index.html                  0.46 kB",
  "dist/assets/index-4f2a.css      18.20 kB",
  "dist/assets/index-9c1e.js      142.73 kB",
  { kind: "success", text: "✓ built in 2.41s" },
];

const TESTS: TerminalLine[] = [
  "✓ src/cart.test.ts (8 tests) 12ms",
  "✓ src/price.test.ts (14 tests) 9ms",
  { kind: "error", text: "✗ src/export.test.ts > writes a CSV header" },
  "✓ src/search.test.ts (6 tests) 31ms",
];

export default function TerminalLab() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (count >= TESTS.length) return;
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="lab-stack" style={{ maxWidth: 640 }}>
      <h3>Finished</h3>
      <Terminal title="build" lines={BUILD} className="lab-fill" />
      <h3>Running</h3>
      <Terminal
        title="test"
        lines={[{ kind: "command", text: "pnpm test" }, ...TESTS.slice(0, count)]}
        running={count < TESTS.length}
        maxHeight={140}
        className="lab-fill"
      />
    </div>
  );
}
