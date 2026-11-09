// Icon: draws one icon from iro-ui/icons in both drawings; the style's tokens show the right one (ADR-0009).

// ── Dependencies ──────────────────────────
import { type ComponentProps, useId } from "react";
import { type IconData, iconMarkup } from "../../icons/icon";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface IconProps extends Omit<ComponentProps<"svg">, "children"> {
  /** The icon, from `iro-ui/icons`: `<Icon icon={FolderIcon} />`. */
  icon: IconData;
  /** Width and height: pixels, or any CSS length (`"1em"` follows the text). Default 16. */
  size?: number | string;
  /** Names the icon for screen readers; left out, the icon is decoration and hidden from them. */
  label?: string;
}

// ── Public API ────────────────────────────
/** An icon in the style's look: line drawings in kon, solid ones in sumi. */
export function Icon({ icon, size = 16, label, className, ...rest }: IconProps) {
  // Mask ids must be unique on the page; React's ids hold colons, which url(#…) doesn't accept.
  const { line, solid } = iconMarkup(icon, `iro-icon-${useId().replace(/:/g, "")}`);
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cx("iro-icon", className)}
      data-icon={icon.name}
      {...rest}
    >
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: iro-ui's own icon markup, never user input. */}
      <g className="iro-icon-line" dangerouslySetInnerHTML={{ __html: line }} />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: iro-ui's own icon markup, never user input. */}
      <g className="iro-icon-solid" dangerouslySetInnerHTML={{ __html: solid }} />
    </svg>
  );
}
