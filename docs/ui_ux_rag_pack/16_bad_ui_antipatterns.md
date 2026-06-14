# Bad UI Anti-patterns

Use this file to detect weak UI quickly.

## Clarity failures

- Icon-only buttons with no accessible label.
- Multiple primary buttons competing.
- Vague actions: `Submit`, `Proceed`, `Manage`.
- No page title/context.
- Current workspace/object not visible.

## State failures

- Full-page spinner for everything.
- No loading state on clicked button.
- Empty table with no explanation.
- Error toast disappears before user can read.
- Success message but no visible state change.
- Disabled button with no reason.

## Form failures

- Premature validation while typing.
- Generic `Invalid input` errors.
- Lost data after failed submit.
- Placeholder used as label.
- Dropdown with hundreds of options and no search.
- Required fields unclear.

## Navigation failures

- Important page hidden in profile menu.
- Hamburger on desktop for core app sections.
- Tabs used as wizard steps.
- Breadcrumbs used as main navigation.
- Modal on top of modal.

## Visual failures

- Random spacing values.
- Too many shadows/borders/colors.
- Low contrast text.
- Dense dashboard with no grouping.
- Marketing-style animation in frequent workflow.

## Data UI failures

- Cards used where table comparison is needed.
- No sorting/filtering for large lists.
- Infinite scroll where users need position memory.
- No active filter visibility.
- No partial failure handling for bulk action.

## Accessibility failures

- Focus invisible.
- Modal focus not trapped.
- Escape key does nothing.
- Color-only status.
- Hover-only menus on touch.
- Text clipped at zoom.
