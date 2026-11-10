// Template: an issue tracker. A side nav of saved views, a top bar with search, Board and List views and a New issue
// button, label and assignee filters, a board whose cards move between columns, a sortable, paged list, a sheet that
// edits an issue and a dialog that files one. On narrow screens the nav moves into a sheet. Public entries only.

// ── Dependencies ──────────────────────────
import { useState } from "react";
import {
  AppSidebar,
  type AppSidebarItem,
  Avatar,
  Button,
  DataTable,
  type DataTableColumn,
  type DataTableSort,
  EmptyState,
  Icon,
  IconButton,
  MultiSelect,
  Pagination,
  Segmented,
  Sheet,
  sortRows,
  TextField,
  Toaster,
  toast,
} from "../../../src";
import {
  BugIcon,
  ColumnsIcon,
  FilterIcon,
  type IconData,
  InboxIcon,
  ListIcon,
  MenuIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "../../../src/icons";
import { Assignee, Board, LabelBadges, PriorityTag } from "./Board";
import {
  ISSUES,
  type Issue,
  LABEL_OPTIONS,
  ME,
  PEOPLE,
  PEOPLE_OPTIONS,
  PRIORITY_RANK,
  STATUSES,
  type Status,
} from "./data";
import { IssueSheet, NewIssueDialog } from "./IssueEditor";

// ── Constants ─────────────────────────────
const VIEWS = [
  { value: "board", label: "Board", icon: <Icon icon={ColumnsIcon} /> },
  { value: "list", label: "List", icon: <Icon icon={ListIcon} /> },
] as const;

/** The nav's saved views: what each one shows. */
const SAVED: { id: string; label: string; icon: IconData; keep: (issue: Issue) => boolean }[] = [
  { id: "all", label: "All issues", icon: InboxIcon, keep: () => true },
  { id: "mine", label: "Assigned to me", icon: UserIcon, keep: (issue) => issue.assignee === ME },
  { id: "bugs", label: "Bugs", icon: BugIcon, keep: (issue) => issue.labels.includes("bug") },
];

const PAGE_SIZES = [5, 10, 20];
const statusLabel = (status: Status) => STATUSES.find(({ value }) => value === status)?.label ?? status;
const updated = (age: number) => (age === 0 ? "Today" : age === 1 ? "Yesterday" : `${age} days ago`);

// ── Public API ────────────────────────────
/** The issue tracker screen. */
export default function Issues() {
  const [issues, setIssues] = useState(ISSUES);
  const [saved, setSaved] = useState("all");
  const [navOpen, setNavOpen] = useState(false);
  const [view, setView] = useState<(typeof VIEWS)[number]["value"]>("board");
  const [query, setQuery] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const [people, setPeople] = useState<string[]>([]);
  const [sort, setSort] = useState<DataTableSort | null>({ column: "updated", direction: "asc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const active = SAVED.find(({ id }) => id === saved) ?? SAVED[0];
  const words = query.trim().toLowerCase();
  const shown = issues.filter(
    (issue) =>
      active.keep(issue) &&
      (!words || `${issue.id} ${issue.title}`.toLowerCase().includes(words)) &&
      (labels.length === 0 || labels.some((label) => issue.labels.includes(label))) &&
      (people.length === 0 || people.includes(issue.assignee)),
  );
  const filtered = Boolean(words) || labels.length > 0 || people.length > 0;
  const nextId = `HB-${Math.max(...issues.map(({ id }) => Number(id.slice(3)))) + 1}`;

  const columns: DataTableColumn<Issue>[] = [
    { id: "id", header: "ID", cell: (row) => <span className="tpl-issues-key">{row.id}</span>, sortValue: (r) => r.id },
    {
      id: "title",
      header: "Title",
      sortValue: (row) => row.title,
      cell: (row) => (
        <button type="button" className="tpl-issues-row-title" onClick={() => setEditing(row.id)}>
          {row.title}
        </button>
      ),
    },
    { id: "labels", header: "Labels", cell: (row) => <LabelBadges labels={row.labels} /> },
    {
      id: "status",
      header: "Status",
      sortValue: (row) => STATUSES.findIndex(({ value }) => value === row.status),
      cell: (row) => (
        <span className="tpl-issues-status">
          <span className="tpl-issues-dot" data-status={row.status} aria-hidden="true" />
          {statusLabel(row.status)}
        </span>
      ),
    },
    {
      id: "priority",
      header: "Priority",
      sortValue: (row) => PRIORITY_RANK[row.priority],
      cell: (row) => <PriorityTag priority={row.priority} />,
    },
    {
      id: "assignee",
      header: "Assignee",
      sortValue: (row) => PEOPLE.find(({ id }) => id === row.assignee)?.name ?? "~",
      cell: (row) => <Assignee id={row.assignee} withName />,
    },
    {
      id: "updated",
      header: "Updated",
      sortValue: (row) => row.age,
      cell: (row) => <span className="tpl-issues-updated">{updated(row.age)}</span>,
    },
  ];

  // Sort every match, then page it, so the order holds across pages.
  const by = columns.find(({ id }) => id === sort?.column)?.sortValue;
  const ordered = sort && by ? sortRows(shown, by, sort.direction) : shown;
  const pages = Math.max(1, Math.ceil(ordered.length / pageSize));
  const current = Math.min(page, pages);
  const pageRows = ordered.slice((current - 1) * pageSize, current * pageSize);

  const update = (id: string, change: Partial<Issue>) =>
    setIssues((all) => all.map((issue) => (issue.id === id ? { ...issue, ...change } : issue)));
  const move = (id: string, status: Status) => {
    update(id, { status, age: 0 });
    toast({ title: `${id} moved to ${statusLabel(status)}`, tone: "success" });
  };
  const remove = (id: string) => {
    const before = issues;
    setIssues(issues.filter((issue) => issue.id !== id));
    toast({ title: `${id} deleted`, action: { label: "Undo", onClick: () => setIssues(before) } });
  };
  const clearFilters = () => {
    setQuery("");
    setLabels([]);
    setPeople([]);
  };
  const pick = (id: string) => {
    setSaved(id);
    setPage(1);
    setNavOpen(false);
  };

  const navItem = ({ id, label, icon, keep }: (typeof SAVED)[number]): AppSidebarItem => ({
    id,
    label,
    icon: <Icon icon={icon} />,
    badge: issues.filter(keep).length,
    onClick: () => pick(id),
  });
  const nav = (
    <AppSidebar
      className="tpl-issues-nav"
      aria-label="Issues"
      current={saved}
      header={
        <span className="tpl-issues-brand">
          <span aria-hidden="true" />
          Harbor
        </span>
      }
      sections={[
        { title: "Issues", items: SAVED.map(navItem) },
        {
          title: "Workspace",
          items: [
            { id: "team", label: "Team", icon: <Icon icon={UsersIcon} />, badge: PEOPLE.length },
            { id: "settings", label: "Settings", icon: <Icon icon={SettingsIcon} /> },
          ],
        },
      ]}
      footer={
        <span className="tpl-issues-me">
          <Avatar name="Maya Chen" color="blue" size={28} />
          Maya Chen
        </span>
      }
    />
  );

  return (
    <div className="tpl-issues">
      <div className="tpl-issues-side">{nav}</div>

      <div className="tpl-issues-main">
        <header className="tpl-issues-top">
          <Sheet
            title="Issues"
            side="left"
            open={navOpen}
            onOpenChange={setNavOpen}
            className="tpl-issues-nav-sheet"
            trigger={
              <IconButton
                className="tpl-issues-menu"
                icon={<Icon icon={MenuIcon} />}
                label="Open navigation"
                data-lab-state="click"
              />
            }
          >
            {nav}
          </Sheet>
          <div className="tpl-issues-title">
            <h1>{active.label}</h1>
            <span>
              {shown.length} of {issues.length} issues
            </span>
          </div>
          <Segmented aria-label="View" options={[...VIEWS]} value={view} onValueChange={setView} size="sm" />
          <Button variant="primary" size="sm" icon={<Icon icon={PlusIcon} />} onClick={() => setCreating(true)}>
            New issue
          </Button>
        </header>

        <div className="tpl-issues-filters">
          <TextField
            className="tpl-issues-search"
            size="sm"
            type="search"
            placeholder="Search issues"
            aria-label="Search issues"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            start={<Icon icon={SearchIcon} />}
          />
          <div className="tpl-issues-pick" data-lab-state="click">
            <MultiSelect
              aria-label="Labels"
              placeholder="Any label"
              size="sm"
              options={LABEL_OPTIONS}
              value={labels}
              onValueChange={(value) => {
                setLabels(value);
                setPage(1);
              }}
            />
          </div>
          <div className="tpl-issues-pick" data-lab-state="click">
            <MultiSelect
              aria-label="Assignees"
              placeholder="Anyone"
              size="sm"
              options={PEOPLE_OPTIONS}
              value={people}
              onValueChange={(value) => {
                setPeople(value);
                setPage(1);
              }}
            />
          </div>
          {filtered ? (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          ) : null}
        </div>

        <main className="tpl-issues-body">
          {shown.length === 0 ? (
            <EmptyState
              icon={<Icon icon={FilterIcon} />}
              title="No issues match"
              action={
                filtered ? (
                  <Button size="sm" onClick={clearFilters}>
                    Clear filters
                  </Button>
                ) : undefined
              }
            >
              Try another search, or a different view.
            </EmptyState>
          ) : view === "board" ? (
            <Board issues={shown} onOpen={setEditing} onMove={move} onDelete={remove} />
          ) : (
            <div className="tpl-issues-list">
              <DataTable
                label="Issues"
                size="sm"
                columns={columns}
                rows={pageRows}
                rowKey={(row) => row.id}
                sort={sort}
                onSortChange={setSort}
              />
              <Pagination
                page={current}
                pageSize={pageSize}
                total={ordered.length}
                onPageChange={setPage}
                pageSizes={PAGE_SIZES}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setPage(1);
                }}
              />
            </div>
          )}
        </main>
      </div>

      <IssueSheet
        issue={issues.find(({ id }) => id === editing) ?? null}
        onClose={() => setEditing(null)}
        onSave={(issue) => {
          update(issue.id, issue);
          setEditing(null);
          toast({ title: `${issue.id} saved`, description: issue.title, tone: "success" });
        }}
      />
      <NewIssueDialog
        open={creating}
        onOpenChange={setCreating}
        nextId={nextId}
        onCreate={(issue) => {
          setIssues((all) => [issue, ...all]);
          toast({ title: `${issue.id} created`, description: issue.title, tone: "success" });
        }}
      />
      <Toaster />
    </div>
  );
}
