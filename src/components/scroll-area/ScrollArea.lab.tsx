// Lab page: ScrollArea down with a fade, sideways, and both ways.

import { Panel } from "../panel/Panel";
import { ScrollArea } from "./ScrollArea";

const LINES = Array.from({ length: 30 }, (_, index) => `Line ${index + 1}: a row of text to scroll past`);
const TAGS = ["design", "research", "engineering", "marketing", "sales", "support", "finance", "legal", "ops", "data"];

export default function ScrollAreaLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 420 }}>
      <h3>Down, fading at the edges</h3>
      <Panel padded={false} className="lab-fill">
        <ScrollArea maxHeight={200} fade aria-label="Lines">
          <div style={{ padding: 16, display: "grid", gap: 8 }}>
            {LINES.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </ScrollArea>
      </Panel>
      <h3>Sideways</h3>
      <Panel padded={false} className="lab-fill">
        <ScrollArea direction="horizontal" aria-label="Tags">
          <div style={{ display: "flex", gap: 8, padding: 12 }}>
            {TAGS.map((tag) => (
              <span key={tag} className="lab-chip">
                {tag}
              </span>
            ))}
          </div>
        </ScrollArea>
      </Panel>
      <h3>Both ways</h3>
      <Panel padded={false} className="lab-fill">
        <ScrollArea direction="both" maxHeight={160} aria-label="Grid">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 80px)", gap: 8, padding: 12 }}>
            {Array.from({ length: 96 }, (_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: a fixed demo grid.
              <span key={index} className="lab-chip" style={{ textAlign: "center" }}>
                {index + 1}
              </span>
            ))}
          </div>
        </ScrollArea>
      </Panel>
    </div>
  );
}
