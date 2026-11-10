// Motion measures (ADR-0014, ADR-0007): running animations last a motion token, nothing moves under reduced motion,
// what an animation leaves behind matches the same state without motion, hover, press and focus don't shift layout,
// and closed overlays leave. Each runs in the page on `iroUi`.

// ── Dependencies ──────────────────────────
import type { RawFinding } from "./page";

// ── Types ─────────────────────────────────
/** A layout box: page offsets, which ignore transforms, so a hover scale isn't a shift. */
type Layout = [left: number, top: number, width: number, height: number];

declare global {
  // The shift check's targets and their boxes before each action, kept between its steps.
  var iroShift:
    | { targets: HTMLElement[]; before: Map<HTMLElement, Layout>; layout: (node: HTMLElement) => Layout }
    | undefined;
}

// ── Public API ────────────────────────────
/** `motion.timing`: every finite animation or transition running in the checked area lasts one of its element's
 *  duration tokens. Loops (spinners, pulses) keep their own timing. */
export function timings(): RawFinding[] {
  const out: RawFinding[] = [];
  const ms = (value: string) =>
    value.trim().endsWith("ms") ? Number.parseFloat(value) : Number.parseFloat(value) * 1000;
  for (const animation of document.getAnimations()) {
    const effect = animation.effect as KeyframeEffect | null;
    const target = effect?.target;
    if (!effect || !target || !iroUi.root().contains(target)) continue;
    const timing = effect.getTiming();
    if (timing.iterations === Number.POSITIVE_INFINITY || !Number(timing.duration)) continue;
    const style = getComputedStyle(target);
    // A transition reversed midway runs shorter than declared; the declared duration is the one to check.
    let duration = Number(timing.duration);
    if (animation instanceof CSSTransition) {
      const names = style.transitionProperty.split(",").map((name) => name.trim());
      const at = names.indexOf(animation.transitionProperty);
      const declared = style.transitionDuration.split(",")[at === -1 ? names.indexOf("all") : at];
      if (declared) duration = ms(declared);
    }
    const tokens = ["--iro-dur-fast", "--iro-dur", "--iro-dur-slow"].map((name) => ms(style.getPropertyValue(name)));
    if (tokens.some((token) => Math.abs(token - duration) < 1)) continue;
    const name =
      animation instanceof CSSAnimation
        ? animation.animationName
        : animation instanceof CSSTransition
          ? `transition of ${animation.transitionProperty}`
          : "a script animation";
    out.push(
      iroUi.finding(
        "motion.timing",
        target,
        `${name} lasts ${duration} ms; the duration tokens are ${tokens.join(", ")} ms`,
      ),
    );
  }
  return out;
}

/** `motion.reduced`: under reduced motion, nothing that animates changes place, size or transform: sampled twice,
 *  60 ms apart. */
export async function movement(): Promise<RawFinding[]> {
  const targets = [
    ...new Set(
      document
        .getAnimations()
        .map((animation) => (animation.effect as KeyframeEffect | null)?.target)
        .filter((target): target is Element => !!target && iroUi.root().contains(target)),
    ),
  ];
  const sample = (node: Element) => {
    const box = node.getBoundingClientRect();
    // An identity matrix is no transform (WebKit reports `scale(1)` that way while it transitions).
    const transform = getComputedStyle(node).transform;
    const moved = transform !== "none" && !new DOMMatrixReadOnly(transform).isIdentity ? transform : "none";
    return `${Math.round(box.left)},${Math.round(box.top)} ${Math.round(box.width)}×${Math.round(box.height)} ${moved}`;
  };
  const first = targets.map(sample);
  await new Promise((done) => setTimeout(done, 60));
  return targets.flatMap((target, index) => {
    // Gone by now (a tooltip the next click dismissed): it left, it didn't move.
    if (!target.isConnected) return [];
    const now = sample(target);
    return now === first[index]
      ? []
      : [
          iroUi.finding(
            "motion.reduced",
            target,
            `moves under reduced motion (${first[index]} to ${now}); it should only fade`,
          ),
        ];
  });
}

/** `motion.settled`: once animations end, everything sits where it does with motion off (an overlay's contents
 *  while one is open, the page otherwise). */
export async function settled(): Promise<RawFinding[]> {
  const root = iroUi.root();
  const scope = iroUi.overlay() ?? root;
  // Two frames first: Base UI drops the starting style a frame after opening, and only then does the transition start.
  await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
  const finite = document
    .getAnimations()
    .filter(
      (animation) => (animation.effect as KeyframeEffect | null)?.getTiming().iterations !== Number.POSITIVE_INFINITY,
    );
  await Promise.race([
    Promise.all(finite.map((animation) => animation.finished.catch(() => undefined))),
    new Promise((done) => setTimeout(done, 1500)),
  ]);
  // Loops (spinners) never settle; they and what's inside them are left out.
  const looping = document
    .getAnimations()
    .filter(
      (animation) => (animation.effect as KeyframeEffect | null)?.getTiming().iterations === Number.POSITIVE_INFINITY,
    )
    .map((animation) => (animation.effect as KeyframeEffect | null)?.target)
    .filter((target): target is Element => !!target);
  const look = () =>
    new Map(
      iroUi
        .shown()
        .filter((node) => scope.contains(node) && !looping.some((loop) => loop.contains(node)))
        .map((node) => {
          const box = node.getBoundingClientRect();
          const opacity = Number(getComputedStyle(node).opacity).toFixed(2);
          return [
            node,
            `${Math.round(box.left)},${Math.round(box.top)} ${Math.round(box.width)}×${Math.round(box.height)} opacity ${opacity}`,
          ];
        }),
    );
  const moving = look();
  const mode = root.getAttribute("data-iro-motion");
  root.setAttribute("data-iro-motion", "off");
  const still = look();
  if (mode === null) root.removeAttribute("data-iro-motion");
  else root.setAttribute("data-iro-motion", mode);
  const out: RawFinding[] = [];
  for (const [node, after] of moving) {
    const off = still.get(node);
    if (off !== undefined && off !== after)
      out.push(iroUi.finding("motion.settled", node, `ends at ${after}, but sits at ${off} with motion off`));
  }
  return out;
}

