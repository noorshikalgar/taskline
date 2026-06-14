# 32 — End-to-End Product Design Workflow for Agents

Purpose: tell an LLM exactly how to design a product from scratch.

## Phase 1 — Understand

Ask or infer:

- Product name.
- User persona.
- Main job-to-be-done.
- Primary workflows.
- Platform: web/mobile/desktop.
- Data objects.
- Risky actions.
- Brand feel.
- Technical constraints.

## Phase 2 — Information architecture

Produce:

- Main navigation sections.
- Secondary navigation/tabs.
- Core entities.
- User flows.
- Permission roles if relevant.
- Empty first-run experience.

## Phase 3 — Design system

Produce:

- Color tokens.
- Typography scale.
- Spacing scale.
- Radius/shadow/border tokens.
- Component sizes.
- Motion tokens.
- Breakpoints.

## Phase 4 — Screen inventory

Create all required screens:

```txt
Landing / login / onboarding
Dashboard / home
List screens
Detail screens
Create/edit screens
Settings
Notifications/activity
Help/docs/empty states
Error routes: 404, 500, offline, permission denied
```

## Phase 5 — State matrix

For each screen define:

```txt
default
loading
slow loading
empty
no search results
error
partial success
success
permission denied
offline
mobile
long content
```

## Phase 6 — Component contract

For each component define:

- Purpose.
- Props/data needed.
- Visual states.
- Interaction states.
- Accessibility requirements.
- Responsive behavior.
- Error behavior.

## Phase 7 — Implementation

Before writing code, produce:

- File structure.
- Token implementation strategy.
- Component hierarchy.
- Test checklist.
- Accessibility checklist.

## Phase 8 — Review

Review against:

- Quality model.
- Bad UI anti-patterns.
- Accessibility.
- Responsive behavior.
- State completeness.
- Performance/loading.
- Visual consistency.

## Agent output format

```md
# Product UI Plan

## Product understanding
## Design direction
## Design tokens
## App shell
## Screen inventory
## Screen blueprints
## Component specs
## State matrix
## Accessibility checklist
## Implementation notes
## Risks/tradeoffs
```
