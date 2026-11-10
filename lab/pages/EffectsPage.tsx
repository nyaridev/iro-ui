// Effects page (ADR-0008, ADR-0016): the backdrop with each of its layers, a tuner for any layer's settings, and a
// window to close and open with any pair of window effects and to play feedback on for what happened. The header's
// Motion picker turns them down the way an app's setting would.

// ── Dependencies ──────────────────────────
import { type ReactNode, useRef, useState } from "react";
import { Backdrop, type BackdropProps, Badge, Button, Field, Select, Slider, Switch } from "../../src";
import {
  bounce,
  closeBlackHole,
  closeBurn,
  closeCrt,
  closeFold,
  closeGenie,
  closeInkBleed,
  closeReveal,
  closeRipple,
  closeShatter,
  type EffectOptions,
  flash,
  type GenieOptions,
  heartbeat,
  openBlackHole,
  openBurn,
  openCrt,
  openFold,
  openGenie,
  openInkBleed,
  openReveal,
  openRipple,
  openShatter,
  pulse,
  shake,
  success,
  tap,
  wiggle,
} from "../../src/effects";
import type { Setting } from "../../src/effects/backdrop/glsl/layer";
import { LAYER_NAMES, LAYER_SETTINGS, type LayerName } from "../../src/effects/backdrop/layers";

// ── Constants ─────────────────────────────
type Tunable = LayerName | "liquid";
const TUNABLE: Tunable[] = ["liquid", ...LAYER_NAMES];
const LIQUID: Record<string, Setting> = { speed: [1, 0, 4], intensity: [1, 0, 2] };
/** Settings that only take whole numbers. */
const WHOLE = new Set(["curtains", "gap", "reach"]);

/** Feedback on the window, for what happened to it. */
const FEEDBACK: { label: string; name: string; play: (node: HTMLElement, options: EffectOptions) => unknown }[] = [
  { label: "Error", name: "shake", play: shake },
  { label: "Attention", name: "pulse", play: pulse },
  { label: "Changed", name: "flash", play: flash },
  { label: "Saved", name: "success", play: success },
  { label: "New", name: "bounce", play: bounce },
  { label: "Hint", name: "wiggle", play: wiggle },
  { label: "Liked", name: "heartbeat", play: heartbeat },
  { label: "Pressed", name: "tap", play: tap },
];

type WindowEffect = (node: HTMLElement, options: GenieOptions) => Promise<void>;
/** Every window effect, as its close and its open; the genie pours into the dock. */
const WINDOW_EFFECTS: { name: string; close: WindowEffect; open: WindowEffect; target?: boolean }[] = [
  { name: "Reveal", close: closeReveal, open: openReveal },
  { name: "BlackHole", close: closeBlackHole, open: openBlackHole },
  { name: "Crt", close: closeCrt, open: openCrt },
  { name: "Genie", close: closeGenie, open: openGenie, target: true },
  { name: "Burn", close: closeBurn, open: openBurn },
  { name: "Shatter", close: closeShatter, open: openShatter },
  { name: "Ripple", close: closeRipple, open: openRipple },
  { name: "InkBleed", close: closeInkBleed, open: openInkBleed },
  { name: "Fold", close: closeFold, open: openFold },
];

// ── Private helpers ───────────────────────
/** A small app window: positioned and isolated, so its backdrop sits behind the content. */
function LabWindow({ title, layers, children }: { title: string; layers?: BackdropProps; children?: ReactNode }) {
  return (
    <div className="lab-window">
      <Backdrop {...layers} />
      <strong className="lab-window-title">{title}</strong>
      {children}
    </div>
  );
}

/** One layer in a larger window, with a slider for each of its settings and the prop that gives what you see. */
function Tuner() {
  const [name, setName] = useState<Tunable>("dust");
  const [values, setValues] = useState<Record<string, number>>({});
  const settings = name === "liquid" ? LIQUID : LAYER_SETTINGS[name];
  const set = (key: string, value: number) => setValues((now) => ({ ...now, [key]: value }));
  const options = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, key === "animated" ? value === 1 : value]),
  );
  const code = Object.entries(options)
    .map(([key, value]) => `${key}: ${typeof value === "number" ? Number(value.toFixed(2)) : value}`)
    .join(", ");

  return (
    <div className="lab-row lab-windows">
      <div className="lab-window lab-tuner-window">
        <Backdrop {...{ [name]: options }} />
        <strong className="lab-window-title">{name}</strong>
        <code className="lab-hint">{code ? `${name}={{ ${code} }}` : `${name}`}</code>
      </div>
      <div className="lab-stack lab-tuner">
        <Field label="Layer" data-lab-state="click">
          <Select
            options={TUNABLE.map((value) => ({ value, label: value }))}
            value={name}
            onValueChange={(next) => {
              if (!next) return;
              setName(next);
              setValues({});
            }}
          />
        </Field>
        {Object.entries(settings).map(([key, [fallback, min, max]]) =>
          key === "animated" ? (
            <Switch
              key={key}
              label="animated"
              checked={(values[key] ?? fallback) === 1}
              onCheckedChange={(on) => set(key, on ? 1 : 0)}
            />
          ) : (
            <Slider
              key={key}
              label={key}
              min={min}
              max={max}
              step={WHOLE.has(key) ? 1 : 0.05}
              value={values[key] ?? fallback}
              resetValue={fallback}
              format={(value) => (WHOLE.has(key) ? String(value) : value.toFixed(2))}
              onValueChange={(value) => set(key, value)}
            />
          ),
        )}
        <Button onClick={() => setValues({})}>Reset</Button>
      </div>
    </div>
  );
}

