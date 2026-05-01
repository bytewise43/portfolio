"use client";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { type FunctionComponent, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NavLink from "./nav-link";

const items = [
  { href: "/", text: "home" },
  { href: "/work", text: "work" },
  { href: "/posts", text: "posts" },
  { href: "/about", text: "about" },
];

const Header: FunctionComponent = () => {
  const pathname = usePathname();
  const { theme, themes, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
    setIsClosing(false);
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const handleToggle = () => {
    if (menuOpen) closeMenu();
    else openMenu();
  };

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md w-full border-b border-b-border h-20 bg-background/80">
        <div className="max-w-7xl mx-auto h-full w-full flex items-center justify-between px-8">
          <Link href="/" className="font-hand text-4xl">
            @nico<span className="text-primary">.</span>benninger
            <span className="text-primary">.</span>
          </Link>
          <nav className="hidden md:flex gap-1">
            {items.map((item) => (
              <NavLink
                key={item.text}
                href={item.href}
                text={item.text}
                active={pathname === item.href}
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
                    <Sun className="absolute size-5 inset-0 transition-all duration-200 opacity-100 scale-100 dark:opacity-0 dark:scale-75" />
                    <Moon className="absolute size-5 inset-0 transition-all duration-200 dark:opacity-100 darkscale-100 opacity-0 scale-75" />
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
              onClick={handleToggle}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              <span className="relative size-5">
                <Menu
                  className={cn(
                    "absolute inset-0 size-5 transition-all duration-200",
                    menuOpen ? "opacity-0 blur-xs" : "opacity-100 rotate-180",
                  )}
                />
                <X
                  className={cn(
                    "absolute inset-0 size-5 transition-all duration-200",
                    menuOpen ? "opacity-100 rotate-180" : "opacity-0 blur-xs",
                  )}
                />
              </span>
            </Button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className={cn(
            "fixed inset-0 top-20 z-40 bg-background/80 backdrop-blur-md md:hidden",
            isClosing
              ? "animate-out fade-out slide-out-to-top-2 duration-200 fill-mode-forwards"
              : "animate-in fade-in slide-in-from-top-2 duration-200",
          )}
        >
          <nav className="flex flex-col px-8 pt-4">
            {items.map((item) => (
              <NavLink
                key={item.text}
                href={item.href}
                text={item.text}
                active={pathname === item.href}
                orientation="vertical"
                onClick={closeMenu}
              />
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
