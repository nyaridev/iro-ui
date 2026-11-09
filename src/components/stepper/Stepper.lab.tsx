// Lab page: Stepper across and down, with buttons to move through it and finished steps you can go back to.

import { useState } from "react";
import { Button } from "../button/Button";
import { Stepper, type StepperStep } from "./Stepper";

const SETUP: StepperStep[] = [
  { label: "Account", description: "Name and email" },
  { label: "Workspace", description: "Where your team works" },
  { label: "Invite", description: "Add people" },
  { label: "Done" },
];

const IMPORT: StepperStep[] = [
  { label: "Upload the file", description: "CSV or JSON, up to 50 MB." },
  { label: "Match the columns", description: "Pick which column fills which field." },
  { label: "Check the rows", description: "Fix the rows that don't fit before they go in." },
  { label: "Import" },
];

export default function StepperLab() {
  const [step, setStep] = useState(1);
  return (
    <div className="lab-stack" style={{ maxWidth: 720 }}>
      <h3>Across</h3>
      <Stepper steps={SETUP} current={step} onStepClick={setStep} style={{ alignSelf: "stretch" }} />
      <div className="lab-row">
        <Button size="sm" disabled={step === 0} onClick={() => setStep(step - 1)}>
          Back
        </Button>
        <Button size="sm" variant="primary" disabled={step === SETUP.length} onClick={() => setStep(step + 1)}>
          Next
        </Button>
      </div>
      <h3>Down</h3>
      <Stepper steps={IMPORT} current={2} orientation="vertical" />
    </div>
  );
}
