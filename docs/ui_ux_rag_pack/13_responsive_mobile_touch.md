# Responsive, Mobile, and Touch UI

Responsive design is not just shrinking desktop. It is reprioritizing tasks by context.

## Breakpoint thinking

Design by content and task, not fixed device names.

Common layout shifts:

- Multi-column -> single column.
- Sidebar -> drawer/bottom nav.
- Table -> stacked rows/cards or horizontal scroll with sticky first column.
- Hover menus -> tap-triggered menus.
- Dense toolbars -> primary action + overflow.

## Touch rules

- Use large enough tap targets.
- Leave enough spacing between destructive and safe actions.
- Avoid hover-only information.
- Keep primary actions reachable.
- Use native input types for mobile keyboards.

## Mobile navigation

Use bottom nav when there are 3-5 high-frequency destinations. Use drawer when there are many secondary sections. Avoid hiding the only primary action inside a drawer.

## Mobile forms

- One column.
- Labels above inputs.
- Correct keyboard types.
- Avoid giant dropdowns; use searchable picker when options are many.
- Keep error text near fields.
- Preserve input after keyboard dismiss/reload.

## Mobile tables

Options:

- Convert to cards for simple data.
- Keep table with horizontal scroll for comparison-heavy data.
- Use priority columns: show key fields, collapse secondary details.
- Provide detail page for full data.

## Edge cases

- Small screens under 360px.
- Landscape phones.
- Dynamic type/text scaling.
- On-screen keyboard covering submit button.
- Safe areas/notches.
- Pull-to-refresh conflicts.
- Slow mobile network.
