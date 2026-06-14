# Design Tokens

Create these as CSS variables, Tailwind theme values, or a TS token object depending on the app stack. The important part is that all pages consume the same tokens.

## Color tokens

```css
:root {
  --dt-bg-app: #0d0e0e;
  --dt-bg-shell: #141515;
  --dt-bg-surface: #1b1b1a;
  --dt-bg-surface-2: #22211f;
  --dt-bg-surface-3: #2a2926;
  --dt-bg-hover: rgba(255, 255, 255, 0.045);
  --dt-bg-active: rgba(245, 178, 61, 0.12);

  --dt-border-subtle: rgba(255, 255, 255, 0.07);
  --dt-border-normal: rgba(255, 255, 255, 0.11);
  --dt-border-strong: rgba(245, 178, 61, 0.45);

  --dt-text-primary: #eee7d5;
  --dt-text-secondary: #c1b89f;
  --dt-text-muted: #8f8672;
  --dt-text-faint: #625c50;

  --dt-accent: #f5b23d;
  --dt-accent-hover: #ffc35a;
  --dt-accent-muted: #a97827;
  --dt-accent-bg: rgba(245, 178, 61, 0.12);

  --dt-success: #46d189;
  --dt-success-bg: rgba(70, 209, 137, 0.12);
  --dt-warning: #f5b23d;
  --dt-danger: #ff6b6b;
  --dt-info: #40c8e8;

  --dt-chart-goal: #40c8e8;
  --dt-chart-line: #f5b23d;
  --dt-chart-grid: rgba(255, 255, 255, 0.08);
}
```

## Radius tokens

```css
:root {
  --dt-radius-xs: 4px;
  --dt-radius-sm: 6px;
  --dt-radius-md: 8px;
  --dt-radius-lg: 12px;
  --dt-radius-xl: 16px;
  --dt-radius-full: 999px;
}
```

## Spacing tokens

```css
:root {
  --dt-space-1: 4px;
  --dt-space-2: 8px;
  --dt-space-3: 12px;
  --dt-space-4: 16px;
  --dt-space-5: 20px;
  --dt-space-6: 24px;
  --dt-space-8: 32px;
  --dt-space-10: 40px;
  --dt-space-12: 48px;
}
```

## Typography tokens

```css
:root {
  --dt-font-ui: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --dt-font-mono: "JetBrains Mono", "SF Mono", Consolas, monospace;

  --dt-text-xs: 11px;
  --dt-text-sm: 12px;
  --dt-text-base: 13px;
  --dt-text-md: 14px;
  --dt-text-lg: 16px;
  --dt-text-xl: 20px;
  --dt-text-2xl: 24px;

  --dt-leading-tight: 1.15;
  --dt-leading-normal: 1.45;
  --dt-leading-relaxed: 1.65;
}
```

## Shadow/depth tokens

```css
:root {
  --dt-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.24);
  --dt-shadow-md: 0 8px 24px rgba(0, 0, 0, 0.28);
  --dt-shadow-lg: 0 18px 60px rgba(0, 0, 0, 0.42);
  --dt-glow-accent: 0 0 0 1px rgba(245, 178, 61, 0.3), 0 0 24px rgba(245, 178, 61, 0.08);
}
```

## Component size tokens

```css
:root {
  --dt-control-sm: 28px;
  --dt-control-md: 34px;
  --dt-control-lg: 40px;
  --dt-sidebar-icon: 36px;
  --dt-rail-width: 44px;
  --dt-sidebar-width: 300px;
  --dt-header-height: 72px;
}
```

