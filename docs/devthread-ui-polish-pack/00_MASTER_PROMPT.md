# Master Prompt for DevThread UI Polish

You are improving the DevThread desktop app UI. DevThread is a local-first developer worklog/task/release notes app. The current UI works, but it feels old, dense, flat, and inconsistent. Your job is to make it feel premium like a modern developer tool while keeping the product practical and fast.

## Non-negotiable goals

1. Improve every visible page, not only the dashboard.
2. Do not break existing functionality.
3. Create shared design tokens and reusable components before touching individual pages.
4. Keep the app compact and developer-friendly, but not cramped.
5. Prefer calm premium dark UI over heavy borders and noisy sections.
6. Keep the warm amber/Gruvbox identity, but use it as an accent, not everywhere.
7. Use consistent spacing, typography, panel surfaces, borders, hover states, empty states, and focus rings.
8. Make the app feel like a native desktop app, not a web admin template.
9. Preserve keyboard workflows and make focus states obvious.
10. Every page must have a clear hierarchy: app shell → page header → primary action/content → secondary tools → metadata.

## Current UI problems to fix

The current DevThread screenshots show these issues:

- Too many hard 1px borders create an old boxed layout.
- Background and panels are too similar; depth is unclear.
- Amber text/accent is overused, making the UI feel sepia and dated.
- Page headers feel functional but not premium.
- Large empty spaces feel unintentional, especially releases/settings.
- Cards/charts/heatmaps look hand-built instead of product-grade.
- Sidebar icon rail is useful but visually harsh and under-explained.
- Text sizes and weights are inconsistent.
- Inputs/buttons/tabs have inconsistent height and visual weight.
- Metrics page has good data but lacks modern dashboard composition.
- Settings modal is too large, flat, and old-style.
- Command palette is a good idea but needs premium overlay polish.

## Target visual feel

The target is a premium developer app like Codex/Zed/Raycast/Linear-inspired dark interface:

- Deep dark shell.
- Slightly lifted panels.
- Soft radius.
- Fewer borders, better contrast.
- Subtle shadows/glow only where useful.
- Clear spacing scale.
- Professional typography.
- Strong empty states.
- Beautiful but restrained data visualization.
- Smooth micro-interactions.
- Compact but breathable layout.

## Implementation process

Before coding pages, inspect the app structure and find the styling system. Then:

1. Create or refactor design tokens.
2. Create reusable primitives: AppShell, Sidebar, PageHeader, Panel, Card, Button, Input, Tabs, Badge, EmptyState, Toolbar, Dialog, CommandPalette, StatCard.
3. Replace page-specific styling with shared components.
4. Polish page by page using `05_PAGE_BY_PAGE_INSTRUCTIONS.md`.
5. Test at common desktop sizes: 1280x800, 1440x900, 1920x1080.
6. Ensure light/dark theme code does not regress even if dark is primary.
7. Do a screenshot-based review after every major page.

## Design rules

Use these rules while coding:

- One app-wide spacing scale. No random margins.
- One page header pattern. No custom headers per page.
- One card/panel style. Variants allowed, but consistent.
- Border color must be subtle. Do not draw boxes around everything.
- Use accent only for selected state, primary action, focus, charts, or important data.
- Body text should not be pure white. Use muted hierarchy.
- Icons should be same size and optical weight.
- Every hover state should be visible but quiet.
- Every active state must be obvious.
- Every empty state must explain what to do next.

## Do not do this

- Do not make it look like a generic SaaS dashboard.
- Do not add random gradients everywhere.
- Do not use bright neon colors except tiny data accents.
- Do not increase font sizes blindly.
- Do not add animations that slow down input.
- Do not redesign business logic.
- Do not hide important task/worklog actions.
- Do not use amber for every label, border, and icon.

## Final output expected from you

At the end of implementation, provide:

1. List of changed files.
2. Before/after summary per page.
3. New design tokens/components added.
4. Any known limitations.
5. Screenshots if the environment supports it.
6. Confirmation that the QA checklist was executed.
