import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

if (typeof Element !== "undefined" && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function scrollIntoViewPolyfill() {
    /* jsdom does not implement layout, so this is a no-op. */
  };
}

export function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  return render(ui, {
    wrapper: ({ children }) => (
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    ),
    ...options,
  });
}

export * from "@testing-library/react";
