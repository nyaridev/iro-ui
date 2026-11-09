// Lab page: WebPreview showing a page's own HTML, and a pretend browser whose address can be edited. Both pages are
// built here, so the Lab never waits on the network.

import { useState } from "react";
import { WebPreview } from "./WebPreview";

// A generated page brings its own colors; these are the page's, not the Lab's.
const page = (title: string, text: string) => `<!doctype html>
<html><body style="margin:0;font:15px system-ui;display:grid;place-items:center;height:100vh">
  <main style="text-align:center">
    <h1 style="margin:0 0 8px;font-size:22px">${title}</h1>
    <p style="margin:0 0 16px;opacity:.7">${text}</p>
    <button onclick="this.textContent = 'Clicked'" style="font:inherit;padding:6px 14px">Click me</button>
  </main>
</body></html>`;

export default function WebPreviewLab() {
  const [url, setUrl] = useState("https://example.com/welcome");
  return (
    <div className="lab-stack" style={{ maxWidth: 640 }}>
      <h3>HTML</h3>
      <WebPreview
        title="Generated page"
        html={page("Hello", "A page built from HTML, in a sandbox.")}
        height={240}
        className="lab-fill"
      />
      <h3>Address</h3>
      <WebPreview
        title="Preview"
        src={url}
        html={page("You are here", url.replace(/[<>&"]/g, ""))}
        onNavigate={setUrl}
        height={240}
        className="lab-fill"
      />
      <p className="lab-hint">Type an address and press Enter; back and forward step through the ones visited.</p>
    </div>
  );
}
