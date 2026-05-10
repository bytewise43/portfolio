import { createFileRoute } from "@tanstack/react-router";
import Hero from "./-components/hero/hero";
import SelectedWork from "./-components/selected-work/selected-work";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<>
			<Hero />
			<SelectedWork />
		</>
	);
}
