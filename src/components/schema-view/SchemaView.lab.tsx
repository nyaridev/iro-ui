// Lab page: SchemaView as an endpoint's body with a nested object open, as plain fields, and every method's color.

import { SchemaView } from "./SchemaView";

const METHODS = ["get", "post", "put", "patch", "delete"];

export default function SchemaViewLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 560 }}>
      <h3>Endpoint</h3>
      <SchemaView
        method="post"
        title="/v1/projects"
        description="Creates a project and returns it."
        defaultOpen
        fields={[
          { name: "name", type: "string", required: true, description: "Shown in the sidebar; 1 to 64 characters." },
          { name: "visibility", type: '"private" | "public"', default: '"private"' },
          {
            name: "settings",
            type: "object",
            description: "Optional; missing settings take their defaults.",
            children: [
              { name: "region", type: "string", default: '"eu-west"' },
              { name: "retention", type: "number", description: "Days to keep logs." },
            ],
          },
          { name: "tags", type: "string[]" },
        ]}
        className="lab-fill"
      />
      <h3>Fields only</h3>
      <SchemaView
        fields={[
          { name: "id", type: "string", required: true },
          { name: "createdAt", type: "Date", required: true },
        ]}
        className="lab-fill"
      />
      <h3>Methods</h3>
      <div className="lab-row">
        {METHODS.map((method) => (
          <SchemaView key={method} method={method} title="/v1/items" fields={[]} />
        ))}
      </div>
    </div>
  );
}
