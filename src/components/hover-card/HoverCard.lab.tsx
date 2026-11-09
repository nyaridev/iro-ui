// Lab page: HoverCard previewing a person and a page, from links in a sentence.

import { Avatar } from "../avatar/Avatar";
import { Badge } from "../badge/Badge";
import { HoverCard } from "./HoverCard";

export default function HoverCardLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 520 }}>
      <p style={{ margin: 0, lineHeight: 1.7 }}>
        Reviewed by{" "}
        <HoverCard
          trigger={
            <a href="#maya" data-lab-state="hover">
              Maya Chen
            </a>
          }
        >
          <div style={{ display: "flex", gap: 12 }}>
            <Avatar name="Maya Chen" color="blue" size={40} />
            <div style={{ display: "grid", gap: 4 }}>
              <strong>Maya Chen</strong>
              <span className="lab-hint">Design lead · joined in 2023</span>
              <span>Works on the editor and the design system.</span>
            </div>
          </div>
        </HoverCard>{" "}
        and merged into{" "}
        <HoverCard trigger={<a href="#release">Release 2.4</a>} side="top">
          <div style={{ display: "grid", gap: 6 }}>
            <div className="lab-row" style={{ gap: 8 }}>
              <strong>Release 2.4</strong>
              <Badge tone="success">Shipped</Badge>
            </div>
            <span>Shared folders, faster search and a new export.</span>
            <span className="lab-hint">12 changes · 4 contributors</span>
          </div>
        </HoverCard>
        . Rest the pointer on a name, or tab to it.
      </p>
    </div>
  );
}
