import { describe, expect, it } from "vitest";
import { computeStreaks } from "./worklogStreaks";

const day = (key: string, minutes: number) => ({ key, minutes });

describe("computeStreaks", () => {
  it("returns all zeros for an empty list", () => {
    expect(computeStreaks([])).toEqual({
      current: 0,
      longest: 0,
      currentEndsOn: null,
      longestEndsOn: null,
    });
  });

  it("reports a current streak ending today", () => {
    const result = computeStreaks([
      day("2026-06-01", 120),
      day("2026-06-02", 240),
      day("2026-06-03", 300),
    ]);
    expect(result.current).toBe(3);
    expect(result.longest).toBe(3);
    expect(result.currentEndsOn).toBe("2026-06-03");
    expect(result.longestEndsOn).toBe("2026-06-03");
  });

  it("breaks the streak when a day is missing", () => {
    const result = computeStreaks([
      day("2026-06-01", 240),
      day("2026-06-02", 0), // gap
      day("2026-06-03", 240),
    ]);
    // Two separate 1-day streaks. The "current" one ends on the
    // last day (Jun 3), so the longest is also 1.
    expect(result.current).toBe(1);
    expect(result.longest).toBe(1);
    expect(result.currentEndsOn).toBe("2026-06-03");
    expect(result.longestEndsOn).toBe("2026-06-03");
  });

  it("only counts days that meet the threshold", () => {
    const result = computeStreaks([
      day("2026-06-01", 30), // 30m — below the 60m threshold
      day("2026-06-02", 30),
      day("2026-06-03", 30),
    ]);
    expect(result.current).toBe(0);
    expect(result.longest).toBe(0);
  });

  it("keeps the longest streak separate from the current one", () => {
    const result = computeStreaks([
      // Long streak earlier in the range
      day("2026-06-01", 240),
      day("2026-06-02", 240),
      day("2026-06-03", 240),
      day("2026-06-04", 240),
      // Gap
      day("2026-06-05", 0),
      day("2026-06-06", 0),
      // Shorter current streak
      day("2026-06-07", 240),
      day("2026-06-08", 240),
    ]);
    expect(result.current).toBe(2);
    expect(result.longest).toBe(4);
    expect(result.currentEndsOn).toBe("2026-06-08");
    expect(result.longestEndsOn).toBe("2026-06-04");
  });

  it("breaks when the last day does not qualify (no current streak)", () => {
    const result = computeStreaks([
      day("2026-06-01", 240),
      day("2026-06-02", 240),
      day("2026-06-03", 30), // below threshold; today is "rest"
    ]);
    expect(result.current).toBe(0);
    expect(result.currentEndsOn).toBeNull();
    // The longest still counts the 2 qualifying days.
    expect(result.longest).toBe(2);
  });

  it("treats non-consecutive day keys with the same date as consecutive", () => {
    // Defensive: callers should pass yyyy-mm-dd, but if two keys
    // happen to land on the same calendar day the walker should
    // not double-count them.
    const result = computeStreaks([
      day("2026-06-01", 240),
      day("2026-06-01", 240), // duplicate — same day
      day("2026-06-02", 240),
    ]);
    expect(result.longest).toBe(2);
  });
});
