// Lab page: TextField at every size, with start and end content, invalid and disabled.

import { CloseGlyph, InfoGlyph } from "../shared/glyphs";
import { TextField } from "./TextField";

export default function TextFieldLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 360 }}>
      <TextField size="sm" placeholder="Small" aria-label="Small" />
      <TextField placeholder="Medium" aria-label="Medium" />
      <TextField size="lg" placeholder="Large" aria-label="Large" />
      <TextField start={<InfoGlyph />} end={<CloseGlyph />} placeholder="Search files" aria-label="Search" />
      <TextField end="px" defaultValue="1024" aria-label="Width" />
      <TextField invalid defaultValue="Not a path" aria-label="Invalid" />
      <TextField disabled defaultValue="Disabled" aria-label="Disabled" />
    </div>
  );
}
