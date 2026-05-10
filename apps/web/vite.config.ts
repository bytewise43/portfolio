import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import rsc from "@vitejs/plugin-rsc";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
	resolve: {
		tsconfigPaths: true,
		alias: {
			tslib: "tslib/tslib.es6.mjs",
		},
	},
	plugins: [
		devtools(),
		nitro(),
		tailwindcss(),
		tanstackStart({
			rsc: {
				enabled: true,
			},
			prerender: {
				enabled: true,
			},
		}),
		rsc(),
		viteReact(),
		babel({ presets: [reactCompilerPreset()] }),
	],
});

export default config;
