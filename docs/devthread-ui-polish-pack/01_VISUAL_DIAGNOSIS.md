# Visual Diagnosis: Why DevThread Feels Old

## What the reference does better

The Codex profile/activity screen feels premium because it has:

- A calm centered composition.
- Fewer visible boxes.
- Soft surfaces with restrained contrast.
- Clear typographic hierarchy.
- Data density without visual noise.
- Heatmap cells that feel intentionally designed.
- Balanced whitespace around groups.
- Muted labels and stronger values.
- Simple navigation choices.

## What DevThread currently does well

DevThread already has good product foundations:

- Local-first identity in footer.
- Useful task/sidebar structure.
- Worklog timeline idea is strong.
- Metrics page has useful information.
- Release task tagging is a useful feature.
- Command palette is a premium feature direction.
- Gruvbox/warm amber identity can become distinctive.

## What currently makes it feel old

### 1. Too many equal borders

Many sections have the same border strength. Sidebar, editor, cards, filters, panels, charts, settings, and release sections all compete. This creates a “desktop app from 2012” feeling.

Fix:

- Use borders only to separate layers.
- Use surface contrast and spacing for most grouping.
- Reduce border opacity.
- Use active border only on focused/selected components.

### 2. Weak hierarchy

All labels, tabs, buttons, and metadata have similar visual importance. The eye does not know where to start.

Fix:

- Page title should be strongest.
- Primary content should have the most comfortable spacing.
- Filters/toolbars should be smaller and quieter.
- Metadata should be muted.
- Primary action should stand out clearly.

### 3. Amber is overused

Warm amber is nice, but when almost every label, icon, border, and chart line is amber, the whole app looks old and sepia.

Fix:

- Keep amber for primary actions, selected states, focus rings, chart highlights, and key numbers.
- Use neutral gray/slate for most text and borders.
- Add one cool blue/cyan only for chart goal/reference lines.

### 4. Layout is too rectangular

Everything is boxed edge-to-edge. Premium desktop apps often use layered surfaces: shell, sidebar, content, floating panels, cards.

Fix:

- Create a deep app background.
- Put content into lifted panels.
- Add subtle radius.
- Use consistent max widths for pages like settings and releases.

### 5. Empty states are weak

Release selected task area and settings large blank space feel unfinished.

Fix:

- Empty states should include title, explanation, and action.
- Use small icon/illustration or subtle dotted area.
- Give guidance, not only “No tasks tagged yet.”

### 6. Charts and heatmaps feel custom but not polished

Metrics chart and heatmap are useful but visually harsh. The heatmap has too much empty horizontal space and cells feel like debug blocks.

Fix:

- Use better panel composition.
- Add metric cards above charts.
- Improve axis label styling.
- Use consistent heatmap cell size/gap/radius.
- Make legends compact and aligned.

### 7. Settings modal feels like a form, not a product surface

The modal is very large, with weak grouping and too much empty area.

Fix:

- Use a centered modal with max width.
- Better left nav selected state.
- Group settings into cards/rows.
- Add short explanatory text.
- Add footer actions if needed.

