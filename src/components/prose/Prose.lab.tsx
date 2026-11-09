// Lab page: Prose around what a Markdown renderer would give it, in both sizes.

import { Prose } from "./Prose";

function Article() {
  return (
    <>
      <h2>Getting started</h2>
      <p>
        Pick a <strong>style</strong> for the whole app, then a theme and an accent. Components read only the style's
        values, so switching it changes <a href="#prose">every screen at once</a>.
      </p>
      <h3>Install</h3>
      <p>
        Add the package and import one style's CSS: <code>iro-ui/styles/kami.css</code>.
      </p>
      <pre>
        <code>pnpm add iro-ui</code>
      </pre>
      <ul>
        <li>kami: light and plain, for apps that should read easily</li>
        <li>
          sumi and kon: darker looks
          <ul>
            <li>each with its own themes and accents</li>
          </ul>
        </li>
      </ul>
      <ol>
        <li>Wrap the app in IroRoot.</li>
        <li>Use the components.</li>
      </ol>
      <blockquote>Styles are values, not code: a new style is a new CSS file.</blockquote>
      <table>
        <thead>
          <tr>
            <th>Style</th>
            <th>Default theme</th>
            <th>Default accent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>kami</td>
            <td>light</td>
            <td>blue</td>
          </tr>
          <tr>
            <td>sumi</td>
            <td>dark</td>
            <td>violet</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <p>That's all it takes.</p>
    </>
  );
}

export default function ProseLab() {
  return (
    <div className="lab-stack">
      <h3>Medium (default)</h3>
      <Prose style={{ maxWidth: "68ch" }}>
        <Article />
      </Prose>
      <h3>Small, for replies and side panels</h3>
      <Prose size="sm" style={{ maxWidth: "60ch" }}>
        <Article />
      </Prose>
    </div>
  );
}
