const WEEK_MINUTES = 5 * 8 * 60;
const DAY_MINUTES = 8 * 60;
const HOUR_MINUTES = 60;
const MINUTE = 1;

const TOKEN = /(w|d|h|m)\s*/gi;

const UNIT_TO_MINUTES: Record<string, number> = {
  w: WEEK_MINUTES,
  d: DAY_MINUTES,
  h: HOUR_MINUTES,
  m: MINUTE,
};

export function parseDuration(input: string): number | null {
  if (!input) return null;
  const normalized = input.trim().toLowerCase();
  if (!normalized) return null;
  const stripped = normalized.replace(/\s+/g, "");
  if (!stripped) return null;
  if (!/^(\d+[wdhm])+$/.test(stripped)) return null;
  let total = 0;
  for (const match of stripped.matchAll(/(\d+)([wdhm])/g)) {
    const value = Number.parseInt(match[1], 10);
    const unit = match[2];
    if (!Number.isFinite(value) || value < 0) return null;
    const minutes = UNIT_TO_MINUTES[unit];
    if (minutes === undefined) return null;
    total += value * minutes;
  }
  return total > 0 ? total : null;
}

export function formatDuration(
  totalMinutes: number | null | undefined,
): string {
  if (!totalMinutes || totalMinutes <= 0) return "0m";
  let remaining = Math.round(totalMinutes);
  const parts: string[] = [];
  const weeks = Math.floor(remaining / WEEK_MINUTES);
  if (weeks) {
    parts.push(`${weeks}w`);
    remaining -= weeks * WEEK_MINUTES;
  }
  const days = Math.floor(remaining / DAY_MINUTES);
  if (days) {
    parts.push(`${days}d`);
    remaining -= days * DAY_MINUTES;
  }
  const hours = Math.floor(remaining / HOUR_MINUTES);
  if (hours) {
    parts.push(`${hours}h`);
    remaining -= hours * HOUR_MINUTES;
  }
  if (remaining > 0 || parts.length === 0) {
    parts.push(`${remaining}m`);
  }
  return parts.join(" ");
}

export const DURATION_PATTERN = TOKEN;
