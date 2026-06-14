# Modern UI/UX RAG Knowledge Pack

Purpose: give an AI product/design agent a compact, retrieval-friendly knowledge base for improving product UI. The pack focuses on practical decisions: what component to use, how to handle loading/error/empty states, how to choose colors, how to structure navigation, how to design forms, how to use motion, and how to avoid common UI mistakes.

How to use in RAG:

1. Index each markdown file separately.
2. Preserve headings as chunk metadata.
3. Recommended chunk size: 600-1,000 tokens with 100-token overlap.
4. Retrieve from `00_agent_instruction.md` and `01_quality_model.md` for every UI critique task.
5. Retrieve domain-specific files based on task: forms, color, navigation, tables, loading, accessibility, motion, dashboards, mobile, or AI UI.
6. Ask the agent to output: diagnosis, priority, recommended pattern, implementation notes, edge cases, and acceptance checklist.

Files:

- `00_agent_instruction.md` — system-style instructions for a UI-reviewing agent.
- `01_quality_model.md` — the core quality model for good UI.
- `02_information_architecture_navigation.md` — pages, menus, sidebars, tabs, breadcrumbs.
- `03_layout_spacing_visual_hierarchy.md` — grids, rhythm, density, hierarchy.
- `04_color_tokens_theming.md` — color algorithms, tokens, dark mode, contrast.
- `05_typography_iconography.md` — readable type, labels, icons.
- `06_component_decision_matrix.md` — which component to use when.
- `07_loading_latency_optimistic_ui.md` — skeletons, progress, polling, optimistic updates.
- `08_empty_error_success_states.md` — empty states, validation, errors, success feedback.
- `09_forms_inputs_validation.md` — forms, field behavior, validation timing.
- `10_tables_lists_filters_search.md` — enterprise data UI and discovery.
- `11_motion_animation_microinteractions.md` — useful animation, reduced motion, timing.
- `12_accessibility_inclusive_design.md` — WCAG-grounded checklist.
- `13_responsive_mobile_touch.md` — adaptive layouts and touch ergonomics.
- `14_dashboards_data_visualization.md` — charts, dashboards, metrics.
- `15_ai_agent_product_ui.md` — UI for AI apps, streaming, uncertainty, citations.
- `16_bad_ui_antipatterns.md` — common failure patterns.
- `17_review_checklists.md` — reusable scoring checklists.
- `18_prompt_templates.md` — prompts for agents.
- `19_sources.md` — researched source map.

## Added robust design-system layer

This updated pack now includes a second layer for full product design from scratch:

- `20_visual_design_system_from_scratch.md`
- `21_spacing_layout_grid_rules.md`
- `22_typography_scale.md`
- `23_border_radius_shadow_depth.md`
- `24_color_generation_algorithm.md`
- `25_component_size_specs.md`
- `26_product_screen_blueprints.md`
- `27_landing_page_blueprints.md`
- `28_dashboard_blueprints.md`
- `29_saas_app_shell_blueprints.md`
- `30_mobile_app_blueprints.md`
- `31_design_style_recipes.md`
- `32_end_to_end_product_design_workflow.md`
- `33_ui_agent_memory_retrieval_map.md`
- `34_tailwind_css_token_implementation.md`
- `35_ui_quality_scorecard.md`
- `36_bulletproof_expansion_roadmap.md`

For designing a new product from scratch, start with files 20, 21, 22, 24, 25, 26, 31, and 32.
For reviewing an existing product UI, start with files 01, 16, 17, 33, and 35.

