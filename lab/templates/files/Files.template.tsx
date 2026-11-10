// Template: a file browser. A toolbar with history, the path, search and the view switch; a folder tree beside the items
// (tiles, or a sortable table) and a details pane; uploads, renames and deletes with undo; a live status bar. On a
// narrow column the tree and the details move into sheets and the path and search get rows of their own.

// ── Dependencies ──────────────────────────
import { type KeyboardEvent, type ReactNode, useRef, useState } from "react";
import {
  Breadcrumbs,
  Button,
  ContextMenu,
  DataTable,
  type DataTableColumn,
  DropZone,
  EmptyState,
  Icon,
  IconButton,
  Kbd,
  type MenuEntry,
  Segmented,
  Sheet,
  Splitter,
  StatusDot,
  TextField,
  Toaster,
  toast,
} from "../../../src";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FoldersIcon,
  GridIcon,
  type IconData,
  InfoIcon,
  ListIcon,
  PencilIcon,
  SearchIcon,
  TrashIcon,
  TrashRestoreIcon,
  UploadIcon,
} from "../../../src/icons";
import { Details, type Entry } from "./Details";
import { childrenOf, FILES, type FileItem, file, iconOf, kindOf, modifiedOf, pathOf, START, sizeOf } from "./data";
import { FolderTree } from "./FolderTree";
import { RenameDialog } from "./RenameDialog";

// ── Constants ─────────────────────────────
const LAYOUTS = [
  { value: "grid", label: "Grid", icon: <Icon icon={GridIcon} /> },
  { value: "list", label: "List", icon: <Icon icon={ListIcon} /> },
] as const;

const SHARE = 0.22;

// ── Private helpers ───────────────────────
const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

const icon = (data: IconData) => <Icon icon={data} />;

