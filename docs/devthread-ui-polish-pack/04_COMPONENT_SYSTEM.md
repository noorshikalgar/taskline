# Component System

Build/refactor these reusable components first. Page polish will be much easier after this.

## AppShell

Structure:

- Window title bar area if needed.
- Left icon rail.
- Optional contextual sidebar.
- Main content region.
- Optional footer/status bar.

Rules:

- Rail background: `--dt-bg-app` or `--dt-bg-shell`.
- Main background: `--dt-bg-surface`.
- Avoid heavy vertical lines. Use subtle border only between major regions.
- Active global nav item should use soft accent background, not only icon color.

## PageHeader

Every page should use the same header pattern.

Content:

- Eyebrow label optional: `WORKLOG METRICS`, `RELEASES`, `TASK`.
- Page title.
- Subtitle/metadata.
- Right actions.

Style:

- Padding: 20px 24px.
- Border-bottom: subtle.
- Title: 20px/24px semibold.
- Subtitle: muted 12px/16px.
- Right actions aligned center.

## Panel

Use for large content groups.

Variants:

- `default`: normal page card.
- `lifted`: dialogs, command palette, focused editor.
- `quiet`: no strong border, just surface.

Style:

- Background: `--dt-bg-surface-2`.
- Border: `1px solid var(--dt-border-subtle)`.
- Radius: 10-12px.
- Padding: 16-20px.

## Card / StatCard

Current metric cards are okay but need polish.

Rules:

- Use consistent height.
- Label small/muted.
- Value large/strong.
- Optional trend/help text below.
- Hover only if clickable.

Example hierarchy:

- Label: 12px, muted.
- Value: 22px, semibold, primary.
- Detail: 12px, muted.

## Button

Variants:

- Primary: amber filled.
- Secondary: neutral surface.
- Ghost: transparent hover.
- Danger: red ghost or subtle.
- Icon: square 30/34px.

Rules:

- Same height across toolbar.
- Primary button should be obvious but not huge.
- Disable state should lower opacity and remove hover.

## Input / Search

Style:

- Background: `--dt-bg-surface-2` or `--dt-bg-surface-3`.
- Border: subtle.
- Focus border: accent.
- Focus shadow: `--dt-glow-accent`.
- Placeholder: faint.
- Left icon muted.

Search fields should feel like command inputs, not old form boxes.

## Tabs / SegmentedControl

Use for time ranges, release tasks/notes, filters.

Rules:

- Segmented controls should have one shared rounded container.
- Active item uses lifted surface or accent underline.
- Avoid each tab looking like separate bordered buttons.

## Badge / Pill

Use for statuses, privacy, counts.

Rules:

- Small radius full.
- Background subtle.
- Text 11-12px.
- Status colors only when meaningful.
- Counts should be muted chips.

## TimelineItem

For task updates.

Improve:

- Cleaner vertical line.
- Icon in small rounded square/dot.
- Metadata aligned right but muted.
- Body card optional for longer notes.
- Day separators should be quieter and cleaner.

## CommandPalette

Current palette direction is good but needs premium finish.

Rules:

- Full-screen overlay with blur/dim.
- Palette width 640-720px.
- Top margin around 8-12vh.
- Lifted panel shadow.
- Search input integrated into top row.
- Results have clear hover/selected states.
- Empty state should guide with examples.
- Keyboard hints aligned right.

## Dialog / SettingsModal

Rules:

- Max width around 860-960px, not too huge.
- Use lifted background and shadow.
- Left nav 180-220px.
- Content max width inside modal to avoid stretched controls.
- Settings rows should be grouped into cards.
- Close button should have clear hover.

## Heatmap

Reference: Codex heatmap feels polished because cells are small, consistent, and low noise.

Rules:

- Cell size: 12-14px.
- Gap: 3-4px.
- Radius: 3-4px.
- Empty: subtle surface with border or low opacity.
- Active: 4 intensity levels.
- Today: accent outline.
- Legend aligned top/right.
- Tooltip on hover.
- Do not leave huge empty space unless layout intentionally centers or explains it.

## Charts

Rules:

- Use panel header: title, description, summary badge.
- Grid lines subtle.
- Axis labels small and muted.
- Goal line should be blue/cyan, thin, dashed.
- Actual line amber.
- Use tooltip with date and duration.
- Avoid bright labels directly on chart unless useful.

