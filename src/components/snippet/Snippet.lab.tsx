// Lab page: Snippet as a command, without the prompt, and long enough to scroll.

import { Snippet } from "./Snippet";

export default function SnippetLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 420 }}>
      <h3>Command</h3>
      <Snippet code="pnpm add iro-ui" className="lab-fill" />
      <h3>No prompt</h3>
      <Snippet code="https://example.com/invite/4f2a9c" prompt={false} copyLabel="Copy link" className="lab-fill" />
      <h3>Long</h3>
      <Snippet
        code="docker run --rm -p 8080:8080 -v ./data:/app/data example/server:latest --workers 4"
        className="lab-fill"
      />
    </div>
  );
}
