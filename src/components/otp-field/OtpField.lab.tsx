// Lab page: OtpField for six digits in two groups, with a done message, wrong, letters, and hidden.

import { useState } from "react";
import { OtpField } from "./OtpField";

export default function OtpFieldLab() {
  const [code, setCode] = useState("");
  const [done, setDone] = useState("");
  return (
    <div className="lab-stack">
      <h3>Six digits in two groups</h3>
      <OtpField
        aria-label="Verification code"
        value={code}
        onValueChange={(next) => {
          setCode(next);
          setDone("");
        }}
        onComplete={setDone}
        groupSize={3}
      />
      <span className="lab-hint">{done ? `Checking ${done}…` : "Type or paste the code."}</span>
      <h3>Wrong</h3>
      <OtpField aria-label="Wrong code" length={4} defaultValue="1234" invalid />
      <h3>Letters and digits, hidden</h3>
      <OtpField aria-label="Recovery code" length={5} type="alphanumeric" mask />
    </div>
  );
}
