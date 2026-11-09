// Commit: one commit as a card: its subject and body, the author and when, the short hash to copy, and the files it
// changed with their added and removed lines, totalled in a five-block bar the way code hosts show a diff's size.

// ── Dependencies ──────────────────────────
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { Avatar } from "../avatar/Avatar";
import { CopyButton } from "../copy-button/CopyButton";
import { cx } from "../shared/cx";
import { ChevronDownGlyph } from "../shared/glyphs";

// ── Constants ─────────────────────────────
const BLOCKS = 5;
const SHORT_HASH = 7;

const FILE_MARKS = { added: "A", modified: "M", deleted: "D", renamed: "R" };

// ── Types ─────────────────────────────────
export interface CommitFile {
  path: string;
  additions: number;
  deletions: number;
  status?: keyof typeof FILE_MARKS;
}

export interface CommitProps {
  hash: string;
  /** The whole message: the first line is the subject, the rest the body. */
  message: string;
  author: { name: string; avatar?: string };
  /** When, as the app words it: "2 hours ago", a date. */
  date?: ReactNode;
  files?: CommitFile[];
  /** Shows the files from the start (default false). */
  defaultOpen?: boolean;
  className?: string;
}

// ── Private helpers ───────────────────────
/** How many of the five blocks are additions, deletions and unchanged, as code hosts draw them. */
function blocksOf(additions: number, deletions: number) {
  const total = additions + deletions;
  if (total === 0) return { added: 0, deleted: 0 };
  const filled = Math.min(BLOCKS, Math.max(1, Math.ceil(Math.log10(total + 1) * 2)));
  const added = Math.round((additions / total) * filled);
  return { added, deleted: filled - added };
}

// ── Public API ────────────────────────────
/** A commit's message, author, hash and changed files. */
export function Commit({ hash, message, author, date, files, defaultOpen = false, className }: CommitProps) {
  const [subject, ...rest] = message.trim().split("\n");
  const body = rest.join("\n").trim();
  const additions = files?.reduce((sum, file) => sum + file.additions, 0) ?? 0;
  const deletions = files?.reduce((sum, file) => sum + file.deletions, 0) ?? 0;
  const blocks = blocksOf(additions, deletions);

  return (
    <article className={cx("iro-commit", className)}>
      <div className="iro-commit-main">
        <p className="iro-commit-subject">{subject}</p>
        {body ? <p className="iro-commit-body">{body}</p> : null}
        <div className="iro-commit-meta">
          <Avatar name={author.name} src={author.avatar} size={20} />
          <span className="iro-commit-author">{author.name}</span>
          {date ? <span className="iro-commit-date">{date}</span> : null}
          <span className="iro-commit-hash">
            <code>{hash.slice(0, SHORT_HASH)}</code>
            <CopyButton text={hash} label="Copy commit hash" />
          </span>
        </div>
      </div>
      {files && files.length > 0 ? (
        <BaseCollapsible.Root defaultOpen={defaultOpen} className="iro-commit-files">
          <BaseCollapsible.Trigger className="iro-commit-files-trigger">
            <ChevronDownGlyph />
            <span>
              {files.length} {files.length === 1 ? "file" : "files"} changed
            </span>
            <span className="iro-commit-stat">
              <span data-kind="added">+{additions}</span>
              <span data-kind="deleted">−{deletions}</span>
              <span className="iro-commit-blocks" role="img" aria-label={`${additions} added, ${deletions} removed`}>
                {Array.from({ length: BLOCKS }, (_, index) => (
                  <span
                    // biome-ignore lint/suspicious/noArrayIndexKey: a block is its place in the bar.
                    key={index}
                    data-kind={
                      index < blocks.added ? "added" : index < blocks.added + blocks.deleted ? "deleted" : undefined
                    }
                  />
                ))}
              </span>
            </span>
          </BaseCollapsible.Trigger>
          <BaseCollapsible.Panel className="iro-commit-files-panel">
            <ul className="iro-commit-file-list">
              {files.map((file) => (
                <li key={file.path} className="iro-commit-file">
                  {file.status ? (
                    <span data-status={file.status} className="iro-commit-file-status" title={file.status}>
                      {FILE_MARKS[file.status]}
                    </span>
                  ) : null}
                  <span className="iro-commit-file-path">{file.path}</span>
                  <span className="iro-commit-stat">
                    <span data-kind="added">+{file.additions}</span>
                    <span data-kind="deleted">−{file.deletions}</span>
                  </span>
                </li>
              ))}
            </ul>
          </BaseCollapsible.Panel>
        </BaseCollapsible.Root>
      ) : null}
    </article>
  );
}
