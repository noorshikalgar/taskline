# Dashboards and Data Visualization

Dashboards should support decisions, not just display numbers.

## Dashboard types

- Operational: what needs attention now?
- Analytical: why is this happening?
- Strategic: are we moving in the right direction?
- Personal productivity: what should I do next?

## Metric cards

A useful metric card has:

- Clear label.
- Value.
- Unit.
- Time range.
- Comparison/change if relevant.
- Status meaning if relevant.

Bad metric card: big number without context.

## Chart choice

| Goal | Chart |
|---|---|
| Change over time | Line chart |
| Compare categories | Bar chart |
| Part-to-whole, few categories | Stacked bar or donut with caution |
| Distribution | Histogram/box plot |
| Relationship | Scatter plot |
| Ranking | Sorted bar chart |
| Status over time | Timeline/heatmap |

## Data visualization color

- Use categorical palettes for categories.
- Use sequential palettes for magnitude.
- Use diverging palettes for above/below baseline.
- Reserve red/green for status only if accessible and labelled.
- Keep chart palette accessible for color-vision deficiencies.

## Dashboard layout

1. Most important KPI/status first.
2. Time range and filters clearly visible.
3. Alerts/anomalies close to related chart.
4. Drill-down paths available.
5. Avoid mixing unrelated metrics without grouping.

## Edge cases

- No data: explain setup/connection needed.
- Partial data: show coverage and gaps.
- Delayed data: show freshness timestamp.
- Outliers: annotate instead of hiding.
- Small samples: warn about reliability.
- AI-generated insights: show source data and confidence/limitations.
