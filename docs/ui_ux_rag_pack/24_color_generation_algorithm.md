# 24 — Color Generation Algorithm

Purpose: help an agent generate reliable light/dark color systems.

## Color workflow

1. Pick a brand seed color.
2. Generate tonal scale from 0–100 lightness.
3. Create semantic tokens from the scale.
4. Validate contrast for text and controls.
5. Create dark mode by remapping tokens, not by simply inverting colors.
6. Reserve saturated colors for action and status.
7. Use neutral surfaces for most UI.

## Required semantic tokens

```txt
background
foreground
surface
surface-muted
surface-elevated
text
text-muted
text-subtle
border
border-strong
primary
primary-hover
primary-foreground
secondary
secondary-foreground
accent
accent-foreground
danger
warning
success
info
focus-ring
selection
```

## Neutral scale guidance

Use neutral shades for structure. Most product UIs should be 70–90% neutral surfaces, 10–30% brand/status color.

Light mode example:

```txt
background: near white
surface: white / slightly warm or cool white
surface-muted: soft gray
text: near black
text-muted: middle gray
border: low-contrast gray
primary: saturated brand color
```

Dark mode example:

```txt
background: near black but not pure black
surface: slightly lighter than background
surface-muted: one step lighter
text: off-white
text-muted: middle light gray
border: visible but subtle
primary: lighter/chroma-adjusted brand color
```

## Contrast rules

- Body text: meet WCAG AA contrast.
- Small text must not rely on subtle gray on gray.
- Icon-only buttons need visible focus and accessible labels.
- Do not communicate status using color alone.
- Disabled controls may be lower contrast, but should remain understandable.

## Status colors

Use status colors semantically:

```txt
success = completed / safe / healthy
warning = attention needed / risk / pending
error/danger = failed / destructive / blocked
info = neutral notice / educational state
```

## Algorithmic palette prompt

When asked to create colors, the agent should produce:

```txt
1. Brand seed color
2. Neutral scale
3. Primary scale
4. Status scales
5. Light theme semantic tokens
6. Dark theme semantic tokens
7. Contrast notes
8. Usage rules
```

## Color mistakes

- Using brand color as background everywhere.
- Pure black/pure white contrast in dark mode causing glare.
- Too many accent colors.
- Using red for non-error decoration.
- Low contrast placeholder text as a label replacement.
- Not defining hover/focus/active states.
