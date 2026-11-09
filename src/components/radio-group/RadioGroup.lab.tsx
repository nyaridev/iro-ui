// Lab page: RadioGroup down with descriptions, across, in a Field, and with an option turned off.

import { useState } from "react";
import { Field } from "../field/Field";
import { RadioGroup } from "./RadioGroup";

export default function RadioGroupLab() {
  const [plan, setPlan] = useState("team");
  return (
    <div className="lab-stack">
      <h3>With descriptions</h3>
      <RadioGroup
        aria-label="Plan"
        value={plan}
        onValueChange={setPlan}
        options={[
          { value: "free", label: "Free", description: "One project, community help." },
          { value: "team", label: "Team", description: "Unlimited projects, shared folders." },
          { value: "enterprise", label: "Enterprise", description: "Single sign-on and audit logs.", disabled: true },
        ]}
      />
      <h3>Across, in a Field</h3>
      <Field label="Notify me">
        <RadioGroup
          orientation="horizontal"
          defaultValue="mentions"
          options={[
            { value: "all", label: "Everything" },
            { value: "mentions", label: "Mentions" },
            { value: "none", label: "Nothing" },
          ]}
        />
      </Field>
    </div>
  );
}
