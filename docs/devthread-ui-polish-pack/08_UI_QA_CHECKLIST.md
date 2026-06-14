# UI QA Checklist

Use this after each phase and before final delivery.

## Global

- [ ] App uses shared tokens, not random colors.
- [ ] Borders are subtle and not overused.
- [ ] Accent color is used intentionally.
- [ ] Text hierarchy is clear.
- [ ] Hover states exist on clickable elements.
- [ ] Focus states are visible for keyboard users.
- [ ] Disabled states are clear.
- [ ] Empty states are helpful.
- [ ] No page has accidental-looking blank space.
- [ ] No control has inconsistent height compared to similar controls.

## App shell

- [ ] Active global nav item is obvious.
- [ ] Sidebar selected item is obvious.
- [ ] Sidebar is readable at 1280px width.
- [ ] Footer/status bar is quiet and useful.

## Task page

- [ ] Task title and status are immediately visible.
- [ ] Composer is clearly the primary input.
- [ ] Timeline is readable.
- [ ] System events are less visually heavy than user notes.
- [ ] Metadata is aligned and muted.

## Metrics page

- [ ] Range segmented control is polished.
- [ ] Stat cards align and have consistent hierarchy.
- [ ] Chart has title, description, and meaningful goal line.
- [ ] Heatmap cells look intentional and polished.
- [ ] Weekly/monthly bars are aligned and readable.

## Releases page

- [ ] Release list has clear selected state.
- [ ] Empty selected-tasks area is helpful.
- [ ] Task rows are clickable and readable.
- [ ] Tabs and save/action buttons are clear.

## Search / command palette

- [ ] Overlay dims/blur background.
- [ ] Palette is centered/lifted.
- [ ] Empty state gives examples.
- [ ] Keyboard selection is visible.
- [ ] ESC behavior works.

## Settings

- [ ] Modal size is appropriate.
- [ ] Left nav selected state is clear.
- [ ] Settings are grouped into cards/rows.
- [ ] Controls do not stretch awkwardly.
- [ ] Modal close/escape behavior works.

## Responsiveness

Test these sizes:

- [ ] 1280x800
- [ ] 1440x900
- [ ] 1920x1080

Check:

- [ ] No horizontal scroll unless intentionally present.
- [ ] Header actions do not overlap.
- [ ] Sidebar width remains usable.
- [ ] Dialogs fit on screen.

