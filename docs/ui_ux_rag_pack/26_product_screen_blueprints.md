# 26 — Product Screen Blueprints

Purpose: give agents repeatable page structures.

## Universal screen anatomy

```txt
Page title area
- title
- short description
- primary action if relevant
- secondary/global actions if relevant

Control area
- search
- filters
- tabs/views
- sort/group controls

Content area
- list/table/cards/detail/editor/chart

Support area
- help text
- contextual docs
- shortcuts
- audit/history

State area
- loading
- empty
- error
- no results
- permission denied
```

## Dashboard blueprint

Use when the user needs monitoring/overview.

```txt
Top: title, date range, primary action
Row 1: key metrics / health cards
Row 2: main chart or important operational view
Row 3: recent activity, tasks, alerts, breakdowns
Right rail optional: recommendations, filters, status
```

Rules:
- Put decision-critical metrics first.
- Avoid vanity metrics unless they support action.
- Every chart needs label, timeframe, units, and empty/error state.

## List/table blueprint

```txt
Header: title + create/export action
Toolbar: search + filters + view options
Bulk bar: appears when rows selected
Table/list: sortable columns, row actions
Footer: pagination / load more / result count
Empty/no-results states
```

## Detail page blueprint

```txt
Header: object name + status + key actions
Summary: most important fields
Tabs/sections: overview, activity, settings, history
Side panel: metadata, owner, timestamps, links
Danger zone: separated at bottom/settings
```

## Create/edit form blueprint

```txt
Header: create/edit context
Form sections: grouped by meaning
Inline validation
Preview/summary if high-impact
Footer: cancel/save, sticky for long forms
```

## Settings page blueprint

```txt
Sidebar/list of settings categories
Main panel with grouped controls
Danger zone separated
Save model: auto-save for simple preferences, explicit save for risky settings
```

## Activity/log page blueprint

```txt
Toolbar: search, filter by actor/action/date/status
Timeline/list: timestamp, actor, action, target
Expandable details
Export/download if enterprise use
```

## Agent must generate these states for every screen

- First-time empty state.
- User has data state.
- Filter returns no results.
- Loading slow network state.
- Error and retry state.
- Permission denied state.
- Mobile collapsed state.
- Long content overflow state.
