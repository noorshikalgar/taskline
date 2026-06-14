# Design Direction

## Product personality

DevThread should feel like:

- A focused developer notebook.
- A local-first worklog cockpit.
- A calm command-center for tasks, updates, releases, and metrics.
- Fast, keyboard-friendly, and trustworthy.

It should not feel like:

- An enterprise admin panel.
- A generic SaaS dashboard.
- A heavy project management app.
- A retro terminal skin.

## Visual keywords

Use these words to guide choices:

- Deep
- Calm
- Sharp
- Warm
- Focused
- Layered
- Native
- Developer-grade
- Quiet premium

## Layout direction

### App shell

- Use a narrow icon rail for global sections.
- Use a contextual sidebar when needed: tasks list, releases list, etc.
- Main content should use a page container with consistent padding.
- Top bar should be quiet and native-desktop friendly.

### Surfaces

Use four levels:

1. App background: deepest dark.
2. Sidebar/shell: slightly lighter.
3. Main content surface: normal dark.
4. Cards/dialogs/popovers: lifted surface.

### Spacing

The current UI is dense but not always aligned. Use predictable spacing:

- App edge padding: 16px to 24px.
- Page header bottom gap: 20px to 28px.
- Card padding: 16px to 20px.
- Dense controls height: 30px to 34px.
- Regular controls height: 36px to 40px.
- Panel gap: 12px to 16px.

### Typography

Use a modern UI font. If the app already has a font stack, improve it with:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Use mono only for timestamps, versions, IDs, and technical metadata:

```css
font-family: "JetBrains Mono", "SF Mono", Consolas, monospace;
```

## Accent strategy

Primary accent: warm amber/gold.

Use it for:

- Primary buttons.
- Active nav state.
- Focus ring.
- Selected tab underline.
- Important chart line/area.
- Status highlight when needed.

Do not use it for:

- Every label.
- Every icon.
- Every border.
- Every paragraph.
- Every timestamp.

## Motion direction

Keep animations subtle:

- Hover: 120ms ease.
- Dialog/command palette open: 150ms scale/fade.
- Page transitions: optional, very subtle.
- Heatmap hover tooltip: instant or 80ms.
- No bouncy animations.
- No slow transitions for typing/editing.

