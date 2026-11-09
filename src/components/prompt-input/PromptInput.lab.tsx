// Lab page: PromptInput with tools and attachments, sending into a list; and one while an answer streams.

import { useState } from "react";
import { PaperclipIcon } from "../../icons/set/files";
import { Attachment } from "../attachment/Attachment";
import { Icon } from "../icon/Icon";
import { IconButton } from "../icon-button/IconButton";
import { Segmented } from "../segmented/Segmented";
import { PromptInput } from "./PromptInput";

export default function PromptInputLab() {
  const [text, setText] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const [files, setFiles] = useState(["notes.md"]);
  const [mode, setMode] = useState("ask");
  return (
    <div className="lab-stack" style={{ maxWidth: 640 }}>
      <h3>Enter sends, Shift+Enter starts a new line</h3>
      <PromptInput
        className="lab-fill"
        value={text}
        onValueChange={setText}
        onSubmit={(value) => {
          setSent([...sent, value]);
          setText("");
        }}
        attachments={
          files.length
            ? files.map((name) => (
                <Attachment
                  key={name}
                  name={name}
                  kind="MD"
                  size={4_200}
                  onRemove={() => setFiles(files.filter((file) => file !== name))}
                />
              ))
            : undefined
        }
        tools={
          <>
            <IconButton size="sm" icon={<Icon icon={PaperclipIcon} />} label="Attach a file" />
            <Segmented
              size="sm"
              aria-label="Mode"
              value={mode}
              onValueChange={setMode}
              options={[
                { value: "ask", label: "Ask" },
                { value: "plan", label: "Plan" },
              ]}
            />
          </>
        }
      />
      <span className="lab-hint">Sent: {sent.length ? sent.join(" · ") : "nothing yet"}</span>
      <h3>While an answer streams</h3>
      <PromptInput
        className="lab-fill"
        value="And the costs?"
        onValueChange={() => undefined}
        onSubmit={() => undefined}
        streaming
        onStop={() => undefined}
      />
    </div>
  );
}
