// Template part: Files' folder list. A click goes to a folder; a second click opens or closes the folders inside.

// ── Dependencies ──────────────────────────
import { Icon, TreeRow } from "../../../src";
import { FolderOpenIcon } from "../../../src/icons";
import { childrenOf, type Folder, iconOf } from "./data";

// ── Types ─────────────────────────────────
interface FolderTreeProps {
  current: string;
  expanded: string[];
  onToggle: (id: string) => void;
  onOpen: (id: string) => void;
  /** Muted counts at a row's end (the Trash's). */
  meta?: Record<string, number>;
}

// ── Private helpers ───────────────────────
/** The rows showing: each folder, then its folders when it's open. */
function rowsOf(parent: string | undefined, depth: number, expanded: string[]): { folder: Folder; depth: number }[] {
  return childrenOf(parent).flatMap((folder) => [
    { folder, depth },
    ...(expanded.includes(folder.id) ? rowsOf(folder.id, depth + 1, expanded) : []),
  ]);
}

// ── Public API ────────────────────────────
/** The folder tree; `onOpen` navigates. */
export function FolderTree({ current, expanded, onToggle, onOpen, meta }: FolderTreeProps) {
  return rowsOf(undefined, 0, expanded).map(({ folder, depth }) => {
    const parent = childrenOf(folder.id).length > 0;
    const open = expanded.includes(folder.id);
    return (
      <TreeRow
        key={folder.id}
        label={folder.label}
        depth={depth}
        icon={<Icon icon={!folder.icon && (open || folder.id === current) ? FolderOpenIcon : iconOf(folder)} />}
        open={parent ? open : undefined}
        selected={folder.id === current}
        meta={meta?.[folder.id] || undefined}
        // TreeRow gives a folder's whole row to one handler: go there, and open or close it once it's showing.
        onClick={() => (parent && folder.id === current ? onToggle(folder.id) : onOpen(folder.id))}
      />
    );
  });
}
