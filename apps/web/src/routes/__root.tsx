import instrumentCss from "@fontsource/instrument-serif/index.css?url";
import caveatCss from "@fontsource-variable/caveat/index.css?url";
import interCss from "@fontsource-variable/inter/index.css?url";
import jetbrainsCss from "@fontsource-variable/jetbrains-mono/index.css?url";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	ScriptOnce,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Header from "@/components/header/header";
import { ThemeProvider } from "../context/theme/provider";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className="h-full antialiased font-sans"
			suppressHydrationWarning
		>
			<head>
				{[interCss, jetbrainsCss, instrumentCss, caveatCss].map((href) => (
					<>
						<link
							key={`preload-${href}`}
							rel="preload"
							as="style"
							href={href}
						/>
						<link
							key={`style-${href}`}
							rel="stylesheet"
							href={href}
							media="print"
							data-async-font
						/>
					</>
				))}
				<ScriptOnce>{`
					document.querySelectorAll('link[data-async-font]').forEach((l)=> {
						function apply(){ l.media='all'; }
						l.sheet ? apply() : l.addEventListener('load', apply);
					});
				`}</ScriptOnce>
				<HeadContent />
			</head>
			<body className="min-h-full flex flex-col">
				<ThemeProvider>
					<Header />
					<main className="max-w-(--max-content-width) w-full h-[calc(100vh-var(--header-height)-4rem)] p-(--edge-spacing) mx-auto mt-16">
						{children}
					</main>
					<TanStackDevtools
						config={{ position: "bottom-right" }}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							{ name: "Tanstack Query", render: <ReactQueryDevtoolsPanel /> },
						]}
					/>
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	);
}
