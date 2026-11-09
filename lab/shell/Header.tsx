// The Lab's header: the sidebar toggle and the brand at the left edge, the view tabs (Components, Templates) in the
// middle, and on the right the sun/moon that switches the frame between light and dark (ADR-0010).

// ── Dependencies ──────────────────────────
import { version } from "../../package.json";
import { Badge, Icon, IconButton, type TabItem, Tabs } from "../../src";
import { AppWindowIcon, GridIcon, MoonIcon, SidebarIcon, SunIcon } from "../../src/icons";
import type { View } from "./looks";
import type { Scheme } from "./scheme";

// ── Constants ─────────────────────────────
const VIEWS: TabItem<View>[] = [
  { value: "components", label: "Components", icon: <Icon icon={GridIcon} size="1em" /> },
  { value: "templates", label: "Templates", icon: <Icon icon={AppWindowIcon} size="1em" /> },
];

// ── Types ─────────────────────────────────
interface HeaderProps {
  view: View;
  onViewChange: (view: View) => void;
  navOpen: boolean;
  onToggleNav: () => void;
  scheme: Scheme;
  onToggleScheme: () => void;
}

// ── Public API ────────────────────────────
/** The bar across the top of the Lab. */
export function Header({ view, onViewChange, navOpen, onToggleNav, scheme, onToggleScheme }: HeaderProps) {
  const dark = scheme === "dark";
  return (
    <header className="lab-top">
      <div className="lab-header">
        <div className="lab-brand">
          <IconButton
            icon={<Icon icon={SidebarIcon} size={18} />}
            label={navOpen ? "Hide the page list" : "Show the page list"}
            active={navOpen}
            aria-expanded={navOpen}
            onClick={onToggleNav}
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
        <Tabs variant="nav" aria-label="Lab view" tabs={VIEWS} value={view} onValueChange={onViewChange} />
        <div className="lab-header-end">
          <IconButton
            icon={<Icon icon={dark ? SunIcon : MoonIcon} size={18} />}
            label={dark ? "Switch the Lab to light" : "Switch the Lab to dark"}
            onClick={onToggleScheme}
          />
        </div>
      </div>
    </header>
  );
}
