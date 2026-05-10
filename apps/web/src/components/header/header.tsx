import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type FunctionComponent, useEffect, useState } from "react";
import { useTheme } from "@/context/theme/hook";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NavLink, { type NavLinkProps } from "./nav-link";

const items: Omit<NavLinkProps, "active">[] = [
	{ to: "/", text: "home" },
	{ to: "/work", text: "work" },
	{ to: "/posts", text: "posts" },
	{ to: "/about", text: "about" },
];

const iconTransition = { duration: 0.2, ease: [0.2, 0.8, 0.2, 1] as const };

const Header: FunctionComponent = () => {
	const { pathname } = useLocation();
	const { theme, resolvedTheme, themes, setTheme } = useTheme();

	const [menuOpen, setMenuOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<>
			<header className="sticky top-0 z-50 backdrop-blur-md w-full border-b border-b-border h-(--header-height) bg-background/80">
				<div className="max-w-(--max-content-width) mx-auto h-full w-full flex items-center justify-between px-(--edge-spacing)">
					<Link to="/" className="font-hand text-4xl">
						@nico<span className="text-primary">.</span>benninger
						<span className="text-primary">.</span>
					</Link>
					<nav className="hidden md:flex gap-1">
						{items.map((item) => (
							<NavLink
								key={item.text}
								{...item}
								active={pathname === item.to}
							/>
						))}
					</nav>
					<div className="flex gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									className="rounded-full"
									variant="outline"
									size="icon-lg"
								>
									<span className="relative size-5">
										<motion.span
											className="absolute inset-0 flex items-center justify-center"
											initial={false}
											animate={{
												opacity: !mounted || resolvedTheme === "dark" ? 0 : 1,
												scale: !mounted || resolvedTheme === "dark" ? 0.6 : 1,
												rotate: !mounted || resolvedTheme === "dark" ? -45 : 0,
											}}
											transition={iconTransition}
										>
											<Sun className="size-5" />
										</motion.span>
										<motion.span
											className="absolute inset-0 flex items-center justify-center"
											initial={false}
											animate={{
												opacity: !mounted || resolvedTheme !== "dark" ? 0 : 1,
												scale: !mounted || resolvedTheme !== "dark" ? 0.6 : 1,
												rotate: !mounted || resolvedTheme !== "dark" ? 45 : 0,
											}}
											transition={iconTransition}
										>
											<Moon className="size-5" />
										</motion.span>
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuGroup>
								<DropdownMenuContent
									onCloseAutoFocus={(e) => e.preventDefault()}
								>
									{themes
										.filter((t) => t !== theme)
										.map((t) => (
											<DropdownMenuItem
												className="font-mono"
												key={t}
												onClick={() => setTheme(t)}
											>
												{t}
											</DropdownMenuItem>
										))}
								</DropdownMenuContent>
							</DropdownMenuGroup>
						</DropdownMenu>
						<Button
							className="md:hidden rounded-full"
							variant="outline"
							size="icon-lg"
							onClick={() => setMenuOpen((o) => !o)}
							aria-expanded={menuOpen}
							aria-label="Toggle menu"
						>
							<span className="relative size-5">
								<motion.span
									className="absolute inset-0 flex items-center justify-center"
									initial={false}
									animate={{
										opacity: menuOpen ? 0 : 1,
										scale: menuOpen ? 0.6 : 1,
										rotate: menuOpen ? 45 : 0,
									}}
									transition={iconTransition}
								>
									<Menu className="size-5" />
								</motion.span>
								<motion.span
									className="absolute inset-0 flex items-center justify-center"
									initial={false}
									animate={{
										opacity: menuOpen ? 1 : 0,
										scale: menuOpen ? 1 : 0.6,
										rotate: menuOpen ? 0 : -45,
									}}
									transition={iconTransition}
								>
									<X className="size-5" />
								</motion.span>
							</span>
						</Button>
					</div>
				</div>
			</header>

			<AnimatePresence>
				{menuOpen && (
					<motion.div
						key="mobile-menu"
						initial={{ opacity: 0, y: -12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -12 }}
						transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] as const }}
						className="fixed inset-0 top-20 z-40 bg-background/80 backdrop-blur-md md:hidden"
					>
						<nav className="flex flex-col px-8 pt-4">
							{items.map((item) => (
								<NavLink
									key={item.text}
									{...item}
									active={pathname === item.to}
									orientation="vertical"
									onClick={() => setMenuOpen(false)}
								/>
							))}
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Header;
