# 23 — Borders, Radius, Shadow, Depth

Purpose: define how surfaces feel modern without becoming noisy.

## Border radius scale

```txt
none: 0px — tables, dense internal tools, edge-aligned surfaces
sm:   4px — badges, tiny controls
md:   8px — inputs, small buttons, menus
lg:  12px — cards, dialogs, panels
xl:  16px — hero cards, large modals
2xl: 20–24px — marketing cards, mobile sheets
full: 999px — pills, avatars, rounded icon buttons
```

## Radius selection

- Enterprise/admin: 6–10px.
- Modern SaaS: 10–16px.
- Consumer/mobile: 16–24px.
- Developer tools: 6–12px.
- Brutalist/terminal: 0–6px.

## Border rules

Use borders when:

- Separating dense surfaces.
- Defining input boundaries.
- Grouping content without heavy shadows.
- Showing selected/active states.

Use `1px solid color-border-subtle` by default.

## Shadow rules

Use shadows sparingly:

```txt
shadow-none: default surfaces
shadow-sm: hover card / subtle raised surface
shadow-md: dropdown/menu/popover
shadow-lg: modal/dialog/sheet
shadow-focus: keyboard focus ring, not decorative depth
```

## Elevation rules

- Base page background should be calm.
- Cards should usually use border, not shadow.
- Menus/popovers need stronger elevation than cards.
- Modals need backdrop + elevation + focus trap.
- Sticky headers should have border or shadow only after scroll when possible.

## Modern UI mistake

Too many rounded cards + shadows makes UI look like a dribbble shot, not a usable product.

## Depth decision table

| Element | Border | Shadow | Backdrop | Notes |
|---|---:|---:|---:|---|
| Card | Yes | Optional subtle | No | Prefer border |
| Input | Yes | No | No | Add focus ring |
| Dropdown | Optional | Yes | No | Must float above content |
| Modal | Optional | Yes | Yes | Trap focus |
| Toast | Optional | Yes | No | Do not block work |
| Side sheet | Yes | Yes | Optional | Depends on modality |
| Table | Yes/subtle separators | No | No | Avoid boxed rows unless needed |
