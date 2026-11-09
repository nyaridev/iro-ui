// TreeRow: one row of a file or folder tree: indent, a chevron for folders, an icon, the label, an unsaved-changes
// dot, muted meta at the end, and actions that show on hover or focus. `size="lg"` is a roomier sidebar row.

// ── Dependencies ──────────────────────────
import type { ComponentProps, CSSProperties, MouseEvent, ReactNode } from "react";
import { cx } from "../shared/cx";
import { ChevronRightGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface TreeRowProps {
  label: ReactNode;
  /** How deep it sits: 0 for the top level. */
  depth?: number;
  icon?: ReactNode;
  /** Folders pass open or closed; files leave it out. */
  open?: boolean;
  selected?: boolean;
  /** Unsaved changes: a dot after the label. */
  dirty?: boolean;
  /** Muted text at the end: a count, a size. */
  meta?: ReactNode;
  /** Small buttons at the end, shown on hover and focus. */
  actions?: ReactNode;
  /** A click on the row: opens a file, or toggles a folder when there's no `onToggle`. */
  onClick?: () => void;
  /** A folder's open/close, when a click should do something else. */
  onToggle?: () => void;
  /** A right-click on the row's label. */
  onContextMenu?: (event: MouseEvent<HTMLElement>) => void;
  size?: "md" | "lg";
  /** More attributes for the row's button: a tree's role, level and focus (ADR-0013). */
  buttonProps?: Omit<ComponentProps<"button">, "children" | "className" | "onClick">;
  className?: string;
}

// ── Public API ────────────────────────────
/** A row of a tree, with its disclosure chevron and hover actions. */
export function TreeRow({
  label,
  depth = 0,
  icon,
  open,
  selected,
  dirty,
  meta,
  actions,
  onClick,
  onToggle,
  onContextMenu,
  size = "md",
  buttonProps,
  className,
}: TreeRowProps) {
  const folder = open !== undefined;
  return (
    <div
      data-size={size}
      data-selected={selected || undefined}
      className={cx("iro-tree-row", className)}
      style={{ "--tree-depth": depth } as CSSProperties}
    >
      <button
        type="button"
        className="iro-tree-row-main"
        aria-expanded={folder ? open : undefined}
        aria-current={selected || undefined}
        onClick={folder ? (onToggle ?? onClick) : onClick}
        onContextMenu={onContextMenu}
        {...buttonProps}
      >
        <span className="iro-tree-row-chevron" data-open={open || undefined}>
          {folder ? <ChevronRightGlyph /> : null}
        </span>
        {icon ? <span className="iro-tree-row-icon">{icon}</span> : null}
        <span className="iro-tree-row-label">{label}</span>
        {dirty ? (
          <span className="iro-tree-row-dirty" role="img" title="Unsaved changes" aria-label="Unsaved changes" />
        ) : null}
        {meta ? <span className="iro-tree-row-meta">{meta}</span> : null}
      </button>
      {actions ? <span className="iro-tree-row-actions">{actions}</span> : null}
    </div>
  );
}
