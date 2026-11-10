// Onboarding, step 4: emails to invite, each checked as it's added, and the role they join with.

// ── Dependencies ──────────────────────────
import { Field, Select, TagInput } from "../../../src";
import { INVITE_ROLES, isEmail, type StepProps } from "./setup";

// ── Types ─────────────────────────────────
interface InviteStepProps extends StepProps {
  /** Why the last tag was turned down. */
  error: string;
  onError: (error: string) => void;
}

// ── Public API ────────────────────────────
/** The invite list; a tag that isn't an email is dropped and named in the error. */
export function InviteStep({ setup, update, error, onError }: InviteStepProps) {
  const take = (tags: string[]) => {
    const bad = tags.find((tag) => !isEmail(tag));
    onError(bad ? `“${bad}” isn't an email address.` : "");
    update({ invites: [...new Set(tags.filter(isEmail).map((tag) => tag.toLowerCase()))] });
  };
  return (
    <>
      <Field label="Email addresses" hint="Press Enter after each one. Up to 10." error={error || undefined}>
        <TagInput value={setup.invites} onValueChange={take} placeholder="name@example.com" max={10} />
      </Field>
      <Field label="They join as" data-lab-state="click">
        <Select
          options={INVITE_ROLES}
          value={setup.inviteRole}
          onValueChange={(inviteRole) => update({ inviteRole })}
        />
      </Field>
    </>
  );
}
