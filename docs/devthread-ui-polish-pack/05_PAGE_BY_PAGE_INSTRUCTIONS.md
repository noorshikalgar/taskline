# Page-by-Page UI Instructions

## 1. Main task/worklog page

Current screen has a strong product idea but feels dense and old.

### Improve shell

- Keep the left global rail, but make icons sit in 32-36px rounded buttons.
- Active icon should have soft accent background and clear indicator.
- Context sidebar should feel like a panel, not a file explorer clone.
- Sidebar section titles should be muted uppercase 11px with letter spacing.
- Selected task/folder should use surface lift + subtle accent dot/line.

### Improve page header

Current header:

- Title + status + links + release + time data.

Better structure:

- Left: task title and breadcrumbs/folder.
- Under title: status pill, privacy, release assignment, link count.
- Right: estimate, logged time, more actions.
- Keep one row only when enough width; stack gracefully.

### Improve entry composer

Current composer looks like a big bordered textbox with toolbar.

Target:

- Make it the primary focus card.
- Use lifted panel background.
- Placeholder should be softer and clearer: `Write an update… use @ to change type`.
- Toolbar should be integrated into bottom strip.
- Primary Add button should be clear and aligned right.
- When focused, use accent glow/border.
- Add keyboard hint: `⌘ Enter to add` or platform equivalent if supported.

### Improve timeline

- Day separators should be subtle with count chip on the right.
- Timeline vertical line should be faint.
- Status-change entries should be compact system events.
- Human notes should appear as richer cards.
- Timestamps should use mono/faint style.
- Privacy badge should be less visually heavy.

### Acceptance

- User can immediately see task name, current status, and where to type update.
- Timeline feels readable, not like raw logs.
- Left sidebar is useful but not visually dominant.

## 2. Metrics / Worklog dashboard

Current screen has useful data but looks like an old chart page.

### Header

Use common PageHeader:

- Eyebrow: `WORKLOG METRICS`
- Title: `Time spent across tasks`
- Subtitle: `Last updated Jun 12, 2026`
- Right: segmented range control.

### Stats row

Keep cards:

- Total
- Daily avg
- Best day
- Logged days

Improve:

- Equal card height.
- Better label/value hierarchy.
- Add small details where useful.
- Use a responsive grid.

### Daily hours chart

- Use one clean panel.
- Header inside panel: `Daily hours`, description, right badge like `1 day above goal`.
- Chart should not touch panel edges.
- Grid lines less visible.
- Axis labels muted and consistent.
- Goal line should be cyan/blue dashed.
- Spike line should be amber.
- Add hover tooltip if possible.

### Heatmap

Current heatmap has a lot of empty panel space.

Fix:

- Put heatmap and legend into a deliberate layout.
- Consider adding month labels and weekday hints if data supports it.
- Use better cell styling.
- Add a small summary chip: `2 logged days / best 1d 7h`.
- Make today outline clear but not too thick.

### Weekly/monthly totals

- Use consistent panels.
- Bars should have subtle track and amber fill.
- Text aligned with clear label/value.
- Use duration formatting consistently.

### Acceptance

- At first glance user sees total, average, best day, and chart story.
- Dashboard feels like a premium analytics screen, not debug output.

## 3. Releases page

Current release page has a lot of empty space and weak hierarchy.

### Sidebar

- Release list should use cards/rows with title, date, task count.
- Selected release should have stronger surface and accent left border/dot.
- New button should be compact but obvious.

### Header

- Title: release name.
- Subtitle: release date and selected task count.
- Actions: duplicate/edit/delete/save grouped logically.

### Tabs

- Use shared tabs.
- Active tab should be obvious.
- Save action should not look disabled unless it is disabled.

### Task assignment area

Current selected area says no tasks tagged yet and looks like a dashed debug region.

Improve empty state:

- Title: `No tasks selected for this release`
- Description: `Select tasks below to include their updates in the release notes.`
- Optional action: `Select all active tasks` if safe.

### Task list

- Rows should be clickable.
- Checkbox alignment and hover states should be polished.
- Show status pill and folder/workspace metadata.
- Add empty/search result states.

### Release notes tab

If release notes editor exists:

- Use a document-like editor panel.
- Show preview/export actions clearly.
- Empty notes should provide a template suggestion.

### Acceptance

- Release creation and task selection feel intentional.
- Empty areas no longer look unfinished.

## 4. Search / command palette

Current palette is close to premium but can be better.

Improve:

- Overlay should dim and blur background.
- Palette should have strong lifted shadow.
- Search input should be integrated with icon and shortcut hint.
- Empty state should include examples:
  - `Try: active tasks`
  - `Try: release june`
  - `Try: blocker`
- Result rows should show type, title, context, shortcut/action.
- Selected result should use accent-tinted background.

Acceptance:

- Looks like a core feature, not an overlay form.

## 5. Settings modal

Current settings page is functional but old.

### Modal

- Centered, max width 900px.
- Use lifted panel and shadow.
- Background overlay with blur/dim.
- Reduce unnecessary height.

### Left nav

- Better selected state.
- Icons optional but useful.
- Consistent row height.

### General page

Group into cards:

1. Appearance
   - Theme selector
   - Optional short preview swatches.
2. Worklog
   - Hours per day
   - Break minutes
   - Explain how it affects charts.

### Inputs/selects

- Use shared Input/Select.
- Avoid controls stretching too wide.
- Use max width 360-420px for fields.

### Acceptance

- Settings feels like a premium native app preferences window.
- No huge accidental blank areas.

## 6. Global empty/loading/error states

Create shared states:

### Empty state pattern

- Icon
- Title
- Description
- Primary action if available
- Secondary hint if useful

### Loading state

- Use skeletons for cards/lists.
- Avoid full-page spinners.

### Error state

- Explain what failed.
- Provide retry action.
- Keep error styles calm.

## 7. Footer/status bar

Current footer with `Local-first / v0.3.1 / Active...` is useful.

Polish:

- Make it thinner and quieter.
- Use mono text.
- Separate items with subtle dividers.
- Current task on right is good; keep it.

