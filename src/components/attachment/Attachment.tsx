// Attachment: a file added to a message or a prompt: its picture or a file icon, its name, kind and size, and a ×
// to take it off. While it uploads a ring shows the progress; when it fails it turns red and says so.

// ── Dependencies ──────────────────────────
import type { ReactNode } from "react";
import { FileIcon } from "../../icons/set/files";
import { Icon } from "../icon/Icon";
import { IconButton } from "../icon-button/IconButton";
import { ProgressRing } from "../progress-ring/ProgressRing";
import { cx } from "../shared/cx";
import { CloseGlyph } from "../shared/glyphs";
import { formatBytes } from "./bytes";

// ── Types ─────────────────────────────────
export interface AttachmentProps {
  name: string;
  /** In bytes; shown as "3.2 MB". */
  size?: number;
  /** A short kind: "PDF", "PNG". */
  kind?: string;
  /** An image to show in place of the icon. */
  preview?: string;
  /** In place of the file icon. */
  icon?: ReactNode;
  /** `uploading` (with `progress`, 0–1) or `error`. */
  status?: "uploading" | "error";
  progress?: number;
  /** Adds a × that calls this. */
  onRemove?: () => void;
  /** Accessible name of the × (default "Remove <name>"). */
  removeLabel?: string;
  className?: string;
}

// ── Public API ────────────────────────────
/** A file chip with a preview, name and size. */
export function Attachment({
  name,
  size,
  kind,
  preview,
  icon,
  status,
  progress = 0,
  onRemove,
  removeLabel,
  className,
}: AttachmentProps) {
  const meta =
    status === "error"
      ? "Upload failed"
      : [kind, size !== undefined ? formatBytes(size) : ""].filter(Boolean).join(" · ");
  return (
    <div data-status={status} className={cx("iro-attachment", className)}>
      <span className="iro-attachment-thumb">
        {preview ? <img src={preview} alt="" /> : (icon ?? <Icon icon={FileIcon} />)}
        {status === "uploading" ? (
          <span className="iro-attachment-progress">
            <ProgressRing value={progress} size={22} label={`Uploading ${name}`} />
          </span>
        ) : null}
      </span>
      <span className="iro-attachment-text">
        <span className="iro-attachment-name" title={name}>
          {name}
        </span>
        {meta ? <span className="iro-attachment-meta">{meta}</span> : null}
      </span>
      {onRemove ? (
        <IconButton
          size="sm"
          icon={<CloseGlyph />}
          label={removeLabel ?? `Remove ${name}`}
          tooltip={false}
          onClick={onRemove}
          className="iro-attachment-remove"
        />
      ) : null}
    </div>
  );
}
