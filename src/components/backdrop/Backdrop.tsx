// Backdrop: the effects' window background (glows, the optional layers, grain, vignette) as a React element. Setting
// changes apply while it runs; switching a layer on or off rebuilds it.

// ── Dependencies ──────────────────────────
import { type ComponentProps, useLayoutEffect, useRef } from "react";
import { mountBackdrop, updateBackdrop } from "../../effects/backdrop/backdrop";
import type { BackdropOptions } from "../../effects/options";
import { cx } from "../shared/cx";

// ── Types ─────────────────────────────────
export interface BackdropProps extends Omit<ComponentProps<"div">, "children">, BackdropOptions {}

// ── Public API ────────────────────────────
/** Fills its positioned parent behind the content; give the parent `isolation: isolate`. Each layer prop is `true`
 *  or that layer's settings (`dust={{ count: 2 }}`). */
export function Backdrop({
  liquid,
  aurora,
  mesh,
  spotlight,
  grid,
  paper,
  dust,
  contours,
  ink,
  className,
  ...rest
}: BackdropProps) {
  const host = useRef<HTMLDivElement>(null);
  // The settings as text: objects written inline are new every render, but only a real change should reach the shader.
  const settings = JSON.stringify({ liquid, aurora, mesh, spotlight, grid, paper, dust, contours, ink });
  const first = useRef(settings);

  useLayoutEffect(() => {
    const element = host.current;
    return element ? mountBackdrop(element, JSON.parse(first.current)) : undefined;
  }, []);
  useLayoutEffect(() => {
    if (host.current) updateBackdrop(host.current, JSON.parse(settings));
  }, [settings]);

  return <div ref={host} className={cx("iro-backdrop", className)} {...rest} />;
}
