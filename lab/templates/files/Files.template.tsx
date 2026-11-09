// Template: a file browser. A toolbar with the path and view switch, a folder tree beside the items (tiles, or a
// sortable table), a details pane for the picked item, an upload drop zone and a status bar.

// ── Dependencies ──────────────────────────
import { useRef, useState } from "react";
import {
  Breadcrumbs,
  Button,
  DataTable,
  type DataTableColumn,
  DropZone,
  Icon,
  IconButton,
  Kbd,
  PropertyList,
  Segmented,
  Splitter,
  StatusDot,
  TextField,
  TreeRow,
} from "../../../src";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FileCodeIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
  GridIcon,
  HomeIcon,
  type IconData,
  ImageIcon,
  ListIcon,
  SearchIcon,
  TrashIcon,
  UploadIcon,
  UsersIcon,
} from "../../../src/icons";

// ── Constants ─────────────────────────────
const TREE: { id: string; label: string; depth: number; icon: IconData; open?: boolean }[] = [
  { id: "home", label: "Home", depth: 0, icon: HomeIcon, open: true },
  { id: "documents", label: "Documents", depth: 1, icon: FolderOpenIcon, open: true },
  { id: "reports", label: "Reports", depth: 2, icon: FolderOpenIcon },
  { id: "invoices", label: "Invoices", depth: 2, icon: FolderIcon },
  { id: "photos", label: "Photos", depth: 1, icon: FolderIcon, open: false },
  { id: "music", label: "Music", depth: 1, icon: FolderIcon, open: false },
  { id: "shared", label: "Shared with me", depth: 0, icon: UsersIcon },
  { id: "trash", label: "Trash", depth: 0, icon: TrashIcon },
];

interface Item {
  name: string;
  kind: string;
  icon: IconData;
  size: string;
  /** For sorting: bytes (folders first), and days since it changed. */
  bytes: number;
  modified: string;
  age: number;
}

const ITEMS: Item[] = [
  { name: "Drafts", kind: "Folder", icon: FolderIcon, size: "6 items", bytes: -1, modified: "Today", age: 0 },
  {
    name: "Quarterly report.pdf",
    kind: "PDF document",
    icon: FileTextIcon,
    size: "2.4 MB",
    bytes: 2_400_000,
    modified: "Today",
    age: 0,
  },
  {
    name: "Revenue.csv",
    kind: "Spreadsheet",
    icon: FileTextIcon,
    size: "86 KB",
    bytes: 86_000,
    modified: "Yesterday",
    age: 1,
  },
  {
    name: "Cover.png",
    kind: "PNG image",
    icon: ImageIcon,
    size: "1.1 MB",
    bytes: 1_100_000,
    modified: "Yesterday",
    age: 1,
  },
  {
    name: "Team photo.jpg",
    kind: "JPEG image",
    icon: ImageIcon,
    size: "3.8 MB",
    bytes: 3_800_000,
    modified: "Mon",
    age: 3,
  },
  { name: "charts.ts", kind: "TypeScript", icon: FileCodeIcon, size: "12 KB", bytes: 12_000, modified: "Mon", age: 3 },
  { name: "Notes.md", kind: "Markdown", icon: FileTextIcon, size: "4 KB", bytes: 4_000, modified: "Last week", age: 8 },
  {
    name: "Summary.docx",
    kind: "Word document",
    icon: FileTextIcon,
    size: "220 KB",
    bytes: 220_000,
    modified: "Last week",
    age: 9,
  },
];

const LAYOUTS = [
  { value: "grid", label: "Grid", icon: <Icon icon={GridIcon} /> },
  { value: "list", label: "List", icon: <Icon icon={ListIcon} /> },
] as const;

