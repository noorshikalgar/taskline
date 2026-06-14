// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TaskSidebar } from "./TaskSidebar";
import type { Folder, Task } from "@/lib/types";
import { renderWithProviders as render } from "../test-utils";

const baseTask: Task = {
  id: "task-1",
  title: "Refine sidebar",
  descriptionMarkdown: "",
  status: "active",
  nextStep: null,
  estimatedMinutes: null,
  folderId: null,
  releaseName: null,
  createdAt: "2026-06-05T00:00:00Z",
  updatedAt: "2026-06-05T00:00:00Z",
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("TaskSidebar", () => {
  it("creates a new task immediately when the new task button is pressed", async () => {
    const create = vi.fn().mockResolvedValue(undefined);
    render(
      <TaskSidebar
        folders={[]}
        onCreate={create}
        onCreateFolder={vi.fn()}
        onCopyFolder={vi.fn()}
        onDeleteTask={vi.fn()}
        onDeleteFolder={vi.fn()}
        onMoveTask={vi.fn()}
        onRenameFolder={vi.fn()}
        onSelect={() => undefined}
        selectedId={null}
        tasks={[]}
      />,
    );

    fireEvent.click(screen.getByLabelText("New task"));

    await waitFor(() => expect(create).toHaveBeenCalledOnce());
  });

  it("asks for a folder name before creating a folder", async () => {
    const createFolder = vi.fn().mockResolvedValue(undefined);
    render(
      <TaskSidebar
        folders={[]}
        onCreate={vi.fn()}
        onCreateFolder={createFolder}
        onCopyFolder={vi.fn()}
        onDeleteTask={vi.fn()}
        onDeleteFolder={vi.fn()}
        onMoveTask={vi.fn()}
        onRenameFolder={vi.fn()}
        onSelect={() => undefined}
        selectedId={null}
        tasks={[]}
      />,
    );

    fireEvent.click(screen.getByLabelText("New folder"));
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Frontend polish" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() =>
      expect(createFolder).toHaveBeenCalledWith("Frontend polish"),
    );
  });

  it("groups tasks under their folder and falls back to ungrouped", () => {
    const folders: Folder[] = [
      {
        id: "folder-a",
        name: "In progress with a very long folder name",
        releaseName: null,
        createdAt: "2026-06-05T00:00:00Z",
        updatedAt: "2026-06-05T00:00:00Z",
      },
    ];
    const tasks: Task[] = [
      {
        ...baseTask,
        id: "t-1",
        title: "Grouped task with a very long readable title",
        folderId: "folder-a",
        status: "planned",
      },
      { ...baseTask, id: "t-2", title: "Loose", status: "planned" },
    ];

    render(
      <TaskSidebar
        folders={folders}
        onCreate={vi.fn()}
        onCreateFolder={vi.fn()}
        onCopyFolder={vi.fn()}
        onDeleteTask={vi.fn()}
        onDeleteFolder={vi.fn()}
        onMoveTask={vi.fn()}
        onRenameFolder={vi.fn()}
        onSelect={() => undefined}
        selectedId={null}
        tasks={tasks}
      />,
    );

    expect(
      screen.getAllByText("In progress with a very long folder name"),
    ).toHaveLength(1);
    expect(
      screen.getByRole("button", {
        name: /In progress with a very long folder name/,
      }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText("Grouped task with a very long readable title"),
    ).toHaveClass("truncate");
    expect(screen.getByText("Loose")).toBeInTheDocument();
  });

  it("hides empty folders and shows a no-match message while searching", () => {
    const folders: Folder[] = [
      {
        id: "folder-a",
        name: "Atlas Notes",
        releaseName: null,
        createdAt: "2026-06-05T00:00:00Z",
        updatedAt: "2026-06-05T00:00:00Z",
      },
      {
        id: "folder-b",
        name: "Testing",
        releaseName: null,
        createdAt: "2026-06-05T00:00:00Z",
        updatedAt: "2026-06-05T00:00:00Z",
      },
    ];

    render(
      <TaskSidebar
        folders={folders}
        onCreate={vi.fn()}
        onCreateFolder={vi.fn()}
        onCopyFolder={vi.fn()}
        onDeleteTask={vi.fn()}
        onDeleteFolder={vi.fn()}
        onMoveTask={vi.fn()}
        onRenameFolder={vi.fn()}
        onSelect={() => undefined}
        selectedId={null}
        tasks={[]}
      />,
    );

    const search = screen.getByLabelText("Search tasks");
    expect(search).toHaveAttribute("autocomplete", "off");

    fireEvent.change(search, { target: { value: "titles" } });

    expect(screen.queryByText("Atlas Notes")).not.toBeInTheDocument();
    expect(screen.queryByText("Testing")).not.toBeInTheDocument();
    expect(screen.getByText("No tasks match “titles”.")).toBeInTheDocument();
  });

  it("shows a compact message inside expanded empty folders", () => {
    const folders: Folder[] = [
      {
        id: "folder-a",
        name: "Atlas Notes",
        releaseName: null,
        createdAt: "2026-06-05T00:00:00Z",
        updatedAt: "2026-06-05T00:00:00Z",
      },
    ];

    render(
      <TaskSidebar
        folders={folders}
        onCreate={vi.fn()}
        onCreateFolder={vi.fn()}
        onCopyFolder={vi.fn()}
        onDeleteTask={vi.fn()}
        onDeleteFolder={vi.fn()}
        onMoveTask={vi.fn()}
        onRenameFolder={vi.fn()}
        onSelect={() => undefined}
        selectedId={null}
        tasks={[]}
      />,
    );

    expect(screen.getByText("No tasks in this folder")).toBeInTheDocument();
  });

  it("limits long search input and truncates the no-match query", () => {
    render(
      <TaskSidebar
        folders={[]}
        onCreate={vi.fn()}
        onCreateFolder={vi.fn()}
        onCopyFolder={vi.fn()}
        onDeleteTask={vi.fn()}
        onDeleteFolder={vi.fn()}
        onMoveTask={vi.fn()}
        onRenameFolder={vi.fn()}
        onSelect={() => undefined}
        selectedId={null}
        tasks={[]}
      />,
    );

    const search = screen.getByLabelText("Search tasks") as HTMLInputElement;
    const longQuery = "1234567890".repeat(10);

    expect(search).toHaveAttribute("maxlength", "80");
    fireEvent.change(search, { target: { value: longQuery } });

    expect(search.value).toHaveLength(80);
    expect(screen.getByText(/No tasks match/)).toHaveTextContent(
      "No tasks match “1234567890123456789012345678...”.",
    );
    expect(screen.queryByText(longQuery)).not.toBeInTheDocument();
  });

  it("replaces the search icon with a clear action while searching", () => {
    render(
      <TaskSidebar
        folders={[]}
        onCreate={vi.fn()}
        onCreateFolder={vi.fn()}
        onCopyFolder={vi.fn()}
        onDeleteTask={vi.fn()}
        onDeleteFolder={vi.fn()}
        onMoveTask={vi.fn()}
        onRenameFolder={vi.fn()}
        onSelect={() => undefined}
        selectedId={null}
        tasks={[]}
      />,
    );

    const search = screen.getByLabelText("Search tasks") as HTMLInputElement;
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: "bug" } });
    fireEvent.click(screen.getByLabelText("Clear search"));

    expect(search.value).toBe("");
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("shows matching tasks as flat results without folder rows while searching", () => {
    const folders: Folder[] = [
      {
        id: "folder-a",
        name: "Atlas Notes",
        releaseName: null,
        createdAt: "2026-06-05T00:00:00Z",
        updatedAt: "2026-06-05T00:00:00Z",
      },
    ];

    render(
      <TaskSidebar
        folders={folders}
        onCreate={vi.fn()}
        onCreateFolder={vi.fn()}
        onCopyFolder={vi.fn()}
        onDeleteTask={vi.fn()}
        onDeleteFolder={vi.fn()}
        onMoveTask={vi.fn()}
        onRenameFolder={vi.fn()}
        onSelect={() => undefined}
        selectedId={null}
        tasks={[
          {
            ...baseTask,
            id: "t-1",
            folderId: "folder-a",
            title: "Testing Task for Bugs",
          },
        ]}
      />,
    );

    fireEvent.change(screen.getByLabelText("Search tasks"), {
      target: { value: "testing" },
    });

    expect(screen.queryByText("Atlas Notes")).not.toBeInTheDocument();
    expect(screen.queryByText("Active tasks")).not.toBeInTheDocument();
    expect(screen.getByText("Search results")).toBeInTheDocument();
    expect(screen.getByText("Testing Task for Bugs")).toBeInTheDocument();
  });

  it("collapses and expands a folder without selecting a task", () => {
    const select = vi.fn();
    const folders: Folder[] = [
      {
        id: "folder-a",
        name: "UI",
        releaseName: null,
        createdAt: "2026-06-05T00:00:00Z",
        updatedAt: "2026-06-05T00:00:00Z",
      },
    ];

    render(
      <TaskSidebar
        folders={folders}
        onCreate={vi.fn()}
        onCreateFolder={vi.fn()}
        onCopyFolder={vi.fn()}
        onDeleteTask={vi.fn()}
        onDeleteFolder={vi.fn()}
        onMoveTask={vi.fn()}
        onRenameFolder={vi.fn()}
        onSelect={select}
        selectedId={null}
        tasks={[
          {
            ...baseTask,
            id: "t-1",
            title: "Testing the UI",
            folderId: "folder-a",
            status: "planned",
          },
        ]}
      />,
    );

    const folder = screen
      .getAllByRole("button")
      .find((button) => button.getAttribute("aria-expanded") === "true");
    expect(folder).toBeDefined();
    if (!folder) return;

    fireEvent.click(folder);

    expect(folder).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.getByText("Testing the UI").closest('[aria-hidden="true"]'),
    ).toBeInTheDocument();
    expect(select).not.toHaveBeenCalled();

    fireEvent.click(folder);
    expect(folder).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText("Testing the UI").closest('[aria-hidden="true"]'),
    ).not.toBeInTheDocument();
  });

  it("renames folders from the folder context menu", async () => {
    const renameFolder = vi.fn().mockResolvedValue(undefined);
    const folders: Folder[] = [
      {
        id: "folder-a",
        name: "Backlog",
        releaseName: null,
        createdAt: "2026-06-05T00:00:00Z",
        updatedAt: "2026-06-05T00:00:00Z",
      },
    ];

    render(
      <TaskSidebar
        folders={folders}
        onCreate={vi.fn()}
        onCreateFolder={vi.fn()}
        onCopyFolder={vi.fn()}
        onDeleteTask={vi.fn()}
        onDeleteFolder={vi.fn()}
        onMoveTask={vi.fn()}
        onRenameFolder={renameFolder}
        onSelect={() => undefined}
        selectedId={null}
        tasks={[]}
      />,
    );

    fireEvent.contextMenu(screen.getByText("Backlog"));
    fireEvent.click(screen.getByText("Rename folder"));
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Product polish" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Rename" }));

    await waitFor(() =>
      expect(renameFolder).toHaveBeenCalledWith("folder-a", "Product polish"),
    );
  });

  it("creates a task directly in a folder from the folder row action", async () => {
    const create = vi.fn().mockResolvedValue(undefined);
    const folders: Folder[] = [
      {
        id: "folder-a",
        name: "Backlog",
        releaseName: null,
        createdAt: "2026-06-05T00:00:00Z",
        updatedAt: "2026-06-05T00:00:00Z",
      },
    ];

    render(
      <TaskSidebar
        folders={folders}
        onCreate={create}
        onCreateFolder={vi.fn()}
        onCopyFolder={vi.fn()}
        onDeleteTask={vi.fn()}
        onDeleteFolder={vi.fn()}
        onMoveTask={vi.fn()}
        onRenameFolder={vi.fn()}
        onSelect={() => undefined}
        selectedId={null}
        tasks={[]}
      />,
    );

    fireEvent.click(screen.getByLabelText("New task in this folder"));

    await waitFor(() => expect(create).toHaveBeenCalledWith("folder-a"));

    fireEvent.contextMenu(screen.getByText("Backlog"));
    expect(screen.queryByText("New task in folder")).not.toBeInTheDocument();
  });

  it("copies a task summary from the task context menu", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(
      <TaskSidebar
        folders={[]}
        onCreate={vi.fn()}
        onCreateFolder={vi.fn()}
        onCopyFolder={vi.fn()}
        onDeleteTask={vi.fn()}
        onDeleteFolder={vi.fn()}
        onMoveTask={vi.fn()}
        onRenameFolder={vi.fn()}
        onSelect={() => undefined}
        selectedId={null}
        tasks={[{ ...baseTask, estimatedMinutes: 120, status: "planned" }]}
      />,
    );

    fireEvent.contextMenu(screen.getByText("Refine sidebar"));
    fireEvent.click(screen.getByText("Copy summary"));

    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith(
        "## Task: Refine sidebar\n\n- **Status:** Planned\n- **Estimate:** 2h",
      ),
    );
  });

  it("copies the folder as Markdown or CSV from the folder context menu", async () => {
    const onCopyFolder = vi.fn();
    const folders: Folder[] = [
      {
        id: "folder-a",
        name: "Backlog",
        releaseName: null,
        createdAt: "2026-06-05T00:00:00Z",
        updatedAt: "2026-06-05T00:00:00Z",
      },
    ];
    const tasks = [
      {
        ...baseTask,
        id: "t-1",
        title: "Refine sidebar",
        folderId: "folder-a",
        status: "planned" as const,
        estimatedMinutes: 120,
      },
    ];

    render(
      <TaskSidebar
        folders={folders}
        onCreate={vi.fn()}
        onCreateFolder={vi.fn()}
        onCopyFolder={onCopyFolder}
        onDeleteTask={vi.fn()}
        onDeleteFolder={vi.fn()}
        onMoveTask={vi.fn()}
        onRenameFolder={vi.fn()}
        onSelect={() => undefined}
        selectedId={null}
        tasks={tasks}
      />,
    );

    fireEvent.contextMenu(screen.getByText("Backlog"));
    fireEvent.click(screen.getByText("Copy"));
    fireEvent.click(screen.getByText("Copy as Markdown"));
    expect(onCopyFolder).toHaveBeenLastCalledWith(folders[0], "markdown");

    fireEvent.contextMenu(screen.getByText("Backlog"));
    fireEvent.click(screen.getByText("Copy"));
    fireEvent.click(screen.getByText("Copy as CSV"));
    expect(onCopyFolder).toHaveBeenLastCalledWith(folders[0], "csv");
  });
});
