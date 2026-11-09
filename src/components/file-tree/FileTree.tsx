// FileTree: a folder tree built from nested nodes, drawn with TreeRow: folders open and close, a click on a file
// selects it. Open folders can be the tree's own state or the app's (`open` + `onOpenChange`). Rows are buttons in
// reading order, so Tab walks them; Base UI has no tree, so there are no arrow-key moves.

// ── Dependencies ──────────────────────────
import { type ReactNode, useState } from "react";
import { FileIcon } from "../../icons/set/files";
import { FolderIcon, FolderOpenIcon } from "../../icons/set/folders";
import { Icon } from "../icon/Icon";
import { cx } from "../shared/cx";
import { TreeRow } from "../tree-row/TreeRow";

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

// ── Private helpers ───────────────────────
/** Folders first, then files, each by name. */
const sorted = (nodes: FileNode[]) =>
  [...nodes].sort((a, b) => Number(!a.children) - Number(!b.children) || a.name.localeCompare(b.name));

// ── Public API ────────────────────────────
/** A tree of folders and files. */
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
  const opened = new Set(open ?? ownOpen);
  const toggle = (path: string) => {
    const next = opened.has(path) ? [...opened].filter((item) => item !== path) : [...opened, path];
    setOwnOpen(next);
    onOpenChange?.(next);
  };

  const rows = (list: FileNode[], parent: string, depth: number): ReactNode[] =>
    sorted(list).flatMap((node) => {
      const path = parent ? `${parent}/${node.name}` : node.name;
      const folder = node.children !== undefined;
      const isOpen = folder && opened.has(path);
      const row = (
        <TreeRow
          key={path}
          label={node.name}
          depth={depth}
          icon={node.icon ?? <Icon icon={folder ? (isOpen ? FolderOpenIcon : FolderIcon) : FileIcon} size="1em" />}
          open={folder ? isOpen : undefined}
          selected={!folder && path === selected}
          dirty={node.dirty}
          meta={node.meta}
          onClick={() => (folder ? toggle(path) : onSelect?.(path, node))}
        />
      );
      return isOpen && node.children ? [row, ...rows(node.children, path, depth + 1)] : [row];
    });

  return (
    <nav aria-label={label} className={cx("iro-file-tree", className)}>
      {rows(nodes, "", 0)}
    </nav>
  );
}
