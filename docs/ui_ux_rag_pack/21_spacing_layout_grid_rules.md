# 21 — Spacing, Layout, Grid Rules

Purpose: help an agent place UI elements with consistent rhythm.

## Base spacing system

Use a 4px base unit with common steps:

```txt
0 = 0px
1 = 4px
2 = 8px
3 = 12px
4 = 16px
5 = 20px
6 = 24px
8 = 32px
10 = 40px
12 = 48px
16 = 64px
20 = 80px
24 = 96px
```

## Layout spacing rules

- Inside small components: 8–12px.
- Inside cards/panels: 16–24px.
- Between related groups: 16–24px.
- Between major sections: 32–64px.
- Page shell padding: 16px mobile, 24px tablet, 32px desktop.
- Avoid using more than 3 spacing sizes on one screen unless the hierarchy demands it.

## Page width rules

```txt
Reading page / docs: 720–860px
Form page: 640–800px
Dashboard content: 1120–1440px
Admin table: fluid, min 960px for desktop table
Marketing page: 1120–1280px content container
Settings page: 720–960px
```

## Grid rules

### Desktop
- 12 columns for dashboards and marketing pages.
- 24–32px gutters.
- 32px page padding.

### Tablet
- 6–8 columns.
- 20–24px gutters.
- 24px page padding.

### Mobile
- 4 columns.
- 16px gutters.
- 16px page padding.

## Alignment rules

- Align labels, controls, and content edges.
- Never center-align dense data tables.
- Right-align numeric columns when comparing values.
- Keep action buttons close to the content they affect.
- Do not float destructive actions beside primary actions without clear separation.

## Density presets

### Comfortable
```txt
Card padding: 24px
Section gap: 48px
Table row: 56px
Input/button: 44–48px
```

### Standard
```txt
Card padding: 20–24px
Section gap: 32px
Table row: 48px
Input/button: 40–44px
```

### Compact
```txt
Card padding: 12–16px
Section gap: 20–24px
Table row: 36–44px
Input/button: 32–36px
```

Use compact only for expert tools, developer tools, dashboards, logs, IDE-like products, and internal admin UIs.

## Visual hierarchy spacing

Spacing should encode meaning:

- Tiny gap = same control group.
- Small gap = related items.
- Medium gap = separate content blocks.
- Large gap = new section.
- Huge gap = new page narrative section.

## Common spacing mistakes

- Same spacing everywhere: the screen becomes flat.
- Random one-off values: hard to maintain.
- Large gaps inside dense workflows: slows scanning.
- Tiny gaps between unrelated controls: creates accidental grouping.
- Card inside card inside card: visual noise.
