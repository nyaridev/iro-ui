// Lab page: MultiSelect flat and grouped, empty and with picks.

import { useState } from "react";
import { Field } from "../field/Field";
import type { SelectOption } from "../select/options";
import { MultiSelect } from "./MultiSelect";

const LANGUAGES: SelectOption<string>[] = [
  { value: "en", label: "English", group: "Europe" },
  { value: "fr", label: "French", group: "Europe" },
  { value: "de", label: "German", group: "Europe" },
  { value: "ja", label: "Japanese", group: "Asia" },
];

const KINDS: SelectOption<string>[] = [
  { value: "documents", label: "Documents" },
  { value: "images", label: "Images" },
  { value: "videos", label: "Videos" },
];

export default function MultiSelectLab() {
  const [languages, setLanguages] = useState(["en", "ja"]);
  const [kinds, setKinds] = useState<string[]>([]);

  return (
    <div className="lab-stack" style={{ maxWidth: 360 }}>
      <Field label="Languages" data-lab-state="click">
        <MultiSelect options={LANGUAGES} value={languages} onValueChange={setLanguages} />
      </Field>
      <Field label="Types">
        <MultiSelect options={KINDS} value={kinds} onValueChange={setKinds} placeholder="Any type" />
      </Field>
      <MultiSelect options={KINDS} value={["images"]} onValueChange={() => {}} disabled aria-label="Disabled" />
    </div>
  );
}
