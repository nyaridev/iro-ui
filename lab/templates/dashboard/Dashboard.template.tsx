// Template: an app's overview screen. A side nav, a top bar with search, stat tiles, recent activity, services and
// usage, built from the public entries only.

// ── Dependencies ──────────────────────────
import { useState } from "react";
import {
  Avatar,
  type AvatarColor,
  Button,
  Counter,
  Icon,
  IconButton,
  Notice,
  Panel,
  ProgressBar,
  ProgressRing,
  SectionTitle,
  Stat,
  StatusDot,
  TextField,
  TreeRow,
  Trend,
} from "../../../src";
import {
  BellIcon,
  DatabaseIcon,
  FolderIcon,
  HomeIcon,
  type IconData,
  PlusIcon,
  RocketIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "../../../src/icons";

// ── Constants ─────────────────────────────
const NAV: { id: string; label: string; icon: IconData; count?: number }[] = [
  { id: "overview", label: "Overview", icon: HomeIcon },
  { id: "projects", label: "Projects", icon: FolderIcon, count: 12 },
  { id: "deployments", label: "Deployments", icon: RocketIcon },
  { id: "databases", label: "Databases", icon: DatabaseIcon },
  { id: "team", label: "Team", icon: UsersIcon, count: 8 },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

const STATS = [
  { label: "Active users", value: 2481, change: 12.4, good: "up" },
  { label: "Requests today", value: 18240, change: 3.1, good: "up" },
  { label: "Open issues", value: 37, change: -8, good: "down" },
] as const;

const ACTIVITY: { name: string; color: AvatarColor; action: string; target: string; time: string }[] = [
  { name: "Maya Chen", color: "blue", action: "deployed", target: "web 4f2a91c", time: "2 min ago" },
  { name: "Leo Park", color: "green", action: "merged", target: "Export to CSV", time: "18 min ago" },
  { name: "Sara Novak", color: "purple", action: "opened", target: "Login fails on Safari", time: "1 h ago" },
  { name: "Tom Reyes", color: "orange", action: "invited", target: "ana@example.com", time: "3 h ago" },
  { name: "Ines Ferreira", color: "pink", action: "archived", target: "Spring campaign", time: "Yesterday" },
];

const SERVICES = [
  { name: "web", healthy: true, load: 42 },
  { name: "api", healthy: true, load: 68 },
  { name: "worker", healthy: false, load: 91 },
];

const QUOTAS = [
  { label: "Bandwidth", used: 64, total: 100, unit: " GB" },
  { label: "Build minutes", used: 1240, total: 3000, unit: "" },
  { label: "Seats", used: 8, total: 10, unit: "" },
];

const numbers = new Intl.NumberFormat("en-US");

// ── Public API ────────────────────────────
/** The overview screen. */
export default function Dashboard() {
  const [page, setPage] = useState("overview");

  return (
    <div className="tpl-dash">
      <aside className="tpl-dash-nav" aria-label="Main">
        <div className="tpl-dash-brand">
          <span aria-hidden="true" />
          Harbor
        </div>
        {NAV.map(({ id, label, icon, count }) => (
          <TreeRow
            key={id}
            size="lg"
            label={label}
            icon={<Icon icon={icon} />}
            meta={count}
            selected={id === page}
            onClick={() => setPage(id)}
          />
        ))}
        <div className="tpl-dash-plan">
          <ProgressRing value={0.72} size={36} label="Storage used" />
          <div>
            <strong>72% of storage</strong>
            <span>36 of 50 GB</span>
          </div>
        </div>
      </aside>

      <div className="tpl-dash-main">
        <header className="tpl-dash-top">
          <div className="tpl-dash-title">
            <h1>Overview</h1>
            <span>Last 24 hours</span>
          </div>
          <TextField
            className="tpl-dash-search"
            size="sm"
            type="search"
            placeholder="Search"
            aria-label="Search"
            start={<Icon icon={SearchIcon} />}
          />
          <IconButton icon={<Icon icon={BellIcon} />} label="Notifications" />
          <Button className="tpl-dash-new" variant="primary" size="sm" icon={<Icon icon={PlusIcon} />}>
            New project
          </Button>
          <Avatar name="Maya Chen" color="blue" size={30} />
        </header>

        <div className="tpl-dash-body">
          <Notice tone="warning" title="Scheduled maintenance">
            The database cluster restarts on Sunday from 02:00 to 02:30 UTC.
          </Notice>

          <div className="tpl-dash-stats">
            {STATS.map(({ label, value, change, good }) => (
              <Stat
                key={label}
                label={label}
                value={<Counter value={value} format={(n) => numbers.format(n)} />}
                hint={<Trend value={change} good={good} context="vs yesterday" />}
              />
            ))}
          </div>

          <div className="tpl-dash-panels">
            <Panel as="section" padded>
              <SectionTitle
                actions={
                  <Button variant="ghost" size="sm">
                    View all
                  </Button>
                }
              >
                Recent activity
              </SectionTitle>
              <ul className="tpl-dash-activity">
                {ACTIVITY.map(({ name, color, action, target, time }) => (
                  <li key={name}>
                    <Avatar name={name} color={color} size={28} />
                    <p>
                      <strong>{name}</strong> {action} <span>{target}</span>
                    </p>
                    <time>{time}</time>
                  </li>
                ))}
              </ul>
            </Panel>

            <div className="tpl-dash-side">
              <Panel as="section" padded>
                <SectionTitle>Services</SectionTitle>
                <ul className="tpl-dash-services">
                  {SERVICES.map(({ name, healthy, load }) => (
                    <li key={name}>
                      <StatusDot tone={healthy ? "success" : "warning"} label={healthy ? "Healthy" : "Degraded"} />
                      <code>{name}</code>
                      <ProgressBar value={load / 100} tone={load > 85 ? "danger" : "accent"} label={`${name} load`} />
                      <span>{load}%</span>
                    </li>
                  ))}
                </ul>
              </Panel>
              <Panel as="section" padded className="tpl-dash-usage">
                <SectionTitle>Usage this month</SectionTitle>
                {QUOTAS.map(({ label, used, total, unit }) => (
                  <div key={label} className="tpl-dash-quota">
                    <span>{label}</span>
                    <span>
                      {numbers.format(used)} / {numbers.format(total)}
                      {unit}
                    </span>
                    <ProgressBar value={used / total} size="sm" label={label} />
                  </div>
                ))}
              </Panel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
