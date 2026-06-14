# 22 — Typography Scale

Purpose: help an agent create readable, structured text systems.

## Default product font strategy

- Use one high-quality sans font for most UI.
- Use a mono font only for code, IDs, logs, terminal-like UIs, timestamps, and technical metadata.
- Avoid more than two font families in app UI.

## Practical type scale

```txt
xs:   12px / 16px — metadata, badges, captions
sm:   14px / 20px — secondary UI, table cells, helper text
base: 16px / 24px — body text, readable paragraphs
lg:   18px / 28px — section intro, emphasized body
xl:   20px / 28px — card/page subsection titles
2xl:  24px / 32px — page titles, dialogs
3xl:  30px / 38px — hero titles, important pages
4xl:  36px / 44px — landing hero
5xl:  48px / 56px — marketing-only hero
```

## Font weight rules

```txt
Regular: normal reading text
Medium: labels, controls, nav items
Semibold: headings, selected states, important values
Bold: rare; use for strong marketing emphasis only
```

Avoid bolding too many things. If everything is bold, nothing is important.

## Line length

```txt
Body/content reading: 60–80 characters per line
Dense dashboard labels: 20–40 characters
Forms: labels should be short and direct
Tables: truncate long secondary text, but preserve primary identifiers
```

## Heading rules

- One clear H1 per screen.
- H1 explains where the user is, not marketing fluff.
- H2 separates major content groups.
- H3 is for cards/panels inside sections.
- Do not skip hierarchy just for visual size.

## UI text rules

- Buttons should use verbs: Save, Create, Invite, Export, Retry.
- Error messages should explain what happened and how to fix it.
- Empty states should offer the next useful action.
- Labels should be stable, not clever.
- Avoid generic “Submit” unless the form action is obvious.

## Typography anti-patterns

- Tiny low-contrast text for important information.
- Using uppercase for long labels or paragraphs.
- Center-aligning dense copy.
- Mixing many font sizes on one screen.
- Using display fonts for app controls.
- Long unbroken IDs/URLs without wrapping or truncation.
