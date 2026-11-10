// Keeping an effect inside the viewport: how far an element may scale while it's clipped to a circle and turned, so
// nothing it turns or pushes past the edge gets cut off (in UmeSync, by the window's own edge).

/** Measures `node` once, for an effect about to play on it. The function it returns gives the largest scale (at
 * most 1) that keeps `node` inside the viewport with `margin` to spare, clipped to a circle of `radius` around its
 * center (in its own, unscaled pixels) and turned by `angle` radians about its center. */
export function fitter(node: HTMLElement): (angle: number, radius: number, margin: number) => number {
  // Layout size: the effect's own transform doesn't change it.
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  // Turning and scaling about the center leave the center where it is.
  const rect = node.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const halfX = Math.min(cx, innerWidth - cx);
  const halfY = Math.min(cy, innerHeight - cy);

  return (angle, radius, margin) => {
    const cos = Math.abs(Math.cos(angle));
    const sin = Math.abs(Math.sin(angle));
    const reachX = Math.min((width / 2) * cos + (height / 2) * sin, radius);
    const reachY = Math.min((width / 2) * sin + (height / 2) * cos, radius);
    return Math.max(0, Math.min(1, (halfX - margin) / Math.max(1, reachX), (halfY - margin) / Math.max(1, reachY)));
  };
}
