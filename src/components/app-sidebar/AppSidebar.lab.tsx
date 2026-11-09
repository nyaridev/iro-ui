// Lab page: AppSidebar with a header, sections, counts and a footer, folding to its icons.

import { useState } from "react";
import { SettingsIcon } from "../../icons/set/controls";
import { DatabaseIcon, FolderIcon, InboxIcon } from "../../icons/set/folders";
import { UsersIcon } from "../../icons/set/people";
import { HomeIcon } from "../../icons/set/places";
import { RocketIcon } from "../../icons/set/tools";
import { Avatar } from "../avatar/Avatar";
import { Icon } from "../icon/Icon";
import { AppSidebar } from "./AppSidebar";

export default function AppSidebarLab() {
  const [page, setPage] = useState("overview");
  const [folded, setFolded] = useState(false);
  const item = (id: string, label: string, icon: typeof HomeIcon, badge?: number) => ({
    id,
    label,
    icon: <Icon icon={icon} />,
    badge,
    onClick: () => setPage(id),
  });
  return (
    <div
      style={{
        height: 480,
        display: "flex",
        border: "1px solid var(--iro-line)",
        borderRadius: "var(--iro-radius-lg)",
        overflow: "hidden",
      }}
    >
      <AppSidebar
        current={page}
        collapsed={folded}
        onCollapsedChange={setFolded}
        header={
          <>
            <span style={{ width: 22, height: 22, flex: "none", borderRadius: 6, background: "var(--iro-accent)" }} />
            {folded ? null : <strong>Harbor</strong>}
          </>
        }
        sections={[
          {
            items: [item("overview", "Overview", HomeIcon), item("inbox", "Inbox", InboxIcon, 4)],
          },
          {
            title: "Workspace",
            items: [
              item("projects", "Projects", FolderIcon, 12),
              item("deploys", "Deployments", RocketIcon),
              item("databases", "Databases", DatabaseIcon),
              item("team", "Team", UsersIcon, 8),
            ],
          },
          { title: "Account", items: [item("settings", "Settings", SettingsIcon)] },
        ]}
        footer={
          <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "0 4px" }}>
            <Avatar name="Maya Chen" color="blue" size={28} />
            {folded ? null : <span>Maya Chen</span>}
          </div>
        }
      />
      <div style={{ flex: 1, padding: 24 }} className="lab-hint">
        Showing: {page}
      </div>
    </div>
  );
}
