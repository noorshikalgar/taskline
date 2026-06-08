export interface StreakInfo {
  /** Consecutive days ending at the most recent logged day, or 0. */
  current: number;
  /** Longest run of consecutive days in the input, or 0. */
  longest: number;
  /** ISO date (yyyy-mm-dd) where the current streak ends. */
  currentEndsOn: string | null;
  /** ISO date (yyyy-mm-dd) where the longest streak ended. */
  longestEndsOn: string | null;
}

const ONE_HOUR = 60;

/**
 * Walks a chronological list of days and reports both the most
 * recent streak and the longest streak in the range. A "streak" is
 * a run of consecutive days with at least `minMinutes` of logged
 * time (default 1h to filter out the 2-minute admin entries).
 */
export function computeStreaks(
  days: ReadonlyArray<{ key: string; minutes: number }>,
  minMinutes = ONE_HOUR,
): StreakInfo {
  if (!days.length) {
    return {
      current: 0,
      longest: 0,
      currentEndsOn: null,
      longestEndsOn: null,
    };
  }

  // Days must be ordered chronologically by key. The callers (the
  // worklog view) pass them that way.
  let longest = 0;
  let longestEnd = days[0]?.key ?? null;
  let run = 0;
  let runEnd = days[0]?.key ?? null;
  let prevKey: string | null = null;

  for (const day of days) {
    const qualifies = day.minutes >= minMinutes;
    const isConsecutive = isNextDay(prevKey, day.key);
    if (qualifies && (run === 0 || isConsecutive)) {
      run += 1;
      runEnd = day.key;
    } else {
      run = qualifies ? 1 : 0;
      runEnd = qualifies ? day.key : runEnd;
    }
    // Prefer the most recent run on ties so the "longest" pointer
    // shifts to today's best when it catches up.
    if (run >= longest) {
      longest = run;
      longestEnd = runEnd;
    }
    prevKey = day.key;
  }

  // A "current" streak must end on the very last day. If the most
  // recent day doesn't qualify, the current streak is 0.
  const last = days[days.length - 1];
  const current = last.minutes >= minMinutes ? run : 0;
  return {
    current,
    longest,
    currentEndsOn: last.minutes >= minMinutes ? last.key : null,
    longestEndsOn: longestEnd,
  };
}

function isNextDay(prevKey: string | null, nextKey: string): boolean {
  if (!prevKey) return true;
  const prev = new Date(`${prevKey}T00:00:00Z`);
  const next = new Date(`${nextKey}T00:00:00Z`);
  if (Number.isNaN(prev.getTime()) || Number.isNaN(next.getTime())) {
    return false;
  }
  const diffMs = next.getTime() - prev.getTime();
  return diffMs === 24 * 60 * 60 * 1000;
}
