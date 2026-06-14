# Tables, Lists, Filters, and Search

Data UI should help users find, compare, decide, and act.

## Table vs list vs cards

Use a table when:

- Users compare records.
- Sorting/filtering matters.
- There are repeated fields.
- Numeric/status data matters.

Use a list when:

- Each row has a title, description, metadata, and action.
- Comparison is secondary.

Use cards when:

- Items are visual or heterogeneous.
- Browsing matters more than comparison.

## Table basics

- Sticky header for long tables.
- Clear column labels.
- Sortable columns show sort direction.
- Keep primary object/name first.
- Keep row actions consistent.
- Use pagination or virtualization for large data.
- Allow column visibility in power-user apps.

## Filters

Filter design:

- Frequently used filters are visible.
- Advanced filters can live in a panel/drawer.
- Active filters are shown as chips.
- Users can clear one filter or all filters.
- Filtered empty state should say no results match filters.

## Search

Search states:

- Initial prompt.
- Loading suggestions/results.
- Results.
- No results.
- Error.
- Recent searches if useful.

Search should support:

- Debounce.
- Keyboard navigation.
- Highlighted matches.
- Clear button.
- Query persistence when returning to page.

## Bulk actions

Bulk action pattern:

1. User selects rows.
2. Selection toolbar appears.
3. Toolbar shows selected count.
4. Actions are limited to valid actions.
5. Destructive bulk actions need confirmation.
6. After action, show success/failure per item if partial failure possible.

## Edge cases

- Partial loading: show loaded rows and skeleton rows below.
- Row error: show row-level status; do not fail whole table if possible.
- Permissions: disable unavailable row actions with explanation.
- Empty data: create/import guidance.
- Huge datasets: server-side filtering/sorting, not client-only.
