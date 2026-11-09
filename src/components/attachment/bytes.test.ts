// Attachment's sizes: steps of 1000, one decimal under 10.

import { expect, test } from "vitest";
import { formatBytes } from "./bytes";

test("picks the unit and rounds", () => {
  expect(formatBytes(820)).toBe("820 B");
  expect(formatBytes(14_200)).toBe("14 KB");
  expect(formatBytes(3_240_000)).toBe("3.2 MB");
  expect(formatBytes(999_999)).toBe("1000 KB");
  expect(formatBytes(-5)).toBe("0 B");
});
