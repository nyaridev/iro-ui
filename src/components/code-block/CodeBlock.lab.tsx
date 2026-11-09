// Lab page: CodeBlock bare, with a title bar, line numbers and marked lines, wrapped, with a height, and with lines
// colored by an app's highlighter.

import { CodeBlock } from "./CodeBlock";

const SNIPPET = `import { Button, IroRoot } from "iro-ui";
import "iro-ui/styles/kami.css";

export function App() {
  return (
    <IroRoot style="kami">
      <Button variant="primary">Save</Button>
    </IroRoot>
  );
}
`;

const LONG = Array.from({ length: 24 }, (_, index) => `step ${index + 1}: done in ${(index * 37) % 400} ms`).join("\n");

const WRAPPED = `curl -X POST https://api.example.com/v1/projects/website/deployments -H "Authorization: Bearer $TOKEN" -d '{"branch":"main"}'`;

// What an app's highlighter would hand over: one node per line, already colored.
const keyword = { color: "var(--iro-chart-7)" };
const text = { color: "var(--iro-chart-3)" };
const COLORED = [
  <>
    <span style={keyword}>const</span> greeting = <span style={text}>"hello"</span>
    {";"}
  </>,
  <>console.log(greeting);</>,
];

export default function CodeBlockLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 640 }}>
      <h3>Bare</h3>
      <CodeBlock code="pnpm add iro-ui" className="lab-fill" />
      <h3>Title, language, line numbers and marked lines</h3>
      <CodeBlock
        code={SNIPPET}
        title="src/App.tsx"
        language="tsx"
        lineNumbers
        highlight={[6, 7]}
        className="lab-fill"
      />
      <h3>Wrapped</h3>
      <CodeBlock code={WRAPPED} language="bash" wrap className="lab-fill" />
      <h3>With a height</h3>
      <CodeBlock code={LONG} title="build.log" lineNumbers maxHeight={180} className="lab-fill" />
      <h3>Colored by the app</h3>
      <CodeBlock
        code={'const greeting = "hello";\nconsole.log(greeting);'}
        lines={COLORED}
        language="js"
        className="lab-fill"
      />
    </div>
  );
}
