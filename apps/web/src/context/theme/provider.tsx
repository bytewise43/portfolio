import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import {
	ThemeContext,
	THEMES,
	type ResolvedTheme,
	type ThemeMode,
} from "./context";
import { ScriptOnce } from "@tanstack/react-router";
import script from "./script";
import { createIsomorphicFn } from "@tanstack/react-start";

const THEME_STORAGE_KEY = "theme";

const resolveMode = createIsomorphicFn()
	.server((mode: ThemeMode) => {
		if (mode !== "auto") {
			return mode;
		} else {
			return "light";
		}
	})
	.client((mode: ThemeMode): ResolvedTheme => {
		if (mode !== "auto") return mode;
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	});

const applyThemeMode = createIsomorphicFn()
	.server((_mode: ThemeMode) => {
		return;
	})
	.client((mode: ThemeMode) => {
		const resolved = resolveMode(mode);
		const root = document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(resolved);
		if (mode === "auto") {
			root.removeAttribute("data-theme");
		} else {
			root.setAttribute("data-theme", mode);
		}
		root.style.colorScheme = resolved;

		window.localStorage.setItem(THEME_STORAGE_KEY, mode);
	});

const retriveStored = createIsomorphicFn()
	.server((): ThemeMode => "light")
	.client((): ThemeMode => {
		const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
		const initial: ThemeMode =
			stored === "light" || stored === "dark" || stored === "auto"
				? stored
				: "auto";
		return initial;
	});

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<ThemeMode>(retriveStored());
	const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
		resolveMode(theme),
	);

	useEffect(() => {
		if (theme !== "auto") return;
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => setResolvedTheme(resolveMode("auto"));
		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, [theme]);

	const setTheme = useCallback((next: ThemeMode) => {
		setThemeState(next);
		setResolvedTheme(resolveMode(next));
		applyThemeMode(next);
	}, []);

	return (
		<ThemeContext.Provider
			value={{ theme, themes: THEMES, resolvedTheme, setTheme }}
		>
			<ScriptOnce>{script}</ScriptOnce>
			{children}
		</ThemeContext.Provider>
	);
}
