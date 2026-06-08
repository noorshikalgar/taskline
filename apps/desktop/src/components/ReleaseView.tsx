import {
  Braces,
  Calendar,
  Check,
  Code,
  Copy,
  FileText,
  Info,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Search,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/lib/api";
import {
  buildReleaseContext,
  defaultReleaseTemplate,
  RELEASE_TASK_FIELDS,
  RELEASE_TEMPLATE_BLOCKS,
  RELEASE_TEMPLATE_EXAMPLES,
  RELEASE_TEMPLATE_FILTERS,
  RELEASE_TEMPLATE_PLACEHOLDERS,
  RELEASE_TEMPLATE_TASK_VARIABLES,
  RELEASE_TEMPLATE_VARIABLES,
  renderReleaseTemplate,
} from "@/lib/releaseTemplate";
import { formatTaskTable, type TaskTableRow } from "@/lib/taskTable";
import { STATUS_DOT } from "@/lib/status";
import type { Folder, Release, Task } from "@/lib/types";
import { cn } from "@/lib/utils";

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function PlaceholderButton({
  snippet,
  description,
  onClick,
}: {
  snippet: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      className="flex w-full flex-col items-start gap-0.5 rounded px-2 py-1.5 text-left text-xs hover:bg-accent"
      onClick={onClick}
      type="button"
    >
      <span className="font-mono text-[11px] text-foreground">
        {snippet.length > 40 ? `${snippet.slice(0, 40)}…` : snippet}
      </span>
      <span className="text-[10px] text-muted-foreground">{description}</span>
    </button>
  );
}

interface HelpSectionProps {
  title: string;
  entries: ReadonlyArray<{ label: string; syntax: string; description: string }>;
}

function HelpSection({ title, entries }: HelpSectionProps) {
  return (
    <div>
      <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <div className="space-y-1">
        {entries.map((entry) => (
          <div className="rounded px-2 py-1.5" key={entry.syntax}>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-foreground">
                {entry.syntax}
              </span>
              <span className="shrink-0 text-[10px] text-muted-foreground">
                {entry.label}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-muted-foreground/90">
              {entry.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ReleaseViewProps {
  folders: Folder[];
  onReleasesChanged: () => Promise<void>;
  onRemoveTaskTag: (taskId: string) => Promise<void>;
  onSelectTask: (id: string) => void;
  onTagTask: (taskId: string, name: string) => Promise<void>;
  releases: Release[];
  tasks: Task[];
}

export function ReleaseView({
  folders,
  onReleasesChanged,
  onRemoveTaskTag,
  onSelectTask,
  onTagTask,
  releases,
  tasks,
}: ReleaseViewProps) {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [editVersionDialogOpen, setEditVersionDialogOpen] = useState(false);
  const [editVersion, setEditVersion] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const [tagSelected, setTagSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [templateDraft, setTemplateDraft] = useState("");
  const [templateDirty, setTemplateDirty] = useState(false);
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [previewTab, setPreviewTab] = useState<
    "preview" | "source" | "editor"
  >("preview");
  const [placeholderOpen, setPlaceholderOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const templateEditorRef = useRef<HTMLTextAreaElement>(null);
  const newVersionRef = useRef<HTMLInputElement>(null);
  const newNameRef = useRef<HTMLInputElement>(null);

  async function reloadReleases() {
    try {
      await onReleasesChanged();
    } catch (cause) {
      toast.error(String(cause));
    }
  }

  useEffect(() => {
    if (!releases.length) {
      setSelectedName(null);
      return;
    }
    if (!selectedName || !releases.some((r) => r.name === selectedName)) {
      setSelectedName(releases[0].name);
    }
  }, [releases, selectedName]);

  const selectedRelease = useMemo(
    () => releases.find((r) => r.name === selectedName) ?? null,
    [releases, selectedName],
  );

  useEffect(() => {
    setTemplateDraft(selectedRelease?.descriptionMarkdown ?? "");
    setTemplateDirty(false);
  }, [selectedRelease?.name]);

  const folderNames = useMemo(
    () => new Map(folders.map((f) => [f.id, f.name])),
    [folders],
  );

  const taggedTasks = useMemo(
    () => tasks.filter((t) => t.releaseName === selectedName),
    [tasks, selectedName],
  );

  const dialogTasks = useMemo(
    () => tasks.filter((t) => t.status !== "archived"),
    [tasks],
  );

  const currentlyTaggedIds = useMemo(
    () => new Set(taggedTasks.map((t) => t.id)),
    [taggedTasks],
  );

  const filteredDialogTasks = useMemo(() => {
    const term = tagSearch.trim().toLowerCase();
    if (!term) return dialogTasks;
    return dialogTasks.filter((t) => {
      const folderName = t.folderId
        ? folderNames.get(t.folderId)?.toLowerCase() ?? ""
        : "";
      return (
        t.title.toLowerCase().includes(term) || folderName.includes(term)
      );
    });
  }, [dialogTasks, tagSearch, folderNames]);

  const tableRows = useMemo<TaskTableRow[]>(
    () => taggedTasks.map((task) => ({ task })),
    [taggedTasks],
  );

  const taskTableMd = useMemo(
    () => formatTaskTable(tableRows, folderNames),
    [tableRows, folderNames],
  );

  const fullSummaryMd = useMemo(() => {
    if (!selectedRelease) return "";
    const ctx = buildReleaseContext({
      release: selectedRelease,
      notes: templateDraft,
      taskTableMd,
      tasks: taggedTasks,
      folderNames,
    });
    return renderReleaseTemplate(templateDraft, ctx);
  }, [
    selectedRelease,
    templateDraft,
    taskTableMd,
    taggedTasks,
    folderNames,
  ]);

  async function copySummary() {
    if (!selectedRelease) return;
    try {
      await navigator.clipboard.writeText(fullSummaryMd);
      toast.success("Release summary copied");
    } catch (cause) {
      toast.error(String(cause));
    }
  }

  async function saveTemplate() {
    if (!selectedRelease || savingTemplate) return;
    setSavingTemplate(true);
    try {
      await api.updateRelease(selectedRelease.name, {
        descriptionMarkdown: templateDraft,
      });
      setTemplateDirty(false);
      await reloadReleases();
      toast.success("Template saved");
    } catch (cause) {
      toast.error(String(cause));
    } finally {
      setSavingTemplate(false);
    }
  }

  function insertPlaceholder(snippet: string) {
    const textarea = templateEditorRef.current;
    if (!textarea) {
      setTemplateDraft((current) =>
        current.length > 0 ? `${current}\n${snippet}` : snippet,
      );
      setTemplateDirty(true);
      return;
    }
    const start = textarea.selectionStart ?? templateDraft.length;
    const end = textarea.selectionEnd ?? templateDraft.length;
    const next =
      templateDraft.slice(0, start) + snippet + templateDraft.slice(end);
    setTemplateDraft(next);
    setTemplateDirty(true);
    // Restore the caret after React commits the new value.
    requestAnimationFrame(() => {
      const el = templateEditorRef.current;
      if (!el) return;
      const caret = start + snippet.length;
      el.focus();
      el.setSelectionRange(caret, caret);
    });
  }

  async function handleCreate() {
    const name = newNameRef.current?.value.trim();
    const version = newVersionRef.current?.value.trim() || null;
    if (!name) return;
    setBusy(true);
    try {
      await api.createRelease(name, version);
      setNewDialogOpen(false);
      await reloadReleases();
      setSelectedName(name);
    } catch (cause) {
      toast.error(String(cause));
    } finally {
      setBusy(false);
    }
  }

  async function handleSaveVersion() {
    if (!selectedRelease) return;
    setBusy(true);
    try {
      const trimmed = editVersion?.trim();
      const newVersion = trimmed ? trimmed : null;
      await api.updateRelease(selectedRelease.name, { version: newVersion });
      setEditVersionDialogOpen(false);
      await reloadReleases();
    } catch (cause) {
      toast.error(String(cause));
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!selectedRelease) return;
    setBusy(true);
    try {
      await api.deleteRelease(selectedRelease.name);
      setDeleteDialogOpen(false);
      await reloadReleases();
    } catch (cause) {
      toast.error(String(cause));
    } finally {
      setBusy(false);
    }
  }

  async function handleMarkReleased() {
    if (!selectedRelease) return;
    setBusy(true);
    try {
      const releasedAt = selectedRelease.releasedAt
        ? null
        : new Date().toISOString();
      await api.updateRelease(selectedRelease.name, { releasedAt });
      await reloadReleases();
    } catch (cause) {
      toast.error(String(cause));
    } finally {
      setBusy(false);
    }
  }

  async function handleAddTagged() {
    if (!selectedRelease || busy) return;
    setBusy(true);
    try {
      const toTag: string[] = [];
      const toUntag: string[] = [];
      for (const taskId of tagSelected) {
        if (!currentlyTaggedIds.has(taskId)) toTag.push(taskId);
      }
      for (const taskId of currentlyTaggedIds) {
        if (!tagSelected.has(taskId)) toUntag.push(taskId);
      }
      if (!toTag.length && !toUntag.length) {
        setTagDialogOpen(false);
        setTagSelected(new Set());
        setTagSearch("");
        return;
      }
      await Promise.all([
        ...toTag.map((taskId) => onTagTask(taskId, selectedRelease.name)),
        ...toUntag.map((taskId) => onRemoveTaskTag(taskId)),
      ]);
      setTagDialogOpen(false);
      setTagSelected(new Set());
      setTagSearch("");
    } catch (cause) {
      toast.error(String(cause));
    } finally {
      setBusy(false);
    }
  }

  async function handleRemoveTag(taskId: string) {
    try {
      await onRemoveTaskTag(taskId);
    } catch (cause) {
      toast.error(String(cause));
    }
  }

  function toggleTagSelected(taskId: string) {
    setTagSelected((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      return next;
    });
  }

  const releasesSorted = useMemo(
    () => [...releases].sort((a, b) => b.name.localeCompare(a.name)),
    [releases],
  );

  return (
    <section className="grid min-h-0 flex-1 grid-cols-[minmax(260px,340px)_minmax(0,1fr)] bg-background">
      {/* Left panel: release list */}
      <div className="flex min-h-0 flex-col border-r border-border bg-card/60">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-sm font-semibold">Releases</h1>
              <p className="text-xs text-muted-foreground">
                {releases.length} {releases.length === 1 ? "release" : "releases"}
              </p>
            </div>
            <Button
              onClick={() => setNewDialogOpen(true)}
              size="sm"
              type="button"
              variant="outline"
            >
              <Plus className="size-3.5" />
              New
            </Button>
          </div>
        </div>
        <ScrollArea className="min-h-0 flex-1">
          <div className="space-y-1 p-2">
            {releasesSorted.map((release) => {
              const selected = selectedRelease?.name === release.name;
              const isReleased = !!release.releasedAt;
              return (
                <button
                  className={cn(
                    "flex w-full min-w-0 flex-col gap-0.5 rounded-md border border-transparent px-3 py-2.5 text-left hover:bg-accent/60",
                    selected && "border-border bg-accent text-accent-foreground",
                  )}
                  key={release.name}
                  onClick={() => setSelectedName(release.name)}
                  type="button"
                >
                  <span className="truncate text-sm font-medium">
                    {release.name}
                  </span>
                  {release.version && (
                    <span className="truncate text-[11px] text-muted-foreground">
                      {release.version}
                    </span>
                  )}
                  <span className="text-[11px] text-muted-foreground">
                    {isReleased
                      ? formatDate(release.releasedAt!)
                      : "Draft · not yet released"}
                  </span>
                </button>
              );
            })}
            {!releasesSorted.length && (
              <div className="px-3 py-10 text-center text-xs text-muted-foreground">
                No releases yet.
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Right panel: release detail */}
      <div className="flex min-h-0 flex-col">
        {selectedRelease ? (
          <>
            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold">
                  {selectedRelease.name}
                </h2>
                {selectedRelease.version && (
                  <p className="truncate text-sm text-muted-foreground">
                    {selectedRelease.version}
                  </p>
                )}
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {selectedRelease.releasedAt ? (
                    <>
                      <Calendar className="mr-1 inline size-3 align-text-top" />
                      Released {formatDate(selectedRelease.releasedAt)}
                    </>
                  ) : (
                    "Draft · not yet released"
                  )}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button
                  disabled={!taggedTasks.length}
                  onClick={() => void copySummary()}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  <Copy className="size-3.5" />
                  Copy
                </Button>
                <Button
                  onClick={() => setTagDialogOpen(true)}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  <Tag className="size-3.5" />
                  Add tasks
                </Button>
                <Button
                  onClick={() => {
                    setEditVersion(selectedRelease.version);
                    setEditVersionDialogOpen(true);
                  }}
                  size="icon-sm"
                  title="Edit version"
                  type="button"
                  variant="ghost"
                >
                  <Pencil className="size-3.5" />
                </Button>
                <Button
                  onClick={() => setDeleteDialogOpen(true)}
                  size="icon-sm"
                  title="Delete release"
                  type="button"
                  variant="ghost"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>

            <ScrollArea className="min-h-0 flex-1">
              <div className="space-y-4 px-6 py-4 pb-8">
                {/* Editor */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Notes
                    </h3>
                    <Popover onOpenChange={setHelpOpen} open={helpOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          aria-label="Template help"
                          size="icon-sm"
                          title="Template help"
                          type="button"
                          variant="ghost"
                        >
                          <Info className="size-3.5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="w-[420px] p-0"
                        sideOffset={4}
                      >
                        <div className="border-b border-border px-3 py-2">
                          <p className="text-xs font-semibold">Template syntax</p>
                          <p className="text-[10px] text-muted-foreground">
                            Hover over the editor for tooltips. Insert via the
                            {" "}
                            <span className="inline-flex items-center gap-0.5 align-middle">
                              <Braces className="size-3" />
                            </span>{" "}
                            button.
                          </p>
                        </div>
                        <ScrollArea className="h-[420px]">
                          <div className="space-y-3 p-3 pr-1">
                            <HelpSection
                              entries={RELEASE_TEMPLATE_VARIABLES}
                              title="Release variables"
                            />
                            <HelpSection
                              entries={RELEASE_TEMPLATE_BLOCKS}
                              title="Blocks"
                            />
                            <HelpSection
                              entries={RELEASE_TEMPLATE_FILTERS}
                              title="Filters"
                            />
                            <HelpSection
                              entries={RELEASE_TEMPLATE_TASK_VARIABLES}
                              title="Per-task variables (use inside #each)"
                            />
                            <div>
                              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                Examples
                              </p>
                              <div className="space-y-2">
                                {RELEASE_TEMPLATE_EXAMPLES.map((ex) => (
                                  <div
                                    className="rounded border border-border bg-muted/30 p-2"
                                    key={ex.title}
                                  >
                                    <p className="mb-1 text-[11px] font-medium">
                                      {ex.title}
                                    </p>
                                    <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-foreground/90">
                                      {ex.template}
                                    </pre>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </PopoverContent>
                    </Popover>
                    <Popover
                      onOpenChange={setPlaceholderOpen}
                      open={placeholderOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          size="icon-sm"
                          title="Insert placeholder"
                          type="button"
                          variant="ghost"
                        >
                          <Braces className="size-3.5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="w-80 p-1"
                        sideOffset={4}
                      >
                        <p className="px-2 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Insert placeholder
                        </p>
                        <ScrollArea className="h-80">
                          <div className="space-y-2 pr-1">
                            <div>
                              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                Release
                              </p>
                              <div className="space-y-0.5">
                                {RELEASE_TEMPLATE_PLACEHOLDERS.map((p) => (
                                  <PlaceholderButton
                                    description={p.description}
                                    key={p.snippet}
                                    onClick={() => {
                                      insertPlaceholder(p.snippet);
                                      setPlaceholderOpen(false);
                                    }}
                                    snippet={p.snippet}
                                  />
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                Per-task field
                              </p>
                              <p className="px-2 pb-1 text-[10px] text-muted-foreground/80">
                                Use inside <span className="font-mono">{"{{#each taskList}}"}</span>
                              </p>
                              <div className="space-y-0.5">
                                {RELEASE_TASK_FIELDS.map((p) => (
                                  <PlaceholderButton
                                    description={p.description}
                                    key={p.snippet}
                                    onClick={() => {
                                      insertPlaceholder(p.snippet);
                                      setPlaceholderOpen(false);
                                    }}
                                    snippet={p.snippet}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                        <div className="mt-1 flex items-center justify-between border-t border-border pt-1">
                          <span className="px-2 text-[10px] text-muted-foreground">
                            {RELEASE_TEMPLATE_PLACEHOLDERS.length +
                              RELEASE_TASK_FIELDS.length}{" "}
                            placeholders
                          </span>
                          <Button
                            onClick={() => {
                              setTemplateDraft(defaultReleaseTemplate());
                              setTemplateDirty(true);
                              setPlaceholderOpen(false);
                            }}
                            size="sm"
                            type="button"
                            variant="ghost"
                          >
                            <RotateCcw className="size-3" />
                            Reset
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <div className="ml-auto flex items-center gap-1">
                      {!selectedRelease.releasedAt && (
                        <Button
                          onClick={() => void handleMarkReleased()}
                          size="icon-sm"
                          title="Mark as released"
                          type="button"
                          variant="ghost"
                        >
                          <Check className="size-3.5 text-green-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <textarea
                    className="mb-2 flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 font-mono text-xs shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(e) => {
                      setTemplateDraft(e.target.value);
                      setTemplateDirty(true);
                    }}
                    placeholder={defaultReleaseTemplate()}
                    ref={templateEditorRef}
                    spellCheck={false}
                    value={templateDraft}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-muted-foreground">
                      Markdown with placeholders
                    </span>
                    {templateDirty && (
                      <Button
                        disabled={savingTemplate}
                        onClick={() => void saveTemplate()}
                        size="sm"
                        type="button"
                        variant="default"
                      >
                        {savingTemplate ? (
                          "Saving…"
                        ) : (
                          <>
                            <Save className="size-3.5" />
                            Save template
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Preview
                    </h3>
                    <div className="inline-flex h-6 items-center rounded-md border border-border bg-card/40 p-0.5 text-[10px]">
                      <button
                        aria-pressed={previewTab === "preview"}
                        className={cn(
                          "inline-flex h-5 items-center gap-1 rounded px-1.5 transition-colors",
                          previewTab === "preview"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                        onClick={() => setPreviewTab("preview")}
                        type="button"
                      >
                        <FileText className="size-3" />
                        Preview
                      </button>
                      <button
                        aria-pressed={previewTab === "source"}
                        className={cn(
                          "inline-flex h-5 items-center gap-1 rounded px-1.5 transition-colors",
                          previewTab === "source"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                        onClick={() => setPreviewTab("source")}
                        type="button"
                      >
                        <Code className="size-3" />
                        Source
                      </button>
                    </div>
                  </div>
                  {previewTab === "preview" ? (
                    <div className="markdown max-h-[420px] overflow-auto rounded-md border border-border bg-card/40 p-4">
                      {fullSummaryMd.trim() ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {fullSummaryMd}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-muted-foreground">
                          Empty release notes.
                        </p>
                      )}
                    </div>
                  ) : (
                    <pre className="max-h-[420px] overflow-auto rounded-md border border-border bg-card/40 p-4 font-mono text-xs leading-relaxed text-foreground/90">
                      {fullSummaryMd || "_Empty release notes._"}
                    </pre>
                  )}
                </div>

                {/* Tagged tasks list */}
                {taggedTasks.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Tagged tasks ({taggedTasks.length})
                    </h3>
                    <div className="space-y-1">
                      {taggedTasks.map((task) => (
                        <div
                          className="group flex min-w-0 items-center gap-2 rounded-md border border-transparent px-3 py-2 hover:border-border hover:bg-accent/60"
                          key={task.id}
                        >
                          <button
                            className="min-w-0 flex-1 text-left"
                            onClick={() => onSelectTask(task.id)}
                            type="button"
                          >
                            <span className="block truncate text-sm font-medium">
                              {task.title}
                            </span>
                            <span className="block truncate text-[11px] text-muted-foreground">
                              {folderNames.get(task.folderId ?? "") ?? "No folder"}
                              {" · "}
                              {task.status}
                            </span>
                          </button>
                          <Button
                            className="shrink-0 opacity-0 group-hover:opacity-100"
                            onClick={() => void handleRemoveTag(task.id)}
                            size="icon-sm"
                            title="Remove release tag"
                            type="button"
                            variant="ghost"
                          >
                            <X className="size-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-xs text-muted-foreground">
            Select a release to view details
          </div>
        )}
      </div>

      {/* New release dialog */}
      <Dialog onOpenChange={setNewDialogOpen} open={newDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New release</DialogTitle>
            <DialogDescription>
              Group tasks under a named milestone. Add an optional version label
              if you want to track changelog releases.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label
                className="mb-1 block text-xs font-medium"
                htmlFor="new-release-name"
              >
                Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="new-release-name"
                placeholder="e.g. UI refresh"
                ref={newNameRef}
              />
            </div>
            <div>
              <label
                className="mb-1 block text-xs font-medium"
                htmlFor="new-release-version"
              >
                Version <span className="text-muted-foreground">(optional)</span>
              </label>
              <Input
                id="new-release-version"
                placeholder="e.g. 0.3.0"
                ref={newVersionRef}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setNewDialogOpen(false)}
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                disabled={busy}
                onClick={() => void handleCreate()}
                type="button"
                variant="default"
              >
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit version dialog */}
      <Dialog
        onOpenChange={(open) => {
          if (!open) setEditVersionDialogOpen(false);
        }}
        open={editVersionDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit release version</DialogTitle>
            <DialogDescription>
              Update the optional version label for this release. Leave empty
              to remove it.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              onChange={(e) => setEditVersion(e.target.value)}
              placeholder="e.g. 0.3.0"
              value={editVersion ?? ""}
            />
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setEditVersionDialogOpen(false)}
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                disabled={busy}
                onClick={() => void handleSaveVersion()}
                type="button"
                variant="default"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete release confirmation */}
      <Dialog
        onOpenChange={(open) => {
          if (!open) setDeleteDialogOpen(false);
        }}
        open={deleteDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete release</DialogTitle>
            <DialogDescription>
              This will remove the release tag from all tasks tagged with{" "}
              <strong>{selectedRelease?.name}</strong>. The release and its
              association with tasks will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              type="button"
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              disabled={busy}
              onClick={() => void handleDelete()}
              type="button"
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add tasks to release dialog */}
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            setTagDialogOpen(false);
            setTagSelected(new Set());
            setTagSearch("");
          } else {
            // Pre-select tasks already tagged with this release
            setTagSelected(new Set(currentlyTaggedIds));
          }
        }}
        open={tagDialogOpen}
      >
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {currentlyTaggedIds.size > 0
                ? `Manage tasks in ${selectedRelease?.name}`
                : `Add tasks to ${selectedRelease?.name}`}
            </DialogTitle>
            <DialogDescription>
              {currentlyTaggedIds.size > 0
                ? "Select or deselect tasks to update this release's tagging."
                : "Select tasks to tag for this release."}
            </DialogDescription>
          </DialogHeader>
          <div className="relative mb-2">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Search tasks"
              className="h-8 pl-7 text-xs"
              onChange={(e) => setTagSearch(e.target.value)}
              placeholder="Search tasks by title or folder"
              value={tagSearch}
            />
          </div>
          <ScrollArea className="h-80">
            <div className="space-y-0.5 pr-2">
              {filteredDialogTasks.map((task) => {
                const folderName = task.folderId
                  ? folderNames.get(task.folderId)
                  : null;
                const alreadyTagged = currentlyTaggedIds.has(task.id);
                return (
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:bg-accent/60",
                      tagSelected.has(task.id) && "border-border bg-accent",
                      alreadyTagged && "ring-1 ring-primary/30",
                    )}
                    key={task.id}
                  >
                    <input
                      checked={tagSelected.has(task.id)}
                      className="size-3.5 shrink-0 accent-primary"
                      onChange={() => toggleTagSelected(task.id)}
                      type="checkbox"
                    />
                    <span
                      className="mt-0.5 size-1.5 shrink-0 rounded-full"
                      aria-hidden
                      style={{
                        backgroundColor: STATUS_DOT[task.status],
                      }}
                    />
                    <span className="min-w-0 flex-1 truncate text-xs">
                      {task.title}
                    </span>
                    {folderName && (
                      <span className="hidden max-w-[120px] truncate text-[11px] text-muted-foreground sm:inline">
                        {folderName}
                      </span>
                    )}
                    <span className="shrink-0 rounded border border-border bg-muted/50 px-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {task.status}
                    </span>
                    {alreadyTagged && (
                      <span className="shrink-0 rounded border border-primary/40 bg-primary/10 px-1.5 text-[10px] uppercase tracking-wider text-primary">
                        tagged
                      </span>
                    )}
                  </label>
                );
              })}
              {!filteredDialogTasks.length && (
                <div className="px-3 py-10 text-center text-xs text-muted-foreground">
                  {tagSearch.trim()
                    ? "No tasks match this search."
                    : "No tasks yet. Create some in the Tasks view."}
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-muted-foreground">
              {tagSelected.size} of {filteredDialogTasks.length} task
              {filteredDialogTasks.length === 1 ? "" : "s"} selected
            </span>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setTagDialogOpen(false);
                  setTagSelected(new Set());
                  setTagSearch("");
                }}
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
              {(() => {
                const toTagCount = Array.from(tagSelected).filter(
                  (id) => !currentlyTaggedIds.has(id),
                ).length;
                const toUntagCount = Array.from(currentlyTaggedIds).filter(
                  (id) => !tagSelected.has(id),
                ).length;
                const noChanges =
                  toTagCount === 0 && toUntagCount === 0;
                const label = noChanges
                  ? "Save"
                  : toUntagCount > 0 && toTagCount > 0
                    ? "Update"
                    : toUntagCount > 0
                      ? `Remove (${toUntagCount})`
                      : `Add (${toTagCount})`;
                return (
                  <Button
                    disabled={busy || noChanges}
                    onClick={() => void handleAddTagged()}
                    type="button"
                    variant="default"
                  >
                    {label}
                  </Button>
                );
              })()}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