// ── Public API ────────────────────────────
/** The file browser screen. */
export default function Files() {
  const body = useRef<HTMLDivElement>(null);
  const [share, setShare] = useState(0.22);
  const [folder, setFolder] = useState("reports");
  const [layout, setLayout] = useState<(typeof LAYOUTS)[number]["value"]>("grid");
  const [picked, setPicked] = useState(ITEMS[1].name);
  const item = ITEMS.find(({ name }) => name === picked) ?? ITEMS[0];
  const columns: DataTableColumn<Item>[] = [
    {
      id: "name",
      header: "Name",
      sortValue: (row) => row.name,
      cell: (row) => (
        <button
          type="button"
          className="tpl-files-name"
          aria-pressed={row.name === picked}
          onClick={() => setPicked(row.name)}
        >
          <Icon icon={row.icon} size={16} />
          {row.name}
        </button>
      ),
    },
    { id: "kind", header: "Kind", cell: (row) => row.kind, sortValue: (row) => row.kind },
    { id: "size", header: "Size", align: "end", cell: (row) => row.size, sortValue: (row) => row.bytes },
    { id: "modified", header: "Modified", cell: (row) => row.modified, sortValue: (row) => row.age },
  ];

  return (
    <div className="tpl-files">
      <header className="tpl-files-toolbar">
        <IconButton icon={<Icon icon={ChevronLeftIcon} />} label="Back" size="sm" />
        <IconButton icon={<Icon icon={ChevronRightIcon} />} label="Forward" size="sm" disabled />
        <Breadcrumbs
          className="tpl-files-path"
          aria-label="Path"
          items={[
            { label: "Home", onClick: () => undefined },
            { label: "Documents", onClick: () => undefined },
            { label: "Reports" },
          ]}
        />
        <TextField
          className="tpl-files-search"
          size="sm"
          type="search"
          placeholder="Search files"
          aria-label="Search files"
          start={<Icon icon={SearchIcon} />}
        />
        <Segmented aria-label="Layout" options={[...LAYOUTS]} value={layout} onValueChange={setLayout} size="sm" />
        <Button className="tpl-files-upload" variant="primary" size="sm" icon={<Icon icon={UploadIcon} />}>
          Upload
        </Button>
      </header>

      <div ref={body} className="tpl-files-body">
        <nav className="tpl-files-tree" aria-label="Folders" style={{ flexBasis: `${share * 100}%` }}>
          {TREE.map(({ id, label, depth, icon, open }) => (
            <TreeRow
              key={id}
              label={label}
              depth={depth}
              icon={<Icon icon={icon} />}
              open={open}
              selected={id === folder}
              onClick={() => setFolder(id)}
            />
          ))}
        </nav>
        <Splitter
          className="tpl-files-splitter"
          container={body}
          share={share}
          onShareChange={setShare}
          onReset={() => setShare(0.22)}
          minStart={150}
          minEnd={360}
          label="Resize the folder list"
        />

        <main className="tpl-files-content">
          {layout === "grid" ? (
            <ul className="tpl-files-items" aria-label="Files">
              {ITEMS.map(({ name, icon, size }) => (
                <li key={name}>
                  <button type="button" aria-pressed={name === picked} onClick={() => setPicked(name)}>
                    <Icon icon={icon} size={32} />
                    <span>{name}</span>
                    <small>{size}</small>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <DataTable label="Files" size="sm" columns={columns} rows={ITEMS} rowKey={(row) => row.name} />
          )}
          <DropZone compact title="Drop files here to upload" hint="Up to 2 GB each" onFiles={() => {}} />
        </main>

        <aside className="tpl-files-details" aria-label="Details">
          <div className="tpl-files-preview">
            <Icon icon={item.icon} size={48} />
          </div>
          <h2>{item.name}</h2>
          <PropertyList
            properties={[
              { label: "Kind", value: item.kind },
              { label: "Size", value: item.size, mono: true },
              { label: "Modified", value: item.modified },
              { label: "Owner", value: "Maya Chen" },
              { label: "Path", value: `/Documents/Reports/${item.name}`, mono: true },
            ]}
          />
        </aside>
      </div>

      <footer className="tpl-files-status">
        <span className="tpl-files-sync">
          <StatusDot tone="success" />
          Synced
        </span>
        <span>{ITEMS.length} items, 1 selected</span>
        <span className="tpl-files-hint">
          <Kbd>Ctrl</Kbd> <Kbd>F</Kbd> to search
        </span>
      </footer>
    </div>
  );
}
