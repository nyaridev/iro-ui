// Lab page: Divider across a stack and between items in a row.

import { Divider } from "./Divider";

export default function DividerLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 360, alignItems: "stretch" }}>
      <span>Above</span>
      <Divider />
      <span>Below</span>
      <div className="lab-row" style={{ height: 24 }}>
        <span>Left</span>
        <Divider orientation="vertical" />
        <span>Middle</span>
        <Divider orientation="vertical" />
        <span>Right</span>
      </div>
    </div>
  );
}
