# Color, Tokens, and Theming

Color is a communication system, not decoration.

## Color roles

Define semantic roles instead of raw colors:

- `surface`, `surface-muted`, `surface-elevated`
- `text-primary`, `text-secondary`, `text-muted`, `text-disabled`
- `border-subtle`, `border-strong`
- `brand`, `brand-hover`, `brand-active`, `on-brand`
- `success`, `warning`, `danger`, `info`
- `focus-ring`

Use role tokens in components. Raw palettes should stay in the theme layer.

## Color algorithm

A practical algorithm for product UI:

1. Pick brand seed color.
2. Convert to OKLCH/HSL-like perceptual space.
3. Generate tonal scale from very light to very dark.
4. Create neutral scale separately; most UI uses neutrals.
5. Create semantic scales for success/warning/danger/info.
6. Map tones to roles for light theme.
7. Invert/remap roles for dark theme; do not simply invert hex values.
8. Test text/background contrast.
9. Test color-blind distinguishability for status and charts.
10. Add non-color cues: icons, labels, shapes, patterns.

## Material-style tonal thinking

Material 3 dynamic color uses a source color to create accessible color schemes and assigns generated colors to UI roles. The useful lesson: separate palette generation from role assignment. Do not directly use “blue-500” everywhere.

## Neutral-first rule

Modern product UI should usually be 80-90% neutral. Brand color should guide primary actions and identity, not fight every element.

## Status colors

- Red/danger: destructive, failed, critical.
- Yellow/warning: attention needed, risk, pending.
- Green/success: completed, healthy, available.
- Blue/info: neutral information, links, guidance.

Never use green/red only to distinguish two states. Add text/icon.

## Dark mode

Dark mode needs separate decisions:

- Avoid pure black for large surfaces unless brand requires it.
- Use subtle elevation through surface tones, not heavy shadows.
- Reduce saturation for large colored surfaces.
- Keep focus rings visible.
- Test charts separately.

## Contrast baseline

- Normal text: target at least WCAG AA 4.5:1.
- Large text: target at least 3:1.
- Icons and interactive boundaries: target at least 3:1 against adjacent colors.

## Anti-patterns

- Multiple primary colors on one page.
- Status meaning only by color.
- Low-contrast placeholder text used as labels.
- Bright saturated backgrounds behind dense text.
- Dark mode created by `filter: invert()`.
- Chart palette that looks nice but fails color-blind users.
