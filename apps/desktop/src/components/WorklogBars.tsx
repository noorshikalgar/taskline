import { useMemo } from "react";
import { formatDuration } from "@/lib/duration";
import { cn } from "@/lib/utils";

export interface WorklogBarItem {
  label: string;
  minutes: number;
  /** Optional per-task (or per-folder) breakdown, ordered. */
  segments?: ReadonlyArray<{ label: string; minutes: number; color?: string }>;
}

export interface WorklogBarsProps {
  title: string;
  items: ReadonlyArray<WorklogBarItem>;
  /** When > 0, a thin dashed line is drawn at this fraction of the
   *  tallest bar — used to show the rolling average. */
  averageFraction?: number;
  /** Optional label printed next to the average line. */
  averageLabel?: string;
  /** Whether to show the average line. Defaults to true when an
   *  averageFraction is provided. */
  showAverage?: boolean;
  /** The display unit, used for the bar-segment tooltip. */
  unitLabel?: string;
  /** Optional slot for a right-aligned summary in the card header. */
  headerRight?: string;
  /** When false, hides the bars section and shows an empty hint. */
  showMax?: number;
}

const PALETTE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

function colorFor(index: number, override?: string): string {
  return override ?? PALETTE[index % PALETTE.length]!;
}

export function WorklogBars({
  title,
  items,
  averageFraction,
  averageLabel = "avg",
  showAverage,
  unitLabel = "logged",
  headerRight,
}: WorklogBarsProps) {
  const max = useMemo(
    () => Math.max(1, ...items.map((item) => item.minutes)),
    [items],
  );
  const showAvg = showAverage ?? averageFraction !== undefined;
  const visible = items.slice(-8);

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-medium">{title}</h2>
        {headerRight && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {headerRight}
          </span>
        )}
      </div>
      <div className="mt-4 space-y-2">
        {visible.map((item, index) => {
          const baseWidth = Math.max(4, (item.minutes / max) * 100);
          const segments =
            item.segments && item.segments.length > 0 ? item.segments : null;
          return (
            <div
              className="grid grid-cols-[74px_minmax(0,1fr)_56px] items-center gap-2 text-xs"
              key={item.label}
            >
              <span className="truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {item.label}
              </span>
              <div className="relative h-3 overflow-hidden rounded-full bg-muted">
                {segments ? (
                  <div
                    className="absolute inset-y-0 left-0 flex"
                    style={{ width: `${baseWidth}%` }}
                  >
                    {segments.map((segment, segIndex) => {
                      const segWidth =
                        item.minutes > 0
                          ? (segment.minutes / item.minutes) * 100
                          : 0;
                      if (segWidth <= 0) return null;
                      return (
                        <span
                          aria-label={`${segment.label}: ${formatDuration(
                            segment.minutes,
                          )}`}
                          className="h-full"
                          key={`${item.label}-${segIndex}`}
                          style={{
                            backgroundColor: colorFor(
                              segIndex,
                              segment.color,
                            ),
                            width: `${segWidth}%`,
                          }}
                          title={`${segment.label}: ${formatDuration(
                            segment.minutes,
                          )}`}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${baseWidth}%` }}
                  />
                )}
                {showAvg && averageFraction !== undefined && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 w-px bg-foreground/40"
                    style={{ left: `${Math.max(0, Math.min(100, averageFraction * 100))}%` }}
                    title={`${averageLabel}: ${formatDuration(
                      Math.round(max * averageFraction),
                    )}`}
                  />
                )}
              </div>
              <span className="text-right font-mono text-[10px] text-foreground">
                {formatDuration(item.minutes)}
              </span>
            </div>
          );
        })}
        {!items.length && (
          <p className="py-8 text-center text-xs text-muted-foreground">
            No logged time yet.
          </p>
        )}
        {showAvg && averageFraction !== undefined && items.length > 1 && (
          <p
            className={cn(
              "pt-1 font-mono text-[10px] uppercase tracking-wider",
              "text-muted-foreground",
            )}
          >
            {averageLabel}: {formatDuration(Math.round(max * averageFraction))} per {unitLabel}
          </p>
        )}
      </div>
    </div>
  );
}
