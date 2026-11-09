// Lab page: ToolCall running, done with its input and output open, and failed.

import { CodeBlock } from "../code-block/CodeBlock";
import { ToolCall } from "./ToolCall";

export default function ToolCallLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 600 }}>
      <ToolCall name="search_files" summary="Looking for “export”" status="running" className="lab-fill" />
      <ToolCall
        name="read_file"
        summary="src/export.ts, 120 lines"
        status="done"
        defaultOpen
        className="lab-fill"
        input={<CodeBlock code={'{ "path": "src/export.ts" }'} language="json" />}
        output={
          <CodeBlock code={'export function toCsv(rows) {\n  return rows.map(line).join("\\n");\n}'} language="ts" />
        }
      />
      <ToolCall
        name="run_command"
        summary="pnpm test"
        status="error"
        className="lab-fill"
        output={<CodeBlock code="2 tests failed: export keeps empty rows" />}
      />
    </div>
  );
}
