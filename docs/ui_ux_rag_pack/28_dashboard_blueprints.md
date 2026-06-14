# 28 — Dashboard Blueprints

Purpose: design dashboards that support decisions, not just decoration.

## Dashboard types

### Operational dashboard
For daily work and alerts.

```txt
Priority: current state, blockers, alerts, queues, recent changes
Refresh: frequent
Density: medium/compact
Actions: acknowledge, assign, retry, open detail
```

### Analytical dashboard
For trends and investigation.

```txt
Priority: date ranges, segmentation, comparison, drill-down
Refresh: slower
Density: medium
Actions: filter, export, inspect, compare
```

### Executive dashboard
For high-level overview.

```txt
Priority: KPIs, status, trend direction, risk areas
Refresh: daily/weekly
Density: spacious
Actions: open report, export, share
```

## KPI card anatomy

```txt
Label
Current value
Comparison/trend
Time period
Status indicator if needed
Mini explanation/tooltip
```

Never show a number without context.

## Chart rules

- Title must state what is measured.
- Axis labels and units must be clear.
- Date range must be visible.
- Use color intentionally, not rainbow palettes.
- Provide empty states for no data.
- Provide loading skeletons that preserve layout.
- Allow drill-down when a chart drives action.

## Dashboard layout defaults

```txt
Top controls: date range + filters + refresh/export
KPI row: 3–5 cards max
Primary analysis: largest area
Secondary panels: recent activity, alerts, distribution
```

## Common dashboard mistakes

- Too many KPIs.
- No time period.
- No explanation for spikes/drops.
- Using charts where a table is better.
- No empty/loading/error state.
- Hiding filters far from charts.
- Making everything the same visual weight.
