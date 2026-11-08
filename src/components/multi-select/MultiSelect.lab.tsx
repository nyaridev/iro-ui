// Lab page: MultiSelect flat and grouped, empty and with picks.

import { useState } from "react";
import { Field } from "../field/Field";
import type { SelectOption } from "../select/options";
import { MultiSelect } from "./MultiSelect";

const BASES: SelectOption<string>[] = [
  { value: "sd15", label: "SD 1.5", group: "Image" },
  { value: "sdxl", label: "SDXL 1.0", group: "Image" },
  { value: "illustrious", label: "Illustrious", group: "Image" },
  { value: "wan", label: "Wan Video 2.2", group: "Video" },
];

const KINDS: SelectOption<string>[] = [
  { value: "lora", label: "LoRA" },
  { value: "checkpoint", label: "Checkpoint" },
  { value: "vae", label: "VAE" },
];

export default function MultiSelectLab() {
  const [bases, setBases] = useState(["sdxl", "illustrious"]);
  const [kinds, setKinds] = useState<string[]>([]);

  return (
    <div className="lab-stack" style={{ maxWidth: 360 }}>
      <Field label="Base models">
        <MultiSelect options={BASES} value={bases} onValueChange={setBases} />
      </Field>
      <Field label="Kinds">
        <MultiSelect options={KINDS} value={kinds} onValueChange={setKinds} placeholder="Any kind" />
      </Field>
      <MultiSelect options={KINDS} value={["lora"]} onValueChange={() => {}} disabled aria-label="Disabled" />
    </div>
  );
}
