// Lab page: ListItem as settings rows with switches, as members with avatars and menus, as rows to pick from, and as
// stretched rows that open and wrap, with chips that stay clickable.

import { useState } from "react";
import { MoonIcon } from "../../icons/set/nature";
import { LockIcon } from "../../icons/set/security";
import { BellIcon } from "../../icons/set/status";
import { Avatar } from "../avatar/Avatar";
import { Badge } from "../badge/Badge";
import { Button } from "../button/Button";
import { Chip } from "../chip/Chip";
import { Icon } from "../icon/Icon";
import { IconButton } from "../icon-button/IconButton";
import { Panel } from "../panel/Panel";
import { MoreHorizontalGlyph } from "../shared/glyphs";
import { Switch } from "../switch/Switch";
import { ListItem } from "./ListItem";

const FILES = ["Quarterly report.pdf", "Brand colors.png", "Meeting notes.md"];
const PROJECTS = [
  {
    name: "Harbor",
    status: "Shipping",
    about: "Booking for small marinas, with tide tables and berth maps.",
    tags: ["web", "maps"],
  },
  {
    name: "Lantern",
    status: "Paused",
    about: "A reading lamp's firmware and its phone app.",
    tags: ["firmware", "mobile"],
  },
];

export default function ListItemLab() {
  const [picked, setPicked] = useState(FILES[0]);
  const [open, setOpen] = useState<string | null>(PROJECTS[0].name);
  const [tag, setTag] = useState<string | null>(null);
  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <h3>Settings</h3>
      <Panel padded={false} style={{ alignSelf: "stretch", padding: 4 }}>
        <ListItem
          start={<Icon icon={BellIcon} />}
          title="Notifications"
          description="Mentions and replies"
          actions={<Switch defaultChecked aria-label="Notifications" />}
        />
        <ListItem
          start={<Icon icon={MoonIcon} />}
          title="Quiet hours"
          description="22:00 to 07:00"
          actions={<Switch aria-label="Quiet hours" />}
        />
        <ListItem start={<Icon icon={LockIcon} />} title="Two-step sign-in" meta={<Badge tone="success">On</Badge>} />
      </Panel>
      <h3>Members</h3>
      <Panel padded={false} style={{ alignSelf: "stretch", padding: 4 }}>
        {[
          { name: "Maya Chen", email: "maya@example.com", role: "Owner", color: "blue" as const },
          { name: "Leo Park", email: "leo@example.com", role: "Editor", color: "green" as const },
          { name: "Sara Novak", email: "sara@example.com", role: "Viewer", color: "purple" as const },
        ].map(({ name, email, role, color }) => (
          <ListItem
            key={name}
            start={<Avatar name={name} color={color} size={32} />}
            title={name}
            description={email}
            meta={role}
            actions={<IconButton size="sm" icon={<MoreHorizontalGlyph />} label={`Options for ${name}`} />}
          />
        ))}
      </Panel>
      <h3>Rows to pick from</h3>
      <Panel padded={false} style={{ alignSelf: "stretch", padding: 4 }}>
        {FILES.map((name, index) => (
          <ListItem
            key={name}
            title={name}
            meta={`${index + 2} days ago`}
            selected={picked === name}
            onClick={() => setPicked(name)}
          />
        ))}
        <ListItem title="Archived notes.md" description="Moved to the archive" disabled onClick={() => undefined} />
      </Panel>
      <h3>Rows that open, with chips</h3>
      <Panel padded={false} style={{ alignSelf: "stretch", padding: 4 }}>
        {PROJECTS.map(({ name, status, about, tags }) => (
          <ListItem
            key={name}
            stretched
            wrap
            expanded={open === name}
            onClick={() => setOpen(open === name ? null : name)}
            title={
              <>
                {name} <Badge tone={status === "Paused" ? "warning" : "success"}>{status}</Badge>
              </>
            }
            description={
              <>
                <span>{about}</span>
                <span style={{ display: "flex", gap: 4 }}>
                  {tags.map((t) => (
                    <Chip key={t} size="sm" selected={tag === t} onClick={() => setTag(tag === t ? null : t)}>
                      #{t}
                    </Chip>
                  ))}
                </span>
              </>
            }
            actions={<Button size="sm">Open</Button>}
          />
        ))}
      </Panel>
    </div>
  );
}
