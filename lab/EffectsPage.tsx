// Effects page (ADR-0008): the backdrop with and without the liquid, and a window that opens, closes, falls into a
// black hole and bursts sparkles. The header's Motion picker turns them down the way an app's setting would.

// ── Dependencies ──────────────────────────
import { type ReactNode, useRef, useState } from "react";
import { Backdrop, Badge, Button } from "../src";
import { blackHole, burst, closeReveal, openReveal } from "../src/effects";

// ── Private helpers ───────────────────────
/** A small app window: positioned and isolated, so its backdrop sits behind the content. */
function LabWindow({ title, liquid, children }: { title: string; liquid?: boolean; children?: ReactNode }) {
  return (
    <div className="lab-window">
      <Backdrop liquid={liquid} />
      <strong className="lab-window-title">{title}</strong>
      {children}
    </div>
  );
}

// ── Public API ────────────────────────────
/** The backdrop and the window effects. */
export function EffectsPage() {
  const target = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState("open");

  const run = async (effect: (node: HTMLElement) => Promise<void>, after: string) => {
    if (!target.current) return;
    setShown("playing");
    await effect(target.current);
    setShown(after);
  };

  return (
    <section className="lab-page">
      <h2>Effects</h2>
      <p className="lab-hint">
        <code>import {"{ … }"} from "iro-ui/effects"</code>: plain functions on DOM elements, so React and Svelte apps
        share them. <code>&lt;Backdrop&gt;</code> is the React wrapper for the background.
      </p>

      <h3>backdrop</h3>
      <div className="lab-row lab-windows">
        <LabWindow title="Glows and grain">
          <span className="lab-hint">mountBackdrop(layer)</span>
        </LabWindow>
        <LabWindow title="Liquid" liquid>
          <span className="lab-hint">mountBackdrop(layer, {"{ liquid: true }"})</span>
        </LabWindow>
      </div>

      <h3>window effects</h3>
      <div className="lab-row lab-windows">
        <div ref={target} className="lab-window">
          <Backdrop />
          <strong className="lab-window-title">Workspace</strong>
          <span className="lab-hint">A window to open, close and swallow.</span>
          <div className="lab-row">
            <Badge>3 projects</Badge>
            <Badge>idle</Badge>
          </div>
        </div>
        <div className="lab-stack">
          <div className="lab-row">
            <Button onClick={() => run(openReveal, "open")}>Open</Button>
            <Button onClick={() => run(closeReveal, "closed")}>Close</Button>
            <Button onClick={() => run((node) => blackHole(node), "swallowed")}>Black hole</Button>
          </div>
          <div className="lab-row">
            <Button variant="primary" onClick={(event) => burst(event.currentTarget)}>
              Burst
            </Button>
            <span className="lab-hint">Sparkles only play in full motion.</span>
          </div>
          <p className="lab-hint">
            Window: <span data-testid="effect-state">{shown}</span>. Open brings it back; after the black hole it
            unfurls gently.
          </p>
        </div>
      </div>
    </section>
  );
}
