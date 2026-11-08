// Design Lab shell: pick a style, then see every component page in it.

// ── Dependencies ──────────────────────────
import { useState } from "react";
import { pages, styles } from "./discover";

// ── Public API ────────────────────────────
/** The Lab: a bar with the style picker over a stage that renders every page in the picked style. */
export function App() {
  const [style, setStyle] = useState(styles[0] ?? "");

  return (
    <div className="lab">
      <header className="lab-bar">
        <strong>iro-ui Design Lab</strong>
        <label>
          Style{" "}
          <select value={style} onChange={(event) => setStyle(event.target.value)}>
            {styles.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
      </header>
      <main className="lab-stage" data-iro-style={style}>
        {pages.length === 0 ? (
          <p className="lab-empty">
            No components yet. Add a <code>*.lab.tsx</code> file next to a component and it shows up here.
          </p>
        ) : (
          pages.map(({ name, Page }) => (
            <section key={name} className="lab-page">
              <h2>{name}</h2>
              <Page />
            </section>
          ))
        )}
      </main>
    </div>
  );
}
