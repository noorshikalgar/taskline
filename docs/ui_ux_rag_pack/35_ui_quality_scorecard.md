# 35 — UI Quality Scorecard

Purpose: score product screens consistently.

Score each category 0–5.

## Categories

### 1. Clarity
- User can understand screen purpose quickly.
- Primary action is obvious.
- Labels are specific.

### 2. Hierarchy
- Important content is visually dominant.
- Related items are grouped.
- Secondary actions do not compete with primary actions.

### 3. State completeness
- Loading, empty, error, success, partial, offline, permission states exist.

### 4. Accessibility
- Keyboard navigation.
- Focus states.
- Contrast.
- Labels.
- Target sizes.
- Reduced motion.

### 5. Responsiveness
- Mobile/tablet/desktop layouts work.
- Long text and narrow containers do not break.

### 6. Visual consistency
- Tokens used.
- Consistent spacing, radius, typography, colors.
- Components look like one system.

### 7. Interaction quality
- Feedback is immediate.
- Destructive actions are protected.
- Optimistic UI is reversible when needed.

### 8. Performance perception
- Skeletons/progress are used where needed.
- Layout shifts are minimized.
- Slow operations explain what is happening.

### 9. Content quality
- Empty/error/help text is useful.
- No vague “Something went wrong” without next step.

### 10. Product fit
- UI density and style match the audience and task.

## Interpretation

```txt
45–50: excellent, production-grade
38–44: strong, minor issues
30–37: usable but needs refinement
20–29: risky UX, incomplete states
0–19: not production-ready
```

## Agent review output

```md
# UI Review Scorecard

| Category | Score | Notes | Fix |
|---|---:|---|---|

## Top 5 fixes
## Missing states
## Accessibility blockers
## Visual system issues
## Implementation recommendations
```
