# Agent Review Prompts

Use these prompts after implementation or when asking another LLM to review screenshots.

## Prompt 1: Visual audit from screenshots

You are reviewing DevThread, a local-first developer worklog app. Compare the new screenshots against the goal: premium dark developer app similar in polish to Codex/Raycast/Zed/Linear, but with DevThread's warm amber identity.

Review every screen for:

- Hierarchy
- Spacing
- Typography
- Borders and surface depth
- Accent color usage
- Empty states
- Data visualization polish
- Keyboard/focus affordances
- Professional/native desktop feel

Do not give vague feedback. Give exact fixes by page and component.

## Prompt 2: Code-level UI cleanup

Read the UI code and identify places where styling is duplicated or inconsistent. Refactor toward shared tokens and primitives. Do not change business logic. Prioritize removing random colors, random spacing, and one-off borders.

Return:

1. Duplicated style patterns found.
2. Components to extract.
3. Files changed.
4. Risks.
5. Before/after behavior.

## Prompt 3: Metrics page polish

Improve the metrics/worklog dashboard so it feels like a premium activity analytics screen. Use the design tokens and component rules in `docs/ui-polish`. Focus on stat cards, chart panel, heatmap, weekly/monthly bars, spacing, and responsiveness. Do not change the underlying data calculations.

## Prompt 4: Releases page polish

Improve the releases page so it no longer feels empty or unfinished. Use strong release list rows, a clear selected release header, polished tabs, helpful empty states, and better task rows. Keep the task selection and release notes behavior unchanged.

## Prompt 5: Settings modal polish

Redesign the settings modal using the shared Dialog, sidebar nav, grouped setting cards, and consistent controls. The modal should feel like native desktop app preferences. Do not add new settings unless trivial and safe.

## Prompt 6: Final acceptance

Run the UI QA checklist in `docs/ui-polish/08_UI_QA_CHECKLIST.md`. For every unchecked item, fix it or explain why it cannot be fixed right now. Then provide screenshots and changed files.

