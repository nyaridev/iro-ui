// Lab page: Conversation in a fixed-height box; "Add a message" grows it while it follows the bottom. Scroll up
// and add another to see "Latest".

import { useState } from "react";
import { Button } from "../button/Button";
import { Message } from "../message/Message";
import { Conversation } from "./Conversation";

const LINES = [
  "What changed in the last release?",
  "Shared folders, faster search and a new export to CSV and JSON.",
  "Is the export available on every plan?",
  "Yes, on every plan. Large exports run in the background and email you a link.",
];

export default function ConversationLab() {
  const [count, setCount] = useState(LINES.length);
  return (
    <div className="lab-stack">
      <Button size="sm" onClick={() => setCount(count + 1)}>
        Add a message
      </Button>
      <div
        className="lab-fill"
        style={{
          height: 320,
          display: "flex",
          flexDirection: "column",
          border: "1px solid var(--iro-line)",
          borderRadius: "var(--iro-radius-lg)",
          background: "var(--iro-surface)",
        }}
      >
        <Conversation style={{ flex: 1 }}>
          {Array.from({ length: count }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: messages only get added at the end.
            <Message key={index} from={index % 2 === 0 ? "user" : "assistant"}>
              {LINES[index % LINES.length]}
            </Message>
          ))}
        </Conversation>
      </div>
    </div>
  );
}
