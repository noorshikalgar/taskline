import { describe, expect, it } from "vitest";
import { formatDuration, parseDuration } from "./duration";

describe("parseDuration", () => {
  it("parses a single unit", () => {
    expect(parseDuration("1d")).toBe(8 * 60);
    expect(parseDuration("3h")).toBe(180);
    expect(parseDuration("45m")).toBe(45);
    expect(parseDuration("1w")).toBe(5 * 8 * 60);
  });

  it("parses a compound duration", () => {
    expect(parseDuration("1w 3d 4h 30m")).toBe(
      5 * 8 * 60 + 3 * 8 * 60 + 4 * 60 + 30,
    );
    expect(parseDuration("1d2h")).toBe(8 * 60 + 2 * 60);
  });

  it("is case insensitive and whitespace tolerant", () => {
    expect(parseDuration(" 1D  ")).toBe(8 * 60);
    expect(parseDuration("2H30M")).toBe(150);
  });

  it("returns null for empty or zero input", () => {
    expect(parseDuration("")).toBeNull();
    expect(parseDuration("   ")).toBeNull();
    expect(parseDuration("0m")).toBeNull();
  });

  it("returns null for unknown units or garbage", () => {
    expect(parseDuration("1y")).toBeNull();
    expect(parseDuration("abc")).toBeNull();
    expect(parseDuration("1d 2x")).toBeNull();
    expect(parseDuration("1.5h")).toBeNull();
  });
});

describe("formatDuration", () => {
  it("renders zero and small values", () => {
    expect(formatDuration(0)).toBe("0m");
    expect(formatDuration(null)).toBe("0m");
    expect(formatDuration(45)).toBe("45m");
  });

  it("renders hours, days, and weeks", () => {
    expect(formatDuration(60)).toBe("1h");
    expect(formatDuration(90)).toBe("1h 30m");
    expect(formatDuration(8 * 60)).toBe("1d");
    expect(formatDuration(8 * 60 + 30)).toBe("1d 30m");
    expect(formatDuration(5 * 8 * 60)).toBe("1w");
  });

  it("matches the parser round-trip", () => {
    expect(formatDuration(parseDuration("1w 3d 4h 30m")!)).toBe("1w 3d 4h 30m");
    expect(formatDuration(parseDuration("2d 1h")!)).toBe("2d 1h");
  });
});
