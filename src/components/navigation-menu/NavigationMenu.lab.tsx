// Lab page: NavigationMenu of a product site: two panels of links (one with icons), a custom panel and plain links.

import { ChartIcon } from "../../icons/set/charts";
import { BookIcon, FileTextIcon } from "../../icons/set/files";
import { UsersIcon } from "../../icons/set/people";
import { LockIcon } from "../../icons/set/security";
import { RocketIcon } from "../../icons/set/tools";
import { Icon } from "../icon/Icon";
import { NavigationMenu } from "./NavigationMenu";

export default function NavigationMenuLab() {
  return (
    <div className="lab-stack" style={{ minHeight: 360 }} data-lab-state="click">
      <NavigationMenu
        items={[
          {
            label: "Product",
            links: [
              {
                label: "Deploys",
                href: "#deploys",
                icon: <Icon icon={RocketIcon} />,
                description: "Ship from any branch in a click.",
              },
              {
                label: "Analytics",
                href: "#analytics",
                icon: <Icon icon={ChartIcon} />,
                description: "Traffic, errors and speed.",
              },
              {
                label: "Teams",
                href: "#teams",
                icon: <Icon icon={UsersIcon} />,
                description: "Roles, invites and reviews.",
              },
              {
                label: "Security",
                href: "#security",
                icon: <Icon icon={LockIcon} />,
                description: "Single sign-on and audit logs.",
              },
            ],
          },
          {
            label: "Docs",
            links: [
              { label: "Getting started", href: "#start", icon: <Icon icon={BookIcon} /> },
              { label: "Guides", href: "#guides", icon: <Icon icon={FileTextIcon} /> },
              { label: "Reference", href: "#reference", icon: <Icon icon={FileTextIcon} /> },
            ],
          },
          {
            label: "Company",
            content: (
              <div style={{ display: "grid", gap: 6, width: 260, padding: 8 }}>
                <strong>We're hiring</strong>
                <span className="lab-hint">Eight open roles, remote across Europe.</span>
              </div>
            ),
          },
          { label: "Pricing", href: "#pricing", current: true },
          { label: "Blog", href: "#blog" },
        ]}
      />
      <span className="lab-hint">Point at Product, then move to Docs: the panel follows and resizes.</span>
    </div>
  );
}
