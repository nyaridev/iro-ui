// Lab page: Commit with a body and its changed files open, and a one-line commit without files.

import { Commit } from "./Commit";

export default function CommitLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <h3>With files</h3>
      <Commit
        hash="4f2a9c81e07b3d5a6c2f9e14b8d0a7c3e5f61b92"
        message={
          "Fix CSV export when a row has no items\n\nEmpty rows wrote a header with one column. They now keep every column."
        }
        author={{ name: "Mira Sato" }}
        date="2 hours ago"
        files={[
          { path: "src/export.ts", additions: 18, deletions: 6, status: "modified" },
          { path: "src/export.test.ts", additions: 42, deletions: 0, status: "added" },
          { path: "src/legacy/csv.ts", additions: 0, deletions: 31, status: "deleted" },
        ]}
        defaultOpen
        className="lab-fill"
      />
      <h3>Message only</h3>
      <Commit
        hash="9c1e0b7d"
        message="Update dependencies"
        author={{ name: "Leo Park" }}
        date="Mar 4"
        className="lab-fill"
      />
    </div>
  );
}
