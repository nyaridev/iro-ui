// Lab page: Plan part way through, with one step failed, and a custom heading.

import { Plan } from "./Plan";

export default function PlanLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 480 }}>
      <Plan
        className="lab-fill"
        steps={[
          { id: "read", label: "Read the export code", status: "done", detail: "src/export.ts" },
          { id: "test", label: "Write a test for empty rows", status: "done" },
          { id: "fix", label: "Skip empty rows", status: "running" },
          { id: "docs", label: "Update the docs", status: "waiting" },
          { id: "notes", label: "Add a release note", status: "waiting" },
        ]}
      />
      <Plan
        className="lab-fill"
        title="Migrate the database"
        steps={[
          { id: "backup", label: "Back up", status: "done" },
          { id: "migrate", label: "Run the migration", status: "error", detail: "A column is missing on 3 rows." },
          { id: "check", label: "Check the data", status: "waiting" },
        ]}
      />
    </div>
  );
}
