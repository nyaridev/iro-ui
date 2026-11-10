// Template: one deployment in a hosting app. The recent deployments beside the picked one: its commit, the build's
// steps and log, the test run and the environment. Redeploy runs a fake build that streams its log step by step;
// Rollback asks first. On narrow screens the list moves into a sheet.

// ── Dependencies ──────────────────────────
import { useEffect, useState } from "react";
import {
  AlertDialog,
  Badge,
  Breadcrumbs,
  Button,
  Commit,
  EmptyState,
  EnvironmentVariables,
  Icon,
  IconButton,
  ListItem,
  Menu,
  Panel,
  PropertyList,
  Sheet,
  Spinner,
  StackTrace,
  StatusDot,
  Tabs,
  Terminal,
  TestResults,
  type TestSuite,
  Timeline,
  type TimelineItem,
  Toaster,
  toast,
} from "../../../src";
import { CopyIcon, FlaskIcon, MenuIcon, MoreHorizontalIcon, RefreshIcon, UndoIcon } from "../../../src/icons";
import {
  DEPLOYMENTS,
  type Deployment,
  type DeployStatus,
  FAILED_SUITES,
  PASSED_SUITES,
  SCRIPT,
  STEPS,
  VARIABLES,
} from "./data";

// ── Constants ─────────────────────────────
/** How fast the fake build writes its log, in ms per line. */
const LINE = 260;

const STATUS: Record<DeployStatus, { label: string; tone: "success" | "danger" | "accent" | "neutral" }> = {
  ready: { label: "Ready", tone: "success" },
  failed: { label: "Failed", tone: "danger" },
  building: { label: "Building", tone: "accent" },
  canceled: { label: "Canceled", tone: "neutral" },
};

/** Lines in the log once each step is over. */
const STEP_ENDS = STEPS.map((_, step) => SCRIPT.filter((line) => line.step <= step).length);

const withTraces = (suites: TestSuite[]): TestSuite[] =>
  suites.map((suite) => ({
    ...suite,
    tests: suite.tests.map((test) =>
      typeof test.error === "string" ? { ...test, error: <StackTrace stack={test.error} /> } : test,
    ),
  }));

const FAILED = withTraces(FAILED_SUITES);

type Tab = "build" | "tests" | "environment";

// ── Private helpers ───────────────────────
/** The build's steps as a timeline: done, running, failed or waiting. */
function stepsOf({ status, done }: Deployment): TimelineItem[] {
  return STEPS.map((step, index) => {
    const id = step.title;
    if (index < done) return { id, ...step, tone: "success" };
    if (index === done && status === "building")
      return { id, ...step, time: "Running", tone: "accent", icon: <Spinner label={`${step.title} running`} /> };
    if (index === done && status === "failed") return { id, ...step, time: "Failed", tone: "danger" };
    return { id, ...step, time: status === "building" ? "Waiting" : "Skipped", tone: "neutral" };
  });
}

/** The tests tab: nothing before the test step ends, then the run. */
function testsOf(deploy: Deployment) {
  if (deploy.status === "failed") return <TestResults title="Unit tests" suites={FAILED} />;
  if (deploy.done < 3) return <EmptyState icon={<Icon icon={FlaskIcon} />} title="The tests haven't run yet" />;
  return <TestResults title="Unit tests" suites={PASSED_SUITES} />;
}

