import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/work/")({ component: Work });

function Work() {
	return <>WIP</>;
}
