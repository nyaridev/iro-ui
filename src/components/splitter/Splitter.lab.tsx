// Lab page: two panes with a Splitter between them; the saved share shows under them.

import { useRef, useState } from "react";
import { Splitter } from "./Splitter";

const DEFAULT_SHARE = 0.4;

export default function SplitterLab() {
  const row = useRef<HTMLDivElement>(null);
  const [share, setShare] = useState(DEFAULT_SHARE);
  const [saved, setSaved] = useState(DEFAULT_SHARE);

  return (
    <div className="lab-stack" style={{ alignItems: "stretch" }}>
      <div ref={row} style={{ display: "flex", height: 140 }}>
        <div className="lab-card" style={{ flex: `0 0 calc(${share * 100}% - 12px)` }}>
          Start pane
        </div>
        <Splitter
          container={row}
          share={share}
          onShareChange={setShare}
          onCommit={setSaved}
          onReset={() => {
            setShare(DEFAULT_SHARE);
            setSaved(DEFAULT_SHARE);
          }}
          minStart={160}
          minEnd={160}
        />
        <div className="lab-card" style={{ flex: 1 }}>
          End pane
        </div>
      </div>
      <p className="lab-hint">
        Share {Math.round(share * 100)}%, saved {Math.round(saved * 100)}%. Drag, use ← → when focused, or double-click
        to reset.
      </p>
    </div>
  );
}
