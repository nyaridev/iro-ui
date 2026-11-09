// IroRoot: picks the style, theme and accent for everything inside it, and holds its floating layers.

// ── Dependencies ──────────────────────────
import { type ComponentProps, createContext, useContext, useState } from "react";

// ── Types ─────────────────────────────────
export interface IroRootProps extends ComponentProps<"div"> {
  /** The style: `kon`, `sumi`… (its CSS must be imported). */
  styleName: string;
  /** One of the style's themes; leave it out, or name the default (`light` in kami, `dark` in sumi and kon). */
  theme?: string;
  /** One of the style's accents; leave it out for the style's default (the first in its `accents.css`). */
  accent?: string;
  /** How much things move: `full`, `smooth` (no overshoot), `reduced` (fades only) or `off`. Leave it out to follow
   *  the system's reduced-motion setting. */
  motion?: "full" | "smooth" | "reduced" | "off";
}

// ── State ─────────────────────────────────
const LayerContext = createContext<HTMLElement | null>(null);

// ── Public API ────────────────────────────
/** The element floating layers portal into: the nearest IroRoot's layer, or null outside any root. */
export function useIroLayer(): HTMLElement | null {
  return useContext(LayerContext);
}

/** Sets `data-iro-style`, `-theme`, `-accent` and `-motion` on a div, paints the style's background, and keeps popups
 *  inside. */
export function IroRoot({ styleName, theme, accent, motion, className, children, ...rest }: IroRootProps) {
  const [layer, setLayer] = useState<HTMLDivElement | null>(null);

  return (
    <div
      data-iro-style={styleName}
      data-iro-theme={theme}
      data-iro-accent={accent}
      data-iro-motion={motion}
      className={["iro-root", className].filter(Boolean).join(" ")}
      {...rest}
    >
      <LayerContext value={layer}>{children}</LayerContext>
      <div ref={setLayer} className="iro-root-layer" />
    </div>
  );
}
