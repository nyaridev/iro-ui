// Lab page: TextArea empty, filled, invalid and disabled.

import { TextArea } from "./TextArea";

export default function TextAreaLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 420 }}>
      <TextArea placeholder="A prompt…" aria-label="Prompt" />
      <TextArea defaultValue={"Two lines\nof text"} aria-label="Filled" />
      <TextArea invalid defaultValue="Something wrong" aria-label="Invalid" />
      <TextArea disabled defaultValue="Disabled" aria-label="Disabled" />
    </div>
  );
}
