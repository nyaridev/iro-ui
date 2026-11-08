// Base page: what every root gets from base.css: scrollbars (plain and quiet), the selection color and the focus ring.

// ── Constants ─────────────────────────────
const LINES = Array.from(
  { length: 24 },
  (_, index) => `Line ${index + 1}: the quick brown fox jumps over the lazy dog`,
);

// ── Private helpers ───────────────────────
/** A small scroll area with more lines than fit, scrolling both ways. */
function ScrollBox({ quiet }: { quiet?: boolean }) {
  return (
    <div className="lab-scroll" data-iro-scroll={quiet ? "quiet" : undefined}>
      {LINES.map((line) => (
        <p key={line}>
          {line}. {line}.
        </p>
      ))}
    </div>
  );
}

// ── Public API ────────────────────────────
/** Scrollbars, selection and focus ring, in the picked look. */
export function BasePage() {
  return (
    <section className="lab-page">
      <h2>Base</h2>

      <h3>scrollbars</h3>
      <div className="lab-row" style={{ alignItems: "flex-start" }}>
        <figure className="lab-token">
          <ScrollBox />
          <figcaption>
            <code>default</code>
            <small>Point at the area to see the thumb in every style; point at the thumb to grab it.</small>
          </figcaption>
        </figure>
        <figure className="lab-token">
          <ScrollBox quiet />
          <figcaption>
            <code>data-iro-scroll="quiet"</code>
            <small>The thumb hides until the pointer is over the area.</small>
          </figcaption>
        </figure>
      </div>

      <h3>selection and focus</h3>
      <div className="lab-stack">
        <p>Select some of this text to see the selection color.</p>
        <div className="lab-row">
          <button type="button">A plain button</button>
          <a href="#focus">A plain link</a>
          <input aria-label="A plain input" placeholder="A plain input" />
        </div>
        <p className="lab-hint">Press Tab to move the focus ring across these unstyled elements.</p>
      </div>
    </section>
  );
}
