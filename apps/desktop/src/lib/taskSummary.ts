import { formatDuration } from "./duration";
import {
  DEFAULT_SUMMARY_TEMPLATE,
  loadSummaryTemplate,
  type SummaryTemplate,
} from "./summaryTemplate";
import { STATUS_LABEL } from "./status";
import type { Task, TaskQuickLink } from "./types";

export interface TaskSummaryEntry {
  contentMarkdown: string;
  durationMinutes: number | null;
}

export interface TaskSummaryContext {
  totalMinutes?: number;
  entries?: TaskSummaryEntry[];
  quickLinks?: TaskQuickLink[];
}

export function formatTaskSummary(
  task: Task,
  context: TaskSummaryContext = {},
  template: SummaryTemplate = DEFAULT_SUMMARY_TEMPLATE,
) {
  const lines: string[] = [];

  if (template.title) {
    lines.push(`**Title:** ${task.title}`);
  }

  if (template.status) {
    lines.push(`**Status:** ${STATUS_LABEL[task.status]}`);
  }

  if (template.estimate) {
    lines.push(
      `**Estimate:** ${
        task.estimatedMinutes ? formatDuration(task.estimatedMinutes) : "None"
      }`,
    );
  }

  if (template.worklog) {
    if (context.totalMinutes !== undefined) {
      lines.push(
        `**Logged:** ${
          context.totalMinutes > 0 ? formatDuration(context.totalMinutes) : "0m"
        }`,
      );
    }
    if (template.worklogEntries && context.entries?.length) {
      for (const entry of context.entries) {
        const duration = entry.durationMinutes
          ? `${formatDuration(entry.durationMinutes)} `
          : "";
        const content = entry.contentMarkdown.replace(/\s+/g, " ").trim();
        if (!content) continue;
        lines.push(`- ${duration}${content}`);
      }
    }
  }

  if (template.quickLinks && context.quickLinks?.length) {
    lines.push(`**Links:**`);
    for (const link of context.quickLinks) {
      lines.push(`- [${link.title}](${link.url})`);
    }
  }

  if (template.createdDate) {
    lines.push(`**Created:** ${formatDate(task.createdAt)}`);
  }

  if (template.updatedDate) {
    lines.push(`**Updated:** ${formatDate(task.updatedAt)}`);
  }

  return lines.join("\n");
}

export function formatTaskSection(
  task: Task,
  context: TaskSummaryContext = {},
  template: SummaryTemplate = DEFAULT_SUMMARY_TEMPLATE,
) {
  const body = formatTaskSummary(task, context, { ...template, title: false });
  const bodyLines = body.length ? body.split("\n") : [];
  return ["## " + task.title, ...bodyLines].join("\n");
}

export async function copyTaskSummary(
  task: Task,
  context: TaskSummaryContext = {},
  template?: SummaryTemplate,
) {
  const effectiveTemplate = template ?? loadSummaryTemplate();
  await writeClipboard(formatTaskSummary(task, context, effectiveTemplate));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function writeClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}
