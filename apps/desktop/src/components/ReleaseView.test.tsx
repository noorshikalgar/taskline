// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ReleaseView } from "./ReleaseView";
import type { Folder, Release, Task } from "@/lib/types";
import { renderWithProviders as render } from "@/test-utils";

vi.mock("@/lib/api", () => ({
  api: {
    updateRelease: vi.fn(),
  },
}));

import { api } from "@/lib/api";

const release: Release = {
  name: "v0.3",
  version: "0.3.0",
  descriptionMarkdown: "",
  releasedAt: null,
  folderId: null,
  createdAt: "2026-06-05T00:00:00Z",
  updatedAt: "2026-06-05T00:00:00Z",
};

const folder: Folder = {
  id: "folder-a",
  name: "UI",
  releaseName: null,
  createdAt: "2026-06-05T00:00:00Z",
  updatedAt: "2026-06-05T00:00:00Z",
};

const task: Task = {
  id: "task-a",
  title: "Refine release notes",
  descriptionMarkdown: "",
  status: "active",
  nextStep: null,
  estimatedMinutes: null,
  folderId: "folder-a",
  releaseName: "v0.3",
  createdAt: "2026-06-05T00:00:00Z",
  updatedAt: "2026-06-05T00:00:00Z",
};

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("ReleaseView template persistence", () => {
  it("loads the template from the release on mount and persists saves", async () => {
    const onReleasesChanged = vi.fn().mockResolvedValue(undefined);
    render(
      <ReleaseView
        folders={[folder]}
        onReleasesChanged={onReleasesChanged}
        onRemoveTaskTag={vi.fn()}
        onSelectTask={vi.fn()}
        onTagTask={vi.fn()}
        releases={[release]}
        tasks={[task]}
      />,
    );

    const editor = screen.getByLabelText(
      "Release notes template",
    ) as HTMLTextAreaElement;
    fireEvent.change(editor, { target: { value: "# {{name}}\n\nMy notes" } });

    const saveButton = await screen.findByRole("button", {
      name: /Save template/,
    });
    fireEvent.click(saveButton);

    await waitFor(() =>
      expect(api.updateRelease).toHaveBeenCalledWith("v0.3", {
        descriptionMarkdown: "# {{name}}\n\nMy notes",
      }),
    );
    await waitFor(() => expect(onReleasesChanged).toHaveBeenCalled());
  });

  it("refreshes releases on mount so saved templates are always loaded", async () => {
    const onReleasesChanged = vi.fn().mockResolvedValue(undefined);
    render(
      <ReleaseView
        folders={[folder]}
        onReleasesChanged={onReleasesChanged}
        onRemoveTaskTag={vi.fn()}
        onSelectTask={vi.fn()}
        onTagTask={vi.fn()}
        releases={[
          { ...release, descriptionMarkdown: "# Saved template" },
        ]}
        tasks={[task]}
      />,
    );

    await waitFor(() => expect(onReleasesChanged).toHaveBeenCalled());

    const editor = screen.getByLabelText(
      "Release notes template",
    ) as HTMLTextAreaElement;
    await waitFor(() =>
      expect(editor.value).toBe("# Saved template"),
    );
  });

  it("loads the saved template content into the editor from release data", async () => {
    const onReleasesChanged = vi.fn().mockResolvedValue(undefined);
    render(
      <ReleaseView
        folders={[]}
        onReleasesChanged={onReleasesChanged}
        onRemoveTaskTag={vi.fn()}
        onSelectTask={vi.fn()}
        onTagTask={vi.fn()}
        releases={[
          {
            ...release,
            descriptionMarkdown: "# My persistent template\n- Item 1",
          },
        ]}
        tasks={[]}
      />,
    );

    const editor = screen.getByLabelText(
      "Release notes template",
    ) as HTMLTextAreaElement;
    await waitFor(() =>
      expect(editor.value).toBe("# My persistent template\n- Item 1"),
    );
  });
});
