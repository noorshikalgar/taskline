// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WorklogBars } from "./WorklogBars";

afterEach(() => {
  cleanup();
});

describe("WorklogBars", () => {
  it("renders one row per item", () => {
    render(
      <WorklogBars
        items={[
          { label: "6/1", minutes: 120 },
          { label: "6/8", minutes: 240 },
        ]}
        title="Weekly totals"
      />,
    );
    expect(screen.getByText("6/1")).toBeInTheDocument();
    expect(screen.getByText("6/8")).toBeInTheDocument();
  });

  it("renders per-task segments inside each bar", () => {
    const items = [
      {
        label: "6/8",
        minutes: 300,
        segments: [
          { label: "Release notes", minutes: 180 },
          { label: "Sidebar", minutes: 120 },
        ],
      },
    ];
    render(<WorklogBars items={items} title="Weekly totals" />);
    expect(
      screen.getByLabelText("Release notes: 3h"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Sidebar: 2h")).toBeInTheDocument();
  });

  it("renders an average line when averageFraction is provided", () => {
    const { container } = render(
      <WorklogBars
        averageFraction={0.5}
        averageLabel="Average"
        items={[
          { label: "Jun 26", minutes: 0 },
          { label: "May 26", minutes: 240 },
        ]}
        showAverage
        title="Monthly totals"
        unitLabel="month"
      />,
    );
    // The text is split across spans; assert via the rendered text
    // content of the whole card.
    const text = (container.textContent ?? "").replace(/\s+/g, " ");
    expect(text).toContain("Average: 2h per month");
  });

  it("hides the average line when there is only one item", () => {
    // The user gets no useful "average" signal from a single sample.
    const { container } = render(
      <WorklogBars
        averageFraction={0.5}
        items={[{ label: "Jun 26", minutes: 240 }]}
        showAverage
        title="Monthly totals"
      />,
    );
    expect(container.textContent ?? "").not.toMatch(/Average:/);
  });

  it("renders a header right summary when provided", () => {
    render(
      <WorklogBars
        headerRight="12 months"
        items={[{ label: "Jun 26", minutes: 0 }]}
        title="Monthly totals"
      />,
    );
    expect(screen.getByText("12 months")).toBeInTheDocument();
  });

  it("shows an empty hint when there are no items", () => {
    render(<WorklogBars items={[]} title="Weekly totals" />);
    expect(screen.getByText(/No logged time yet\./)).toBeInTheDocument();
  });
});
