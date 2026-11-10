// Template: an assistant chat. A conversation with reasoning, tool calls, a plan, sources and a confirmation, a usage
// meter, and a prompt box; sending asks a fake assistant whose answer thinks, then streams in word by word. Messages
// sent while it answers wait in the queue. Copy copies an answer, Try again writes a new one (the first answer keeps
// every version to step between), and the paperclip attaches files to the next message. Built from the public entries.

// ── Dependencies ──────────────────────────
import { useEffect, useRef, useState } from "react";
import {
  Attachment,
  BranchPicker,
  type ChatSource,
  Citation,
  CodeBlock,
  Confirmation,
  Conversation,
  CopyButton,
  Icon,
  IconButton,
  Marker,
  Message,
  Plan,
  PromptInput,
  Prose,
  Queue,
  type QueueItem,
  Reasoning,
  Sources,
  Suggestions,
  ToolCall,
  UsageMeter,
} from "../../../src";
import { PaperclipIcon, RefreshIcon, SparkleIcon } from "../../../src/icons";

// ── Constants ─────────────────────────────
const SOURCES: ChatSource[] = [
  { title: "Exporting your data", href: "#export", site: "help.example.com", description: "CSV and JSON exports." },
  { title: "Release notes 2.4", href: "#notes", site: "example.com", description: "The new export." },
];

const REPLY =
  "Done. Rows are now skipped when every field is empty, and the new test covers a file with blank lines at the end. The export keeps rows that have at least one value, so nothing you entered goes missing.";

/** The first answer's versions as plain text, for copying; the second is the long one with tool calls. */
const VERSIONS = [
  "Some rows have no values at all. The export keeps them, so they show up as empty lines.",
  "The export writes every row it receives, including rows where every field is blank. Since version 2.4 the importer adds a blank row at the end of each file, and the export keeps it.",
  "Those are blank rows the importer adds at the end of each file since 2.4; the export writes them out like any other row.",
  "The empty lines are rows where every field is blank. The export doesn't skip them yet.",
];

/** How long the fake assistant thinks, and how fast its words come, in ms. */
const THINK = 1200;
const WORD = 60;

// ── Types ─────────────────────────────────
interface Attached {
  id: string;
  name: string;
  size: number;
  kind: string;
}

interface Exchange {
  id: string;
  question: string;
  files: Attached[];
  answer: string;
  thinking: boolean;
  /** Whole, or stopped. */
  done: boolean;
}

// ── Private helpers ───────────────────────
const avatar = <Icon icon={SparkleIcon} size={18} />;

/** A new exchange for question, thinking first. */
const exchangeFor = (question: string, files: Attached[]): Exchange => ({
  id: String(Date.now()),
  question,
  files,
  answer: "",
  thinking: true,
  done: false,
});

/** "PDF" from "report.pdf". */
const kindOf = (name: string) => (name.includes(".") ? (name.split(".").pop() ?? "").toUpperCase() : "FILE");

/** Copy and Try again under an answer. */
const actions = (text: string, retry: () => void) => (
  <>
    <CopyButton text={text} />
    <IconButton size="sm" icon={<Icon icon={RefreshIcon} />} label="Try again" onClick={retry} />
  </>
);

