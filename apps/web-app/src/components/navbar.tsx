"use client";
import { IconMenu2, IconMoon, IconSun, IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LOGO from "../../public/logo.webp";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "All Doctors", href: "#all-doctors" },
  { label: "Contact", href: "#contact" },
  { label: "Book Appointment", href: "#book-appointment" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleAuth = () => {
    router.push(`${pathname}?auth=signup`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full bg-card border-b border-border">
      <div className="mx-auto py-3 flex items-center justify-between gap-8 max-w-6xl px-4">
        {/* ── LEFT: Logo ── */}
        <Link href="/" className="flex flex-row items-center gap-3 shrink-0 group">
          <Image src={LOGO} alt="Logo" width={32} height={32} className="rounded-sm" />
          <h1 className="text-lg font-bold text-foreground">Atom Hospital</h1>
        </Link>

        {/* ── CENTER: Nav Links (desktop) ── */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 group
                    ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {label}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-primary transition-all duration-300 origin-left
                      ${isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-40"}`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── RIGHT: Theme + CTA + Hamburger ── */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-accent/80 text-muted-foreground hover:text-muted-foreground/80 cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted &&
              (resolvedTheme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />)}
          </button>

          <div className="hidden md:block">
            <Button onClick={handleAuth} variant="primary" size="xs">
              Sign Up
            </Button>
          </div>

          {/* Hamburger — mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {menuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } bg-background border-t border-border`}
      >
        <div className="px-6 py-6 flex flex-col gap-2">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                onClick={() => {
                  setMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-all
                  ${
                    isActive
                      ? "bg-primary/10 text-primary border-l-4 border-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground border-l-4 border-transparent"
                  }`}
              >
                {label}
              </Link>
            );
          })}
          <div className="pt-4">
            <Button onClick={handleAuth} className="w-full" variant="primary" size="xs">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
