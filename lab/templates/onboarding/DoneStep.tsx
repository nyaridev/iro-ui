// Onboarding, step 5: a summary of what was set up, under a check mark that bursts when the step opens.

// ── Dependencies ──────────────────────────
import type { RefObject } from "react";
import { Icon, PropertyList } from "../../../src";
import { CheckIcon } from "../../../src/icons";
import { EMAIL, INVITE_ROLES, labelOf, ROLES, type Setup, SIZES, USES } from "./setup";

// ── Types ─────────────────────────────────
interface DoneStepProps {
  setup: Setup;
  /** The check mark, for the burst. */
  mark: RefObject<HTMLSpanElement | null>;
}

// ── Private helpers ───────────────────────
/** "2 people, as members", or "Nobody yet". */
function invited({ invites, inviteRole }: Setup) {
  if (invites.length === 0) return "Nobody yet";
  const role = labelOf(INVITE_ROLES, inviteRole)?.toLowerCase() ?? "member";
  return invites.length === 1 ? `1 person, as ${role}` : `${invites.length} people, as ${role}s`;
}

// ── Public API ────────────────────────────
/** The finished setup. */
export function DoneStep({ setup, mark }: DoneStepProps) {
  return (
    <>
      <span ref={mark} className="tpl-onboarding-done-mark" aria-hidden="true">
        <Icon icon={CheckIcon} size={28} />
      </span>
      <PropertyList
        properties={[
          { label: "Email", value: EMAIL },
          { label: "Role", value: labelOf(ROLES, setup.role) ?? "Not given" },
          { label: "Using it for", value: setup.uses.map((use) => labelOf(USES, use)).join(", ") || "Not given" },
          { label: "Workspace", value: setup.name.trim() },
          { label: "Address", value: `harbor.app/${setup.slug}`, mono: true, copy: `https://harbor.app/${setup.slug}` },
          { label: "Team size", value: labelOf(SIZES, setup.size) },
          { label: "Invited", value: invited(setup) },
        ]}
      />
    </>
  );
}