// ── Public API ────────────────────────────
/** The chat screen. */
export default function Chat() {
  const picker = useRef<HTMLInputElement>(null);
  const waiting = useRef(new Map<string, Attached[]>());
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [text, setText] = useState("");
  const [attached, setAttached] = useState<Attached[]>([]);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [allowed, setAllowed] = useState<"pending" | "allowed" | "denied">("pending");
  const [versions, setVersions] = useState(2);
  const [version, setVersion] = useState(1);
  const timer = useRef<number | undefined>(undefined);
  const current = exchanges.find((exchange) => !exchange.done);
  const streaming = Boolean(current);

  // The fake assistant: think, then add a word at a time until the reply is whole.
  useEffect(() => {
    if (!current) return;
    const step = () =>
      setExchanges((all) =>
        all.map((exchange) => {
          if (exchange.id !== current.id) return exchange;
          if (exchange.thinking) return { ...exchange, thinking: false };
          const next = REPLY.indexOf(" ", exchange.answer.length + 1);
          return next === -1
            ? { ...exchange, answer: REPLY, done: true }
            : { ...exchange, answer: REPLY.slice(0, next) };
        }),
      );
    timer.current = window.setTimeout(step, current.thinking ? THINK : WORD);
    return () => window.clearTimeout(timer.current);
  }, [current]);

  // When an answer ends, the next queued message goes, with the files it was sent with.
  useEffect(() => {
    if (streaming || queue.length === 0) return;
    const [next, ...rest] = queue;
    setQueue(rest);
    setExchanges((all) => [...all, exchangeFor(next.text, waiting.current.get(next.id) ?? [])]);
    waiting.current.delete(next.id);
  }, [streaming, queue]);

  const send = (value: string) => {
    if (streaming) {
      const id = String(Date.now());
      waiting.current.set(id, attached);
      setQueue([...queue, { id, text: value }]);
    } else setExchanges((all) => [...all, exchangeFor(value, attached)]);
    setText("");
    setAttached([]);
  };
  const stop = () =>
    setExchanges((all) =>
      all.map((exchange) =>
        exchange.id === current?.id
          ? { ...exchange, thinking: false, done: true, answer: `${exchange.answer} …` }
          : exchange,
      ),
    );
  const retry = (id: string) =>
    setExchanges((all) =>
      all.map((exchange) => (exchange.id === id ? { ...exchange, answer: "", thinking: true, done: false } : exchange)),
    );
  const attach = (files: File[]) =>
    setAttached((all) => [
      ...all,
      ...files.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        kind: kindOf(file.name),
      })),
    ]);
  const chips = (files: Attached[], remove?: (id: string) => void) =>
    files.length === 0
      ? undefined
      : files.map((file) => (
          <Attachment
            key={file.id}
            name={file.name}
            size={file.size}
            kind={file.kind}
            onRemove={remove ? () => remove(file.id) : undefined}
          />
        ));

  return (
    <div className="tpl-chat">
      <header className="tpl-chat-top">
        <div className="tpl-chat-title">
          <h1>Fix empty rows in export</h1>
          <span>Project: website</span>
        </div>
        <UsageMeter
          used={84_000}
          total={200_000}
          unit="tokens"
          parts={[
            { name: "Messages", value: 52_000 },
            { name: "Files", value: 24_000 },
            { name: "Tools", value: 8_000 },
          ]}
        />
      </header>

      <Conversation className="tpl-chat-conversation" busy={streaming}>
        <Marker>Today</Marker>
        <Message from="user" attachments={<Attachment name="export.csv" kind="CSV" size={48_200} />}>
          Why do some exports have empty rows?
        </Message>
        <Message
          from="assistant"
          avatar={avatar}
          actions={
            <>
              <BranchPicker count={versions} index={version} onIndexChange={setVersion} />
              {actions(VERSIONS[version % VERSIONS.length], () => {
                setVersion(versions);
                setVersions(versions + 1);
              })}
            </>
          }
        >
          {version === 1 ? (
            <>
              <div className="tpl-chat-steps">
                <Reasoning duration={9}>
                  The file has rows with only commas. The export writes every row it gets, so I should find where rows
                  are built and check whether blank ones are dropped.
                </Reasoning>
                <ToolCall name="read_file" summary="src/export.ts" status="done" />
                <ToolCall
                  name="search"
                  summary="“join(” in src"
                  status="done"
                  output={<CodeBlock code={'src/export.ts:42  return rows.map(line).join("\\n");'} />}
                />
              </div>
              <Prose size="sm">
                <p>
                  The export writes every row it receives, including rows where every field is blank{" "}
                  <Citation index={1} source={SOURCES[0]} />. Since version 2.4 the importer adds a blank row at the end
                  of each file <Citation index={2} source={SOURCES[1]} />, and the export keeps it.
                </p>
              </Prose>
              <Sources sources={SOURCES} />
            </>
          ) : (
            <Prose size="sm">
              <p>{VERSIONS[version % VERSIONS.length]}</p>
            </Prose>
          )}
        </Message>
        <Message from="user">Can you fix it and add a test?</Message>
        <Message from="assistant" avatar={avatar}>
          <div className="tpl-chat-steps">
            <Plan
              steps={[
                { id: "read", label: "Find where rows are written", status: "done" },
                { id: "fix", label: "Skip rows with no values", status: "done" },
                { id: "test", label: "Add a test for blank rows", status: "running" },
                { id: "check", label: "Run the tests", status: "waiting" },
              ]}
            />
            <Confirmation
              title="Run a command in your project"
              state={allowed}
              onAllow={() => setAllowed("allowed")}
              onDeny={() => setAllowed("denied")}
            >
              <CodeBlock code="pnpm test export" language="bash" />
            </Confirmation>
          </div>
        </Message>
        {exchanges.map((exchange) => (
          <div key={exchange.id} className="tpl-chat-exchange">
            <Message from="user" attachments={chips(exchange.files)}>
              {exchange.question}
            </Message>
            <Message
              from="assistant"
              avatar={avatar}
              streaming={exchange === current && !exchange.thinking}
              actions={exchange.done ? actions(exchange.answer, () => retry(exchange.id)) : undefined}
            >
              <Reasoning streaming={exchange.thinking} duration={THINK / 1000}>
                Checking what changed and what the tests cover.
              </Reasoning>
              {exchange.answer ? (
                <Prose size="sm">
                  <p>{exchange.answer}</p>
                </Prose>
              ) : null}
            </Message>
          </div>
        ))}
      </Conversation>

      <footer className="tpl-chat-bottom">
        <Queue items={queue} onRemove={(id) => setQueue(queue.filter((item) => item.id !== id))} />
        {exchanges.length === 0 ? (
          <Suggestions onPick={send} suggestions={["Run the tests now", "Show me the diff", "Also check the import"]} />
        ) : null}
        <input
          ref={picker}
          type="file"
          multiple
          hidden
          onChange={(event) => {
            attach([...(event.target.files ?? [])]);
            event.target.value = "";
          }}
        />
        <PromptInput
          value={text}
          onValueChange={setText}
          onSubmit={send}
          streaming={streaming}
          onStop={stop}
          placeholder="Ask about this project"
          attachments={chips(attached, (id) => setAttached(attached.filter((file) => file.id !== id)))}
          tools={
            <IconButton
              size="sm"
              icon={<Icon icon={PaperclipIcon} />}
              label="Attach a file"
              onClick={() => picker.current?.click()}
            />
          }
        />
      </footer>
    </div>
  );
}
