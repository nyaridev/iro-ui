// Lab page: TagInput with tags, empty with a placeholder, with a limit, small, and turned off.

import { useState } from "react";
import { Field } from "../field/Field";
import { TagInput } from "./TagInput";

export default function TagInputLab() {
  const [tags, setTags] = useState(["design", "research", "q4"]);
  const [emails, setEmails] = useState<string[]>([]);
  const [topics, setTopics] = useState(["ui", "docs"]);
  return (
    <div className="lab-stack" style={{ maxWidth: 420 }}>
      <h3>In a Field (Enter or a comma adds)</h3>
      <Field label="Tags" className="lab-fill">
        <TagInput value={tags} onValueChange={setTags} placeholder="Add a tag" />
      </Field>
      <h3>Empty, with a placeholder</h3>
      <TagInput
        aria-label="Invite by email"
        value={emails}
        onValueChange={setEmails}
        placeholder="name@example.com, another@example.com"
        className="lab-fill"
      />
      <h3>Three at most, small</h3>
      <TagInput aria-label="Topics" size="sm" max={3} value={topics} onValueChange={setTopics} className="lab-fill" />
      <h3>Turned off</h3>
      <TagInput aria-label="Locked tags" value={["archived"]} onValueChange={() => undefined} disabled />
    </div>
  );
}
