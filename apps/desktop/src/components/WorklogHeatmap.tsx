import { useMemo } from "react";
import { Flame } from "lucide-react";
import { computeStreaks } from "@/lib/worklogStreaks";
import { effectiveDailyGoalMinutes } from "@/lib/worklogSettings";
import type { WorklogSettings } from "@/lib/worklogSettings";
import type { WorklogDay } from "@/lib/worklog";
import { cn } from "@/lib/utils";

export interface WorklogHeatmapProps {
  days: ReadonlyArray<WorklogDay>;
  range: "7d" | "4w" | "12w" | "12m";
  selectedDay: string | null;
  onSelectDay: (key: string | null) => void;
  settings: WorklogSettings;
}

function heatClass(minutes: number, max: number): string {
  if (minutes <= 0) return "bg-muted/40";
  if (max <= 0) return "bg-muted/40";
  const ratio = minutes / max;
  if (ratio > 0.75) return "bg-emerald-500";
  if (ratio > 0.45) return "bg-emerald-500/70";
  if (ratio > 0.2) return "bg-emerald-500/45";
  return "bg-emerald-500/20";
}

function streakLabel(value: number): string {
  if (value === 0) return "No streak";
  return `${value}-day streak`;
}

export function WorklogHeatmap({
  days,
  range,
  selectedDay,
  onSelectDay,
  settings,
}: WorklogHeatmapProps) {
  const max = useMemo(
    () => Math.max(1, ...days.map((day) => day.minutes)),
    [days],
  );
  const streaks = useMemo(() => computeStreaks(days), [days]);
  const goalMinutes = effectiveDailyGoalMinutes(settings);

  // For the goal overlay we render a thin horizontal mark inside the
  // cell when the day is below the goal. The mark's vertical position
  // represents the goal fraction of the cell height; days above the
  // goal show a small "above goal" tick in the top-right.
  return (
    <div
      className="rounded-lg border border-border bg-card p-4"
      data-testid="worklog-heatmap"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-medium">Daily heatmap</h2>
          <span
            aria-label={streakLabel(streaks.current)}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
              streaks.current > 0
                ? "bg-emerald-500/15 text-emerald-500"
                : "bg-muted text-muted-foreground",
            )}
            data-testid="worklog-streak-pill"
            title={
              streaks.longest > streaks.current
                ? `Longest streak this range: ${streaks.longest} days`
                : undefined
            }
          >
            <Flame className="size-3" />
            {streaks.current > 0 ? `${streaks.current}d` : "0d"}
            {streaks.longest > streaks.current && streaks.longest > 0 && (
              <span className="text-muted-foreground">
                {" "}
                / best {streaks.longest}d
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span>Below goal</span>
          <span
            aria-hidden
            className="inline-block h-2 w-12 rounded-full bg-gradient-to-r from-emerald-500/20 via-emerald-500/60 to-emerald-500"
          />
          <span>More</span>
        </div>
      </div>
      <div
        className="grid grid-flow-col grid-rows-7 gap-1"
        style={{
          gridAutoColumns: `minmax(0, ${range === "12m" ? "1fr" : "16px"})`,
        }}
      >
        {days.map((day) => {
          const isSelected = selectedDay === day.key;
          const reachedGoal = day.minutes >= goalMinutes && goalMinutes > 0;
          return (
            <button
              aria-label={`${day.key} ${formatHM(day.minutes)}`}
              className={cn(
                "group relative aspect-square w-full min-w-0 overflow-hidden rounded-[3px] border border-border/50 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                range !== "12m" && "size-4",
                heatClass(day.minutes, max),
                isSelected && "ring-2 ring-primary",
              )}
              data-above-goal={reachedGoal || undefined}
              data-testid="heatmap-cell"
              key={day.key}
              onClick={() =>
                onSelectDay(isSelected ? null : day.key)
              }
              title={`${day.key} · ${formatHM(day.minutes)}${
                reachedGoal ? " · above goal" : ""
              }`}
              type="button"
            >
              {reachedGoal && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-0.5 top-0.5 size-1 rounded-full bg-amber-300 shadow-[0_0_0_1px_rgba(0,0,0,0.4)]"
                />
              )}
              {day.minutes > 0 && !reachedGoal && goalMinutes > 0 && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[2px] w-full bg-amber-300/70"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function formatHM(minutes: number): string {
  if (minutes === 0) return "0m";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
