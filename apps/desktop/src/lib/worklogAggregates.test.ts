import { describe, expect, it } from "vitest";
import { aggregateWithSegments, averageFraction } from "./worklogAggregates";
import type { WorklogMetricEntry } from "./types";

const entry = (
  id: string,
  occurredAt: string,
  durationMinutes: number,
  taskTitle: string,
  folderName: string | null = null,
): WorklogMetricEntry => ({
  id,
  taskId: id,
  taskTitle,
  folderName,
  contentMarkdown: "",
  occurredAt,
  durationMinutes,
});

describe("aggregateWithSegments", () => {
  it("buckets by week and returns segments ordered by minutes", () => {
    // June 1 2026 is a Monday. Use the same Monday-rollup the
    // worklog view uses (weekLabel) so the two entries on different
    // weekdays land in the same bucket.
    const weekLabel = (value: string) => {
      const date = new Date(value);
      const monday = new Date(date);
      const day = (date.getUTCDay() + 6) % 7;
      monday.setUTCDate(date.getUTCDate() - day);
      return `${monday.getUTCMonth() + 1}/${monday.getUTCDate()}`;
    };
    const entries = [
      entry("1", "2026-06-01T09:00:00Z", 120, "Release notes"), // Mon
      entry("2", "2026-06-02T09:00:00Z", 60, "Sidebar"), // Tue — same week
      // Different week
      entry("3", "2026-06-08T09:00:00Z", 240, "Release notes"), // Mon
      entry("4", "2026-06-08T11:00:00Z", 60, "Sidebar"), // Mon — same week
    ];
    const items = aggregateWithSegments(
      entries,
      "week",
      weekLabel,
      (e) => e.taskTitle,
      2,
    );
    expect(items).toHaveLength(2);
    // Newest first because of the .reverse() in aggregateWithSegments
    expect(items[0]?.label).toBe("6/8");
    expect(items[0]?.minutes).toBe(300);
    expect(items[0]?.segments).toEqual([
      { label: "Release notes", minutes: 240 },
      { label: "Sidebar", minutes: 60 },
    ]);
    expect(items[1]?.label).toBe("6/1");
    expect(items[1]?.minutes).toBe(180);
    expect(items[1]?.segments).toEqual([
      { label: "Release notes", minutes: 120 },
      { label: "Sidebar", minutes: 60 },
    ]);
  });

  it("returns only top N segments per bucket", () => {
    const entries = [
      entry("a", "2026-06-01T09:00:00Z", 100, "A"),
      entry("b", "2026-06-01T10:00:00Z", 50, "B"),
      entry("c", "2026-06-01T11:00:00Z", 30, "C"),
      entry("d", "2026-06-01T12:00:00Z", 10, "D"),
    ];
    const items = aggregateWithSegments(
      entries,
      "month",
      () => "Jun 26",
      (e) => e.taskTitle,
      2,
    );
    expect(items[0]?.segments).toEqual([
      { label: "A", minutes: 100 },
      { label: "B", minutes: 50 },
    ]);
    // The bucket's total still reflects every entry even if the
    // visible segment list is truncated.
    expect(items[0]?.minutes).toBe(190);
  });

  it("handles a custom segment label (folder) and a single entry", () => {
    const entries = [entry("a", "2026-06-01T09:00:00Z", 120, "T", "UI")];
    const items = aggregateWithSegments(
      entries,
      "month",
      () => "Jun 26",
      (e) => e.folderName ?? "No folder",
    );
    expect(items).toHaveLength(1);
    expect(items[0]?.segments).toEqual([{ label: "UI", minutes: 120 }]);
  });

  it("returns an empty list when no entries exist", () => {
    expect(
      aggregateWithSegments([], "month", () => "Jun 26", (e) => e.taskTitle),
    ).toEqual([]);
  });
});

describe("averageFraction", () => {
  it("returns 0 for an empty list", () => {
    expect(averageFraction([])).toBe(0);
  });

  it("returns 0 when every value is 0", () => {
    expect(
      averageFraction([{ minutes: 0 }, { minutes: 0 }, { minutes: 0 }]),
    ).toBe(0);
  });

  it("returns the mean as a fraction of the max", () => {
    // 0, 0, 2h, 4h — mean = 1.5h, max = 4h, fraction = 0.375.
    expect(
      averageFraction([
        { minutes: 0 },
        { minutes: 0 },
        { minutes: 120 },
        { minutes: 240 },
      ]),
    ).toBeCloseTo(0.375);
  });

  it("returns 1 when the series is constant", () => {
    expect(
      averageFraction([{ minutes: 60 }, { minutes: 60 }, { minutes: 60 }]),
    ).toBe(1);
  });
});
