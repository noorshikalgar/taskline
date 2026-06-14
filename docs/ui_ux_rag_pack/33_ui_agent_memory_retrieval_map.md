# 33 — UI Agent Retrieval Map

Purpose: help a RAG agent know which docs to retrieve for each task.

## If the user says “make it look modern”
Retrieve:

- 01_quality_model.md
- 20_visual_design_system_from_scratch.md
- 21_spacing_layout_grid_rules.md
- 22_typography_scale.md
- 23_border_radius_shadow_depth.md
- 24_color_generation_algorithm.md
- 31_design_style_recipes.md

## If the user asks to design from scratch
Retrieve:

- 00_agent_instruction.md
- 20_visual_design_system_from_scratch.md
- 21_spacing_layout_grid_rules.md
- 22_typography_scale.md
- 24_color_generation_algorithm.md
- 25_component_size_specs.md
- 26_product_screen_blueprints.md
- 32_end_to_end_product_design_workflow.md

## If the user asks to improve a dashboard
Retrieve:

- 14_dashboards_data_visualization.md
- 28_dashboard_blueprints.md
- 07_loading_latency_optimistic_ui.md
- 08_empty_error_success_states.md
- 10_tables_lists_filters_search.md
- 17_review_checklists.md

## If the user asks to build a table/list page
Retrieve:

- 06_component_decision_matrix.md
- 10_tables_lists_filters_search.md
- 25_component_size_specs.md
- 26_product_screen_blueprints.md
- 07_loading_latency_optimistic_ui.md
- 08_empty_error_success_states.md

## If the user asks to build forms
Retrieve:

- 09_forms_inputs_validation.md
- 12_accessibility_inclusive_design.md
- 25_component_size_specs.md
- 07_loading_latency_optimistic_ui.md
- 08_empty_error_success_states.md

## If the user asks for mobile UI
Retrieve:

- 13_responsive_mobile_touch.md
- 30_mobile_app_blueprints.md
- 21_spacing_layout_grid_rules.md
- 25_component_size_specs.md

## If the user asks for AI product UI
Retrieve:

- 15_ai_agent_product_ui.md
- 31_design_style_recipes.md
- 07_loading_latency_optimistic_ui.md
- 08_empty_error_success_states.md
- 32_end_to_end_product_design_workflow.md

## If the user asks for landing page
Retrieve:

- 27_landing_page_blueprints.md
- 22_typography_scale.md
- 24_color_generation_algorithm.md
- 31_design_style_recipes.md

## If the user asks for accessibility
Retrieve:

- 12_accessibility_inclusive_design.md
- 17_review_checklists.md
- relevant component docs

## RAG chunking note

Each file is intentionally focused. Prefer retrieving 3–7 files per task instead of loading the full folder every time.
