import { Link, type LinkProps } from "@tanstack/react-router";
import type { FunctionComponent } from "react";
import { cn } from "@/lib/utils";

export interface NavLinkProps {
	to: LinkProps["to"];
	text: string;
	active: boolean;
	orientation?: "horizontal" | "vertical";
	onClick?: () => void;
}

const NavLink: FunctionComponent<NavLinkProps> = ({
	to,
	text,
	active,
	orientation = "horizontal",
	onClick,
}) => {
	const linkClass =
		"font-mono rounded-full py-3 px-5 hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
	const dotClass =
		"size-1.5 rounded-full flex-shrink-0 transition-colors duration-200 relative";

	if (orientation === "vertical") {
		return (
			<Link
				to={to}
				onClick={onClick}
				className={cn(linkClass, "flex items-center gap-3")}
			>
				<div
					className={cn(dotClass, active ? "bg-primary" : "bg-transparent")}
				/>
				{text}
			</Link>
		);
	}

	return (
		<div>
			<Link to={to} className={linkClass}>
				{text}
			</Link>
			{active && <div className={cn(dotClass, "bg-primary mx-auto")} />}
		</div>
	);
};

export default NavLink;
