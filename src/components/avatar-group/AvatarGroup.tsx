// AvatarGroup: a row of overlapping avatars, each ringed in the surface color, ending in "+3" for the people past
// `max`. Hovering the count lists their names; screen readers hear every name.

// ── Dependencies ──────────────────────────
import type { ComponentProps, CSSProperties } from "react";
import { Avatar, type AvatarColor } from "../avatar/Avatar";
import { cx } from "../shared/cx";
import { Tooltip } from "../tooltip/Tooltip";

// ── Types ─────────────────────────────────
export interface AvatarGroupPerson {
  name: string;
  src?: string | null;
  color?: AvatarColor;
}

export interface AvatarGroupProps extends Omit<ComponentProps<"div">, "children"> {
  people: AvatarGroupPerson[];
  /** How many avatars show before the count (default 4). */
  max?: number;
  /** Width and height of each, in px (default 28). */
  size?: number;
  /** Names the group for screen readers (default: everyone's names). */
  label?: string;
}

// ── Public API ────────────────────────────
/** Overlapping avatars with a "+N" count for the rest. */
export function AvatarGroup({ people, max = 4, size = 28, label, className, style, ...rest }: AvatarGroupProps) {
  // Show the count only when it hides two or more; hiding one would take the same room as showing it.
  const shown = people.length > max + 1 ? people.slice(0, max) : people;
  const hidden = people.slice(shown.length);
  const names = people.map(({ name }) => name).join(", ");

  return (
    // biome-ignore lint/a11y/useSemanticElements: a fieldset groups form controls; this groups pictures.
    <div
      role="group"
      aria-label={label ?? names}
      className={cx("iro-avatar-group", className)}
      style={{ "--avatar-size": `${size}px`, ...style } as CSSProperties}
      {...rest}
    >
      {shown.map((person) => (
        <Avatar key={person.name} name={person.name} src={person.src} color={person.color} size={size} />
      ))}
      {hidden.length > 0 ? (
        <Tooltip content={hidden.map(({ name }) => name).join(", ")}>
          <span className="iro-avatar-group-more" role="img" aria-label={`${hidden.length} more`}>
            +{hidden.length}
          </span>
        </Tooltip>
      ) : null}
    </div>
  );
}
