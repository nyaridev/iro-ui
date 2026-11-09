// Lab page: PackageInfo with every part, and with only a name, version and description.

import { PackageInfo } from "./PackageInfo";

export default function PackageInfoLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 480 }}>
      <h3>Full</h3>
      <PackageInfo
        name="date-kit"
        version="3.2.1"
        description="Small, tree-shakable helpers for parsing and formatting dates."
        install="pnpm add date-kit"
        details={[
          { label: "License", value: "MIT" },
          { label: "Size", value: "6.4 KB gzipped", mono: true },
          { label: "Published", value: "3 days ago" },
        ]}
        dependencies={{ "tz-data": "^2.0.0", "locale-core": "~1.4.2" }}
        links={[
          { label: "Homepage", href: "https://example.com" },
          { label: "Repository", href: "https://example.com/repo" },
        ]}
        className="lab-fill"
      />
      <h3>Minimal</h3>
      <PackageInfo name="tiny-queue" version="0.4.0" description="A first-in, first-out queue." className="lab-fill" />
    </div>
  );
}
