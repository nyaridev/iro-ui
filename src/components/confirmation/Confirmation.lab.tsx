// Lab page: Confirmation waiting for an answer, then allowed or denied.

import { useState } from "react";
import { CodeBlock } from "../code-block/CodeBlock";
import { Confirmation } from "./Confirmation";

export default function ConfirmationLab() {
  const [state, setState] = useState<"pending" | "allowed" | "denied">("pending");
  return (
    <div className="lab-stack" style={{ maxWidth: 520 }}>
      <Confirmation
        className="lab-fill"
        title="Run a command in your project"
        state={state}
        onAllow={() => setState("allowed")}
        onDeny={() => setState("denied")}
      >
        <CodeBlock code="pnpm install && pnpm test" language="bash" />
      </Confirmation>
      <Confirmation
        className="lab-fill"
        title="Send the summary to 3 people"
        state="denied"
        onAllow={() => undefined}
        onDeny={() => undefined}
      />
    </div>
  );
}
