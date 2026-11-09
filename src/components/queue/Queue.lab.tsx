// Lab page: Queue of messages waiting, removable and sendable now.

import { useState } from "react";
import { Queue } from "./Queue";

export default function QueueLab() {
  const [items, setItems] = useState([
    { id: "a", text: "Also check the import code for the same problem" },
    { id: "b", text: "Then open a pull request" },
  ]);
  const drop = (id: string) => setItems(items.filter((item) => item.id !== id));
  return (
    <div className="lab-stack" style={{ maxWidth: 520 }}>
      <Queue className="lab-fill" items={items} onRemove={drop} onSendNow={drop} />
      {items.length === 0 ? <span className="lab-hint">Nothing queued: the queue hides itself.</span> : null}
    </div>
  );
}
