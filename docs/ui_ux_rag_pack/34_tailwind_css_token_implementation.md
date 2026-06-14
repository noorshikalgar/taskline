# 34 — Tailwind / CSS Token Implementation

Purpose: make design guidance practical for code agents.

## CSS variable pattern

Use semantic CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --surface: 0 0% 100%;
  --surface-muted: 210 40% 96%;
  --border: 214 32% 91%;
  --primary: 222 89% 56%;
  --primary-foreground: 0 0% 100%;
  --radius-card: 0.75rem;
  --radius-control: 0.5rem;
}

.dark {
  --background: 222 47% 6%;
  --foreground: 210 40% 98%;
  --surface: 222 47% 8%;
  --surface-muted: 217 33% 12%;
  --border: 217 33% 18%;
  --primary: 217 91% 66%;
  --primary-foreground: 222 47% 8%;
}
```

## Tailwind mapping idea

```js
colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  surface: 'hsl(var(--surface))',
  muted: 'hsl(var(--surface-muted))',
  border: 'hsl(var(--border))',
  primary: 'hsl(var(--primary))',
}
```

## Component class guidance

Use reusable component variants instead of one-off class strings everywhere.

Example button variants:

```txt
primary: strong action
secondary: alternative action
ghost: low emphasis
outline: neutral action
destructive: dangerous action
```

## Implementation rules

- No raw hex in components unless the token file defines it.
- No random spacing values in components.
- No animation durations outside motion tokens.
- No custom shadow per component unless promoted to token.
- Component states must include hover, focus-visible, active, disabled, loading.

## Code review checklist

- Are tokens used instead of raw values?
- Are interactive states implemented?
- Is dark mode supported or intentionally not supported?
- Does the component work in small containers?
- Does it support keyboard and screen readers?
- Is loading width stable to avoid layout shift?
