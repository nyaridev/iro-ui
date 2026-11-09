// Lab page: DataTable sorting, picking rows and paging through them; nested rows with a totals footer; a small table
// with a height whose header stays put; and the empty and loading tables.

import { useState } from "react";
import { Badge } from "../badge/Badge";
import { Pagination } from "../pagination/Pagination";
import { DataTable, type DataTableColumn } from "./DataTable";
import { type DataTableSort, sortRows } from "./rows";

interface Service {
  id: string;
  name: string;
  team: string;
  state: "Healthy" | "Degraded" | "Down";
  requests: number;
  cost: number;
}

interface Job {
  id: string;
  name: string;
  ref: string;
  rows: number;
  seconds: number;
  steps?: Job[];
}

const NAMES = ["api-gateway", "orders-db", "edge-cache", "search", "billing", "identity", "files", "mailer"];
const TEAMS = ["Platform", "Data", "Edge", "Discovery", "Payments"];
const STATES = ["Healthy", "Healthy", "Healthy", "Degraded", "Down"] as const;
const SERVICES: Service[] = Array.from({ length: 13 }, (_, index) => ({
  id: `SVC-${String(2041 + index * 7).padStart(4, "0")}`,
  name: `${NAMES[index % NAMES.length]}${index >= NAMES.length ? "-2" : ""}`,
  team: TEAMS[index % TEAMS.length],
  state: STATES[index % STATES.length],
  requests: ((index * 7919) % 48_000) + 1_200,
  cost: Math.round((((index * 3571) % 9_000) + 400) * 1.13),
}));

const TONES = { Healthy: "success", Degraded: "warning", Down: "danger" } as const;
const money = (value: number) => `$${value.toLocaleString()}`;

const SERVICE_COLUMNS: DataTableColumn<Service>[] = [
  { id: "id", header: "ID", cell: (row) => <code>{row.id}</code>, sortValue: (row) => row.id },
  { id: "name", header: "Service", cell: (row) => row.name, sortValue: (row) => row.name },
  { id: "team", header: "Team", cell: (row) => row.team, sortValue: (row) => row.team },
  { id: "state", header: "State", cell: (row) => <Badge tone={TONES[row.state]}>{row.state}</Badge> },
  {
    id: "requests",
    header: "Requests",
    align: "end",
    cell: (row) => row.requests.toLocaleString(),
    sortValue: (row) => row.requests,
  },
  { id: "cost", header: "Cost", align: "end", cell: (row) => money(row.cost), sortValue: (row) => row.cost },
];

const step = (id: string, name: string, rows: number, seconds: number): Job => ({ id, name, ref: id, rows, seconds });
const JOBS: Job[] = [
  {
    id: "nightly-import",
    name: "Nightly import",
    ref: "JOB-12",
    rows: 48_400,
    seconds: 412,
    steps: [
      {
        id: "run-49",
        name: "Run 49",
        ref: "RUN-0049",
        rows: 9_100,
        seconds: 74,
        steps: [
          step("run-49-1", "Fetch files", 0, 12),
          step("run-49-2", "Check columns", 9_100, 9),
          step("run-49-3", "Write rows", 9_100, 53),
        ],
      },
      step("run-53", "Run 53", 19_700, 168),
      step("run-61", "Run 61", 19_600, 170),
    ],
  },
  { id: "invoice-sync", name: "Invoice sync", ref: "JOB-07", rows: 60_500, seconds: 655 },
  { id: "search-reindex", name: "Search reindex", ref: "JOB-31", rows: 57_900, seconds: 902 },
];

const JOB_COLUMNS: DataTableColumn<Job>[] = [
  { id: "name", header: "Job, run, step", cell: (row) => row.name, sortValue: (row) => row.name, footer: "All jobs" },
  { id: "ref", header: "Reference", cell: (row) => <code>{row.ref}</code> },
  {
    id: "rows",
    header: "Rows",
    align: "end",
    cell: (row) => row.rows.toLocaleString(),
    sortValue: (row) => row.rows,
    footer: JOBS.reduce((sum, job) => sum + job.rows, 0).toLocaleString(),
  },
  {
    id: "time",
    header: "Time",
    align: "end",
    cell: (row) => `${row.seconds} s`,
    sortValue: (row) => row.seconds,
    footer: `${JOBS.reduce((sum, job) => sum + job.seconds, 0)} s`,
  },
];

export default function DataTableLab() {
  const [sort, setSort] = useState<DataTableSort | null>({ column: "requests", direction: "desc" });
  const [selected, setSelected] = useState<string[]>(["SVC-2048"]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const sorting = SERVICE_COLUMNS.find(({ id }) => id === sort?.column)?.sortValue;
  // The app sorts the whole list with sortRows, then shows one page of it.
  const sorted = sort && sorting ? sortRows(SERVICES, sorting, sort.direction) : SERVICES;
  const shown = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="lab-stack">
      <h3>Sort, pick and page ({selected.length} picked)</h3>
      <DataTable
        label="Services"
        columns={SERVICE_COLUMNS}
        rows={shown}
        rowKey={(row) => row.id}
        rowLabel={(row) => row.name}
        sort={sort}
        onSortChange={setSort}
        selectable
        selected={selected}
        onSelectedChange={setSelected}
      />
      <Pagination
        page={page}
        pageSize={pageSize}
        total={SERVICES.length}
        onPageChange={setPage}
        pageSizes={[5, 10, 20]}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
      <h3>Nested rows with a totals footer</h3>
      <DataTable
        label="Jobs and their runs"
        columns={JOB_COLUMNS}
        rows={JOBS}
        rowKey={(row) => row.id}
        rowLabel={(row) => row.name}
        subRows={(row) => row.steps}
        defaultExpanded={["nightly-import", "run-49"]}
      />
      <h3>Small, with a height: the header stays put</h3>
      <DataTable
        label="All services"
        size="sm"
        maxHeight={220}
        columns={SERVICE_COLUMNS}
        rows={SERVICES}
        rowKey={(row) => row.id}
        defaultSort={{ column: "name", direction: "asc" }}
      />
      <h3>Empty</h3>
      <DataTable label="Archived services" columns={SERVICE_COLUMNS} rows={[]} rowKey={(row) => row.id} />
      <h3>Loading</h3>
      <DataTable label="Services, loading" columns={SERVICE_COLUMNS} rows={[]} rowKey={(row) => row.id} loading />
    </div>
  );
}
