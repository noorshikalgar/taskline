# DevThread UI Polish Pack

This pack is written for an implementation LLM/agent working inside the DevThread repo. It is not a vague redesign brief. It gives the agent a page-by-page UI polish plan, visual rules, acceptance checks, and copy-paste prompts.

## Goal

Make DevThread feel like a modern, premium, local-first developer app instead of an old admin/dashboard UI.

The reference direction is:

- Codex-style premium dark interface: calm spacing, soft depth, focused content, low noise.
- Dev tool personality: compact, keyboard-friendly, professional, not colorful SaaS dashboard.
- Keep DevThread identity: warm Gruvbox-like amber accents, local-first, task/worklog focused.

## Use this pack

1. Put this folder into the repo as `docs/ui-polish/`.
2. Give the LLM `00_MASTER_PROMPT.md` first.
3. Then ask it to implement in phases using `07_IMPLEMENTATION_PHASES.md`.
4. After every phase, run the acceptance checklist in `08_UI_QA_CHECKLIST.md`.

Recommended LLM instruction:

> Read `docs/ui-polish/00_MASTER_PROMPT.md` and follow the implementation phases. Do not redesign randomly. First audit the existing UI, create shared tokens/components, then apply the new system page by page. Keep functionality unchanged unless the docs explicitly ask for layout simplification.

## Files

- `00_MASTER_PROMPT.md` — main prompt to give your coding LLM.
- `01_VISUAL_DIAGNOSIS.md` — why the current UI feels old.
- `02_DESIGN_DIRECTION.md` — target look and product feel.
- `03_DESIGN_TOKENS.md` — colors, spacing, radius, typography, shadows.
- `04_COMPONENT_SYSTEM.md` — shell, panels, buttons, cards, inputs, command palette, heatmap, charts.
- `05_PAGE_BY_PAGE_INSTRUCTIONS.md` — tasks, releases, metrics, settings, search.
- `06_COPYWRITING_RULES.md` — small text rules so the app feels polished.
- `07_IMPLEMENTATION_PHASES.md` — exact execution plan for the LLM.
- `08_UI_QA_CHECKLIST.md` — final review checklist.
- `09_AGENT_REVIEW_PROMPTS.md` — prompts for visual review and bug fixing.
