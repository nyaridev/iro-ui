// Icons page (ADR-0009): every icon in the style's drawing, grouped by category, with a filter, a category picker, a
// size picker and a switch that shows both drawings side by side. Clicking a tile copies the icon's export name.

// ── Dependencies ──────────────────────────
import { type CSSProperties, useState } from "react";
import { Icon, Segmented, Select, Switch, TextField } from "../../src";
import { SearchIcon } from "../../src/icons";
import { iconCategories } from "../../src/icons/all";

// ── Constants ─────────────────────────────
const SIZES = ["16", "20", "24", "32"] as const;
const ALL = "all";
const CATEGORY_OPTIONS = [
  { value: ALL, label: "All categories" },
  ...iconCategories.map(({ name, icons }) => ({ value: name, label: name, hint: String(icons.length) })),
];
const TOTAL = iconCategories.reduce((sum, { icons }) => sum + icons.length, 0);
/** Forces one drawing on, whatever the style shows. */
const LINE = { "--iro-icon-line": "inline", "--iro-icon-solid": "none" } as CSSProperties;
const SOLID = { "--iro-icon-line": "none", "--iro-icon-solid": "inline" } as CSSProperties;

// ── Private helpers ───────────────────────
/** `chevron-down` → `ChevronDownIcon`, the name apps import. */
const exportName = (name: string) =>
  `${name.replace(/(^|-)(\w)/g, (_, __, letter: string) => letter.toUpperCase())}Icon`;

// ── Public API ────────────────────────────
/** The icon set, by category. */
export function IconsPage() {
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState(ALL);
  const [size, setSize] = useState<(typeof SIZES)[number]>("24");
  const [both, setBoth] = useState(false);
  const [copied, setCopied] = useState("");
  const query = filter.trim().toLowerCase();
  // Typing a category's name shows all of it; otherwise the filter matches icon names.
  const shown = iconCategories
    .filter(({ name }) => category === ALL || name === category)
    .map(({ name, icons }) => ({
      name,
      icons: name.toLowerCase().includes(query) ? icons : icons.filter((icon) => icon.name.includes(query)),
    }))
    .filter(({ icons }) => icons.length > 0);

  const copy = (name: string) => {
    const text = exportName(name);
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(text);
  };

  return (
    <section className="lab-page">
      <h2>Icons</h2>
      <p className="lab-hint">
        {TOTAL} icons in {iconCategories.length} categories from <code>iro-ui/icons</code>, drawn with{" "}
        <code>&lt;Icon icon={"{FolderIcon}"} /&gt;</code>. kami and kon show the line drawing, sumi the solid one. Click
        an icon to copy its name
        {copied ? (
          <>
            : <code>{copied}</code> copied
          </>
        ) : null}
        .
      </p>
      <div className="lab-row lab-icons-tools">
        <TextField
          size="sm"
          type="search"
          aria-label="Filter icons"
          placeholder="Filter icons"
          start={<Icon icon={SearchIcon} size="1em" />}
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
        <Select
          size="sm"
          className="lab-icons-category"
          aria-label="Category"
          openLabel="Show categories"
          options={CATEGORY_OPTIONS}
          value={category}
          onValueChange={(next) => setCategory(next ?? ALL)}
        />
        <Segmented
          size="sm"
          aria-label="Icon size"
          options={SIZES.map((value) => ({ value, label: `${value} px` }))}
          value={size}
          onValueChange={setSize}
        />
        <Switch label="Both drawings" checked={both} onCheckedChange={setBoth} />
      </div>
      {shown.map(({ name, icons }) => (
        <div key={name} className="lab-icons-group">
          <h3>
            {name} <span className="lab-icons-count">{icons.length}</span>
          </h3>
          <div className="lab-icons" style={{ "--tile": `${Math.max(88, Number(size) * 2 + 48)}px` } as CSSProperties}>
            {icons.map((icon) => (
              <button key={icon.name} type="button" className="lab-icon-tile" onClick={() => copy(icon.name)}>
                <span className="lab-icon-art">
                  {both ? (
                    <>
                      <Icon icon={icon} size={Number(size)} style={LINE} />
                      <Icon icon={icon} size={Number(size)} style={SOLID} />
                    </>
                  ) : (
                    <Icon icon={icon} size={Number(size)} />
                  )}
                </span>
                <span className="lab-icon-name">{icon.name}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      {shown.length === 0 && <p className="lab-empty">No icon matches "{filter}".</p>}
    </section>
  );
}
