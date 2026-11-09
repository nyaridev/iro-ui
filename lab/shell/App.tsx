// Design Lab shell: a header with the view tabs (Components, Templates), the view's pages in a sidebar that can be
// hidden, and the picked page in up to four columns, each in its own look so styles can be compared side by side. Only
// the page scrolls. The shell itself is always drawn in kami, light or dark as the header's sun/moon says (ADR-0010).

// ── Dependencies ──────────────────────────
import { type ComponentType, useEffect, useRef, useState } from "react";
import { IroRoot, type IroRootProps } from "../../src";
import { BasePage } from "../pages/BasePage";
import { EffectsPage } from "../pages/EffectsPage";
import { IconsPage } from "../pages/IconsPage";
import { MotionPage } from "../pages/MotionPage";
import { TokensPage } from "../pages/TokensPage";
import { ColumnHead } from "./ColumnHead";
import { pages, templates } from "./discover";
import { componentSections, type NavSection, section } from "./groups";
import { Header } from "./Header";
import { DEFAULT_STYLE, type Look, looksFrom, MAX_COLUMNS, nextLook, queryOf, type View, viewFrom } from "./looks";
import { Sidebar } from "./Sidebar";
import { useScheme } from "./scheme";

// ── Constants ─────────────────────────────
/** The starting view, from the URL: `?style=kami,sumi&theme=light,light&view=components&page=Button`. */
const START = new URLSearchParams(location.search);
const TOKENS = "Tokens";
/** The Lab's own pages, before the component pages in the bar. */
const LAB_PAGES: Record<string, ComponentType> = {
  [TOKENS]: TokensPage,
  Base: BasePage,
  Motion: MotionPage,
  Effects: EffectsPage,
  Icons: IconsPage,
};
/** Each view's sidebar. */
const SECTIONS: Record<View, NavSection[]> = {
  components: [section("Foundations", Object.keys(LAB_PAGES)), ...componentSections(pages.map(({ name }) => name))],
  templates: [{ name: "Templates", items: templates.map(({ id, title }) => ({ id, label: title })) }],
};
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

/** A column's IroRoot props, named as the pickers show them; `system` motion leaves the attribute out. */
const rootOf = ({ style, theme, accent, motion }: Look) => ({
  styleName: style,
  theme,
  accent,
  motion: motion === "system" ? undefined : (motion as IroRootProps["motion"]),
});

// ── Public API ────────────────────────────
/** The Lab: header and sidebar in the default style, and the picked page once per column. */
export function App() {
  const [looks, setLooks] = useState(() => looksFrom(START));
  const [view, setView] = useState(() => viewFrom(START));
  // Each view remembers its own page; the URL names the current view's.
  const [picked, setPicked] = useState<Record<View, string>>(() => ({
    components: TOKENS,
    templates: templates[0]?.id ?? "",
    [viewFrom(START)]: START.get("page") ?? "",
  }));
  const [navOpen, setNavOpen] = useState(navStartsOpen);
  const [scheme, toggleScheme] = useScheme();
  const stage = useRef<HTMLElement>(null);
  const page = pages.find(({ name }) => name === picked.components);
  const component = page || LAB_PAGES[picked.components] ? picked.components : TOKENS;
  const LabPage = LAB_PAGES[component] ?? TokensPage;
  const template = templates.find(({ id }) => id === picked.templates) ?? templates[0];
  const shown = view === "components" ? component : (template?.id ?? "");
  let content = <LabPage />;
  if (view === "templates") content = template ? <template.Page /> : <p className="lab-empty">No templates yet.</p>;
  else if (page)
    content = (
      <section className="lab-page">
        <h2>{page.name}</h2>
        <page.Page />
      </section>
    );

  // The URL mirrors the view, so it can be linked (the screenshot tests open pages this way).
  useEffect(() => history.replaceState(null, "", queryOf(looks, view, shown)), [looks, view, shown]);

  // Escape closes the sidebar where it floats over the page.
  useEffect(() => {
    if (!navOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && matchMedia(NARROW).matches) setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen]);

  function pickPage(id: string) {
    setPicked((current) => ({ ...current, [view]: id }));
    stage.current?.scrollTo({ top: 0 });
    if (matchMedia(NARROW).matches) setNavOpen(false);
  }

  function pickView(next: View) {
    setView(next);
    stage.current?.scrollTo({ top: 0 });
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
    <IroRoot className="lab" styleName={DEFAULT_STYLE} theme={scheme === "dark" ? "dark" : undefined}>
      <Header
        view={view}
        onViewChange={pickView}
        navOpen={navOpen}
        onToggleNav={toggleNav}
        scheme={scheme}
        onToggleScheme={toggleScheme}
      />
      <div className="lab-body">
        <Sidebar
          open={navOpen}
          sections={SECTIONS[view]}
          shown={shown}
          onPick={pickPage}
          onClose={() => setNavOpen(false)}
        />
        <main ref={stage} className="lab-stage">
          <div className="lab-compare" style={{ gridTemplateColumns: `repeat(${looks.length}, minmax(18rem, 1fr))` }}>
            {looks.map((look, index) => (
              <ColumnHead
                key={look.id}
                look={look}
                onChange={(next) => setLooks(looks.map((each) => (each.id === look.id ? next : each)))}
                onRemove={looks.length > 1 ? () => setLooks(looks.filter(({ id }) => id !== look.id)) : undefined}
                onAdd={
                  index === looks.length - 1 && looks.length < MAX_COLUMNS
                    ? () => setLooks([...looks, nextLook(looks)])
                    : undefined
                }
              />
            ))}
            {looks.map((look) => (
              <IroRoot key={look.id} className="lab-column" data-view={view} {...rootOf(look)}>
                {content}
              </IroRoot>
            ))}
          </div>
        </main>
      </div>
    </IroRoot>
  );
}
