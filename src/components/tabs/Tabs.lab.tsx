// Lab page: Tabs in every look: line with panels, pill and nav for headers (one with a menu chevron), chips with
// on/off checkboxes and a badge, and folder tabs joined to their panel.

import { useState } from "react";
import { Badge } from "../badge/Badge";
import { InfoGlyph, PlusGlyph } from "../shared/glyphs";
import { Tabs } from "./Tabs";

export default function TabsLab() {
  const [panel, setPanel] = useState<"overview" | "activity" | "settings">("overview");
  const [page, setPage] = useState<"home" | "projects" | "files">("home");
  const [filter, setFilter] = useState<"all" | "unread" | "flagged">("all");
  const [on, setOn] = useState({ unread: true, flagged: false });
  const [workspace, setWorkspace] = useState<"editor" | "preview" | "history">("editor");

  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <Tabs
        aria-label="Project"
        value={panel}
        onValueChange={setPanel}
        tabs={[
          { value: "overview", label: "Overview", content: <p>Summary, owner and dates go here.</p> },
          { value: "activity", label: "Activity", content: <p>Recent changes, newest first.</p> },
          { value: "settings", label: "Settings", disabled: true, content: <p>Not ready yet.</p> },
        ]}
      />
      {(["pill", "nav"] as const).map((variant) => (
        <Tabs
          key={variant}
          aria-label={`Section (${variant})`}
          variant={variant}
          value={page}
          onValueChange={setPage}
          tabs={[
            {
              value: "home",
              label: "Home",
              icon: <InfoGlyph />,
              menu: [
                { label: "Home", onSelect: () => setPage("home") },
                { label: "Archive", onSelect: () => setPage("home") },
              ],
              menuLabel: "Home views",
            },
            { value: "projects", label: "Projects", icon: <PlusGlyph /> },
            { value: "files", label: "Files" },
          ]}
        />
      ))}
      <p className="lab-hint">
        pill (a switcher in a header) and nav (site navigation). Section: {page}; the chevron on Home opens its menu.
      </p>
      <Tabs
        aria-label="Filters"
        variant="chip"
        value={filter}
        onValueChange={setFilter}
        tabs={[
          { value: "all", label: "All", badge: <Badge tone="accent">3</Badge> },
          {
            value: "unread",
            label: "Unread",
            checked: on.unread,
            onCheckedChange: (checked) => setOn({ ...on, unread: checked }),
          },
          {
            value: "flagged",
            label: "Flagged",
            checked: on.flagged,
            onCheckedChange: (checked) => setOn({ ...on, flagged: checked }),
          },
        ]}
      />
      <Tabs
        aria-label="Workspace"
        variant="folder"
        value={workspace}
        onValueChange={setWorkspace}
        tabs={[
          { value: "editor", label: "Editor", content: <p>The text editor.</p> },
          { value: "preview", label: "Preview", content: <p>How it looks once published.</p> },
          { value: "history", label: "History", content: <p>Earlier versions.</p> },
        ]}
      />
    </div>
  );
}
