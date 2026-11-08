// Backdrop: the effects' window background (glows, optional liquid, grain, vignette) as a React element.

// ── Dependencies ──────────────────────────
import { type ComponentProps, useLayoutEffect, useRef } from "react";
import { mountBackdrop } from "../../effects/backdrop";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface BackdropProps extends Omit<ComponentProps<"div">, "children"> {
  /** Adds the flowing WebGL background; without WebGL the glows remain. */
  liquid?: boolean;
}

// ── Public API ────────────────────────────
/** Fills its positioned parent behind the content; give the parent `isolation: isolate`. */
export function Backdrop({ liquid = false, className, ...rest }: BackdropProps) {
  const host = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => (host.current ? mountBackdrop(host.current, { liquid }) : undefined), [liquid]);
  return <div ref={host} className={cx("iro-backdrop", className)} {...rest} />;
}
