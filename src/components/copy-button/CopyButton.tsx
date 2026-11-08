// CopyButton: an icon button that copies text and shows a check for a moment.

// ── Dependencies ──────────────────────────
import { useEffect, useState } from "react";
import { IconButton } from "../icon-button/IconButton";
import { cx } from "../shared/cx";
import { CheckGlyph, CopyGlyph } from "../shared/glyphs";

// ── Constants ─────────────────────────────
const COPIED_MS = 1200;

// ── Types ─────────────────────────────────
export interface CopyButtonProps {
  text: string;
  /** What it copies, as its name and tooltip (default "Copy"). */
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

// ── Public API ────────────────────────────
/** Copies `text` to the clipboard; the click doesn't reach the row or card it sits in. */
export function CopyButton({ text, label = "Copy", size = "sm", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPIED_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <IconButton
      icon={copied ? <CheckGlyph /> : <CopyGlyph />}
      label={copied ? "Copied" : label}
      size={size}
      data-copied={copied || undefined}
      className={cx("iro-copy-button", className)}
      onClick={(event) => {
        event.stopPropagation();
        navigator.clipboard.writeText(text).then(
          () => setCopied(true),
          // The browser refused (no permission, not a secure page): there's nothing useful to show.
          () => {},
        );
      }}
    />
  );
}
