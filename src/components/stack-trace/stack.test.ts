// StackTrace's reader: both trace forms, the message kept, dependencies marked internal.

import { expect, test } from "vitest";
import { parseStack } from "./stack";

test("reads a V8 trace", () => {
  const { message, frames } = parseStack(
    [
      "TypeError: Cannot read properties of undefined (reading 'map')",
      "    at toCsv (/app/src/export.ts:42:15)",
      "    at /app/src/routes.ts:10:3",
      "    at run (/app/node_modules/server/index.js:88:9)",
    ].join("\n"),
  );
  expect(message).toBe("TypeError: Cannot read properties of undefined (reading 'map')");
  expect(frames).toEqual([
    { fn: "toCsv", file: "/app/src/export.ts", line: 42, column: 15, internal: false },
    { fn: undefined, file: "/app/src/routes.ts", line: 10, column: 3, internal: false },
    { fn: "run", file: "/app/node_modules/server/index.js", line: 88, column: 9, internal: true },
  ]);
});

test("reads a Firefox trace", () => {
  const { frames } = parseStack("toCsv@http://localhost:3000/src/export.ts:42:15\n@http://localhost:3000/main.ts:3:1");
  expect(frames.map(({ fn, line }) => [fn, line])).toEqual([
    ["toCsv", 42],
    [undefined, 3],
  ]);
});
