# UI Quality Model

A good interface scores well on seven dimensions.

## 1. Intent clarity

Users should know:

- Where they are.
- What they can do next.
- What the system is doing.
- What changed after their action.
- What went wrong and how to fix it.

Signals: clear page title, visible primary action, clear labels, direct copy, useful status text, focused empty/error states.

## 2. Information hierarchy

Every screen needs a priority order.

Recommended hierarchy:

1. Page purpose/title.
2. Current object/context.
3. Primary action.
4. Important status or risk.
5. Main content.
6. Secondary actions.
7. Metadata and advanced controls.

Bad hierarchy symptoms: too many equal buttons, dense cards with no grouping, multiple primary colors, same font weight everywhere, hidden context.

## 3. Interaction predictability

Users should predict what a control will do before clicking it.

Rules:

- Buttons perform actions.
- Links navigate.
- Tabs switch peer views within the same context.
- Accordions reveal optional content.
- Menus contain secondary actions.
- Dialogs interrupt only for focused tasks, confirmation, or blocking choices.

## 4. State completeness

Every meaningful component needs states:

- Default
- Hover, focus, active
- Disabled
- Loading
- Empty
- Error
- Success
- Partial/stale
- Offline/permission denied where relevant

## 5. Accessibility and robustness

Minimum baseline:

- Keyboard navigation works.
- Focus state is visible.
- Text contrast passes WCAG AA for normal and large text.
- Icons have labels or accessible names.
- Form errors are programmatically associated with fields.
- Motion respects reduced-motion preferences.
- Layout works at 320px width and with text zoom.

## 6. Perceived performance

Users tolerate waiting better when the UI answers:

- Is it working?
- How long will it take?
- Can I keep doing something?
- Did my action succeed?

Use progressive rendering, skeletons, optimistic UI with rollback, background sync, cached stale-while-revalidate data, and explicit progress for long tasks.

## 7. Trust

Trust grows when the system is transparent and recoverable.

Add:

- Confirmations for high-risk actions.
- Undo for reversible actions.
- Audit/history for important changes.
- Clear timestamps: “Updated 2 min ago”.
- Source/citation/why-this for AI outputs.
- Honest degraded states instead of fake certainty.
