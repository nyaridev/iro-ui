// Lab page: FileTree with folders open, a selected file, unsaved changes and meta.

import { useState } from "react";
import { type FileNode, FileTree } from "./FileTree";

const NODES: FileNode[] = [
  { name: "package.json", meta: "1 KB" },
  { name: "README.md", meta: "4 KB" },
  {
    name: "src",
    children: [
      { name: "main.tsx" },
      { name: "App.tsx", dirty: true },
      { name: "components", children: [{ name: "Cart.tsx" }, { name: "Header.tsx" }, { name: "Price.tsx" }] },
      { name: "styles", children: [{ name: "app.css" }] },
    ],
  },
  { name: "public", children: [] },
  { name: "tests", children: [{ name: "cart.test.ts" }] },
];

export default function FileTreeLab() {
  const [selected, setSelected] = useState("src/App.tsx");
  return (
    <div className="lab-stack" style={{ width: 280 }}>
      <FileTree
        nodes={NODES}
        selected={selected}
        onSelect={setSelected}
        defaultOpen={["src", "src/components"]}
        className="lab-fill"
      />
      <p className="lab-hint">Selected: {selected}</p>
    </div>
  );
}
