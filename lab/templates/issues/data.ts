// The issue tracker's mock data: people, labels, statuses, priorities and the issues themselves.

// ── Dependencies ──────────────────────────
import type { AvatarColor, BadgeProps, SelectOption } from "../../../src";

// ── Types ─────────────────────────────────
export type Status = "backlog" | "progress" | "review" | "done";
export type Priority = "urgent" | "high" | "medium" | "low";

export interface Issue {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  /** A person's id, or "" when nobody has it. */
  assignee: string;
  labels: string[];
  description: string;
  /** Days since it last changed, for sorting and the "Updated" column. */
  age: number;
}

// ── Constants ─────────────────────────────
/** Who is signed in: "Assigned to me" filters on it. */
export const ME = "maya";

export const PEOPLE: { id: string; name: string; color: AvatarColor }[] = [
  { id: "maya", name: "Maya Chen", color: "blue" },
  { id: "leo", name: "Leo Park", color: "green" },
  { id: "sara", name: "Sara Novak", color: "purple" },
  { id: "tom", name: "Tom Reyes", color: "orange" },
];

export const LABELS: { value: string; label: string; tone: NonNullable<BadgeProps["tone"]> }[] = [
  { value: "bug", label: "Bug", tone: "danger" },
  { value: "feature", label: "Feature", tone: "accent" },
  { value: "design", label: "Design", tone: "info" },
  { value: "performance", label: "Performance", tone: "warning" },
  { value: "docs", label: "Docs", tone: "neutral" },
];

export const STATUSES: SelectOption<Status>[] = [
  { value: "backlog", label: "Backlog" },
  { value: "progress", label: "In progress" },
  { value: "review", label: "In review" },
  { value: "done", label: "Done" },
];

export const PRIORITIES: SelectOption<Priority>[] = [
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

/** Sort order for the priority column: urgent first. */
export const PRIORITY_RANK: Record<Priority, number> = { urgent: 0, high: 1, medium: 2, low: 3 };

export const PEOPLE_OPTIONS: SelectOption<string>[] = PEOPLE.map(({ id, name }) => ({ value: id, label: name }));
export const LABEL_OPTIONS: SelectOption<string>[] = LABELS.map(({ value, label }) => ({ value, label }));

export const ISSUES: Issue[] = [
  {
    id: "HB-142",
    title: "Login fails on Safari when cookies are blocked",
    status: "progress",
    priority: "urgent",
    assignee: "maya",
    labels: ["bug"],
    description: "Safari with “Block all cookies” on shows a blank page after the password step.",
    age: 0,
  },
  {
    id: "HB-141",
    title: "Export to CSV skips empty rows",
    status: "review",
    priority: "high",
    assignee: "leo",
    labels: ["bug"],
    description: "Rows with no values are dropped; keep rows that have at least one.",
    age: 0,
  },
  {
    id: "HB-140",
    title: "Dark theme for the billing pages",
    status: "progress",
    priority: "medium",
    assignee: "sara",
    labels: ["design", "feature"],
    description: "Invoices and the plan picker still use the light surfaces.",
    age: 1,
  },
  {
    id: "HB-139",
    title: "Search results load slowly on large projects",
    status: "backlog",
    priority: "high",
    assignee: "",
    labels: ["performance"],
    description: "Projects with over 10,000 files take several seconds to show results.",
    age: 1,
  },
  {
    id: "HB-138",
    title: "Write the self-hosting guide",
    status: "backlog",
    priority: "low",
    assignee: "tom",
    labels: ["docs"],
    description: "Docker setup, environment variables and upgrades.",
    age: 2,
  },
  {
    id: "HB-137",
    title: "Invite teammates by link",
    status: "done",
    priority: "medium",
    assignee: "maya",
    labels: ["feature"],
    description: "A link that expires after seven days, with the role picked up front.",
    age: 3,
  },
  {
    id: "HB-136",
    title: "Upload stalls at 99% for files over 2 GB",
    status: "progress",
    priority: "high",
    assignee: "leo",
    labels: ["bug", "performance"],
    description: "The last chunk is never confirmed; retrying starts from zero.",
    age: 3,
  },
  {
    id: "HB-135",
    title: "New empty states for projects and teams",
    status: "review",
    priority: "low",
    assignee: "sara",
    labels: ["design"],
    description: "Illustrations and one clear next step on each.",
    age: 4,
  },
  {
    id: "HB-134",
    title: "Keyboard shortcuts cheat sheet",
    status: "backlog",
    priority: "low",
    assignee: "",
    labels: ["docs", "feature"],
    description: "Opened with ?, listing every shortcut by area.",
    age: 5,
  },
  {
    id: "HB-133",
    title: "Dashboard stats count archived projects",
    status: "done",
    priority: "medium",
    assignee: "tom",
    labels: ["bug"],
    description: "Archived projects should not count toward active users or requests.",
    age: 6,
  },
  {
    id: "HB-132",
    title: "Cache avatars in the activity feed",
    status: "done",
    priority: "low",
    assignee: "leo",
    labels: ["performance"],
    description: "Each row fetches its avatar again on every refresh.",
    age: 8,
  },
  {
    id: "HB-131",
    title: "Two-factor sign-in with an authenticator app",
    status: "backlog",
    priority: "medium",
    assignee: "maya",
    labels: ["feature"],
    description: "TOTP codes, with backup codes to download once.",
    age: 9,
  },
  {
    id: "HB-130",
    title: "Date picker opens off-screen on phones",
    status: "review",
    priority: "medium",
    assignee: "maya",
    labels: ["bug", "design"],
    description: "Near the bottom of the page the popup opens below the fold.",
    age: 10,
  },
  {
    id: "HB-129",
    title: "API reference for webhooks",
    status: "done",
    priority: "low",
    assignee: "sara",
    labels: ["docs"],
    description: "Every event, its payload, and how to check the signature.",
    age: 12,
  },
];
