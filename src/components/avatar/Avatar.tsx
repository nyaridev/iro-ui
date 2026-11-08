// Avatar: a profile picture, or the name's initials on a palette color while there's none (or it hasn't loaded).
// `ring` circles it in its color, so profiles are told apart at a glance. Base UI's avatar handles the loading.

// ── Dependencies ──────────────────────────
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import type { CSSProperties } from "react";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export type AvatarColor = "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "purple" | "pink";

export interface AvatarProps {
  /** Whose it is: the initials come from it, and screen readers hear it. */
  name: string;
  src?: string | null;
  /** A palette color for the initials and the ring (default blue). */
  color?: AvatarColor;
  /** Width and height in px (default 32). */
  size?: number;
  ring?: boolean;
  className?: string;
}

// ── Private helpers ───────────────────────
/** Up to two initials: "Alex Kim" → "AK". */
function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/).slice(0, 2);
  return words.map((word) => word[0]?.toUpperCase() ?? "").join("") || "?";
}

// ── Public API ────────────────────────────
/** A round avatar with an initials fallback. */
export function Avatar({ name, src, color = "blue", size = 32, ring, className }: AvatarProps) {
  return (
    <BaseAvatar.Root
      role="img"
      aria-label={name}
      data-ring={ring || undefined}
      className={cx("iro-avatar", className)}
      style={
        {
          "--avatar-size": `${size}px`,
          "--avatar-color": `var(--iro-${color})`,
          "--avatar-ink": `var(--iro-${color}-ink)`,
        } as CSSProperties
      }
    >
      {src ? <BaseAvatar.Image src={src} alt="" className="iro-avatar-image" /> : null}
      <BaseAvatar.Fallback className="iro-avatar-initials" aria-hidden="true">
        {initialsOf(name)}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
