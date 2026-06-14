# Motion, Animation, and Microinteractions

Motion should explain relationships and state changes. It should not slow users down.

## Good uses of motion

- Show where an element came from or went.
- Confirm an action.
- Smooth layout changes.
- Draw attention to a new/changed item.
- Communicate loading/progress.
- Add low-risk delight.

## Bad uses of motion

- Delaying a frequent workflow.
- Moving text while reading.
- Infinite decorative movement.
- Hiding content behind complex transitions.
- Ignoring reduced-motion settings.

## Timing guide

- Micro feedback: 80-150ms.
- Simple state transition: 150-250ms.
- Panel/dialog enter: 200-300ms.
- Complex page transition: 300-500ms max.

Use shorter durations for frequent expert workflows.

## Easing

- Use ease-out for entering elements.
- Use ease-in for leaving elements.
- Use ease-in-out for movement between states.
- Avoid bouncy easing in serious enterprise/finance/health/security contexts.

## Reduced motion

When `prefers-reduced-motion` is set:

- Remove large movement.
- Replace with opacity or instant state changes.
- Stop parallax, auto-scrolling, background animation.
- Keep state feedback visible.

## Microinteractions checklist

- Trigger is clear.
- Feedback is immediate.
- Result is visible.
- Error/reversal is handled.
- Motion does not trap focus.
- Motion does not conflict with layout stability.
