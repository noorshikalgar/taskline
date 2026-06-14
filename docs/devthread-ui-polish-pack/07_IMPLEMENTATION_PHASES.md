# Implementation Phases

Use this order. Do not jump directly into random page redesign.

## Phase 0: Audit current code

Tasks:

1. Identify framework and styling approach.
2. Locate global CSS/theme files.
3. Locate page components for tasks, releases, metrics, settings, search.
4. Find repeated UI patterns already implemented.
5. Note risky areas where logic and UI are tightly coupled.

Output before coding:

- Files to change.
- Existing styling system summary.
- Component extraction plan.

## Phase 1: Add design tokens

Tasks:

1. Add token variables from `03_DESIGN_TOKENS.md`.
2. Map existing colors to new tokens.
3. Avoid changing page layouts yet.
4. Ensure app still renders.

Acceptance:

- No broken screens.
- Global colors are available.
- Existing UI may still look similar, but tokens are ready.

## Phase 2: Build shared primitives

Create/refactor:

- Button
- IconButton
- Input/SearchInput
- Select
- Badge/Pill
- Tabs/SegmentedControl
- Panel/Card
- StatCard
- PageHeader
- EmptyState
- Dialog
- CommandPalette shell

Acceptance:

- Components have variants.
- Components use tokens only.
- Hover/focus/disabled states exist.

## Phase 3: App shell polish

Tasks:

1. Improve left icon rail.
2. Improve contextual sidebars.
3. Improve footer/status bar.
4. Normalize layout padding.
5. Ensure selected/hover/focus states are consistent.

Acceptance:

- The app immediately feels more native and premium before page-level changes.

## Phase 4: Task/worklog page

Tasks:

1. Replace header with PageHeader pattern.
2. Polish task composer.
3. Polish timeline entries.
4. Polish sidebar task tree.
5. Add better empty states.

Acceptance:

- Entry composer is the clear primary action.
- Timeline is readable.
- Sidebar feels structured, not cluttered.

## Phase 5: Metrics page

Tasks:

1. Use PageHeader.
2. Polish stat cards.
3. Polish chart panel.
4. Polish heatmap panel.
5. Polish weekly/monthly total panels.
6. Ensure responsive behavior.

Acceptance:

- Comparable in quality to Codex token/activity page direction.
- Data is clearer than before.

## Phase 6: Releases page

Tasks:

1. Polish release sidebar.
2. Polish release header/actions.
3. Polish tabs.
4. Polish selected/other task sections.
5. Add release empty states.
6. Polish release notes editor/preview if present.

Acceptance:

- No huge accidental empty/unfinished areas.
- Task selection flow feels obvious.

## Phase 7: Settings modal

Tasks:

1. Polish overlay and modal container.
2. Improve nav.
3. Convert settings into grouped cards/rows.
4. Improve inputs/selects.
5. Reduce accidental blank space.

Acceptance:

- Settings feels like native preferences.

## Phase 8: Command palette

Tasks:

1. Polish overlay.
2. Improve input row.
3. Improve empty state.
4. Improve result rows and selected state.
5. Confirm keyboard navigation.

Acceptance:

- Looks like a core premium feature.

## Phase 9: QA and screenshots

Run:

- Typecheck/lint/test if available.
- Manual UI review.
- Screenshot compare at 1280x800 and 1440x900.
- Use `08_UI_QA_CHECKLIST.md`.

Output:

- Changed files.
- Screenshots if possible.
- Known issues.
- Follow-up recommendations.

