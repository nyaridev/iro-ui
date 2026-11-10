// Template part: Settings' billing panel. The plan and what it uses, the card on file, and past invoices.

// ── Dependencies ──────────────────────────
import {
  Badge,
  Button,
  DataTable,
  type DataTableColumn,
  Icon,
  IconButton,
  Meter,
  Panel,
  SectionTitle,
  toast,
} from "../../../src";
import { DownloadIcon, StoreIcon } from "../../../src/icons";
import { INVOICES } from "./data";

// ── Constants ─────────────────────────────
type Invoice = (typeof INVOICES)[number];

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const COLUMNS: DataTableColumn<Invoice>[] = [
  { id: "date", header: "Month", cell: (row) => row.date },
  { id: "amount", header: "Amount", align: "end", cell: (row) => money.format(row.amount) },
  {
    id: "status",
    header: "Status",
    cell: (row) => <Badge tone={row.paid ? "success" : "warning"}>{row.paid ? "Paid" : "Due Nov 15"}</Badge>,
  },
  {
    id: "download",
    header: "PDF",
    align: "end",
    cell: (row) => (
      <IconButton
        size="sm"
        icon={<Icon icon={DownloadIcon} />}
        label={`Download ${row.id}`}
        onClick={() => toast({ title: `Downloading ${row.id}.pdf` })}
      />
    ),
  },
];

// ── Public API ────────────────────────────
/** The billing panel. */
export function Billing({ id }: { id: string }) {
  return (
    <Panel as="section" padded id={id} className="tpl-settings-panel">
      <SectionTitle
        level={2}
        actions={
          <Button size="sm" variant="ghost">
            Compare plans
          </Button>
        }
      >
        Billing
      </SectionTitle>
      <div className="tpl-settings-plan">
        <div>
          <strong>
            Team plan <Badge tone="accent">Monthly</Badge>
          </strong>
          <span>$12 per seat a month · renews on Dec 1</span>
        </div>
        <Button size="sm" variant="primary">
          Upgrade
        </Button>
      </div>
      <div className="tpl-settings-pair">
        <Meter label="Seats" value={8} max={10} valueText="8 of 10" />
        <Meter label="Storage" value={36} max={50} valueText="36 of 50 GB" />
      </div>
      <ul className="tpl-settings-list">
        <li>
          <Icon icon={StoreIcon} />
          <div>
            <strong>Card ending 4242</strong>
            <span>Expires 08/28 · billing@example.com</span>
          </div>
          <Button size="sm" variant="ghost">
            Update
          </Button>
        </li>
      </ul>
      <DataTable label="Invoices" size="sm" columns={COLUMNS} rows={INVOICES} rowKey={(row) => row.id} />
    </Panel>
  );
}
