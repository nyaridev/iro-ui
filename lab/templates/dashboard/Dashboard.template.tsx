// Template: an app's overview screen. An AppSidebar (in a Sheet behind a menu button on phones) switches pages:
// Overview with stats, activity, services and usage; Projects and Team as lists; the rest as empty states. The search
// filters the page's list, the bell lists notifications, and New project adds one and confirms with a toast.

// ── Dependencies ──────────────────────────
import { useState } from "react";
import {
  AppSidebar,
  Avatar,
  Button,
  EmptyState,
  Icon,
  IconButton,
  ProgressRing,
  Sheet,
  TextField,
  Toaster,
  toast,
} from "../../../src";
import { MenuIcon, PlusIcon, SearchIcon } from "../../../src/icons";
import { PAGES, PEOPLE, PROJECTS } from "./data";
import { NewProject } from "./NewProject";
import { Notifications } from "./Notifications";
import { Overview } from "./Overview";
import { Projects } from "./Projects";
import { Team } from "./Team";

// ── Constants ─────────────────────────────
const SUBTITLES: Record<string, string> = {
  overview: "Last 24 hours",
  projects: "Everything in this workspace",
  team: "People with access",
};

// ── Public API ────────────────────────────
/** The overview screen. */
export default function Dashboard() {
  const [page, setPage] = useState("overview");
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [projects, setProjects] = useState(PROJECTS);
  const current = PAGES.find(({ id }) => id === page) ?? PAGES[0];
  const searchable = page === "overview" || page === "projects" || page === "team";

  const go = (id: string) => {
    setPage(id);
    setQuery("");
    setMenu(false);
  };
  const create = (name: string, description: string) => {
    setProjects((all) => [{ name, description, healthy: true, updated: "Just now" }, ...all]);
    go("projects");
    toast({ title: "Project created", description: `${name} is ready for its first deploy.`, tone: "success" });
  };
  const counts: Record<string, number> = { projects: projects.length, team: PEOPLE.length };
  const nav = (inSheet: boolean) => (
    <AppSidebar
      className={inSheet ? "tpl-dash-sheet-nav" : "tpl-dash-nav"}
      current={page}
      header={
        inSheet ? undefined : (
          <div className="tpl-dash-brand">
            <span aria-hidden="true" />
            Harbor
          </div>
        )
      }
      sections={[
        {
          items: PAGES.map(({ id, label, icon }) => ({
            id,
            label,
            icon: <Icon icon={icon} />,
            badge: counts[id],
            onClick: () => go(id),
          })),
        },
      ]}
      footer={
        <div className="tpl-dash-plan">
          <ProgressRing value={0.72} size={36} label="Storage used" />
          <div>
            <strong>72% of storage</strong>
            <span>36 of 50 GB</span>
          </div>
        </div>
      }
    />
  );

  return (
    <div className="tpl-dash">
      {nav(false)}

      <div className="tpl-dash-main">
        <header className="tpl-dash-top">
          <Sheet
            title="Harbor"
            side="left"
            open={menu}
            onOpenChange={setMenu}
            className="tpl-dash-sheet"
            trigger={
              <IconButton
                className="tpl-dash-menu"
                icon={<Icon icon={MenuIcon} />}
                label="Open the menu"
                data-lab-state="click"
              />
            }
          >
            {nav(true)}
          </Sheet>
          <div className="tpl-dash-title">
            <h1>{current.label}</h1>
            {SUBTITLES[page] ? <span>{SUBTITLES[page]}</span> : null}
          </div>
          {searchable ? (
            <TextField
              className="tpl-dash-search"
              size="sm"
              type="search"
              placeholder={page === "overview" ? "Search activity" : `Search ${current.label.toLowerCase()}`}
              aria-label="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              start={<Icon icon={SearchIcon} />}
            />
          ) : null}
          <Notifications />
          <Button
            className="tpl-dash-new"
            variant="primary"
            size="sm"
            icon={<Icon icon={PlusIcon} />}
            onClick={() => setCreating(true)}
          >
            New project
          </Button>
          <IconButton
            className="tpl-dash-new-icon"
            variant="primary"
            size="sm"
            icon={<Icon icon={PlusIcon} />}
            label="New project"
            onClick={() => setCreating(true)}
          />
          <Avatar name="Maya Chen" color="blue" size={30} />
        </header>

        <div className="tpl-dash-body">
          {page === "overview" ? (
            <Overview query={query} onClear={() => setQuery("")} />
          ) : page === "projects" ? (
            <Projects projects={projects} query={query} onNew={() => setCreating(true)} />
          ) : page === "team" ? (
            <Team query={query} />
          ) : current.empty ? (
            <EmptyState
              className="tpl-dash-empty"
              icon={<Icon icon={current.icon} />}
              title={current.empty.title}
              action={
                <Button
                  onClick={() => toast({ title: current.empty?.action, description: "Nothing changes in this demo." })}
                >
                  {current.empty.action}
                </Button>
              }
            >
              {current.empty.text}
            </EmptyState>
          ) : null}
        </div>
      </div>

      <NewProject
        open={creating}
        onOpenChange={setCreating}
        taken={projects.map(({ name }) => name)}
        onCreate={create}
      />
      <Toaster />
    </div>
  );
}
