import { Link, type LinkProps } from "@tanstack/react-router";
import type { FunctionComponent, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import styles from "./underlined-link.module.css";

interface UnderlinedLinkProps extends LinkProps {
	className?: string;
}

const UnderlinedLink: FunctionComponent<
	PropsWithChildren<UnderlinedLinkProps>
> = ({ children, className, ...props }) => {
	return (
		<Link className={cn(styles.link, className)} {...props}>
			{children}
		</Link>
	);
};

export default UnderlinedLink;
