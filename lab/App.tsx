// Design Lab shell: a header with the style, theme, accent and motion pickers, the page list in a sidebar that can be
// hidden, and the picked page beside it. Only the page scrolls. All of it is drawn in the picked look.

// ── Dependencies ──────────────────────────
import { type ComponentType, useEffect, useRef, useState } from "react";
import { version } from "../package.json";
import { Badge, IconButton, IroRoot, type IroRootProps, Select } from "../src";
import { BasePage } from "./BasePage";
import { pages, styles } from "./discover";
import { EffectsPage } from "./EffectsPage";
import { MotionPage } from "./MotionPage";
import { Sidebar } from "./Sidebar";
import { TokensPage } from "./TokensPage";

// ── Constants ─────────────────────────────
/** The starting view, from the URL: `?style=sumi&theme=light&accent=steel&motion=reduced&page=Button`. */
const START = new URLSearchParams(location.search);
const TOKENS = "Tokens";
/** The style the Lab opens in when the URL names none. */
const DEFAULT_STYLE = "sumi";
/** The Lab's own pages, before the component pages in the bar. */
const LAB_PAGES: Record<string, ComponentType> = {
  [TOKENS]: TokensPage,
  Base: BasePage,
  Motion: MotionPage,
  Effects: EffectsPage,
};
/** The Style picker's list: the default style first, then the rest as found. */
const STYLE_NAMES = styles
  .map(({ name }) => name)
  .sort((a, b) => Number(b === DEFAULT_STYLE) - Number(a === DEFAULT_STYLE));
/** `system` leaves the root's motion out, so it follows the OS setting. */
const MOTIONS = ["system", "full", "smooth", "reduced", "off"];
/** Below this width the sidebar floats over the page (matches lab.css). */
const NARROW = "(max-width: 900px)";
const NAV_KEY = "iro-lab-nav";

// ── Private helpers ───────────────────────
/** Whether the sidebar starts open: closed on narrow windows, otherwise as this browser last left it. */
function navStartsOpen(): boolean {
  if (matchMedia(NARROW).matches) return false;
  try {
    return localStorage.getItem(NAV_KEY) !== "closed";
  } catch {
    return true;
  }
}

const SidebarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <rect x="3.5" y="4.5" width="17" height="15" rx="3" />
    <path d="M9.5 4.5v15" />
  </svg>
);

/** A labelled Select for one of the header's pickers. */
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
    <div className="lab-picker">
      <span aria-hidden="true">{label}</span>
      <Select
        size="sm"
        aria-label={label}
        openLabel={`Show ${label.toLowerCase()}s`}
        value={value}
        options={options.map((option) => ({ value: option, label: option }))}
        onValueChange={(next) => next && onChange(next)}
      />
    </div>
  );
}

// ── Public API ────────────────────────────
/** The Lab: header, sidebar and the picked page, inside one IroRoot so the frame follows the look too. */
export function App() {
  const [styleName, setStyleName] = useState(
    START.get("style") ?? (styles.find(({ name }) => name === DEFAULT_STYLE) ?? styles[0])?.name ?? "",
  );
  const [theme, setTheme] = useState(START.get("theme") ?? "default");
  const [accent, setAccent] = useState(START.get("accent") ?? "default");
  const [motion, setMotion] = useState(START.get("motion") ?? "system");
  const [pageName, setPageName] = useState(START.get("page") ?? TOKENS);
  const [navOpen, setNavOpen] = useState(navStartsOpen);
  const stage = useRef<HTMLElement>(null);
  const style = styles.find(({ name }) => name === styleName);
  const page = pages.find(({ name }) => name === pageName);
  const shown = page || LAB_PAGES[pageName] ? pageName : TOKENS;
  const LabPage = LAB_PAGES[shown] ?? TokensPage;

  // The URL mirrors the view, so it can be linked (the screenshot tests open pages this way).
  useEffect(() => {
    const query = new URLSearchParams({ style: styleName, theme, accent, motion, page: shown });
    history.replaceState(null, "", `?${query}`);
  }, [styleName, theme, accent, motion, shown]);

  // Escape closes the sidebar where it floats over the page.
  useEffect(() => {
    if (!navOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && matchMedia(NARROW).matches) setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen]);

  function pickStyle(name: string) {
    setStyleName(name);
    setTheme("default");
    setAccent("default");
  }

  function pickPage(name: string) {
    setPageName(name);
    stage.current?.scrollTo({ top: 0 });
    if (matchMedia(NARROW).matches) setNavOpen(false);
  }

  function toggleNav() {
    const next = !navOpen;
    setNavOpen(next);
    // Remembered per browser; storage can be blocked, and then it just isn't remembered.
    try {
      if (!matchMedia(NARROW).matches) localStorage.setItem(NAV_KEY, next ? "open" : "closed");
    } catch {}
  }

  return (
    <IroRoot
      className="lab"
      styleName={styleName}
      theme={theme === "default" ? undefined : theme}
      accent={accent === "default" ? undefined : accent}
      motion={motion === "system" ? undefined : (motion as IroRootProps["motion"])}
    >
      <header className="lab-top">
        <div className="lab-header">
          <div className="lab-brand">
            <IconButton
              icon={<SidebarIcon />}
              label={navOpen ? "Hide the page list" : "Show the page list"}
              active={navOpen}
              aria-expanded={navOpen}
              onClick={toggleNav}
            />
            <span className="lab-mark" aria-hidden="true">
              <svg viewBox="0 0 160 160" width="26" height="26" aria-hidden="true">
                <g fill="currentColor">
                  <rect x="57" y="8" width="46" height="140" rx="14" fillOpacity="0.4" transform="rotate(-24 80 148)" />
                  <rect x="57" y="8" width="46" height="140" rx="14" fillOpacity="0.4" transform="rotate(24 80 148)" />
                  <rect x="57" y="8" width="46" height="140" rx="14" />
                </g>
                <circle cx="80" cy="128" r="8" fill="var(--iro-accent)" />
              </svg>
            </span>
            <div className="lab-title">
              <strong>iro-ui</strong>
              <span>Design Lab</span>
            </div>
            <Badge>v{version}</Badge>
          </div>
          <div className="lab-pickers">
            <Picker label="Style" value={styleName} options={STYLE_NAMES} onChange={pickStyle} />
            <Picker label="Theme" value={theme} options={style?.themes ?? []} onChange={setTheme} />
            <Picker label="Accent" value={accent} options={style?.accents ?? []} onChange={setAccent} />
            <Picker label="Motion" value={motion} options={MOTIONS} onChange={setMotion} />
          </div>
        </div>
      </header>
      <div className="lab-body">
        <Sidebar
          open={navOpen}
          labPages={Object.keys(LAB_PAGES)}
          componentPages={pages.map(({ name }) => name)}
          shown={shown}
          onPick={pickPage}
          onClose={() => setNavOpen(false)}
        />
        <main ref={stage} className="lab-stage">
          {page ? (
            <section className="lab-page">
              <h2>{page.name}</h2>
              <page.Page />
            </section>
          ) : (
            <LabPage />
          )}
        </main>
      </div>
    </IroRoot>
  );
}
