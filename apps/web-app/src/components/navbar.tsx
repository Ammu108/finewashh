"use client";
import { IconBrightnessUp } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LOGO from "../../public/logo.webp";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full bg-white">
      <div className="mx-auto px-4 h-16 flex items-center justify-between gap-8 max-w-6xl">
        {/* ── LEFT: Logo ── */}
        <Link
          href="#"
          onClick={() => {
            setActive("Home");
          }}
          className="flex flex-row items-center gap-3 shrink-0 group"
        >
          <Image src={LOGO} alt="Logo" width={32} height={32} />
          <h1 className="text-lg font-bold">Atom Hospital</h1>
        </Link>

        {/* ── CENTER: Nav Links (desktop) ── */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={() => {
                  setActive(label);
                }}
                className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 group
                    ${active === label ? "text-white" : "text-slate-400 hover:text-slate-200"}`}
              >
                {label}
                {/* Underline */}
                <span
                  className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-violet-500 transition-all duration-300 origin-left
                      ${active === label ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-40"}`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* ── RIGHT: Sign Up + Hamburger ── */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sign Up — desktop */}
          <div className="flex flex-row gap-3 items-center justify-center">
            <IconBrightnessUp size={20} />
            <Button type="button" variant="secondary">
              Sign Up
            </Button>
          </div>

          {/* Hamburger — mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-9 h-9 rounded-md hover:bg-white/5 transition-colors p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-full h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block w-full h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block w-full h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-slate-950/95 backdrop-blur-xl border-t border-white/10`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                setActive(label);
                setMenuOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    active === label
                      ? "text-white bg-violet-600/15 border-l-2 border-violet-500 pl-4"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent pl-4"
                  }`}
            >
              {label}
            </a>
          ))}
          <Button type="button" variant="secondary">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}
