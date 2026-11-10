// Template data: the dashboard's pages, numbers, people, projects and notifications.

// ── Dependencies ──────────────────────────
import type { AvatarColor } from "../../../src";
import {
  DatabaseIcon,
  FolderIcon,
  HomeIcon,
  type IconData,
  RocketIcon,
  SettingsIcon,
  UsersIcon,
} from "../../../src/icons";

// ── Types ─────────────────────────────────
export interface Page {
  id: string;
  label: string;
  icon: IconData;
  /** For pages with nothing to show yet: the empty state's title, sentence and button. */
  empty?: { title: string; text: string; action: string };
}

export interface Project {
  name: string;
  description: string;
  healthy: boolean;
  updated: string;
}

// ── Constants ─────────────────────────────
export const PAGES: Page[] = [
  { id: "overview", label: "Overview", icon: HomeIcon },
  { id: "projects", label: "Projects", icon: FolderIcon },
  {
    id: "deployments",
    label: "Deployments",
    icon: RocketIcon,
    empty: {
      title: "No deployments yet",
      text: "Push to a project's main branch to ship it.",
      action: "Connect a repo",
    },
  },
  {
    id: "databases",
    label: "Databases",
    icon: DatabaseIcon,
    empty: { title: "No databases", text: "Add a Postgres or Redis database to a project.", action: "Add a database" },
  },
  { id: "team", label: "Team", icon: UsersIcon },
  {
    id: "settings",
    label: "Settings",
    icon: SettingsIcon,
    empty: { title: "Workspace settings", text: "Billing, domains and tokens live here.", action: "Open billing" },
  },
];

export const STATS = [
  { label: "Active users", value: 2481, change: 12.4, good: "up" },
  { label: "Requests today", value: 18240, change: 3.1, good: "up" },
  { label: "Open issues", value: 37, change: -8, good: "down" },
] as const;

export const PEOPLE: { name: string; color: AvatarColor; role: string; email: string }[] = [
  { name: "Maya Chen", color: "blue", role: "Owner", email: "maya@example.com" },
  { name: "Leo Park", color: "green", role: "Developer", email: "leo@example.com" },
  { name: "Sara Novak", color: "purple", role: "Developer", email: "sara@example.com" },
  { name: "Tom Reyes", color: "orange", role: "Admin", email: "tom@example.com" },
  { name: "Ines Ferreira", color: "pink", role: "Viewer", email: "ines@example.com" },
];

export const ACTIVITY = [
  { name: "Maya Chen", action: "deployed", target: "web 4f2a91c", time: "2 min ago" },
  { name: "Leo Park", action: "merged", target: "Export to CSV", time: "18 min ago" },
  { name: "Sara Novak", action: "opened", target: "Login fails on Safari", time: "1 h ago" },
  { name: "Tom Reyes", action: "invited", target: "ana@example.com", time: "3 h ago" },
  { name: "Ines Ferreira", action: "archived", target: "Spring campaign", time: "Yesterday" },
].map((entry) => ({ ...entry, color: PEOPLE.find(({ name }) => name === entry.name)?.color ?? "blue" }));

export const SERVICES = [
  { name: "web", healthy: true, load: 42 },
  { name: "api", healthy: true, load: 68 },
  { name: "worker", healthy: false, load: 91 },
];

export const QUOTAS = [
  { label: "Bandwidth", used: 64, total: 100, unit: " GB" },
  { label: "Build minutes", used: 1240, total: 3000, unit: "" },
  { label: "Seats", used: 8, total: 10, unit: "" },
];

export const PROJECTS: Project[] = [
  { name: "website", description: "The marketing site and docs.", healthy: true, updated: "2 min ago" },
  { name: "api", description: "Public REST API.", healthy: true, updated: "18 min ago" },
  { name: "worker", description: "Exports, emails and other background jobs.", healthy: false, updated: "1 h ago" },
  { name: "mobile", description: "The iOS and Android app.", healthy: true, updated: "Yesterday" },
];

export const NOTIFICATIONS = [
  { id: "n1", text: "worker is using 91% of its memory.", time: "5 min ago" },
  { id: "n2", text: "Leo Park asked you to review Export to CSV.", time: "20 min ago" },
  { id: "n3", text: "Your invoice for October is ready.", time: "2 h ago" },
];
