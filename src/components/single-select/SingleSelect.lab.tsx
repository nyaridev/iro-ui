// Lab page: SingleSelect flat and grouped, empty and picked, in every size, with icons and hints.

import { useState } from "react";
import { GridIcon, ListIcon } from "../../icons/set/layout";
import { Field } from "../field/Field";
import { Icon } from "../icon/Icon";
import type { SelectOption } from "../select/options";
import { SingleSelect } from "./SingleSelect";

const TYPES: SelectOption<string>[] = [
  { value: "all", label: "All types" },
  { value: "images", label: "Images", hint: "120" },
  { value: "videos", label: "Videos", hint: "48" },
  { value: "audio", label: "Audio", hint: "9", disabled: true },
];

const SORTS: SelectOption<string>[] = [
  { value: "newest", label: "Newest", group: "Date" },
  { value: "oldest", label: "Oldest", group: "Date" },
  { value: "name", label: "Name A–Z", group: "Name" },
  { value: "name-desc", label: "Name Z–A", group: "Name" },
];

const VIEWS: SelectOption<string>[] = [
  { value: "grid", label: "Grid", icon: <Icon icon={GridIcon} /> },
  { value: "list", label: "List", icon: <Icon icon={ListIcon} /> },
];

export default function SingleSelectLab() {
  const [type, setType] = useState<string | null>("all");
  const [sort, setSort] = useState<string | null>(null);
  const [view, setView] = useState<string | null>("grid");

  return (
    <div className="lab-stack" style={{ maxWidth: 360 }}>
      <Field label="Type" data-lab-state="click">
        <SingleSelect options={TYPES} value={type} onValueChange={setType} />
      </Field>
      <Field label="Sort">
        <SingleSelect options={SORTS} value={sort} onValueChange={setSort} placeholder="Pick an order" />
      </Field>
      <Field label="View">
        <SingleSelect options={VIEWS} value={view} onValueChange={setView} />
      </Field>
      <SingleSelect options={TYPES} value="images" onValueChange={() => {}} size="sm" aria-label="Small" />
      <SingleSelect options={TYPES} value="images" onValueChange={() => {}} size="lg" aria-label="Large" />
      <SingleSelect options={TYPES} value="videos" onValueChange={() => {}} disabled aria-label="Disabled" />
    </div>
  );
}
