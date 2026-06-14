# Component Decision Matrix

Choose the simplest component that fits the user’s task.

## Actions

| Need | Use | Notes |
|---|---|---|
| Main action on page | Primary button | One primary per region |
| Secondary action | Secondary/ghost button | Keep visually quieter |
| Navigate to another page | Link | Do not style as action if it navigates |
| Destructive action | Danger button/menu item | Confirm or provide undo |
| Repeated row action | Icon + label or row menu | Avoid clutter in dense tables |
| Bulk operation | Selection toolbar | Appears after selection |

## Disclosure

| Need | Use | Avoid |
|---|---|---|
| Show optional details inline | Accordion/disclosure | Modal |
| Temporary focused task | Dialog | Full page if task is simple |
| Edit complex object | Full page or side panel | Tiny modal with many fields |
| Object preview while list remains visible | Drawer/side panel | Losing list context |
| Short extra info | Tooltip | Tooltip for critical info |

## Selection controls

| Need | Use |
|---|---|
| Binary on/off, immediate effect | Switch |
| Binary choice inside form before submit | Checkbox |
| Pick one from 2-5 visible options | Radio group or segmented control |
| Pick one from many options | Select/combobox |
| Pick many from known options | Multi-select/checkbox list |
| Pick date/time | Date/time picker with keyboard fallback |

## Feedback

| Need | Use |
|---|---|
| Page-level issue | Banner/alert |
| Field issue | Inline error + summary for forms |
| Background minor result | Toast |
| Critical blocking issue | Alert/dialog or page error |
| Reversible deletion | Toast with Undo |
| Long running task | Progress page/panel |

## Data display

| Need | Use |
|---|---|
| Compare many records | Table |
| Browse visual items | Cards/grid |
| Timeline/history | Timeline/activity feed |
| Hierarchical data | Tree/table tree |
| Metrics overview | Dashboard cards + charts |
| Logs | Virtualized list with filters |

## Component smell test

Ask:

- Does this component match the user’s intent?
- Is it accessible by keyboard and screen reader?
- Does it have all states?
- Is it too heavy for the task?
- Will it work on mobile/touch?
