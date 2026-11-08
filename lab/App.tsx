// Design Lab shell: pick a style, theme and accent, then see the tokens and every component page in them.

// ── Dependencies ──────────────────────────
import { useEffect, useState } from "react";
import { IroRoot } from "../src";
import { pages, styles } from "./discover";
import { TokensPage } from "./TokensPage";

// ── Constants ─────────────────────────────
/** The pickers' starting values, from the URL: `?style=sumi&theme=light&accent=steel`. */
const START = new URLSearchParams(location.search);

// ── Private helpers ───────────────────────
/** A labelled select for one of the bar's pickers. */
function Picker({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="lab-picker">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

// ── Public API ────────────────────────────
/** The Lab: a bar with the pickers over a stage that renders the Tokens page and every component page. */
export function App() {
  const [styleName, setStyleName] = useState(START.get("style") ?? styles[0]?.name ?? "");
  const [theme, setTheme] = useState(START.get("theme") ?? "default");
  const [accent, setAccent] = useState(START.get("accent") ?? "default");
  const style = styles.find(({ name }) => name === styleName);

  // The URL mirrors the pickers, so a Lab view can be linked (the screenshot tests open it this way).
  useEffect(() => {
    const query = new URLSearchParams({ style: styleName, theme, accent });
    history.replaceState(null, "", `?${query}`);
  }, [styleName, theme, accent]);

  function pickStyle(name: string) {
    setStyleName(name);
    setTheme("default");
    setAccent("default");
  }

  return (
    <div className="lab">
      <header className="lab-bar">
        <strong>iro-ui Design Lab</strong>
        <Picker label="Style" value={styleName} options={styles.map(({ name }) => name)} onChange={pickStyle} />
        <Picker label="Theme" value={theme} options={style?.themes ?? []} onChange={setTheme} />
        <Picker label="Accent" value={accent} options={style?.accents ?? []} onChange={setAccent} />
      </header>
      <IroRoot
        className="lab-stage"
        styleName={styleName}
        theme={theme === "default" ? undefined : theme}
        accent={accent === "default" ? undefined : accent}
      >
        <TokensPage />
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
      </IroRoot>
    </div>
  );
}
