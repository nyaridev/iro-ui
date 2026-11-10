// Dashboard's Team page: the workspace's people with their roles, filtered by the search.

// ── Dependencies ──────────────────────────
import { Avatar, Badge, Panel, SectionTitle } from "../../../src";
import { PEOPLE } from "./data";

// ── Public API ────────────────────────────
/** The team list; `query` filters it by name and email. */
export function Team({ query }: { query: string }) {
  const needle = query.trim().toLowerCase();
  const shown = PEOPLE.filter(({ name, email }) => `${name} ${email}`.toLowerCase().includes(needle));

  return (
    <Panel as="section" padded>
      <SectionTitle>{`${PEOPLE.length} members`}</SectionTitle>
      {shown.length > 0 ? (
        <ul className="tpl-dash-list">
          {shown.map(({ name, color, role, email }) => (
            <li key={name}>
              <Avatar name={name} color={color} size={32} />
              <div>
                <strong>{name}</strong>
                <span>{email}</span>
              </div>
              <Badge tone={role === "Owner" ? "accent" : "neutral"}>{role}</Badge>
            </li>
          ))}
        </ul>
      ) : (
        <p className="tpl-dash-none">No one matches “{query.trim()}”.</p>
      )}
    </Panel>
  );
}
