// The issue tracker's editors: a side sheet to change an issue, and a dialog to file a new one. Both edit a draft and
// hand it back only on Save or Create.

// ── Dependencies ──────────────────────────
import { type FormEvent, useEffect, useId, useState } from "react";
import { Button, Dialog, Field, MultiSelect, Select, Sheet, TextArea, TextField } from "../../../src";
import { type Issue, LABEL_OPTIONS, PEOPLE_OPTIONS, PRIORITIES, type Priority, STATUSES, type Status } from "./data";

// ── Private helpers ───────────────────────
/** The fields both editors share; `full` adds labels and the description. */
function IssueFields({ draft, onChange, full }: { draft: Issue; onChange: (draft: Issue) => void; full: boolean }) {
  const set = <K extends keyof Issue>(key: K, value: Issue[K]) => onChange({ ...draft, [key]: value });
  return (
    <>
      <Field label="Title">
        <TextField value={draft.title} onChange={(event) => set("title", event.target.value)} required />
      </Field>
      <div className="tpl-issues-pair">
        <Field label="Status">
          <Select<Status>
            aria-label="Status"
            options={STATUSES}
            value={draft.status}
            onValueChange={(value) => value && set("status", value)}
          />
        </Field>
        <Field label="Priority">
          <Select<Priority>
            aria-label="Priority"
            options={PRIORITIES}
            value={draft.priority}
            onValueChange={(value) => value && set("priority", value)}
          />
        </Field>
      </div>
      <Field label="Assignee">
        <Select
          aria-label="Assignee"
          placeholder="Unassigned"
          options={PEOPLE_OPTIONS}
          value={draft.assignee || null}
          onValueChange={(value) => set("assignee", value ?? "")}
        />
      </Field>
      {full ? (
        <>
          <Field label="Labels">
            <MultiSelect
              aria-label="Labels"
              placeholder="No labels"
              options={LABEL_OPTIONS}
              value={draft.labels}
              onValueChange={(value) => set("labels", value)}
            />
          </Field>
          <Field label="Description">
            <TextArea
              value={draft.description}
              onChange={(event) => set("description", event.target.value)}
              rows={4}
              autoGrow
            />
          </Field>
        </>
      ) : null}
    </>
  );
}

// ── Public API ────────────────────────────
/** A right-hand sheet that edits `issue`; Save hands the changed copy to `onSave`. */
export function IssueSheet({
  issue,
  onClose,
  onSave,
}: {
  issue: Issue | null;
  onClose: () => void;
  onSave: (issue: Issue) => void;
}) {
  const [draft, setDraft] = useState(issue);
  // An issue opened: start its draft over. On close the last draft stays, so the sheet slides out still filled.
  useEffect(() => {
    if (issue) setDraft(issue);
  }, [issue]);

  const save = (event: FormEvent) => {
    event.preventDefault();
    if (draft?.title.trim()) onSave({ ...draft, title: draft.title.trim(), age: 0 });
  };

  return (
    <Sheet
      title={draft ? `Edit ${draft.id}` : "Edit issue"}
      side="right"
      open={issue !== null}
      onOpenChange={(open) => (open ? undefined : onClose())}
      className="tpl-issues-sheet"
    >
      {draft ? (
        <form className="tpl-issues-form" onSubmit={save}>
          <IssueFields draft={draft} onChange={setDraft} full />
          <footer className="tpl-issues-form-foot">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={!draft.title.trim()}>
              Save
            </Button>
          </footer>
        </form>
      ) : null}
    </Sheet>
  );
}

/** A dialog that files a new issue; Create hands it to `onCreate` with the next free id. */
export function NewIssueDialog({
  open,
  onOpenChange,
  nextId,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nextId: string;
  onCreate: (issue: Issue) => void;
}) {
  const blank = (): Issue => ({
    id: nextId,
    title: "",
    status: "backlog",
    priority: "medium",
    assignee: "",
    labels: [],
    description: "",
    age: 0,
  });
  const formId = useId();
  const [draft, setDraft] = useState(blank);
  // Each time it opens, start from an empty issue.
  // biome-ignore lint/correctness/useExhaustiveDependencies: only opening should reset it
  useEffect(() => {
    if (open) setDraft(blank());
  }, [open]);

  const create = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.title.trim()) return;
    onCreate({ ...draft, title: draft.title.trim() });
    onOpenChange(false);
  };

  return (
    <Dialog
      title="New issue"
      description={`It's filed as ${nextId}.`}
      open={open}
      onOpenChange={onOpenChange}
      footer={
        <>
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" form={formId} variant="primary" disabled={!draft.title.trim()}>
            Create issue
          </Button>
        </>
      }
    >
      <form id={formId} className="tpl-issues-form" onSubmit={create}>
        <IssueFields draft={draft} onChange={setDraft} full={false} />
      </form>
    </Dialog>
  );
}
