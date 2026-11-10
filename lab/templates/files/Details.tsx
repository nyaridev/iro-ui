// Template part: Files' details. The picked item, or the folder showing when nothing is picked.

// ── Dependencies ──────────────────────────
import { Icon, PropertyList } from "../../../src";
import type { IconData } from "../../../src/icons";
import { type Folder, iconOf, modifiedOf, sizeOf } from "./data";

// ── Types ─────────────────────────────────
/** One row of the items: a folder inside this one, or a file. */
export interface Entry {
  id: string;
  name: string;
  kind: string;
  icon: IconData;
  size: string;
  /** For sorting: bytes, -1 for folders so they come first. */
  bytes: number;
  age: number;
  /** A folder's id; files have none. */
  folder?: string;
}

interface DetailsProps {
  entry?: Entry;
  /** The folder showing, from the top down. */
  path: Folder[];
  /** Its files' bytes, and how many items it holds. */
  bytes: number;
  count: number;
}

// ── Public API ────────────────────────────
/** A preview, the name and a property list. */
export function Details({ entry, path, bytes, count }: DetailsProps) {
  const here = path.at(-1);
  const where = `/${path.map(({ label }) => label).join("/")}`;
  const glyph = entry?.icon ?? (here ? iconOf(here) : undefined);
  return (
    <div className="tpl-files-info">
      <div className="tpl-files-preview">{glyph ? <Icon icon={glyph} size={48} /> : null}</div>
      <h2>{entry?.name ?? here?.label}</h2>
      <PropertyList
        properties={
          entry
            ? [
                { label: "Kind", value: entry.kind },
                { label: "Size", value: entry.size, mono: true },
                ...(entry.folder ? [] : [{ label: "Modified", value: modifiedOf(entry.age) }]),
                { label: "Owner", value: "Maya Chen" },
                { label: "Path", value: `${where}/${entry.name}`, mono: true },
              ]
            : [
                { label: "Kind", value: "Folder" },
                { label: "Holds", value: `${count} ${count === 1 ? "item" : "items"}` },
                { label: "Files", value: sizeOf(bytes), mono: true },
                { label: "Path", value: where, mono: true },
              ]
        }
      />
    </div>
  );
}
