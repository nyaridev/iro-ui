// The Lab's sidebar: a filter box, the Lab's own pages, then the component pages in groups. On a wide window it sits
// beside the page and can be hidden; on a narrow one it floats over the page and closes after a pick.

// ── Dependencies ──────────────────────────
import { useState } from "react";
import { TextField } from "../src";
import { GROUPS } from "./groups";

// ── Constants ─────────────────────────────
const OTHER = "Other";

// ── Types ─────────────────────────────────
interface SidebarProps {
  open: boolean;
  /** The Lab's own pages (Tokens, Base…), listed first. */
  labPages: string[];
  /** Every component page the Lab found. */
  componentPages: string[];
  shown: string;
  onPick: (name: string) => void;
  onClose: () => void;
}

// ── Private helpers ───────────────────────
/** The component pages by sidebar group, each sorted; pages no group lists go under "Other". */
function grouped(names: string[]): [string, string[]][] {
  const listed = new Set(Object.values(GROUPS).flat());
  const groups = Object.entries(GROUPS).map(([group, members]): [string, string[]] => [
    group,
    members.filter((name) => names.includes(name)).sort(),
  ]);
  const other = names.filter((name) => !listed.has(name)).sort();
  return [...groups, [OTHER, other] as [string, string[]]].filter(([, members]) => members.length > 0);
}

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4 4" strokeLinecap="round" />
  </svg>
);

// ── Public API ────────────────────────────
/** The page list; `open` slides it in and out. */
export function Sidebar({ open, labPages, componentPages, shown, onPick, onClose }: SidebarProps) {
  const [filter, setFilter] = useState("");
  const query = filter.trim().toLowerCase();
  const all: [string, string[]][] = [["Foundations", labPages], ...grouped(componentPages)];
  const sections = all
    .map(([group, members]): [string, string[]] => [
      group,
      members.filter((name) => name.toLowerCase().includes(query)),
    ])
    .filter(([, members]) => members.length > 0);
  const first = sections[0]?.[1][0];

  const item = (name: string) => (
    <li key={name}>
      <button
        type="button"
        className="lab-nav-item"
        aria-current={name === shown ? "page" : undefined}
        onClick={() => onPick(name)}
      >
        {name}
      </button>
    </li>
  );

  return (
    <>
      <nav className="lab-nav" aria-label="Lab pages" data-open={open} inert={!open}>
        <div className="lab-nav-search">
          <TextField
            size="sm"
            type="search"
            aria-label="Filter pages"
            placeholder="Filter pages"
            start={<SearchIcon />}
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && first && onPick(first)}
          />
        </div>
        <div className="lab-nav-list" data-iro-scroll="quiet">
          {sections.map(([group, members]) => (
            <section key={group} className="lab-nav-group" aria-label={group}>
              <h2>
                {group}
                <span>{members.length}</span>
              </h2>
              <ul>{members.map(item)}</ul>
            </section>
          ))}
          {sections.length === 0 && <p className="lab-empty">No page matches "{filter}".</p>}
        </div>
      </nav>
      {/* Narrow windows only (CSS): a click beside the floating sidebar closes it. */}
      {open && (
        <button type="button" className="lab-scrim" tabIndex={-1} aria-label="Close the page list" onClick={onClose} />
      )}
    </>
  );
}
