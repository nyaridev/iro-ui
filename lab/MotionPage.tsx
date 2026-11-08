// Motion page: every shared animation (`data-iro-animate`), a staggered list and the hover shine, each with a replay
// button. The header's Motion picker turns them down the way an app's setting would.

// ── Dependencies ──────────────────────────
import { type CSSProperties, type ReactNode, useState } from "react";
import { Button } from "../src";

// ── Constants ─────────────────────────────
const ANIMATIONS = [
  { name: "pop", about: "Arrivals: popovers, cards, toasts" },
  { name: "reward", about: "Something good happened: a bigger bounce" },
  { name: "fade-up", about: "Large surfaces and views" },
  { name: "vanish", about: "Leaving: quick, never bouncy; remove the element after it" },
  { name: "flash", about: "Something new behind the current view" },
  { name: "pulse", about: "Skeleton placeholders, after 300 ms" },
] as const;
const ITEMS = ["Sync", "Build", "Lint", "Test", "Pack", "Ship"];

// ── Private helpers ───────────────────────
/** A demo with a replay button; replaying remounts the demo so its animation starts over. */
function Demo({ name, about, children }: { name: string; about: string; children: ReactNode }) {
  const [round, setRound] = useState(0);
  return (
    <figure className="lab-token lab-motion">
      <div key={round} className="lab-motion-stage">
        {children}
      </div>
      <figcaption>
        <code>{name}</code>
        <small>{about}</small>
      </figcaption>
      <Button size="sm" variant="ghost" onClick={() => setRound(round + 1)}>
        Replay
      </Button>
    </figure>
  );
}

// ── Public API ────────────────────────────
/** The shared animations, the stagger and the shine. */
export function MotionPage() {
  return (
    <section className="lab-page">
      <h2>Motion</h2>

      <h3>animations</h3>
      <div className="lab-grid lab-motion-grid">
        {ANIMATIONS.map(({ name, about }) => (
          <Demo key={name} name={`data-iro-animate="${name}"`} about={about}>
            <div className="lab-card" data-iro-animate={name}>
              {name}
            </div>
          </Demo>
        ))}
      </div>

      <h3>stagger and shine</h3>
      <div className="lab-grid lab-motion-grid">
        <Demo name="--iro-index" about="Each item waits its place times the style's stagger">
          <div className="lab-row">
            {ITEMS.map((item, index) => (
              <span
                key={item}
                className="lab-chip"
                data-iro-animate="pop"
                style={{ "--iro-index": index } as CSSProperties}
              >
                {item}
              </span>
            ))}
          </div>
        </Demo>
        <Demo name="data-iro-shine" about="A light sweeps across on hover">
          <div className="lab-card" data-iro-shine>
            Point at me
          </div>
        </Demo>
      </div>
    </section>
  );
}
