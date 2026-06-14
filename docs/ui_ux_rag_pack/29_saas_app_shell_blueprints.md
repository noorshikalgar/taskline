# 29 — SaaS App Shell Blueprints

Purpose: design the outer structure of product apps.

## App shell options

### Sidebar shell
Best for multi-section apps.

```txt
Left sidebar: product areas
Top bar: search, workspace switcher, user menu
Main: page content
Optional right panel: context/help/activity
```

Use for: dashboards, admin tools, developer tools, project management apps.

### Top nav shell
Best for smaller apps or marketing/product hybrid.

```txt
Top nav: primary areas
Main: content
Optional subnav/tabs per section
```

Use for: small SaaS, docs, simple tools.

### Command-first shell
Best for expert tools.

```txt
Minimal persistent nav
Global command palette
Keyboard shortcuts
Recent items
```

Use for: developer tools, internal tools, AI workspaces, IDE-like apps.

## Sidebar rules

- Group nav by user mental model, not database model.
- Keep primary sections visible.
- Put admin/settings lower.
- Use icons only when they are recognizable; otherwise include labels.
- Collapsed sidebar must remain understandable.

## Top bar rules

Top bar can contain:

- Workspace/project switcher.
- Global search/command palette.
- Create button.
- Notifications/activity.
- Help/docs.
- User menu.

Do not overload top bar with page-specific actions unless they apply globally.

## Responsive shell

```txt
Desktop: sidebar + main content
Tablet: collapsible sidebar or top nav
Mobile: bottom nav for 3–5 primary actions, drawer for more
```

## App shell state handling

- Loading workspace/project context.
- No workspace selected.
- User lacks permissions.
- Offline mode.
- Session expired.
- Navigation item has count/badge.
- Current page deleted/not found.
