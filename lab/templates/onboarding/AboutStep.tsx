// Onboarding, step 2: what the person does and what they'll use Harbor for.

// ── Dependencies ──────────────────────────
import { Checkbox, Field, Select } from "../../../src";
import { ROLES, type StepProps, USES } from "./setup";

// ── Public API ────────────────────────────
/** A role and at least one use. */
export function AboutStep({ setup, update }: StepProps) {
  const toggle = (value: string, on: boolean) =>
    update({ uses: on ? [...setup.uses, value] : setup.uses.filter((use) => use !== value) });
  return (
    <>
      <Field label="What do you do?" data-lab-state="click">
        <Select
          options={ROLES}
          value={setup.role}
          onValueChange={(role) => update({ role })}
          placeholder="Pick your role"
        />
      </Field>
      <fieldset className="tpl-onboarding-choices">
        <legend>What will you use Harbor for?</legend>
        {USES.map(({ value, label, description }) => (
          <Checkbox
            key={value}
            label={label}
            description={description}
            checked={setup.uses.includes(value)}
            onCheckedChange={(on) => toggle(value, on)}
          />
        ))}
      </fieldset>
    </>
  );
}
