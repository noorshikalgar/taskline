# Layout, Spacing, and Visual Hierarchy

Good layout makes relationships visible.

## Layout model

Use a consistent spacing scale, for example:

- 4px micro gap
- 8px tight gap
- 12px related controls
- 16px component padding
- 24px section gap
- 32px major section gap
- 48px page block gap

Do not hand-place random margins. Use tokens.

## Page composition

A strong product page often has:

1. App shell/navigation.
2. Page header: title, description/context, primary action.
3. Control bar: search, filters, view switch, sort.
4. Main content: list/table/cards/detail.
5. Secondary panel or inspector when needed.
6. Persistent feedback area: toasts, banners, inline statuses.

## Visual hierarchy tools

Use these in order:

1. Position
2. Size
3. Spacing/grouping
4. Typography weight
5. Contrast
6. Color
7. Motion

Do not rely on color first. Layout and spacing should already explain the UI.

## Density

High density is good for expert workflows, logs, monitoring, issue trackers, and tables. Low density is good for onboarding, marketing, mobile, and emotional moments.

Provide density modes only if the product has both casual and power users.

## Cards

Use cards when content items are independent, scannable, and have mixed metadata/actions.

Avoid cards when:

- Rows need comparison.
- There are many numeric fields.
- Sorting/filtering is central.
- The same action repeats for every item and a table would be faster.

## Alignment

- Align text left for readability.
- Align numbers right or by decimal when comparing values.
- Keep actions aligned consistently.
- Avoid centered text in dense product UIs except empty states and marketing sections.

## Edge cases

- Long names: truncate middle or end depending on meaning; provide tooltip/copy where needed.
- Localization: allow 30-50% expansion for labels.
- Zoom/text scaling: avoid fixed-height containers that clip text.
- Responsive: stack sections by priority, not by DOM accident.