// ── Public API ────────────────────────────
/** The deployment screen. */
export default function Deploys() {
  const [deploys, setDeploys] = useState(DEPLOYMENTS);
  const [pickedId, setPickedId] = useState(DEPLOYMENTS[0].id);
  const [tab, setTab] = useState<Tab>("build");
  const [listOpen, setListOpen] = useState(false);
  const [variables, setVariables] = useState(VARIABLES);
  const deploy = deploys.find(({ id }) => id === pickedId) ?? deploys[0];
  const building = deploys.find(({ status }) => status === "building");
  const previous = deploys.find(({ id, env, status }) => id !== deploy.id && env === deploy.env && status === "ready");

  const update = (id: string, change: (deploy: Deployment) => Deployment) =>
    setDeploys((all) => all.map((item) => (item.id === id ? change(item) : item)));

  // The fake build: one log line per tick; a step ends when its last line is out.
  useEffect(() => {
    if (!building) return;
    const timer = window.setTimeout(() => {
      const log = [...building.log, SCRIPT[building.log.length].line];
      const done = STEP_ENDS.filter((end) => log.length >= end).length;
      const finished = done === STEPS.length;
      const next: Deployment = {
        ...building,
        log,
        done,
        status: finished ? "ready" : "building",
        duration: finished ? "1m 21s" : undefined,
      };
      setDeploys((all) => all.map((item) => (item.id === next.id ? next : item)));
      if (finished) toast({ title: `Deployment #${building.id} is ready`, tone: "success" });
    }, LINE);
    return () => window.clearTimeout(timer);
  }, [building]);

  const pick = (id: string) => {
    setPickedId(id);
    setListOpen(false);
  };
  const redeploy = () => {
    const id = String(Math.max(...deploys.map((item) => Number(item.id))) + 1);
    const next: Deployment = { ...deploy, id, status: "building", done: 0, log: [], time: "Just now" };
    setDeploys((all) => [next, ...all]);
    setPickedId(id);
    setTab("build");
  };
  const cancel = () => {
    update(deploy.id, (item) => ({
      ...item,
      status: "canceled",
      log: [...item.log, { text: "Canceled", kind: "muted" }],
    }));
    toast({ title: `Deployment #${deploy.id} canceled` });
  };
  const rollback = () =>
    new Promise<void>((done) => window.setTimeout(done, 900)).then(() =>
      toast({ title: `${deploy.env} rolled back to #${previous?.id}`, tone: "success" }),
    );
  const url = `https://${deploy.env === "Production" ? "harbor-web" : `harbor-web-${deploy.id}`}.example.com`;

  const list = (
    <ul className="tpl-deploys-items" aria-label="Deployments">
      {deploys.map((item) => (
        <ListItem
          key={item.id}
          as="li"
          start={
            <StatusDot
              tone={STATUS[item.status].tone}
              label={STATUS[item.status].label}
              pulse={item.status === "building" ? "steady" : undefined}
            />
          }
          title={`#${item.id} ${item.commit.message.split("\n")[0]}`}
          description={`${item.branch} · ${item.env}`}
          meta={item.time}
          selected={item.id === deploy.id}
          onClick={() => pick(item.id)}
        />
      ))}
    </ul>
  );

  return (
    <div className="tpl-deploys">
      <aside className="tpl-deploys-list">
        <h2>Deployments</h2>
        {list}
      </aside>

      <div className="tpl-deploys-main">
        <header className="tpl-deploys-top">
          <Sheet
            side="left"
            title="Deployments"
            open={listOpen}
            onOpenChange={setListOpen}
            trigger={
              <IconButton
                className="tpl-deploys-menu"
                icon={<Icon icon={MenuIcon} />}
                label="Deployments"
                data-lab-state="click"
              />
            }
          >
            {list}
          </Sheet>
          <div className="tpl-deploys-title">
            <Breadcrumbs
              aria-label="Path"
              items={[
                { label: "harbor-web", onClick: () => undefined },
                { label: "Deployments", onClick: () => setListOpen(true) },
                { label: `#${deploy.id}` },
              ]}
            />
            <div className="tpl-deploys-heading">
              <h1>Deployment #{deploy.id}</h1>
              <Badge tone={STATUS[deploy.status].tone}>{STATUS[deploy.status].label}</Badge>
            </div>
          </div>
          <div className="tpl-deploys-actions">
            <AlertDialog
              title={`Roll back ${deploy.env.toLowerCase()} to #${previous?.id}?`}
              description="Traffic moves to the earlier build at once. You can redeploy this one later."
              confirmLabel="Roll back"
              tone="accent"
              onConfirm={rollback}
              trigger={
                <Button size="sm" icon={<Icon icon={UndoIcon} />} disabled={!previous} data-lab-state="click">
                  Rollback
                </Button>
              }
            />
            <Button
              size="sm"
              variant="primary"
              icon={<Icon icon={RefreshIcon} />}
              loading={deploy.status === "building"}
              disabled={Boolean(building) && deploy.status !== "building"}
              onClick={redeploy}
            >
              Redeploy
            </Button>
            <Menu
              align="end"
              trigger={
                <IconButton
                  size="sm"
                  icon={<Icon icon={MoreHorizontalIcon} />}
                  label="More actions"
                  data-lab-state="click"
                />
              }
              items={[
                {
                  label: "Copy URL",
                  icon: <Icon icon={CopyIcon} />,
                  onSelect: () => toast({ title: "URL copied", description: url }),
                },
                {
                  label: "Promote to production",
                  onSelect: () => toast({ title: "Promoted to production" }),
                  disabled: deploy.env === "Production" || deploy.status !== "ready",
                },
                "separator",
                { label: "Cancel deployment", danger: true, onSelect: cancel, disabled: deploy.status !== "building" },
              ]}
            />
          </div>
        </header>

        <div className="tpl-deploys-body">
          <div className="tpl-deploys-summary">
            <Commit
              hash={deploy.commit.hash}
              message={deploy.commit.message}
              author={{ name: deploy.commit.author }}
              date={deploy.commit.date}
              files={deploy.commit.files}
            />
            <Panel padded>
              <PropertyList
                properties={[
                  { label: "URL", value: deploy.status === "ready" ? url : "", mono: true, copy: url },
                  { label: "Branch", value: deploy.branch, mono: true },
                  { label: "Environment", value: deploy.env },
                  { label: "Duration", value: deploy.duration },
                  { label: "Started", value: deploy.time },
                ]}
              />
            </Panel>
          </div>

          <Tabs
            aria-label="Deployment"
            value={tab}
            onValueChange={setTab}
            tabs={[
              {
                value: "build",
                label: "Build",
                content: (
                  <div className="tpl-deploys-build">
                    <Timeline items={stepsOf(deploy)} />
                    <Terminal
                      title={`build #${deploy.id}`}
                      lines={deploy.log}
                      running={deploy.status === "building"}
                      maxHeight={300}
                    />
                  </div>
                ),
              },
              {
                value: "tests",
                label: "Tests",
                badge: deploy.status === "failed" ? <Badge tone="danger">1</Badge> : undefined,
                content: testsOf(deploy),
              },
              {
                value: "environment",
                label: "Environment",
                content: <EnvironmentVariables title={deploy.env} variables={variables} onChange={setVariables} />,
              },
            ]}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