/** `motion.exit`: a closed overlay leaves: nothing of it shows in the layer once it has had time to animate out (Base
 *  UI may keep a closed list mounted but hidden). A tooltip that focus brings back to the trigger and toasts (they
 *  leave on their own time) aren't the overlay. */
export function leftovers(): RawFinding[] {
  const layer = iroUi.root().querySelector(".iro-root-layer");
  const OTHERS = ".iro-tooltip, .iro-toaster, .iro-toast";
  const shown = iroUi.shown();
  return [...(layer?.children ?? [])]
    .filter((node) => !node.matches(OTHERS) && !node.querySelector(OTHERS))
    .flatMap((node) => shown.find((visible) => node.contains(visible)) ?? [])
    .map((node) =>
      iroUi.finding(
        "motion.exit",
        node,
        `stays after its overlay closed (opacity ${getComputedStyle(node).opacity}, ${[...node.attributes].map((attribute) => attribute.name).join(" ")})`,
      ),
    );
}

/** Shift check, step 1: finds what can be hovered, pressed and focused (an open overlay's contents, or the page);
 *  returns how many. */
export function shiftTargets(): number {
  const root = iroUi.root();
  const scope = iroUi.overlay() ?? root;
  const CONTROL =
    "button, a[href], [role='button'], [role='tab'], [role='menuitem'], [role='option'], [role='checkbox'], [role='switch'], [role='radio'], summary";
  const targets = iroUi
    .shown(CONTROL)
    .filter((node) => scope.contains(node) && !node.matches(":disabled, [aria-disabled='true'], [data-disabled]"));
  // Offsets summed up the offset parents, so a parent that turns positioned (Base UI does that to an open list) isn't
  // a shift either.
  const layout = (node: HTMLElement): Layout => {
    let [left, top] = [node.offsetLeft, node.offsetTop];
    for (let parent = node.offsetParent; parent instanceof HTMLElement; parent = parent.offsetParent) {
      left += parent.offsetLeft + parent.clientLeft;
      top += parent.offsetTop + parent.clientTop;
    }
    return [left, top, node.offsetWidth, node.offsetHeight];
  };
  globalThis.iroShift = { targets, before: new Map(), layout };
  return targets.length;
}

/** Shift check, step 2: brings a target into view and notes the layout around it; returns where to point, or null
 *  when something else covers it. */
export function shiftAim(index: number): { x: number; y: number } | null {
  const shift = globalThis.iroShift;
  const target = shift?.targets[index];
  if (!shift || !target?.isConnected) return null;
  target.scrollIntoView({ block: "center", inline: "center" });
  const box = target.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;
  if (!target.contains(document.elementFromPoint(x, y))) return null;
  const around = [target, target.parentElement, ...(target.parentElement?.children ?? [])];
  const before = new Map<HTMLElement, Layout>();
  for (const node of around) if (node instanceof HTMLElement) before.set(node, shift.layout(node));
  shift.before = before;
  return { x, y };
}

/** Shift check, step 3: after the walker hovers or presses (or this focuses) the target, waits for its transitions
 *  and reports whatever around it changed size or place. */
export async function shiftCheck([index, action]: [number, "hover" | "press" | "focus"]): Promise<RawFinding[]> {
  const shift = globalThis.iroShift;
  const target = shift?.targets[index];
  if (!shift || !target?.isConnected) return [];
  // Focus goes back where it was afterwards, so an open list still hears the walker's Escape.
  const back = document.activeElement;
  if (action === "focus") target.focus({ preventScroll: true });
  const running = target.getAnimations({ subtree: true }).map((animation) => animation.finished.catch(() => undefined));
  await Promise.race([Promise.all(running), new Promise((done) => setTimeout(done, 600))]);
  const moved = [...shift.before].filter(
    ([node, layout]) => node.isConnected && shift.layout(node).some((value, index) => value !== layout[index]),
  );
  if (action === "focus" && back instanceof HTMLElement && back !== document.body) back.focus({ preventScroll: true });
  else if (action === "focus") target.blur();
  if (moved.length === 0) return [];
  const [[node]] = moved;
  const [left, top, width, height] = shift.before.get(node) ?? [0, 0, 0, 0];
  const [newLeft, newTop, newWidth, newHeight] = shift.layout(node);
  const what = node === target ? "it" : node === target.parentElement ? "its parent" : "a neighbour";
  return [
    iroUi.finding(
      `motion.shift`,
      target,
      `${action} changes the layout: ${what} goes from ${width}×${height} at ${left},${top} to ${newWidth}×${newHeight} at ${newLeft},${newTop}`,
    ),
  ];
}
