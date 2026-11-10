// Onboarding, step 3: the workspace's name, its address (which follows the name until it's typed), team size and color.

// ── Dependencies ──────────────────────────
import { ColorPicker, Field, Segmented, TextField } from "../../../src";
import { nameError, SIZES, type StepProps, SWATCHES, slugError, slugFrom } from "./setup";

// ── Public API ────────────────────────────
/** The workspace's name, address, size and color. */
export function WorkspaceStep({ setup, update }: StepProps) {
  const slugProblem = slugError(setup.slug);
  return (
    <>
      <Field label="Workspace name" error={nameError(setup.name) || undefined}>
        <TextField
          value={setup.name}
          placeholder="Northwind Studio"
          maxLength={40}
          onChange={(event) => {
            const name = event.currentTarget.value;
            update(setup.slugEdited ? { name } : { name, slug: slugFrom(name) });
          }}
        />
      </Field>
      <Field
        label="Address"
        hint={setup.slug ? `Your team signs in at harbor.app/${setup.slug}` : "Where your team signs in."}
        error={slugProblem || undefined}
      >
        <TextField
          value={setup.slug}
          maxLength={30}
          spellCheck={false}
          autoCapitalize="none"
          start={<span className="tpl-onboarding-prefix">harbor.app/</span>}
          onChange={(event) => update({ slug: event.currentTarget.value, slugEdited: true })}
        />
      </Field>
      <div className="tpl-onboarding-pair">
        <Field label="Team size">
          <Segmented
            aria-label="Team size"
            options={[...SIZES]}
            value={setup.size}
            onValueChange={(size) => update({ size })}
            full
          />
        </Field>
        <Field label="Color" data-lab-state="click">
          <ColorPicker value={setup.color} onValueChange={(color) => update({ color })} swatches={SWATCHES} />
        </Field>
      </div>
    </>
  );
}
