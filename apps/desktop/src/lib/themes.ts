export interface AppTheme {
  id: string;
  label: string;
  family: string;
  dark: boolean;
}

export const APP_THEMES = [
  {
    id: "default-dark",
    label: "Default Dark",
    family: "Default",
    dark: true,
  },
  {
    id: "tokyo-night-dark",
    label: "Tokyo Night",
    family: "Tokyo Night",
    dark: true,
  },
  {
    id: "zed-dark",
    label: "Zed One Dark",
    family: "Zed",
    dark: true,
  },
  {
    id: "default-light",
    label: "Default Light",
    family: "Default",
    dark: false,
  },
  {
    id: "tokyo-night-light",
    label: "Tokyo Night Light",
    family: "Tokyo Night",
    dark: false,
  },
  {
    id: "zed-light",
    label: "Zed One Light",
    family: "Zed",
    dark: false,
  },
] as const satisfies readonly AppTheme[];

export type AppThemeId = (typeof APP_THEMES)[number]["id"];

export function isAppTheme(value: unknown): value is AppThemeId {
  return typeof value === "string"
    ? APP_THEMES.some((option) => option.id === value)
    : false;
}
