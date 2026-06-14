# 20 — Visual Design System From Scratch

Purpose: guide an agent to create a complete product UI language before writing screens.

## Output order for any new product design

1. Product personality: serious, playful, technical, luxury, consumer, enterprise, editorial, gaming, developer-first, etc.
2. UI density: compact, standard, spacious.
3. Platform target: web app, mobile app, desktop app, docs site, marketing site, admin panel.
4. Design tokens: color, typography, spacing, radius, borders, shadows, motion, breakpoints.
5. App shell: navigation, page width, content grid, sticky areas, command/search surfaces.
6. Screen blueprints: layout anatomy for each page type.
7. Component specs: button, input, card, table, modal, sidebar, tabs, toast, etc.
8. State matrix: loading, empty, error, success, partial, disabled, permission, offline, slow network.
9. Accessibility pass: keyboard, focus, contrast, labels, target size, reduced motion.
10. Implementation contract: CSS variables / Tailwind tokens / theme object / component props.

## Token-first rule

Never design random pixels. Convert visual choices into named tokens.

Bad:
- `border-radius: 13px`
- `color: #e8e8e8`
- `padding: 19px`

Good:
- `radius-card: 12px`
- `color-border-subtle`
- `space-6: 24px`

## Minimum token set

```txt
color.background
color.surface
color.surfaceElevated
color.surfaceMuted
color.text
color.textMuted
color.textSubtle
color.border
color.borderStrong
color.primary
color.primaryHover
color.primaryText
color.danger
color.warning
color.success
color.info

font.family.sans
font.family.mono
font.size.xs/sm/base/lg/xl/2xl/3xl/4xl
font.weight.regular/medium/semibold/bold
lineHeight.tight/normal/relaxed

space.0/1/2/3/4/5/6/8/10/12/16/20/24
radius.none/sm/md/lg/xl/2xl/full
shadow.none/sm/md/lg/focus
border.width.default/strong
motion.duration.fast/base/slow
motion.easing.standard/enter/exit
```

## Design principle stack

A good product UI should be:

1. Clear before beautiful.
2. Predictable before clever.
3. Accessible before animated.
4. Tokenized before customized.
5. Responsive before dense.
6. State-complete before shipped.
7. Easy to scan before full of features.

## Visual system checklist

Before screen design starts, the agent must answer:

- What is the product type?
- What is the main user goal?
- What is the most frequent action?
- What is the riskiest action?
- What must be visible without scrolling?
- What must be hidden until needed?
- What information has priority 1, 2, and 3?
- Which states can break trust?
- What should the UI feel like in 3 words?

## Recommended default for SaaS/product UIs

Use this when no brand direction exists:

```txt
Density: standard
Grid: 12-column desktop, 6-column tablet, 4-column mobile
Base spacing: 4px unit, practical steps of 8px
Desktop page max width: 1120–1280px
App shell sidebar: 240–280px
Top bar height: 56–64px
Base font: 14–16px
Card radius: 12–16px
Input height: 40–44px
Button height: 36–44px
Table row height: 44–52px
Border: 1px subtle
Shadow: minimal, reserved for overlays/elevated surfaces
```