// ── Public API ────────────────────────────
/** The backdrop and the window effects. */
export function EffectsPage() {
  const target = useRef<HTMLDivElement>(null);
  const dock = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState("open");
  const [speed, setSpeed] = useState(1);

  const [code, setCode] = useState("");

  /** Plays one window effect's close or open, and shows the call. */
  const play = async ({ name, target: toDock, ...effect }: (typeof WINDOW_EFFECTS)[number], way: "close" | "open") => {
    if (!target.current) return;
    const options: GenieOptions = { speed, ...(toDock && dock.current ? { target: dock.current } : {}) };
    const given = [speed !== 1 && `speed: ${speed.toFixed(2)}`, toDock && "target: dock"].filter(Boolean).join(", ");
    setCode(`await ${way}${name}(window${given ? `, { ${given} }` : ""})`);
    setShown(way === "close" ? "closing" : "opening");
    await effect[way](target.current, options);
    setShown(target.current.dataset.iroReveal ?? "open");
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
        <LabWindow title="Liquid" layers={{ liquid: true }}>
          <span className="lab-hint">mountBackdrop(layer, {"{ liquid: true }"})</span>
        </LabWindow>
        <LabWindow title="Aurora" layers={{ aurora: true }}>
          <span className="lab-hint">{"{ aurora: true }"}</span>
        </LabWindow>
        <LabWindow title="Mesh gradient" layers={{ mesh: true }}>
          <span className="lab-hint">{"{ mesh: true }"}</span>
        </LabWindow>
        <LabWindow title="Spotlight" layers={{ spotlight: true }}>
          <span className="lab-hint">{"{ spotlight: true }"}: move the mouse over it.</span>
        </LabWindow>
        <LabWindow title="Dot grid" layers={{ grid: true }}>
          <span className="lab-hint">{"{ grid: true }"}: the dots light up around the mouse.</span>
        </LabWindow>
        <LabWindow title="Paper" layers={{ paper: true }}>
          <span className="lab-hint">{"{ paper: true }"}</span>
        </LabWindow>
        <LabWindow title="Dust" layers={{ dust: true }}>
          <span className="lab-hint">{"{ dust: true }"}</span>
        </LabWindow>
        <LabWindow title="Contour lines" layers={{ contours: true }}>
          <span className="lab-hint">{"{ contours: true }"}</span>
        </LabWindow>
        <LabWindow title="Ink wash" layers={{ ink: true }}>
          <span className="lab-hint">{"{ ink: true }"}</span>
        </LabWindow>
      </div>

      <h3>tune a layer</h3>
      <p className="lab-hint">
        Each layer takes settings, changed while it runs: <code>{"<Backdrop dust={{ count: 2 }} />"}</code> or{" "}
        <code>updateBackdrop(layer, options)</code>. Double-click a slider to reset it.
      </p>
      <Tuner />

      <h3>window effects</h3>
      <p className="lab-hint">
        Each closes a window, which stays hidden, or opens a hidden one: close with one and open with another.
      </p>
      <div className="lab-row lab-windows">
        <div className="lab-stack">
          {/* biome-ignore lint/a11y/useKeyWithClickEvents lint/a11y/noStaticElementInteractions: a pointer-only demo; the Ripple buttons play it from the keyboard. */}
          <div
            ref={target}
            className="lab-window"
            onClick={(event) => {
              if (!target.current || target.current.dataset.iroReveal === "closing") return;
              setCode(`await closeRipple(window, { from: { x: event.clientX, y: event.clientY } })`);
              setShown("closing");
              closeRipple(target.current, { speed, from: { x: event.clientX, y: event.clientY } }).then(() =>
                setShown(target.current?.dataset.iroReveal ?? "open"),
              );
            }}
          >
            <Backdrop />
            <strong className="lab-window-title">Workspace</strong>
            <span className="lab-hint">Click it to ripple it away from where you click.</span>
            <div className="lab-row">
              <Badge>3 projects</Badge>
              <Badge>idle</Badge>
            </div>
          </div>
          <div className="lab-dock">
            <Button ref={dock} size="sm">
              Dock
            </Button>
          </div>
        </div>
        <div className="lab-stack lab-effect-controls">
          {(["close", "open"] as const).map((way) => (
            <div key={way} className="lab-stack">
              <span className="lab-effect-label">{way === "close" ? "Close with" : "Open with"}</span>
              <div className="lab-row">
                {WINDOW_EFFECTS.map((effect) => (
                  <Button key={effect.name} size="sm" onClick={() => play(effect, way)}>
                    {effect.name.replace(/(?<=.)([A-Z])/g, " $1").replace("Crt", "CRT")}
                  </Button>
                ))}
              </div>
            </div>
          ))}
          <Slider
            label="speed"
            min={0.25}
            max={4}
            step={0.05}
            value={speed}
            resetValue={1}
            format={(value) => value.toFixed(2)}
            onValueChange={setSpeed}
          />
          <span className="lab-effect-label">Feedback, by what happened</span>
          <div className="lab-row">
            {FEEDBACK.map(({ label, name, play: run }) => (
              <Button
                key={label}
                size="sm"
                onClick={() => {
                  if (!target.current) return;
                  setCode(`${name}(window)`);
                  run(target.current, { speed });
                }}
              >
                {label}
              </Button>
            ))}
          </div>
          <p className="lab-hint">
            Window: <span data-testid="effect-state">{shown}</span>
            {code && (
              <>
                {" "}
                · <code>{code}</code>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
