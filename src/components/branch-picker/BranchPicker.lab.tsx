// Lab page: BranchPicker under an answer with three versions, at the first version, and with one version (nothing).

import { useState } from "react";
import { Message } from "../message/Message";
import { BranchPicker } from "./BranchPicker";

const VERSIONS = [
  "Blank rows come from the importer: it adds one at the end of each file.",
  "The importer adds a blank row at the end of every file since version 2.4, and the export keeps it.",
  "Since 2.4 the importer appends an empty row to each file. The export writes every row it gets, so the empty one ends up in your CSV.",
];

export default function BranchPickerLab() {
  const [version, setVersion] = useState(VERSIONS.length - 1);
  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <h3>In a message</h3>
      <Message
        from="assistant"
        actions={<BranchPicker count={VERSIONS.length} index={version} onIndexChange={setVersion} />}
        className="lab-fill"
      >
        {VERSIONS[version]}
      </Message>
      <h3>At the first version</h3>
      <BranchPicker count={3} defaultIndex={0} />
      <h3>One version</h3>
      <p className="lab-hint">Nothing shows:</p>
      <BranchPicker count={1} />
    </div>
  );
}
