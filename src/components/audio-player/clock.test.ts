// The clock AudioPlayer and Transcription show.

import { expect, test } from "vitest";
import { clock } from "./clock";

test("reads seconds as a clock", () => {
  expect([0, 7.9, 750, 3725].map(clock)).toEqual(["0:00", "0:07", "12:30", "1:02:05"]);
});

test("reads a missing duration as 0:00", () => {
  expect([Number.NaN, Number.POSITIVE_INFINITY, -3].map(clock)).toEqual(["0:00", "0:00", "0:00"]);
});
