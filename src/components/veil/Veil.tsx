// Veil: blurs sensitive content (an NSFW image) until it's clicked. While veiled, the first click only reveals; it
// never reaches what's underneath. Turning `active` off and on again veils it again.

// ── Dependencies ──────────────────────────
import { type ReactNode, type SyntheticEvent, useState } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface VeilProps {
  /** Blur the content (until it's revealed). */
  active: boolean;
  children: ReactNode;
  /** The tag on the veil (default "NSFW"). */
  label?: string;
  /** Only the tag, without "Click to reveal": for small tiles. */
  compact?: boolean;
  /** When it's clicked open: a carousel can remember which images were revealed. */
  onReveal?: () => void;
  className?: string;
}

// ── Public API ────────────────────────────
/** Content that stays blurred until clicked. */
export function Veil({ active, children, label = "NSFW", compact, onReveal, className }: VeilProps) {
  const [revealed, setRevealed] = useState(false);
  const [wasActive, setWasActive] = useState(active);
  if (wasActive !== active) {
    setWasActive(active);
    setRevealed(false);
  }
  const veiled = active && !revealed;
  const reveal = (event: SyntheticEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setRevealed(true);
    onReveal?.();
  };

  return (
    <div data-veiled={veiled || undefined} className={cx("iro-veil", className)}>
      <div className="iro-veil-content" aria-hidden={veiled || undefined}>
        {children}
      </div>
      {veiled ? (
        <button type="button" className="iro-veil-cover" aria-label={`${label}: click to reveal`} onClick={reveal}>
          <span className="iro-veil-tag">{label}</span>
          {compact ? null : <span className="iro-veil-hint">Click to reveal</span>}
        </button>
      ) : null}
    </div>
  );
}
