// WindowDrop: files dragged anywhere over the window show a full-window overlay, and dropping them anywhere hands
// them to `onFiles` (PrepKit's "drop files on the window"). Desktop shells that report drags themselves (Tauri gives
// paths, not Files) set `open` instead and handle the drop.

// ── Dependencies ──────────────────────────
import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useIroLayer } from "../../root/IroRoot";
import { UploadGlyph } from "../shared/glyphs";

// ── Types ─────────────────────────────────
export interface WindowDropProps {
  /** The dropped files. Leave it out to use `open` only. */
  onFiles?: (files: File[]) => void;
  /** Shows the overlay whatever the browser says; for drags the app tracks itself. */
  open?: boolean;
  title?: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  /** Ignore drags for now (a job is running). */
  disabled?: boolean;
}

// ── Private helpers ───────────────────────
/** Whether a drag carries files (not text or a link). */
function hasFiles(event: DragEvent) {
  return Array.from(event.dataTransfer?.types ?? []).includes("Files");
}

// ── Public API ────────────────────────────
/** A full-window drop overlay; mount it once, inside the root. */
export function WindowDrop({
  onFiles,
  open,
  title = "Drop to add",
  hint,
  icon = <UploadGlyph />,
  disabled,
}: WindowDropProps) {
  const layer = useIroLayer();
  const [dragging, setDragging] = useState(false);
  // dragenter and dragleave fire for every element crossed, so count them.
  const depth = useRef(0);
  const latest = useRef(onFiles);
  latest.current = onFiles;

  useEffect(() => {
    if (disabled || !latest.current) return;
    const enter = (event: DragEvent) => {
      if (!hasFiles(event)) return;
      depth.current += 1;
      setDragging(true);
    };
    const leave = (event: DragEvent) => {
      if (!hasFiles(event)) return;
      depth.current = Math.max(0, depth.current - 1);
      if (depth.current === 0) setDragging(false);
    };
    const over = (event: DragEvent) => {
      if (hasFiles(event)) event.preventDefault();
    };
    const drop = (event: DragEvent) => {
      if (!hasFiles(event)) return;
      event.preventDefault();
      depth.current = 0;
      setDragging(false);
      const files = Array.from(event.dataTransfer?.files ?? []);
      if (files.length) latest.current?.(files);
    };
    window.addEventListener("dragenter", enter);
    window.addEventListener("dragleave", leave);
    window.addEventListener("dragover", over);
    window.addEventListener("drop", drop);
    return () => {
      window.removeEventListener("dragenter", enter);
      window.removeEventListener("dragleave", leave);
      window.removeEventListener("dragover", over);
      window.removeEventListener("drop", drop);
      depth.current = 0;
      setDragging(false);
    };
  }, [disabled]);

  if (!(open ?? (dragging && !disabled))) return null;
  const overlay = (
    <div className="iro-window-drop" aria-live="polite">
      <div className="iro-window-drop-card" data-iro-animate="pop">
        <span className="iro-window-drop-icon">{icon}</span>
        <strong className="iro-window-drop-title">{title}</strong>
        {hint ? <span className="iro-window-drop-hint">{hint}</span> : null}
      </div>
    </div>
  );
  return layer ? createPortal(overlay, layer) : overlay;
}
