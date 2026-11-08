// DropZone: an area to drop files on or click to pick them. It lights up while files are dragged over it. Drops aren't
// filtered by `accept` (only the picker is): check the files you get.

// ── Dependencies ──────────────────────────
import { type DragEvent, type ReactNode, useRef, useState } from "react";
import { cx } from "../shared/cx";
import { UploadGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface DropZoneProps {
  /** The dropped or picked files; one unless `multiple`. */
  onFiles: (files: File[]) => void;
  /** What it asks for: "Drop an image". */
  title: ReactNode;
  /** A muted line under the title: formats, sizes. */
  hint?: ReactNode;
  icon?: ReactNode;
  multiple?: boolean;
  /** The picker's filter: "image/*", ".png,.jpg". */
  accept?: string;
  /** Working on the last files: no drops or clicks until it's done. */
  disabled?: boolean;
  /** Less padding, for a side panel. */
  compact?: boolean;
  className?: string;
}

// ── Private helpers ───────────────────────
/** Whether a drag carries files (not text or a link). */
function hasFiles(event: DragEvent) {
  return Array.from(event.dataTransfer.types).includes("Files");
}

// ── Public API ────────────────────────────
/** A drop target that's also a button opening the file picker. */
export function DropZone({
  onFiles,
  title,
  hint,
  icon = <UploadGlyph />,
  multiple,
  accept,
  disabled,
  compact,
  className,
}: DropZoneProps) {
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const take = (list: FileList | null | undefined) => {
    const files = Array.from(list ?? []);
    if (files.length) onFiles(multiple ? files : files.slice(0, 1));
  };

  return (
    <button
      type="button"
      disabled={disabled}
      data-over={over || undefined}
      data-compact={compact || undefined}
      className={cx("iro-drop-zone", className)}
      onClick={() => input.current?.click()}
      onDragOver={(event) => {
        if (disabled || !hasFiles(event)) return;
        event.preventDefault();
        setOver(true);
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOver(false);
      }}
      onDrop={(event) => {
        if (disabled || !hasFiles(event)) return;
        event.preventDefault();
        setOver(false);
        take(event.dataTransfer.files);
      }}
    >
      <input
        ref={input}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        tabIndex={-1}
        onChange={(event) => {
          take(event.target.files);
          // Picking the same file again still fires a change.
          event.target.value = "";
        }}
      />
      <span className="iro-drop-zone-icon">{icon}</span>
      <span className="iro-drop-zone-title">{title}</span>
      {hint ? <span className="iro-drop-zone-hint">{hint}</span> : null}
    </button>
  );
}
