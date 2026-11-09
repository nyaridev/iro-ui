// The icon set by category, and every icon in one list sorted by name: for the Lab, the tests, and apps that look
// icons up by name. Importing it bundles the whole set.

// ── Dependencies ──────────────────────────
import type { IconData } from "./icon";
import * as arrows from "./set/arrows";
import * as basics from "./set/basics";
import * as brands from "./set/brands";
import * as charts from "./set/charts";
import * as chevrons from "./set/chevrons";
import * as code from "./set/code";
import * as communication from "./set/communication";
import * as controls from "./set/controls";
import * as devices from "./set/devices";
import * as editing from "./set/editing";
import * as files from "./set/files";
import * as folders from "./set/folders";
import * as history from "./set/history";
import * as layout from "./set/layout";
import * as marks from "./set/marks";
import * as media from "./set/media";
import * as nature from "./set/nature";
import * as people from "./set/people";
import * as places from "./set/places";
import * as security from "./set/security";
import * as status from "./set/status";
import * as structure from "./set/structure";
import * as tools from "./set/tools";

// ── Types ─────────────────────────────────
/** A category of the set: one file in `set/`, its icons sorted by name. */
export interface IconCategory {
  name: string;
  icons: IconData[];
}

// ── Private helpers ───────────────────────
const byName = (a: IconData, b: IconData) => a.name.localeCompare(b.name);
const category = (name: string, set: Record<string, IconData>): IconCategory => ({
  name,
  icons: Object.values(set).sort(byName),
});

// ── Public API ────────────────────────────
/** The set by category, in the order the Lab shows them. */
export const iconCategories: IconCategory[] = [
  /* @__PURE__ */ category("Basics", basics),
  /* @__PURE__ */ category("Arrows", arrows),
  /* @__PURE__ */ category("Chevrons", chevrons),
  /* @__PURE__ */ category("History and order", history),
  /* @__PURE__ */ category("Status", status),
  /* @__PURE__ */ category("Marks", marks),
  /* @__PURE__ */ category("Controls", controls),
  /* @__PURE__ */ category("Security", security),
  /* @__PURE__ */ category("Files", files),
  /* @__PURE__ */ category("Folders and storage", folders),
  /* @__PURE__ */ category("Editing", editing),
  /* @__PURE__ */ category("Text and code", code),
  /* @__PURE__ */ category("Media", media),
  /* @__PURE__ */ category("Layout", layout),
  /* @__PURE__ */ category("Structure", structure),
  /* @__PURE__ */ category("People", people),
  /* @__PURE__ */ category("Communication", communication),
  /* @__PURE__ */ category("Devices", devices),
  /* @__PURE__ */ category("Charts", charts),
  /* @__PURE__ */ category("Time and places", places),
  /* @__PURE__ */ category("Weather and nature", nature),
  /* @__PURE__ */ category("Tools", tools),
  /* @__PURE__ */ category("Brands", brands),
];

/** Every icon, sorted by name. */
export const allIcons: IconData[] = iconCategories.flatMap(({ icons }) => icons).sort(byName);
