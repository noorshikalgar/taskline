# AGENTS.md UI/UX Instruction Template

Copy this into your project `AGENTS.md` or merge it with your existing agent rules.

## UI/UX source of truth

This project uses the UI/UX RAG pack in:

`docs/ui-ux-rag/`

Before any UI work, retrieve relevant docs from that folder. Do not design screens from vague taste alone.

## For new product design

Read:

- `00_agent_instruction.md`
- `20_visual_design_system_from_scratch.md`
- `21_spacing_layout_grid_rules.md`
- `22_typography_scale.md`
- `23_border_radius_shadow_depth.md`
- `24_color_generation_algorithm.md`
- `25_component_size_specs.md`
- `26_product_screen_blueprints.md`
- `31_design_style_recipes.md`
- `32_end_to_end_product_design_workflow.md`

Then output design tokens, app shell, screen inventory, component specs, and state matrix before writing code.

## For UI improvements

Read:

- `01_quality_model.md`
- `06_component_decision_matrix.md`
- `07_loading_latency_optimistic_ui.md`
- `08_empty_error_success_states.md`
- `16_bad_ui_antipatterns.md`
- `17_review_checklists.md`
- `35_ui_quality_scorecard.md`

## Rules

- Use tokens for color, spacing, radius, typography, shadows, and motion.
- Include loading, empty, error, success, disabled, permission, offline, mobile, and long-content states.
- Use accessible focus states and keyboard behavior.
- Do not add animation unless it improves understanding.
- Do not create random one-off pixel values.
- Explain which RAG docs influenced the UI decision.
