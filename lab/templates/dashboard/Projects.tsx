// Dashboard's Projects page: every project with its health and last change, filtered by the search.

// ── Dependencies ──────────────────────────
import { Button, Icon, Panel, SectionTitle, StatusDot } from "../../../src";
import { PlusIcon } from "../../../src/icons";
import type { Project } from "./data";

// ── Public API ────────────────────────────
/** The projects list; `query` filters it by name and description. */
export function Projects({ projects, query, onNew }: { projects: Project[]; query: string; onNew: () => void }) {
  const needle = query.trim().toLowerCase();
  const shown = projects.filter(({ name, description }) => `${name} ${description}`.toLowerCase().includes(needle));

  return (
    <Panel as="section" padded>
      <SectionTitle
        actions={
          <Button variant="ghost" size="sm" icon={<Icon icon={PlusIcon} />} onClick={onNew}>
            Add
          </Button>
        }
      >
        {`${projects.length} projects`}
      </SectionTitle>
      {shown.length > 0 ? (
        <ul className="tpl-dash-list">
          {shown.map(({ name, description, healthy, updated }) => (
            <li key={name}>
              <StatusDot tone={healthy ? "success" : "warning"} label={healthy ? "Healthy" : "Degraded"} />
              <div>
                <strong>{name}</strong>
                <span>{description}</span>
              </div>
              <time>{updated}</time>
            </li>
          ))}
        </ul>
      ) : (
        <p className="tpl-dash-none">No projects match “{query.trim()}”.</p>
      )}
    </Panel>
  );
}
