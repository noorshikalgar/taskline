# Prompt Templates for UI/UX Agents

## Full UI review

```txt
Review this product screen as a senior UI/UX designer.

Context:
- Product:
- Target user:
- Main task:
- Platform: web/mobile/desktop
- Screenshot/code:

Use the UI/UX RAG pack. Evaluate:
1. Information hierarchy
2. Navigation and component choice
3. Loading/empty/error/success states
4. Forms/validation if present
5. Accessibility
6. Mobile/responsive behavior
7. Motion/animation opportunities
8. Bad UI anti-patterns

Output:
- Diagnosis
- Priority issues P0-P3
- Concrete redesign recommendation
- Edge states
- Acceptance checklist
```

## Generate screen spec

```txt
Create a production-ready UI spec for this feature.

Feature:
User goal:
Data involved:
Actions:
Risks:
Platform:

Include:
- Layout structure
- Component choices and why
- Design tokens needed
- Loading/empty/error/success states
- Optimistic UI strategy if useful
- Accessibility requirements
- Mobile behavior
- Edge cases
- Acceptance criteria
```

## Improve an existing component

```txt
Improve this component using modern UI/UX principles.

Component:
Current behavior/code:
Problems noticed:
Users:

Return:
- What is wrong
- Better component pattern
- State model
- Accessibility notes
- Visual/token guidance
- Implementation checklist
```

## Design system extraction

```txt
Extract a reusable mini design system from this product UI.

Input:
- Screens/components:
- Brand mood:
- Technical stack:

Return:
- Color roles
- Typography scale
- Spacing scale
- Component inventory
- Motion rules
- Accessibility baseline
- Anti-patterns to avoid
```

## AI product UI review

```txt
Review this AI/agent interface.

Evaluate:
- Progress transparency
- Tool/status feedback
- Source/citation visibility
- User control and approval gates
- Error/degraded states
- Streaming behavior
- Trust and uncertainty

Return concrete improvements and edge-case handling.
```
