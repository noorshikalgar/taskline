# Accessibility and Inclusive Design

Accessibility is product quality. Build it into every component and state.

## WCAG mental model

WCAG is organized around four principles:

- Perceivable: users can perceive information.
- Operable: users can operate controls.
- Understandable: users can understand content and behavior.
- Robust: content works with assistive technologies.

## Baseline checklist

- [ ] All interactive elements are keyboard reachable.
- [ ] Focus order matches visual/logical order.
- [ ] Focus indicator is visible.
- [ ] Text contrast passes WCAG AA.
- [ ] Non-text UI indicators have enough contrast.
- [ ] Form fields have labels.
- [ ] Errors are associated with fields.
- [ ] Images/icons have alt text or are marked decorative.
- [ ] Modal traps focus and restores focus on close.
- [ ] Escape closes dismissible overlays.
- [ ] No critical action depends on hover only.
- [ ] Touch targets are large enough.
- [ ] Motion respects reduced-motion preferences.
- [ ] Content works at 200% zoom and narrow width.

## Keyboard behavior

- Tab moves between controls.
- Enter activates buttons/links where expected.
- Space toggles checkbox/switch/button.
- Arrow keys navigate radio groups, menus, tabs, sliders where applicable.
- Escape closes menus/dialogs.

## Screen reader basics

- Use semantic HTML first.
- Use ARIA only when native HTML cannot express the pattern.
- Name every icon-only button.
- Announce dynamic status changes where needed.
- Do not overload live regions.

## Color and status

Never rely on color alone. Pair color with text, icons, labels, or shape.

Example: `Failed` + red icon + error text, not just a red dot.

## Inclusive edge cases

- Users with low vision.
- Keyboard-only users.
- Screen-reader users.
- Motor impairment.
- Cognitive load and stress.
- Temporary disability: broken mouse, bright sun, noisy room, slow network.
