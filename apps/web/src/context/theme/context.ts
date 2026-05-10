import { createContext } from "react";

export const THEMES = ["light", "dark", "auto"] as const;

export type ThemeMode = (typeof THEMES)[number];
export type ResolvedTheme = Exclude<ThemeMode, "auto">;

export interface ThemeContextValue {
	theme: ThemeMode;
	themes: readonly ThemeMode[];
	resolvedTheme: ResolvedTheme;
	setTheme: (theme: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
