// Template data: Files. The folders, each folder's starting files, and helpers that name and size them.

// ── Dependencies ──────────────────────────
import {
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HomeIcon,
  type IconData,
  ImageIcon,
  TrashIcon,
  UsersIcon,
  WaveIcon,
} from "../../../src/icons";

// ── Types ─────────────────────────────────
export interface Folder {
  id: string;
  label: string;
  /** The folder it sits in; top-level folders have none. */
  parent?: string;
  icon?: IconData;
}

export interface FileItem {
  id: string;
  name: string;
  bytes: number;
  /** Days since it changed. */
  age: number;
  /** Where a file in the Trash came from, to restore it there. */
  from?: string;
}

// ── Constants ─────────────────────────────
export const FOLDERS: Folder[] = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "documents", label: "Documents", parent: "home" },
  { id: "reports", label: "Reports", parent: "documents" },
  { id: "drafts", label: "Drafts", parent: "reports" },
  { id: "invoices", label: "Invoices", parent: "documents" },
  { id: "photos", label: "Photos", parent: "home" },
  { id: "music", label: "Music", parent: "home" },
  { id: "shared", label: "Shared with me", icon: UsersIcon },
  { id: "trash", label: "Trash", icon: TrashIcon },
];

export const START = "reports";

let next = 0;
/** A file with a fresh id. */
export const file = (name: string, bytes: number, age: number): FileItem => ({
  id: `f${next++}`,
  name,
  bytes,
  age,
});

export const FILES: Record<string, FileItem[]> = {
  home: [file("Todo.md", 2_000, 0)],
  documents: [file("Lease.pdf", 640_000, 40), file("Passport scan.png", 1_900_000, 120)],
  reports: [
    file("Quarterly report.pdf", 2_400_000, 0),
    file("Revenue.csv", 86_000, 1),
    file("Cover.png", 1_100_000, 1),
    file("Team photo.jpg", 3_800_000, 3),
    file("charts.ts", 12_000, 3),
    file("Notes.md", 4_000, 8),
    file("Summary.docx", 220_000, 9),
  ],
  drafts: [file("Q4 outline.md", 3_000, 0), file("Q4 numbers.csv", 41_000, 2)],
  invoices: [file("Invoice 1041.pdf", 88_000, 5), file("Invoice 1042.pdf", 91_000, 12)],
  photos: [file("Beach.jpg", 4_200_000, 30), file("Harbor at night.jpg", 5_100_000, 31), file("Cat.png", 900_000, 2)],
  music: [file("Demo take 3.wav", 31_000_000, 6)],
  shared: [file("Brand guide.pdf", 8_400_000, 14), file("Roadmap.md", 9_000, 1)],
  trash: [],
};

const KINDS: Record<string, [string, IconData]> = {
  pdf: ["PDF document", FileTextIcon],
  csv: ["Spreadsheet", FileTextIcon],
  md: ["Markdown", FileTextIcon],
  docx: ["Word document", FileTextIcon],
  png: ["PNG image", ImageIcon],
  jpg: ["JPEG image", ImageIcon],
  ts: ["TypeScript", FileCodeIcon],
  wav: ["Audio", WaveIcon],
};

// ── Public API ────────────────────────────
/** A file's kind and icon, from its extension. */
export function kindOf(name: string): [string, IconData] {
  const ext = name.includes(".") ? (name.split(".").pop() ?? "").toLowerCase() : "";
  return KINDS[ext] ?? [ext ? `${ext.toUpperCase()} file` : "File", FileIcon];
}

/** "2.4 MB", "86 KB". */
export function sizeOf(bytes: number): string {
  if (bytes < 1000) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1000;
  let unit = 0;
  while (value >= 1000 && unit < units.length - 1) {
    value /= 1000;
    unit++;
  }
  return `${value < 10 ? Number(value.toFixed(1)) : Math.round(value)} ${units[unit]}`;
}

/** "Today", "Yesterday", "3 days ago". */
export const modifiedOf = (age: number) =>
  age === 0 ? "Today" : age === 1 ? "Yesterday" : age < 7 ? `${age} days ago` : age < 14 ? "Last week" : "Earlier";

/** The folder and its parents, from the top down. */
export function pathOf(id: string): Folder[] {
  const path: Folder[] = [];
  for (let at = FOLDERS.find((folder) => folder.id === id); at; at = FOLDERS.find((f) => f.id === at?.parent)) {
    path.unshift(at);
  }
  return path;
}

/** The folders directly inside id; the top level when id is undefined. */
export const childrenOf = (id: string | undefined) => FOLDERS.filter((folder) => folder.parent === id);

/** A folder's own icon, or the folder icon. */
export const iconOf = (folder: Folder) => folder.icon ?? FolderIcon;
