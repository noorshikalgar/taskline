// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WorklogHeatmap } from "./WorklogHeatmap";
import type { WorklogDay } from "@/lib/worklog";

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
      />,
    );
    expect(screen.getAllByTestId("heatmap-cell")).toHaveLength(3);
  });

  it("paints each cell using the theme accent and a hatch pattern", () => {
    render(
      <WorklogHeatmap
        days={DAYS}
        onSelectDay={vi.fn()}
        range="12w"
        selectedDay={null}
      />,
    );
    const cells = screen.getAllByTestId("heatmap-cell") as HTMLButtonElement[];
    // The 9h day (cell #2) is the brightest. It should declare an
    // accent fill AND a diagonal-hatch backgroundImage, with no
    // fixed emerald-500 class.
    const busy = cells[1]!;
    const style = busy.getAttribute("style") ?? "";
    expect(style).toMatch(/background-color/);
    expect(style).toMatch(/repeating-linear-gradient\(45deg/);
    // The 2h day (cell #3) should also have the hatch but a
    // different (looser) stripe.
    const light = cells[2]!;
    expect(light.getAttribute("style") ?? "").toMatch(
      /repeating-linear-gradient\(45deg/,
    );
  });

  it("renders visibly different alpha for cells of different intensities", () => {
    // Regression test: an earlier ladder had 0.85 / 1.0 alphas
    // for the 2h and 4h+ buckets — a 15% gap that was visually
    // identical on saturated dark-theme accents. The new ladder
    // is 0.7 / 0.9 / 1.0, with a 1.5px vs 2.5px vs 1px hatch
    // difference too.
    render(
      <WorklogHeatmap
        days={[
          { key: "2026-06-01", date: "2026-06-01", minutes: 2 * 60 },
          { key: "2026-06-02", date: "2026-06-02", minutes: 6 * 60 },
        ]}
        onSelectDay={vi.fn()}
        range="12w"
        selectedDay={null}
      />,
    );
    const cells = screen.getAllByTestId("heatmap-cell") as HTMLButtonElement[];
    // 2h should NOT contain "opacity: 1" — it's the alpha-0.9 bucket
    // (or 0.7 in the next ladder), not the top one. This catches
    // the bug where 2h and 6h were both routed to the >=240
    // bucket.
    expect(cells[0]!.getAttribute("style") ?? "").not.toMatch(
      /opacity:\s*1(?:\.0+)?\b/,
    );
    // 6h is the heaviest bucket, so it can have opacity 1.
    expect(cells[1]!.getAttribute("style") ?? "").toMatch(
      /opacity:\s*1(?:\.0+)?\b/,
    );
  });

  it("paints the streak pill using the theme accent (not a hard-coded emerald)", () => {
    // Regression test: the previous className set 'text-foreground'
    // which fought the inline colour style and made the pill
    // invisible on amber-heavy themes.
    render(
      <WorklogHeatmap
        days={DAYS}
        onSelectDay={vi.fn()}
        range="12w"
        selectedDay={null}
      />,
    );
    const pill = screen.getByTestId("worklog-streak-pill");
    const style = pill.getAttribute("style") ?? "";
    expect(style).toMatch(/background-color/);
    expect(style).toMatch(/color:/);
    // The pill should NOT carry a hard-coded emerald background.
    expect(pill.className).not.toMatch(/bg-emerald/);
    // The label colour comes from the inline style, not the class
    // list (which was the original bug).
    expect(pill.className).not.toMatch(/text-foreground/);
  });

  it("renders the current streak in the header pill", () => {
    render(
      <WorklogHeatmap
        days={DAYS}
        onSelectDay={vi.fn()}
        range="12w"
        selectedDay={null}
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
      />,
    );
    expect(screen.getByTestId("worklog-streak-pill")).toHaveTextContent("0d");
  });

  it("surfaces the longest streak in the range alongside the current", () => {
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
      />,
    );
    const pill = screen.getByTestId("worklog-streak-pill");
    expect(pill).toHaveTextContent(/1d/);
    expect(pill).toHaveTextContent(/best 4d/);
  });

  it("renders rectangular cells (not squares)", () => {
    // Bigger boxes — the spec called for a "chart-like" cell,
    // not a GitHub dot. We assert the cell has a fixed height
    // class which keeps the row count short and the chart tall.
    render(
      <WorklogHeatmap
        days={DAYS}
        onSelectDay={vi.fn()}
        range="12w"
        selectedDay={null}
      />,
    );
    const cells = screen.getAllByTestId("heatmap-cell");
    cells.forEach((cell) => {
      expect(cell.className).toMatch(/\bh-7\b/);
    });
  });

  it("does not render any amber goal overlays", () => {
    const { container } = render(
      <WorklogHeatmap
        days={DAYS}
        onSelectDay={vi.fn()}
        range="12w"
        selectedDay={null}
      />,
    );
    expect(container.querySelector(".bg-amber-300")).toBeNull();
  });
});
