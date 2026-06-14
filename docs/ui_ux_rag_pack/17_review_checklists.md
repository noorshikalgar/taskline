# UI Review Checklists

## Fast 10-point review

Score each 0-2.

1. User goal is obvious.
2. Primary action is clear.
3. Page context is visible.
4. Layout hierarchy is strong.
5. Loading/empty/error states exist.
6. Forms and errors are usable.
7. Navigation matches mental model.
8. Accessibility baseline is met.
9. Mobile/touch behavior is considered.
10. Visual style is consistent through tokens.

Total:

- 18-20: strong
- 14-17: usable but polish needed
- 9-13: significant UX debt
- 0-8: likely confusing or broken

## State checklist

For every screen:

- [ ] First use
- [ ] Normal data
- [ ] Loading initial
- [ ] Loading refresh
- [ ] Empty
- [ ] Filtered empty
- [ ] Partial data
- [ ] Error
- [ ] Offline/timeout
- [ ] Permission denied
- [ ] Success
- [ ] Long-running background task

## Component checklist

- [ ] Correct semantic element used
- [ ] Accessible name exists
- [ ] Keyboard interaction works
- [ ] Focus style visible
- [ ] Loading state
- [ ] Disabled state with reason where needed
- [ ] Error state
- [ ] Mobile/touch behavior
- [ ] Dark mode
- [ ] Reduced motion

## Product screen critique prompt

Ask:

1. What is the most important user task?
2. What is the most important information?
3. What is distracting from the task?
4. What could fail?
5. What needs to be recoverable?
6. What would a new user misunderstand?
7. What would a power user find slow?
8. What breaks on mobile/accessibility?

## Release acceptance checklist

- [ ] No unlabeled icon-only controls.
- [ ] No color-only status.
- [ ] No dead-end empty state.
- [ ] No generic error for known validation failures.
- [ ] Submit buttons show progress and prevent duplicate submits.
- [ ] Destructive actions have undo or confirmation.
- [ ] Tables/lists have useful empty/loading/error states.
- [ ] Keyboard-only user can complete the primary task.
- [ ] Dark mode and light mode have acceptable contrast.
- [ ] Motion respects reduced-motion.
