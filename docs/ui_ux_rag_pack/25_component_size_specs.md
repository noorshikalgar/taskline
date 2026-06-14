# 25 — Component Size Specs

Purpose: provide concrete default dimensions for product UI generation.

## Buttons

```txt
Small: 32–36px height, 12–14px font, 12px horizontal padding
Default: 40–44px height, 14–16px font, 16px horizontal padding
Large: 48px height, 16px font, 20–24px horizontal padding
Icon button: 32/36/40px square depending density
```

Rules:
- Primary button: one per decision area.
- Secondary button: alternative action.
- Ghost button: low emphasis action.
- Danger button: destructive and separated from safe actions.
- Loading button should preserve width to avoid layout shift.

## Inputs

```txt
Default height: 40–44px
Compact height: 32–36px
Textarea min height: 96–120px
Label gap: 6–8px
Helper/error gap: 4–6px
Border radius: 8–12px
```

Rules:
- Label must remain visible after typing.
- Required/optional state must be clear.
- Error text must be below the field and actionable.
- Validate at helpful time, not aggressively on every keystroke unless necessary.

## Cards

```txt
Small card padding: 16px
Default card padding: 20–24px
Large card padding: 32px
Card gap: 12–20px
Card radius: 12–16px
```

Rules:
- A card should group related content and actions.
- Avoid nested cards unless there is a real hierarchy.
- Card header should explain the card’s purpose.

## Tables

```txt
Header row: 40–48px
Body row compact: 36–44px
Body row default: 44–52px
Cell horizontal padding: 12–16px
Checkbox column: 40–48px
Action column: 48–96px depending actions
```

Rules:
- Numeric values right-aligned.
- Long text truncated with tooltip/details route.
- Important row actions visible; rare actions in overflow menu.
- Provide empty, loading, error, and no-results states.

## Sidebar

```txt
Compact rail: 64–80px
Standard sidebar: 240–280px
Wide sidebar: 300–320px
Item height: 36–44px
Nested item indent: 16–24px
```

Rules:
- Use sidebar for persistent product areas.
- Keep settings/admin lower in hierarchy.
- Highlight current section clearly.

## Header / top nav

```txt
Web app header: 56–64px
Marketing header: 64–80px
Mobile header: 52–64px
```

Rules:
- Keep primary action visible if core to workflow.
- Put global search/command palette in predictable location.
- Avoid too many nav items.

## Modal/dialog

```txt
Small: 360–420px
Default: 480–640px
Large: 720–960px
Padding: 20–32px
Footer gap: 8–12px
```

Rules:
- Use modal for focused decisions, not large workflows.
- Destructive confirmation must name the object and impact.
- Trap focus and allow Escape to close unless blocking by design.
