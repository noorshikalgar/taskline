# Information Architecture and Navigation

Navigation should match the user’s mental model, not the database schema.

## Choosing navigation

| Situation | Use | Avoid |
|---|---|---|
| 3-7 top-level areas | Top nav | Mega menu unless needed |
| Many persistent product areas | Sidebar | Hiding core areas in hamburger on desktop |
| Hierarchical admin app | Sidebar + breadcrumbs | Deep nested tabs |
| Peer views of same object | Tabs | Separate pages if context must remain |
| Object detail with sections | Anchor nav or side section nav | Giant single scroll without landmarks |
| Wizard/linear setup | Stepper | Tabs that allow invalid skipping |
| Small secondary actions | Overflow menu | Icon-only mystery buttons |
| User/account actions | Avatar menu | Mixing with main product navigation |

## Menu placement rules

- Primary actions belong near the page title or object header.
- Object-specific actions belong inside the object header/card row.
- Global actions belong in app shell/header.
- Destructive actions belong in an overflow menu or danger zone, not beside primary save unless heavily used.
- Filters belong above the data they affect.
- Bulk actions appear only after selection.

## Breadcrumbs

Use breadcrumbs when:

- The app has hierarchy deeper than two levels.
- Users often land directly on detail pages.
- Users need to return to a parent collection.

Do not use breadcrumbs as a replacement for primary navigation.

## Tabs

Use tabs when views are siblings under the same object, such as `Overview`, `Activity`, `Settings`, `Billing`.

Rules:

- Keep tab labels short.
- Do not put destructive actions in tabs.
- Do not use tabs for sequential steps.
- Preserve selected tab on refresh when useful.

## Sidebars

Good for productivity tools, dashboards, admin panels, IDE-like apps, and workspaces.

Sidebar structure:

1. Workspace/app identity.
2. Primary navigation.
3. Project/workspace switcher if needed.
4. Secondary utilities lower down.
5. User/account at bottom.

## Search vs navigation

Use search when users know the name/content. Use navigation when users need browsing and recognition. Strong products usually need both.

## Edge cases

- Very small screens: collapse sidebar into drawer, but keep primary task visible.
- Permission-limited users: show disabled/hidden items consistently; explain unavailable actions.
- Multi-tenant apps: always show current workspace/org context.
- Unsaved changes: warn before navigation or auto-save safely.
