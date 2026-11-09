// Lab page: Breadcrumbs short, with an icon on the first step, and long with its middle folded into a menu.

import { useState } from "react";
import { HomeIcon } from "../../icons/set/places";
import { Icon } from "../icon/Icon";
import { type BreadcrumbItem, Breadcrumbs } from "./Breadcrumbs";

const PATH = ["Workspace", "Projects", "Website", "Pages", "Pricing", "Hero section"];

export default function BreadcrumbsLab() {
  const [depth, setDepth] = useState(PATH.length);
  const items = (names: string[]): BreadcrumbItem[] =>
    names.map((label, index) => ({
      label,
      icon: index === 0 ? <Icon icon={HomeIcon} /> : undefined,
      onClick: () => setDepth(index + 1),
    }));

  return (
    <div className="lab-stack">
      <h3>Short</h3>
      <Breadcrumbs items={items(PATH.slice(0, 3))} />
      <h3>Long: the middle folds (pick a step to go back up)</h3>
      <Breadcrumbs items={items(PATH.slice(0, depth))} />
      <h3>Links, three at most</h3>
      <Breadcrumbs
        max={3}
        items={[
          { label: "Docs", href: "#docs" },
          { label: "Components", href: "#components" },
          { label: "Display", href: "#display" },
          { label: "Breadcrumbs" },
        ]}
      />
    </div>
  );
}
