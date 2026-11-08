// Lab page: Select flat and grouped, at every size, inside a Field, invalid and disabled.

import { useState } from "react";
import { Field } from "../field/Field";
import type { SelectOption } from "./options";
import { Select } from "./Select";

const SAMPLERS: SelectOption<string>[] = [
  { value: "euler", label: "Euler" },
  { value: "euler_a", label: "Euler Ancestral" },
  { value: "dpmpp_2m", label: "DPM++ 2M" },
  { value: "dpmpp_sde", label: "DPM++ SDE" },
  { value: "uni_pc", label: "UniPC", disabled: true },
];

const MODELS: SelectOption<string>[] = [
  { value: "sdxl", label: "SDXL 1.0", group: "Image" },
  { value: "flux", label: "Flux.1 Dev", group: "Image" },
  { value: "wan-t2v", label: "Wan Video 2.2 T2V-A14B", group: "Video" },
  { value: "wan-i2v", label: "Wan Video 2.2 I2V-A14B", group: "Video" },
];

export default function SelectLab() {
  const [sampler, setSampler] = useState<string | null>("euler");
  const [model, setModel] = useState<string | null>(null);

  return (
    <div className="lab-stack" style={{ maxWidth: 360 }}>
      <Field label="Sampler">
        <Select options={SAMPLERS} value={sampler} onValueChange={setSampler} />
      </Field>
      <Field label="Base model" hint='Type "wan 2.2" to filter.'>
        <Select options={MODELS} value={model} onValueChange={setModel} placeholder="Pick a model" />
      </Field>
      <Select size="sm" options={SAMPLERS} value={sampler} onValueChange={setSampler} aria-label="Small" />
      <Select size="lg" options={SAMPLERS} value={sampler} onValueChange={setSampler} aria-label="Large" />
      <Select
        options={SAMPLERS}
        value={null}
        onValueChange={() => {}}
        invalid
        placeholder="Invalid"
        aria-label="Invalid"
      />
      <Select options={SAMPLERS} value="euler" onValueChange={() => {}} disabled aria-label="Disabled" />
    </div>
  );
}
