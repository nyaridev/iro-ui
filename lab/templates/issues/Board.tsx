// The issue tracker's board: a column per status, each issue a card with its labels, priority and assignee. A card's
// ⋯ menu (or a right-click) moves it to another column or deletes it.

// ── Dependencies ──────────────────────────
import { Avatar, Badge, ContextMenu, Icon, IconButton, Menu, type MenuEntry } from "../../../src";
import {
  AlertTriangleIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  type IconData,
  MinusIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "../../../src/icons";
import { type Issue, LABELS, PEOPLE, PRIORITIES, type Priority, STATUSES, type Status } from "./data";

// ── Constants ─────────────────────────────
const PRIORITY_ICONS: Record<Priority, IconData> = {
  urgent: AlertTriangleIcon,
  high: ArrowUpIcon,
  medium: MinusIcon,
  low: ArrowDownIcon,
};

// ── Types ─────────────────────────────────
interface BoardProps {
  issues: Issue[];
  onOpen: (id: string) => void;
  onMove: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}

// ── Public API ────────────────────────────
/** An issue's priority: its icon and name. */
export function PriorityTag({ priority }: { priority: Priority }) {
  return (
    <span className="tpl-issues-priority" data-priority={priority}>
      <Icon icon={PRIORITY_ICONS[priority]} size={14} />
      {PRIORITIES.find(({ value }) => value === priority)?.label}
    </span>
  );
}

/** An issue's labels as badges. */
export function LabelBadges({ labels }: { labels: string[] }) {
  return labels.map((value) => {
    const label = LABELS.find((item) => item.value === value);
    return label ? (
      <Badge key={value} tone={label.tone}>
        {label.label}
      </Badge>
    ) : null;
  });
}

/** Who has an issue: their avatar, or a dash when nobody does. */
export function Assignee({ id, withName = false }: { id: string; withName?: boolean }) {
  const person = PEOPLE.find((item) => item.id === id);
  if (!person) return <span className="tpl-issues-nobody">{withName ? "Unassigned" : "—"}</span>;
  return (
    <span className="tpl-issues-assignee" title={withName ? undefined : person.name}>
      <Avatar name={person.name} color={person.color} size={22} />
      {withName ? person.name : null}
    </span>
  );
}

/** The board: one column per status. */
export function Board({ issues, onOpen, onMove, onDelete }: BoardProps) {
  return (
    <div className="tpl-issues-board">
      {STATUSES.map((status) => {
        const cards = issues.filter((issue) => issue.status === status.value);
        return (
          <section key={status.value} className="tpl-issues-column" aria-label={status.label}>
            <h2>
              <span className="tpl-issues-dot" data-status={status.value} aria-hidden="true" />
              {status.label}
              <span className="tpl-issues-count">{cards.length}</span>
            </h2>
            {cards.length === 0 ? <p className="tpl-issues-none">No issues</p> : null}
            {cards.map((issue) => {
              const items: MenuEntry[] = [
                { label: "Open", onSelect: () => onOpen(issue.id) },
                "separator",
                ...STATUSES.filter(({ value }) => value !== issue.status).map(({ value, label }) => ({
                  label: `Move to ${label}`,
                  onSelect: () => onMove(issue.id, value),
                })),
                "separator",
                { label: "Delete", icon: <Icon icon={TrashIcon} />, danger: true, onSelect: () => onDelete(issue.id) },
              ];
              return (
                <article key={issue.id} className="tpl-issues-card">
                  <div className="tpl-issues-card-top">
                    <span className="tpl-issues-key">{issue.id}</span>
                    <Menu
                      align="end"
                      items={items}
                      trigger={
                        <IconButton
                          className="tpl-issues-card-menu"
                          size="sm"
                          icon={<Icon icon={MoreHorizontalIcon} />}
                          label={`Actions for ${issue.id}`}
                          data-lab-state={issue.id === issues[0]?.id ? "click" : undefined}
                        />
                      }
                    />
                  </div>
                  {/* The title covers the card, so right-clicking anywhere on it opens the same items as ⋯. */}
                  <ContextMenu items={items}>
                    <button
                      type="button"
                      className="tpl-issues-card-title"
                      data-lab-state={issue.id === issues[0]?.id ? "contextmenu" : undefined}
                      onClick={() => onOpen(issue.id)}
                    >
                      {issue.title}
                    </button>
                  </ContextMenu>
                  {issue.labels.length > 0 ? (
                    <div className="tpl-issues-labels">
                      <LabelBadges labels={issue.labels} />
                    </div>
                  ) : null}
                  <div className="tpl-issues-card-foot">
                    <PriorityTag priority={issue.priority} />
                    <Assignee id={issue.assignee} />
                  </div>
                </article>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
