// The Lab's sidebar: a filter box over the current view's pages in sections. On a wide window it sits beside the page
// and can be hidden; on a narrow one it floats over the page and closes after a pick.

// ── Dependencies ──────────────────────────
import { useState } from "react";
import { Icon, TextField } from "../../src";
import { SearchIcon } from "../../src/icons";
import type { NavSection } from "./groups";

// ── Types ─────────────────────────────────
interface SidebarProps {
  open: boolean;
  /** The current view's pages, under their headings. */
  sections: NavSection[];
  /** The id of the page shown. */
  shown: string;
  onPick: (id: string) => void;
  onClose: () => void;
}

// ── Public API ────────────────────────────
/** The page list; `open` slides it in and out. */
export function Sidebar({ open, sections, shown, onPick, onClose }: SidebarProps) {
  const [filter, setFilter] = useState("");
  const query = filter.trim().toLowerCase();
  const matching = sections
    .map(({ name, items }) => ({ name, items: items.filter(({ label }) => label.toLowerCase().includes(query)) }))
    .filter(({ items }) => items.length > 0);
  const first = matching[0]?.items[0]?.id;

  const item = ({ id, label }: NavSection["items"][number]) => (
    <li key={id}>
      <button
        type="button"
        className="lab-nav-item"
        aria-current={id === shown ? "page" : undefined}
        onClick={() => onPick(id)}
      >
        {label}
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
            start={<Icon icon={SearchIcon} size="1em" />}
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && first && onPick(first)}
          />
        </div>
        <div className="lab-nav-list" data-iro-scroll="quiet">
          {matching.map(({ name, items }) => (
            <section key={name} className="lab-nav-group" aria-label={name}>
              <h2>
                {name}
                <span>{items.length}</span>
              </h2>
              <ul>{items.map(item)}</ul>
            </section>
          ))}
          {matching.length === 0 && <p className="lab-empty">No page matches "{filter}".</p>}
        </div>
      </nav>
      {/* Narrow windows only (CSS): a click beside the floating sidebar closes it. */}
      {open && (
        <button type="button" className="lab-scrim" tabIndex={-1} aria-label="Close the page list" onClick={onClose} />
      )}
    </>
  );
}
