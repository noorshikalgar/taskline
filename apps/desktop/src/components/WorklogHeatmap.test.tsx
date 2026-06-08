// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WorklogHeatmap } from "./WorklogHeatmap";
import type { WorklogDay } from "@/lib/worklog";
import type { WorklogSettings } from "@/lib/worklogSettings";

const SETTINGS: WorklogSettings = { dailyHours: 8, breakMinutes: 0 };

const DAYS: WorklogDay[] = [
  { key: "2026-06-01", date: "2026-06-01", minutes: 6 * 60 },
  { key: "2026-06-02", date: "2026-06-02", minutes: 9 * 60 },
  { key: "2026-06-03", date: "2026-06-03", minutes: 2 * 60 },
];

afterEach(() => {
  cleanup();
});

describe("WorklogHeatmap", () => {
  it("renders a cell for every day", () => {
    render(
      <WorklogHeatmap
        days={DAYS}
        onSelectDay={vi.fn()}
        range="12w"
        selectedDay={null}
        settings={SETTINGS}
      />,
    );
    expect(screen.getAllByTestId("heatmap-cell")).toHaveLength(3);
  });

  it("marks days above the goal with data-above-goal", () => {
    render(
      <WorklogHeatmap
        days={DAYS}
        onSelectDay={vi.fn()}
        range="12w"
        selectedDay={null}
        settings={SETTINGS}
      />,
    );
    const cells = screen.getAllByTestId("heatmap-cell");
    // 6h (below), 9h (above), 2h (below)
    expect(cells[0]?.getAttribute("data-above-goal")).toBeNull();
    expect(cells[1]?.getAttribute("data-above-goal")).not.toBeNull();
    expect(cells[2]?.getAttribute("data-above-goal")).toBeNull();
  });

  it("renders the current streak in the header pill", () => {
    // Three consecutive days at >= 1h each — the 1h threshold makes
    // 2h, 6h, 9h all qualify. Streak = 3.
    render(
      <WorklogHeatmap
        days={DAYS}
        onSelectDay={vi.fn()}
        range="12w"
        selectedDay={null}
        settings={SETTINGS}
      />,
    );
    const pill = screen.getByTestId("worklog-streak-pill");
    expect(pill).toHaveTextContent(/3d/);
  });

  it("shows 0d when the most recent day has no logged time", () => {
    const days: WorklogDay[] = [
      { key: "2026-06-01", date: "2026-06-01", minutes: 4 * 60 },
      { key: "2026-06-02", date: "2026-06-02", minutes: 0 },
    ];
    render(
      <WorklogHeatmap
        days={days}
        onSelectDay={vi.fn()}
        range="12w"
        selectedDay={null}
        settings={SETTINGS}
      />,
    );
    expect(screen.getByTestId("worklog-streak-pill")).toHaveTextContent("0d");
  });

  it("surfaces the longest streak in the range alongside the current", () => {
    // Long run of 4 days earlier, current 1 day — pill should
    // read "1d / best 4d".
    const days: WorklogDay[] = [
      { key: "2026-06-01", date: "2026-06-01", minutes: 4 * 60 },
      { key: "2026-06-02", date: "2026-06-02", minutes: 4 * 60 },
      { key: "2026-06-03", date: "2026-06-03", minutes: 4 * 60 },
      { key: "2026-06-04", date: "2026-06-04", minutes: 4 * 60 },
      { key: "2026-06-05", date: "2026-06-05", minutes: 0 },
      { key: "2026-06-06", date: "2026-06-06", minutes: 4 * 60 },
    ];
    render(
      <WorklogHeatmap
        days={days}
        onSelectDay={vi.fn()}
        range="12w"
        selectedDay={null}
        settings={SETTINGS}
      />,
    );
    const pill = screen.getByTestId("worklog-streak-pill");
    expect(pill).toHaveTextContent(/1d/);
    expect(pill).toHaveTextContent(/best 4d/);
  });
});
