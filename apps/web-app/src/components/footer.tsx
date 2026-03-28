import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const SOCIAL_ICONS = [
  { label: "Facebook", icon: IconBrandFacebook },
  { label: "Twitter", icon: IconBrandTwitter },
  { label: "Instagram", icon: IconBrandInstagram },
  { label: "LinkedIn", icon: IconBrandLinkedin },
];

const COMPANY_LINKS = ["About Us", "Our Services", "Doctors", "Contact Us", "Privacy Policy"];

export default function Footer() {
  return (
    <footer className="w-full bg-card mt-16">
      {/* ── Main footer content ── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4 max-w-sm">
            {/* Logo */}
            <div className="flex flex-row items-center gap-2">
              <Image
                src="/logo.webp"
                alt="Atom Hospital Logo"
                width={32}
                height={32}
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold text-foreground tracking-tight">
                Atom Hospital
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              At Atom Hospital, we are committed to delivering compassionate, high-quality
              healthcare tailored to meet the unique needs of every patient. Our dedicated team
              of medical professionals strives to provide excellence in service, ensuring your
              health and well-being remain our top priority.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIAL_ICONS.map(({ label, icon: Icon }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="bg-muted hover:bg-muted/80 rounded-full p-2"
                >
                  <div>
                    <Icon className="w-5 h-5 text-muted-foreground hover:text-muted-foreground/80" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── CENTER: Company links ── */}
          <div className="flex flex-col gap-4 sm:items-center">
            <h3 className="text-lg font-bold text-foreground">Company</h3>
            <ul className="flex flex-col gap-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground/80 text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT: Contact + Admin Panel ── */}
          <div className="flex flex-col gap-3 items-end">
            <p className="text-muted-foreground font-semibold text-sm">+91-999-071-6368</p>
            <p className="text-muted-foreground font-semibold text-sm">
              atomhospital@gmail.com
            </p>
            <div className="mt-1">
              <Button variant="outline" size="sm">
                Admin Panel
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider + Copyright ── */}
      <div className="border-t border-slate-400/40">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Atom Hospital App. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
