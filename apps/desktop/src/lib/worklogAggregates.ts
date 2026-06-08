import type { WorklogMetricEntry } from "@/lib/types";

export interface WorklogBarItem {
  label: string;
  minutes: number;
  /** Per-task (or per-folder) breakdown, ordered by minutes desc. */
  segments?: ReadonlyArray<{ label: string; minutes: number }>;
}

/**
 * Groups entries into per-bucket totals (week / month) and, for each
 * bucket, also computes a per-task breakdown so the bar can be
 * rendered as stacked task segments instead of a single solid colour.
 *
 * The segment colours come from the chart palette at render time
 * (WorklogBars), so we only return labels + minutes here.
 */
export function aggregateWithSegments(
  entries: ReadonlyArray<WorklogMetricEntry>,
  unit: "week" | "month",
  bucketLabel: (value: string) => string,
  segmentLabel: (entry: WorklogMetricEntry) => string,
  topSegmentsPerBucket = 3,
): WorklogBarItem[] {
  type BucketAccum = {
    minutes: number;
    bySegment: Map<string, number>;
  };
  const buckets = new Map<string, BucketAccum>();
  for (const entry of entries) {
    const label = bucketLabel(entry.occurredAt);
    const segKey = segmentLabel(entry);
    const bucket =
      buckets.get(label) ??
      ({ minutes: 0, bySegment: new Map<string, number>() } as BucketAccum);
    bucket.minutes += entry.durationMinutes;
    bucket.bySegment.set(
      segKey,
      (bucket.bySegment.get(segKey) ?? 0) + entry.durationMinutes,
    );
    buckets.set(label, bucket);
  }

  const items: WorklogBarItem[] = [];
  for (const [label, bucket] of buckets) {
    const segments = [...bucket.bySegment.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, topSegmentsPerBucket)
      .map(([segLabel, minutes]) => ({ label: segLabel, minutes }));
    items.push({ label, minutes: bucket.minutes, segments });
  }
  return items.reverse();
}

/**
 * Computes the average of an item series as a fraction of the
 * maximum, e.g. { minutes: 0, 0, 2h, 4h, 0 } => 0.4 (with max=4h).
 * Returns 0 for an empty list or when the max is 0.
 */
export function averageFraction(items: ReadonlyArray<{ minutes: number }>): number {
  if (!items.length) return 0;
  const total = items.reduce((sum, item) => sum + item.minutes, 0);
  const max = Math.max(...items.map((item) => item.minutes), 0);
  if (max === 0) return 0;
  return (total / items.length) / max;
}