// ── Public API ────────────────────────────
/** The file browser screen. */
export default function Files() {
  const body = useRef<HTMLDivElement>(null);
  const pane = useRef<HTMLElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const picker = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState(FILES);
  const [history, setHistory] = useState({ stack: [START], at: 0 });
  const [expanded, setExpanded] = useState(pathOf(START).map(({ id }) => id));
  const [share, setShare] = useState(SHARE);
  const [layout, setLayout] = useState<(typeof LAYOUTS)[number]["value"]>("grid");
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<string | null>(FILES[START][0].id);
  const [treeOpen, setTreeOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [renaming, setRenaming] = useState<{ id: string; name: string } | null>(null);

  const folder = history.stack[history.at];
  const path = pathOf(folder);
  const label = path.at(-1)?.label ?? "";
  const entries: Entry[] = [
    ...childrenOf(folder).map((child) => ({
      id: `dir:${child.id}`,
      name: child.label,
      kind: "Folder",
      icon: iconOf(child),
      size: plural(childrenOf(child.id).length + (files[child.id]?.length ?? 0), "item"),
      bytes: -1,
      age: 0,
      folder: child.id,
    })),
    ...(files[folder] ?? []).map(({ id, name, bytes, age }) => {
      const [kind, glyph] = kindOf(name);
      return { id, name, kind, icon: glyph, size: sizeOf(bytes), bytes, age };
    }),
  ];
  const shown = entries.filter(({ name }) => name.toLowerCase().includes(query.trim().toLowerCase()));
  const item = entries.find(({ id }) => id === picked);
  const bytes = (files[folder] ?? []).reduce((sum, { bytes: size }) => sum + size, 0);

  const go = (id: string) => {
    if (id !== folder) setHistory(({ stack, at }) => ({ stack: [...stack.slice(0, at + 1), id], at: at + 1 }));
    setExpanded((open) => [...new Set([...open, ...pathOf(id).map((step) => step.id)])]);
    setPicked(null);
    setQuery("");
    setTreeOpen(false);
  };
  const step = (by: number) => {
    setHistory(({ stack, at }) => ({ stack, at: at + by }));
    setPicked(null);
    setQuery("");
  };
  const open = (entry: Entry) => {
    if (entry.folder) return go(entry.folder);
    setPicked(entry.id);
    // The details pane hides on narrow columns; show them in a sheet instead.
    if (!pane.current?.offsetWidth) setInfoOpen(true);
  };

  /** Moves a file between folders; into the Trash it remembers where it came from. */
  const move = (id: string, from: string, to: string) =>
    setFiles((all) => {
      const moving = all[from]?.find((each) => each.id === id);
      if (!moving) return all;
      const placed: FileItem = { ...moving, from: to === "trash" ? from : undefined };
      return { ...all, [from]: all[from].filter((each) => each.id !== id), [to]: [placed, ...(all[to] ?? [])] };
    });
  const trash = (entry: Entry) => {
    move(entry.id, folder, "trash");
    setPicked(null);
    toast({
      title: `Moved “${entry.name}” to the Trash`,
      tone: "info",
      action: { label: "Undo", onClick: () => move(entry.id, "trash", folder) },
    });
  };
  const restore = (entry: Entry) => {
    const home = files.trash.find(({ id }) => id === entry.id)?.from ?? "home";
    move(entry.id, "trash", home);
    toast({ title: `Restored “${entry.name}”`, description: `Back in ${pathOf(home).at(-1)?.label}`, tone: "success" });
  };
  const erase = (entry: Entry) => {
    setFiles((all) => ({ ...all, trash: all.trash.filter(({ id }) => id !== entry.id) }));
    toast({ title: `Deleted “${entry.name}” for good`, tone: "info" });
  };
  const rename = (name: string) => {
    const id = renaming?.id;
    setFiles((all) => ({ ...all, [folder]: all[folder].map((each) => (each.id === id ? { ...each, name } : each)) }));
    setRenaming(null);
  };
  const upload = (list: File[]) => {
    if (list.length === 0) return;
    setFiles((all) => ({ ...all, [folder]: [...list.map((each) => file(each.name, each.size, 0)), ...all[folder]] }));
    toast({ title: `Uploaded ${plural(list.length, "file")}`, description: `To ${label}`, tone: "success" });
  };

  const menuOf = (entry: Entry): MenuEntry[] =>
    entry.folder
      ? [{ label: "Open", icon: icon(FoldersIcon), onSelect: () => go(entry.folder as string) }]
      : folder === "trash"
        ? [
            { label: "Restore", icon: icon(TrashRestoreIcon), onSelect: () => restore(entry) },
            "separator",
            { label: "Delete for good", icon: icon(TrashIcon), danger: true, onSelect: () => erase(entry) },
          ]
        : [
            {
              label: "Details",
              icon: icon(InfoIcon),
              onSelect: () => {
                setPicked(entry.id);
                setInfoOpen(true);
              },
            },
            {
              label: "Rename",
              icon: icon(PencilIcon),
              onSelect: () => setRenaming({ id: entry.id, name: entry.name }),
            },
            "separator",
            { label: "Move to Trash", icon: icon(TrashIcon), danger: true, onSelect: () => trash(entry) },
          ];
  /** One item's button: a click opens a folder or picks a file. The first carries the UI checks' marker. */
  const itemButton = (entry: Entry, index: number, className?: string, inner?: ReactNode) => (
    <ContextMenu items={menuOf(entry)}>
      <button
        type="button"
        className={className}
        aria-pressed={entry.folder ? undefined : entry.id === picked}
        data-lab-state={index === 0 ? "contextmenu" : undefined}
        onClick={() => open(entry)}
      >
        {inner}
      </button>
    </ContextMenu>
  );
  const columns: DataTableColumn<Entry>[] = [
    {
      id: "name",
      header: "Name",
      sortValue: (row) => row.name,
      cell: (row) =>
        itemButton(
          row,
          shown.indexOf(row),
          "tpl-files-name",
          <>
            <Icon icon={row.icon} size={16} />
            {row.name}
          </>,
        ),
    },
    { id: "kind", header: "Kind", cell: (row) => row.kind, sortValue: (row) => row.kind },
    { id: "size", header: "Size", align: "end", cell: (row) => row.size, sortValue: (row) => row.bytes },
    {
      id: "modified",
      header: "Modified",
      cell: (row) => (row.folder ? "—" : modifiedOf(row.age)),
      sortValue: (row) => row.age,
    },
  ];
  const tree = (
    <FolderTree
      current={folder}
      expanded={expanded}
      onOpen={go}
      onToggle={(id) => setExpanded((all) => (all.includes(id) ? all.filter((each) => each !== id) : [...all, id]))}
      meta={{ trash: files.trash.length }}
    />
  );
  const details = <Details entry={item} path={path} bytes={bytes} count={entries.length} />;
  const findKey = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
      event.preventDefault();
      search.current?.focus();
    }
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Ctrl F from anywhere inside the screen jumps to its search.
    <div className="tpl-files" onKeyDown={findKey}>
      <header className="tpl-files-toolbar">
        <Sheet
          title="Folders"
          side="left"
          open={treeOpen}
          onOpenChange={setTreeOpen}
          className="tpl-files-sheet"
          trigger={
            <IconButton
              className="tpl-files-narrow"
              icon={<Icon icon={FoldersIcon} />}
              label="Folders"
              size="sm"
              data-lab-state="click"
            />
          }
        >
          <nav aria-label="Folders">{tree}</nav>
        </Sheet>
        <IconButton
          icon={<Icon icon={ChevronLeftIcon} />}
          label="Back"
          size="sm"
          disabled={history.at === 0}
          onClick={() => step(-1)}
        />
        <IconButton
          icon={<Icon icon={ChevronRightIcon} />}
          label="Forward"
          size="sm"
          disabled={history.at === history.stack.length - 1}
          onClick={() => step(1)}
        />
        <Breadcrumbs
          className="tpl-files-path"
          aria-label="Path"
          max={3}
          items={path.map((step, index) => ({
            label: step.label,
            onClick: index < path.length - 1 ? () => go(step.id) : undefined,
          }))}
        />
        <TextField
          ref={search}
          className="tpl-files-search"
          size="sm"
          type="search"
          placeholder={`Search ${label}`}
          aria-label="Search files"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          start={<Icon icon={SearchIcon} />}
        />
        <Segmented
          className="tpl-files-layout"
          aria-label="Layout"
          options={[...LAYOUTS]}
          value={layout}
          onValueChange={setLayout}
          size="sm"
        />
        <Sheet
          title="Details"
          side="right"
          open={infoOpen}
          onOpenChange={setInfoOpen}
          className="tpl-files-sheet"
          trigger={
            <IconButton
              className="tpl-files-narrow-info"
              icon={<Icon icon={InfoIcon} />}
              label="Details"
              size="sm"
              data-lab-state="click"
            />
          }
        >
          {details}
        </Sheet>
        <input ref={picker} type="file" multiple hidden onChange={(event) => upload([...(event.target.files ?? [])])} />
        {folder === "trash" ? null : (
          <>
            <Button
              className="tpl-files-upload"
              variant="primary"
              size="sm"
              icon={<Icon icon={UploadIcon} />}
              onClick={() => picker.current?.click()}
            >
              Upload
            </Button>
            <IconButton
              className="tpl-files-upload-icon"
              variant="primary"
              icon={<Icon icon={UploadIcon} />}
              label="Upload"
              size="sm"
              onClick={() => picker.current?.click()}
            />
          </>
        )}
      </header>

      <div ref={body} className="tpl-files-body">
        <nav className="tpl-files-tree" aria-label="Folders" style={{ flexBasis: `${share * 100}%` }}>
          {tree}
        </nav>
        <Splitter
          className="tpl-files-splitter"
          container={body}
          share={share}
          onShareChange={setShare}
          onReset={() => setShare(SHARE)}
          minStart={150}
          minEnd={360}
          label="Resize the folder list"
        />

        <main className="tpl-files-content">
          {shown.length === 0 ? (
            <EmptyState
              icon={<Icon icon={query ? SearchIcon : folder === "trash" ? TrashIcon : FoldersIcon} />}
              title={query ? `Nothing in ${label} matches “${query.trim()}”` : `${label} is empty`}
              action={query ? <Button onClick={() => setQuery("")}>Clear the search</Button> : undefined}
            />
          ) : layout === "grid" ? (
            <ul className="tpl-files-items" aria-label="Files">
              {shown.map((entry, index) => (
                <li key={entry.id}>
                  {itemButton(
                    entry,
                    index,
                    undefined,
                    <>
                      <Icon icon={entry.icon} size={32} />
                      <span>{entry.name}</span>
                      <small>{entry.size}</small>
                    </>,
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <DataTable label="Files" size="sm" columns={columns} rows={shown} rowKey={(row) => row.id} />
          )}
          {folder === "trash" ? null : (
            <DropZone compact multiple title="Drop files here to upload" hint="Up to 2 GB each" onFiles={upload} />
          )}
        </main>

        <aside ref={pane} className="tpl-files-details" aria-label="Details">
          {details}
        </aside>
      </div>

      <footer className="tpl-files-status">
        <span className="tpl-files-sync">
          <StatusDot tone="success" />
          Synced
        </span>
        <span>
          {query ? `${shown.length} of ${plural(entries.length, "item")}` : plural(entries.length, "item")}
          {item ? ", 1 selected" : ""}
        </span>
        <span className="tpl-files-hint">
          <Kbd>Ctrl</Kbd> <Kbd>F</Kbd> to search
        </span>
      </footer>

      <RenameDialog
        key={renaming?.id}
        name={renaming?.name ?? null}
        onRename={rename}
        onClose={() => setRenaming(null)}
      />
      <Toaster />
    </div>
  );
}
