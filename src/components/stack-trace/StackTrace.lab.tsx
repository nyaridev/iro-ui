// Lab page: StackTrace from a server, with internal frames folded and frames that open, and from a browser.

import { useState } from "react";
import { StackTrace } from "./StackTrace";

const SERVER = `TypeError: Cannot read properties of undefined (reading 'map')
    at toCsv (/app/src/export.ts:42:15)
    at handleExport (/app/src/routes/reports.ts:88:12)
    at Layer.handle (/app/node_modules/router/lib/layer.js:95:5)
    at next (/app/node_modules/router/lib/route.js:149:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)`;

const BROWSER = `RangeError: Invalid time value
formatDay@http://localhost:5173/src/dates.ts:12:20
renderRow@http://localhost:5173/src/table.tsx:61:9
@http://localhost:5173/src/main.tsx:8:1`;

export default function StackTraceLab() {
  const [opened, setOpened] = useState("");
  return (
    <div className="lab-stack" style={{ maxWidth: 640 }}>
      <h3>Internal frames folded, frames open</h3>
      <StackTrace
        stack={SERVER}
        onOpenFrame={(frame) => setOpened(`${frame.file}:${frame.line}`)}
        className="lab-fill"
      />
      <p className="lab-hint">{opened ? `Opened ${opened}` : "Click a place to open it."}</p>
      <h3>Browser trace</h3>
      <StackTrace stack={BROWSER} className="lab-fill" />
    </div>
  );
}
