// FileTree: a folder tree built from nested nodes, drawn with TreeRow: folders open and close, a click on a file
// selects it. Open folders can be the tree's own state or the app's (`open` + `onOpenChange`). It's one Tab stop with
// the tree's keys (ADR-0013): arrows move, open and close, Home and End jump, a letter finds the next match.

// ── Dependencies ──────────────────────────
import { type KeyboardEvent, type ReactNode, useRef, useState } from "react";
import { FileIcon } from "../../icons/set/files";
import { FolderIcon, FolderOpenIcon } from "../../icons/set/folders";
import { Icon } from "../icon/Icon";
import { cx } from "../shared/cx";
import { TreeRow } from "../tree-row/TreeRow";
import { treeKey } from "./keys";

// ── Types ─────────────────────────────────
export interface FileNode {
  name: string;
  /** Present on folders, even when empty. */
  children?: FileNode[];
  /** In place of the file or folder icon. */
  icon?: ReactNode;
  /** Muted text at the end: a size, a change count. */
  meta?: ReactNode;
  /** Unsaved changes: a dot after the name. */
  dirty?: boolean;
}

export interface FileTreeProps {
  nodes: FileNode[];
  /** The selected file's path, folders joined by "/". */
  selected?: string;
  onSelect?: (path: string, node: FileNode) => void;
  /** Open folders' paths, when the app keeps them. */
  open?: string[];
  onOpenChange?: (open: string[]) => void;
  /** Open folders at first, when the tree keeps them. */
  defaultOpen?: string[];
  /** Names the tree for screen readers (default "Files"). */
  label?: string;
  className?: string;
}

interface Row {
  node: FileNode;
  path: string;
  depth: number;
  /** Present on folders. */
  open?: boolean;
}

// ── Private helpers ───────────────────────
/** Folders first, then files, each by name. */
const sorted = (nodes: FileNode[]) =>
  [...nodes].sort((a, b) => Number(!a.children) - Number(!b.children) || a.name.localeCompare(b.name));

/** The rows on screen, in reading order: open folders' children follow them. */
function visibleRows(nodes: FileNode[], opened: Set<string>, parent = "", depth = 0): Row[] {
  return sorted(nodes).flatMap((node) => {
    const path = parent ? `${parent}/${node.name}` : node.name;
    const open = node.children ? opened.has(path) : undefined;
    const row: Row = { node, path, depth, open };
    return open && node.children ? [row, ...visibleRows(node.children, opened, path, depth + 1)] : [row];
  });
}

// ── Public API ────────────────────────────
/** A tree of folders and files, one Tab stop with arrow keys. */
export function FileTree({
  nodes,
  selected,
  onSelect,
  open,
  onOpenChange,
  defaultOpen = [],
  label = "Files",
  className,
}: FileTreeProps) {
  const [ownOpen, setOwnOpen] = useState(defaultOpen);
  const [focused, setFocused] = useState<string>();
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const opened = new Set(open ?? ownOpen);
  const rows = visibleRows(nodes, opened);
  const paths = rows.map((row) => row.path);
  const tabStop = [focused, selected].find((path) => path && paths.includes(path)) ?? paths[0];

  const setOpen = (path: string, isOpen: boolean) => {
    if (opened.has(path) === isOpen) return;
    const next = isOpen ? [...opened, path] : [...opened].filter((item) => item !== path);
    setOwnOpen(next);
    onOpenChange?.(next);
  };

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const keyRows = rows.map((row) => ({ depth: row.depth, open: row.open, label: row.node.name }));
    const action = treeKey(keyRows, index, event.key);
    if (!action) return;
    event.preventDefault();
    const path = rows[action.index].path;
    if (action.type === "focus") buttons.current.get(path)?.focus();
    else setOpen(path, action.type === "open");
  };

  return (
    <div role="tree" aria-label={label} className={cx("iro-file-tree", className)}>
      {rows.map((row, index) => {
        const folder = row.open !== undefined;
        return (
          <TreeRow
            key={row.path}
            label={row.node.name}
            depth={row.depth}
            icon={
              row.node.icon ?? <Icon icon={folder ? (row.open ? FolderOpenIcon : FolderIcon) : FileIcon} size="1em" />
            }
            open={row.open}
            selected={!folder && row.path === selected}
            dirty={row.node.dirty}
            meta={row.node.meta}
            onClick={() => (folder ? setOpen(row.path, !row.open) : onSelect?.(row.path, row.node))}
            buttonProps={{
              ref: (node) => {
                if (node) buttons.current.set(row.path, node);
                else buttons.current.delete(row.path);
              },
              role: "treeitem",
              "aria-level": row.depth + 1,
              "aria-selected": folder ? undefined : row.path === selected,
              "aria-current": undefined,
              tabIndex: row.path === tabStop ? 0 : -1,
              onFocus: () => setFocused(row.path),
              onKeyDown: (event) => onKeyDown(event, index),
            }}
          />
        );
      })}
    </div>
  );
}
